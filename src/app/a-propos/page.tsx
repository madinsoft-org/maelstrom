import { Scissors, Heart, Leaf, Award } from "lucide-react";
import Link from "next/link";

export default function AProposPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gray-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-light mb-6">
            Notre <span className="font-bold">Histoire</span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
            Maelstrom est née d&apos;une vision : créer des vêtements qui sont
            autant des œuvres d&apos;art que des pièces à porter au quotidien.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg mx-auto">
            <p className="text-gray-600 leading-relaxed text-lg">
              Fondée par une styliste passionnée, <strong>Maelstrom</strong>{" "}
              puise son inspiration dans les forces de la nature — le mouvement
              des vagues, la puissance du vent, la fluidité de l&apos;eau. Chaque
              collection capture cette énergie dans des coupes originales et des
              matières soigneusement sélectionnées.
            </p>
            <p className="text-gray-600 leading-relaxed text-lg mt-6">
              Notre atelier parisien est le cœur de notre activité. C&apos;est là que
              naissent nos créations, dessinées à la main avant d&apos;être
              coupées et assemblées avec un soin méticuleux. Chaque pièce passe
              entre les mains expertes de nos couturières.
            </p>
            <p className="text-gray-600 leading-relaxed text-lg mt-6">
              Parallèlement à nos créations, nous avons développé un{" "}
              <strong>service de retouches couture</strong> expert. Parce que
              nous croyons que les beaux vêtements méritent d&apos;être chéris,
              réparés et ajustés plutôt que jetés. Notre équipe de couturières
              donne une seconde vie à vos pièces préférées.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-light text-center text-gray-900 mb-12">
            Nos <span className="font-bold">Valeurs</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="inline-flex w-14 h-14 rounded-full bg-gray-100 items-center justify-center mb-4">
                <Heart size={24} className="text-gray-600" />
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Créativité</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Chaque vêtement est une création unique, inspirée par les forces
                de la nature et le mouvement. Nos designs repoussent les limites
                de la mode conventionnelle.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="inline-flex w-14 h-14 rounded-full bg-gray-100 items-center justify-center mb-4">
                <Scissors size={24} className="text-gray-600" />
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Savoir-faire</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Un artisanat rigoureux transmis de génération en génération. Nos
                couturières maîtrisent les techniques les plus pointues pour un
                résultat impeccable.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="inline-flex w-14 h-14 rounded-full bg-gray-100 items-center justify-center mb-4">
                <Leaf size={24} className="text-gray-600" />
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Durabilité</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Nous choisissons des matières nobles et durables. Notre service
                de retouches encourage une consommation responsable en donnant
                une seconde vie aux vêtements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-gray-900">100%</p>
              <p className="text-sm text-gray-500 mt-2">Fait main à Paris</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-gray-900">500+</p>
              <p className="text-sm text-gray-500 mt-2">
                Retouches réalisées par an
              </p>
            </div>
            <div>
              <p className="text-4xl font-bold text-gray-900">98%</p>
              <p className="text-sm text-gray-500 mt-2">Clients satisfaits</p>
            </div>
            <div>
              <div className="flex justify-center mb-1">
                <Award size={36} className="text-gray-900" />
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Entreprise artisanale certifiée
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-900 text-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-light mb-4">
            Prêt(e) à découvrir <span className="font-bold">Maelstrom</span> ?
          </h2>
          <p className="text-gray-400 mb-8">
            Explorez nos créations ou confiez-nous vos retouches.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/boutique"
              className="px-8 py-4 bg-white text-gray-900 text-sm uppercase tracking-wider font-medium rounded-md hover:bg-gray-100 transition-colors"
            >
              Voir la collection
            </Link>
            <Link
              href="/services"
              className="px-8 py-4 border border-white/30 text-white text-sm uppercase tracking-wider font-medium rounded-md hover:bg-white/10 transition-colors"
            >
              Nos retouches
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
