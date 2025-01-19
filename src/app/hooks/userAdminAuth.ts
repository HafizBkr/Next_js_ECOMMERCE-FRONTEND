// /src/app/hooks/useAdminAuth.ts
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface AdminCredentials {
  email: string;
  password: string;
}

const useAdminAuth = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const login = async (credentials: AdminCredentials) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8080/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Échec de la connexion');
      }

      const data = await response.json();

      // Sauvegarde du token et des données de l'administrateur dans le localStorage
      localStorage.setItem('admin_token', data.token);
      localStorage.setItem('admin_data', JSON.stringify(data.admin));

      // Redirige vers le Dashboard
      router.push('/Dashboard');
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    loading,
    error,
  };
};

export default useAdminAuth;
