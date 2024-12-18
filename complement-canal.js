    let isFiltered = false; // Variable para controlar el estado del filtro

 function searchChannels() {
    const searchBar = document.getElementById('searchBar');
    const filter = searchBar.value.toLowerCase();
    const channels = document.querySelectorAll('.channel-item');
    let found = false; // Bandera para verificar si hay resultados

    channels.forEach(channel => {
        const title = channel.getAttribute('data-title').toLowerCase();
        const category = channel.getAttribute('data-category') ? channel.getAttribute('data-category').toLowerCase() : '';
        const optional = channel.getAttribute('data-opcional') ? channel.getAttribute('data-opcional').toLowerCase() : '';

        // Verificar si el filtro coincide con alguno de los atributos
        if (title.includes(filter) || category.includes(filter) || optional.includes(filter)) {
            channel.style.display = '';
            found = true; // Si hay al menos un resultado, actualizamos la bandera
        } else {
            channel.style.display = 'none';
        }
    });

    // Mostrar u ocultar mensaje de "sin resultados"
    const noResults = document.getElementById('noResults');
    if (!found) {
        noResults.style.display = 'block';
    } else {
        noResults.style.display = 'none';
    }
}


    // Cargar categorías dinámicamente en el menú
    function loadCategories() {
        const channels = document.querySelectorAll('.channel-item');
        const categories = new Set();

        channels.forEach(channel => {
            const category = channel.getAttribute('data-category');
            if (category) {
                categories.add(category);
            }
        });

        const menuCategories = document.getElementById('menuCategories');
        categories.forEach(category => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="#" data-category="${category}"><i class="fa-solid fa-folder-open"></i> ${category}</a>`;
            menuCategories.appendChild(li);
        });

        menuCategories.addEventListener('click', function (e) {
            const category = e.target.getAttribute('data-category');
            if (category) {
                filterByCategory(category);
                toggleMenu(); // Ocultar menú
            }
        });
    }

    // Filtrar canales por categoría
    function filterByCategory(category) {
        const channels = document.querySelectorAll('.channel-item');
        let found = false;

        channels.forEach(channel => {
            const channelCategory = channel.getAttribute('data-category');
            if (channelCategory === category) {
                channel.style.display = '';
                found = true;
            } else {
                channel.style.display = 'none';
            }
        });

        toggleShowAllButton(found); // Mostrar el botón si hay un filtro activo
    }

    // Mostrar todos los canales
    function showAllChannels() {
        const channels = document.querySelectorAll('.channel-item');
        channels.forEach(channel => {
            channel.style.display = '';
        });

        toggleShowAllButton(false); // Ocultar el botón después de restablecer
        toggleMenu(); // Cerrar el menú después de restablecer
    }

    // Alternar visibilidad del botón "Mostrar todo"
    function toggleShowAllButton(show) {
        const showAllButton = document.getElementById('showAllButton');
        if (show) {
            showAllButton.style.display = 'block';
            isFiltered = true;
        } else {
            showAllButton.style.display = 'none';
            isFiltered = false;
        }
    }

    // Renderizar canales dinámicamente
    function renderChannels() {
        const channels = document.querySelectorAll('.channel-item');
        channels.forEach(channel => {
            const image = channel.getAttribute('data-imagen');
            const title = channel.getAttribute('data-title');
            const category = channel.getAttribute('data-category');
            const optional = channel.getAttribute('data-opcional');

            channel.innerHTML = `
                <img src="${image}" alt="${title}">
                <div>
                    <div class="title">${title}</div>
                    <div class="tags">${optional || ''}, ${category || ''}</div>
                </div>
            `;
        });
    }

    // Cambiar reproductor dinámicamente entre embed y m3u8
    function changePlayer(sourceType, source) {
        const playerContainer = document.getElementById('player');
        playerContainer.innerHTML = ''; // Limpiar el contenido del reproductor

        if (sourceType === 'embed') {
            // Usar iframe para enlaces embed
            const iframe = document.createElement('iframe');
            iframe.src = source;
            iframe.frameBorder = '0';
            iframe.allowFullscreen = true;
            iframe.style.width = '100%';
            iframe.style.height = '100%';
            playerContainer.appendChild(iframe);
        } else if (sourceType === 'm3u8') {
            // Usar Clappr para enlaces m3u8
            new Clappr.Player({
                source: source,
                parentId: '#player',
                width: '100%',
                height: '100%',
                autoPlay: true
            });
        }
    }


    // Manejar clics en la lista de canales
    document.getElementById('channelList').addEventListener('click', function (e) {
        const channelItem = e.target.closest('.channel-item');
        if (channelItem) {
            const embed = channelItem.getAttribute('data-embed');
            const m3u8 = channelItem.getAttribute('data-m3u8');

            if (embed) {
                changePlayer('embed', embed);
            } else if (m3u8) {
                changePlayer('m3u8', m3u8);
            }
        }
    });

    // Inicializar la aplicación
    document.addEventListener('DOMContentLoaded', () => {
        renderChannels();
        loadCategories();

        // Crear el botón "Mostrar todo" dinámicamente
        const menuCategories = document.getElementById('menuCategories');
        const showAllButton = document.createElement('button');
        showAllButton.id = 'showAllButton';
        showAllButton.textContent = 'Mostrar todo';
        showAllButton.style.display = 'none'; // Oculto por defecto
        showAllButton.style.margin = '10px';
        showAllButton.style.padding = '10px';
        showAllButton.style.border = 'none';
        showAllButton.style.borderRadius = '5px';
        showAllButton.style.backgroundColor = '#1e90ff';
        showAllButton.style.color = '#fff';
        showAllButton.style.cursor = 'pointer';

        // Añadir funcionalidad al botón
        showAllButton.addEventListener('click', showAllChannels);

        // Agregar el botón al menú
        menuCategories.parentElement.appendChild(showAllButton);
    });
