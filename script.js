document.addEventListener('DOMContentLoaded', function() {
  const musicBox  = document.getElementById('music-box');
  const title     = document.getElementById('title');
  const audio     = document.getElementById('audio');
  const container = document.querySelector('.container');
  const letter    = document.getElementById('letter');
  const collage   = document.getElementById('collage');

  // Texto a escribir en la carta (actualizado)
  const noteText = "Hola de nuevo dama  de hermoso nombre, disculpa si mi espíritu  aún llora, mis recuerdos gritan y mis sentimientos laten en busca de que los tuyos lo hagan una vez más en un tiempo remoto, miro hacia delante, pero choco como un mosquito en una raqueta, ya que lo que más me duele es saber que no hay otra vida en dónde pueda soñar con tomar con suavidad tu mano, me hubiera gustado ir a México  a disfrutar de la compañía del otro, me hubiera gustado que tengamos el mismo color de cabello, me hubiera gustado que por medio de tu arte arreglaras mis uñas, me hubiera gustado una niña con tus lindos ojos, tu linda sonrisa, tus labios y tu forma de pensar, tantos deseos fugaces encontrados en polvo, se que mi corazón  te extrañará toda la vida por lo puro que fue lo que tuvimos, esto no es un regalo hermoso, si no la agonía de mi alma que no significa que esté mal, solo estoy bien a mi manera, gracias por ser esa flor  de distinto color entre todas las de un prado, gracias por dejarme conocer tu personalidad  de oro, gracias alegrar mis días con tus sonrisas o con tu risa, gracias por arriesgarte a intentar arreglar lo dañado, gracias por darme experiencias tan únicas que aunque nos separe la distancia te sentía como mi hogar, tal vez maximizo mis problemas, pero así es mi sentir no puedo esconderlo, gracias por ser mi esperanza  Kenia.";
  
  // Palabras a resaltar (actualizado)
  const highlightWords = ["dama", "espíritu", "corazón", "méxico", "flor", "esperanza", "personalidad"];
  
  // Tiempo entre palabra y palabra (ms)
  const typeSpeed = 200;
  
  musicBox.addEventListener('click', function() {
    // Se activa la animación del título
    title.classList.add('show');
  
    // Después de 1.5 segundos se reproduce el audio
    setTimeout(function(){
      audio.play().catch(err => console.error("Error al reproducir el audio:", err));
  
      // 1.5 segundos después de iniciar el audio se disuelve la interfaz inicial
      setTimeout(function(){
        container.classList.add('fade-out');
        container.addEventListener('transitionend', function(){
          container.style.display = 'none';
          // Se muestra la carta
          letter.classList.add('show');
          // Inicia el efecto typewriter en la carta (con paginación)
          startTypewriter();
        }, { once: true });
      }, 1500);
    }, 1500);
  });
  
  /* Efecto typewriter con paginación en la carta */
  function startTypewriter() {
    // Se limpia el contenido previo y se crea la primera página
    letter.innerHTML = "";
    const firstPage = document.createElement("div");
    firstPage.classList.add("page");
    letter.appendChild(firstPage);
    let activePage = firstPage; // Página actual
  
    const words = noteText.split(" ");
    let index = 0;
  
    function appendWord() {
      if (index < words.length) {
        let word = words[index];
        // Creamos un span para la palabra
        const span = document.createElement("span");
        let cleanWord = word.replace(/[.,!?]/g, "").toLowerCase();
        if (highlightWords.includes(cleanWord)) {
          span.classList.add("highlight");
        }
        span.innerHTML = word + " ";
        activePage.appendChild(span);
  
        // Actualizamos el scroll para que se muestre la última parte de la carta
        letter.scrollTop = letter.scrollHeight;
  
        // Si se produce desbordamiento de la página, se crea una nueva
        if (activePage.scrollHeight > activePage.clientHeight) {
          activePage.removeChild(span);
          const newPage = document.createElement("div");
          newPage.classList.add("page");
          letter.appendChild(newPage);
          activePage = newPage;
          activePage.appendChild(span);
          // Actualizamos el scroll para la nueva página
          letter.scrollTop = letter.scrollHeight;
        }
        index++;
        setTimeout(appendWord, typeSpeed);
      } else {
        // Cuando se finaliza el texto, se muestra el botón "Siguiente"
        showNextButton();
      }
    }
    appendWord();
  }
  
  /* Función para mostrar el botón "Siguiente" */
  function showNextButton() {
    const nextBtn = document.createElement("button");
    nextBtn.classList.add("next-button");
    nextBtn.textContent = "Siguiente";
    // Se añade el botón al final de la carta
    letter.appendChild(nextBtn);
  
    nextBtn.addEventListener('click', function() {
      // Se oculta la carta con efecto fade out
      letter.classList.add('fade-out');
      letter.addEventListener('transitionend', function() {
        letter.style.display = 'none';
        // Se muestra el collage dinámico
        showCollage();
      }, { once: true });
    });
  }
  
  /* Función para mostrar el collage dinámico de imágenes */
  function showCollage() {
    // Se crea el grid de imágenes
    const grid = document.createElement("div");
    grid.classList.add("collage-grid");
  
    // Suponiendo que las imágenes se llaman img1.jpeg, img2.jpeg, ..., img7.jpeg
    for (let i = 1; i <= 7; i++) {
      const img = document.createElement("img");
      img.src = `img${i}.jpeg`;
      img.alt = `Imagen ${i}`;
      // Al hacer clic en una imagen se abre el modal con zoom
      img.addEventListener('click', function() {
        openModal(this.src);
      });
      grid.appendChild(img);
    }
    collage.appendChild(grid);
    // Se muestra el contenedor del collage (con transición suave)
    collage.classList.add('show');
  }
  
  /* Función para abrir el modal y mostrar la imagen en grande */
  function openModal(src) {
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    modal.style.display = "block";
    modalImg.src = src;
  }
  
  /* Cerrar el modal */
  const modal = document.getElementById('modal');
  const closeBtn = modal.querySelector('.close');
  
  closeBtn.addEventListener('click', function() {
    modal.style.display = "none";
  });
  
  // También se cierra el modal si se hace clic fuera de la imagen
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});
