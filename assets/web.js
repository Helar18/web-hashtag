document.addEventListener("DOMContentLoaded", function () {
    // Elementos de la navegación
    const toggler = document.querySelector(".navbar-toggler"); // Botón de hamburguesa
    const collapseMenu = document.querySelector(".navbar-collapse"); // Menú colapsable
    const closeButton = document.getElementById("close-menu"); // Botón de cierre "X"
    const menuItems = document.querySelectorAll(".navbar-nav .nav-item .nav-link"); // Enlaces del menú
    const whatsappButton = document.querySelector(".whatsapp-float"); // Botón flotante de WhatsApp

    // Función para ocultar/mostrar el botón de WhatsApp según el estado del menú
    function toggleWhatsAppButton() {
        if (!whatsappButton) return;
        if (collapseMenu.classList.contains("show")) {
            whatsappButton.style.visibility = "hidden";
            whatsappButton.style.opacity = "0";
        } else {
            whatsappButton.style.visibility = "visible";
            whatsappButton.style.opacity = "1";
        }
    }
    
    // Resaltar el enlace activo en el menú sin cerrarlo
    menuItems.forEach(item => {
        item.addEventListener("click", function () {
            menuItems.forEach(link => link.classList.remove("active")); // Quitar la clase 'active' de otros enlaces
            this.classList.add("active"); // Agregar 'active' al enlace seleccionado
        });
    });

    // Abrir/Cerrar el menú con el botón de hamburguesa
    if (toggler && collapseMenu) {
        toggler.addEventListener("click", function () {
            collapseMenu.classList.toggle("show"); // Alterna la visibilidad del menú
            toggleWhatsAppButton(); // Gestiona la visibilidad del botón de WhatsApp

            if (collapseMenu.classList.contains("show")) {
                // Animación de aparición para los elementos del menú
                setTimeout(() => {
                    menuItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = "1";
                            item.style.transform = "translateY(0)";
                        }, index * 150);
                    });
                }, 300);
            } else {
                // Ocultar elementos cuando se cierra el menú
                menuItems.forEach(item => {
                    item.style.opacity = "0";
                    item.style.transform = "translateY(-20px)";
                });
            }
        });
    }

    // Cerrar el menú con el botón "X"
    if (closeButton) {
        closeButton.addEventListener("click", function () {
            collapseMenu.classList.remove("show");
            toggleWhatsAppButton(); // Asegurar que el botón de WhatsApp reaparezca
            menuItems.forEach(item => {
                item.style.opacity = "0";
                item.style.transform = "translateY(-20px)";
            });
        });
    }

    // Ajuste del menú cuando cambia el tamaño de la pantalla
    window.addEventListener("resize", function () {
        if (window.innerWidth >= 991) {
            collapseMenu.classList.remove("show");
            if (whatsappButton) whatsappButton.style.display = "block"; // Asegurar que WhatsApp se muestre en escritorio

            // Asegurar que los elementos del menú sean visibles en pantallas grandes
            menuItems.forEach(item => {
                item.style.opacity = "1";
                item.style.transform = "translateY(0)";
            });
        } else {
            if (!collapseMenu.classList.contains("show")) {
                menuItems.forEach(item => {
                    item.style.opacity = "0";
                    item.style.transform = "translateY(-20px)";
                });
            }
        }
    });

    // Cerrar el menú al hacer clic en un enlace
    menuItems.forEach(item => {
        item.addEventListener("click", function () {
            collapseMenu.classList.remove("show"); // Cierra el menú en móviles
            toggleWhatsAppButton(); // Asegurar que el botón de WhatsApp reaparezca
        });
    });
});

// Desplazamiento automático a la sección "Nosotros" después de la carga de la página
window.onload = function() {
    setTimeout(function() {
        document.getElementById("nosotros").scrollIntoView({ behavior: "smooth" });
    }, 500); // Pequeño retraso para asegurar que la página cargue bien
};

// JS para la sección "Nosotros"
document.addEventListener("DOMContentLoaded", function () {
    const valores = document.querySelectorAll(".valor");

    valores.forEach(valor => {
        valor.addEventListener("click", function (event) {
            // Cierra cualquier otro texto antes de abrir este
            valores.forEach(v => {
                if (v !== this) {
                    v.classList.remove("activo");
                }
            });

            // Alternar la visibilidad del texto
            this.classList.toggle("activo");

            // Evitar que el clic cierre inmediatamente el texto
            event.stopPropagation();
        });
    });

    // Cerrar los textos si se toca fuera
    document.addEventListener("click", function () {
        valores.forEach(valor => valor.classList.remove("activo"));
    });
});

