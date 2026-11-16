// script.js

// Récupérer le bouton
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

// Afficher le bouton au bout d'un certain nombre de pixels de défilement
window.addEventListener('scroll', () => {
    if (window.scrollY > 20000) { // Modifier ce nombre selon vos besoins
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

// Ajouter un événement de clic pour faire défiler vers le haut
scrollToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// systeme de filtre pour la page réalisation 
document.addEventListener('DOMContentLoaded', () => {
    // 1. Sélection des éléments
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    // 2. Écouteur d'événement sur tous les boutons de filtre
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Récupère la catégorie à filtrer (ex: 'mobile', 'web', 'all')
            const filterValue = button.getAttribute('data-filter');

            // 3. Gestion de la classe 'active'
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // 4. Parcourt les cartes de projets pour afficher/masquer
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    // Si 'all' est sélectionné OU si la catégorie de la carte correspond au filtre
                    card.style.display = 'block'; // Affiche la carte
                    
                    // Optionnel : Ajoutez une animation de transition
                    setTimeout(() => {
                        card.style.opacity = '1';
                    }, 50);

                } else {
                    // Masque la carte non correspondante
                    card.style.display = 'none';
                    card.style.opacity = '0';
                }
            });
        });
    });
});