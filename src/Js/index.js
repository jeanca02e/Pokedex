const contPokemons = document.getElementById("cont-pokemons");
const offset = 50;

const getApi = async(limit=50)=>{
 const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
 const data = await response.json();

 console.log(data);

 const promise = data.results.map(async(pokemon)=>{
    const res = await fetch(pokemon.url);
    const data = await res.json();
    return data;
 })
 const results = await Promise.all(promise);
 console.log(results);
 for(let i = 0; i < results.length; i++){
    const a = document.createElement("div");
    a.className = "pokemons";
    a.innerHTML = `
    <div class = "cont-img"><img src="${results[i].sprites.front_default}" /></div>
    <p>${results[i].name}</p>`;
    
    contPokemons.appendChild(a);

 }

}

getApi();