# Aplicação de Filmes em React Native

## Visão Geral
Esta aplicação móvel, desenvolvida em React Native, implementa um sistema de navegação com autenticação de usuário (login e cadastro) e navegação entre diferentes telas de filmes. Utiliza diversas bibliotecas como `react-navigation`, `react-native-elements`, `react-native-paper`, `AsyncStorage` e componentes de UI do `react-native`.

![sexo](https://github.com/caioarnoni21/Projeto/assets/166638927/f7652994-5a4f-4c2f-be14-9d029a6f2a0b)


## Estrutura do Projeto
O projeto está dividido em várias classes e componentes que representam diferentes telas e funcionalidades da aplicação:

### Componentes Principais:
1. **Principal:** Tela de login.
2. **Cadastro:** Tela de cadastro de novos usuários.
3. **Nav2:** Componente de navegação que gerencia as rotas internas após o login.
4. **Categorias:** Tela que permite ao usuário filtrar filmes com base em critérios como quem está assistindo, humor e gênero do filme.
5. **Filme1 a Filme5:** Telas que exibem detalhes de filmes específicos.

## Implementação das Telas

### Tela de Login (Principal)
- **Estados:** `email` e `senha`.
- **Métodos:**
  - `handleLogin`: Verifica se as credenciais estão corretas comparando com dados armazenados no `AsyncStorage`. Navega para a tela de categorias se bem-sucedido, ou exibe mensagens de erro caso contrário.
- **Layout:** Campos de entrada para email e senha, botões de login e navegação para cadastro.

### Tela de Cadastro (Cadastro)
- **Estados:** `email` e `senha`.
- **Métodos:**
  - `handleRegister`: Armazena as credenciais no `AsyncStorage` e navega de volta para a tela de login após um cadastro bem-sucedido.
- **Layout:** Campos de entrada para email e senha, botão de cadastro.

### Tela de Categorias (Categorias)
- **Estados:** `selectedOption`, `selectedGenre` e `selectedMood`.
- **Métodos:**
  - `handleCheckBoxPress`, `handleGenreCheckBoxPress`, `handleMoodCheckBoxPress`: Atualizam os estados com base nas opções selecionadas pelo usuário.
  - `handleFilter`: Navega para a tela de filme correspondente ao gênero selecionado.
- **Layout:** CheckBoxes para selecionar quem está assistindo, humor e gênero do filme. Botão para aplicar o filtro e navegar para a tela correspondente.

### Telas de Filmes (Filme1 a Filme5)
- **Layout:** Exibem detalhes do filme, incluindo título, imagem e descrição.

## Navegação
- **React Navigation:** Utiliza `createBottomTabNavigator` para criar uma navegação de tabulação entre login e cadastro, e `createStackNavigator` para gerenciar as telas internas após o login.
- **Navegação Condicional:** A navegação é condicionada ao estado de autenticação do usuário (login bem-sucedido navega para categorias, cadastro bem-sucedido navega para login).

## Armazenamento Local
- **AsyncStorage:** Utilizado para armazenar e recuperar as credenciais dos usuários localmente.

## Componentes de UI
- **react-native-elements:** Utilizado para CheckBoxes.
- **react-native-paper:** Utilizado para Card e Paragraph.
- **MaterialCommunityIcons:** Utilizado para ícones na barra de navegação.

## Estilização
- **StyleSheet:** Definido para estilizar os componentes, garantindo uma aparência consistente e agradável.

## Feedback ao Usuário
- **Alertas e Vibração:** Fornece feedback ao usuário em eventos como login/cadastro bem-sucedido ou falhas, utilizando `alert` e `Vibration`.

## Conclusão
O código implementa uma aplicação móvel básica mas funcional, com autenticação de usuário, navegação entre telas e filtragem de conteúdo baseada em preferências do usuário. O uso de `AsyncStorage` permite uma experiência de usuário persistente e o uso de bibliotecas de componentes de UI e navegação facilita o desenvolvimento e a manutenção do aplicativo.

