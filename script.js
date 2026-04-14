document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Menu Toggle Logic
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const menuSpans = menuToggle.querySelectorAll('span');

    const toggleMenu = () => {
        mobileMenu.classList.toggle('open');
        document.body.classList.toggle('overflow-hidden');
        
        // Animate Hamburger to X
        menuSpans[0].classList.toggle('rotate-45');
        menuSpans[0].classList.toggle('translate-y-1');
        menuSpans[1].classList.toggle('-rotate-45');
        menuSpans[1].classList.toggle('-translate-y-1');
    };

    menuToggle.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('open')) {
                toggleMenu();
            }
        });
    });

    // 2. Staggered Text Preparation
    const prepareStaggerText = () => {
        const elements = document.querySelectorAll('.stagger-text');
        elements.forEach(el => {
            const text = el.innerText;
            el.innerHTML = '';
            
            const words = text.split(' ');
            words.forEach((word, wordIndex) => {
                const wordSpan = document.createElement('span');
                wordSpan.className = 'inline-block whitespace-nowrap mr-[0.2em]';
                
                const chars = word.split('');
                chars.forEach((char, charIndex) => {
                    const charSpan = document.createElement('span');
                    charSpan.innerText = char;
                    // Faster delays for mobile
                    const delay = window.innerWidth < 768 ? 20 : 30;
                    charSpan.style.transitionDelay = `${(wordIndex * 5 + charIndex) * delay}ms`;
                    wordSpan.appendChild(charSpan);
                });
                
                el.appendChild(wordSpan);
            });
        });
    };

    prepareStaggerText();

    // 3. Intersection Observer for Reveals
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.reveal, .reveal-slide, .stagger-text').forEach(el => {
        revealObserver.observe(el);
    });

    // 4. Navbar Scroll Effect
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('bg-white/95', 'shadow-lg', 'h-16');
            nav.classList.remove('bg-white/70', 'h-20');
        } else {
            nav.classList.remove('bg-white/95', 'shadow-lg', 'h-16');
            nav.classList.add('bg-white/70', 'h-20');
        }
    });

    // 5. Parallax (Desktop Only for performance)
    if (window.innerWidth > 1024) {
        const heroImg = document.querySelector('#home img');
        document.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const xMove = (clientX / window.innerWidth - 0.5) * 20;
            const yMove = (clientY / window.innerHeight - 0.5) * 20;
            if (heroImg) {
                heroImg.style.transform = `translate(${xMove}px, ${yMove}px) scale(1.05)`;
            }
        });
    }

    // 6. Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offset = window.innerWidth < 1024 ? 64 : 80;
                window.scrollTo({
                    top: target.offsetTop - offset,
                    behavior: 'smooth'
                });
            }
        });
    });
});
