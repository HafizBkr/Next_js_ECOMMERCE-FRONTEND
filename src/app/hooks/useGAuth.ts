import { useState, useCallback, useEffect } from "react";
import router from "next/router";

interface UserProfile {
  email: string;
  first_name: string;
  last_name: string;
  google_id: string;
  is_new_user: boolean;
  jwt_token: string;
  name: string;
  profile_picture: string;
  status: string;
  points?: number;
  orders_count?: number;
  created_at?: string;
  last_login?: string;
  address?: string;
  phone_number?: string;
  residence_city?: string;
  residence_country?: string;
}

interface CompleteProfileData {
  address: string;
  phone_number: string;
  residence_city: string;
  residence_country: string;
}

interface AuthState {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
}

const API_URL =
  process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:8080";
export const useAuth = () => {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
    // Vérifier l'URL pour le jwt_token ou le code OAuth
    const urlParams = new URLSearchParams(window.location.search);
    const jwtTokenFromUrl = urlParams.get("jwt_token");
    const codeFromUrl = urlParams.get("code");

    if (jwtTokenFromUrl) {
      localStorage.setItem("jwt_token", jwtTokenFromUrl);
      if (typeof document !== "undefined") {
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname,
        ); // Nettoyer l'URL
      }
      // Ici, tu peux fetch les infos utilisateur ou rediriger
      return;
    }

    // Si on a un code OAuth, on appelle le backend pour l'échanger contre un token
    if (codeFromUrl) {
      handleAuthCallback(codeFromUrl);
      return;
    }

    // Vérifier dans localStorage si un utilisateur et un token existent
    const storedUserString = localStorage.getItem("user_profile");
    const token = localStorage.getItem("jwt_token");

    if (storedUserString && token) {
      try {
        const storedUser = JSON.parse(storedUserString);
        setState((prev) => ({
          ...prev,
          user: storedUser,
        }));
      } catch (err) {
        console.error("Error parsing stored user:", err);
      }
    }
  }, []);

  const initiateGoogleAuth = useCallback(() => {
    sessionStorage.setItem("redirect_after_login", window.location.href);
    window.location.href = `${API_URL}/oauth-test`;
  }, []);

  const completeProfile = useCallback(
    async (profileData: CompleteProfileData) => {
      try {
        setState((prev) => ({ ...prev, loading: true }));
        const idToken = localStorage.getItem("id_token");

        if (!idToken) {
          throw new Error("No ID token found");
        }

        const response = await fetch(`${API_URL}/complete-profile`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify(profileData),
        });

        if (!response.ok) {
          throw new Error("Profile completion failed");
        }

        // Rediriger après avoir complété le profil
        router.push("/profile");
        return await response.json();
      } catch (err) {
        setState((prev) => ({
          ...prev,
          error:
            err instanceof Error ? err.message : "An unknown error occurred",
        }));
        throw err;
      } finally {
        setState((prev) => ({ ...prev, loading: false }));
      }
    },
    [],
  );

  const fetchUserInfo = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, loading: true }));
      const token = localStorage.getItem("jwt_token");

      if (!token) {
        throw new Error("No JWT token found");
      }

      const response = await fetch(`${API_URL}/user/info`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user info");
      }

      const data: UserProfile = await response.json();
      localStorage.setItem("user_profile", JSON.stringify(data));

      setState((prev) => ({
        ...prev,
        user: data,
        loading: false,
        error: null,
      }));

      return data;
    } catch (err) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: err instanceof Error ? err.message : "An unknown error occurred",
      }));
      throw err;
    }
  }, []);

  const handleAuthCallback = useCallback(async (code: string) => {
    try {
      setState((prev) => ({ ...prev, loading: true }));

      const response = await fetch(`${API_URL}/auth/callback?code=${code}`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Authentication failed");
      }

      const data: UserProfile = await response.json();

      localStorage.setItem("jwt_token", data.jwt_token);
      localStorage.setItem("user_profile", JSON.stringify(data));

      setState((prev) => ({
        ...prev,
        user: data,
        loading: false,
        error: null,
      }));

      let redirectUrl =
        sessionStorage.getItem("redirect_after_login") || "/Products";

      if (redirectUrl.startsWith("http://localhost:3000")) {
        redirectUrl = "/Products";
      }

      sessionStorage.removeItem("redirect_after_login");

      router.push(redirectUrl);
      return data;
    } catch (err) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: err instanceof Error ? err.message : "An unknown error occurred",
      }));
      throw err;
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("user_profile");

    setState({
      user: null,
      loading: false,
      error: null,
    });

    router.push("/login");
  }, []);

  return {
    ...state,
    initiateGoogleAuth,
    completeProfile,
    fetchUserInfo,
    handleAuthCallback,
    logout,
  };
};

export default useAuth;
