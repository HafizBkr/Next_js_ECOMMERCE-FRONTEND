import { useState, useEffect } from "react";

// Définir les types pour les données de produits
interface Produit {
  produit_id: string;
  nom: string;
  prix: number;
  image: string;
}

interface Panier {
  data: Produit[];
  status?: string;
}

const API_URL =
  process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:8080";

// Définir le hook usePanier
export function usePanier() {
  const [panier, setPanier] = useState<Panier | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Récupérer le jwt_token depuis localStorage
  const getToken = () => localStorage.getItem("jwt_token");

  // Fonction pour récupérer la liste des produits dans le panier
  const fetchPanier = async () => {
    setLoading(true);
    setError(null);

    const token = getToken();
    if (!token) {
      setError("Token JWT introuvable");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/panier`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Échec de la récupération du panier");
      }

      const data: Panier = await response.json();
      setPanier(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message || "Erreur lors de la récupération du panier");
      } else {
        setError("Erreur lors de la récupération du panier");
      }
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour ajouter un produit au panier
  const ajouterProduit = async (produitId: string) => {
    setLoading(true);
    setError(null);

    const token = getToken();
    if (!token) {
      setError("Token JWT introuvable");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/panier/ajouter`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ produit_id: produitId }),
      });

      if (!response.ok) {
        throw new Error("Échec de l'ajout du produit au panier");
      }

      await fetchPanier(); // Recharger la liste des produits après ajout
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message || "Erreur lors de l'ajout au panier");
      } else {
        setError("Erreur lors de l'ajout au panier");
      }
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour supprimer un produit du panier
  const supprimerProduit = async (produitId: string) => {
    setLoading(true);
    setError(null);

    const token = getToken();
    if (!token) {
      setError("Token JWT introuvable");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/panier/enlever`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ produit_id: produitId }),
      });

      if (!response.ok) {
        throw new Error("Échec de la suppression du produit du panier");
      }

      await fetchPanier(); // Recharger la liste des produits après suppression
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(
          error.message || "Erreur lors de la suppression du produit du panier",
        );
      } else {
        setError("Erreur lors de la suppression du produit du panier");
      }
    } finally {
      setLoading(false);
    }
  };

  // Vérifier l'existence du panier lorsque le composant est monté
  useEffect(() => {
    fetchPanier();
  }, []);

  return {
    panier,
    loading,
    error,
    fetchPanier,
    ajouterProduit,
    supprimerProduit,
  };
}
