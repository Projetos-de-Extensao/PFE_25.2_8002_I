// Aguarda o carregamento completo do DOM
document.addEventListener("DOMContentLoaded", () => {
    
    // Identifica a página atual pelo ID do body
    const pageId = document.body.id;

    // --- LÓGICA DA PÁGINA DE LOGIN DO ALUNO ---
    if (pageId === 'page-login-aluno') {
        const loginForm = document.getElementById('login-aluno-form');
        
        // Modais de Cadastro e "Esqueci a Senha"
        setupModal('show-cadastro', 'modal-cadastro', 'close-cadastro');
        setupModal('show-esqueci', 'modal-esqueci', 'close-esqueci');

        // Simulação de Login do Aluno
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                // Não precisamos mais checar o e-mail, a página já define o destino
                alert('Login como Aluno realizado com sucesso!');
                window.location.href = 'aluno_vagas.html';
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

    // --- LÓGICA DA PÁGINA DE LOGIN DO COORDENADOR ---
    if (pageId === 'page-login-coord') {
        const loginForm = document.getElementById('login-coord-form');
        
        // Modal "Esqueci a Senha"
        setupModal('show-esqueci', 'modal-esqueci', 'close-esqueci');

        // Simulação de Login do Coordenador
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Login como Coordenador realizado com sucesso!');
                window.location.href = 'coord_dashboard.html';
            });
        }

        // Simulação de Recuperação de Senha
        document.getElementById('esqueci-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Link de recuperação enviado para o seu e-mail.');
            document.getElementById('modal-esqueci').style.display = 'none';
        });
    }


    // --- LÓGICA GERAL DOS PAINÉIS (Modais) ---

    // Modal Detalhes da Vaga (Aluno)
    const modalDetalhes = document.getElementById('modal-detalhes-vaga');
    if (modalDetalhes) {
        document.getElementById('close-detalhes').addEventListener('click', () => modalDetalhes.style.display = 'none');
        
        document.querySelectorAll('.btn-detalhes-vaga').forEach(btn => {
            btn.addEventListener('click', () => {
                const vagaId = btn.getAttribute('data-vaga-id');
                abrirModalDetalhesVaga(vagaId);
            });
        });

        function abrirModalDetalhesVaga(vagaId) {
            const vaga = dadosSimulados.vagas.find(v => v.id === vagaId);
            if (vaga) {
                document.getElementById('vaga-detalhes-content').innerHTML = Template.Aluno.detalhesVaga(vaga);
                modalDetalhes.style.display = 'block';
                
                // Listener para o botão "Candidatar-se"
                document.getElementById('btn-candidatar')?.addEventListener('click', () => {
                    alert(`Candidatura para ${vaga.materia} enviada com sucesso!`);
                    modalDetalhes.style.display = 'none';
                });
            }
        }
    }

    // Modal Criar Vaga (Coordenador)
    setupModal('show-criar-vaga', 'modal-criar-vaga', 'close-criar-vaga');
    document.getElementById('criar-vaga-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Vaga publicada com sucesso!');
        document.getElementById('modal-criar-vaga').style.display = 'none';
        // Em um app real, aqui você atualizaria a lista de vagas
    });

    // Modal Gerenciar Candidatos (Coordenador)
    const modalGerenciar = document.getElementById('modal-gerenciar-candidatos');
    if (modalGerenciar) {
        document.getElementById('close-gerenciar').addEventListener('click', () => modalGerenciar.style.display = 'none');
        
        document.querySelectorAll('.btn-gerenciar-vaga').forEach(btn => {
            btn.addEventListener('click', () => {
                const vagaNome = btn.getAttribute('data-vaga-nome');
                abrirModalGerenciarCandidatos(vagaNome);
            });
        });

        function abrirModalGerenciarCandidatos(vagaNome) {
            document.getElementById('gerenciar-content').innerHTML = Template.Coordenador.gerenciarCandidatos(vagaNome);
            modalGerenciar.style.display = 'block';

            // Listeners para botões de Aprovar/Rejeitar
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

    // Fechar modais ao clicar fora
    window.onclick = function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = "none";
        }
    }

    
    // --- LÓGICA DA PÁGINA DE PERFIL DO ALUNO ---
    const perfilForm = document.getElementById('perfil-form');
    if (perfilForm) {
        const btnToggleEdit = document.getElementById('btn-toggle-edit');
        const profileInputs = perfilForm.querySelectorAll('.profile-input'); // Seleciona campos editáveis

        btnToggleEdit.addEventListener('click', () => {
            // Verifica o estado atual pelo texto do botão
            const isEditing = btnToggleEdit.textContent === 'Salvar Alterações';

            if (isEditing) {
                // --- MODO SALVAR ---
                // (Simula o salvamento)
                btnToggleEdit.textContent = 'Editar Perfil';
                btnToggleEdit.classList.remove('btn-success'); // Remove a cor verde
                btnToggleEdit.classList.add('btn-primary'); // Volta a ser azul

                // Desabilita todos os campos editáveis
                profileInputs.forEach(input => {
                    input.disabled = true;
                });
                
                alert('Perfil salvo com sucesso!');

            } else {
                // --- MODO EDITAR ---
                btnToggleEdit.textContent = 'Salvar Alterações';
                btnToggleEdit.classList.remove('btn-primary');
                btnToggleEdit.classList.add('btn-success'); // Fica verde para "Salvar"

                // Habilita todos os campos editáveis
                profileInputs.forEach(input => {
                    input.disabled = false;
                });
                
                // Foca no primeiro campo que ficou editável
                if (profileInputs.length > 0) {
                    profileInputs[0].focus(); 
                }
            }
        });
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

// --- DADOS SIMULADOS E TEMPLATES (Apenas para Modais) ---

const dadosSimulados = {
    vagas: [
        { id: 'v1', materia: 'Engenharia de Computação', professor: 'Prof. Silva', prazo: '30/10/2025', inscritos: 3, requisitos: 'CR > 7.0, Aprovado em Cálculo I.', descricao: 'Auxiliar os alunos com listas de exercícios e plantões de dúvidas.' },
        { id: 'v2', materia: 'Métodos Quantitativos', professor: 'Prof. Carlos', prazo: '28/10/2025', inscritos: 5, requisitos: 'Aprovado em Estrutura de Dados. Conhecimento em Python.', descricao: 'Apoio no desenvolvimento do projeto final da disciplina e correção de trabalhos.' },
        { id: 'v3', materia: 'Matemática Discreta', professor: 'Profa. Beatriz', prazo: '05/11/2025', inscritos: 1, requisitos: 'CR > 8.0.', descricao: 'Suporte em laboratórios de Stata/R.' }
    ],
    // ATUALIZADO AQUI
    candidatos: [
        { nome: 'Bruno Norton', curso: 'Eng. Computação', cr: 8.5 },
        { nome: 'João Vitor', curso: 'Eng. Computação', cr: 7.9 },
        { nome: 'Mariana Costa', curso: 'Administração', cr: 9.1 }
    ]
};

// Objeto para guardar os templates HTML (Apenas dos Modais)
const Template = {
    Aluno: {
        detalhesVaga: (vaga) => `
            <h2>${vaga.materia}</h2>
            <p><strong>Professor Responsável:</strong> ${vaga.professor}</p>
            <p><strong>Prazo Final:</strong> ${vaga.prazo}</p>
            
            <h4>Pré-requisitos (Tela Cadastrar 2)</h4>
            <p>${vaga.requisitos}</p>
            
            <h4>Descrição das Atividades (Tela Cadastrar 2)</h4>
            <p>${vaga.descricao}</p>
            
            <button id="btn-candidatar" class="btn btn-primary btn-full" style="margin-top: 20px;">
                Quero me candidatar
            </button>
        `
    },
    Coordenador: {
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
                        <th>Ações</th>
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