/* ===== 20/22 Takeaway — script.js ===== */
(() => {
  "use strict";

  const IMG = "assets/images/";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const isMobile = () => window.innerWidth <= 768;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Dữ liệu ---------- */
  const DRINKS = [
    { name: "Trà sữa Thái đỏ", price: "22k", desc: "Trà sữa Thái đỏ béo thơm, phủ kem cheese vàng óng.", img: "post-tra-sua-thai-do.png", thumb: "post-tra-sua-thai-do.png", headline: ["Trà sữa", "Thái", "Đỏ", "22K"] },
    { name: "Trà bưởi hoa đào", price: "20k", desc: "Trà bưởi hoa đào thanh mát, lá dứa thơm nhẹ.", img: "post-tra-buoi-hoa-dao.png", thumb: "post-tra-buoi-hoa-dao.png", headline: ["Trà bưởi", "Hoa", "Đào", "20K"] },
    { name: "Houjicha sữa hạt", price: "22k", desc: "Houjicha rang thơm, hoà cùng sữa hạt dịu ngọt.", img: "post-houjicha.png", thumb: "post-houjicha.png", headline: ["Houjicha", "Sữa", "Hạt", "22K"] },
    { name: "Matcha Latte", price: "20k", desc: "Matcha xanh đậm vị, lớp sữa tươi mịn màng.", img: "post-matcha-latte.png", thumb: "post-matcha-latte.png", headline: ["Matcha", "Latte", "Xanh", "20K"] },
  ];

  const DESIGNS = [
    // Banner standee dọc
    { f: "banner", file: "banner-standee-best-seller.png", t: "Standee Best Seller Collection", d: "Banner đứng — 4 món" },
    { f: "banner", file: "banner-standee-matcha-latte.png", t: "Standee Matcha Latte", d: "Banner đứng — 20k" },
    { f: "banner", file: "banner-standee-tra-sua-thai-do.png", t: "Standee Trà sữa Thái đỏ", d: "Banner đứng — 22k" },
    { f: "banner", file: "banner-standee-tra-buoi-hoa-dao.png", t: "Standee Trà bưởi hoa đào", d: "Banner đứng — 20k" },
    { f: "banner", file: "banner-standee-houjicha.png", t: "Standee Houjicha sữa hạt", d: "Banner đứng — 22k" },
    // Poster
    { f: "poster", file: "poster-best-seller-a4.png", t: "Poster Best Seller A4", d: "Poster ngang 4 món" },
    // Social 4:5
    { f: "social", file: "post-best-seller.png", t: "Post Best Seller Collection", d: "Bài đăng 4:5" },
    { f: "social", file: "post-tra-sua-thai-do.png", t: "Post Trà sữa Thái đỏ", d: "Bài đăng 4:5 — 22k" },
    { f: "social", file: "post-tra-buoi-hoa-dao.png", t: "Post Trà bưởi hoa đào", d: "Bài đăng 4:5 — 20k" },
    { f: "social", file: "post-houjicha.png", t: "Post Houjicha sữa hạt", d: "Bài đăng 4:5 — 22k" },
    { f: "social", file: "post-matcha-latte.png", t: "Post Matcha Latte", d: "Bài đăng 4:5 — 20k" },
    { f: "social", file: "post-xe-day.png", t: "Post Xe đẩy 20/22", d: "Có mặt tại CS5 LHU nhé!" },
    // Nhận diện + mockup
    { f: "brand", file: "brand-guideline.png", t: "Bảng màu & phông Baloo", d: "Brand guideline" },
    { f: "mockup", file: "mockup-standee-xe-day-1.jpg", t: "Mockup standee cạnh xe đẩy", d: "Ảnh mockup 01" },
    { f: "mockup", file: "mockup-standee-xe-day-2.jpg", t: "Mockup standee cạnh xe đẩy", d: "Ảnh mockup 02" },
  ];
  const FILTERS = [["all", "Tất cả"], ["banner", "Banner đứng"], ["poster", "Poster"], ["social", "Social 4:5"], ["brand", "Nhận diện"], ["mockup", "Mockup"]];

  /* ---------- Ảnh dự phòng khi chưa có file ---------- */
  const placeholder = (name) => {
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='1000' viewBox='0 0 800 1000'><rect width='800' height='1000' fill='#F3EEE1'/><rect x='24' y='24' width='752' height='952' rx='36' fill='none' stroke='#1E5E3A' stroke-width='4' stroke-dasharray='18 14'/><text x='400' y='470' text-anchor='middle' font-family='sans-serif' font-size='84' font-weight='800' fill='#1E5E3A'>20/22</text><text x='400' y='540' text-anchor='middle' font-family='sans-serif' font-size='30' fill='#5C3A21'>Thêm ảnh vào assets/images/</text><text x='400' y='590' text-anchor='middle' font-family='monospace' font-size='28' fill='#222'>${name}</text></svg>`;
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  };
  const guard = (img) => {
    img.addEventListener("error", () => {
      if (img.dataset.fallback) return;
      img.dataset.fallback = "1";
      const n = (img.getAttribute("src") || "").split("/").pop() || "image";
      img.src = placeholder(n);
    });
  };
  const withGuard = (root = document) => $$("img", root).forEach(guard);

  /* ---------- Lenis ---------- */
  let lenis = null;
  if (window.Lenis) {
    lenis = new Lenis({ smoothWheel: true });
    const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
  }
  const lockScroll = (on) => {
    const h = document.documentElement;
    if (on) { lenis && lenis.stop(); h.style.overflow = "hidden"; }
    else { lenis && lenis.start(); h.style.removeProperty("overflow"); }
  };
  window.scrollTo(0, 0);
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";

  /* ---------- Rem co giãn khi > 1920px ---------- */
  const fitRem = () => {
    const FONT_BASE = 16, BASE_W = 1920, COEF = 0.6666;
    const reduction = ((BASE_W - innerWidth) / BASE_W) * 100 * COEF;
    const size = FONT_BASE - (FONT_BASE * reduction) / 100;
    const html = document.documentElement;
    if (size > FONT_BASE) html.style.fontSize = size + "px";
    else html.style.removeProperty("font-size");
  };
  fitRem(); addEventListener("resize", fitRem);

  /* ---------- Tách chữ để reveal ---------- */
  const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
  $$(".split").forEach((el) => {
    const mode = el.dataset.split || "lines";
    const text = el.textContent.trim();
    const base = +(el.dataset.base || 0);
    const stagger = +(el.dataset.stagger || (mode === "words" ? 140 : 120));
    if (mode === "words") {
      el.setAttribute("aria-label", text);
      el.innerHTML = text.split(/\s+/).map((w, i) => `<span class="wd" aria-hidden="true"><span style="--d:${base + i * stagger}ms">${esc(w)}</span></span>`).join(" ");
    } else {
      el.setAttribute("aria-label", text.replace(/\|/g, " "));
      el.innerHTML = text.split("|").map((l, i) => `<span class="ln" aria-hidden="true"><span style="--d:${base + i * stagger}ms">${esc(l)}</span></span>`).join("");
    }
  });
  $$(".split-words").forEach((el) => {
    const base = +(el.dataset.delay || 0);
    el.setAttribute("aria-label", el.textContent.trim());
    el.innerHTML = el.textContent.trim().split(/\s+/).map((w, i) => `<span class="w" aria-hidden="true" style="--d:${base + i * 28}ms">${esc(w)}</span>`).join(" ");
  });
  $$(".rv").forEach((el) => el.style.setProperty("--d", (el.dataset.delay || 0) + "ms"));

  /* ---------- In-view (chạy 1 lần) ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("in");
      io.unobserve(e.target);
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });
  const watch = (root = document) => $$(".rv:not(.gated),.split:not(.gated),.split-words,.gw", root).forEach((el) => io.observe(el));

  /* ---------- Hero slider (món) ---------- */
  const miniCard = $("#mini-card"), heroDots = $("#hero-dots");
  let heroIdx = 0, heroTimer = null, heroReady = false;
  const renderMini = () => {
    const d = DRINKS[heroIdx];
    $("#mini-img").src = IMG + d.thumb;
    $("#mini-brand").textContent = d.name;
    $("#mini-title").textContent = d.price;
    $$("button", heroDots).forEach((b, i) => b.setAttribute("aria-current", i === heroIdx));
  };
  const setHero = (i) => {
    miniCard.classList.add("swap");
    setTimeout(() => { heroIdx = i; renderMini(); miniCard.classList.remove("swap"); }, 300);
  };
  DRINKS.forEach((_, i) => {
    const b = document.createElement("button");
    b.setAttribute("aria-label", "Món " + (i + 1));
    b.innerHTML = "<i></i>";
    b.onclick = () => { setHero(i); startHero(); };
    heroDots.appendChild(b);
  });
  const startHero = () => {
    clearInterval(heroTimer);
    if (!heroReady) return;
    heroTimer = setInterval(() => setHero((heroIdx + 1) % DRINKS.length), 3800);
  };
  renderMini();

  /* ---------- Carousel Best Seller ---------- */
  const bsImg = $("#bs-img"), bsDots = $("#bs-dots"), gws = $$(".gw", $("#bs-title"));
  let bsIdx = 0;
  DRINKS.forEach((_, i) => {
    const b = document.createElement("button");
    b.setAttribute("aria-label", "Món " + (i + 1));
    b.innerHTML = "<i></i>";
    b.onclick = () => setBs(i);
    bsDots.appendChild(b);
  });
  const fillGhost = (animate) => {
    const d = DRINKS[bsIdx];
    gws.forEach((w, i) => {
      w.classList.remove("in");
      w.style.setProperty("--d", i * 70 + "ms");
      $("i", w).textContent = d.headline[i];
    });
    if (animate) requestAnimationFrame(() => requestAnimationFrame(() => gws.forEach((w) => w.classList.add("in"))));
  };
  const setBs = (i, first) => {
    bsIdx = (i + DRINKS.length) % DRINKS.length;
    const d = DRINKS[bsIdx];
    const apply = () => {
      bsImg.src = IMG + d.img;
      bsImg.alt = d.name + " — " + d.price;
      $("#bs-name").textContent = d.name;
      $("#bs-desc").textContent = d.desc;
      $("#bs-price").textContent = d.price;
      bsImg.classList.remove("fade");
    };
    $$("button", bsDots).forEach((b, k) => b.setAttribute("aria-current", k === bsIdx));
    if (first) { apply(); fillGhost(false); return; }
    bsImg.classList.add("fade");
    setTimeout(apply, 220);
    fillGhost(true);
  };
  $("#bs-prev").onclick = () => setBs(bsIdx - 1);
  $("#bs-next").onclick = () => setBs(bsIdx + 1);
  setBs(0, true);

  /* ---------- Danh sách món ---------- */
  $("#rows").innerHTML = DRINKS.map((d, i) => `
    <li><a class="row rv" href="#" data-order="${i}" data-delay="${i * 90}">
      <span class="row__n">0${i + 1}</span>
      <img class="row__thumb" src="${IMG + d.thumb}" alt="${d.name}" loading="lazy" />
      <div class="row__t"><b>${d.name}</b><span>${d.desc}</span></div>
      <span class="row__price">${d.price}</span>
      <span class="row__go"><i class="arr"></i></span>
    </a></li>`).join("");

  /* ---------- Thư viện thiết kế ---------- */
  const gallery = $("#gallery"), filtersEl = $("#filters");
  gallery.innerHTML = DESIGNS.map((d, i) => `
    <figure class="g-item rv" data-f="${d.f}" data-i="${i}" data-delay="${(i % 4) * 90}" tabindex="0" role="button" aria-label="Xem ${d.t}">
      <img src="${IMG + d.file}" alt="${d.t}" loading="lazy" />
      <figcaption><b>${d.t}</b><span>${d.d}</span></figcaption>
    </figure>`).join("");
  filtersEl.innerHTML = FILTERS.map(([k, l], i) => `<button role="tab" data-k="${k}" aria-selected="${i === 0}">${l}</button>`).join("");
  filtersEl.addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    $$("button", filtersEl).forEach((x) => x.setAttribute("aria-selected", x === b));
    $$(".g-item", gallery).forEach((g) => g.classList.toggle("hide", b.dataset.k !== "all" && g.dataset.f !== b.dataset.k));
    lenis && lenis.resize && lenis.resize();
  });

  /* Mockup (ảnh trong section tối) */
  $$("img[data-src]").forEach((img) => { img.src = IMG + img.dataset.src; });

  withGuard();

  /* ---------- Lightbox ---------- */
  const lb = $("#lightbox"), lbImg = $("#lb-img"), lbCap = $("#lb-cap");
  guard(lbImg);
  let lbList = [], lbPos = 0;
  const showLb = () => {
    const d = DESIGNS[lbList[lbPos]];
    lbImg.dataset.fallback = "";
    lbImg.src = IMG + d.file; lbImg.alt = d.t;
    lbCap.textContent = d.t + " — " + d.d;
  };
  const openLb = (idx) => {
    lbList = $$(".g-item:not(.hide)", gallery).map((g) => +g.dataset.i);
    lbPos = Math.max(0, lbList.indexOf(idx));
    showLb(); lb.classList.add("open"); lb.setAttribute("aria-hidden", "false"); lockScroll(true);
  };
  const closeLb = () => { lb.classList.remove("open"); lb.setAttribute("aria-hidden", "true"); lockScroll(false); };
  gallery.addEventListener("click", (e) => { const g = e.target.closest(".g-item"); if (g) openLb(+g.dataset.i); });
  gallery.addEventListener("keydown", (e) => { if ((e.key === "Enter" || e.key === " ") && e.target.classList.contains("g-item")) { e.preventDefault(); openLb(+e.target.dataset.i); } });
  lb.addEventListener("click", (e) => {
    if (e.target.closest("[data-close-lightbox]") || e.target === lb) return closeLb();
    const n = e.target.closest("[data-lb]");
    if (n) { lbPos = (lbPos + +n.dataset.lb + lbList.length) % lbList.length; showLb(); }
  });
  // mockup ảnh cũng bấm xem lớn? (giữ đơn giản: không)

  /* ---------- Menu overlay ---------- */
  const menu = $("#menu");
  const openMenu = () => { menu.classList.add("open"); menu.setAttribute("aria-hidden", "false"); lockScroll(true); };
  const closeMenu = () => { menu.classList.remove("open"); menu.setAttribute("aria-hidden", "true"); lockScroll(false); };
  $("#burger").onclick = openMenu;
  $$("[data-close-menu]").forEach((el) => el.addEventListener("click", closeMenu));

  /* ---------- Modal đặt món (stub, không gọi mạng) ---------- */
  const modal = $("#modal"), form = $("#order-form"), success = $("#order-success"), submit = $("#order-submit");
  const openModal = (drinkIdx) => {
    if (typeof drinkIdx === "number") $("#drink-select").selectedIndex = drinkIdx;
    modal.classList.add("open"); modal.setAttribute("aria-hidden", "false"); lockScroll(true);
    setTimeout(() => form.elements.name.focus(), 120);
  };
  const closeModal = () => {
    modal.classList.remove("open"); modal.setAttribute("aria-hidden", "true"); lockScroll(false);
    setTimeout(() => { form.reset(); form.hidden = false; success.hidden = true; submit.disabled = false; submit.textContent = "Gửi đơn"; }, 350);
  };
  document.addEventListener("click", (e) => {
    const o = e.target.closest("[data-open-modal]");
    if (o) { e.preventDefault(); openModal(); return; }
    if (e.target.closest("[data-close-modal]")) closeModal();
    const r = e.target.closest("[data-order]");
    if (r) { e.preventDefault(); openModal(+r.dataset.order); }
  });
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    submit.disabled = true; submit.textContent = "Đang gửi…";
    const first = (form.elements.name.value.trim().split(/\s+/).pop()) || "bạn";
    setTimeout(() => {
      $("#success-text").textContent = `Cảm ơn ${first} — 20/22 sẽ liên hệ xác nhận sớm. Cần gấp? Gọi 0937 162 643 nhé!`;
      form.hidden = true; success.hidden = false;
    }, 700);
  });
  addEventListener("keydown", (e) => {
    if (e.key === "Escape") { closeMenu(); if (modal.classList.contains("open")) closeModal(); if (lb.classList.contains("open")) closeLb(); }
    if (lb.classList.contains("open")) {
      if (e.key === "ArrowRight") { lbPos = (lbPos + 1) % lbList.length; showLb(); }
      if (e.key === "ArrowLeft") { lbPos = (lbPos - 1 + lbList.length) % lbList.length; showLb(); }
    }
  });

  /* ---------- Cuộn mượt tới anchor ---------- */
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[data-link]"); if (!a) return;
    const id = a.getAttribute("href");
    if (!id || id[0] !== "#") return;
    e.preventDefault();
    const t = id === "#top" ? 0 : $(id);
    if (t === null) return;
    setTimeout(() => (lenis ? lenis.scrollTo(t, { offset: 0 }) : (t === 0 ? scrollTo({ top: 0, behavior: "smooth" }) : t.scrollIntoView({ behavior: "smooth" }))), menu.classList.contains("open") ? 60 : 0);
  });

  /* ---------- Parallax theo scroll ---------- */
  const pxY = $$("[data-parallax-y]").map((el) => ({ el, sec: el.closest("section"), a: el.dataset.parallaxY.split(",").map(Number) }));
  const pxX = gws.map((el) => ({ el, sec: el.closest("section"), a: el.dataset.px.split(",").map(Number) }));
  const prog = (sec) => {
    const r = sec.getBoundingClientRect(), vh = innerHeight;
    return Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
  };
  let ticking = false;
  const parallax = () => {
    ticking = false;
    pxY.forEach(({ el, sec, a }) => { const p = prog(sec); el.style.transform = `translate3d(0,${a[0] + (a[1] - a[0]) * p}%,0)`; });
    pxX.forEach(({ el, sec, a }) => { const p = prog(sec); el.style.transform = `translate3d(${a[0] + (a[1] - a[0]) * p}%,0,0)`; });
  };
  const onScroll = () => { if (!ticking && !reduced) { ticking = true; requestAnimationFrame(parallax); } };
  addEventListener("scroll", onScroll, { passive: true });
  lenis && lenis.on("scroll", onScroll);
  parallax();

  /* ---------- Loader ---------- */
  const MIN = reduced ? 200 : 1400, MAX = 2600, EXIT = reduced ? 1 : 850;
  const loader = $("#loader");
  lockScroll(true);
  let started = false;
  const begin = () => {
    if (started) return; started = true;
    setTimeout(() => {
      $$(".gated").forEach((el) => el.classList.add("in"));
      heroReady = true; startHero();
      lockScroll(false);
      loader.classList.add("out");
      watch();
      setTimeout(() => loader.remove(), EXIT + 50);
    }, MIN);
  };
  if (document.readyState === "complete") begin();
  else addEventListener("load", begin);
  setTimeout(begin, MAX);
})();
