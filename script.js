import Lenis from "lenis";
const lenis = new Lenis({ smoothWheel: true });
function raf(t) { lenis.raf(t); requestAnimationFrame(raf); }
requestAnimationFrame(raf);

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
                setTimeout(() => { preloader.style.transform = 'translateY(-100%)'; }, 300); 
            }
            countEl.textContent = count;
        }, 40);
    }
});

// Gallery array containing all zoomable images across the web
const galleryImages = [
    { src: "assets/images/key-visual.png", caption: "Key Visual Tổng Thể" },
    { src: "assets/images/post-best-seller.png", caption: "Post Best Seller Collection" },
    { src: "assets/images/post-matcha-latte.png", caption: "Post Matcha Latte (20k)" },
    { src: "assets/images/post-houjicha.png", caption: "Post Houjicha Sữa Hạt (22k)" },
    { src: "assets/images/post-tra-buoi-hoa-dao.png", caption: "Post Trà Bưởi Hoa Đào (20k)" },
    { src: "assets/images/post-tra-sua-thai-do.png", caption: "Post Trà Sữa Thái Đỏ (22k)" },
    { src: "assets/images/brochure-a5.png", caption: "Brochure Menu A5" },
    { src: "assets/images/story-ads.png", caption: "Story Ads (9:16)" },
    { src: "assets/images/banner-standee-best-seller.png", caption: "Standee Collection" },
    { src: "assets/images/banner-standee-tra-sua-thai-do.png", caption: "Standee Trà Sữa Thái Đỏ" },
    { src: "assets/images/banner-standee-tra-buoi-hoa-dao.png", caption: "Standee Trà Bưởi Hoa Đào" },
    { src: "assets/images/banner-standee-houjicha.png", caption: "Standee Houjicha Sữa Hạt" },
    { src: "assets/images/banner-standee-matcha-latte.png", caption: "Standee Matcha Latte" },
    { src: "assets/images/poster-best-seller-a4.png", caption: "Poster A4 Best Seller" },
    { src: "assets/images/mockup-standee-xe-day-1.jpg", caption: "Mockup Standee Best Seller Collection - Không gian thực tế LHU" },
    { src: "assets/images/mockup-standee-xe-day-2.jpg", caption: "Mockup Tờ Rơi - Góc nhìn nhận diện chi tiết" }
];

let currentIndex = 0;
const modal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-img');
const modalCaption = document.getElementById('modal-caption');
const closeModal = document.getElementById('close-modal');
const prevBtn = document.getElementById('modal-prev');
const nextBtn = document.getElementById('modal-next');

function updateModal(index) {
    if (index < 0 || index >= galleryImages.length) return;
    currentIndex = index;
    modalImg.src = galleryImages[currentIndex].src;
    modalCaption.textContent = galleryImages[currentIndex].caption;

    if (currentIndex === 0) {
        prevBtn.classList.add('hidden');
    } else {
        prevBtn.classList.remove('hidden');
    }

    if (currentIndex === galleryImages.length - 1) {
        nextBtn.classList.add('hidden');
    } else {
        nextBtn.classList.remove('hidden');
    }
}

document.querySelectorAll('.zoomable').forEach(img => {
    img.addEventListener('click', (e) => {
        let idx = parseInt(img.getAttribute('data-index'));
        if (isNaN(idx)) {
            let found = galleryImages.findIndex(item => img.src.includes(item.src.split('/').pop()));
            idx = found !== -1 ? found : 0;
        }
        modal.style.display = 'flex';
        updateModal(idx);
    });
});

if (closeModal) {
    closeModal.addEventListener('click', () => { modal.style.display = 'none'; });
}

if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) { modal.style.display = 'none'; }
    });
}

if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (currentIndex > 0) {
            updateModal(currentIndex - 1);
        }
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (currentIndex < galleryImages.length - 1) {
            updateModal(currentIndex + 1);
        }
    });
}

document.addEventListener('keydown', (e) => {
    if (modal.style.display === 'flex') {
        if (e.key === 'ArrowLeft' && currentIndex > 0) {
            updateModal(currentIndex - 1);
        } else if (e.key === 'ArrowRight' && currentIndex < galleryImages.length - 1) {
            updateModal(currentIndex + 1);
        } else if (e.key === 'Escape') {
            modal.style.display = 'none';
        }
    }
});
