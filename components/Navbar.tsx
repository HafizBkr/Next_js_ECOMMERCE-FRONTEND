'use client';

import React, { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { Search, ShoppingBag } from 'lucide-react';
import styles from '../styles/Navbar.module.css';

interface NavItem {
  label: string;
  path: string;
  options: string[];
}

const navItems: NavItem[] = [
  { label: 'Store', path: '/store', options: ['Apple Store en ligne', 'Accessoires', 'AirPods', 'AirTag'] },
  { label: 'Mac', path: '/mac', options: ['MacBook Air', 'MacBook Pro', 'iMac', 'Mac mini', 'Mac Pro'] },
  { label: 'iPad', path: '/ipad', options: ['iPad Pro', 'iPad Air', 'iPad', 'iPad mini', 'Comparer'] },
  { label: 'iPhone', path: '/iphone', options: ['iPhone 15 Pro', 'iPhone 15', 'iPhone 14', 'Comparer'] },
  { label: 'Watch', path: '/watch', options: ['Apple Watch Series 9', 'Apple Watch Ultra 2', 'Apple Watch SE'] },
  { label: 'AirPods', path: '/airpods', options: ['AirPods Pro 2', 'AirPods 2', 'AirPods Max'] },
  { label: 'Support', path: '/support', options: ['iPhone', 'Mac', 'iPad', 'Watch', 'AirPods'] }
];

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Gestionnaire de fermeture au clic en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.nav-item') && !target.closest('.nav-dropdown')) {
        setActiveDropdown(null);
        setIsSearchOpen(false);
        setIsCartOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDropdown = useCallback((index: number) => {
    setActiveDropdown(activeDropdown === index ? null : index);
    setIsSearchOpen(false);
    setIsCartOpen(false);
  }, [activeDropdown]);

  const toggleSearch = useCallback(() => {
    setIsSearchOpen(!isSearchOpen);
    setIsCartOpen(false);
    setActiveDropdown(null);
  }, [isSearchOpen]);

  const toggleCart = useCallback(() => {
    setIsCartOpen(!isCartOpen);
    setIsSearchOpen(false);
    setActiveDropdown(null);
  }, [isCartOpen]);

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
         <h3 className={styles.logo}>E-Commerce</h3>
        <ul className={styles.navLinks}>
          {navItems.map((item, index) => (
            <li
              key={index}
              className={`${styles.navItem} nav-item`}
              onMouseEnter={() => handleDropdown(index)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link href={item.path} className={styles.navLink}>
                {item.label}
              </Link>
              {activeDropdown === index && (
                <div className={`${styles.dropdown} nav-dropdown`}>
                  <div className={styles.dropdownGroup}>
                    <h2>{item.label}</h2>
                    <ul>
                      {item.options.map((option, optionIndex) => (
                        <li key={optionIndex}>
                          <Link 
                            href={`${item.path}/${option.toLowerCase().replace(/\s+/g, '-')}`} 
                            className={styles.dropdownLink}
                          >
                            {option}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
        
        <div className={styles.iconContainer}>
          <div className={`${styles.navItem} nav-item`}>
            <button 
              className={`${styles.iconButton} ${isSearchOpen ? styles.active : ''}`} 
              onClick={toggleSearch}
              aria-label="Rechercher"
            >
              <Search className={styles.icon} />
            </button>
            {isSearchOpen && (
              <div className={`${styles.dropdown} nav-dropdown`}>
                <div className={styles.dropdownGroup}>
                  <div className={styles.searchWrapper}>
                    <div className={styles.searchBox}>
                      <Search className={styles.searchIcon} />
                      <input
                        type="text"
                        placeholder="Rechercher sur apple.com"
                        className={styles.searchInput}
                      />
                    </div>
                    <div className={styles.quickLinksSection}>
                      <h3>Liens rapides</h3>
                      <ul>
                        {['Apple Vision Pro', 'Cadeaux', 'AirPods', 'AirTag', 'Apple Trade In'].map((link, index) => (
                          <li key={index}>
                            <Link href="#" className={styles.dropdownLink}>
                              {link}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className={`${styles.navItem} nav-item`}>
            <button 
              className={`${styles.iconButton} ${isCartOpen ? styles.active : ''}`}
              onClick={toggleCart}
              aria-label="Panier"
            >
              <ShoppingBag className={styles.icon} />
            </button>
            {isCartOpen && (
              <div className={`${styles.dropdown} nav-dropdown`}>
                <div className={styles.dropdownGroup}>
                  <h2>Votre panier est vide.</h2>
                  <p>
                    <Link href="/login" className={styles.dropdownLink}>
                      Connectez-vous
                    </Link>
                    {' '}pour voir vos articles enregistrés
                  </p>
                  <div className={styles.cartLinks}>
                    <ul>
                      <li><Link href="/profile" className={styles.dropdownLink}>Mon profil</Link></li>
                      <li><Link href="/orders" className={styles.dropdownLink}>Commandes</Link></li>
                      <li><Link href="/saved" className={styles.dropdownLink}>Articles sauvegardés</Link></li>
                      <li><Link href="/account" className={styles.dropdownLink}>Compte</Link></li>
                      <li><Link href="/login" className={styles.dropdownLink}>Se connecter</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;