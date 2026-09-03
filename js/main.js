document.addEventListener('DOMContentLoaded', () => {
    const WA_NUMBER = '6289693530751';
    const openWA = (msg) => window.open(`https://api.whatsapp.com/send?phone=${WA_NUMBER}&text=${encodeURIComponent(msg)}`, '_blank');

    /* 1. Header Scroll & Nav Active Highlight */
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => header?.classList.toggle('scrolled', window.scrollY > 40), { passive: true });

    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link, .dropdown-item');
    const sections = document.querySelectorAll('section[id]');
    if ('IntersectionObserver' in window && sections.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const hash = `#${entry.target.id}`;
                    navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === hash));
                    
                    // Highlight parent dropdown link if a child dropdown-item is active
                    document.querySelectorAll('.nav-item-dropdown').forEach(dropdown => {
                        const hasActiveChild = !!dropdown.querySelector('.dropdown-item.active');
                        dropdown.querySelector('.nav-link.has-dropdown')?.classList.toggle('active', hasActiveChild);
                    });
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
            if (target) animate(target.querySelectorAll('.spec-card'), { opacity: [0, 1], y: [40, 0], scale: [0.96, 1] }, { delay: stagger(0.18), duration: 1.0, easing: cinematicEase });
        });

        inView('.portfolio-grid', ({ target }) => {
            if (target) animate(target.querySelectorAll('.portfolio-item'), { opacity: [0, 1], y: [40, 0] }, { delay: stagger(0.15), duration: 0.95, easing: cinematicEase });
        });

        inView('.collar-track', ({ target }) => {
            if (target) animate(target.querySelectorAll('.collar-card'), { opacity: [0, 1], y: [40, 0] }, { delay: stagger(0.12), duration: 0.95, easing: cinematicEase });
        });

        inView('.roadmap-timeline', ({ target }) => {
            if (target) animate(target.querySelectorAll('.timeline-step'), { opacity: [0, 1], y: [45, 0] }, { delay: stagger(0.2), duration: 1.0, easing: cinematicEase });
        });

        inView('.size-chart-wrapper', ({ target }) => {
            if (target) animate(target, { opacity: [0, 1], y: [35, 0] }, { duration: 1.05, easing: cinematicEase });
        });

        inView('.testi-slider-wrapper', ({ target }) => {
            if (target) animate(target, { opacity: [0, 1], scale: [0.96, 1] }, { duration: 1.0, easing: cinematicEase });
        });

        inView('.quick-order-card', ({ target }) => {
            if (target) animate(target, { opacity: [0, 1], y: [40, 0], scale: [0.97, 1] }, { duration: 1.1, easing: cinematicEase });
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
    /* 3. Event Delegation & Portfolio Lightbox Engine */
    const portfolioLightbox = document.getElementById('portfolio-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxStage = document.getElementById('lightbox-stage');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxCategory = document.getElementById('lightbox-category');
    const lightboxTag = document.getElementById('lightbox-tag');
    const lightboxFabric = document.getElementById('lightbox-fabric');
    const lightboxPrint = document.getElementById('lightbox-print');
    const lightboxLeadtime = document.getElementById('lightbox-leadtime');
    const lightboxCounter = document.getElementById('lightbox-counter');
    const lightboxThumbsContainer = document.getElementById('lightbox-thumbs-container');
    const lightboxOrderCta = document.getElementById('lightbox-order-cta');
    const lightboxPrevBtn = document.getElementById('lightbox-prev-btn');
    const lightboxNextBtn = document.getElementById('lightbox-next-btn');
    const lightboxCloseBtn = document.getElementById('lightbox-close-btn');
    const lightboxBackdrop = document.getElementById('lightbox-backdrop');

    let currentVisibleItems = [];
    let currentLightboxIdx = 0;
    let lastFocusedElement = null;
    let isPortfolioDragging = false;
    let updatePortfolioArrows = null;
    const portfolioTrack = document.getElementById('portfolio-grid');
    const btnViewSlider = document.getElementById('btn-view-slider');
    const btnViewGrid = document.getElementById('btn-view-grid');
    const portfolioControls = document.getElementById('portfolio-controls');

    function getVisibleItems() {
        return Array.from(document.querySelectorAll('.portfolio-item:not(.hide), .collar-card'));
    }

    function renderLightboxItem(index) {
        currentVisibleItems = getVisibleItems();
        if (!currentVisibleItems.length) return;

        currentLightboxIdx = (index + currentVisibleItems.length) % currentVisibleItems.length;
        const item = currentVisibleItems[currentLightboxIdx];
        const dataset = item.dataset;

        // Reset stage zoom
        lightboxStage?.classList.remove('zoomed');

        if (lightboxImg) lightboxImg.src = dataset.img || item.querySelector('img')?.src || '';
        if (lightboxTitle) lightboxTitle.textContent = dataset.title || 'Jersey Custom';
        if (lightboxCategory) lightboxCategory.textContent = dataset.categoryName || 'Sportswear';
        if (lightboxTag) lightboxTag.textContent = dataset.tag || 'Official';
        if (lightboxFabric) lightboxFabric.textContent = dataset.fabric || 'Dryfit Premium';
        if (lightboxPrint) lightboxPrint.textContent = dataset.print || 'Full Sublimation';
        if (lightboxLeadtime) lightboxLeadtime.textContent = dataset.leadtime || '7-10 Hari';
        if (lightboxCounter) lightboxCounter.textContent = `Foto ${currentLightboxIdx + 1} dari ${currentVisibleItems.length}`;

        // Render thumbnails
        if (lightboxThumbsContainer) {
            lightboxThumbsContainer.innerHTML = '';
            currentVisibleItems.forEach((vItem, idx) => {
                const thumb = document.createElement('div');
                thumb.className = `lightbox-thumb ${idx === currentLightboxIdx ? 'active' : ''}`;
                thumb.innerHTML = `<img src="${vItem.dataset.img || vItem.querySelector('img')?.src}" alt="Thumbnail ${idx + 1}">`;
                thumb.addEventListener('click', () => renderLightboxItem(idx));
                lightboxThumbsContainer.appendChild(thumb);
            });
        }
    }

    function openLightboxByElement(itemEl) {
        lastFocusedElement = document.activeElement;
        currentVisibleItems = getVisibleItems();
        const itemIdx = currentVisibleItems.indexOf(itemEl);
        renderLightboxItem(itemIdx >= 0 ? itemIdx : 0);

        portfolioLightbox?.classList.add('active');
        portfolioLightbox?.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
        lightboxCloseBtn?.focus();
    }

    function closeLightbox() {
        portfolioLightbox?.classList.remove('active');
        portfolioLightbox?.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
        lightboxStage?.classList.remove('zoomed');
        if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
            lastFocusedElement.focus();
        }
    }

    function navLightbox(direction) {
        renderLightboxItem(currentLightboxIdx + direction);
    }

    // Lightbox Controls
    lightboxCloseBtn?.addEventListener('click', closeLightbox);
    lightboxBackdrop?.addEventListener('click', closeLightbox);
    lightboxPrevBtn?.addEventListener('click', () => navLightbox(-1));
    lightboxNextBtn?.addEventListener('click', () => navLightbox(1));

    lightboxStage?.addEventListener('click', () => {
        lightboxStage.classList.toggle('zoomed');
    });

    lightboxOrderCta?.addEventListener('click', () => {
        const item = currentVisibleItems[currentLightboxIdx];
        if (!item) return;
        const { title, categoryName, fabric, print } = item.dataset;
        const msg = `Halo Prima Nusa Sport, saya ingin memesan *${title}* (${categoryName}) dari sampel portofolio website.\n\n*Spesifikasi Pilihan:*\n- *Kain:* ${fabric}\n- *Cetak:* ${print}\n\nMohon info prosedur pembuatan mockup & estimasi total. Terima kasih!`;
        openWA(msg);
    });

    // Keyboard Shortcuts & Focus Management
    document.addEventListener('keydown', (e) => {
        const isOpen = portfolioLightbox?.classList.contains('active');

        if (!isOpen) {
            if ((e.key === 'Enter' || e.key === ' ') && document.activeElement?.classList.contains('portfolio-item')) {
                e.preventDefault();
                openLightboxByElement(document.activeElement);
            }
            return;
        }

        if (e.key === 'Escape') {
            e.preventDefault();
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            navLightbox(-1);
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            navLightbox(1);
        }
    });

    // Global Document Click Delegation
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
            const isCarousel = portfolioTrack?.classList.contains('portfolio-carousel-track');

            document.querySelectorAll('#portfolio-grid .portfolio-item').forEach(item => {
                const matches = cat === 'all' || item.dataset.category === cat;
                item.classList.toggle('hide', !matches);
            });

            if (isCarousel) {
                portfolioTrack?.scrollTo({ left: 0, behavior: 'smooth' });
            }

            if (typeof updatePortfolioArrows === 'function') {
                setTimeout(updatePortfolioArrows, 120);
            }
            return;
        }

        // Portfolio Item WA Order Button (inside card)
        const itemOrderBtn = e.target.closest('.btn-order-item');
        if (itemOrderBtn) {
            e.stopPropagation();
            const { product, category } = itemOrderBtn.dataset;
            openWA(`Halo Prima Nusa Sport, saya tertarik dengan sampel *${product}* (Kategori: ${category}) dari website. Saya ingin berkonsultasi untuk kustomisasi desain tim.`);
            return;
        }

        // Portfolio / Collar Item Click Trigger (Opens Lightbox Preview)
        const itemCard = e.target.closest('.portfolio-item, .collar-card');
        if (itemCard) {
            if (isPortfolioDragging) return; // Prevent opening lightbox if user was dragging
            openLightboxByElement(itemCard);
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

    /* 4b. Collar Models Carousel Slider */
    const collarTrack = document.getElementById('collar-track');
    const collarPrev = document.getElementById('collar-prev');
    const collarNext = document.getElementById('collar-next');
    const collarCounterCurrent = document.getElementById('collar-current');
    const collarDots = document.querySelectorAll('.collar-dot');
    const collarCards = document.querySelectorAll('.collar-card');

    if (collarTrack && collarCards.length > 0) {
        function updateCollarActiveIndex() {
            const scrollPos = collarTrack.scrollLeft;
            const maxScrollLeft = collarTrack.scrollWidth - collarTrack.clientWidth;
            
            let activeIndex;
            if (maxScrollLeft > 0 && scrollPos >= maxScrollLeft - 15) {
                activeIndex = collarCards.length - 1;
            } else {
                const cardWidth = collarCards[0].offsetWidth + 20; // card width + gap
                activeIndex = Math.min(
                    collarCards.length - 1,
                    Math.max(0, Math.round(scrollPos / cardWidth))
                );
            }

            if (collarCounterCurrent) {
                collarCounterCurrent.textContent = String(activeIndex + 1).padStart(2, '0');
            }

            collarDots.forEach((dot, idx) => {
                dot.classList.toggle('active', idx === activeIndex);
            });
        }

        let isScrollTicking = false;
        collarTrack.addEventListener('scroll', () => {
            if (!isScrollTicking) {
                window.requestAnimationFrame(() => {
                    updateCollarActiveIndex();
                    isScrollTicking = false;
                });
                isScrollTicking = true;
            }
        });

        collarPrev?.addEventListener('click', () => {
            const cardWidth = collarCards[0].offsetWidth + 20;
            collarTrack.scrollBy({ left: -cardWidth, behavior: 'smooth' });
        });

        collarNext?.addEventListener('click', () => {
            const cardWidth = collarCards[0].offsetWidth + 20;
            collarTrack.scrollBy({ left: cardWidth, behavior: 'smooth' });
        });

        collarDots.forEach((dot, idx) => {
            dot.addEventListener('click', () => {
                const targetCard = collarCards[idx];
                if (targetCard) {
                    const targetLeft = targetCard.offsetLeft - collarTrack.offsetLeft;
                    collarTrack.scrollTo({ left: targetLeft, behavior: 'smooth' });
                }
            });
        });
    }

    /* 4c. Portfolio Jersey Custom Carousel Slider */
    const portfolioPrev = document.getElementById('portfolio-prev');
    const portfolioNext = document.getElementById('portfolio-next');
    if (portfolioTrack) {
        updatePortfolioArrows = function() {
            if (!portfolioTrack || !portfolioTrack.classList.contains('portfolio-carousel-track')) return;

            const scrollPos = portfolioTrack.scrollLeft;
            const maxScrollLeft = portfolioTrack.scrollWidth - portfolioTrack.clientWidth;

            if (portfolioPrev) {
                portfolioPrev.disabled = scrollPos <= 10;
            }
            if (portfolioNext) {
                portfolioNext.disabled = scrollPos >= maxScrollLeft - 10;
            }
        };

        let isPortfolioScrollTicking = false;
        portfolioTrack.addEventListener('scroll', () => {
            if (!isPortfolioScrollTicking) {
                window.requestAnimationFrame(() => {
                    updatePortfolioArrows();
                    isPortfolioScrollTicking = false;
                });
                isPortfolioScrollTicking = true;
            }
        }, { passive: true });

        portfolioPrev?.addEventListener('click', () => {
            const firstCard = portfolioTrack.querySelector('.portfolio-item:not(.hide)');
            if (!firstCard) return;
            const cardWidth = firstCard.offsetWidth + 24;
            portfolioTrack.scrollBy({ left: -cardWidth, behavior: 'smooth' });
        });

        portfolioNext?.addEventListener('click', () => {
            const firstCard = portfolioTrack.querySelector('.portfolio-item:not(.hide)');
            if (!firstCard) return;
            const cardWidth = firstCard.offsetWidth + 24;
            portfolioTrack.scrollBy({ left: cardWidth, behavior: 'smooth' });
        });

        // Mouse Drag-to-Scroll support on desktop
        let isPortfolioDown = false;
        let portfolioStartX = 0;
        let portfolioScrollStart = 0;

        portfolioTrack.addEventListener('mousedown', (e) => {
            if (!portfolioTrack.classList.contains('portfolio-carousel-track')) return;
            if (e.target.closest('button, a')) return;
            isPortfolioDown = true;
            isPortfolioDragging = false;
            portfolioStartX = e.pageX - portfolioTrack.offsetLeft;
            portfolioScrollStart = portfolioTrack.scrollLeft;
        });

        window.addEventListener('mouseup', () => {
            if (!isPortfolioDown) return;
            isPortfolioDown = false;
            portfolioTrack.classList.remove('is-dragging');
            setTimeout(() => {
                isPortfolioDragging = false;
            }, 60);
        });

        portfolioTrack.addEventListener('mousemove', (e) => {
            if (!isPortfolioDown || !portfolioTrack.classList.contains('portfolio-carousel-track')) return;
            const x = e.pageX - portfolioTrack.offsetLeft;
            const walk = x - portfolioStartX;
            if (Math.abs(walk) > 6) {
                isPortfolioDragging = true;
                portfolioTrack.classList.add('is-dragging');
                portfolioTrack.scrollLeft = portfolioScrollStart - walk;
            }
        });

        // View Mode Switcher
        btnViewSlider?.addEventListener('click', () => {
            btnViewSlider.classList.add('active');
            btnViewGrid?.classList.remove('active');
            portfolioTrack.classList.remove('is-grid-view');
            portfolioTrack.classList.add('portfolio-carousel-track');
            if (portfolioControls) portfolioControls.style.display = 'inline-flex';

            portfolioTrack.scrollTo({ left: 0, behavior: 'smooth' });
            setTimeout(updatePortfolioArrows, 100);
        });

        btnViewGrid?.addEventListener('click', () => {
            btnViewGrid.classList.add('active');
            btnViewSlider?.classList.remove('active');
            portfolioTrack.classList.remove('portfolio-carousel-track');
            portfolioTrack.classList.add('is-grid-view');
            if (portfolioControls) portfolioControls.style.display = 'none';
        });

        // Initialize arrow states
        updatePortfolioArrows();
    }

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

