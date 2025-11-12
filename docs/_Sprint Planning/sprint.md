---
id: sprint
title: Sprint Planning
---

# Sprint I (Discovery)

> 15/09/2025 à 22/09/2025

## Planejamento de Interação

* *Objetivo da Sprint:* Entender o problema, definir o escopo inicial e levantar os primeiros requisitos através da pesquisa com os usuários.

* *Presentes na reunião:*
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
- As entrevistas com os alunos foram muito ricas e trazem insights valiosos.

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

* *Objetivo da Sprint:* Traduzir os requisitos e fluxos definidos em um protótipo estático (HTML/CSS), criando todas as telas necessárias para a navegação do aluno e do coordenador.

* *Presentes na reunião:*
|Nome|
|----|
|Bruno Norton|
|Gabriel Pereira|
|Iago Viana|
|Pedro dos Santos|

### Lista de Tarefas da Interação

|Tarefa|Responsabilidade|
|---|----|
| Desenvolver a estrutura base do style.css (variáveis, layout, header, sidebar).| Gabriel|
| Criar as telas de fluxo de entrada: index.html, login_aluno.html, login_coord.html.| Iago|
| Desenvolver as telas estáticas do painel do Aluno (aluno_vagas.html, aluno_candidaturas.html, aluno_perfil.html).| Bruno|
| Desenvolver as telas estáticas do painel do Coordenador (coord_dashboard.html, coord_vagas.html).| Pedro|
| Estilizar componentes reutilizáveis (modais, tabelas, cards) no style.css.| Gabriel|
| Revisar e padronizar o HTML de todas as páginas.| Todos|

### Sprint Retrospective/Review Meeting

#### Dúvidas da Interação

- As classes CSS estão genéricas o suficiente para serem reutilizadas?
- O layout do modal de "Criar Vaga" está muito complexo para uma única tela?

#### Riscos Encontrados

- O style.css pode ficar muito grande e difícil de manter se não for bem organizado desde o início.

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

* *Objetivo da Sprint:* Adicionar interatividade básica ao protótipo com JavaScript. Isso inclui simulação de login, navegação e a funcionalidade de modais simples e do formulário de perfil.

* *Presentes na reunião:*
|Nome|
|----|
|Bruno Norton|
|Gabriel Pereira|
|Iago Viana|
|Pedro dos Santos|

### Lista de Tarefas da Interação

|Tarefa|Responsabilidade|
|---|----|
| Criar o script.js e a função helper setupModal para abrir/fechar modais.| Gabriel|
| Implementar a simulação de login (aluno e coordenador) com redirecionamento de página.| Bruno|
| Conectar os modais de "Esqueci a Senha" e "Criar Conta" e simular o envio de formulário com alert().| Pedro|
| Implementar a lógica de "Editar Perfil" na página aluno_perfil.html (alternar disabled e texto do botão).| Iago|
| Conectar o botão "Criar Nova Vaga" (coord_dashboard.html e coord_vagas.html) para abrir o modal.| Gabriel|
| Simular a submissão do formulário "Criar Vaga" com alert() e fechar o modal.| Bruno|

### Sprint Retrospective/Review Meeting

#### Dúvidas da Interação

- A lógica de "Editar Perfil" está clara para o usuário (botão mudar de "Editar" para "Salvar")?
- Estamos usando alert() demais? Quando devemos trocar por algo mais elegante?

#### Riscos Encontrados

- O script.js pode crescer rapidamente e ficar desorganizado, misturando lógicas de páginas diferentes.

#### Pontos Positivos

- O protótipo agora é navegável e interativo. Os fluxos de login e cadastro podem ser testados.
- A função setupModal se provou muito útil e evitou repetição de código.
- A funcionalidade de "Editar Perfil" (toggle) funciona muito bem.

#### Pontos Negativos

- Os modais de "Ver Detalhes" (aluno) e "Gerenciar" (coordenador) ainda não funcionam e estão quebrando a experiência.
- Todos os modais ainda contêm dados estáticos ou estão vazios.

#### O que podemos melhorar?

- Separar a lógica no script.js por "página" ou "contexto" (ex:lógica do painel do aluno,lógica de login).
- Focar na próxima Sprint em popular os modais complexos com dados dinâmicos.

#### Ferramentas utilizadas

- Reunião: Google Meet
- Desenvolvimento: Visual Studio Code (HTML/CSS, JavaScript)

# Sprint IV (Dynamic Data Simulation - JS)

> 09/10/2025 à 16/10/2025

## Planejamento de Interação

* *Objetivo da Sprint:* Finalizar o protótipo funcional simulando um back-end. Isso envolve criar dados "mockados" e usá-los para popular dinamicamente os modais de "Detalhes da Vaga" e "Gerenciar Candidatos", implementando as ações principais.

* *Presentes na reunião:*
|Nome|
|----|
|Bruno Norton|
|Gabriel Pereira|
|Iago Viana|
|Pedro dos Santos|

