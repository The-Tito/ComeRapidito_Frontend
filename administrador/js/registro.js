// ------- VISTA PREVIA DE IMÁGENES (logo y banner) --------
function mostrarImagen(event, previewId) {
  const input = event.target;
  const previewDiv = document.getElementById(previewId);
  const img = previewDiv.querySelector('img');
  const placeholderImg = previewDiv.parentElement.querySelector(':scope > img:not(.preview-imagen img)');
  if (placeholderImg) {
    placeholderImg.style.display = 'none';
  }
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      img.src = e.target.result;
      img.style.display = 'block';
    }
    reader.readAsDataURL(input.files[0]);
  } else {
    img.src = "";
    img.style.display = 'none';
    if (placeholderImg) {
      placeholderImg.style.display = 'block';
    }
  }
}

// ------- CAMBIO DE PASOS (1 y 2) --------
function cambiarPaso(elemento, paso) {
  document.querySelectorAll('.pasos span').forEach(span => span.classList.remove('activo'));
  elemento.classList.add('activo');
  document.getElementById('bloque-restaurante').style.display = (paso === 1) ? 'block' : 'none';
  document.getElementById('bloque-admin').style.display = (paso === 2) ? 'block' : 'none';
}

// ------- INICIALIZACIÓN AUTOMÁTICA --------
document.addEventListener("DOMContentLoaded", function() {
  // Paso inicial: mostrar restaurante, ocultar admin
  document.getElementById('bloque-restaurante').style.display = 'block';
  document.getElementById('bloque-admin').style.display = 'none';

  // Listeners de los pasos
  document.getElementById('paso1').addEventListener('click', function() {
    cambiarPaso(this, 1);
  });
  document.getElementById('paso2').addEventListener('click', function() {
    cambiarPaso(this, 2);
  });
});
