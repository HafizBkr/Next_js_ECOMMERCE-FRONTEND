import { useState } from 'react';

// Définir les types pour les commandes
interface ProduitCommande {
  produit_id: string;
  quantite: number;
}

interface Commande {
  id: string; // Identifiant de la commande
  produits: ProduitCommande[];
  date_creation: string; // Date de création de la commande
}

export function useCommande() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [commandes, setCommandes] = useState<Commande[] | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  // Récupérer le JWT token depuis localStorage
  const getToken = () => localStorage.getItem('jwt_token');

  // Fonction pour créer une commande
  const creerCommande = async (produits: ProduitCommande[]) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    const token = getToken();
    if (!token) {
      setError('Token JWT introuvable');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/commandes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ produits }),
      });

      if (!response.ok) {
        throw new Error('Échec de la création de la commande');
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour récupérer la liste des commandes
  const fetchCommandes = async () => {
    setLoading(true);
    setError(null);

    const token = getToken();
    if (!token) {
      setError('Token JWT introuvable');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/commandes', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Échec de la récupération des commandes');
      }

      const data: Commande[] = await response.json();
      setCommandes(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    success,
    commandes,
    creerCommande,
    fetchCommandes,
  };
}
