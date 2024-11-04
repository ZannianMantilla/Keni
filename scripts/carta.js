document.addEventListener('DOMContentLoaded', () => {
    // Inicializa la primera página
    document.getElementById('page-1').classList.add('active');

    // Reproduce el video con sonido
    const video = document.querySelector('.video-box video');
    video.muted = false;

    // Intenta reproducir el video con sonido después de una interacción del usuario si está bloqueado
    video.play().catch(() => {
        // Espera hasta que el usuario interactúe con la página para activar el sonido
        document.body.addEventListener('click', () => {
            video.play();
        }, { once: true });
    });

    // Cambia el fondo después de 3 segundos
    setTimeout(() => {
        document.body.classList.add('background-animation');
    }, 3000);
});

function nextPage(pageNumber) {
    // Ocultar todas las páginas
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));

    // Mostrar la página actual
    const currentPage = document.getElementById(`page-${pageNumber}`);
    currentPage.classList.add('active');
}

