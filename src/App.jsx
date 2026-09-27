import { useEffect, useState } from 'react';

import { getTeam } from './api/apiClient';


function App() {
  const [message, setMessage] = useState('Consultando API...');

  useEffect(() => {
    async function loadTeam() {
      try {
        const team = await getTeam();

        setMessage(
          `Comunicação funcionando. Pokémon na equipe: ${team.length}`,
        );
      } catch (error) {
        setMessage(`Erro: ${error.message}`);
      }
    }

    loadTeam();
  }, []);

  return (
    <main>
      <h1>PokéTeam</h1>
      <p>{message}</p>
    </main>
  );
}


export default App;