document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. NAVBAR SCROLL EFFECT & ACTIVE LINK HIGHLIGHTING
       ========================================================================== */
    const header = document.querySelector('.main-header');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    let isScrolled = false;
    function checkHeaderScroll() {
        const scrolled = window.scrollY > 50;
        if (scrolled !== isScrolled) {
            isScrolled = scrolled;
            if (isScrolled) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    }

    let ticking = false;
    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                checkHeaderScroll();
                ticking = false;
            });
            ticking = true;
        }
    }

    checkHeaderScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    // High-performance IntersectionObserver for nav active link highlighting
    if ('IntersectionObserver' in window && sections.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -65% 0px',
            threshold: 0
        };

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    const targetHash = `#${id}`;

                    navLinks.forEach(link => {
                        link.classList.toggle('active', link.getAttribute('href') === targetHash);
                    });
                    mobileNavLinks.forEach(link => {
                        link.classList.toggle('active', link.getAttribute('href') === targetHash);
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => sectionObserver.observe(section));
    }

    /* ==========================================================================
       2. MOBILE MENU DRAWER
       ========================================================================== */
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileNavOverlay = document.getElementById('mobile-nav-overlay');

    function toggleMobileMenu() {
        if (!mobileMenuBtn || !mobileNavOverlay) return;
        mobileMenuBtn.classList.toggle('open');
        mobileNavOverlay.classList.toggle('open');
        document.body.style.overflow = mobileNavOverlay.classList.contains('open') ? 'hidden' : '';
    }

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }

    /* ==========================================================================
       3. SMOOTH SCROLL ANCHOR NAVIGATION
       ========================================================================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetHref = this.getAttribute('href');
            if (!targetHref || targetHref === '#') {
                if (targetHref === '#') {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
                return;
            }

            const targetElement = document.querySelector(targetHref);
            if (targetElement) {
                e.preventDefault();

                if (mobileNavOverlay && mobileNavOverlay.classList.contains('open')) {
                    toggleMobileMenu();
                }

                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* ==========================================================================
       4. PORTFOLIO FILTER
       ========================================================================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and add to clicked
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filterValue === 'all' || filterValue === category) {
                    item.classList.remove('hide');
                } else {
                    item.classList.add('hide');
                }
            });
        });
    });

    /* ==========================================================================
       5. SIZE CHART TABS
       ========================================================================== */
    const tabButtons = document.querySelectorAll('.tab-btn');
    const sizeContents = document.querySelectorAll('.size-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const tabTarget = button.getAttribute('data-tab');
            
            sizeContents.forEach(content => {
                content.classList.remove('active');
                if (content.getAttribute('id') === `tab-${tabTarget}`) {
                    content.classList.add('active');
                }
            });
        });
    });

    /* ==========================================================================
       6. TESTIMONIAL SLIDER
       ========================================================================== */
    const slides = document.querySelectorAll('.testi-slide');
    const dots = document.querySelectorAll('.testi-dots .dot');
    const prevBtn = document.getElementById('prev-testi');
    const nextBtn = document.getElementById('next-testi');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        let index = currentSlide + 1;
        if (index >= slides.length) {
            index = 0;
        }
        showSlide(index);
    }

    function prevSlide() {
        let index = currentSlide - 1;
        if (index < 0) {
            index = slides.length - 1;
        }
        showSlide(index);
    }

    // Controls listeners
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoplay();
    });
    
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoplay();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideIndex = parseInt(e.target.getAttribute('data-slide'));
            showSlide(slideIndex);
            resetAutoplay();
        });
    });

    // Autoplay
    function startAutoplay() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function resetAutoplay() {
        clearInterval(slideInterval);
        startAutoplay();
    }

    startAutoplay();

    /* ==========================================================================
       7. WHATSAPP LINK GENERATOR
       ========================================================================== */
    const WHATSAPP_NUMBER = '6281234567890'; // Ganti dengan nomor WhatsApp Prima Nusa Sport

    // Quick Order Form
    const orderForm = document.getElementById('quick-order-form');
    if (orderForm) {
        orderForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('order-name').value;
            const phone = document.getElementById('order-phone') ? document.getElementById('order-phone').value : '';
            const category = document.getElementById('order-category').value;
            const qty = document.getElementById('order-qty').value;
            
            let message = `Halo Prima Nusa Sport, saya *${name}* ingin melakukan pemesanan jersey custom.\n\n*Detail Pesanan:*\n- *Kategori:* ${category}\n- *Jumlah:* ${qty} pcs`;
            if (phone) {
                message += `\n- *Kontak WA:* ${phone}`;
            }
            message += `\n\nSaya ingin berkonsultasi mengenai konsep desain dan jenis bahan kain. Terima kasih!`;
            
            const encodedMessage = encodeURIComponent(message);
            const waUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodedMessage}`;
            
            window.open(waUrl, '_blank');
        });
    }

    // individual Portfolio Item CTA click
    const itemOrderButtons = document.querySelectorAll('.btn-order-item');
    itemOrderButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent triggering any other event
            
            const productName = button.getAttribute('data-product');
            const categoryName = button.getAttribute('data-category');
            
            const message = `Halo Prima Nusa Sport, saya tertarik dengan desain *${productName}* (Kategori: ${categoryName}) yang saya lihat di website. Saya ingin berkonsultasi untuk kustomisasi desain ini untuk tim saya.`;
            
            const encodedMessage = encodeURIComponent(message);
            const waUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodedMessage}`;
            
            window.open(waUrl, '_blank');
        });
    });
});
