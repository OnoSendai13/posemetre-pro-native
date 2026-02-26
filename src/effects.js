// ============================================
// EFFECTS — Modern UI enhancements
// Scroll animations, tab transitions, modal gestures,
// micro-interactions, compact header
// ============================================

// ============================================
// 1. SCROLL-TRIGGERED ANIMATIONS (IntersectionObserver)
// ============================================

let scrollObserver = null;

/**
 * Initializes IntersectionObserver for scroll-triggered animations.
 * Adds .animate-on-scroll class to animatable elements and observes them.
 */
export function initScrollAnimations() {
    if (!('IntersectionObserver' in window)) return;

    scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    applyScrollAnimations();
}

/**
 * Finds animatable elements and sets them up for observation.
 * Should be called after tab switch to catch new visible content.
 */
export function applyScrollAnimations() {
    if (!scrollObserver) return;

    const selectors = [
        '.input-group',
        '.input-row',
        '.compensation-section',
        '.results-box',
        '.hss-section',
        '.info-box',
        '.info-text'
    ];

    const activeTab = document.querySelector('.tab-content.active');
    if (!activeTab) return;

    selectors.forEach(selector => {
        const elements = activeTab.querySelectorAll(selector);
        elements.forEach((el, i) => {
            if (!el.classList.contains('animate-on-scroll')) {
                el.classList.add('animate-on-scroll');
                // Apply stagger class (capped at 5)
                const stagger = Math.min(i + 1, 5);
                el.classList.add(`stagger-${stagger}`);
                scrollObserver.observe(el);
            }
        });
    });
}

// ============================================
// 2. SMOOTH TAB TRANSITIONS (directional slide)
// ============================================

const TAB_ORDER = ['posemetre', 'flashmetre', 'ratios', 'estimation'];
let currentTabIndex = 0;

/**
 * Enhanced tab switch with directional slide animation.
 * @param {string} tabName
 * @param {Function} originalSwitchTab - The original switchTab function from ui.js
 */
export function enhancedSwitchTab(tabName, originalSwitchTab) {
    const newIndex = TAB_ORDER.indexOf(tabName);
    if (newIndex === -1 || newIndex === currentTabIndex) return;

    const direction = newIndex > currentTabIndex ? 'right' : 'left';
    currentTabIndex = newIndex;

    // Update sliding indicator
    const tabNav = document.querySelector('.tab-nav');
    if (tabNav) {
        tabNav.setAttribute('data-active-index', String(newIndex));
    }

    // Perform the original tab switch
    originalSwitchTab(tabName);

    // Apply directional slide animation to new content
    const newContent = document.getElementById(`tab-${tabName}`);
    if (newContent) {
        // Remove old animation classes
        newContent.classList.remove('slide-in-right', 'slide-in-left');
        // Force reflow to restart animation
        void newContent.offsetWidth;
        // Add directional class
        newContent.classList.add(direction === 'right' ? 'slide-in-right' : 'slide-in-left');

        // Re-apply scroll animations to the new tab content
        resetScrollAnimationsForTab(newContent);
    }
}

/**
 * Reset scroll animations for elements in a newly activated tab
 */
function resetScrollAnimationsForTab(tabElement) {
    if (!scrollObserver) return;

    const animated = tabElement.querySelectorAll('.animate-on-scroll');
    animated.forEach(el => {
        el.classList.remove('is-visible');
        scrollObserver.observe(el);
    });

    // Also tag any un-tagged elements
    applyScrollAnimations();
}

// ============================================
// 3. POLISHED MODAL (animated open/close + swipe)
// ============================================

let modalTouchStartY = 0;
let modalTouchCurrentY = 0;
let isSwipingModal = false;

/**
 * Opens help modal with animation
 */
export function animatedOpenModal() {
    const modal = document.getElementById('help-modal');
    if (!modal) return;

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // Force reflow before adding visible class
    void modal.offsetWidth;
    modal.classList.remove('modal-hiding');
    modal.classList.add('modal-visible');
}

/**
 * Closes help modal with animation
 */
