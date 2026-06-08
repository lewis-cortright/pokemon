import {
  getPokemonByUrl,
  getPokemonList
} from '../../services/http.client';
import { mapPokemonToDetails } from "#server/utils/utils";
import type { H3Event } from "h3";


export default defineEventHandler(async (event: H3Event): Promise<PokemonDetails[]> => {
  const query = getQuery(event);
  const limit = parseInt(query.limit?.toString() ?? '60', 10);
  const offset = parseInt(query.offset?.toString() ?? '0', 10);
  const listResponse: PokemonPageData = await getPokemonList(event, limit, offset);

  const pokemonProfileList: PokemonApiResponse[] = await Promise.all(
    listResponse.results.map((pokemonListItem) => getPokemonByUrl(pokemonListItem.url))
  );
  return pokemonProfileList.map(mapPokemonToDetails);
});