class SearchBar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.attachEventHandlers();
    }

    render() {
        this.shadowRoot.innerHTML = `
        <style>
        .search-container {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 20px auto;
            max-width: 60%;
        }
    
        input {
            flex: 1; /* Meratakan lebar input dan tombol */
            padding: 10px;
            border: 1px solid #ffc107;
            border-radius: 20px;
            font-size: 16px;
        }
    
        button {
            padding: 10px 20px;
            background-color: #ffc107;
            color: #000;
            border: none;
            border-radius: 20px;
            cursor: pointer;
            font-size: 16px;
            margin-left: 10px; /* Jarak antara input dan tombol */
        }
    
        button:hover {
            background-color: #ffab00;
        }
    
        input:focus {
            border-color: #ffab00;
            outline: none;
        }
    
        @media (max-width: 768px) {
            .search-container {
                flex-direction: column; /* Mengubah arah flexbox menjadi kolom */
            }
    
            input, button {
                width: 100%; /* Mengatur lebar input dan tombol menjadi 100% */
                margin: 10px 0; /* Jarak antara input dan tombol */
            }
        }
    </style>
    
            <div class="search-container">
                <input id="search-input" placeholder="Search Pokemon by Name">
                <button id="search-button">Search</button>
            </div>
        `;
    }

    attachEventHandlers() {
        const searchInput = this.shadowRoot.querySelector('#search-input');
        const searchButton = this.shadowRoot.querySelector('#search-button');

        searchInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                const searchText = searchInput.value.trim();
                if (searchText) {
                    this.dispatchEvent(new CustomEvent('search', { detail: searchText }));
                }
            }
        });

        searchButton.addEventListener('click', () => {
            const searchText = searchInput.value.trim();
            if (searchText) {
                this.dispatchEvent(new CustomEvent('search', { detail: searchText }));
            }
        });
    }
}

customElements.define('search-bar', SearchBar);