export function animatedCloseModal() {
    const modal = document.getElementById('help-modal');
    if (!modal) return;

    modal.classList.remove('modal-visible');
    modal.classList.add('modal-hiding');

    const onEnd = () => {
        modal.style.display = 'none';
        modal.classList.remove('modal-hiding');
        document.body.style.overflow = '';
        modal.removeEventListener('transitionend', onEnd);
    };

    modal.addEventListener('transitionend', onEnd, { once: true });

    // Fallback if transitionend doesn't fire
    setTimeout(() => {
        if (modal.classList.contains('modal-hiding')) {
            modal.style.display = 'none';
            modal.classList.remove('modal-hiding');
            document.body.style.overflow = '';
        }
    }, 500);
}

/**
 * Initializes swipe-to-dismiss gesture for the modal (mobile)
 */
export function initModalSwipe() {
    const modalContainer = document.querySelector('.modal-container');
    if (!modalContainer) return;

    modalContainer.addEventListener('touchstart', (e) => {
        const handle = modalContainer.querySelector('.modal-swipe-handle');
        const header = modalContainer.querySelector('.modal-header');
        // Only activate swipe from the handle or header area
        if (handle && handle.contains(e.target) || header && header.contains(e.target)) {
            modalTouchStartY = e.touches[0].clientY;
            isSwipingModal = true;
            modalContainer.style.transition = 'none';
        }
    }, { passive: true });

    modalContainer.addEventListener('touchmove', (e) => {
        if (!isSwipingModal) return;
        modalTouchCurrentY = e.touches[0].clientY;
        const diff = modalTouchCurrentY - modalTouchStartY;
        if (diff > 0) {
            modalContainer.style.transform = `translateY(${diff}px)`;
        }
    }, { passive: true });

    modalContainer.addEventListener('touchend', () => {
        if (!isSwipingModal) return;
        isSwipingModal = false;
        modalContainer.style.transition = '';
        const diff = modalTouchCurrentY - modalTouchStartY;

        if (diff > 100) {
            // Dismiss
            animatedCloseModal();
        }
        // Reset position
        modalContainer.style.transform = '';
    }, { passive: true });
}

// ============================================
// 4. MICRO-INTERACTIONS (ripple on comp buttons, result pop)
// ============================================

/**
 * Adds ripple effect to compensation buttons on click
 */
export function initRippleEffect() {
    document.querySelectorAll('.comp-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            const rect = btn.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            btn.appendChild(ripple);

            ripple.addEventListener('animationend', () => ripple.remove());
        });
    });
}

/**
 * Observes result containers and adds pop animation when new results appear.
 * Uses MutationObserver to detect innerHTML changes.
 */
export function initResultPopAnimation() {
    const resultContainers = document.querySelectorAll('.results-content');

    resultContainers.forEach(container => {
        const observer = new MutationObserver(() => {
            const items = container.querySelectorAll('.result-item');
            items.forEach((item, i) => {
                item.classList.remove('result-pop');
                void item.offsetWidth;
                item.style.animationDelay = `${i * 0.06}s`;
                item.classList.add('result-pop');
            });
        });

        observer.observe(container, { childList: true, subtree: true });
    });
}

// ============================================
// 5. SCROLL-LINKED COMPACT HEADER
// ============================================

let lastScrollY = 0;
let ticking = false;

/**
 * Initializes scroll listener for compact header behavior
 */
export function initCompactHeader() {
    const content = document.querySelector('.content');
    if (!content) return;

    // Listen to scroll on the main content area AND window
    window.addEventListener('scroll', onScroll, { passive: true });
    content.addEventListener('scroll', onScroll, { passive: true });
}

function onScroll() {
    if (!ticking) {
        requestAnimationFrame(() => {
            const scrollY = window.scrollY || document.documentElement.scrollTop;
            const header = document.querySelector('header');

            if (!header) {
                ticking = false;
                return;
            }

            if (scrollY > 40) {
                header.classList.add('header-compact');
            } else {
                header.classList.remove('header-compact');
            }

            lastScrollY = scrollY;
            ticking = false;
        });
        ticking = true;
    }
}

// ============================================
// MASTER INIT
// ============================================

/**
 * Initializes all UI effects. Call once after DOMContentLoaded.
 */
export function initAllEffects() {
    initScrollAnimations();
    initRippleEffect();
    initResultPopAnimation();
    initCompactHeader();
    initModalSwipe();
}
