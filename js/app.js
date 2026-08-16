// Base de datos inicial con atributos para el diseño tipo catálogo
const inventarioInicial = [
    {
        id: 1,
        modelo: "Nissan Skyline GT-R R34",
        categoria: "DEPORTIVO / JDM",
        estado: "EXCLUSIVO",
        precio: 85000,
        imagen: "img/skyunouno.png",
        km: "0 km",
        motor: "2.6L RB26DETT Twin-Turbo",
        potencia: "280 HP",
        transmision: "Manual 6v",
        traccion: "AWD (ATTESA E-TS)",
        año: 1999,
        descripcion: "El rey de las calles japonesas. Equipado con el icónico motor RB26DETT, tracción integral inteligente y pantalla MFD original de fábrica."
    },
    {
        id: 2,
        modelo: "Toyota Supra MK4",
        categoria: "COUPÉ / JDM",
        estado: "SEMINUEVO",
        precio: 70000,
        imagen: "img/supraunouno.png",
        km: "12,500 km",
        motor: "3.0L 2JZ-GTE Twin-Turbo",
        potencia: "320 HP",
        transmision: "Manual Getrag 6v",
        traccion: "RWD (Trasera)",
        año: 1998,
        descripcion: "Una leyenda del JDM. Su legendario motor 2JZ ofrece un rendimiento excepcional y un potencial de modificación prácticamente ilimitado."
    },
    {
        id: 3,
        modelo: "Mazda RX-7 FD",
        categoria: "DEPORTIVO / ROTATIVO",
        estado: "EXCLUSIVO",
        precio: 55000,
        imagen: "img/rx7unouno.png",
        km: "5,000 km",
        motor: "1.3L 13B-REW Rotativo Twin-Turbo",
        potencia: "255 HP",
        transmision: "Manual 5v",
        traccion: "RWD (Trasera)",
        año: 2002,
        descripcion: "Diseño atemporal con distribución de peso perfecta 50:50. Su motor rotativo Wankel entrega una experiencia de conducción única."
    }
];

// Inicializar LocalStorage
function inicializarInventario() {
    const CLAVE_STORAGE = 'jdm_autos_v3';
    let autos = JSON.parse(localStorage.getItem(CLAVE_STORAGE));
    
    if (!autos) {
        localStorage.setItem(CLAVE_STORAGE, JSON.stringify(inventarioInicial));
        autos = inventarioInicial;
    }
    return autos;
}   

// Renderizar las cards con el diseño del catálogo
function renderizarAutos() {
    const contenedor = document.getElementById('contenedor-autos');
    if (!contenedor) return;

    const autos = inicializarInventario();
    contenedor.innerHTML = '';

    const esPaginaSecundaria = window.location.pathname.includes('/pages/');

    autos.forEach(auto => {
        const col = document.createElement('div');
        col.className = 'col-md-4';

        const rutaImagen = esPaginaSecundaria ? `../${auto.imagen}` : auto.imagen;

        col.innerHTML = `
            <div class="card h-100 border-0 rounded-3 shadow overflow-hidden position-relative text-white" style="background-color: #16181a;">
                <!-- Badge de Estado (Esquina Superior Izquierda) -->
                <span class="position-absolute top-0 start-0 m-3 badge bg-danger text-uppercase fw-bold px-3 py-2 z-1">
                    ${auto.estado || 'NUEVO'}
                </span>

                <!-- Imagen del Vehículo -->
                <div class="position-relative overflow-hidden">
                    <img src="${rutaImagen}" class="card-img-top object-fit-cover" style="height: 220px;" alt="${auto.modelo}">
                </div>

                <div class="card-body p-4 d-flex flex-column">
                    <!-- Categoría en Rojo -->
                    <small class="text-danger fw-bold text-uppercase small mb-1" style="letter-spacing: 0.5px;">
                        ${auto.categoria || 'DEPORTIVO'}
                    </small>

                    <!-- Título del Modelo -->
                    <h5 class="card-title fw-bold text-white mb-3 fs-5">${auto.modelo}</h5>

                    <!-- Datos Rápida Visión (Año, Km, Potencia) -->
                    <div class="d-flex justify-content-between text-secondary border-bottom border-secondary border-opacity-25 pb-3 mb-3 small">
                        <span>📅 ${auto.año}</span>
                        <span>🛣️ ${auto.km || '0 km'}</span>
                        <span>⚡ ${auto.potencia}</span>
                    </div>

                    <!-- Fila Inferior: Precio + Botón Blanco -->
                    <div class="d-flex align-items-end justify-content-between mt-auto">
                        <div>
                            <small class="text-muted d-block text-uppercase fw-semibold" style="font-size: 0.7rem;">PRECIO</small>
                            <span class="fs-4 fw-bold text-white">$${auto.precio.toLocaleString()}</span>
                        </div>
                        <button class="btn btn-light fw-bold px-3 py-2" onclick="verDetalles(${auto.id})">
                            Ver más
                        </button>
                    </div>
                </div>
            </div>
        `;
        contenedor.appendChild(col);
    });
}

