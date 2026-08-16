// Arreglo de vehículos por defecto
const catalogoInicial = [
    {
        id: 1,
        nombre: "Porsche 911 GT3 RS",
        categoria: "Deportivo",
        etiqueta: "Nuevo",
        etiquetaClases: "bg-red-600 text-white",
        anio: 2024,
        kilometraje: "0 km",
        potencia: "525 HP",
        precio: "$490,000",
        imagen: "../img/porshe/gt3911.jpg",
        descripcion: "El Porsche 911 GT3 RS está diseñado para un rendimiento sin concesiones. Con aerodinámica activa y un motor de aspiración natural, es la máxima expresión de ingeniería de carreras.",
        link: "detalleporshe.html"
    },
    {
        id: 2,
        nombre: "BMW M4 Competition",
        categoria: "Coupé",
        etiqueta: "Seminuevo",
        etiquetaClases: "bg-gray-800 dark:bg-zinc-800 border border-gray-700 dark:border-zinc-700 text-white",
        anio: 2023,
        kilometraje: "12,500 km",
        potencia: "510 HP",
        precio: "$89,900",
        imagen: "../img/bmw/m4.jpg",
        descripcion: "Un coupé deportivo de alto rendimiento que combina dinamismo extremo con practicidad para el uso diario.",
        link: "detallebmw.html"
    },
    {
        id: 3,
        nombre: "Audi RS6 Avant",
        categoria: "Deportivo",
        etiqueta: "Nuevo",
        etiquetaClases: "bg-red-600 text-white",
        anio: 2024,
        kilometraje: "0 km",
        potencia: "600 HP",
        precio: "$135,000",
        imagen: "../img/audi/audirs.jpg",
        descripcion: "La combinación perfecta entre la versatilidad de un station wagon y el desempeño descomunal de un superdeportivo V8 twin-turbo.",
        link: "detalleaudi.html"
    },
    {
        id: 4,
        nombre: "Ferrari F8 Tributo",
        categoria: "Superdeportivo",
        etiqueta: "Exclusivo",
        etiquetaClases: "bg-red-600 text-white",
        anio: 2022,
        kilometraje: "5,100 km",
        potencia: "720 HP",
        precio: "$280,000",
        imagen: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80",
        descripcion: "Homenaje al motor V8 central-trasero más potente de Ferrari. Respuesta inmediata, aerodinámica avanzada y un sonido inigualable.",
        link: "#"
    },
    {
        id: 5,
        nombre: "Mercedes-AMG GT R",
        categoria: "Coupé",
        etiqueta: "Seminuevo",
        etiquetaClases: "bg-gray-800 dark:bg-zinc-800 border border-gray-700 dark:border-zinc-700 text-white",
        anio: 2021,
        kilometraje: "18,000 km",
        potencia: "585 HP",
        precio: "$165,000",
        imagen: "https://images.unsplash.com/photo-1520050206274-a1ae44613e6d?auto=format&fit=crop&w=800&q=80",
        descripcion: "Desarrollado en el 'Infierno Verde' de Nürburgring. Ligero, potente y afinado para ofrecer la máxima precisión en pista.",
        link: "#"
    },
    {
        id: 6,
        nombre: "Porsche Taycan Turbo S",
        categoria: "Sedán Eléctrico",
        etiqueta: "Eléctrico",
        etiquetaClases: "bg-red-600 text-white",
        anio: 2024,
        kilometraje: "0 km",
        potencia: "761 HP",
        precio: "$198,000",
        imagen: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
        descripcion: "Aceleración instantánea y tecnología eléctrica de 800V combinada con el ADN inconfundible de conducción Porsche.",
        link: "#"
    }
];

// Obtener inventario actual desde LocalStorage o usar el inicial
function obtenerInventario() {
    const inventarioGuardado = localStorage.getItem("catalogoJDM");
    return inventarioGuardado ? JSON.parse(inventarioGuardado) : catalogoInicial;
}

