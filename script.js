const url = 'https://pokeapi.co/api/v2/pokemon/';
const card = document.querySelector('#card');
const btn = document.querySelector("#btn");
const typeColor = {
    bug: '#26de81',
    dragon: '#ffeaa7',
    electric: '#fed330',
    fairy: '#FF0069',
    fighting: '#30336b',
    fire: '#f0932b',
    flying: '#81ecec',
    grass: '#00b894',
    ground: '#EFB549',
    ghost: '#a55eea',
    ice: '#74b9ff',
    normal: '#95afc0',
    poison: '#6c5ce7',
    psychic: '#a29bfe',
    rock: '#2d3436',
    water: '#0190FF'
}


const getPokeData = () => {

    let id = Math.floor(Math.random() * 150) + 1; // Get random number between 1 and 150
    const finalUrl = url + id; // Combine pokeapi with pokemon id

    fetch(finalUrl).then(res => res.json()).then(data => {
        generateCard(data);
    })

}

const generateCard = (data) => {
    console.log(data)
    const hp = data.stats[0].base_stat;
    const imgSrc = data.sprites.other.dream_world.front_default;
    const pokeName = data.name.toUpperCase();
    const statAttack = data.stats[1].base_stat;
    const statDef = data.stats[2].base_stat;
    const statSpeed = data.stats[5].base_stat;
    const themeColor = typeColor[data.types[0].type.name];
    console.log(themeColor)
        
    card.innerHTML = `
    <p class="hp"><span>HP</span> ${hp}</p>
    <img src="${imgSrc}" alt="${pokeName}">
    <h2 class="poke-name">
        ${pokeName}
    </h2>
    <div class="types">

    </div>
    <div class="stats">
        <div>
            <h3>${statAttack}</h3>
            <p>Attack</p>
        </div>
        <div>
            <h3>${statDef}</h3>
            <p>Defense</p>
        </div>
        <div>
            <h3>${statSpeed}</h3>
            <p>Speed</p>
        </div>
    </div>
    `;

    appendTypes(data.types);
    styleColor(themeColor);
};

const appendTypes = (types) => {
    types.forEach(item => {
        let span = document.createElement('span');
        span.innerText = item.type.name;
        document.querySelector('.types').appendChild(span)
    })
};

const styleColor = (color) => {
    card.style.background = `radial-gradient(
        circle at 50% 0%, ${color} 36%, #fff 36%)`;
    card.querySelectorAll('.types span').forEach(span => {
        span.style.background = `${color}`;
    })
}

btn.addEventListener('click', getPokeData);
window.addEventListener('load', getPokeData);