// ========== GERENCIAMENTO DAS SEÇÕES (ACORDION) ==========
document.addEventListener('DOMContentLoaded', function() {
    // Seleciona todas as seções
    const sections = document.querySelectorAll('.section');
    
    // Função para abrir/fechar seção
    function toggleSection(section) {
        section.classList.toggle('open');
    }
    
    // Adiciona evento de clique nos cabeçalhos
    sections.forEach(section => {
        const header = section.querySelector('.section-header');
        if (header) {
            header.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleSection(section);
            });
        }
    });
    
    // Abrir a primeira seção por padrão (Introdução)
    const firstSection = document.querySelector('#section-intro');
    if (firstSection && !firstSection.classList.contains('open')) {
        firstSection.classList.add('open');
    }
    
    // ========== BOTÕES EXPANSÍVEIS (CONTEÚDO EXTRA) ==========
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    toggleButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const targetId = this.getAttribute('data-target');
            const targetDiv = document.getElementById(targetId);
            if (targetDiv) {
                if (targetDiv.style.display === 'none' || targetDiv.style.display === '') {
                    targetDiv.style.display = 'block';
                    this.textContent = this.textContent.replace('Ver', 'Ocultar');
                    if (!this.textContent.includes('Ocultar')) {
                        // Para botões que não seguem padrão "Ver"
                        if (this.textContent.includes('Ver Passo a Passo')) {
                            this.textContent = this.textContent.replace('Ver', 'Ocultar');
                        } else if (this.textContent.includes('Ver Processo')) {
                            this.textContent = this.textContent.replace('Ver', 'Ocultar');
                        } else if (this.textContent.includes('Entender')) {
                            this.textContent = this.textContent.replace('Entender', 'Ocultar');
                        }
                    }
                } else {
                    targetDiv.style.display = 'none';
                    this.textContent = this.textContent.replace('Ocultar', 'Ver');
                    if (!this.textContent.includes('Ver')) {
                        if (this.textContent.includes('Ocultar Passo a Passo')) {
                            this.textContent = this.textContent.replace('Ocultar', 'Ver');
                        } else if (this.textContent.includes('Ocultar Processo')) {
                            this.textContent = this.textContent.replace('Ocultar', 'Ver');
                        } else if (this.textContent.includes('Ocultar a Lógica')) {
                            this.textContent = this.textContent.replace('Ocultar', 'Entender');
                        }
                    }
                }
            }
        });
    });
    
    // ========== MENU LATERAL: NAVEGAÇÃO SUAVE ==========
    const menuLinks = document.querySelectorAll('.sidebar-nav a');
    const sectionMap = {
        'intro': 'section-intro',
        'cabecalho': 'section-cabecalho',
        'equipamentos': 'section-equipamentos',
        'horas': 'section-horas',
        'perdas': 'section-perdas',
        'custos': 'section-custos',
        'resultado': 'section-resultado'
    };
    
    function scrollToSection(sectionId) {
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            // Abre a seção caso esteja fechada
            if (!targetSection.classList.contains('open')) {
                targetSection.classList.add('open');
            }
            
            // Scroll suave com offset para não ficar colado no topo
            const offset = 80;
            const elementPosition = targetSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            // Pequeno delay para dar destaque visual
            setTimeout(() => {
                targetSection.style.transition = 'box-shadow 0.3s';
                targetSection.style.boxShadow = '0 0 0 3px #2ecc71, 0 8px 20px rgba(0,0,0,0.1)';
                setTimeout(() => {
                    targetSection.style.boxShadow = '';
                }, 1200);
            }, 100);
        }
    }
    
    // Adiciona evento de clique nos links do menu
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionKey = link.getAttribute('data-section');
            if (sectionKey && sectionMap[sectionKey]) {
                scrollToSection(sectionMap[sectionKey]);
                
                // Atualiza classe ativa no menu
                menuLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });
    
    // ========== DESTAQUE DA SEÇÃO ATIVA NO SCROLL ==========
    function updateActiveMenuOnScroll() {
        const sectionsList = document.querySelectorAll('.section');
        let currentActiveId = '';
        
        sectionsList.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const scrollPosition = window.scrollY;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                const sectionId = section.getAttribute('id');
                for (const [key, value] of Object.entries(sectionMap)) {
                    if (value === sectionId) {
                        currentActiveId = key;
                        break;
                    }
                }
            }
        });
        
        if (currentActiveId) {
            menuLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-section') === currentActiveId) {
                    link.classList.add('active');
                }
            });
        }
    }
    
    window.addEventListener('scroll', updateActiveMenuOnScroll);
    updateActiveMenuOnScroll(); // Chamada inicial
    
    // ========== RESPONSIVIDADE: FECHAR MENU EM MOBILE? (Opcional, apenas para melhor UX) ==========
    // Garantir que em dispositivos móveis o clique no menu não quebre layout
    if (window.innerWidth <= 900) {
        // Em mobile, após clicar no link, rola e mantém comportamento padrão
        // Nada adicional necessário pois já está funcional
    }
    
    // ========== INICIALIZAÇÃO DOS CONTEÚDOS EXTRA (todos fechados por padrão) ==========
    const allExtraContents = document.querySelectorAll('.extra-content');
    allExtraContents.forEach(extra => {
        extra.style.display = 'none';
    });
    
    // Ajuste dos textos dos botões para manter consistência
    const horasBtn = document.querySelector('.toggle-btn[data-target="horasExtra"]');
    if (horasBtn && horasBtn.textContent.includes('Ver Passo a Passo')) {
        horasBtn.textContent = '📋 Ver Passo a Passo no SAP';
    }
    
    const perdasBtn = document.querySelector('.toggle-btn[data-target="perdasExtra"]');
    if (perdasBtn && perdasBtn.textContent.includes('Ver Processo')) {
        perdasBtn.textContent = '🔍 Ver Processo Completo e Detalhado';
    }
    
    const custosBtn = document.querySelector('.toggle-btn[data-target="custosExtra"]');
    if (custosBtn && custosBtn.textContent.includes('Ver Processo')) {
        custosBtn.textContent = '📂 Ver Processo Detalhado no SAP';
    }
    
    const resultadoBtn = document.querySelector('.toggle-btn[data-target="resultadoExtra"]');
    if (resultadoBtn && resultadoBtn.textContent.includes('Entender')) {
        resultadoBtn.textContent = '🧮 Entender a Lógica do Cálculo';
    }
    
    // ========== PEQUENA ANIMAÇÃO PARA LINKS DO MENU ==========
    console.log('✅ Manual CGE totalmente carregado - modo responsivo ativo');
});