// Renderizar tarjetas en la grilla del catálogo
function renderizarCatalogo(lista) {
    const contenedor = document.getElementById("contenedor-catalogo");
    if (!contenedor) return;

    if (lista.length === 0) {
        contenedor.innerHTML = `
            <div class="col-span-full text-center py-12">
                <p class="text-xl font-bold text-gray-500 dark:text-zinc-400">No se encontraron vehículos que coincidan con los criterios de búsqueda.</p>
            </div>
        `;
        return;
    }

    contenedor.innerHTML = lista.map(auto => `
        <div class="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-zinc-800 hover:border-red-600/50 transition-all duration-300 group hover:-translate-y-1 shadow-xl flex flex-col justify-between">
            <div>
                <div class="relative h-56 overflow-hidden bg-gray-100 dark:bg-zinc-800 cursor-pointer" onclick="abrirModal(${auto.id})">
                    <img src="${auto.imagen}" alt="${auto.nombre}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                    <span class="absolute top-4 left-4 ${auto.etiquetaClases || 'bg-red-600 text-white'} text-xs font-black uppercase px-3 py-1 rounded-full z-10">
                        ${auto.etiqueta || 'Disponible'}
                    </span>
                </div>
                <div class="p-6">
                    <p class="text-xs font-bold text-red-600 uppercase tracking-widest mb-1">${auto.categoria}</p>
                    <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">${auto.nombre}</h3>

                    <div class="grid grid-cols-3 gap-2 py-4 border-y border-gray-200 dark:border-zinc-800 text-xs text-gray-600 dark:text-zinc-400 my-4">
                        <div class="flex items-center space-x-1">
                            <i data-lucide="calendar" class="w-4 h-4 text-red-600"></i>
                            <span>${auto.anio}</span>
                        </div>
                        <div class="flex items-center space-x-1">
                            <i data-lucide="gauge" class="w-4 h-4 text-red-600"></i>
                            <span>${auto.kilometraje}</span>
                        </div>
                        <div class="flex items-center space-x-1">
                            <i data-lucide="zap" class="w-4 h-4 text-red-600"></i>
                            <span>${auto.potencia}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="p-6 pt-0 flex items-center justify-between">
                <div>
                    <span class="block text-xs text-gray-500 dark:text-zinc-500 uppercase">Precio</span>
                    <span class="text-2xl font-black text-gray-900 dark:text-white">${auto.precio}</span>
                </div>
                <button onclick="abrirModal(${auto.id})" class="bg-gray-900 dark:bg-white hover:bg-red-600 dark:hover:bg-red-600 text-white dark:text-black hover:text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors duration-300">
                    Ver más
                </button>
            </div>
        </div>
    `).join("");

    if (window.lucide) {
        lucide.createIcons();
    }
}

// Aplicar filtros según los campos
function aplicarFiltros() {
    const textoBusqueda = document.getElementById("input-buscar").value.toLowerCase().trim();
    const marcaSeleccionada = document.getElementById("select-marca").value.toLowerCase();
    const categoriaSeleccionada = document.getElementById("select-categoria").value.toLowerCase();

    const inventario = obtenerInventario();

    const resultado = inventario.filter(auto => {
        const coincideTexto = auto.nombre.toLowerCase().includes(textoBusqueda) || 
                              auto.categoria.toLowerCase().includes(textoBusqueda);
        
        const coincideMarca = marcaSeleccionada === "" || auto.nombre.toLowerCase().includes(marcaSeleccionada);
        
        const coincideCategoria = categoriaSeleccionada === "" || auto.categoria.toLowerCase().includes(categoriaSeleccionada);

        return coincideTexto && coincideMarca && coincideCategoria;
    });

    renderizarCatalogo(resultado);
}

