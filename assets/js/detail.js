const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});

if (params.pokemon === null){
    alert('Selecione um pokemon')
    location.href = '/';
}

const content = document.getElementById('content')
pokeApi.getPokemonById(params.pokemon)
    .then((pokemon) => {
        content.innerHTML = `
        <div class="header ${pokemon.type}">
            <a class="back" href="/">&#11013;</a>
            <div class="title">
                <span class="name">${pokemon.name}</span>
                <span  class="number">#${pokemon.number}</span>
            </div>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
    
                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </div>
        <div class="body">
            <div class="section">
                <span class="title">Info</span>
                <table>
                    <tr>
                        <td class="body__desc">Altura</td>
                        <td class="body__value">${pokemon.height}m</td>
                    </tr>
                    <tr>
                        <td class="body__desc">Peso</td>
                        <td class="body__value">${pokemon.weight}kg</td>
                    </tr>
                </table>
            </div>
            <div class="section">
                <span class="title">Estatisticas</span>
                <table>
                    ${pokemon.stats.map((stat) => `
                        <tr>
                            <td class="body__desc">${stat.name}</td>
                            <td class="body__value">${stat.base}</td>
                    </tr>
                    `).join('')}
                </table>
            </div>
        </div>`
    })
