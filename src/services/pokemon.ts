import { Pokemon } from '../types/pokemon';
import PokeJSON from '../helpers/pokemons.json';

export class PokemonService {
  private pokemonList;

  constructor() {
    this.pokemonList = PokeJSON.results;
  }

  async fetchPokemonList(limit: number, offset: number): Promise<[Pokemon]> {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    const pokemonResponse = await response.json();
    return await Promise.all<[Pokemon]>(pokemonResponse.results.map(async (e: any): Promise<Pokemon> => {
      const responsePoke = await fetch(`https://pokeapi.co/api/v2/pokemon/${e.name}`);
      const poke = await responsePoke.json();
      return {
        id: poke.id,
        name: poke.name,
        image: poke.sprites.other['official-artwork'].front_default || poke.sprites.other.home.front_default,
        types: pokemonResponse.types?.map((e: any) => e.type.name),
        weight: pokemonResponse.weight,
        stats: pokemonResponse.stats?.map((e: any) => ({ name: e.stat.name, value: e.base_stat }))
      };
    }));
  }

  async fetchPokemon(search: string): Promise<Pokemon> {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${search}`);
    console.log('response', response)
    const pokemonResponse = await response.json();
    console.log(pokemonResponse.types[0].type.name)
    return {
      id: pokemonResponse.id,
      name: pokemonResponse.name,
      image: pokemonResponse.sprites.other['official-artwork'].front_default || pokemonResponse.sprites.other.home.front_default,
      types: pokemonResponse.types?.map((e: any) => e.type.name),
      weight: pokemonResponse.weight,
      stats: pokemonResponse.stats?.map((e: any) => ({ name: e.stat.name, value: e.base_stat }))
    };
  }

  async searchPokemons(search: string): Promise<Pokemon[]> {
    const foundPokemons = this.pokemonList.filter(e => e.name.includes(search.toLowerCase()));
    if (search !== '') return await Promise.all(foundPokemons.map(async (pokemon) => {
      return await this.fetchPokemon(pokemon.name);
    }));
    return await this.fetchPokemonList(15, 0);
  }
}