"use client"
import { useState } from 'react';
import { LoginForm } from "@/app/components/auth/login";
import { RegisterForm } from '../components/auth/register';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-white from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/95 backdrop-blur-sm shadow-xl rounded-lg">
        <div className="p-8">
          {isLogin ? (
            <LoginForm onToggle={() => setIsLogin(false)} />
          ) : (
            <RegisterForm onToggle={() => setIsLogin(true)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;