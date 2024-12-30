'use client';

import React, { useState } from 'react';
import Navbar from './components/Navbar';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Main from './Mainstore/page';
import Assistant from '../app/components/assistant';
import First from '../app/components/firstSection';
import styles from '../../styles/Navbar.module.css';
import './globals.css';
import Products from "../app/components/product"
import Footer from "../app/components/Footer"

export default function Home() {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const handleDropdownChange = (dropdown: number | null) => { 
    setActiveDropdown(dropdown);
  };

  return (
    <div>
      <Navbar activeDropdown={activeDropdown} onDropdownChange={handleDropdownChange} />

      {/* Contenu principal avec un flou conditionnel basé sur activeDropdown */}
      <main 
        className={`${styles.mainContent} ${activeDropdown !== null ? styles.blur : ''}`}
      >
        <div style={{ marginTop: '5%' }}>
          <First />
        </div>
        <div style={{ marginTop: '1%' }}>
          <Assistant />
        </div>
        <div style={{ marginTop: '1%' }}>
         <Products />
        </div>
        <div style={{ marginTop: '1%' }}>
          <Main />
        </div>
        <Footer />
      </main>
    </div>
  );
}
