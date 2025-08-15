"use client";
import React from "react";
import Link from "next/link";
import styles from "../../../styles/Footer.module.css";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Section principale */}
        <div className={styles.topSection}>
          <div className={styles.column}>
            <h4 className={styles.title}>À propos</h4>
            <ul className={styles.list}>
              <li>
                <Link href="/about">Notre histoire</Link>
              </li>
              <li>
                <Link href="/team">Équipe</Link>
              </li>
              <li>
                <Link href="/careers">Recrutement</Link>
              </li>
            </ul>
          </div>
          <div className={styles.column}>
            <h4 className={styles.title}>Assistance</h4>
            <ul className={styles.list}>
              <li>
                <li>
                  <Link href="/support">Centre d&apos;aide</Link>
                </li>
              </li>
              <li>
                <Link href="/contact">Contactez-nous</Link>
              </li>
              <li>
                <Link href="/shipping">Livraison & retours</Link>
              </li>
            </ul>
          </div>
          <div className={styles.column}>
            <h4 className={styles.title}>Suivez-nous</h4>
            <div className={styles.socialIcons}>
              <Link href="https://facebook.com">
                <img src="/icons/facebook.svg" alt="Facebook" />
              </Link>
              <Link href="https://twitter.com">
                <img src="/icons/twitter.svg" alt="Twitter" />
              </Link>
              <Link href="https://instagram.com">
                <img src="/icons/instagram.svg" alt="Instagram" />
              </Link>
            </div>
          </div>
        </div>

        {/* Section légale */}
        <div className={styles.bottomSection}>
          <p>
            &copy; {new Date().getFullYear()} E-Commerce. Tous droits réservés.
          </p>
          <ul className={styles.legalLinks}>
            <li>
              <Link href="/privacy">Politique de confidentialité</Link>
            </li>
            <li>
              <Link href="/terms">Conditions générales</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
