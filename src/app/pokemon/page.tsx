import Link from "next/link";

export default function PokemonPage() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Pokédex</h1>
      <p>
        This page is a placeholder for the Pokémon route. Use the home page to browse the Pokédex.
      </p>
      <Link href="/">Go back to home</Link>
    </main>
  );
}
