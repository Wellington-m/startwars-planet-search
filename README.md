# Boas-vindas ao projeto Star Wars Planets Search!


## Descrição
Este projeto trata-se de uma aplicação front-end na qual usa uma lista de planetas do universo de Star Wars, e a aplicação de filtros na mesma, utilizando **Context API e Hooks** para controlar os estados globais.


## Rodando a aplicação localmente via docker
* Clone o projeto ```git clone git@github.com:Wellington-m/startwars-planet-search.git```
* Entre na pasta ```cd startwars-planet-search```
* Crie a imagem docker ```docker build -t planetsearch .```
* Inicie o container ```docker run --name project_planet_search -p 3000:3000 -d planetsearch```
* Abra o navegador e entre no endereço http://localhost:3000/


## Nesse projeto, foi utilizado:

  * A _Context API_ do **React** para gerenciar estado.
  * O _React Hook useState_;
  * O _React Hook useContext_;
  * O _React Hook useEffect_;
  * _React Hooks_ customizados.
  * O _styled-components_ para estilização.