// Redirigir a la vista de detalles
function verDetalles(id) {
    if (window.location.pathname.includes('/pages/')) {
        window.location.href = `detalles.html?id=${id}`;
    } else {
        window.location.href = `pages/detalles.html?id=${id}`;
    }
}

// Cargar la información en la vista detalles.html
function cargarDetallesAuto() {
    const contenedorDetalles = document.getElementById('contenedor-detalles');
    if (!contenedorDetalles) return;

    const urlParams = new URLSearchParams(window.location.search);
    const idAuto = parseInt(urlParams.get('id'));

    const autos = inicializarInventario();
    const auto = autos.find(a => a.id === idAuto);

    if (!auto) {
        contenedorDetalles.innerHTML = `
            <div class="text-center py-5">
                <h2>Vehículo no encontrado</h2>
                <a href="../index.html" class="btn btn-danger mt-3">Volver al Inicio</a>
            </div>
        `;
        return;
    }

    contenedorDetalles.innerHTML = `
        <div class="row g-4 align-items-center">
            <div class="col-lg-6">
                <img src="../${auto.imagen}" class="img-fluid rounded shadow border border-secondary w-100" alt="${auto.modelo}">
            </div>
            <div class="col-lg-6">
                <span class="badge bg-danger mb-2">${auto.estado || 'JDM Legend'}</span>
                <h1 class="display-5 fw-bold mb-2">${auto.modelo}</h1>
                <h3 class="text-danger fw-bold mb-4">$${auto.precio.toLocaleString()} USD</h3>
                <p class="lead mb-4">${auto.descripcion}</p>

                <h4 class="border-bottom border-danger pb-2 mb-3">Especificaciones Técnicas</h4>
                <div class="row g-3">
                    <div class="col-6"><strong>Año:</strong> <span>${auto.año}</span></div>
                    <div class="col-6"><strong>Motor:</strong> <span>${auto.motor}</span></div>
                    <div class="col-6"><strong>Potencia:</strong> <span>${auto.potencia}</span></div>
                    <div class="col-6"><strong>Transmisión:</strong> <span>${auto.transmision}</span></div>
                    <div class="col-6"><strong>Tracción:</strong> <span>${auto.traccion}</span></div>
                </div>

                <div class="mt-5 d-flex gap-3">
                    <a href="contacto.html" class="btn btn-danger btn-lg">Cotizar / Comprar</a>
                    <a href="../index.html" class="btn btn-outline-secondary btn-lg">Volver al Inicio</a>
                </div>
            </div>
        </div>
    `;
}

// Inicializador del DOM
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('contenedor-autos')) {
        renderizarAutos();
    }
    if (document.getElementById('contenedor-detalles')) {
        cargarDetallesAuto();
    }
});