$(document).ready(function () {
    const apiUrl = 'https://pokeapi.co/api/v2/pokemon';
    let currentPage = 1;
    let totalPages = 1;
    let dataPerPage = 20;

    function fetchTotalPages() {
        $.ajax({
            url: `${apiUrl}/?limit=${dataPerPage}`,
            method: 'GET',
            success: function (data) {
                totalPages = Math.ceil(data.count / dataPerPage);
                createPageButtons();
                setActivePageButton();
            },
        });
    }

    function fetchPokemonData(page) {
        $.ajax({
            url: `${apiUrl}?offset=${(page - 1) * dataPerPage}&limit=${dataPerPage}`,
            method: 'GET',
            success: function (data) {
                displayPokemonData(data.results);
            },
        });
    }

    function displayPokemonData(pokemonList) {
        const $pokemonData = $('#pokemon-data');
        $pokemonData.empty();
        pokemonList.sort((a, b) => a.id - b.id);

        for (let i = 0; i < pokemonList.length; i++) {
            const pokemon = pokemonList[i];
            const pokemonUrl = pokemon.url;

            $.ajax({
                url: pokemonUrl,
                method: 'GET',
                success: function (data) {
                    const id = data.id;
                    const name = data.name;
                    let types = '';
                    // if (data.types && data.types.length > 0) {
                    //     types = data.types.map(type => type.type.name).join(', ');
                    // }
                    if (data.types && data.types.length > 0) {
                        const firstType = data.types[0].type.name;
                        types = firstType;
                    }
                    const element = data.types[0].type.name;
                    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

                    const $pokemonCard = document.createElement('pokemon-card');
                    $pokemonCard.setAttribute('image', imageUrl);
                    $pokemonCard.setAttribute('name', name);
                    $pokemonCard.setAttribute('title', `${name}`);
                    $pokemonCard.setAttribute('id', `#${id}`);
                    $pokemonCard.setAttribute('type', types);
                    $pokemonCard.setAttribute('element', `Element: ${element}`);

                    $pokemonData.append($pokemonCard);
                },
            });
        }
    }

    

    const searchBar = document.querySelector('search-bar');
    searchBar.addEventListener('search', (event) => {
        const searchKeyword = event.detail;
        if (searchKeyword) {
            searchPokemonByName(searchKeyword);
        }
    });

    function searchPokemonByName(name) {
        $.ajax({
            url: `${apiUrl}/${name}`,
            method: 'GET',
            success: function (data) {
                const $pokemonData = $('#pokemon-data');
                $pokemonData.empty();

                const $pokemonCard = document.createElement('pokemon-card');
                $pokemonCard.setAttribute('image', `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`);
                $pokemonCard.setAttribute('name', data.name);
                $pokemonCard.setAttribute('title', data.name);
                $pokemonCard.setAttribute('id', `#${data.id}`);
                $pokemonCard.setAttribute('type', data.types[0].type.name);

                $pokemonData.append($pokemonCard);
            },
            error: function () {
                alert('Pokemon not found. Please try a different name.');
            },
        });
    }

    function updatePageNumber() {
        $('#page-number').text(currentPage);
    }

    function createPageButtons() {
        const $pagination = $('.pagination');
        $pagination.empty();

        if (currentPage === 1) {
            $pagination.append(`<button id="first-button" disabled>First</button>`);
        } else {
            $pagination.append(`<button id="first-button">First</button>`);
            $pagination.append(`<button id="prev-button">Prev</button>`);
        }

        if (currentPage < totalPages) {
            $pagination.append(`<button class="page-button">${currentPage}</button>`);
        } else {
            $pagination.append(`<button class="page-button active">${currentPage}</button>`);
        }

        if (currentPage === totalPages) {
            $pagination.append(`<button id="last-button" disabled>Last</button>`);
        } else {
            $pagination.append(`<button class="page-button">${currentPage + 1}</button>`);
            $pagination.append(`<button class="page-button">${currentPage + 2}</button>`);
            $pagination.append(`<button id="next-button">Next</button>`);
            $pagination.append(`<button id="last-button">Last</button>`);
        }
    }

    function setActivePageButton() {
        $('.page-button').removeClass('active');
        $(`.page-button:contains(${currentPage})`).addClass('active');
    }
    

    $('.pagination').on('click', 'button', function () {
        if ($(this).is('#first-button')) {
            currentPage = 1;
        } else if ($(this).is('#prev-button')) {
            if (currentPage > 1) {
                currentPage--;
            }
        } else if ($(this).is('#next-button')) {
            if (currentPage < totalPages) {
                currentPage++;
            }
        } else if ($(this).is('#last-button')) {
            currentPage = totalPages;
        } else {
            const newPage = parseInt($(this).text());
            if (!isNaN(newPage) && newPage !== currentPage) {
                currentPage = newPage;
            }
        }

        fetchPokemonData(currentPage);
        updatePageNumber();
        createPageButtons();
        setActivePageButton();
    });

    fetchTotalPages();
    fetchPokemonData(currentPage);
});
