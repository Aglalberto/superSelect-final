
class Products {
   // Renderiza todos os produtos
   index = (_req, res) => {
      try {
         res.status(200).send('Tabela com todos os produtos.');
      } catch (error) {
         console.error('Erro ao buscar todos os produtos.', error);
         res.status(500).send('Erro ao buscar todos os produtos.');
      };
   };

   show = (_req, res) => {
      try {
         res.status(200).send('Mostra o produto selecionado por Id.');
      } catch (error) {
         console.error('Erro ao buscar produto por id.', error);
         res.status(500).send('Erro ao buscar produto por id.');
      };
   };
};

export default new Products();