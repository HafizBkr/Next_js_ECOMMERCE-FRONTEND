"use client"
import { useState } from 'react';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import iphone from "@/app/public/images/iphonee.png"

const ProductDetail = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const thumbnails = [
    iphone.src,
    iphone.src,
    iphone.src,
    iphone.src,
    iphone.src
  ];

  return (
    <div className="max-w-7xl mx-auto p-4">
      <nav className="text-sm mb-4 text-gray-600">
        <span className="hover:underline cursor-pointer">Retourner à la page d'accueil</span>
        {' · '}
        <span className="hover:underline cursor-pointer">High-tech</span>
        {' · '}
        <span className="hover:underline cursor-pointer">Téléphonie, mobilité</span>
        {' · '}
        <span className="hover:underline cursor-pointer">Téléphones mobiles</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-4">
          <div className="relative aspect-square bg-gray-100 rounded-lg">
            <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
              SUIVI PAR 3 PERSONNES EN 24 HEURES
            </div>
            <Image
              src={thumbnails[currentImageIndex]}
              alt="iPhone 15 Plus"
              className="object-contain"
              fill
            />
          </div>
          
          <div className="grid grid-cols-5 gap-2">
            {thumbnails.map((thumb, idx) => (
              <button
                key={idx}
                className={`aspect-square relative border rounded-lg ${
                  currentImageIndex === idx ? 'border-blue-500' : 'border-gray-200'
                }`}
                onClick={() => setCurrentImageIndex(idx)}
              >
                <Image
                  src={thumb}
                  alt={`Thumbnail ${idx + 1}`}
                  className="object-cover rounded-lg"
                  fill
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <h1 className="text-xl font-medium">
              APPLE iPhone 15 Plus 128 Go Noir - Avec Batterie neuve - Très bon état
            </h1>
            <div className="flex items-center gap-2">
              <button className="p-2">
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <path fill="none" stroke="currentColor" strokeWidth="2" d="M15 3l6 6m0-6l-6 6" />
                </svg>
              </button>
              <div className="flex items-center gap-1">
                <span>34</span>
                <Heart className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Image
              src="/store-icon.jpg"
              alt="Store Icon"
              width={24}
              height={24}
              className="rounded-full"
            />
            <span className="font-medium hover:underline cursor-pointer">Alloccaz Store</span>
            <span className="text-gray-600">(2816)</span>
            <span className="text-blue-600 hover:underline cursor-pointer">Pro</span>
          </div>

          <div className="flex gap-4">
            <span className="hover:underline cursor-pointer text-blue-600">97,7% d'évaluations positives</span>
            <span className="hover:underline cursor-pointer text-blue-600">Autres objets du vendeur</span>
            <span className="hover:underline cursor-pointer text-blue-600">Contacter le vendeur</span>
          </div>

          <div className="text-2xl font-semibold">779,00 EUR</div>

          <div>
            <div className="flex items-center gap-2">
              <span>État : </span>
              <span className="font-medium">Très bon état - Reconditionné</span>
              <button className="text-gray-600">ⓘ</button>
            </div>
            <p>⚡Ce mobile bénéficie d'une Batterie neuve compatible⚡</p>
          </div>

          <div className="flex items-center gap-4">
            <span>Quantité : </span>
            <input
              type="number"
              defaultValue={1}
              min={1}
              className="border rounded w-16 px-2 py-1"
            />
            <span className="text-gray-600">10 disponibles</span>
          </div>

          <div className="space-y-3">
            <button className="w-full bg-blue-600 text-white rounded-full py-3 font-medium">
              Achat immédiat
            </button>
            <button className="w-full border border-blue-600 text-blue-600 rounded-full py-3 font-medium">
              Ajouter au panier
            </button>
            <button className="w-full border rounded-full py-3 font-medium flex items-center justify-center gap-2">
              <Heart className="w-5 h-5" />
              Suivre cet objet
            </button>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3l8 4v14l-8-4-8 4V7l8-4z" />
            </svg>
            <span>D'autres personnes sont intéressées.</span>
            <span className="font-medium">34 personnes suivent cet objet.</span>
          </div>

          <div className="space-y-4 border-t pt-4">
            <div>
              <div className="font-medium mb-2">Livraison :</div>
              <p>La livraison n'est peut-être pas offerte vers : Togo. Consultez la description de l'objet ou contactez le vendeur pour en savoir plus sur les options de livraison.</p>
              <button className="text-blue-600 hover:underline">Afficher les détails</button>
            </div>

            <div>
              <div>Lieu où se trouve l'objet : <span className="font-medium">Lieusaint, France</span></div>
            </div>

            <div>
              <div className="flex justify-between">
                <span>Délai de livraison :</span>
                <span>Varie</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between">
                <span>Retours :</span>
                <div className="text-right">
                  <p>Retour sous 30 jours. L'acheteur paie les frais de retour.</p>
                  <button className="text-blue-600 hover:underline">Afficher les détails</button>
                </div>
              </div>
            </div>

            <div>
              <span className="font-medium">Paiements :</span>
              <div className="flex gap-2 mt-2">
                <Image src="/paypal.png" alt="PayPal" width={40} height={24} />
                <Image src="/visa.png" alt="Visa" width={40} height={24} />
                <Image src="/mastercard.png" alt="Mastercard" width={40} height={24} />
                <Image src="/dinersclub.png" alt="Diners Club" width={40} height={24} />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-lg">Achetez en toute confiance</h3>
              
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <div className="font-medium">Top Fiabilité Plus</div>
                  <p>Vendeur de confiance, livraison rapide et retours facilités.</p>
                  <button className="text-blue-600 hover:underline">En savoir plus</button>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <div className="font-medium">Garantie client eBay</div>
                  <p>Obtenez un remboursement si vous ne recevez pas l'objet que vous avez commandé.</p>
                  <button className="text-blue-600 hover:underline">En savoir plus</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;