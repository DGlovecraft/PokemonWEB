import Link from "next/link";
import styles from "./about.module.css";

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.heroCopy}>
          <div className={styles.badge}>Pokédex App</div>
          <h1 className={styles.title}>About This Project</h1>
          <p className={styles.subtitle}>
            A lightweight Pokedex experience built with Next.js App Router, PokéAPI data, and real Pokémon cry audio.
          </p>
          <Link href="/" className={styles.button}>
            Back to Pokédex
          </Link>
        </div>
        <div className={styles.heroStats}>
          <div className={styles.statCard}>
            <span className={styles.statValue}>1351</span>
            <span className={styles.statLabel}>Pokémon</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statValue}>100</span>
            <span className={styles.statLabel}>Per page</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statValue}>Real</span>
            <span className={styles.statLabel}>Cry audio</span>
          </div>
        </div>
      </div>

      <div className={styles.card}>
        <p className={styles.paragraph}>
          ผู้พัฒนา: ณัฐวุฒิ จันทร์สนิท
        </p>
        <p className={styles.paragraph}>
          รายวิชา: IN403101 Front-end Web Programming
        </p>
        <p className={styles.paragraph}>
          Source: <a href="https://github.com/" className={styles.link}>GitHub Repository</a>
        </p>
        <p className={styles.paragraph}>
          This project fetches Pokémon data from the <a href="https://pokeapi.co/api/v2/" className={styles.link}>PokéAPI</a> and demonstrates paginated fetching, detail pages, skeleton loading, and responsive layout.
        </p>
      </div>

      <div className={styles.featureList}>
        <article className={styles.featureCard}>
          <h2 className={styles.sectionTitle}>Browse Every Pokémon</h2>
          <p className={styles.paragraph}>
            Navigate through all 1351 Pokémon with a fast paginated list, clean card layout, and official artwork.
          </p>
        </article>
        <article className={styles.featureCard}>
          <h2 className={styles.sectionTitle}>Detail Pages</h2>
          <p className={styles.paragraph}>
            See Pokémon types, stats, evolution chains, and official images on each detail page.
          </p>
        </article>
        <article className={styles.featureCard}>
          <h2 className={styles.sectionTitle}>Real Cry Audio</h2>
          <p className={styles.paragraph}>
            Hear Pokémon cry audio served through a proxy API route for a more authentic Pokedex feel.
          </p>
        </article>
      </div>
    </div>
  );
}
