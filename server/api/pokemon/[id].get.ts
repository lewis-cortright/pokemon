
import { getPokemonById } from '../../services/http.client';
import { mapResponseToProfile } from "#server/utils/utils";

export default defineEventHandler(async (event): Promise<any> => {
  const idParam = getRouterParam(event, 'id');
  if (!idParam) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing Pokémon id'
    });
  }
  const pokemon = await getPokemonById(event, idParam);
  return mapResponseToProfile(pokemon);
});