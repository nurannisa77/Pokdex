class AppFooter extends HTMLElement {
    constructor() {
        super();
        this.shadowDOM = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowDOM.innerHTML = `
        <style>
            :host {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 60px;
                background-color: #ffab00;
                color: #000000;
                font-weight: bold;
                bottom: 0;
            }

            .copyright {
                font-size: 14px;
            }
        </style>
        <div class="copyright">&copy; 2023 ANNISA</div>
        `;
    }
}

customElements.define('app-footer', AppFooter);
