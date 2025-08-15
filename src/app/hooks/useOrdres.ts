import { useState, useEffect } from "react";

interface Order {
  id: string;
  numero_commande: string;
  google_id: string;
  first_name: string;
  last_name: string;
  email: string;
  montant_total: number;
  status: string;
  created_at: string;
  updated_at: string;
}
const API_URL =
  process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:8080";
const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      // Récupérer le token depuis localStorage
      const token = localStorage.getItem("admin_token");

      // Vérifier si le token existe
      if (!token) {
        setError("Token d'authentification manquant");
        return;
      }

      // Ajouter le token dans les en-têtes de la requête
      const response = await fetch(`${API_URL}/ordres/all`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (response.ok) {
        setOrders(data.data);
      } else {
        setError("Erreur lors de la récupération des commandes");
      }
    } catch {
      setError("Erreur de réseau");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return { orders, loading, error };
};

export default useOrders;
