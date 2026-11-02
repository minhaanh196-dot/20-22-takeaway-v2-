import Lenis from "lenis";
const lenis = new Lenis({ smoothWheel: true });
function raf(t) { lenis.raf(t); requestAnimationFrame(raf); }
requestAnimationFrame(raf);
window.addEventListener('DOMContentLoaded', () => {
    let count = 0; const countEl = document.getElementById('count'); const preloader = document.getElementById('preloader');
    if (countEl && preloader) {
        const interval = setInterval(() => {
            count += Math.floor(Math.random() * 8) + 5;
            if (count >= 100) { count = 100; clearInterval(interval); setTimeout(() => { preloader.style.transform = 'translateY(-100%)'; }, 300); }
            countEl.textContent = count;
        }, 40);
    }
});
const modal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-img');
const modalCaption = document.getElementById('modal-caption');
const closeModal = document.getElementById('close-modal');
document.querySelectorAll('.zoomable').forEach(img => {
    img.addEventListener('click', () => {
        modal.style.display = 'flex'; modalImg.src = img.src; modalCaption.textContent = img.alt || "Chi tiết thiết kế";
    });
});
if (closeModal) { closeModal.addEventListener('click', () => { modal.style.display = 'none'; }); }
if (modal) { modal.addEventListener('click', (e) => { if (e.target === modal) { modal.style.display = 'none'; } }); }