### Lista de Tarefas da Interação

|Tarefa|Responsabilidade|
|---|----|
| Criar a estrutura dadosSimulados (vagas, candidatos) e o objeto Template no script.js.| Gabriel|
| Implementar a função abrirModalDetalhesVaga para carregar dados de dadosSimulados.vagas.| Bruno|
| Implementar a ação do botão "Quero me candidatar" (simulação com alert()).| Bruno|
| Implementar a função abrirModalGerenciarCandidatos para carregar dados de dadosSimulados.candidatos e gerar a tabela.| Pedro|
| Implementar as ações "Aprovar" e "Rejeitar" no modal de gerenciamento (simulação com alert() e remoção do item da tabela).| Iago|
| Revisão final dos fluxos e interações do protótipo.| Todos|

### Sprint Retrospective/Review Meeting

#### Dúvidas da Interação

- Os dadosSimulados são suficientes para cobrir todos os casos de teste (ex: vaga sem candidatos)?
- A remoção do item da tabela após aprovar/rejeitar é a melhor forma de dar feedback?

#### Riscos Encontrados

- O protótipo está tão funcional que pode ser confundido com o produto final, gerando expectativas irreais sobre a rapidez do desenvolvimento "real" (com back-end).

#### Pontos Positivos

- O protótipo está 100% funcional e simula o fluxo completo da aplicação.
- A geração dinâmica de HTML pelos Templates funcionou perfeitamente e tornou o código limpo.
- As interações de "Aprovar" e "Rejeitar" dão uma sensação muito realista de gerenciamento.

#### Pontos Negativos

- A página de "Minhas Candidaturas" (aluno_candidaturas.html) ainda está com dados estáticos no HTML, não refletindo as ações do coordenador. (Nota: Isso foi identificado como uma melhoria para um próximo ciclo).

#### O que podemos melhorar?

- Em um próximo ciclo, poderíamos fazer a aluno_candidaturas.html refletir os dados simulados, mas para o escopo do protótipo atual, o objetivo foi atingido.
- O protótipo está pronto para ser usado em testes de usabilidade com usuários reais.

#### Ferramentas utilizadas

- Reunião: Google Meet
- Desenvolvimento: Visual Studio Code (JavaScript)

# Sprint V (Migration to React & Componentization)

> 17/10/2025 à 05/11/2025

## Planejamento de Interação

* *Objetivo da Sprint:* Migrar o protótipo estático (HTML/CSS/JS) para uma aplicação React. O foco é componentizar a UI, introduzir roteamento (react-router-dom) e gerenciar o estado local com useState, recriando a funcionalidade do protótipo JS.

* *Presentes na reunião:*
|Nome|
|----|
|Bruno Norton|
|Gabriel Pereira|
|Iago Viana|
|Pedro dos Santos|

### Lista de Tarefas da Interação

|Tarefa|Responsabilidade|
|---|----|
| Configurar o ambiente do projeto React (ex: Vite) e instalar o react-router-dom.| Gabriel|
| Criar o App.jsx e definir todas as rotas da aplicação (createBrowserRouter).| Gabriel|
| Converter as páginas de login e seleção (index.html, login_*.html) em Pages React (IndexPage.jsx, LoginAlunoPage.jsx).| Iago|
| Criar os AlunoLayout.jsx e CoordLayout.jsx usando <Outlet> e <Link> para navegação.| Pedro|
| Converter as páginas internas do Aluno (aluno_*.html) em Pages filhas (AlunoVagasAbertas.jsx, AlunoCandidaturas.jsx, AlunoPerfil.jsx).| Bruno|
| Converter as páginas internas do Coordenador (coord_*.html) em Pages filhas (CoordDashboard.jsx, CoordVagas.jsx).| Pedro|
| Migrar os 'Templates' JS dos modais para Componentes React (VagaModal.jsx, CriarVagaModal.jsx, GerenciarCandidatosModal.jsx).| Iago|
| Substituir a lógica imperativa do script.js (ex: toggle de perfil, abrir/fechar modal) por estado declarativo do React (useState).| Todos|
| Mover os dadosSimulados para dentro dos componentes React (ex: DADOS_VAGAS em AlunoVagasAbertas.jsx).| Bruno|
| Re-implementar as simulações de login e formulários com alert() e useNavigate.| Todos|

### Sprint Retrospective/Review Meeting

#### Dúvidas da Interação

- Como vamos gerenciar o estado global (ex: o usuário logado) no futuro? O React Context é o próximo passo?
- O style.css (para o VagaModal) e o index.css (global) podem causar confusão. Devemos unificá-los?

#### Riscos Encontrados

- A lógica de useState para múltiplos modais na mesma página (ex: LoginAlunoPage com Cadastro e Esqueci Senha) pode ficar complexa de gerenciar.
- O "Prop drilling" (passar onClose para os modais) está simples agora, mas pode ser um problema se a aplicação crescer.

