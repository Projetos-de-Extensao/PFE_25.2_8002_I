---
id: sprint
title: Sprint Planning
---

# Sprint I (Discovery)

> 15/09/2025 à 22/09/2025

## Planejamento de Interação

* **Objetivo da Sprint:** Entender o problema, definir o escopo inicial e levantar os primeiros requisitos através da pesquisa com os usuários.

* **Presentes na reunião:**
|Nome|
|----|
|Bruno Norton|
|Gabriel Pereira|
|Iago Viana|
|Pedro dos Santos|

### Lista de Tarefas da Interação

|Tarefa|Responsabilidade|
|---|----|
| Definir o nome oficial do projeto e o problema a ser resolvido.|Todos|
| Criar o repositório no GitHub e organizar a estrutura inicial da documentação.| Gabriel|
| Realizar pesquisa e entrevistas com alunos e coordenadores.| Bruno e Iago|
| Consolidar os resultados no [Documento de Pesquisa](../_Design%20Thinking/pesquisa.md).| Gabriel|
| Elaborar a primeira versão do [5w2H](../_Design%20Thinking/5w2h.md) com a visão geral do projeto.| Bruno e Pedro|
| Conduzir a sessão de [Brainstorming](../_Design%20Thinking/Brainstorm.md) para elicitar os requisitos iniciais.| Todos|

### Sprint Retrospective/Review Meeting

#### Dúvidas da Interação

- Como vamos priorizar os requisitos levantados no Brainstorm?
- Qual o nível de detalhe esperado no protótipo?

#### Riscos Encontrados

- Dificuldade em agendar horários com os coordenadores para as entrevistas, o que poderia atrasar a fase de pesquisa.

#### Pontos Positivos

- O time se alinhou rapidamente sobre a visão e o problema principal do projeto.
- As entrevistas com os alunos foram muito ricas e trouxeram insights valiosos.

#### Pontos Negativos

- O escopo inicial parecia muito amplo, gerando discussões sobre o que seria viável para o semestre.
- A primeira reunião de brainstorm foi um pouco desorganizada.

#### O que podemos melhorar?

- Focar em "fatiar" o escopo em entregas menores e mais gerenciáveis (MVP).
- Utilizar um moderador com pauta definida para as próximas reuniões de ideação.

#### Ferramentas utilizadas

- Reunião: Google Meet
- Pesquisa: Google Forms
- Colheita dos pontos: Mentimeter

# Sprint II (Static Prototyping - HTML/CSS)

> 23/09/2025 à 30/09/2025

## Planejamento de Interação

* **Objetivo da Sprint:** Traduzir os requisitos e fluxos definidos em um protótipo estático (HTML/CSS), criando todas as telas necessárias para a navegação do aluno e do coordenador.

* **Presentes na reunião:**
|Nome|
|----|
|Bruno Norton|
|Gabriel Pereira|
|Iago Viana|
|Pedro dos Santos|

### Lista de Tarefas da Interação

|Tarefa|Responsabilidade|
|---|----|
| Desenvolver a estrutura base do `style.css` (variáveis, layout, header, sidebar).| Gabriel|
| Criar as telas de fluxo de entrada: `index.html`, `login_aluno.html`, `login_coord.html`.| Iago|
| Desenvolver as telas estáticas do painel do Aluno (`aluno_vagas.html`, `aluno_candidaturas.html`, `aluno_perfil.html`).| Bruno|
| Desenvolver as telas estáticas do painel do Coordenador (`coord_dashboard.html`, `coord_vagas.html`).| Pedro|
| Estilizar componentes reutilizáveis (modais, tabelas, cards) no `style.css`.| Gabriel|
| Revisar e padronizar o HTML de todas as páginas.| Todos|

### Sprint Retrospective/Review Meeting

#### Dúvidas da Interação

- As classes CSS estão genéricas o suficiente para serem reutilizadas?
- O layout do modal de "Criar Vaga" está muito complexo para uma única tela?

#### Riscos Encontrados

- O `style.css` pode ficar muito grande e difícil de manter se não for bem organizado desde o início.

#### Pontos Positivos

- A identidade visual (cores, fontes) foi implementada consistentemente em todas as telas.
- A divisão das telas entre os membros funcionou bem, cobrindo todo o escopo visual do projeto.

#### Pontos Negativos

- As páginas são apenas "cascas"; nenhum botão ou link funciona, o que dificulta a validação do fluxo.
- Algumas inconsistências de nomenclatura de classes CSS foram encontradas durante o merge.

#### O que podemos melhorar?

- Definir uma convenção de nomenclatura (como BEM) para o CSS na próxima fase.
- Focar na interatividade (JavaScript) na próxima Sprint para "dar vida" ao protótipo.

#### Ferramentas utilizadas

- Reunião: Google Meet
- Desenvolvimento: Visual Studio Code (HTML/CSS)

# Sprint III (Basic Interactivity - JS)

> 01/10/2025 à 08/10/2025

## Planejamento de Interação

* **Objetivo da Sprint:** Adicionar interatividade básica ao protótipo com JavaScript. Isso inclui simulação de login, navegação e a funcionalidade de modais simples e do formulário de perfil.

* **Presentes na reunião:**
|Nome|
|----|
|Bruno Norton|
|Gabriel Pereira|
|Iago Viana|
|Pedro dos Santos|

### Lista de Tarefas da Interação

|Tarefa|Responsabilidade|
|---|----|
| Criar o `script.js` e a função helper `setupModal` para abrir/fechar modais.| Gabriel|
| Implementar a simulação de login (aluno e coordenador) com redirecionamento de página.| Bruno|
| Conectar os modais de "Esqueci a Senha" e "Criar Conta" e simular o envio de formulário com `alert()`.| Pedro|
| Implementar a lógica de "Editar Perfil" na página `aluno_perfil.html` (alternar `disabled` e texto do botão).| Iago|
| Conectar o botão "Criar Nova Vaga" (`coord_dashboard.html` e `coord_vagas.html`) para abrir o modal.| Gabriel|
| Simular a submissão do formulário "Criar Vaga" com `alert()` e fechar o modal.| Bruno|

### Sprint Retrospective/Review Meeting

#### Dúvidas da Interação

- A lógica de "Editar Perfil" está clara para o usuário (botão mudar de "Editar" para "Salvar")?
- Estamos usando `alert()` demais? Quando devemos trocar por algo mais elegante?

#### Riscos Encontrados

- O `script.js` pode crescer rapidamente e ficar desorganizado, misturando lógicas de páginas diferentes.

#### Pontos Positivos

- O protótipo agora é navegável e interativo. Os fluxos de login e cadastro podem ser testados.
- A função `setupModal` se provou muito útil e evitou repetição de código.
- A funcionalidade de "Editar Perfil" (toggle) funciona muito bem.

#### Pontos Negativos

- Os modais de "Ver Detalhes" (aluno) e "Gerenciar" (coordenador) ainda não funcionam e estão quebrando a experiência.
- Todos os modais ainda contêm dados estáticos ou estão vazios.

#### O que podemos melhorar?

- Separar a lógica no `script.js` por "página" ou "contexto" (ex: lógica de login, lógica do painel do aluno).
- Focar na próxima Sprint em popular os modais complexos com dados dinâmicos.

#### Ferramentas utilizadas

- Reunião: Google Meet
- Desenvolvimento: Visual Studio Code (HTML/CSS, JavaScript)