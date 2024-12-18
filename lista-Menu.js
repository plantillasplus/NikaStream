// Variables para manejar el gesto táctil
let startX = 0;
let currentX = 0;
let isSwiping = false;

// Detectar el inicio del gesto táctil
document.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    currentX = startX;
    isSwiping = true;
});

// Detectar el movimiento táctil
document.addEventListener('touchmove', (e) => {
    if (!isSwiping) return;

    currentX = e.touches[0].clientX;
    const menu = document.getElementById('sideMenu');

    // Si el menú está cerrado y deslizamos hacia la derecha
    if (!menu.classList.contains('open') && currentX > startX) {
        const offset = Math.min(currentX - startX, 250); // Limitar al ancho del menú
        menu.style.left = `${-250 + offset}px`; // Mover el menú parcialmente
    }

    // Si el menú está abierto y deslizamos hacia la izquierda
    if (menu.classList.contains('open') && currentX < startX) {
        const offset = Math.max(-250, currentX - startX); // Limitar al ancho del menú
        menu.style.left = `${offset}px`;
    }
});

// Detectar el final del gesto táctil
document.addEventListener('touchend', () => {
    if (!isSwiping) return;

    const menu = document.getElementById('sideMenu');
    const menuIcon = document.getElementById('menuIcon');
    const swipeDistance = currentX - startX;

    // Abrir el menú si deslizamos suficiente hacia la derecha
    if (!menu.classList.contains('open') && swipeDistance > 100) {
        openMenu(menu, menuIcon);
    }
    // Cerrar el menú si deslizamos suficiente hacia la izquierda
    else if (menu.classList.contains('open') && swipeDistance < -100) {
        closeMenu(menu, menuIcon);
    } else {
        // Restaurar el estado si el desplazamiento no fue suficiente
        menu.style.left = menu.classList.contains('open') ? '0' : '-250px';
    }

    isSwiping = false;
});

// Manejar clic en el ícono para sincronizar con el menú
document.getElementById('menuIcon').addEventListener('click', () => {
    const menu = document.getElementById('sideMenu');
    const menuIcon = document.getElementById('menuIcon');

    if (menu.classList.contains('open')) {
        closeMenu(menu, menuIcon);
    } else {
        openMenu(menu, menuIcon);
    }
});

// Función para abrir el menú
function openMenu(menu, menuIcon) {
    menu.classList.add('open');
    menu.style.left = '0';
    menuIcon.innerHTML = '<i class="fa-solid fa-x"></i>'; // Cambiar ícono a "Cerrar"
}

// Función para cerrar el menú
function closeMenu(menu, menuIcon) {
    menu.classList.remove('open');
    menu.style.left = '-250px';
    menuIcon.innerHTML = '<i class="fa-solid fa-bars"></i>'; // Cambiar ícono a "Abrir"
}