#### Pontos Positivos

- A aplicação está 100% componentizada. O reuso de código (Modais, Layouts) é excelente.
- O roteamento com react-router-dom é limpo e torna a navegação instantânea.
- O uso de useState para controlar filtros, modais e formulários é muito mais declarativo e fácil de manter do que o JS puro.
- A estrutura de pastas (pages, components) está bem organizada.

#### Pontos Negativos

- A aplicação ainda depende de `alert()`s para simular ações de back-end.
- Todos os dados (vagas, candidatos) ainda estão mocados dentro dos arquivos .jsx, não vêm de uma fonte externa.
- Não há autenticação real ou rotas protegidas; qualquer um pode acessar /aluno/vagas diretamente pela URL.

#### O que podemos melhorar?

- A próxima Sprint deve focar em substituir todos os `alert()`s e dados mocados por integrações de API reais.
- Implementar um gerenciador de estado global (ex: Context API) para autenticação.
- Criar Rotas Protegidas que verifiquem se o usuário está logado antes de renderizar os Layouts.

#### Ferramentas utilizadas

- Reunião: Google Meet
- Desenvolvimento: Visual Studio Code (React, JSX), Vite
- Pacotes: react-router-dom

# Sprint VI (API Integration & Local Data)

> 06/11/2025 à 12/11/2025

## Planejamento de Interação

* *Objetivo da Sprint:* Substituir todos os dados "mockados" (estáticos) da aplicação por dados reais. Iniciar com a integração de APIs externas (Heroku) e, em seguida, pivotar para um `db.json` local para estabilizar o ambiente de desenvolvimento.

* *Presentes na reunião:*
|Nome|
|----|
|Bruno Norton|
|Gabriel Pereira|
|Iago Viana|
|Pedro dos Santos|

### Lista de Tarefas da Interação

|Tarefa|Responsabilidade|
|---|----|
|Substituir os dados mocados (`DADOS_VAGAS`) pelo hook `useEffect` para buscar dados de APIs externas.| Bruno|
|Integrar as 3 APIs (cursos, disciplinas, funcionarios) usando `Promise.all`.| Gabriel|
|Implementar a lógica de mesclagem para atribuir um "Professor" (`funcionarios`) a cada "Disciplina", corrigindo o filtro para `tipo_usuario_nome`.| Iago|
|Refatorar a busca de dados para usar um `db.json` local (armazenado na pasta `/public`).| Bruno|
|Implementar a lógica `flatMap` para processar a estrutura aninhada do `db.json` (Vagas -> disciplinas) e popular as listas de vagas e cursos.| Gabriel|
|Atualizar os componentes `AlunoVagasAbertas` e `VagaModal` para usar os novos nomes de propriedades (ex: `nomeDisciplina`, `professorResponsavel`).| Pedro|
|Corrigir bugs de UI pós-integração (estilo do modal CSS e `onClick` do botão "Quero me candidatar").| Todos|

### Sprint Retrospective/Review Meeting

#### Dúvidas da Interação

- A lógica `flatMap` para "achatar" o JSON aninhado está clara para todos os membros?
- Como lidamos com dados que a API não fornece (ex: "Prazo"), mas a UI precisa? (Decisão: Manter estático no componente).

#### Riscos Encontrados

- As APIs externas do Heroku estavam lentas ou "dormindo", tornando o desenvolvimento inicial instável.
- A estrutura de dados das APIs externas era muito diferente da estrutura final do `db.json`, o que exigiu duas refatorações significativas na forma como os componentes liam as `props`.

#### Pontos Positivos

- A aplicação agora é 100% orientada a dados, sem nenhum dado estático (exceto os placeholders deliberados no modal).
- A mudança para o `db.json` local tornou o desenvolvimento instantâneo, estável e independente de internet.
- A lógica de `flatMap` para processar o JSON aninhado é muito eficiente e limpa.
- O filtro de vagas (por curso e por matéria) agora funciona com os dados reais.

#### Pontos Negativos

- Gastamos tempo integrando 3 APIs externas que foram descartadas em favor do `db.json`. (Nota: Considerado um bom exercício de aprendizado).
- Os botões "Quero me candidatar" e "Aprovar" ainda são simulações (`alert()`); eles não alteram o `db.json`.

#### O que podemos melhorar?

- A próxima Sprint deve focar em substituir o `fetch` estático do `db.json` pelo `json-server` (ou uma ferramenta similar) para permitir a simulação de requisições POST/PUT/DELETE, fazendo com que a candidatura seja "salva".
- Definir uma "interface" (um contrato de dados) para o que o front-end espera, para evitar refatorações caso a API mude novamente.

#### Ferramentas utilizadas

- Reunião: Google Meet
- Desenvolvimento: Visual Studio Code (React, JSX)
- API: `fetch` API, `db.json` (Arquivo estático)