// Aguarda o carregamento completo do DOM
document.addEventListener("DOMContentLoaded", () => {
    
    const pagina = document.body.className;

    // --- LÓGICA DA PÁGINA DE LOGIN (login.html) ---
    if (pagina === 'login-body') {
        const loginForm = document.getElementById('login-form');
        
        // Modais de Cadastro e "Esqueci a Senha"
        setupModal('show-cadastro', 'modal-cadastro', 'close-cadastro');
        setupModal('show-esqueci', 'modal-esqueci', 'close-esqueci');

        // Simulação de Login
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = document.getElementById('email').value;
                
                // Simula o login de Coordenador (Prof. Carlos)
                if (email.includes('@ibmec.br') && !email.includes('@aluno')) {
                    alert('Login como Coordenador realizado com sucesso!');
                    window.location.href = 'coordenador.html';
                
                // Simula o login de Aluno (Ana)
                } else if (email.includes('@aluno.ibmec.br')) {
                    alert('Login como Aluno realizado com sucesso!');
                    window.location.href = 'aluno.html';
                } else {
                    alert('E-mail institucional inválido. Use @aluno.ibmec.br ou @ibmec.br');
                }
            });
        }
        
        // Simulação de Cadastro
        document.getElementById('cadastro-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Cadastro realizado com sucesso! Você já pode fazer o login.');
            document.getElementById('modal-cadastro').style.display = 'none';
        });

        // Simulação de Recuperação de Senha
        document.getElementById('esqueci-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Link de recuperação enviado para o seu e-mail.');
            document.getElementById('modal-esqueci').style.display = 'none';
        });
    }

    // --- LÓGICA DOS PAINÉIS (aluno.html e coordenador.html) ---
    if (pagina.includes('-body')) {
        const contentArea = document.getElementById('content-area');
        const navLinks = document.querySelectorAll('.nav-link');

        // Navegação principal
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove 'active' de todos
                navLinks.forEach(nav => nav.classList.remove('active'));
                
                // Adiciona 'active' ao clicado
                link.classList.add('active');
                
                // Carrega o conteúdo da página
                const page = link.getAttribute('data-page');
                carregarConteudo(page);
            });
        });

        // Simulação de Logout
        document.getElementById('logout-btn')?.addEventListener('click', () => {
            window.location.href = 'login.html';
        });

        // Função para carregar conteúdo dinâmico
        function carregarConteudo(page) {
            if (!contentArea) return;
            
            // CONTEÚDO DO ALUNO
            if (page === 'vagas') {
                contentArea.innerHTML = Template.Aluno.vagasAbertas();
                // Adiciona listeners aos botões "Ver Detalhes"
                document.querySelectorAll('.btn-detalhes-vaga').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const vagaId = btn.getAttribute('data-vaga-id');
                        abrirModalDetalhesVaga(vagaId);
                    });
                });
            } else if (page === 'candidaturas') {
                contentArea.innerHTML = Template.Aluno.minhasCandidaturas();
            } else if (page === 'perfil') {
                contentArea.innerHTML = Template.Aluno.meuPerfil();
            
            // CONTEÚDO DO COORDENADOR
            } else if (page === 'dashboard') {
                contentArea.innerHTML = Template.Coordenador.dashboard();
            } else if (page === 'vagas-criadas') {
                contentArea.innerHTML = Template.Coordenador.vagasCriadas();
                // Adiciona listeners aos botões "Gerenciar"
                document.querySelectorAll('.btn-gerenciar-vaga').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const vagaNome = btn.getAttribute('data-vaga-nome');
                        abrirModalGerenciarCandidatos(vagaNome);
                    });
                });
            }
        }

        // Carregar página inicial padrão
        const paginaInicial = document.querySelector('.nav-link.active')?.getAttribute('data-page');
        if (paginaInicial) {
            carregarConteudo(paginaInicial);
        }
    }

    // --- MODAIS GERAIS DOS PAINÉIS ---

    // Modal Detalhes da Vaga (Aluno)
    const modalDetalhes = document.getElementById('modal-detalhes-vaga');
    const closeDetalhes = document.getElementById('close-detalhes');
    
    function abrirModalDetalhesVaga(vagaId) {
        const vaga = dadosSimulados.vagas.find(v => v.id === vagaId);
        if (vaga && modalDetalhes) {
            document.getElementById('vaga-detalhes-content').innerHTML = Template.Aluno.detalhesVaga(vaga);
            modalDetalhes.style.display = 'block';
            
            // Listener para o botão "Candidatar-se" (US003)
            document.getElementById('btn-candidatar')?.addEventListener('click', () => {
                alert(`Candidatura para ${vaga.materia} enviada com sucesso!`);
                modalDetalhes.style.display = 'none';
                // Aqui, em um app real, você atualizaria o status
            });
        }
    }
    closeDetalhes?.addEventListener('click', () => modalDetalhes.style.display = 'none');

    // Modal Criar Vaga (Coordenador) (US005)
    setupModal('show-criar-vaga', 'modal-criar-vaga', 'close-criar-vaga');
    document.getElementById('criar-vaga-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Vaga publicada com sucesso!');
        document.getElementById('modal-criar-vaga').style.display = 'none';
        carregarConteudo('vagas-criadas'); // Atualiza a lista
    });

    // Modal Gerenciar Candidatos (Coordenador) (US006)
    const modalGerenciar = document.getElementById('modal-gerenciar-candidatos');
    const closeGerenciar = document.getElementById('close-gerenciar');

    function abrirModalGerenciarCandidatos(vagaNome) {
        if (modalGerenciar) {
            document.getElementById('gerenciar-content').innerHTML = Template.Coordenador.gerenciarCandidatos(vagaNome);
            modalGerenciar.style.display = 'block';

            // Listeners para botões de Aprovar/Rejeitar (US007 e US008)
            modalGerenciar.querySelectorAll('.btn-aprovar').forEach(btn => {
                btn.addEventListener('click', () => {
                    alert(`Aluno aprovado! Notificação enviada.`);
                    btn.closest('tr').remove(); // Remove da lista para simular
                });
            });
            modalGerenciar.querySelectorAll('.btn-rejeitar').forEach(btn => {
                btn.addEventListener('click', () => {
                    alert(`Aluno rejeitado! Notificação enviada.`);
                    btn.closest('tr').remove();
                });
            });
        }
    }
    closeGerenciar?.addEventListener('click', () => modalGerenciar.style.display = 'none');


    // Fechar modais ao clicar fora
    window.onclick = function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = "none";
        }
    }

});

