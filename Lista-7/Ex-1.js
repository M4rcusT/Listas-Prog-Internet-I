let currentPokemonId = 1;

async function fetchPokemon(id) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemon = await response.json();
    return pokemon;
}

function displayPokemon(pokemon) {
    document.getElementById('pokemon-name').textContent = pokemon.name;
    document.getElementById('pokemon-image').src = pokemon.sprites.front_default;
    document.getElementById('pokemon-id').textContent = `#${pokemon.id}`;
    // Modificação: Exibir os tipos em linhas separadas quando houver mais de um tipo
    const types = pokemon.types.map(typeInfo => typeInfo.type.name);
    document.getElementById('pokemon-types').innerHTML = types.join('<br>');
}

async function updatePokemon(id) {
    const pokemon = await fetchPokemon(id);
    displayPokemon(pokemon);
}

document.getElementById('prev-btn').addEventListener('click', () => {
    if (currentPokemonId > 1) {
        currentPokemonId--;
        updatePokemon(currentPokemonId);
    }
});

document.getElementById('next-btn').addEventListener('click', () => {
    currentPokemonId++;
    updatePokemon(currentPokemonId);
});

window.onload = () => {
    updatePokemon(currentPokemonId);
};