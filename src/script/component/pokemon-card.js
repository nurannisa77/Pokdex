class PokemonCard extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: 'open' });

        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                .card {
                    position: relative;
                    border: 1px solid #f0f0f0;
                    border-radius: 10px;
                    background-color: #fff;
                    width: 100%;
                    max-width: 300px;
                    height: auto;
                    box-sizing: border-box;
                    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
                    display: flex;
                    flex-direction: column;
                    transition: transform 0.3s;
                    overflow: hidden;
                }


                .card img {
                    max-width: 100%;
                    max-height: 100%;
                    margin-top: 15px;
                    transition: transform 0.3s;
                }

                .card:hover img {
                    transform: scale(1.1); 
                }

                .card-body {
                    font-family: 'Poppins', sans-serif;
                    text-align: center;
                    flex-grow: 1;
                    overflow: hidden;
                }

                .card-title {
                    font-size: 20px;
                    font-weight: bold;
                    margin: 10px 0;
                }

                .card-id {
                    position: absolute;
                    background-color: #fffff;
                    top: -10px;
                    left: 10px;
                    border-radius: 90%;
                    padding: 2px 4px;
                    font-size: 15px;
                }

                .card-id[data-type="normal"],
                .card-id[data-type="unknown"],
                .card-id[data-type="shadow"] {
                    background-color: #A8A878;
                }
                
                .card-id[data-type="fighting"] {
                    background-color: #C03028;
                }
                
                .card-id[data-type="flying"] {
                    background-color: #A890F0;
                }
                
                .card-id[data-type="poison"] {
                    background-color: #A040A0;
                }
                
                .card-id[data-type="ground"] {
                    background-color: #E0C068;
                }
                
                .card-id[data-type="rock"] {
                    background-color: #B8A038;
                }
                
                .card-id[data-type="bug"] {
                    background-color: #A8B820;
                }
                
                .card-id[data-type="ghost"] {
                    background-color: #705898;
                }
                
                .card-id[data-type="steel"] {
                    background-color: #B8B8D0;
                }
                
                .card-id[data-type="fire"] {
                    background-color: #F08030;
                }
                
                .card-id[data-type="water"] {
                    background-color: #6890F0;
                }
                
                .card-id[data-type="grass"] {
                    background-color: #78C850;
                }
                
                .card-id[data-type="electric"] {
                    background-color: #F8D030;
                }
                
                .card-id[data-type="psychic"] {
                    background-color: #F85888;
                }
                
                .card-id[data-type="ice"] {
                    background-color: #98D8D8;
                }
                
                .card-id[data-type="dragon"] {
                    background-color: #7038F8;
                }
                
                .card-id[data-type="dark"] {
                    background-color: #705848;
                }
                
                .card-id[data-type="fairy"] {
                    background-color: #EE99AC;
                }
                
                @media screen and (max-width: 768px) {
                .card {
                    flex-direction: row;
                }

                .card img {
                    max-width: 100%;
                    max-height: 100%;
                    margin-left: 20px;
                    transition: transform 0.3s;
                }

                .card-title {
                    font-size: 20px;
                    font-weight: bold;
                    margin-right: 20px;
                    margin-top: 30px;
                }

                }
            </style>
                <div class="card">
                    <h4 class="card-id"></h4>
                    <img alt="poke-img" class="card-img">
                    <div class="card-body">
                        <h5 class="card-title"></h5>
                        <p class="card-text"></p>
                        <p class="card-text"></p>
                    </div>
                </div>
            </a>
        `;

        
        shadow.appendChild(template.content.cloneNode(true));
        
        
    }

connectedCallback() {
    this.shadowRoot.querySelector('.card-id').textContent = this.getAttribute('id');
    this.shadowRoot.querySelector('.card-id').setAttribute('data-type', this.getAttribute('type'));
    this.shadowRoot.querySelector('img').src = this.getAttribute('image');
    this.shadowRoot.querySelector('img').alt = this.getAttribute('name');
    this.shadowRoot.querySelector('.card-title').textContent = this.getAttribute('title');
    this.shadowRoot.querySelector('.card-text').textContent = this.getAttribute('type');

    this.addEventListener('click', async () => {
        const name = this.getAttribute('name');
        
        const apiUrl = `https://pokeapi.co/api/v2/pokemon/${name}`;
        try {
            const data = await $.get(apiUrl); 
    
            const stats = data.stats.map(stat => `${stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1)}: ${stat.base_stat}`);
            const height = data.height;
            const weight = data.weight;
            const abilities = data.abilities.map(ability => ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1));
            const moves = data.moves.slice(0, 5).map(move => move.move.name.charAt(0).toUpperCase() + move.move.name.slice(1));
            
            const $pokemonDetail = $('<pokemon-detail></pokemon-detail>');
            $pokemonDetail.attr('name', data.name);
            $pokemonDetail.attr('id', data.id);
            $pokemonDetail.attr('image-front-default', data.sprites.front_default);
            $pokemonDetail.attr('image-back-default', data.sprites.back_default);
            $pokemonDetail.attr('image-front-shiny', data.sprites.front_shiny);
            $pokemonDetail.attr('image-back-shiny', data.sprites.back_shiny);
            $pokemonDetail.attr('type', data.types.map(type => type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)).join(', '));
            $pokemonDetail.attr('stats', stats.join('; '));
            $pokemonDetail.attr('height', height);
            $pokemonDetail.attr('weight', weight);
            $pokemonDetail.attr('abilities', abilities.join('; '));
            $pokemonDetail.attr('moves', moves.join('; '));
                
            $('#pokemon-data').html(''); 
            $('#pokemon-data').append($pokemonDetail); 
    
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    });
    
    
    



}

}

customElements.define('pokemon-card', PokemonCard)