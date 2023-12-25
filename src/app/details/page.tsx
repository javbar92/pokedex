'use client'
import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { PokemonService } from '@/services/pokemon';
import { useSearchParams } from 'next/navigation';
import { Pokemon } from '@/types/pokemon';
import Image from 'next/image';
import { Rubik_Dirt } from 'next/font/google';

const rubik = Rubik_Dirt({ weight: ['400'], variable: '--font-rubik', subsets: ['latin'] });

export default function Details() {
  
  const searchParams = useSearchParams();
  const [pokemon, setPokemon] = useState<Pokemon>();

  useEffect(() => {
    (async () => {
      const params = new URLSearchParams(searchParams);
      console.log('params', params.get('pokemon'))
      const pokemonService = new PokemonService();
      const poke = await pokemonService.fetchPokemon(params.get('pokemon') || '')
      console.log('pokemon', poke)
      setPokemon(poke);
    })();
  }, [searchParams]);

  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: '#373737', display: 'flex' }}>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <Image src={pokemon?.image || '/images/pokeball.svg'} alt={pokemon?.name || ''} width={150} height={150} className={styles.pokemonImage} />
        </div>
        <div className={styles.numberNameContainer}>
          <span className={rubik.className}>#{pokemon?.id}</span> <span className={rubik.className}>{pokemon?.name.toUpperCase()}</span>
        </div>
        <div className={styles.numberNameContainer} style={{ marginTop: '10px' }}>
          {pokemon?.types.map((type, index) => (
            <div key={index} className={styles.typeBullet} style={{ backgroundColor: `var(--${type})` }}>
              {type}
            </div>
          ))}
        </div>
        <div className={styles.dataContainer}>
          <div style={{ textAlign: 'center', marginBottom: '25px', fontSize: 20, fontWeight: 600 }}>STATS</div>
          <div>
            {pokemon?.stats.map((stat, index) => (
              <div key={index} className={styles.statBar}>
                <div className={styles.fillBar} style={{ width: `${100/255*stat.value}%` }}></div>
                <span className={styles.statName}>{stat.name.toUpperCase().replace('-', ' ')}</span>
                <span className={styles.statValue}>{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

  )
}