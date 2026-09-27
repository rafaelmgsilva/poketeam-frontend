import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
} from '@mui/material';


function TeamCard({
  pokemon,
  onEdit,
  onDelete,
}) {
  const displayName = (
    pokemon.name.charAt(0).toUpperCase()
    + pokemon.name.slice(1)
  );

  return (
    <Card
      variant="outlined"
      sx={{
        height: '100%',
        transition: '0.2s',
        '&:hover': {
          transform: 'translateY(-3px)',
          boxShadow: 4,
        },
      }}
    >
      <Box
        sx={{
          bgcolor: '#f0f2ff',
          textAlign: 'center',
          p: 2,
        }}
      >
        {pokemon.image_url && (
          <Box
            component="img"
            src={pokemon.image_url}
            alt={displayName}
            sx={{
              width: 135,
              height: 135,
              objectFit: 'contain',
            }}
          />
        )}
      </Box>

      <CardContent>
        <Stack spacing={1.5}>
          <Box>
            <Typography
              variant="caption"
              color="text.secondary"
            >
              #{pokemon.pokemon_id}
            </Typography>

            <Typography
              variant="h6"
              fontWeight={800}
            >
              {pokemon.nickname || displayName}
            </Typography>

            {pokemon.nickname && (
              <Typography
                variant="body2"
                color="text.secondary"
              >
                {displayName}
              </Typography>
            )}
          </Box>

          <Stack
            direction="row"
            spacing={1}
            flexWrap="wrap"
            useFlexGap
          >
            <Chip
              size="small"
              label={pokemon.primary_type}
            />

            {pokemon.secondary_type && (
              <Chip
                size="small"
                label={pokemon.secondary_type}
              />
            )}
          </Stack>

          {pokemon.role && (
            <Typography variant="body2">
              <strong>Função:</strong> {pokemon.role}
            </Typography>
          )}

          <Stack
            direction="row"
            spacing={1}
          >
            <Button
              fullWidth
              variant="outlined"
              startIcon={<EditOutlinedIcon />}
              onClick={() => onEdit(pokemon)}
            >
              Editar
            </Button>

            <Button
              fullWidth
              color="error"
              variant="outlined"
              startIcon={<DeleteOutlinedIcon />}
              onClick={() => onDelete(pokemon)}
            >
              Remover
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}


export default TeamCard;