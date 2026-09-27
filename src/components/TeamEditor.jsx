import { useState } from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';


function TeamEditor({
  pokemon,
  open,
  onClose,
  onSave,
}) {
  const [nickname, setNickname] = useState(
    pokemon?.nickname || '',
  );

  const [role, setRole] = useState(
    pokemon?.role || '',
  );

  const [notes, setNotes] = useState(
    pokemon?.notes || '',
  );


  function handleSave() {
    onSave({
      nickname: nickname || null,
      role: role || null,
      notes: notes || null,
    });
  }


  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        Editar Pokémon
      </DialogTitle>

      <DialogContent>
        <Stack
          spacing={2}
          sx={{ mt: 1 }}
        >
          <TextField
            label="Apelido"
            value={nickname}
            onChange={(event) => setNickname(event.target.value)}
            slotProps={{
              htmlInput: {
                maxLength: 100,
              },
            }}
          />

          <TextField
            label="Função na equipe"
            placeholder="Ex.: Atacante, Defesa, Velocidade"
            value={role}
            onChange={(event) => setRole(event.target.value)}
            slotProps={{
              htmlInput: {
                maxLength: 100,
              },
            }}
          />

          <TextField
            label="Observações"
            multiline
            minRows={3}
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            slotProps={{
              htmlInput: {
                maxLength: 500,
              },
            }}
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Cancelar
        </Button>

        <Button
          variant="contained"
          onClick={handleSave}
        >
          Salvar alterações
        </Button>
      </DialogActions>
    </Dialog>
  );
}


export default TeamEditor;