/* JS para resaltar la sección activa en el menú */
document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section"); // Captura todas las secciones
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link"); // Captura los enlaces del menú

    function changeActiveLink() {
        let scrollPosition = window.scrollY + 100; // Ajuste para mejor detección

        sections.forEach((section) => {
            if (scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
                let id = section.getAttribute("id");
                navLinks.forEach((link) => {
                    link.classList.remove("active"); // Remueve la clase 'active' de todos los enlaces
                    if (link.getAttribute("href") === `#${id}`) {
                        link.classList.add("active"); // Agrega la clase 'active' al enlace correspondiente
                    }
                });
            }
        });
    }

    window.addEventListener("scroll", changeActiveLink);
    changeActiveLink(); // Ejecuta la función al cargar la página
});

document.addEventListener("DOMContentLoaded", function () {
    const track = document.querySelector(".carousel-items");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");

    // Duplicar los logos para un efecto infinito
    const logos = [...track.children];
    logos.forEach(logo => {
        const clone = logo.cloneNode(true);
        track.appendChild(clone);
    });

    let scrollAmount = 0;
    const scrollSpeed = 1; // 🔹 Velocidad de desplazamiento
    let animationFrame;
    let isScrolling = true; // Controla el auto-scroll

    function autoScroll() {
        if (!isScrolling) return; // Si está pausado, no hace nada

        scrollAmount += scrollSpeed;
        track.style.transform = `translateX(-${scrollAmount}px)`;

        // 🔹 Reinicio sin parpadeo cuando llega al final
        if (scrollAmount >= track.scrollWidth / 2) {
            track.style.transition = "none";
            scrollAmount = 0;
            track.style.transform = `translateX(0)`;
        } else {
            track.style.transition = "transform 0.1s linear";
        }

        animationFrame = requestAnimationFrame(autoScroll);
    }

    function stopAutoScroll() {
        isScrolling = false;
        cancelAnimationFrame(animationFrame);
    }

    function resumeAutoScroll() {
        if (!isScrolling) {
            isScrolling = true;
            autoScroll();
        }
    }

    function moveTrack(offset) {
        stopAutoScroll();
        track.style.transition = "transform 0.5s ease-in-out";
        scrollAmount += offset;

        // Evitar bugs cuando el usuario presiona muchas veces
        if (scrollAmount >= track.scrollWidth / 2) {
            scrollAmount = 0;
        } else if (scrollAmount < 0) {
            scrollAmount = track.scrollWidth / 2;
        }

        track.style.transform = `translateX(-${scrollAmount}px)`;

        setTimeout(() => {
            track.style.transition = "transform 0.1s linear";
            resumeAutoScroll();
        }, 800);
    }

    // Botón siguiente
    nextBtn.addEventListener("click", () => moveTrack(200));

    // Botón anterior
    prevBtn.addEventListener("click", () => moveTrack(-200));

    // 🔹 Iniciar desplazamiento automático
    autoScroll();
});

//modal video flotante
document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("videoModal");
    const videoFrame = document.getElementById("videoFrame");
    const closeBtn = document.querySelector(".close-btn");

    // Evento para abrir el modal
    document.querySelectorAll(".video-item").forEach(item => {
        item.addEventListener("click", function () {
            const videoUrl = this.getAttribute("data-video") + "?autoplay=1";
            videoFrame.src = videoUrl; // Cargar y reproducir el video
            modal.style.display = "block"; // Mostrar el modal
        });
    });

    // Evento para cerrar el modal
    closeBtn.addEventListener("click", function () {
        modal.style.display = "none"; // Ocultar el modal
        videoFrame.src = ""; // Detener el video
    });

    // Cerrar modal al hacer clic fuera del iframe
    modal.addEventListener("click", function (e) {
        if (e.target === modal) {
            modal.style.display = "none"; // Ocultar el modal
            videoFrame.src = ""; // Detener el video
        }
    });
});

