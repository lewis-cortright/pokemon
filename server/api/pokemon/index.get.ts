import {
  getPokemonByUrl,
  getPokemonList
} from '../../services/http.client';
import { mapPokemonToDetails } from "#server/utils/utils";
import type { H3Event } from "h3";


export default defineEventHandler(async (event: H3Event): Promise<PokemonDetails[]> => {
  const listResponse: PokemonPageData = await getPokemonList(event, 60);

  const pokemonProfileList: PokemonApiResponse[] = await Promise.all(
    listResponse.results.map((pokemonListItem) => getPokemonByUrl(pokemonListItem.url))
  );
  return pokemonProfileList.map(mapPokemonToDetails);
});