'use client';

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import '@fortawesome/fontawesome-free/css/all.min.css';
import styles from "../../../styles/Navbar.module.css";
import Footer from "../../app/components/Footer"
import Events from "../components/events/evnts"

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
        <div className="mt-8 md:mt-18d">
        <Events />
        </div>
         <Footer />
      </main>
    </div>
  );
}
