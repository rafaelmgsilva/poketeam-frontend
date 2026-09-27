/**
 * Cliente HTTP responsável pela comunicação com a PokéTeam API.
 */

const API_BASE_URL = 'http://localhost:8000/api/v1';

/**
 * Processa uma resposta HTTP e lança um erro quando necessário.
 *
 * @param {Response} response Resposta recebida da API.
 * @returns {Promise<any>} Conteúdo JSON da resposta.
 */
async function handleResponse(response) {
  if (!response.ok) {
    let message = 'Ocorreu um erro ao processar a solicitação.';

    try {
      const errorData = await response.json();

      if (errorData.detail) {
        message = errorData.detail;
      }
    } catch {
      // Mantém a mensagem genérica quando não houver resposta JSON.
    }

    throw new Error(message);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}


/**
 * Consulta um Pokémon pelo nome ou número da Pokédex.
 */
export async function getPokemon(identifier) {
  const response = await fetch(
    `${API_BASE_URL}/pokemon/${encodeURIComponent(identifier)}`,
  );

  return handleResponse(response);
}


/**
 * Obtém todos os Pokémon pertencentes à equipe.
 */
export async function getTeam() {
  const response = await fetch(`${API_BASE_URL}/team`);

  return handleResponse(response);
}


/**
 * Adiciona um Pokémon à equipe.
 */
export async function addPokemonToTeam(data) {
  const response = await fetch(`${API_BASE_URL}/team`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return handleResponse(response);
}


/**
 * Atualiza informações personalizadas de um Pokémon.
 */
export async function updateTeamPokemon(id, data) {
  const response = await fetch(`${API_BASE_URL}/team/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return handleResponse(response);
}


/**
 * Remove um Pokémon da equipe.
 */
export async function removePokemonFromTeam(id) {
  const response = await fetch(`${API_BASE_URL}/team/${id}`, {
    method: 'DELETE',
  });

  return handleResponse(response);
}