document.addEventListener('DOMContentLoaded', (event) => {
    const modeToggle = document.querySelector('.mode');
    const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);

        if (currentTheme === 'dark') {
            modeToggle.innerHTML = '<i class="bi bi-moon-fill"></i>';
        }
    }

    modeToggle.addEventListener('click', function () {
        let theme = 'light';
        if (document.documentElement.getAttribute('data-theme') === 'light') {
            theme = 'dark';
            modeToggle.innerHTML = '<i class="bi bi-moon-fill"></i>';
        } else {
            modeToggle.innerHTML = '<i class="bi bi-sun"></i>';
        }
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    });
});
