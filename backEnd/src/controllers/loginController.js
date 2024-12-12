
class LoginLogout {
   // rebderiza a pagina de login
   login = (_req, res) => {
      try {
         res.status(200).send('Pagina de Login');
      } catch (error) {
         console.error('Erro ao fazer o login', error);
         res.status(500).send('Erro ao fazer o login');
      };
   };
};

export default new LoginLogout();
