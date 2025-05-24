// Theme Color

document.addEventListener('DOMContentLoaded', (event) => {
    const modeToggle = document.querySelector('.theme');
    const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);

        if (currentTheme === 'dark') {
            modeToggle.innerHTML = '<input class="input" checked="checked" type="checkbox"><i class="bi bi-sun"></i>';
        }
    }

    modeToggle.addEventListener('click', function () {
        let theme = 'light';
        if (document.documentElement.getAttribute('data-theme') === 'light') {
            theme = 'dark';
            modeToggle.innerHTML = '<input class="input" checked="checked" type="checkbox"><i class="bi bi-sun"></i>';
        } else {
            modeToggle.innerHTML = '<input class="input" checked="checked" type="checkbox"><i class="bi bi-moon-fill"></i>';
        }
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    });

    const upArrow = document.getElementById('up-arrow');
    const downArrow = document.getElementById('down-arrow');

    // Change to filled icon on hover
    upArrow.addEventListener('mouseover', function() {
        this.classList.remove('bi-caret-up');
        this.classList.add('bi-caret-up-fill');
    });

    // Revert to outline icon when not hovered
    upArrow.addEventListener('mouseout', function() {
        this.classList.remove('bi-caret-up-fill');
        this.classList.add('bi-caret-up');
    });

    // Change to filled icon on hover
    downArrow.addEventListener('mouseover', function() {
        this.classList.remove('bi-caret-down');
        this.classList.add('bi-caret-down-fill');
    });

    // Revert to outline icon when not hovered
    downArrow.addEventListener('mouseout', function() {
        this.classList.remove('bi-caret-down-fill');
        this.classList.add('bi-caret-down');
    });
    
    const gallery = document.querySelector(".project-gallery");
    const leftArrow = document.getElementById("left-arrow");
    const rightArrow = document.getElementById("right-arrow");
    const scrollAmount = gallery.clientWidth / 3;  // Scroll by one project card

    rightArrow.addEventListener("click", () => {
        gallery.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });

    leftArrow.addEventListener("click", () => {
        gallery.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });
});



// Home link
document.addEventListener('scroll', function() {
    var homeLink = document.getElementById('homeLink');
    if (window.scrollY > 100) { // Adjust this value based on when you want the link to appear
        homeLink.style.opacity = '1'; // Show the link

    } else {
        homeLink.style.opacity = '0'; // Hide the link
    }

    var scrollElement = document.querySelector('.scroll');
    if (window.scrollY > 50) { // Adjust the value based on your needs
      scrollElement.style.opacity = '0'; // Fade out the arrows when scrolling down
    } else {
      scrollElement.style.opacity = '1'; // Fade in the arrows when at the top
    }

    var homeLink = document.getElementById('homeLink');
    if (window.scrollY > 100) { // Adjust this value based on when you want the link to appear
        homeLink.style.opacity = '1'; // Show the link

    } else {
        homeLink.style.opacity = '0'; // Hide the link
    }
});




  
  