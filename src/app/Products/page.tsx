"use client";

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import styles from '../../../styles/Navbar.module.css';
import Prodcuts from "@/app/components/Products/mainstore"

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
          <Prodcuts />
           </div>
       
      </main>
    </>
  );
}
