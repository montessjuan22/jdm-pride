document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const navbar = document.querySelector('.navbar');

    function aplicarTema(tema) {
        if (tema === 'light') {
            // Fondo claro en el body
            body.classList.remove('bg-black', 'text-white');
            body.classList.add('bg-light', 'text-dark');
            
            // Navbar en modo claro
            if (navbar) {
                navbar.classList.remove('bg-black', 'navbar-dark');
                navbar.classList.add('bg-light', 'navbar-light', 'border-bottom');
            }
        } else {
            // Fondo oscuro en el body
            body.classList.remove('bg-light', 'text-dark');
            body.classList.add('bg-black', 'text-white');
            
            // Navbar en modo oscuro
            if (navbar) {
                navbar.classList.remove('bg-light', 'navbar-light');
                navbar.classList.add('bg-black', 'navbar-dark');
            }
        }
    }

    // 1. Leer el tema guardado
    const currentTheme = localStorage.getItem('theme') || 'dark';
    aplicarTema(currentTheme);

    // 2. Alternar al presionar el botón
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            // Verificamos si el body tiene actualmente la clase de modo oscuro (bg-black)
            const isDark = body.classList.contains('bg-black');
            const nuevoTema = isDark ? 'light' : 'dark';
            
            aplicarTema(nuevoTema);
            localStorage.setItem('theme', nuevoTema);
        });
    }
});