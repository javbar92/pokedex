'use client'
import Image from 'next/image';
import styles from './styles.module.css';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export default function Header() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter()
  const [searchValue, setSearchValue] = useState(searchParams.get('query')?.toString() || '');

  const handleSearch = useDebouncedCallback((term: string) => {
    setSearchValue(term);
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  function clearSearch() {
    setSearchValue('');
  }

  return (
    <header className={styles.header}>
      <div className={styles.homeButton}>
        <Link href='/' onClick={clearSearch} className={styles.homeButtonText}>POKEDEX</Link>
      </div>
      <div className={styles.center}>
        <div className={styles.search}>
          <Image src='/images/pokeball.svg' width={30} height={30} alt='pokeball' className={styles.imageSearch} />
          <input type="text" className={styles.inputSearch} onChange={(e) => { handleSearch(e.target.value); setSearchValue(e.target.value) }} placeholder='Search Pokemon...' value={searchValue}/>
          <Image src='/images/search-solid.svg' width={20} height={20} alt='pokeball' className={styles.buttonSearch} />
        </div>
      </div>
    </header>
  )
}
