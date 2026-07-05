import Image from "next/image";
import PlaySoundButton from "./PlaySoundButton";
import styles from "./detail.module.css";

export default async function PokemonDetail({ params }: { params: { name: string } | Promise<{ name: string }> }) {
  const p = await params;
  const name = p.name;
  try {
    const r1 = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!r1.ok) throw new Error("not found");
    const data = await r1.json();

    const r2 = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`);
    const sp = r2.ok ? await r2.json() : null;

    const evolutions: string[] = [];
    if (sp?.evolution_chain?.url) {
      const r3 = await fetch(sp.evolution_chain.url);
      if (r3.ok) {
        const ec = await r3.json();
        const traverse = (node: any) => {
          if (!node) return;
          evolutions.push(node.species.name);
          node.evolves_to?.forEach((child: any) => traverse(child));
        };
        traverse(ec.chain);
      }
    }

    const img = data.sprites?.other?.["official-artwork"]?.front_default || data.sprites?.front_default;

    return (
      <div className={styles.page}>
        <div className={styles.headerRow}>
          <a href="/" className={styles.backLink}>
            ← Back to Pokédex
          </a>
          <div>
            <h1 className={styles.title}>{data.name}</h1>
            <div className={styles.meta}>#{data.id} • {data.types.map((t: any) => t.type.name).join(" / ")}</div>
          </div>
        </div>

        <div className={styles.layout}>
          <div className={styles.imageCard}>
            <div className={styles.imageCardInner}>
              {img ? (
                <Image src={img} alt={data.name} width={320} height={320} />
              ) : (
                <div style={{ width: 320, height: 320, background: "#f2f2f2" }} />
              )}
            </div>
            <div className={styles.buttonRow}>
              <PlaySoundButton text={data.name} id={data.id} className={styles.soundButton} />
            </div>
          </div>

          <div>
            <section className={styles.section}>
              <div className={styles.sectionTitle}>Types</div>
              <div className={styles.types}>
                {data.types.map((t: any) => (
                  <span key={t.type.name} className={styles.chip}>{t.type.name}</span>
                ))}
              </div>
            </section>

            <section className={styles.section}>
              <div className={styles.sectionTitle}>Stats</div>
              <ul className={styles.statsList}>
                {data.stats.map((s: any) => (
                  <li key={s.stat.name} className={styles.statRow}>
                    <div className={styles.statName}>
                      <span>{s.stat.name}</span>
                      <strong>{s.base_stat}</strong>
                    </div>
                    <div className={styles.statBar}>
                      <div className={styles.statFill} style={{ width: `${Math.min(s.base_stat, 100)}%` }} />
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section className={styles.section}>
              <div className={styles.sectionTitle}>Evolution</div>
              <div className={styles.evolutions}>
                {evolutions.length === 0 ? (
                  <span className={styles.chip}>None</span>
                ) : (
                  evolutions.map((n) => (
                    <a key={n} href={`/pokemon/${n}`} className={styles.chip}>{n}</a>
                  ))
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  } catch (e) {
    return <div className={styles.page}>Pokémon not found.</div>;
  }
}
