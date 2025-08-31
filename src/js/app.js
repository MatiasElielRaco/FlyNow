document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector(".header__mobile");
  const nav = document.querySelector(".navegacion");
  const links = document.querySelectorAll(".navegacion__enlace");

  btn.addEventListener("click", () => {
    nav.classList.toggle("is-active");
  });

  // Scroll suave + cerrar menú al hacer clic
  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }

      // Cerrar menú en mobile
      nav.classList.remove("is-active");
    });
  });
});

const swiper = new Swiper('.mySwiper', {
  slidesPerView: 1,
  spaceBetween: 30,
  effect: "fade",
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

const botones = document.querySelectorAll(".paquete__boton");
  
  botones.forEach(boton => {
    boton.addEventListener("click", (e) => {
        mostrarModal(e.target.value);
    });
  });

  function mostrarModal(paquete) {
    const modal = document.createElement("div");
    const body = document.querySelector("body");
    body.classList.add("no-scroll");
    modal.classList.add("modal");
    modal.innerHTML = `
      <div class="modal__contenido">
        <h2 class="modal__titulo">Reserva tu paquete</h2>
        <p class="modal__texto">Completa el formulario para reservar tu paquete.</p>
        <form class="modal__formulario">
          <input id="nombre" name="nombre" class="modal__formulario--input" type="text" placeholder="Tu nombre" required />
          <input autoComplete="email" id="email" name="email" class="modal__formulario--input" type="email" placeholder="Tu email" required />
          <select id="paquete" name="paquete" class="modal__formulario--select" required disabled>
            <option value="${paquete}" selected>${paquete}</option>
          </select>
          <input class="modal__formulario--submit" type="submit" value="Enviar" />
        </form>
        <button class="modal__cerrar">Cerrar</button>
      </div>
    `;
      body.appendChild(modal);

      // const formulario = modal.querySelector(".modal__formulario");
      // formulario.addEventListener("submit", (e) => {
      //   e.preventDefault();
      //   const nombre = formulario.querySelector('input[type="text"]').value;
      //   const email = formulario.querySelector('input[type="email"]').value;
      //   console.log(`Nombre: ${nombre}, Email: ${email}`);
      // });

      const cerrarBtn = modal.querySelector(".modal__cerrar");
      cerrarBtn.addEventListener("click", () => {
        body.removeChild(modal);
        body.classList.remove("no-scroll");
      });
  }




