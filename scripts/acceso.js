document.getElementById("formulario-acceso").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "caramelito" && password === "pastelito123") {
        Swal.fire({
            icon: 'success',
            title: '¡Accediste a mi corazón 💖!',
            text: 'Bienvenido/a, ¡eres muy especial!',
            background: '#ffe6e6',
            confirmButtonColor: '#ff6f91',
        }).then(() => {
            // Redirige a carta.html después de cerrar la alerta
            window.location.href = "carta.html";
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Usuario o contraseña incorrectos.',
            background: '#ffe6e6',
            confirmButtonColor: '#ff6f91',
        });
    }
});
