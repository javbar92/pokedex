'use client'
import styles from './page.module.css'
import { Suspense } from 'react';
import PokemonList from '@/components/pokemon-list';
export default function Home({ searchParams } : any) {
  return (
    <main className={styles.main}>
      <Suspense key={searchParams.query} fallback={<div>a</div>}>
        <PokemonList query={searchParams.query || ''}/>
      </Suspense>
    </main>
  )
}
