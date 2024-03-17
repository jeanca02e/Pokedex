const contResultados=document.getElementById("cont-resultados");

function obtenerValorDeId() {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}
const id=obtenerValorDeId();
console.log(id);

const nobulto = async() => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();
    console.log(data);
    contResultados.innerHTML =  `
    <div class="cont-tipo-imagen">
        <div class="cont-tipo">
          <p class="tipo">
          ${data.types[0].type.name}
          </p>

          <p class="name">
              ${data.name}
          </p>
     </div>


     <img src="${data.sprites.front_default}"> 

      </div>

      <div class="pokemon-stats">
        <div class="stat">
            <div class="stat-name">HP</div>
            <div class="stat-bar">
                <div class="stat-progress" style="width: ${data.stats[0].base_stat}%;"></div>
              </div>
              <p>${data.stats[0].base_stat}</p>
        </div>

        <div class="stat">
          <div class="stat-name">Altura</div>
          <div class="stat-bar">
              <div class="stat-progress" style="width: ${data.height}%;"></div>
          </div>
          <p>${data.height}</p>
      </div>

      <div class="stat">
        <div class="stat-name">Peso</div>
        <div class="stat-bar">
            <div class="stat-progress" style="width: ${data.weight}%;"></div>
        </div>
        <p>${data.weight}</p>
    </div>

    <div class="stat">
      <div class="stat-name">Experiencia</div>
      <div class="stat-bar">
        <div class="stat-progress" style="width: ${data.base_experience}%;"></div>
      </div>
      <p>${data.base_experience}</p>
  </div>

  <div class="stat">
    <div class="stat-name">Ataque</div>
    <div class="stat-bar">
        <div class="stat-progress" style="width: ${data.stats[1].base_stat}%;"></div>
    </div>
    <p>${data.stats[1].base_stat}</p>
</div>

      
        </div>
        
    </div>

    `

}

nobulto();
