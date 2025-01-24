"use client";
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Heart, ShoppingCart, X } from 'lucide-react';
import iphone from "@/app/public/images/iphonee.png";
import useProductByID from '../../hooks/useProductByid';
import { usePanier } from '../../hooks/usePanier';

const ProductDetail = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showCartPopup, setShowCartPopup] = useState(false);
  const router = useRouter();
  const params = useParams();
  const productId = params?.productId as string;
  const { product, loading, error } = useProductByID(productId);
  const { ajouterProduit, loading: cartLoading, error: cartError } = usePanier();

  const handleAddToCart = async () => {
    if (product) {
      try {
        await ajouterProduit(productId);
        setShowCartPopup(true);
        setTimeout(() => setShowCartPopup(false), 3000);
      } catch (err) {
        console.error('Erreur lors de l\'ajout au panier', err);
      }
    }
  };

  const handleGoToCart = () => {
    router.push('/Panier');
  };

  const handleClosePopup = () => {
    setShowCartPopup(false);
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;

  const thumbnails = product?.photos?.length ? product.photos : [iphone.src, iphone.src, iphone.src, iphone.src, iphone.src];

  return (
    <div className="max-w-7xl mx-auto p-4 relative">
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
        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-1 flex flex-col gap-2">
            {thumbnails.map((thumb, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`relative aspect-square border-2 rounded-lg overflow-hidden
                  ${currentImageIndex === idx ? 'border-blue-500' : 'border-gray-200'}`}
              >
                <Image
                  src={thumb}
                  alt={`Thumbnail ${idx + 1}`}
                  width={100}
                  height={100}
                  className="object-cover"
                />
              </button>
            ))}
          </div>

          <div className="col-span-4 relative aspect-square rounded-lg">
            <div className="absolute top-2 left-2 z-10 bg-red-600 text-white text-xs px-2 py-1 rounded">
              SUIVI PAR 3 PERSONNES EN 24 HEURES
            </div>
            <Image
              src={thumbnails[currentImageIndex]}
              alt={`Vue ${currentImageIndex + 1}`}
              width={500}
              height={0}
              className="object-contain"
              priority
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <h1 className="text-4xl font-bold">{product?.nom}</h1>
            <div className="flex items-center gap-2">
              <button className="p-2">
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <path fill="none" stroke="currentColor" strokeWidth="2" d="M15 3l6 6m0-6l-6 6" />
                </svg>
              </button>
              <div className="flex items-center gap-1">
                <span>{product?.nombre_vues}</span>
                <Heart className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-medium hover:underline cursor-pointer">{product?.marque}</span>
            <span className="text-gray-600">(2816)</span>
            <span className="text-blue-600 hover:underline cursor-pointer">Pro</span>
          </div>

          <div className="text-2xl font-semibold">{product?.prix} EUR</div>

          <div>
            <div className="flex items-center gap-2">
              <span>État : </span>
              <span className="font-medium">{product?.etat}</span>
              <button className="text-gray-600">ⓘ</button>
            </div>
            <p>{product?.description}</p>
          </div>

          <div className="flex items-center gap-4">
            <span>Quantité : </span>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              min={1}
              max={product?.stock}
              className="border rounded w-16 px-2 py-1"
            />
            <span className="text-gray-600">{product?.stock} disponibles</span>
          </div>

          <div className="space-y-3">
            <button className="w-full bg-blue-600 text-white rounded-full py-3 font-medium">
              Achat immédiat
            </button>
            <button 
              onClick={handleAddToCart}
              disabled={cartLoading}
              className="w-full border border-blue-600 text-blue-600 rounded-full py-3 font-medium"
            >
              {cartLoading ? 'Ajout en cours...' : 'Ajouter au panier'}
            </button>
            {cartError && <p className="text-red-500">{cartError}</p>}
            <button className="w-full border rounded-full py-3 font-medium flex items-center justify-center gap-2">
              <Heart className="w-5 h-5" />
              Suivre cet objet
            </button>
          </div>

          {/* Rest of the existing component content */}
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
              <p className="text-sm">La livraison n'est peut-être pas offerte vers : Togo. Consultez la description de l'objet ou contactez le vendeur pour en savoir plus sur les options de livraison.</p>
              <button className="text-blue-600 hover:underline text-sm">Afficher les détails</button>
            </div>

            <div>
              <div>Lieu où se trouve l'objet : <span className="font-medium">{product?.localisation}</span></div>
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
    


      {/* Cart Success Popup */}
      {showCartPopup && (
        <div className="fixed top-4 right-4 z-50 bg-white border border-green-500 rounded-lg shadow-lg p-4 max-w-xs w-full animate-bounce">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center text-green-600">
              <ShoppingCart className="w-6 h-6 mr-2" />
              <span className="font-semibold">Produit ajouté</span>
            </div>
            <button onClick={handleClosePopup}>
              <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
            </button>
          </div>
          <p className="text-sm text-gray-600 mb-3">Votre produit a été ajouté avec succès au panier.</p>
          <div className="flex space-x-2">
            <button 
              onClick={handleGoToCart}
              className="w-full bg-blue-600 text-white rounded-full py-2 text-sm"
            >
              Consulter mon panier
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;