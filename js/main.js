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

