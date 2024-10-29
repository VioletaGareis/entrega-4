async function buscarPokemon() {
    const pokemonId = document.getElementById("pokemonId").value;
    const container = document.getElementById("pokemonContainer");
    
    // Limpiar el contenedor en cada búsqueda
    container.innerHTML = "";

    // Validar que el ID ingresado es un número
    if (!pokemonId || isNaN(pokemonId) || pokemonId <= 0) {
        container.innerHTML = "<p>Por favor, ingrese un número de ID válido.</p>";
        return;
    }

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        
        // Comprobar si la respuesta es exitosa
        if (!response.ok) {
            throw new Error("Pokémon no encontrado.");
        }

        const pokemon = await response.json();
        
        // Crear la tarjeta con los datos
        renderizarPokemon(pokemon);
    } catch (error) {
        container.innerHTML = `<p>${error.message}</p>`;
    }
}

function renderizarPokemon(pokemon) {
    const container = document.getElementById("pokemonContainer");
    
    // Datos necesarios
    const nombre = pokemon.name;
    const tipos = pokemon.types.map(type => type.type.name).join(", ");
    const altura = pokemon.height / 10; // Convertir a metros
    const peso = pokemon.weight / 10; // Convertir a kilogramos
    const imagen = pokemon.sprites.front_default;

    // Crear el HTML de la tarjeta
    container.innerHTML = `
        <div style="border: 1px solid #000; padding: 10px; width: 200px; text-align: center;">
            <h2>${nombre.toUpperCase()}</h2>
            <img src="${imagen}" alt="${nombre}">
            <p><strong>Tipo:</strong> ${tipos}</p>
            <p><strong>Altura:</strong> ${altura} m</p>
            <p><strong>Peso:</strong> ${peso} kg</p>
        </div>
    `;
}
