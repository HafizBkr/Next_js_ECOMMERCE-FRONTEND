// /src/app/hooks/useAuth.ts
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('admin_token');  // Assurez-vous que c'est bien le token de l'admin ici
    if (!token) {
      // Si pas de token, redirige vers la page de connexion de l'administrateur
      router.push('/dashboardlogin');
    }
  }, [router]);
};

export default useAuth;
