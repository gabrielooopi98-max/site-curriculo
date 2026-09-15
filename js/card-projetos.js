function criarCardProjeto(projeto) {
    const card = document.createElement('div');
    card.classList.add('card-projeto');

    card.innerHTML = `
    <div class="area-foto-projeto-card">
    <img src="${projeto.imagem}" alt="${projeto.titulo}" class="img-card-projeto">
    </div>
    
    <div class="conteudo-card-projeto">
    <h3>${projeto.titulo}</h3>
    <p class="descricao-projeto">${projeto.descricao}</p>

    <div class="barra-linguagens">
    ${projeto.linguagens.map(lang => `
        <div class="segmento-linguagem" style="width: ${lang.porcentagem}%; background-color: ${lang.cor};"></div>
    `).join('')}
    </div>

    <div class="legenda-linguagens">
    ${projeto.linguagens.map(lang => `
        <span class="pilula-linguagem">
            <span class="bolinha-cor" style="background-color: ${lang.cor};"></span>
            ${lang.nome} <span class="porcentagem-linguagem">${lang.porcentagem}%</span>
        </span>
    `).join('')}
</div>

    <button class="btn-expandir-card" type="button" aria-label="Ver tecnologias" aria-expanded="false">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M6 9l6 6 6-6"/>
    </svg>
    </button>

    <div class="area-interativa-card-projeto">
    <a href="${projeto.links.verSite}" class="btn-ver-projeto" target="_blank" rel="noopener noreferrer">Ver Site</a>
    <a href="${projeto.links.github}" class="btn-github" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 16 16" width="18" height="18" fill="currentColor" aria-hidden="true">
                                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
                     0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13
                     -.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66
                     .07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15
                     -.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27
                     .68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12
                     .51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48
                     0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8
                     c0-4.42-3.58-8-8-8Z" />
                            </svg> GitHub</a>
    </div>
    </div>
    `;

    const btnExpandirCard = card.querySelector('.btn-expandir-card');
    btnExpandirCard.addEventListener('click', () => {
        const expandido = card.classList.toggle('expandido');
        btnExpandirCard.setAttribute('aria-expanded', expandido);
        btnExpandirCard.setAttribute('aria-label', expandido ? 'Ocultar tecnologias' : 'Ver tecnologias');
        sincronizarAlturaCards();
    });

    return card;
}

// FUNÇÃO PARA RENDERIZAR OS CARDS
function renderizarCards() {
    const container = document.querySelector('.cards-projetos-grid');

    projetos.forEach(projeto => {
        const card = criarCardProjeto(projeto);
        container.appendChild(card);
    });
}

renderizarCards();

// FUNÇÃO PARA SICRONIZAR ALTURA DOS CARDS
function sincronizarAlturaCards() {
    const todosCards = document.querySelectorAll('.card-projeto');
    const cardsExpandidos = document.querySelectorAll('.card-projeto.expandido');

    todosCards.forEach(card => {
        card.style.minHeight = '';
    });

    // Reseta pra medir a altura "natural" de cada um primeiro
    cardsExpandidos.forEach(card => {
        card.style.minHeight = '';
    });

    if (cardsExpandidos.length === 0) return;

    // Acha a maior altura entre os cards expandidos
    let maiorAltura = 0;
    cardsExpandidos.forEach(card => {
        if (card.offsetHeight > maiorAltura) {
            maiorAltura = card.offsetHeight;
        }
    });

    // Aplica essa altura em todos os cards expandidos
    cardsExpandidos.forEach(card => {
        card.style.minHeight = `${maiorAltura}px`;
    });

}

//AREA DOTS

const container = document.querySelector('.cards-projetos-grid');
const cards = document.querySelectorAll('.card-projeto');
const dots = document.querySelectorAll('.dot');

dots.forEach((dot, indice) => {
    dot.addEventListener("click", () => {
        const card = cards[indice];

        container.scrollTo({
            left: card.offsetLeft,
            behavior: 'smooth'
        });

        dots.forEach(dot => dot.classList.remove('ativo'));
        dot.classList.add('ativo');
    })
})