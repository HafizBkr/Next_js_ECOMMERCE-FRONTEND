'use client';
import React, { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';
import styles from '../../../styles/Navbar.module.css';

interface NavItem {
  label: string;
  path: string;
  options: string[];
  featured?: string[];
}


const navItems: NavItem[] = [
  { 
    label: 'Nouveautés', 
    path: '/nouveautes', 
    options: ['Derniers Arrivages', 'Tendances', 'Collections', 'Marques'],
    featured: ['Nike', 'Adidas', 'Zara', 'H&M']
  },
  { 
    label: 'Homme', 
    path: '/homme', 
    options: ['Vêtements', 'Chaussures', 'Accessoires', 'Sport', 'Luxe'],
    featured: ['Meilleures ventes', 'Nouveautés', 'Promos']
  },
  { 
    label: 'Femme', 
    path: '/femme', 
    options: ['Vêtements', 'Chaussures', 'Sacs', 'Bijoux', 'Sport'],
    featured: ['Tendances', 'Nouveautés', 'Outlet']
  },
  { 
    label: 'Tech', 
    path: '/tech', 
    options: ['Smartphones', 'Ordinateurs', 'Gaming', 'Audio', 'Accessoires'],
    featured: ['Apple', 'Samsung', 'PlayStation', 'Xbox']
  },
  { 
    label: 'Lifestyle', 
    path: '/lifestyle', 
    options: ['Déco', 'Beauté', 'Sport', 'Bien-être', 'Maison'],
    featured: ['Promos', 'Nouveautés']
  },
  { 
    label: 'Promos', 
    path: '/promos', 
    options: ['Deals du Jour', '-50% et plus', 'Ventes Flash', 'Outlet'],
    featured: ['Meilleures offres']
  }
];
const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  // Empêcher le défilement du body quand le menu mobile est ouvert
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const handleDropdown = useCallback((index: number) => {
    setActiveDropdown(activeDropdown === index ? null : index);
    setIsSearchOpen(false);
    setIsCartOpen(false);
  }, [activeDropdown]);

  const toggleSearch = useCallback(() => {
    setIsSearchOpen(!isSearchOpen);
    setIsCartOpen(false);
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
  }, [isSearchOpen]);

  const toggleCart = useCallback(() => {
    setIsCartOpen(!isCartOpen);
    setIsSearchOpen(false);
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
  }, [isCartOpen]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsSearchOpen(false);
    setIsCartOpen(false);
    setActiveDropdown(null);
  }, [isMobileMenuOpen]);

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* Bouton Menu Hamburger */}
        <button 
          className={`${styles.mobileMenuButton} ${isMobileMenuOpen ? styles.active : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Menu"
        >
          {isMobileMenuOpen ? <X className={styles.icon} /> : <Menu className={styles.icon} />}
        </button>

        <h3 className={styles.logo}>E-Commerce</h3>
        
        {/* Menu de navigation principal */}
        <ul className={`${styles.navLinks} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
          {navItems.map((item, index) => (
            <li
              key={index}
              className={`${styles.navItem} nav-item`}
              onMouseEnter={() => !isMobileMenuOpen && handleDropdown(index)}
              onMouseLeave={() => !isMobileMenuOpen && setActiveDropdown(null)}
              onClick={() => isMobileMenuOpen && handleDropdown(index)}
            >
              <Link href={item.path} className={styles.navLink}>
                {item.label}
              </Link>
              {(activeDropdown === index || isMobileMenuOpen) && (
                <div className={`${styles.dropdown} ${isMobileMenuOpen ? styles.mobileDropdown : ''} nav-dropdown`}>
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
              <div className={`${styles.dropdown} nav-dropdown ${styles.searchDropdown}`}>
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
              <div className={`${styles.dropdown} nav-dropdown ${styles.cartDropdown}`}>
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