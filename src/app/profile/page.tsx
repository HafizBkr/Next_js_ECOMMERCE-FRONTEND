'use client';

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import '@fortawesome/fontawesome-free/css/all.min.css';
import styles from '../../../styles/Navbar.module.css';
import '../../app/globals.css';
import Footer from "../components/Footer"
import Profile from "../components/profile/profile"

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
          <Profile />
        </div>
        <Footer />
      </main>
    </div>
  );
}
