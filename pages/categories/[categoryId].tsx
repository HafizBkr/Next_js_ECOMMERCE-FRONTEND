"use client";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../../src/app/components/Navbar";
import Footer from "../../src/app/components/Footer";
import CategoryProducts from "@/app/components/Products/categoryProducts";
import styles from "../../styles/Navbar.module.css";

export default function CategoryPage() {
  const router = useRouter();
  const { categoryId } = router.query;
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  const handleDropdownChange = (dropdown: number | null) => {
    setActiveDropdown(dropdown);
  };

  if (!categoryId) {
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
        <div style={{ marginTop: "5%" }}></div>
        <CategoryProducts categoryId={categoryId} />
        <div style={{ marginTop: "5%" }}>
          <Footer />
        </div>
      </main>
    </>
  );
}
