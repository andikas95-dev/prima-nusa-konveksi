document.addEventListener('DOMContentLoaded', () => {
    const WA_NUMBER = '6281234567890';
    const openWA = (msg) => window.open(`https://api.whatsapp.com/send?phone=${WA_NUMBER}&text=${encodeURIComponent(msg)}`, '_blank');

    /* 1. Header Scroll & Nav Active Highlight */
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => header?.classList.toggle('scrolled', window.scrollY > 40), { passive: true });

    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    const sections = document.querySelectorAll('section[id]');
    if ('IntersectionObserver' in window && sections.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const hash = `#${entry.target.id}`;
                    navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === hash));
                }
            });
        }, { rootMargin: '-20% 0px -65% 0px' });
        sections.forEach(s => observer.observe(s));
    }

    /* 1b. Scroll Motion Reveal Animations (Fallback Observer) */
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    if ('IntersectionObserver' in window && revealElements.length) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-active');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { rootMargin: '0px 0px -50px 0px', threshold: 0.1 });
        revealElements.forEach(el => revealObserver.observe(el));
    }

    /* 1c. Framer Motion (Motion for Web Engine) Integrations */
    if (window.Motion && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const { animate, inView, stagger } = window.Motion;
        const cinematicEase = [0.22, 1, 0.36, 1]; // Ultra-smooth deceleration curve

        // Hero Section Choreography (Gentle, Luxurious Entrance)
        animate('.hero-badge-wrap', { opacity: [0, 1], y: [-20, 0] }, { duration: 0.9, easing: cinematicEase });
        animate('.hero-title .title-outline', { opacity: [0, 1], y: [45, 0] }, { duration: 1.1, delay: 0.15, easing: cinematicEase });
        animate('.hero-title .title-highlight', { opacity: [0, 1], y: [45, 0] }, { duration: 1.1, delay: 0.3, easing: cinematicEase });
        animate('.hero-subtitle', { opacity: [0, 1], y: [25, 0] }, { duration: 0.9, delay: 0.45, easing: cinematicEase });
        animate('.pill-item', { opacity: [0, 1], scale: [0.92, 1] }, { delay: stagger(0.12, { start: 0.6 }), duration: 0.7, easing: cinematicEase });
        animate('.hero-buttons', { opacity: [0, 1], y: [25, 0] }, { duration: 0.9, delay: 0.85, easing: cinematicEase });
        animate('.stat-item', { opacity: [0, 1], y: [25, 0] }, { delay: stagger(0.15, { start: 1.0 }), duration: 0.7, easing: cinematicEase });

        // Scroll-Driven InView Stagger Choreography (Smoother & Slower)
        inView('.specs-grid', ({ target }) => {
            animate(target.querySelectorAll('.spec-card'), { opacity: [0, 1], y: [40, 0], scale: [0.96, 1] }, { delay: stagger(0.18), duration: 1.0, easing: cinematicEase });
        });

        inView('.portfolio-grid', ({ target }) => {
            animate(target.querySelectorAll('.portfolio-item'), { opacity: [0, 1], y: [40, 0] }, { delay: stagger(0.15), duration: 0.95, easing: cinematicEase });
        });

        inView('.roadmap-timeline', ({ target }) => {
            animate(target.querySelectorAll('.timeline-step'), { opacity: [0, 1], y: [45, 0] }, { delay: stagger(0.2), duration: 1.0, easing: cinematicEase });
        });

        inView('.size-chart-wrapper', ({ target }) => {
            animate(target, { opacity: [0, 1], y: [35, 0] }, { duration: 1.05, easing: cinematicEase });
        });

        inView('.testi-slider-wrapper', ({ target }) => {
            animate(target, { opacity: [0, 1], scale: [0.96, 1] }, { duration: 1.0, easing: cinematicEase });
        });

        inView('.quick-order-card', ({ target }) => {
            animate(target, { opacity: [0, 1], y: [40, 0], scale: [0.97, 1] }, { duration: 1.1, easing: cinematicEase });
        });
    }




    /* 2. Mobile Menu Toggle */
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav-overlay');
    mobileBtn?.addEventListener('click', () => {
        const open = mobileBtn.classList.toggle('open');
        mobileNav?.classList.toggle('open', open);
        document.body.style.overflow = open ? 'hidden' : '';
    });

    /* 3. Event Delegation: Smooth Scroll, Portfolio Filters, Size Tabs, Item CTAs */
    document.addEventListener('click', (e) => {
        // Anchor smooth scroll
        const anchor = e.target.closest('a[href^="#"]');
        if (anchor) {
            const href = anchor.getAttribute('href');
            if (href === '#') {
                e.preventDefault();
                return window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                mobileBtn?.classList.remove('open');
                mobileNav?.classList.remove('open');
                document.body.style.overflow = '';
                target.scrollIntoView({ behavior: 'smooth' });
            }
            return;
        }

        // Portfolio Filter Buttons
        const filterBtn = e.target.closest('.filter-btn');
        if (filterBtn) {
            const filterContainer = filterBtn.closest('#portfolio-filters');
            filterContainer?.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            filterBtn.classList.add('active');
            const cat = filterBtn.dataset.filter;
            document.querySelectorAll('.portfolio-item').forEach(item => {
                const show = cat === 'all' || item.dataset.category === cat;
                item.classList.toggle('hide', !show);
            });
            return;
        }

        // Size Chart Tabs
        const tabBtn = e.target.closest('#size-tabs .tab-btn');
        if (tabBtn) {
            const tabsContainer = tabBtn.closest('#size-tabs');
            tabsContainer?.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            tabBtn.classList.add('active');
            document.querySelectorAll('.size-content').forEach(c => {
                c.classList.toggle('active', c.id === `tab-${tabBtn.dataset.tab}`);
            });
            return;
        }

        // Portfolio Item WA Order Button
        const itemBtn = e.target.closest('.btn-order-item');
        if (itemBtn) {
            e.stopPropagation();
            const { product, category } = itemBtn.dataset;
            openWA(`Halo Prima Nusa Sport, saya tertarik dengan sampel *${product}* (Kategori: ${category}) dari website. Saya ingin berkonsultasi untuk kustomisasi desain tim.`);
        }
    });

    /* 4. Testimonial Slider */
    const slides = document.querySelectorAll('.testi-slide');
    const dots = document.querySelectorAll('.testi-dots .dot');
    let slideIdx = 0;
    let autoTimer;

    function gotoSlide(idx) {
        if (!slides.length) return;
        slideIdx = (idx + slides.length) % slides.length;
        slides.forEach((s, i) => s.classList.toggle('active', i === slideIdx));
        dots.forEach((d, i) => d.classList.toggle('active', i === slideIdx));
    }

    const resetTimer = () => {
        clearInterval(autoTimer);
        autoTimer = setInterval(() => gotoSlide(slideIdx + 1), 5500);
    };

    document.getElementById('next-testi')?.addEventListener('click', () => { gotoSlide(slideIdx + 1); resetTimer(); });
    document.getElementById('prev-testi')?.addEventListener('click', () => { gotoSlide(slideIdx - 1); resetTimer(); });
    dots.forEach((dot, i) => dot.addEventListener('click', () => { gotoSlide(i); resetTimer(); }));

    if (slides.length) resetTimer();

    /* 5. Quick Order Form Handler */
    document.getElementById('quick-order-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('order-name').value;
        const phone = document.getElementById('order-phone')?.value;
        const category = document.getElementById('order-category').value;
        const qty = document.getElementById('order-qty').value;

        let msg = `Halo Prima Nusa Sport, saya *${name}* ingin berkonsultasi & memesan jersey custom.\n\n*Rincian Pesanan:*\n- *Kategori:* ${category}\n- *Jumlah:* ${qty} pcs`;
        if (phone) msg += `\n- *Kontak WA:* ${phone}`;
        msg += `\n\nMohon info mengenai estimasi harga, pilihan bahan dryfit, dan alur pengerjaan mockup desain. Terima kasih!`;
        openWA(msg);
    });
});

