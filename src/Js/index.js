const contPokemons = document.getElementById("cont-pokemons");
const loading = document.getElementById("loading");
const search = document.getElementById("search");
const title= document.getElementById("title");
const cargar = document.getElementById("cargar");
const offset = 0;

const getApi = async (limit = 50) => {

cargar.innerHTML='';




    loading.classList.add("active");

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    const data = await response.json();

console.log(data.results.length)


    console.log(data);

    const promise = data.results.map(async (pokemon) => {
        const res = await fetch(pokemon.url);
        const data = await res.json();
        return data;
    });

    const results = await Promise.all(promise);
    contPokemons.innerHTML = '';
    const searchFilter = results.filter(result =>  result.name.includes(search.value) || result.order.toString().includes(search.value) || result.types[0].type.name.includes(search.value));
    console.log("es ",searchFilter);
    title.innerHTML=`Resultados encontrados ${searchFilter.length}`;
    searchFilter.map(result =>{
        const a = document.createElement("div");
        a.className = "pokemons";
        a.innerHTML = `
            <div class="cont-img"><img src="${result.sprites.front_default}" /></div>
           
           <p class="order">${result.order}</p>

            <p class="name">${result.name}</p>

            <div class="cont-tipos">
                <p class="tipospokemon">${result.types[0].type.name}</p>  
            </div>
        `;

        if (result.held_items[0] !== undefined) {
            const itemName = result.held_items[0].item.name;
            const truncatedName = itemName.length > 6 ? itemName.substring(0, 6) + "..." : itemName;

            const p = document.createElement("p");
            p.className = "tipospokemon";
            p.textContent = truncatedName;
            
            const contTipos = a.querySelector('.cont-tipos');
            contTipos.appendChild(p);
        }

        contPokemons.appendChild(a);

    });

    

    loading.classList.remove("active");
}

search.addEventListener('input', () => {
    contPokemons.innerHTML = ''; // Limpiar el contenido actual de contPokemons
    getApi(); // Llamar a la función getApi para actualizar la búsqueda
});

// Mostrar loading y luego llamar a la función getApi después de 3 segundos
loading.classList.add("active");
 setTimeout(() => {
 getApi();
}, 3000);




