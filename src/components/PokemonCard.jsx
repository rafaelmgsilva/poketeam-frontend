import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';

import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material';


function StatBar({ label, value }) {
  const percentage = Math.min((value / 150) * 100, 100);

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ mb: 0.5 }}
      >
        <Typography variant="body2">
          {label}
        </Typography>

        <Typography
          variant="body2"
          fontWeight={700}
        >
          {value}
        </Typography>
      </Stack>

      <LinearProgress
        variant="determinate"
        value={percentage}
        sx={{
          height: 8,
          borderRadius: 5,
        }}
      />
    </Box>
  );
}


function PokemonCard({
  pokemon,
  onAdd,
  teamFull,
  alreadyInTeam,
}) {
  if (!pokemon) {
    return null;
  }

  const displayName = (
    pokemon.name.charAt(0).toUpperCase()
    + pokemon.name.slice(1)
  );

  return (
    <Card
      elevation={4}
      sx={{
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          background: (
            'linear-gradient(135deg, #3b4cca 0%, #6f7ee8 100%)'
          ),
          p: 3,
          textAlign: 'center',
        }}
      >
        {pokemon.image_url && (
          <Box
            component="img"
            src={pokemon.image_url}
            alt={displayName}
            sx={{
              width: {
                xs: 180,
                sm: 240,
              },
              height: {
                xs: 180,
                sm: 240,
              },
              objectFit: 'contain',
            }}
          />
        )}
      </Box>

      <CardContent sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Box>
            <Typography
              variant="overline"
              color="text.secondary"
            >
              Pokédex #{pokemon.id}
            </Typography>

            <Typography
              variant="h4"
              fontWeight={800}
            >
              {displayName}
            </Typography>
          </Box>

          <Stack
            direction="row"
            spacing={1}
            flexWrap="wrap"
            useFlexGap
          >
            {pokemon.types.map((type) => (
              <Chip
                key={type}
                label={type}
                color="secondary"
                variant="outlined"
              />
            ))}
          </Stack>

          <Divider />

          <Stack spacing={1.5}>
            <StatBar
              label="HP"
              value={pokemon.stats.hp}
            />

            <StatBar
              label="Ataque"
              value={pokemon.stats.attack}
            />

            <StatBar
              label="Defesa"
              value={pokemon.stats.defense}
            />

            <StatBar
              label="Velocidade"
              value={pokemon.stats.speed}
            />
          </Stack>

          <Divider />

          <Stack
            direction="row"
            spacing={3}
          >
            <Box>
              <Typography
                variant="caption"
                color="text.secondary"
              >
                Altura
              </Typography>

              <Typography fontWeight={700}>
                {(pokemon.height / 10).toFixed(1)} m
              </Typography>
            </Box>

            <Box>
              <Typography
                variant="caption"
                color="text.secondary"
              >
                Peso
              </Typography>

              <Typography fontWeight={700}>
                {(pokemon.weight / 10).toFixed(1)} kg
              </Typography>
            </Box>
          </Stack>

          <Button
            variant="contained"
            size="large"
            startIcon={<AddCircleOutlinedIcon />}
            disabled={teamFull || alreadyInTeam}
            onClick={onAdd}
          >
            {alreadyInTeam
              ? 'Já está na equipe'
              : teamFull
                ? 'Equipe completa'
                : 'Adicionar à equipe'}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}


export default PokemonCard;