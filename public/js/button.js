const numeroConteoSpan = document.getElementById("numero-conteo");
let valorConteoHidden = document.getElementById("valor-conteo-hidden");
valorConteoHidden.value = 1;
let numeroConteo = 1;

numeroConteoSpan.textContent = numeroConteo;

function disminuirConteo() {
  if (numeroConteo > 1) {
    numeroConteo--;
  }
  numeroConteoSpan.textContent = numeroConteo;
  valorConteoHidden.value = numeroConteo;
}

function disminuir10() {
  if (numeroConteo > 1 && numeroConteo > 10) {
    numeroConteo = numeroConteo - 10;
  }
  numeroConteoSpan.textContent = numeroConteo;
  valorConteoHidden.value = numeroConteo;
}

function aumentar1() {
  numeroConteo++;
  numeroConteoSpan.textContent = numeroConteo;
  valorConteoHidden.value = numeroConteo;
}

function sumar10() {
  numeroConteo += 10;
  numeroConteoSpan.textContent = numeroConteo;
  valorConteoHidden.value = numeroConteo;
}

document.getElementById("boton-disminuir").addEventListener("click", disminuirConteo);
document.getElementById("boton-disminuir10").addEventListener("click", disminuir10);
document.getElementById("boton-aumentar1").addEventListener("click", aumentar1);
document.getElementById("boton-sumar10").addEventListener("click", sumar10);
