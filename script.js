import Lenis from "lenis";

const lenis = new Lenis({ smoothWheel: true });
function raf(t) {
    lenis.raf(t);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Preloader Animation
window.addEventListener('DOMContentLoaded', () => {
    let count = 0;
    const countEl = document.getElementById('count');
    const preloader = document.getElementById('preloader');
    
    if (countEl && preloader) {
        const interval = setInterval(() => {
            count += Math.floor(Math.random() * 8) + 5;
            if (count >= 100) {
                count = 100;
                clearInterval(interval);
                setTimeout(() => {
                    preloader.style.transform = 'translateY(-100%)';
                }, 300);
            }
            countEl.textContent = count;
        }, 40);
    }
});
