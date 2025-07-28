class BurgerMenu {
    constructor() {
        this.burger = document.querySelector('.header__burger');
        this.mobileMenu = document.querySelector('.header__mobile-menu');
        this.body = document.body;
        this.isOpen = false;
        
        if (this.burger && this.mobileMenu) {
            this.init();
        }
    }
    
    init() {
        this.burger.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggle();
        });
        
        document.addEventListener('click', (e) => {
            const isClickInsideMenu = this.mobileMenu.contains(e.target);
            const isClickOnBurger = this.burger.contains(e.target);
            
            if (this.isOpen && !isClickInsideMenu && !isClickOnBurger) {
                this.close();
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });
        
        const mobileLinks = this.mobileMenu.querySelectorAll('.header__mobile-nav-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                setTimeout(() => this.close(), 100);
            });
        });
    }
    
    toggle() {
        this.isOpen = !this.isOpen;
        this.isOpen ? this.open() : this.close();
    }
    
    open() {
        this.burger.classList.add('active');
        this.mobileMenu.classList.add('active');
        this.body.style.overflow = 'hidden';
        this.burger.setAttribute('aria-expanded', 'true');
        this.burger.setAttribute('aria-label', 'Закрыть меню');
    }
    
    close() {
        this.burger.classList.remove('active');
        this.mobileMenu.classList.remove('active');
        this.body.style.overflow = '';
        this.burger.setAttribute('aria-expanded', 'false');
        this.burger.setAttribute('aria-label', 'Открыть меню');
        this.isOpen = false;
    }
}

const initBurgerMenu = () => {
    if (typeof window !== 'undefined' && 'addEventListener' in window) {
        window.burgerMenu = new BurgerMenu();
    }
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBurgerMenu);
} else {
    initBurgerMenu();
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = BurgerMenu;
} 