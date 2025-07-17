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

// ------- CONVIERTE HORA DEL FORMULARIO A FORMATO 24H --------
function getHorario(horaId, minutoId, ampmId) {
  let hora = parseInt(document.getElementById(horaId).value);
  const minutos = document.getElementById(minutoId).value.padStart(2, "0");
  const ampm = document.getElementById(ampmId).value;

  if (ampm === "PM" && hora < 12) hora += 12;
  if (ampm === "AM" && hora === 12) hora = 0;

  return `${hora.toString().padStart(2, "0")}:${minutos}:00`;
}

// ------- ENVIAR FORMULARIO COMO JSON --------
document.getElementById("registroRestaurante").onsubmit = async function(e) {
  e.preventDefault();

  // Datos restaurante
  const restaurante = {
    nombre: document.getElementById("nombre").value,
    direccion: document.getElementById("direccion").value,
    telefono: document.getElementById("telefono").value,
    horario_apertura: getHorario("apertura_hora", "apertura_minuto", "apertura_ampm"),
    horario_cierre: getHorario("cierre_hora", "cierre_minuto", "cierre_ampm"),
    id_usuario: document.getElementById("id_usuario").value,
    // Si tu backend solo espera JSON, no incluyas logo/banner aquí
  };

  console.log("Datos enviados al backend:", restaurante);

  // Enviar al backend
  try {
    const resp = await fetch('http://localhost:7000/api/restaurant', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(restaurante)
    });
    const data = await resp.json();
    if (resp.ok) {
      alert("Restaurante registrado correctamente");
      console.log("Respuesta backend:", data);
    } else {
      alert("Error: " + (data.error || "No se pudo registrar"));
      console.error("Respuesta backend:", data);
    }
  } catch (error) {
    alert("Error al conectar con el backend");
    console.error(error);
  }
};

// ------- INICIALIZACIÓN AUTOMÁTICA DE PASOS --------
document.addEventListener("DOMContentLoaded", function() {
  // Paso inicial: mostrar restaurante, ocultar admin
  document.getElementById('bloque-restaurante').style.display = 'block';
  document.getElementById('bloque-admin').style.display = 'none';

  // Listeners de los pasos (si tienes id="paso1"/id="paso2" en tu HTML)
  const paso1 = document.querySelector('.pasos span:nth-child(1)');
  const paso2 = document.querySelector('.pasos span:nth-child(3)');
  if (paso1) paso1.onclick = function() { cambiarPaso(this, 1); };
  if (paso2) paso2.onclick = function() { cambiarPaso(this, 2); };
});
