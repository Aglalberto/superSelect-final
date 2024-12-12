
class Users {
   // rebderiza a pagina com todos os usuários
   index = (_req, res) => {
      try {
         res.status(200).send('Tabela com todos os usuários cadastrados');
      } catch (error) {
         console.error('Erro ao encontrar usuários cadastrados.', error);
         res.status(500).send('Erro ao encontrar usuários cadastrados.');
      };
   };
};

export default new Users();