// Crear la Estructura de la Modal Dinámicamente
function crearEstructuraModal() {
    if (document.getElementById("modal-detalle")) return;

    const modalHTML = `
        <div id="modal-detalle" class="fixed inset-0 z-50 hidden flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-opacity duration-300">
            <div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl max-w-2xl w-full p-6 relative overflow-hidden shadow-2xl">
                <button onclick="cerrarModal()" class="absolute top-4 right-4 text-gray-500 hover:text-red-600 bg-gray-100 dark:bg-zinc-800 p-2 rounded-full transition z-10">
                    <i data-lucide="x" class="w-5 h-5"></i>
                </button>
                <div id="modal-contenido"></div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML("beforeend", modalHTML);
}

// Abrir Modal
function abrirModal(id) {
    const inventario = obtenerInventario();
    const auto = inventario.find(item => item.id === id);

    if (!auto) return;

    const tienePaginaPropia = auto.link && auto.link !== "#";
    const destinoConsultar = tienePaginaPropia ? auto.link : "contacto.html";
    const textoBotonConsultar = tienePaginaPropia ? "Ver detalle completo" : "Consultar";

    const modal = document.getElementById("modal-detalle");
    const contenedorContenido = document.getElementById("modal-contenido");

    contenedorContenido.innerHTML = `
        <button onclick="cerrarModal()" class="inline-flex items-center space-x-2 text-xs font-bold text-gray-500 hover:text-red-600 mb-4 transition uppercase tracking-wider">
            <i data-lucide="arrow-left" class="w-4 h-4"></i>
            <span>Volver al Catálogo</span>
        </button>

        <div class="relative h-64 rounded-xl overflow-hidden mb-6">
            <img src="${auto.imagen}" alt="${auto.nombre}" class="w-full h-full object-cover">
            <span class="absolute top-4 left-4 ${auto.etiquetaClases || 'bg-red-600 text-white'} text-xs font-black uppercase px-3 py-1 rounded-full">
                ${auto.etiqueta || 'Disponible'}
            </span>
        </div>
        <p class="text-xs font-bold text-red-600 uppercase tracking-widest mb-1">${auto.categoria}</p>
        <h2 class="text-3xl font-black text-gray-900 dark:text-white mb-3">${auto.nombre}</h2>
        <p class="text-gray-600 dark:text-zinc-300 text-sm mb-6 leading-relaxed">
            ${auto.descripcion || "Vehículo exclusivo con garantía total, inspección técnica realizada y listo para entrega inmediata."}
        </p>

        <div class="grid grid-cols-3 gap-3 p-3 bg-gray-100 dark:bg-zinc-800/50 rounded-xl text-center text-xs text-gray-700 dark:text-zinc-300 mb-6">
            <div>
                <span class="block text-gray-400 text-[10px] uppercase">Año</span>
                <span class="font-bold text-sm">${auto.anio}</span>
            </div>
            <div>
                <span class="block text-gray-400 text-[10px] uppercase">Kilometraje</span>
                <span class="font-bold text-sm">${auto.kilometraje}</span>
            </div>
            <div>
                <span class="block text-gray-400 text-[10px] uppercase">Potencia</span>
                <span class="font-bold text-sm">${auto.potencia}</span>
            </div>
        </div>

        <div class="flex items-center justify-between border-t border-gray-200 dark:border-zinc-800 pt-4 gap-4">
            <div>
                <span class="block text-xs text-gray-500 uppercase">Precio final</span>
                <span class="text-2xl font-black text-gray-900 dark:text-white">${auto.precio}</span>
            </div>

            <div class="flex items-center space-x-3">
                <button onclick="cerrarModal()" class="bg-gray-200 dark:bg-zinc-800 hover:bg-gray-300 dark:hover:bg-zinc-700 text-gray-800 dark:text-white px-4 py-2.5 rounded-xl font-bold text-sm transition">
                    Volver
                </button>
                <a href="${destinoConsultar}" class="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition">
                    ${textoBotonConsultar}
                </a>
            </div>
        </div>
    `;

    modal.classList.remove("hidden");
    if (window.lucide) lucide.createIcons();
}

// Cerrar Modal
function cerrarModal() {
    const modal = document.getElementById("modal-detalle");
    if (modal) modal.classList.add("hidden");
}

// Inicialización cuando carga el DOM
document.addEventListener("DOMContentLoaded", () => {
    crearEstructuraModal();
    renderizarCatalogo(obtenerInventario());

    // Eventos de Búsqueda y Filtrado
    const formFiltros = document.getElementById("form-filtros");
    const inputBuscar = document.getElementById("input-buscar");
    const selectMarca = document.getElementById("select-marca");
    const selectCategoria = document.getElementById("select-categoria");

    if (formFiltros) {
        formFiltros.addEventListener("submit", (e) => {
            e.preventDefault();
            aplicarFiltros();
        });
    }

    if (inputBuscar) inputBuscar.addEventListener("input", aplicarFiltros);
    if (selectMarca) selectMarca.addEventListener("change", aplicarFiltros);
    if (selectCategoria) selectCategoria.addEventListener("change", aplicarFiltros);
});