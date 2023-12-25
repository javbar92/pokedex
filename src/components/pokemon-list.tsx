import { useEffect, useState } from "react";
import { Pokemon } from '../types/pokemon';
import styles from '../app/page.module.css';
import Image from "next/image";
import { PokemonService } from "@/services/pokemon";
import Link from "next/link";

export default function PokemonList({query}: {query: string}) {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

  useEffect(() => {
    const pokemonService = new PokemonService();
    (async () => {
      const list = await pokemonService.searchPokemons(query);
      setPokemonList(list);
    })();
  }, [query])

  return(
    <div className={styles.gridWrapper}>
        { pokemonList?.length > 0 ? pokemonList?.map((pokemon, i) => (
          <Link key={pokemon.id} href={`/details?pokemon=${pokemon.name}`}>
            <div key={pokemon.id} className={styles.pokemonCard}>
              <div style={{ display: 'flex' }}>
                <div className={styles.pokemonNumber}>{pokemon?.id}</div>
                <div className={styles.pokemonName}>{pokemon?.name.toUpperCase()}</div>
              </div>
              <Image src={pokemon.image || '/images/pokeball.svg'} alt={pokemon?.name || ''} width={150} height={150} className={styles.pokemonImage}/>
            </div>
          </Link>
        )) : 'no hay equisde' }
      </div>
  );
}