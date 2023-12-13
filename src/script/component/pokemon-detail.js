class PokemonDetail extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'open' });
      const template = document.createElement('template');
      template.innerHTML = `
        <style>
        * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
          }

          .detail-container {
            text-align: center;
            display: flex;
            background-color: #fff;
            border: 1px solid #e0e0e0;
            border-radius: 10px;
            padding: 5px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
            position: relative;
          }
          
          .detail-title {
            font-size: 28px;
            font-weight: bold;
            margin: 0;
            color: #333;
          }
          
          .detail-table {
            width: 100%;
            border-collapse: collapse;
          }
          
          .detail-table th,
          .detail-table td {
            border: 1px solid #ccc;
            padding: 10px;
            text-align: center;
          }
          
          .detail-table th {
            background-color: #f5f5f5;
          }
          
          .detail-stats {
            text-align: left;
          }
          
          .detail-image {
            text-align: center;
          }
          
          .pokemon-image {
            min-width: 100%;
            height: auto;
          }
          
          .close-button {
            position: absolute;
            top: 10px;
            right: 10px;
            background-color: yellow;
            border: none;
            padding: 5px 10px;
            cursor: pointer;
            border-radius: 50%;
            color: #333;
            font-weight: bold;
            transition: background-color 0.3s;
          }
          
          .close-button:hover {
            background-color: #ffc107;
          }
          
          @media screen and (max-width: 768px) {
            .detail-container {
              flex-direction: column;
              overflow-x: auto; 
              justify-content: center;
              align-items: center;
              top: 50%; 
              left: 50%; 
              transform: translate(-50%, -50%); 
            }
        
            .detail-table {
              overflow-x: auto; 
            }
        
            .detail-stats {
              overflow-x: auto; 
            }
          }
          }
        </style>
        
        <div class="detail-container">
          <div class="detail-image">
            <img class="pokemon-image" src="" alt="Pokemon Image">
          </div>
          
          <div class="detail-info">
            <div class="detail-title"></div>
            <table class="detail-table">
              <thead>
                <tr>
                  <th>Attribute</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
          
          <div class="detail-stats">
            <canvas class="radar-chart"></canvas>
          </div>
        </div>
      `;
      shadow.appendChild(template.content.cloneNode(true));
    }
  
    connectedCallback() {
      const name = this.getAttribute('name');
      const id = this.getAttribute('id');
      const imageFrontDefault = this.getAttribute('image-front-default');
      const imageBackDefault = this.getAttribute('image-back-default');
      const type = this.getAttribute('type');
      const height = this.getAttribute('height');
      const weight = this.getAttribute('weight');
      const abilities = this.getAttribute('abilities');
      const moves = this.getAttribute('moves');
      const statsString = this.getAttribute('stats');
      const stats = statsString.split(';');
      
      const tableBody = this.shadowRoot.querySelector('.detail-table tbody');
      tableBody.innerHTML = '';
      
      const attributeValuePairs = [
        ['Name', name],
        ['ID', id],
        ['Type', type],
        ['Height', height],
        ['Weight', weight],
        ['Abilities', abilities],
        ['Moves', moves],
      ];
      
      for (const [attribute, value] of attributeValuePairs) {
        tableBody.innerHTML += `
          <tr>
            <th>${attribute}</th>
            <td><span>${value}</span></td>
          </tr>
        `;
      }
      
      const statNames = stats.map(stat => stat.split(': ')[0]);
      const statValues = stats.map(stat => parseInt(stat.split(': ')[1]));
      
      const radarChartElement = this.shadowRoot.querySelector('.radar-chart');
      
      const radarChart = new Chart(radarChartElement, {
        type: 'radar',
        data: {
          labels: statNames,
          datasets: [{
            label: 'Stats',
            data: statValues,
            fill: true,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            pointBackgroundColor: 'rgba(75, 192, 192, 1)',
          }]
        },
        options: {
          scale: {
            angleLines: {
              display: false
            },
            ticks: {
              beginAtZero: true,
              max: 100
            }
          }
        }
      });
      
      const imageElement = this.shadowRoot.querySelector('.pokemon-image');
      
      this.addEventListener('mouseover', () => {
        imageElement.src = imageBackDefault;
      });
      
      this.addEventListener('mouseout', () => {
        imageElement.src = imageFrontDefault;
      });
      
      const closeButton = document.createElement("button");
      closeButton.innerText = "X";
      closeButton.classList.add("close-button");
      
      closeButton.addEventListener("click", () => {
        this.closeDetail();
      });
      
      this.shadowRoot.querySelector('.detail-container').appendChild(closeButton);
    }
  
    closeDetail() {
      window.location.href = '../index.html';
    }
  }
  
  customElements.define('pokemon-detail', PokemonDetail);
  