import { useEffect, useState } from 'react';

import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';

import {
  Alert,
  AppBar,
  Box,
  Container,
  Paper,
  Snackbar,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';

import {
  addPokemonToTeam,
  getPokemon,
  getTeam,
  removePokemonFromTeam,
  updateTeamPokemon,
} from '../api/apiClient';

import PokemonCard from '../components/PokemonCard';
import PokemonSearch from '../components/PokemonSearch';
import TeamCard from '../components/TeamCard';
import TeamEditor from '../components/TeamEditor';


function HomePage() {
  const [searchValue, setSearchValue] = useState('');
  const [searchedPokemon, setSearchedPokemon] = useState(null);
  const [team, setTeam] = useState([]);

  const [loadingSearch, setLoadingSearch] = useState(false);

  const [editorOpen, setEditorOpen] = useState(false);
  const [selectedTeamPokemon, setSelectedTeamPokemon] = useState(null);

  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success',
  });


  /**
   * Exibe uma notificação para o usuário.
   *
   * @param {string} message Mensagem apresentada.
   * @param {'success' | 'error' | 'warning' | 'info'} severity
   * Tipo da notificação.
   */
  function showNotification(message, severity = 'success') {
    setNotification({
      open: true,
      message,
      severity,
    });
  }


  /**
   * Atualiza os dados da equipe consultando o backend.
   */
  async function loadTeam() {
    try {
      const data = await getTeam();

      setTeam(data);
    } catch (error) {
      showNotification(error.message, 'error');
    }
  }


  /*
   * Carregamento inicial da equipe.
   *
   * A consulta é assíncrona e ocorre somente na montagem
   * inicial da página.
   */
  useEffect(() => {
    getTeam()
      .then((data) => {
        setTeam(data);
      })
      .catch((error) => {
        setNotification({
          open: true,
          message: error.message,
          severity: 'error',
        });
      });
  }, []);


  /**
   * Pesquisa um Pokémon pelo nome ou número da Pokédex.
   */
  async function handleSearch() {
    if (!searchValue.trim()) {
      return;
    }

    setLoadingSearch(true);

    try {
      const pokemon = await getPokemon(searchValue.trim());

      setSearchedPokemon(pokemon);
    } catch (error) {
      setSearchedPokemon(null);

      showNotification(
        error.message,
        'error',
      );
    } finally {
      setLoadingSearch(false);
    }
  }


  /**
   * Adiciona o Pokémon pesquisado à equipe.
   */
  async function handleAddPokemon() {
    if (!searchedPokemon) {
      return;
    }

    try {
      await addPokemonToTeam({
        pokemon_identifier: searchedPokemon.name,
        nickname: null,
        role: null,
        notes: null,
      });

      await loadTeam();

      showNotification(
        `${searchedPokemon.name} foi adicionado à equipe.`,
      );
    } catch (error) {
      showNotification(
        error.message,
        'error',
      );
    }
  }


  /**
   * Abre o editor para um Pokémon da equipe.
   *
   * @param {object} pokemon Pokémon que será editado.
   */
  function handleOpenEditor(pokemon) {
    setSelectedTeamPokemon(pokemon);
    setEditorOpen(true);
  }


  /**
   * Fecha o editor e limpa o Pokémon selecionado.
   */
  function handleCloseEditor() {
    setEditorOpen(false);
    setSelectedTeamPokemon(null);
  }


  /**
   * Persiste as alterações feitas no Pokémon.
   *
   * @param {object} data Campos editáveis.
   */
  async function handleSavePokemon(data) {
    if (!selectedTeamPokemon) {
      return;
    }

    try {
      await updateTeamPokemon(
        selectedTeamPokemon.id,
        data,
      );

      handleCloseEditor();

      await loadTeam();

      showNotification(
        'Pokémon atualizado com sucesso.',
      );
    } catch (error) {
      showNotification(
        error.message,
        'error',
      );
    }
  }


  /**
   * Remove um Pokémon da equipe após confirmação do usuário.
   *
   * @param {object} pokemon Pokémon que será removido.
   */
  async function handleDeletePokemon(pokemon) {
    const pokemonName = pokemon.nickname || pokemon.name;

    const confirmed = window.confirm(
      `Deseja remover ${pokemonName} da equipe?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      await removePokemonFromTeam(pokemon.id);

      await loadTeam();

      showNotification(
        'Pokémon removido da equipe.',
      );
    } catch (error) {
      showNotification(
        error.message,
        'error',
      );
    }
  }


  /**
   * Fecha a notificação atualmente exibida.
   */
  function handleCloseNotification() {
    setNotification((current) => ({
      ...current,
      open: false,
    }));
  }


  /*
   * Verifica se o Pokémon encontrado já pertence à equipe.
   */
  const alreadyInTeam = searchedPokemon
    ? team.some(
        (pokemon) => (
          pokemon.pokemon_id === searchedPokemon.id
        ),
      )
    : false;


  return (
    <>
      <AppBar
        position="static"
        elevation={0}
      >
        <Toolbar>
          <CatchingPokemonIcon
            sx={{ mr: 1 }}
          />

          <Typography
            variant="h6"
            fontWeight={800}
            sx={{ flexGrow: 1 }}
          >
            PokéTeam
          </Typography>

          <Typography variant="body2">
            Equipe {team.length}/6
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          py: {
            xs: 4,
            md: 6,
          },
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={5}>
            <Box
              sx={{
                textAlign: 'center',
                maxWidth: 750,
                mx: 'auto',
              }}
            >
              <Typography
                variant="h3"
                component="h1"
                gutterBottom
              >
                Monte sua equipe Pokémon
              </Typography>

              <Typography
                variant="h6"
                color="text.secondary"
                fontWeight={400}
              >
                Pesquise Pokémon, consulte suas estatísticas
                e monte uma equipe com até seis integrantes.
              </Typography>
            </Box>

            <PokemonSearch
              searchValue={searchValue}
              onSearchValueChange={setSearchValue}
              onSearch={handleSearch}
              loading={loadingSearch}
            />

            {searchedPokemon && (
              <Box
                sx={{
                  maxWidth: 550,
                  width: '100%',
                  mx: 'auto',
                }}
              >
                <PokemonCard
                  pokemon={searchedPokemon}
                  onAdd={handleAddPokemon}
                  teamFull={team.length >= 6}
                  alreadyInTeam={alreadyInTeam}
                />
              </Box>
            )}

            <Box>
              <Stack
                direction={{
                  xs: 'column',
                  sm: 'row',
                }}
                justifyContent="space-between"
                alignItems={{
                  xs: 'flex-start',
                  sm: 'center',
                }}
                spacing={1}
                sx={{ mb: 2 }}
              >
                <Box>
                  <Typography
                    variant="h4"
                    fontWeight={800}
                  >
                    Minha equipe
                  </Typography>

                  <Typography color="text.secondary">
                    Você pode adicionar até seis Pokémon.
                  </Typography>
                </Box>

                <Typography
                  color="text.secondary"
                  fontWeight={700}
                >
                  {team.length} de 6
                </Typography>
              </Stack>

              {team.length === 0 ? (
                <Paper
                  variant="outlined"
                  sx={{
                    p: 5,
                    textAlign: 'center',
                  }}
                >
                  <CatchingPokemonIcon
                    sx={{
                      fontSize: 55,
                      color: 'text.secondary',
                    }}
                  />

                  <Typography
                    variant="h6"
                    sx={{ mt: 1 }}
                  >
                    Sua equipe ainda está vazia
                  </Typography>

                  <Typography color="text.secondary">
                    Pesquise um Pokémon acima e adicione-o
                    à equipe.
                  </Typography>
                </Paper>
              ) : (
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                      xs: '1fr',
                      sm: 'repeat(2, 1fr)',
                      md: 'repeat(3, 1fr)',
                    },
                    gap: 2,
                  }}
                >
                  {team.map((pokemon) => (
                    <TeamCard
                      key={pokemon.id}
                      pokemon={pokemon}
                      onEdit={handleOpenEditor}
                      onDelete={handleDeletePokemon}
                    />
                  ))}
                </Box>
              )}
            </Box>
          </Stack>
        </Container>
      </Box>

      {editorOpen && selectedTeamPokemon && (
        <TeamEditor
          key={selectedTeamPokemon.id}
          pokemon={selectedTeamPokemon}
          open={editorOpen}
          onClose={handleCloseEditor}
          onSave={handleSavePokemon}
        />
      )}

      <Snackbar
        open={notification.open}
        autoHideDuration={4000}
        onClose={handleCloseNotification}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Alert
          severity={notification.severity}
          variant="filled"
          onClose={handleCloseNotification}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </>
  );
}


export default HomePage;