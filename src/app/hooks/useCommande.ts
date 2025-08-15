import { useState } from "react";

// Interface pour les produits dans une commande
interface ProduitCommande {
  nom: string;
  prix_unite: number;
  quantite: number;
  model: string;
  etat: string;
  localisation: string;
  photos: string[];
}
const API_URL =
  process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:8080";
// Interface pour la structure complète d'une commande
interface Commande {
  id: string;
  numero_commande: string;
  user_id: string;
  montant_total: number;
  status: string;
  created_at: string;
  updated_at: string;
  produits: ProduitCommande[];
}

// Interface pour la réponse de l'API
interface CommandeResponse {
  data: Commande[];
}

export function useCommande() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [commandes, setCommandes] = useState<Commande[] | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  // Récupérer le JWT token depuis localStorage
  const getToken = () => localStorage.getItem("jwt_token");

  // Fonction pour créer une commande
  const creerCommande = async (produits: ProduitCommande[]) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    const token = getToken();
    if (!token) {
      setError("Token JWT introuvable");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/commandes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ produits }),
      });

      if (!response.ok) {
        throw new Error("Échec de la création de la commande");
      }

      setSuccess(true);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Erreur inconnue");
      }
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
      setError("Token JWT introuvable");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/commandes`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Échec de la récupération des commandes");
      }

      const responseData: CommandeResponse = await response.json();
      setCommandes(responseData.data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Erreur inconnue");
      }
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
