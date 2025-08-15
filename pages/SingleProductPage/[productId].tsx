"use client";

import React, { useState } from "react";
import { useRouter } from "next/router"; // Importer le hook useRouter
import Navbar from "../../src/app/components/Navbar";
import styles from "../../styles/Navbar.module.css";
import SingleProduct from "@/app/components/Products/SingleProduct";
import Footer from "../../src/app/components/Footer";

export default function SingleProductPage() {
  const router = useRouter(); // Hook pour récupérer les paramètres de l'URL
  const { productId } = router.query; // Récupérer l'ID du produit depuis l'URL

  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  const handleDropdownChange = (dropdown: number | null) => {
    setActiveDropdown(dropdown);
  };

  // Afficher un écran de chargement tant que productId n'est pas disponible
  if (!productId) {
    return <div>Chargement...</div>;
  }

  return (
    <>
      <Navbar
        activeDropdown={activeDropdown}
        onDropdownChange={handleDropdownChange}
      />
      <main
        className={`${styles.mainContent} ${activeDropdown !== null ? styles.blur : ""}`}
      >
        <div style={{ marginTop: "5%" }}>
          {/* Afficher le composant SingleProduct sans passer productId en prop */}
          <SingleProduct />
        </div>
        <div style={{ marginTop: "5%" }}>
          <Footer />
        </div>
      </main>
    </>
  );
}
