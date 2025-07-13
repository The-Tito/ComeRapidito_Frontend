document.addEventListener('DOMContentLoaded', () => {

    // ===== CONSTANTES DE ELEMENTOS DEL DOM =====
    const mainContainer = document.getElementById('main-container');

    // Modal 1: Info Restaurante
    const bannerRestaurante = document.getElementById('banner-restaurante');
    const modalInfo = document.getElementById('modal-info-restaurante');
    const btnCerrarInfo = document.getElementById('cerrar-modal-info');

    // Modal 2: Notificación Producto Agregado
    const botonesAgregar = document.querySelectorAll('.producto-contenedor-agregar');
    const modalAgregado = document.getElementById('modal-agregado');

    // Modal 3: Confirmación de Salida
    const linksConfirmar = document.querySelectorAll('.nav-link-confirm');
    const modalConfirmar = document.getElementById('modal-confirmar-salida');
    const btnSalir = document.getElementById('btn-salir');
    const btnContinuar = document.getElementById('btn-continuar');

    let urlParaRedirigir = null; // Variable para guardar la URL del enlace

    // ===== FUNCIONES GENERALES PARA MODALES =====
    
    // Muestra un modal y aplica el efecto blur
    function mostrarModal(modal) {
        modal.classList.remove('oculto');
        mainContainer.classList.add('blur-effect');
    }

    // Oculta un modal y quita el efecto blur
    function ocultarModal(modal) {
        modal.classList.add('oculto');
        mainContainer.classList.remove('blur-effect');
    }

    // ===== LÓGICA PARA MODAL 1: INFO RESTAURANTE =====
    
    // Abrir modal de info al hacer clic en el banner
    bannerRestaurante.addEventListener('click', () => {
        mostrarModal(modalInfo);
    });

    // Cerrar modal de info con el botón 'X'
    btnCerrarInfo.addEventListener('click', () => {
        ocultarModal(modalInfo);
    });
    
    // Cerrar modal de info al hacer clic fuera del contenido
    modalInfo.addEventListener('click', (e) => {
        if (e.target === modalInfo) {
            ocultarModal(modalInfo);
        }
    });


    // ===== LÓGICA PARA MODAL 2: NOTIFICACIÓN PRODUCTO AGREGADO =====
    
    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', () => {
            // Muestra la notificación
            modalAgregado.classList.remove('oculto');
            
            // Oculta la notificación después de 2.5 segundos
            setTimeout(() => {
                modalAgregado.classList.add('oculto');
            }, 2500);
        });
    });

    
    // ===== LÓGICA PARA MODAL 3: CONFIRMACIÓN DE SALIDA =====

    // Abrir modal de confirmación al hacer clic en un enlace de navegación
    linksConfirmar.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Previene la navegación inmediata
            urlParaRedirigir = e.currentTarget.href; // Guarda la URL del enlace
            mostrarModal(modalConfirmar);
        });
    });

    // Acción del botón "Salir": redirige a la URL guardada
    btnSalir.addEventListener('click', () => {
        if (urlParaRedirigir) {
            window.location.href = urlParaRedirigir;
        }
    });
    
    // Acción del botón "Continuar aquí": simplemente cierra el modal
    btnContinuar.addEventListener('click', () => {
        ocultarModal(modalConfirmar);
    });
    
    // Cerrar modal de confirmación al hacer clic fuera del contenido
    modalConfirmar.addEventListener('click', (e) => {
        if (e.target === modalConfirmar) {
            ocultarModal(modalConfirmar);
        }
    });

});