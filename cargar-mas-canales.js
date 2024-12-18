let visibleItems = 10; // Cantidad de items visibles inicialmente
const increment = 10; // Cantidad de items a cargar por cada scroll
let loading = false; // Estado para evitar múltiples cargas

// Función para mostrar los items visibles
function showVisibleChannels() {
    const channels = document.querySelectorAll('.channel-item');
    channels.forEach((channel, index) => {
        if (index < visibleItems) {
            channel.style.display = ''; // Mostrar item
        } else {
            channel.style.display = 'none'; // Ocultar item
        }
    });
}

// Función para cargar más canales
function loadMoreChannels() {
    if (loading) return; // Evitar múltiples cargas simultáneas
    loading = true;

    const loader = document.getElementById('loader');
    const noMoreMessage = document.getElementById('noMoreChannels');
    const channels = document.querySelectorAll('.channel-item');

    // Mostrar el loader o el mensaje de "No hay más canales disponibles"
    if (visibleItems < channels.length) {
        loader.style.display = 'block'; // Mostrar el cargador
        noMoreMessage.style.display = 'none'; // Ocultar el mensaje de "No hay más canales"
    } else {
        loader.style.display = 'none'; // Ocultar el cargador
        noMoreMessage.style.display = 'block'; // Mostrar mensaje de "No hay más canales"
        loading = false; // Resetear el estado de carga
        return; // No cargar más canales
    }

    setTimeout(() => {
        visibleItems += increment; // Incrementar el límite visible
        showVisibleChannels(); // Mostrar los nuevos items
        loader.style.display = 'none'; // Ocultar el cargador
        loading = false; // Resetear el estado de carga

        // Si ya se cargaron todos los canales, mostrar el mensaje de "No hay más canales"
        if (visibleItems >= channels.length) {
            noMoreMessage.style.display = 'block';
        }
    }, 1000); // Simular un tiempo de carga de 1 segundo
}

// Escuchar el evento de scroll para cargar más canales
window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 50 && !loading) {
        loadMoreChannels(); // Cargar más canales si se alcanza el final de la página
    }
});

// Inicializar los canales visibles
showVisibleChannels();
