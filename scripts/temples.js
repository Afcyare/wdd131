const getYear = document.getElementById("currentyear");
const lastModified = document.getElementById("lastModified");

const year = new Date().getFullYear();
getYear.textContent = year;

lastModified.textContent = `Last modified: ${document.lastModified}`;

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');
    
    hamburger.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
        nav.classList.toggle('active');
        this.textContent = isExpanded ? '☰' : '✕';
    });
});