// Funcionalidad de la barra de navegación fija
document.addEventListener("DOMContentLoaded", function () {
    let lastScrollY = window.scrollY;
    let navbar = document.querySelector(".navbar");
    let scrollThreshold = 100; // Umbral antes de ocultar la barra
    let isScrollingDown = false;

    window.addEventListener("scroll", function () {
        let currentScrollY = window.scrollY;

        if (currentScrollY > 50) {
            navbar.classList.add("scrolled"); // Se achica y cambia el fondo
        } else {
            navbar.classList.remove("scrolled"); // Vuelve a su estado original
        }

        // Detectar si el usuario está bajando o subiendo
        if (currentScrollY > lastScrollY + 10) {
            isScrollingDown = true;
        } else if (currentScrollY < lastScrollY - 10) {
            isScrollingDown = false;
        }

        // Ocultar o mostrar navbar según la dirección del scroll
        if (currentScrollY > scrollThreshold && isScrollingDown) {
            navbar.classList.add("hidden"); // Se oculta suavemente al bajar
        } else {
            navbar.classList.remove("hidden"); // Se muestra al subir
        }

        lastScrollY = currentScrollY;
    });
});



function openModalInicio() {
    let modal = document.getElementById("videoModalInicio");
    let iframe = document.getElementById("videoIframeInicio");

    if (modal && iframe) {
        modal.style.display = "flex";
        iframe.src = "https://www.youtube.com/embed/TU_VIDEO_ID"; // Reemplaza con tu video
    }
}

function closeModalInicio() {
    let modal = document.getElementById("videoModalInicio");
    let iframe = document.getElementById("videoIframeInicio");

    if (modal && iframe) {
        modal.style.display = "none";
        iframe.src = ""; // Esto detiene el video cuando cierras el modal
    }
}
document.addEventListener("DOMContentLoaded", function () {
    let modal = document.getElementById("videoModalInicio");

    if (modal) {
        modal.style.display = "none"; // 🔹 Se asegura de que el modal inicie oculto
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const elementos = document.querySelectorAll(".scroll-effect");

    function mostrarElementos() {
        const alturaVentana = window.innerHeight;

        elementos.forEach((elemento) => {
            const rect = elemento.getBoundingClientRect();
            if (rect.top < alturaVentana * 0.9 && rect.bottom > 0) {
                elemento.classList.add("show");
            } else {
                elemento.classList.remove("show"); // Reinicia el efecto al salir
            }
        });
    }

    window.addEventListener("scroll", mostrarElementos);
    mostrarElementos(); // Para animar los elementos que ya están en pantalla al cargar
});

//bloquear scroll para fondo negro responsive en menu y se
document.addEventListener("DOMContentLoaded", function () {
    const navbarToggler = document.querySelector(".navbar-toggler");
    const navbarCollapse = document.querySelector(".navbar-collapse");
    const closeMenuBtn = document.getElementById("close-menu");
    const navLinks = document.querySelectorAll(".nav-link"); // Selecciona todos los enlaces del menú

    function openMenu() {
        navbarCollapse.classList.add("show");
        document.body.classList.add("menu-open"); // Bloquea el scroll
    }

    function closeMenu() {
        navbarCollapse.classList.remove("show");
        document.body.classList.remove("menu-open"); // Restaura el scroll
    }

    // Abrir menú al hacer clic en el botón hamburguesa
    navbarToggler.addEventListener("click", openMenu);

    // Cerrar menú al hacer clic en el botón de cierre (X)
    closeMenuBtn.addEventListener("click", closeMenu);

    // Cerrar menú al hacer clic en cualquier enlace de navegación
    navLinks.forEach(link => {
        link.addEventListener("click", closeMenu);
    });
});



document.addEventListener("DOMContentLoaded", function () {
    const track = document.querySelector(".testimonios-track");
    const prevBtn = document.querySelector(".prev-test");
    const nextBtn = document.querySelector(".next-test");

    let index = 0;
    const testimonios = document.querySelectorAll(".testimonio");
    const testimoniosVisible = 3; // Cambia a 2 o 1 en responsive
    const totalTestimonios = testimonios.length;

    function updateCarousel() {
        const testimonioWidth = testimonios[0].offsetWidth + 30; // Incluye gap
        track.style.transform = `translateX(-${index * testimonioWidth}px)`;
    }

    nextBtn.addEventListener("click", function () {
        if (index < totalTestimonios - testimoniosVisible) {
            index++;
            updateCarousel();
        }
    });

    prevBtn.addEventListener("click", function () {
        if (index > 0) {
            index--;
            updateCarousel();
        }
    });

    // Asegurar que se reinicie en responsive
    window.addEventListener("resize", updateCarousel);
});

//Script para desplazar valores en moviles 
function toggleValores() {
    let valores = document.querySelectorAll(".valor");

    valores.forEach(valor => {
        valor.addEventListener("click", function () {
            this.classList.toggle("active");
        });
    });
}

// Ejecutar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", toggleValores);


