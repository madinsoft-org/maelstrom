#!/bin/sh
set -eu

# Initialize persistent SQLite database on first start.
mkdir -p /data
mkdir -p /data/uploads

if [ ! -f /data/dev.db ]; then
  cp /app/dev.db /data/dev.db
fi

# Symlink uploaded images so Next.js serves them from public/
rm -rf /app/public/images/products/uploads
ln -sf /data/uploads /app/public/images/products/uploads

# Ensure all upload subdirectories in /data/uploads are also accessible
# (images uploaded with category go into /data/uploads/<category>/)
for dir in /data/uploads/*/; do
  if [ -d "$dir" ]; then
    base=$(basename "$dir")
    rm -rf "/app/public/images/products/$base"
    ln -sf "$dir" "/app/public/images/products/$base"
  fi
done

# Default to persistent SQLite path if not explicitly set.
export DATABASE_URL="${DATABASE_URL:-file:/data/dev.db}"

exec node server.js
