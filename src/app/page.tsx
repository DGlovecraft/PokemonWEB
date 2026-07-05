"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import Skeleton from "@mui/material/Skeleton";
import styles from "./page.module.css";
import pokemonStyles from "./pokemon.module.css";

const PAGE_SIZE = 100;
const TOTAL = 1351;

export default function Home() {
  const [pageIndex, setPageIndex] = useState(0);
  const [pages, setPages] = useState<Record<number, any[]>>({});
  const [loading, setLoading] = useState(false);

  const fetchPage = async (index: number) => {
    const offset = index * PAGE_SIZE;
    setLoading(true);
    try {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${PAGE_SIZE}&offset=${offset}`
      );
      const data = await res.json();
      const results = data.results.map((p: any) => {
        const parts = p.url.split("/");
        const id = parts[parts.length - 2];
        const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
        return { name: p.name, url: p.url, id, image };
      });
      setPages((prev) => ({ ...prev, [index]: results }));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!pages[pageIndex]) fetchPage(pageIndex);
  }, [pageIndex]);

  const totalPages = Math.ceil(TOTAL / PAGE_SIZE);

  const currentList = pages[pageIndex] ?? [];

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.intro}>
          <div>
            <h1>Pokédex — All Pokémon</h1>
            <p>
              Browse every Pokémon from Bulbasaur to the latest generation with
              official artwork, stats, evolution chains, and cry audio.
            </p>
          </div>
          <div className={styles.ctas}>
            <Link href="/about" className="secondary">
              About this project
            </Link>
          </div>
        </section>

        <div className={pokemonStyles.controls}>
          <button
            className={pokemonStyles.controlButton}
            onClick={() => setPageIndex((i) => Math.max(0, i - 1))}
            disabled={pageIndex === 0}
          >
            Previous
          </button>
          <div className={pokemonStyles.pageInfo}>
            Page {pageIndex + 1} of {totalPages}
          </div>
          <button
            className={pokemonStyles.controlButton}
            onClick={() => setPageIndex((i) => Math.min(totalPages - 1, i + 1))}
            disabled={pageIndex >= totalPages - 1}
          >
            Next
          </button>
          <Link href="/about" className={pokemonStyles.aboutLink}>
            About
          </Link>
        </div>

        <div className={pokemonStyles.grid}>
          {currentList.length === 0 && loading
            ? Array.from({ length: 12 }).map((_, idx) => (
                <div key={idx} className={pokemonStyles.card}>
                  <Skeleton variant="rectangular" width={120} height={120} />
                  <Skeleton width="60%" />
                </div>
              ))
            : currentList.map((p: any, i: number) => {
                const globalIndex = pageIndex * PAGE_SIZE + i + 1;
                return (
                  <a
                    key={p.name}
                    href={`/pokemon/${p.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={pokemonStyles.card}
                  >
                    <div className={pokemonStyles.cardInner}>
                      <div className={pokemonStyles.indexBadge}>#{globalIndex}</div>
                      <Image src={p.image} alt={p.name} width={120} height={120} priority={false} />
                      <div className={pokemonStyles.cardTitle}>{p.name}</div>
                    </div>
                  </a>
                );
              })}
        </div>

        {loading && currentList.length > 0 && (
          <div style={{ marginTop: 12 }}>
            <Skeleton variant="rectangular" height={8} width={200} />
          </div>
        )}
      </main>
    </div>
  );
}
