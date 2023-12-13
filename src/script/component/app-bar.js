class AppBar extends HTMLElement {
    constructor() {
        super();
        this.shadowDOM = this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowDOM.innerHTML = `
        <style>
            :host {
                display: flex;
                justify-content: space-around; /* Menengahkan elemen */
                align-items: center; /* Menengahkan elemen */
                height: 100px; /* Sesuaikan dengan tinggi yang Anda inginkan */
                background-color: #ffab00;
                color: white;
                padding: 0 20px;
            }

            .logo {
                width: 150px;
                padding: 20px;
            }

            .github-logo {
                width: 32px;
            }
        </style>
        <img class="logo" src="./assets/images/poke-logo.png" alt="Logo">
        <a href="https://github.com/nurannisa77" target="_blank">
            <img class="github-logo" src="./assets/images/github-logo.png" alt="GitHub">
        </a>
        `;
    }
}

customElements.define('app-bar', AppBar);
