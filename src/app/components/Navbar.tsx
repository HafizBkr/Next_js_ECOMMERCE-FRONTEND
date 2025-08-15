"use client";
import React, { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import styles from "../../../styles/Navbar.module.css";
import useCategories from "../hooks/useCategories";
import useProductSearch from "../hooks/useSearch";
import xbox from "../public/images/console.jpeg";
import mac from "../public/images/mac.png";
import montre from "../public/images/montre.jpeg";
import airpods from "../public/images/airpods.jpeg";
import event from "../public/images/event.jpg";

interface SubCategory {
  title: string;
  image: string;
  link: string;
}

interface NavItem {
  label: string;
  path: string;
  options: SubCategory[];
  featured?: string[];
}

interface NavbarProps {
  activeDropdown: number | null;
  onDropdownChange: (dropdown: number | null) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  activeDropdown,
  onDropdownChange,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState<NodeJS.Timeout | null>(
    null,
  );

  const { searchResults, loading, error, searchProducts } = useProductSearch();
  const { categories } = useCategories();

  const staticNavItems: NavItem[] = [
    {
      label: "Boutique",
      path: "/Products",
      options: [
        { title: "Derniers Arrivages", image: xbox.src, link: "/Products" },
        { title: "Tendances", image: mac.src, link: "/Products" },
        { title: "Collections", image: montre.src, link: "/Products" },
        { title: "Marques", image: airpods.src, link: "/Products" },
      ],
      featured: ["Google", "Dell", "Apple", "SAMSUNG"],
    },
    {
      label: "Evenements",
      path: "/events",
      options: [{ title: "We Love Eya", image: event.src, link: "/events" }],
    },
  ];

  const dynamicCategoryNavItems: NavItem[] = categories.map((category) => ({
    label: category.nom,
    path: `/categories/${category.id}`,
    options: [
      {
        title: category.nom,
        image: "/api/placeholder/240/160",
        link: `/categories/${category.id}`,
      },
    ],
  }));

  const navItems = [...staticNavItems, ...dynamicCategoryNavItems];

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".nav-item") && !target.closest(".nav-dropdown")) {
        onDropdownChange(null);
      }
    },
    [onDropdownChange],
  );

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [onDropdownChange, handleClickOutside]);

  useEffect(() => {
    if (typeof document !== "undefined") {
      if (isMobileMenuOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "unset";
      }
    }
  }, [isMobileMenuOpen]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (debouncedSearch) {
      clearTimeout(debouncedSearch);
    }

    const timerId = setTimeout(() => {
      searchProducts(query);
    }, 300);

    setDebouncedSearch(timerId);
  };

  useEffect(() => {
    return () => {
      if (debouncedSearch) {
        clearTimeout(debouncedSearch);
      }
    };
  }, [debouncedSearch]);

  const handleDropdown = useCallback(
    (index: number) => {
      onDropdownChange(activeDropdown === index ? null : index);
    },
    [activeDropdown, onDropdownChange],
  );

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(!isMobileMenuOpen);

    onDropdownChange(null);
  }, [isMobileMenuOpen, onDropdownChange]);

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <button
          className={`${styles.mobileMenuButton} ${isMobileMenuOpen ? styles.active : ""}`}
          onClick={toggleMobileMenu}
          aria-label="Menu"
        >
          {isMobileMenuOpen ? (
            <X className={styles.icon} />
          ) : (
            <Menu className={styles.icon} />
          )}
        </button>

        <h3 className={styles.logo}>E-Commerce</h3>

        <ul
          className={`${styles.navLinks} ${isMobileMenuOpen ? styles.mobileMenuOpen : ""}`}
        >
          {navItems.map((item, index) => (
            <li
              key={index}
              className={`${styles.navItem} nav-item`}
              onMouseEnter={() => !isMobileMenuOpen && handleDropdown(index)}
              onMouseLeave={() => !isMobileMenuOpen && onDropdownChange(null)}
              onClick={() => isMobileMenuOpen && handleDropdown(index)}
            >
              <Link href={item.path} className={styles.navLink}>
                {item.label}
              </Link>
              {(activeDropdown === index || isMobileMenuOpen) && (
                <div
                  className={`${styles.dropdown} ${isMobileMenuOpen ? styles.mobileDropdown : ""} nav-dropdown`}
                >
                  <div className={styles.dropdownGroup}>
                    <h2>{item.label}</h2>
                    <div className={styles.categoryGrid}>
                      {item.options.map((option, optionIndex) => (
                        <Link
                          key={optionIndex}
                          href={option.link}
                          className={styles.categoryCard}
                        >
                          <div className={styles.categoryImage}>
                            <img
                              src={option.image}
                              alt={option.title}
                              className={styles.categoryImg}
                            />
                          </div>
                          <h3 className={styles.categoryTitle}>
                            {option.title}
                          </h3>
                        </Link>
                      ))}
                    </div>
                    {item.featured && (
                      <div className={styles.featuredBrands}>
                        <h3>Marques populaires</h3>
                        <ul>
                          {item.featured.map((brand, brandIndex) => (
                            <li key={brandIndex}>
                              <Link href="#" className={styles.dropdownLink}>
                                {brand}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className={styles.iconContainer}>
          <div className={`${styles.navItem} nav-item`}>
            <button
              className={`${styles.iconButton} ${activeDropdown === 0 ? styles.active : ""}`}
              onClick={() => handleDropdown(0)}
              aria-label="Rechercher"
            >
              <Search className={styles.icon} />
            </button>
            {activeDropdown === 0 && (
              <div
                className={`${styles.dropdown} nav-dropdown ${styles.searchDropdown}`}
              >
                <div className={styles.dropdownGroup}>
                  <div className={styles.searchWrapper}>
                    <div className={styles.searchBox}>
                      <Search className={styles.searchIcon} />
                      <input
                        type="text"
                        placeholder="Rechercher des produits..."
                        className={styles.searchInput}
                        value={searchQuery}
                        onChange={handleSearchChange}
                      />
                    </div>
                    {searchQuery && (
                      <div className={styles.searchResultsContainer}>
                        <div className={styles.searchResultsDropdown}>
                          {loading ? (
                            <div className={styles.searchLoadingIndicator}>
                              <div className={styles.loadingSpinner}></div>
                              Recherche en cours...
                            </div>
                          ) : error ? (
                            <div className={styles.searchErrorIndicator}>
                              {error}
                            </div>
                          ) : Array.isArray(searchResults) &&
                            searchResults.length === 0 ? (
                            <div className={styles.searchNoResults}>
                              Aucun résultat trouvé pour &quot;{searchQuery}
                              &quot;
                            </div>
                          ) : Array.isArray(searchResults) ? (
                            searchResults.map((product) => (
                              <Link
                                key={product.id}
                                href={`/SingleProductPage/${product.id}`}
                                className={styles.searchResultItem}
                              >
                                <img
                                  src={
                                    product.photos?.[0] ||
                                    "/placeholder-image.jpg"
                                  }
                                  alt={product.nom}
                                  className={styles.searchResultImage}
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = "/placeholder-image.jpg";
                                  }}
                                />
                                <div className={styles.searchResultDetails}>
                                  <h4>{product.nom}</h4>
                                  <div className={styles.productDescription}>
                                    {product.description &&
                                      product.description.slice(0, 100)}
                                    {product.description &&
                                    product.description.length > 100
                                      ? "..."
                                      : ""}
                                  </div>
                                  <div className={styles.productInfo}>
                                    <p>{product.prix.toFixed(2)}€</p>
                                    <span className={styles.stockBadge}>
                                      {product.stock > 0
                                        ? "En stock"
                                        : "Rupture de stock"}
                                    </span>
                                  </div>
                                  {product.marque && (
                                    <div className={styles.brandInfo}>
                                      Marque: {product.marque}
                                    </div>
                                  )}
                                </div>
                              </Link>
                            ))
                          ) : (
                            <div className={styles.searchErrorIndicator}>
                              Une erreur est survenue lors de la recherche
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    <div className={styles.quickLinksSection}>
                      <h3>Liens rapides</h3>
                      <ul>
                        {["Ordinateurs", "Telephones", "Claviers"].map(
                          (link, index) => (
                            <li key={index}>
                              <Link href="#" className={styles.dropdownLink}>
                                {link}
                              </Link>
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className={`${styles.navItem} nav-item`}>
            <button
              className={`${styles.iconButton} ${activeDropdown === 1 ? styles.active : ""}`}
              onClick={() => handleDropdown(1)}
              aria-label="Panier"
            >
              <ShoppingBag className={styles.icon} />
            </button>
            {activeDropdown === 1 && (
              <div
                className={`${styles.dropdown} nav-dropdown ${styles.cartDropdown}`}
              >
                <div className={styles.dropdownGroup}>
                  <h2>Votre panier est vide.</h2>
                  <p>
                    <Link href="/login" className={styles.dropdownLink}>
                      Connectez-vous
                    </Link>{" "}
                    pour voir vos articles enregistrés
                  </p>
                  <div className={styles.cartLinks}>
                    <ul>
                      <li>
                        <Link href="/profile" className={styles.dropdownLink}>
                          Mon profil
                        </Link>
                      </li>
                      <li>
                        <Link href="/Panier" className={styles.dropdownLink}>
                          Commandes
                        </Link>
                      </li>
                      <li>
                        <Link href="/saved" className={styles.dropdownLink}>
                          Articles sauvegardés
                        </Link>
                      </li>
                      <li>
                        <Link href="/account" className={styles.dropdownLink}>
                          Compte
                        </Link>
                      </li>
                      <li>
                        <Link href="/login" className={styles.dropdownLink}>
                          Se connecter
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        className={`${styles.overlay} ${activeDropdown !== null ? styles.active : ""}`}
      ></div>
    </nav>
  );
};

export default Navbar;
