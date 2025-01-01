"use client";

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import styles from '../../../styles/Navbar.module.css';
import SingleProduct from "@/app/components/Products/SingleProduct"
import Footer from '../components/Footer';


export default function Home() {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  const handleDropdownChange = (dropdown: number | null) => {
    setActiveDropdown(dropdown);
  };

  return (
    <>
      <Navbar activeDropdown={activeDropdown} onDropdownChange={handleDropdownChange} />
      <main
        className={`${styles.mainContent} ${activeDropdown !== null ? styles.blur : ''}`}
      >
          <div style={{ marginTop: '5%' }}>
          <SingleProduct />
           </div>
           <div style={{ marginTop: '5%' }}>
          <Footer />
           </div>
      </main>
    </>
  );
}
