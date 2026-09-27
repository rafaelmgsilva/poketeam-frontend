import SearchIcon from '@mui/icons-material/Search';

import {
  Button,
  InputAdornment,
  Paper,
  Stack,
  TextField,
} from '@mui/material';


function PokemonSearch({
  searchValue,
  onSearchValueChange,
  onSearch,
  loading,
}) {
  function handleSubmit(event) {
    event.preventDefault();

    onSearch();
  }

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      elevation={2}
      sx={{
        p: 2,
        borderRadius: 3,
      }}
    >
      <Stack
        direction={{
          xs: 'column',
          sm: 'row',
        }}
        spacing={2}
      >
        <TextField
          fullWidth
          label="Nome ou número do Pokémon"
          placeholder="Ex.: pikachu ou 25"
          value={searchValue}
          onChange={(event) => onSearchValueChange(event.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={loading || !searchValue.trim()}
          sx={{
            minWidth: 140,
          }}
        >
          {loading ? 'Buscando...' : 'Buscar'}
        </Button>
      </Stack>
    </Paper>
  );
}


export default PokemonSearch;