// --- FUNÇÃO HELPER PARA MODAIS ---
function setupModal(triggerId, modalId, closeId) {
    const trigger = document.getElementById(triggerId);
    const modal = document.getElementById(modalId);
    const close = document.getElementById(closeId);

    if (trigger && modal && close) {
        trigger.onclick = () => modal.style.display = 'block';
        close.onclick = () => modal.style.display = 'none';
    }
}

// --- DADOS SIMULADOS E TEMPLATES HTML ---

const dadosSimulados = {
    vagas: [
        { id: 'v1', materia: 'Cálculo I', professor: 'Prof. Silva', prazo: '30/10/2025', inscritos: 3, requisitos: 'CR > 7.0, Aprovado em Cálculo I.', descricao: 'Auxiliar os alunos com listas de exercícios e plantões de dúvidas.' },
        { id: 'v2', materia: 'Inteligência Artificial', professor: 'Prof. Carlos', prazo: '28/10/2025', inscritos: 5, requisitos: 'Aprovado em Estrutura de Dados. Conhecimento em Python.', descricao: 'Apoio no desenvolvimento do projeto final da disciplina e correção de trabalhos.' },
        { id: 'v3', materia: 'Econometria', professor: 'Profa. Beatriz', prazo: '05/11/2025', inscritos: 1, requisitos: 'CR > 8.0.', descricao: 'Suporte em laboratórios de Stata/R.' }
    ],
    candidaturas: [
        { materia: 'Programação de Computadores I', status: 'Aprovado' },
        { materia: 'Geometria Analítica', status: 'Rejeitado' },
        { materia: 'Física I', status: 'Em Análise' }
    ],
    candidatos: [
        { nome: 'Ana, a Aluna', curso: 'Eng. Computação', cr: 8.5 },
        { nome: 'João Vitor', curso: 'Eng. Computação', cr: 7.9 },
        { nome: 'Mariana Costa', curso: 'Administração', cr: 9.1 }
    ]
};

