const contPokemons = document.getElementById("cont-pokemons");
const loading = document.getElementById("loading");
const search = document.getElementById("search");
const title= document.getElementById("title");
const button = document.getElementById("btn"); 
let offset = 0;


const getApi = async (limit = 50, offset) => {
    loading.classList.add("active");

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    const data = await response.json();

    console.log(data);

    const promise = data.results.map(async (pokemon) => {
        const res = await fetch(pokemon.url);
        const data = await res.json();
        return data;
    });

    const results = await Promise.all(promise);
    
    const searchFilter = results.filter(result =>  result.name.includes(search.value) || result.order.toString().includes(search.value) || result.types[0].type.name.includes(search.value));
    
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

search.addEventListener('keyup', () => {
    contPokemons.innerHTML = ''; // Limpiar el contenido actual de contPokemons
    getApi(1000); // Llamar a la función getApi para actualizar la búsqueda
});

// esta es la parte de cargar mas
button.addEventListener("click",()=>{
     offset = offset + 50;
    // alert(offset + 50);
    getApi(50, offset);
    title.innerHTML=`Resultados encontrados ${10}`;
});

// Mostrar loading y luego llamar a la función getApi después de 3 segundos
loading.classList.add("active");
setTimeout(() => {
    contPokemons.innerHTML = '';
    getApi();
}, 3000);




