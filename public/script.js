// const baseURL = 'https://www.boardgameatlas.com/api/search?name='  //OLD
const baseURL = 'http://api.boardgameatlas.com/api/search?name='  // UPDATED URL
const cardDeck = document.querySelector('.card-deck');
const form = document.querySelector('form');
const btn = document.querySelector('.btn');
const searchField = document.querySelector('input')

form.addEventListener('submit', fetchGames);

// FETCH DATA
function fetchGames(e) {

    e.preventDefault();

    let search = searchField.value;
    let buildURL = `${baseURL}${search}${clientID}`;

    fetch(buildURL)
        .then(res => res.json())
        .then(data => displayCards(data))
        .catch(err => console.error(err));
}

// DISPLAY DATA
function displayCards(data) {
    while (cardDeck.firstChild) {
        cardDeck.removeChild(cardDeck.firstChild);
    }

    let games = data.games;

    searchField.value = '';

    console.log(games[0]);

    for (let i = 0; i <= games.length; i++) {

        let game = games[i];

        // CREATE ELEMENTS
        let clearfix = document.createElement('div');
        // -----------------
        let card = document.createElement('div');
        let h5 = document.createElement('h5');
        let img = document.createElement('img');
        let cardBody = document.createElement('div');
        // -----------------
        let pub = document.createElement('p')
        let year = document.createElement('span');
        let price = document.createElement('p');
        let noPlayers = document.createElement('span');
        let time = document.createElement('p');
        let rules = document.createElement('a');
        let link = document.createElement('a');

        let br = document.createElement('br');
        
        // SET META & INFORMATION
        clearfix.setAttribute('class', 'clearfix');

        //----------------------- Card
        card.className = 'card bg-dark';
        card.style = 'max-width: 20rem; min-width: 20rem;'
        h5.className = "card-header";
        h5.innerText = game.name;
        img.className = 'card-img-top';
        img.src = game.thumb_url;
        img.alt = game.name
        cardBody.className = 'card-body';

        //----------------------- Card Body
        pub.className = 'card-text';
        pub.textContent = `Publisher: ${game.primary_publisher}`;
        noPlayers.className = 'card-text';
        noPlayers.textContent = `Player Count: ${game.min_players} - ${game.max_players}`;
        year.className = 'card-text';
        year.textContent = `Published: ${game.year_published}`;
        price.className = 'card-text text-success';
        price.textContent = `Price: $${game.price}`;
        time.className = 'card-text';
        time.textContent = `Playtime: ${game.min_playtime} mins`;
        rules.className = 'btn btn-danger';
        rules.style = 'margin-right: .5rem;'
        rules.href = game.rules_url;     
        rules.target = '_blank';
        rules.textContent = 'Rulebook'   
        link.className = 'btn btn-success gameLink';
        link.href = game.official_url;
        link.textContent = 'Game Link';
        link.target = '_blank';

        // BUILD ELEMENTS TOGETHER
        clearfix.appendChild(card);
        
        card.appendChild(h5);
        card.appendChild(img);
        card.appendChild(cardBody);

        cardBody.appendChild(pub);
        cardBody.appendChild(year);
        cardBody.appendChild(br);
        cardBody.appendChild(price);
        cardBody.appendChild(br);
        cardBody.appendChild(noPlayers);
        cardBody.appendChild(br);
        cardBody.appendChild(time);   
        cardBody.appendChild(rules);
        cardBody.appendChild(link);
        
        cardDeck.appendChild(clearfix);
    }
}

//! Consider building a function that creates a modal depending on what card is selected.  Will need to pass that particular infomtion from that card into through the modal button.


