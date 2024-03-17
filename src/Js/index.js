const contPokemons = document.getElementById("cont-pokemons");
const loading = document.getElementById("loading");
const search = document.getElementById("search");
const title= document.getElementById("title");
const button = document.getElementById("btn"); 
const cargar = document.getElementById("cargar");
const icon = document.getElementById("icon");
const contSearch = document.getElementById("cont-search");
const contpanel = document.getElementById("cont_panel");
let offset = 0;


const getApi = async (limit = 50, offset) => {
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
    
    const searchFilter = results.filter(result =>  result.name.includes(search.value) || result.order.toString().includes(search.value) || result.types[0].type.name.includes(search.value));
    
    console.log(searchFilter);
     // if(result.length < 1){
        //   alert();
        // }

       if(searchFilter.length < 1){
         cargar.style.display = "flex";
         btn.style.display = "none";
         title.style.display = "none";
         
       }else{
        cargar.style.display = "none";
        //  btn.style.display = "none";
         title.style.display = "block";

       }

    title.innerHTML=`Resultados encontrados ${searchFilter.length}`;
    searchFilter.map(result =>{
     

        const a = document.createElement("div");
        a.className = "pokemons";
        a.innerHTML =
          `
          <a href="resultados.html?id=${result.id}">
            <div class="cont-img"><img src="${result.sprites.front_default}" /></div>
           
           <p class="order">${result.id}</p>

            <p class="name">${result.name}</p>

            <div class="cont-tipos">
                <p class="tipospokemon">${result.types[0].type.name}</p>  
            </div> 
            </a>

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
    getApi(50); // Llamar a la función getApi para actualizar la búsqueda
});

// esta es la parte de cargar mas
button.addEventListener("click",()=>{
     offset = offset + 50;
    // alert(offset + 50);
    getApi(50, offset);
});

// Mostrar loading y luego llamar a la función getApi después de 3 segundos
loading.classList.add("active");
setTimeout(() => {
    contPokemons.innerHTML = '';
    getApi();
}, 1600);



search.addEventListener("focus",()=>{
contSearch.style.background = "#fff"
contSearch.style.boxShadow = "4px 3px 2px rgba(66, 66, 66, 0.5)"
icon.style.background = "#4285F4";
icon.style.boxShadow = "4px 3px 2px rgba(66, 66, 66, 0.5)"

contSearch.style.width = "250px"

});

search.addEventListener("blur",()=>{
    contSearch.style.background = "#red"
    
    });


