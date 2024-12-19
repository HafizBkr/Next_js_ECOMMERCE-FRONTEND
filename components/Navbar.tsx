'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Navbar.module.css';

const Navbar: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  const handleDropdown = (index: number) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>E-COMMERCE</Link>
        <ul className={styles.navLinks}>
          {['Store', 'Mac', 'iPad', 'iPhone', 'Watch', 'AirPods', 'Support', 'Account'].map((item, index) => (
            <li
              key={index}
              className={styles.navItem}
              onMouseEnter={() => handleDropdown(index)}
              onMouseLeave={() => setActiveDropdown(null)} // Ferme le dropdown au départ du survol
            >
              <Link href={`/${item.toLowerCase()}`} className={styles.navLink}>
                {item}
              </Link>
              <div className={styles.dropdown}>
                {activeDropdown === index && (
                  <div className={styles.dropdownGroup}>
                    <h2>{item} Options</h2>
                    <ul>
                      {['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'].map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <Link href={`/${item.toLowerCase()}/${subItem.toLowerCase().replace(' ', '-')}`} className={styles.dropdownLink}>
                            {subItem}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
 