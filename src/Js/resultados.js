const contResultados=document.getElementById("cont-resultados");

function obtenerValorDeId() {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}
const id=obtenerValorDeId();
console.log(id);