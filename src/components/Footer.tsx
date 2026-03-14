import Link from "next/link";
import { Scissors, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Newsletter */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h3 className="text-2xl font-light text-white mb-3">
            Rejoignez l&apos;univers Maelstrom
          </h3>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">
            Inscrivez-vous pour découvrir nos nouvelles créations et nos offres
            exclusives.
          </p>
          <form className="flex max-w-md mx-auto gap-2">
            <div className="relative flex-1">
              <Mail
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              />
              <input
                type="email"
                placeholder="Votre email"
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-white text-gray-900 text-sm font-medium uppercase tracking-wider rounded-md hover:bg-gray-100 transition-colors"
            >
              S&apos;inscrire
            </button>
          </form>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link
              href="/"
              className="text-xl font-bold tracking-[0.2em] uppercase text-white"
            >
              Maelstrom
            </Link>
            <p className="mt-4 text-sm text-gray-400 leading-relaxed">
              Des vêtements originaux créés par notre styliste, alliant
              créativité et savoir-faire artisanal. Nous proposons aussi un
              service de retouches couture expert.
            </p>
          </div>

          {/* Boutique */}
          <div>
            <h4 className="text-sm font-medium uppercase tracking-wider text-white mb-4">
              Boutique
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/boutique" className="hover:text-white transition-colors">
                  Toute la collection
                </Link>
              </li>
              <li>
                <Link href="/boutique?category=robes" className="hover:text-white transition-colors">
                  Robes
                </Link>
              </li>
              <li>
                <Link href="/boutique?category=vestes" className="hover:text-white transition-colors">
                  Vestes
                </Link>
              </li>
              <li>
                <Link href="/boutique?category=pantalons" className="hover:text-white transition-colors">
                  Pantalons
                </Link>
              </li>
              <li>
                <Link href="/boutique?category=tops" className="hover:text-white transition-colors">
                  Tops & Chemises
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-medium uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <Scissors size={14} />
              Retouches
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Toutes les prestations
                </Link>
              </li>
              <li>
                <Link href="/services#ourlets" className="hover:text-white transition-colors">
                  Ourlets
                </Link>
              </li>
              <li>
                <Link href="/services#ajustements" className="hover:text-white transition-colors">
                  Ajustements
                </Link>
              </li>
              <li>
                <Link href="/services#reparations" className="hover:text-white transition-colors">
                  Réparations
                </Link>
              </li>
              <li>
                <Link href="/services#transformation" className="hover:text-white transition-colors">
                  Transformations
                </Link>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-sm font-medium uppercase tracking-wider text-white mb-4">
              Informations
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/a-propos" className="hover:text-white transition-colors">
                  Notre Histoire
                </Link>
              </li>
              <li>
                <Link href="/auth/login" className="hover:text-white transition-colors">
                  Mon Compte
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={14} />
                <span>Paris, France</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} />
                <span>01 23 45 67 89</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} />
                <span>contact@maelstrom.fr</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Maelstrom. Tous droits réservés.
          </p>
          <div className="flex space-x-6 text-xs text-gray-500">
            <Link href="#" className="hover:text-white transition-colors">
              Mentions Légales
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              CGV
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
