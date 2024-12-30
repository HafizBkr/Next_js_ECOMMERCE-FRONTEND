import React from 'react';
import Image from 'next/image'; // Assurez-vous que vous utilisez Next.js pour inclure ceci.
import { Truck, RefreshCw, SmilePlus, ShoppingBag, Apple, Atom, Cloud, Laptop, Phone, MessageSquare, Box } from 'lucide-react';
import MecNoire from "@/app/public/images/femme.png";

const AssistancePage = () => {
  const assistanceCards = [
    {
      tag: "SPÉCIALISTE APPLE",
      title: "Faites vos achats en compagnie de nos Spécialistes. En ligne ou dans un Apple Store.",
      image: MecNoire,
    },
    {
      tag: "TODAY AT APPLE",
      title: "Participez à des séances gratuites dans votre Apple Store.",
      subtitle: "Apprenez à tirer le meilleur parti de vos appareils Apple.",
      bgColor: "bg-amber-50",
    },
    {
      tag: "CONSEILS EN SÉANCE INDIVIDUELLE",
      title: "Configuration personnalisée en ligne.",
      subtitle: "Laissez-vous guider par nos Spécialistes pour configurer votre appareil et découvrir les dernières fonctionnalités.",
      showIcons: true,
    },
    {
      tag: "GENIUS BAR",
      title: "Besoin d'assistance ou de réparations ? Rendez-vous au Genius Bar.",
      atom: true,
      bgColor: "bg-blue-50",
    },
  ];

  const storeFeatures = [
    {
      icon: <Truck className="w-6 h-6 text-green-600" />,
      title: "Livraison gratuite ou retrait des articles disponibles dans un Apple Store.",
      textColor: "text-black",
    },
    {
      icon: <RefreshCw className="w-6 h-6 text-blue-500" />,
      title: ["Échangez votre ", "appareil", ", obtenez un crédit pour un nouveau¹."],
      textColor: "text-blue-500",
    },
    {
      icon: <SmilePlus className="w-6 h-6 text-purple-500" />,
      title: ["À vous. Rien qu'à vous. ", "Faites graver des emoji, des noms et des chiffres gratuitement."],
      textColor: "text-purple-500",
    },
    {
      icon: <ShoppingBag className="w-6 h-6 text-blue-500" />,
      title: ["Faites vos achats avec ", "l'app Apple Store", " et profitez d'une expérience personnalisée."],
      textColor: "text-blue-500",
    },
    {
      icon: <Apple className="w-6 h-6 text-orange-500" />,
      title: ["Personnalisez", " votre Mac et créez votre propre style d'Apple Watch."],
      textColor: "text-orange-500",
    },
  ];

  return (
    <div className="max-w-[1500px] mx-auto px-4 py-8">
      <div className="mb-16">
        <h2 className="text-3xl font-semibold mb-1">
          Assistance.
          <span className="text-gray-500 font-normal ml-2">Quand vous voulez, comme vous voulez.</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {assistanceCards.map((card, index) => (
            <div 
              key={index} 
              className={`rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow ${card.bgColor || 'bg-white'}`}
            >
              <p className="text-xs text-gray-500 mb-2">{card.tag}</p>
              <h3 className="text-xl font-semibold mb-3 leading-tight">{card.title}</h3>
              {card.subtitle && (
                <p className="text-sm text-gray-600 mb-4">{card.subtitle}</p>
              )}
              {card.image && (
                <div className="mt-4">
                  <Image
                    src={card.image}
                    alt="Apple Store"
                    className="rounded-lg w-full h-48 object-cover"
                  />
                </div>
              )}
              {card.showIcons && (
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <Cloud className="w-12 h-12 text-blue-500" />
                  <Laptop className="w-12 h-12 text-blue-500" />
                  <MessageSquare className="w-12 h-12 text-blue-500" />
                  <Phone className="w-12 h-12 text-blue-500" />
                  <Box className="w-12 h-12 text-blue-500" />
                </div>
              )}
              {card.atom && (
                <div className="flex justify-center mt-6">
                  <Atom className="w-24 h-24 text-blue-500" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-semibold mb-1">
          L'exception Apple Store.
          <span className="text-gray-500 font-normal ml-2">Toujours plus de raisons d'acheter auprès de nous.</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-8">
          {storeFeatures.map((feature, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="mb-4">
                {feature.icon}
              </div>
              {Array.isArray(feature.title) ? (
                <h3 className="text-sm font-normal">
                  <span className="text-black">{feature.title[0]}</span>
                  <span className={feature.textColor}>{feature.title[1]}</span>
                  <span className="text-black">{feature.title[2] || ''}</span>
                </h3>
              ) : (
                <h3 className={`text-sm font-normal ${feature.textColor}`}>{feature.title}</h3>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssistancePage;