// Objeto para guardar os templates HTML
const Template = {
    // === TEMPLATES DO ALUNO ===
    Aluno: {
        vagasAbertas: () => `
            <div class="content-section">
                <h2>Vagas Abertas (US001)</h2>
                
                <div class="filtros-container">
                    <div class="input-group">
                        <label for="filtro-curso">Filtrar por Curso</label>
                        <select id="filtro-curso">
                            <option value="">Todos os Cursos</option>
                            <option value="eng">Engenharia</option>
                            <option value="adm">Administração</option>
                            <option value="dir">Direito</option>
                        </select>
                    </div>
                    <div class="input-group">
                        <label for="filtro-busca">Buscar por Matéria</label>
                        <input type="text" id="filtro-busca" placeholder="Ex: Cálculo I">
                    </div>
                    <button class="btn btn-primary">Filtrar</button>
                </div>
                
                <div class="lista-vagas">
                    ${dadosSimulados.vagas.map(vaga => `
                        <div class="vaga-card">
                            <div class="vaga-card-info">
                                <h3>${vaga.materia}</h3>
                                <p>Professor: ${vaga.professor}</p>
                                <p>Prazo para inscrição: ${vaga.prazo}</p>
                            </div>
                            <button class="btn btn-primary btn-detalhes-vaga" data-vaga-id="${vaga.id}">Ver Detalhes</button>
                        </div>
                    `).join('')}
                </div>
            </div>
        `,
        detalhesVaga: (vaga) => `
            <h2>${vaga.materia}</h2>
            <p><strong>Professor Responsável:</strong> ${vaga.professor}</p>
            <p><strong>Prazo Final:</strong> ${vaga.prazo}</p>
            
            <h4>Pré-requisitos (Tela Cadastrar 2)</h4>
            <p>${vaga.requisitos}</p>
            
            <h4>Descrição das Atividades (Tela Cadastrar 2)</h4>
            <p>${vaga.descricao}</p>
            
            <button id="btn-candidatar" class="btn btn-primary btn-full" style="margin-top: 20px;">
                Quero me candidatar (US003)
            </button>
        `,
        minhasCandidaturas: () => `
            <div class="content-section">
                <h2>Minhas Candidaturas (US004)</h2>
                <table class="tabela">
                    <thead>
                        <tr>
                            <th>Matéria</th>
                            <th>Status da Candidatura</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${dadosSimulados.candidaturas.map(c => `
                            <tr>
                                <td>${c.materia}</td>
                                <td><span class="status status-${c.status.toLowerCase().replace(' ', '-')}">${c.status}</span></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `,
        meuPerfil: () => `
            <div class="content-section">
                <h2>Meu Perfil</h2>
                <form>
                    <div class="input-group">
                        <label>Nome Completo</label>
                        <input type="text" value="Ana, a Aluna" disabled>
                    </div>
                    <div class="input-group">
                        <label>E-mail</label>
                        <input type="email" value="ana.silva@aluno.ibmec.br" disabled>
                    </div>
                    <div class="input-group">
                        <label>Curso</label>
                        <input type="text" value="Engenharia de Computação" disabled>
                    </div>
                    <div class="input-group">
                        <label>Matrícula</label>
                        <input type="text" value="202300123" disabled>
                    </div>
                    <div class="input-group">
                        <label>Link do Currículo Lattes (v2.0)</label>
                        <input type="text" placeholder="http://lattes.cnpq.br/seu-id">
                    </div>
                    <button type="submit" class="btn btn-primary">Salvar Alterações</button>
                </form>
            </div>
        `
    },
    // === TEMPLATES DO COORDENADOR ===
    Coordenador: {
        dashboard: () => `
            <div class="content-section">
                <h2>Painel Principal</h2>
                <div class="dashboard-grid">
                    <div class="stat-card">
                        <h3>${dadosSimulados.vagas.length}</h3>
                        <p>Vagas Ativas</p>
                    </div>
                    <div class="stat-card">
                        <h3>${dadosSimulados.vagas.reduce((acc, v) => acc + v.inscritos, 0)}</h3>
                        <p>Total de Candidatos</p>
                    </div>
                    <div class="stat-card">
                        <h3>8</h3>
                        <p>Novos Candidatos (Hoje)</p>
                    </div>
                </div>
            </div>
        `,
        vagasCriadas: () => `
            <div class="content-section">
                <h2>Vagas Criadas</h2>
                <table class="tabela">
                    <thead>
                        <tr>
                            <th>Matéria</th>
                            <th>Prazo Final</th>
                            <th>Inscritos</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${dadosSimulados.vagas.map(vaga => `
                            <tr>
                                <td>${vaga.materia}</td>
                                <td>${vaga.prazo}</td>
                                <td>${vaga.inscritos}</td>
                                <td>
                                    <button class="btn btn-primary btn-gerenciar-vaga" data-vaga-nome="${vaga.materia}">
                                        Gerenciar (US006)
                                    </button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `,
        gerenciarCandidatos: (vagaNome) => `
            <h2>Gerenciamento de Candidatos</h2>
            <h3>Vaga: ${vagaNome}</h3>
            
            <table class="tabela">
                <thead>
                    <tr>
                        <th>Nome do Aluno</th>
                        <th>Curso</th>
                        <th>CR</th>
                        <th>Documentos</th>
                        <th>Ações (US007)</th>
                    </tr>
                </thead>
                <tbody>
                    ${dadosSimulados.candidatos.map(c => `
                        <tr>
                            <td>${c.nome}</td>
                            <td>${c.curso}</td>
                            <td>${c.cr}</td>
                            <td><a href="#" class="btn btn-secondary">Baixar Histórico</a></td>
                            <td>
                                <button class="btn btn-success btn-aprovar">Aprovar</button>
                                <button class="btn btn-danger btn-rejeitar">Rejeitar</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `
    }
};