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


  /* ---------- Presentation Mode: báo cáo học thuật 20/22 ---------- */
  const presentation = $("#presentation");
  const presentationStage = $("#presentation-stage");
  const presentationProgress = $("#presentation-progress");
  const presentationCounter = $("#presentation-counter");
  const presentationToc = $("#presentation-toc");
  const presentationTocPanel = $("#presentation-toc-panel");
  const presentationTitle = $("#presentation-current-title");
  let presentationIndex = 0;
  let presentationOpen = false;

  const PRESENTATION_SLIDES = [
    {
      section: "MỞ ĐẦU",
      title: "20/22 TAKEAWAY",
      subtitle: "BÁO CÁO PHÂN TÍCH VÀ THIẾT KẾ QUẢNG CÁO",
      lead: "Hệ thống sản phẩm quảng cáo cho bộ sưu tập đồ uống mới.",
      body: `<div class="pres-tags"><span>ĐỒ ÁN CUỐI KỲ</span><span>MATCHA • COFFEE • MILKTEA</span><span>CS5 LHU</span></div><p class="pres-note">Trọng tâm trình bày: định hướng thương hiệu, Key Visual, bộ sản phẩm quảng cáo, POSM và hành trình khách hàng.</p>`,
      visual: [{file:"post-xe-day.png", alt:"Hình ảnh xe đẩy 20/22 Takeaway", caption:"Key Visual nhận diện 20/22"}],
      theme: "cover"
    },
    {
      section: "TỔNG QUAN",
      title: "Cấu trúc báo cáo",
      lead: "Phần định hướng tạo cơ sở cho quyết định thiết kế; phần triển khai quảng cáo là trọng tâm phân tích.",
      body: `<div class="pres-weight"><div><strong>20%</strong><b>A. Cơ sở lý thuyết & định hướng</b><p>Thương hiệu, khách hàng, định vị, màu sắc và phong cách thị giác.</p></div><div><strong>80%</strong><b>B. Sản phẩm quảng cáo & triển khai</b><p>Key Visual, bộ sưu tập, từng ấn phẩm, POSM, đa kênh và đánh giá.</p></div></div><p class="pres-note">Tỷ trọng 20/80 là định hướng phân bổ nội dung theo yêu cầu đề bài, không phải kết quả đo lường chiến dịch.</p>`,
      visual: [{file:"brand-guideline.png", alt:"Bảng màu và phông chữ 20/22", caption:"Hệ thống nhận diện thương hiệu"}]
    },
    {
      section: "A • CƠ SỞ LÝ THUYẾT · 20%",
      title: "01. Tổng quan thương hiệu & bối cảnh",
      lead: "20/22 Takeaway là mô hình đồ uống mang đi, tập trung vào Matcha, Coffee và Milktea.",
      body: `<ul><li>Mô hình xe đẩy giúp tiếp cận khách hàng trực tiếp, phục vụ nhanh và linh hoạt.</li><li>Bối cảnh triển khai: khu vực Cơ sở 5 LHU và cư dân lân cận.</li><li>Khách hàng thường có quỹ thời gian ngắn giữa tiết học hoặc giờ làm, cần thức uống tiện lợi, giá dễ tiếp cận.</li></ul><div class="pres-callout"><b>Hàm ý truyền thông</b><p>Hình ảnh cần giúp khách nhận biết món nhanh trên mạng xã hội và liên hệ được với điểm bán ngoài đời.</p></div>`,
      visual: [{file:"post-xe-day.png", alt:"Bài đăng nhận diện xe đẩy 20/22", caption:"Mô hình takeaway tại điểm bán"}]
    },
    {
      section: "A • CƠ SỞ LÝ THUYẾT · 20%",
      title: "02. Khách hàng mục tiêu & insight",
      lead: "Thiết kế cần giải quyết nhu cầu chọn nhanh, đọc nhanh và tìm đúng điểm bán.",
      body: `<div class="pres-audience"><article><b>Học sinh, sinh viên</b><p>Ưu tiên giá hợp lý, món dễ chọn, hình ảnh bắt mắt; thường xem nội dung trên điện thoại.</p><small>Thiết kế: giá 20k–22k rõ, tên món ngắn, hình ly nổi bật, CTA trực tiếp.</small></article><article><b>Cư dân lân cận</b><p>Muốn mua nhanh, tiện đường và dễ nhận ra điểm bán.</p><small>Thiết kế: duy trì hình ảnh xe đẩy và dù màu đặc trưng; thông tin dễ đọc từ xa.</small></article><article><b>Giảng viên, cán bộ nhà trường</b><p>Cần sự tiện lợi và thông tin sản phẩm rõ ràng.</p><small>Thiết kế: bố cục gọn, hình ảnh sạch, thông tin nhất quán.</small></article></div><blockquote>“Tôi muốn mua một món uống hợp gu, giá vừa túi tiền và có thể chọn nhanh mà không phải đọc quá nhiều thông tin.”</blockquote>`,
      visual: [{file:"post-best-seller.png", alt:"Bài đăng tổng hợp Best Seller", caption:"Hình ảnh giúp khách so sánh lựa chọn"}]
    },
    {
      section: "A • CƠ SỞ LÝ THUYẾT · 20%",
      title: "03. Định vị, thông điệp & mục tiêu",
      lead: "20/22 là điểm mua đồ uống trẻ trung, gần gũi và tiện lợi, với mức giá phù hợp học sinh, sinh viên.",
      body: `<div class="pres-brandline">20/22 TAKEAWAY<br><span>MATCHA • COFFEE • MILKTEA</span></div><div class="pres-three"><article><b>Nhận biết</b><p>Giúp khách nhớ tên 20/22 và nhận ra mô hình xe đẩy.</p></article><article><b>Cân nhắc</b><p>Làm rõ màu sắc, kết cấu và tên từng món để khách dễ chọn.</p></article><article><b>Chuyển đổi</b><p>Thúc đẩy ghé xe/mua món bằng giá rõ và CTA ngắn như “Ghé mua ngay”, “Chọn món yêu thích”.</p></article></div><p class="pres-note">Giá 20k–22k là lợi thế cần thể hiện rõ nhưng không được lấn át hình ảnh món uống.</p>`,
      visual: [{file:"post-tra-sua-thai-do.png", alt:"Social post Trà sữa Thái đỏ", caption:"Thông tin món – giá – CTA"}]
    },
    {
      section: "A • CƠ SỞ LÝ THUYẾT · 20%",
      title: "04. Hệ thống màu sắc & phong cách thị giác",
      lead: "Bảng màu giữ cảm giác trẻ trung, gần gũi; collage/sticker tạo cá tính, ảnh ly thật bảo đảm tính chân thực.",
      body: `<div class="pres-palette"><span style="background:#F3EEE1;color:#222">Kem tươi<br>#F3EEE1<br><small>Nền chính, khoảng thở</small></span><span style="background:#F7F4E9;color:#222">Màu be<br>#F7F4E9<br><small>Nền phụ, vùng thông tin</small></span><span style="background:#1E5E3A;color:white">Xanh Matcha<br>#1E5E3A<br><small>Màu nhận diện chủ đạo</small></span><span style="background:#4D8B55;color:white">Xanh lá trà<br>#4D8B55<br><small>Nhãn, mảng nhấn</small></span><span style="background:#222222;color:white">Đen nhám<br>#222222<br><small>Tương phản, nội dung</small></span><span style="background:#5C3A21;color:white">Nâu cà phê<br>#5C3A21<br><small>Chiều sâu, nhóm cà phê</small></span></div><ul><li>Baloo 2: thân thiện, rõ nét và phù hợp tinh thần thương hiệu.</li><li>Collage/sticker: tạo cá tính thủ công nhưng vẫn chỉn chu.</li><li>Ảnh ly thật: là bằng chứng trực quan; giữ khoảng trắng và tương phản chữ–nền.</li></ul>`,
      visual: [{file:"brand-guideline.png", alt:"Brand guideline 20/22", caption:"Bảng màu và phông Baloo"}]
    },
    {
      section: "B • SẢN PHẨM & TRIỂN KHAI · 80%",
      title: "05. Ý tưởng sáng tạo & Key Visual",
      lead: "Key Visual trung tâm là chiếc xe đẩy 20/22 Takeaway được cách điệu theo phong cách collage/sticker.",
      body: `<ul><li><b>Đúng mô hình:</b> xe đẩy thể hiện trải nghiệm takeaway nhanh gọn, linh hoạt và gần gũi.</li><li><b>Dễ ghi nhớ:</b> hình dáng xe kết hợp dù xanh–vàng tạo dấu hiệu nhận diện.</li><li><b>Có chất riêng:</b> xử lý sticker/cắt dán sinh động nhưng vẫn giữ đặc điểm xe thật.</li><li><b>Kết nối online–offline:</b> KV xuất hiện trên social, story và tài liệu tại điểm bán.</li></ul><div class="pres-callout"><b>Vai trò của KV</b><p>KV tạo nhận diện và bối cảnh; ảnh ly thật, tên món, giá và CTA mới trực tiếp thuyết phục mua hàng. Hai nhóm hình ảnh bổ trợ, không cạnh tranh thị giác.</p></div>`,
      visual: [{file:"post-xe-day.png", alt:"Key Visual xe đẩy 20/22", caption:"Xe đẩy là hình ảnh nhận diện trung tâm"}]
    },
    {
      section: "B • SẢN PHẨM & TRIỂN KHAI · 80%",
      title: "06. Best Seller Collection",
      lead: "Bốn món đại diện cho các lựa chọn nổi bật; tên món và giá phải thống nhất trên mọi ấn phẩm.",
      body: `<div class="pres-products"><article><b>Trà sữa Thái đỏ</b><strong>22k</strong><p>Sắc đỏ nổi bật; giữ màu trà rõ, bề mặt ly sạch và không thêm garnish không có thật.</p></article><article><b>Trà bưởi hoa đào</b><strong>20k</strong><p>Trà trái cây tươi, nhẹ; trang trí vừa đủ và không che ly.</p></article><article><b>Houjicha sữa hạt</b><strong>22k</strong><p>Đại diện nhóm trà rang và sữa hạt; nhấn sắc nâu/trà rang dịu.</p></article><article><b>Matcha Latte</b><strong>20k</strong><p>Đại diện sắc xanh Matcha; giữ màu chân thực và kết cấu đúng ly thật.</p></article></div><p class="pres-note">Nguyên tắc: không tự ý thay form ly, màu thức uống, nắp, nhãn hoặc thành phần trang trí.</p>`,
      visual: [{file:"post-best-seller.png", alt:"Bài đăng Best Seller Collection", caption:"Bộ sưu tập bốn món"}]
    },
    {
      section: "B • SẢN PHẨM & TRIỂN KHAI · 80%",
      title: "07. Cấu trúc thông tin sản phẩm",
      lead: "Mỗi ấn phẩm bán hàng cần có thứ bậc thị giác rõ để người xem nhận ra món và giá trong vài giây.",
      body: `<ol><li><b>Hình ảnh ly:</b> chiếm diện tích lớn nhất, là điểm nhìn đầu tiên.</li><li><b>Tên món:</b> đặt gần hình ly, dễ đọc, không bị chi tiết trang trí cắt ngang.</li><li><b>Giá:</b> thống nhất định dạng 20k hoặc 22k; không nhỏ hơn chữ trang trí.</li><li><b>CTA:</b> ngắn, có tính hành động; không dùng quá nhiều CTA.</li><li><b>Nhận diện:</b> tên 20/22 và dòng Matcha • Coffee • Milktea đủ rõ nhưng không cạnh tranh với sản phẩm.</li></ol><div class="pres-callout"><b>Tính trung thực sản phẩm</b><p>Ảnh ly thật là nguồn chính; đồ họa chỉ hỗ trợ, không tạo hiểu nhầm về thành phần hoặc kích cỡ.</p></div>`,
      visual: [{file:"post-matcha-latte.png", alt:"Social post Matcha Latte", caption:"Ví dụ phân cấp món – giá – nhận diện"}]
    },
    {
      section: "B • SẢN PHẨM & TRIỂN KHAI · 80%",
      title: "08. Social Post & Post Best Seller",
      lead: "Hai định dạng hỗ trợ hai nhiệm vụ: thúc đẩy mua một món cụ thể và giúp so sánh nhiều lựa chọn.",
      body: `<div class="pres-two-col"><article><b>Social Post đơn món</b><ul><li>Ly thật là chủ thể chính.</li><li>Thứ bậc: ly → tên món → giá → CTA → nhận diện phụ.</li><li>Nền tương phản; hạn chế họa tiết sau ly.</li><li>Các bài giữ chung cấu trúc, thay màu nhấn theo món.</li></ul><small>Lý do: người dùng lướt nhanh cần nhận ra món và giá gần như ngay lập tức.</small></article><article><b>Post Best Seller Collection</b><ul><li>Bốn ly theo lưới rõ ràng.</li><li>Mỗi ly đi cùng đúng tên và giá.</li><li>Đồng bộ nhãn giá, kiểu chữ và logo.</li><li>Phân biệt món bằng sắc độ/chi tiết phụ.</li></ul><small>Lý do: hỗ trợ so sánh và giảm thời gian ra quyết định.</small></article></div>`,
      visual: [{file:"post-tra-sua-thai-do.png", alt:"Post đơn món Trà sữa Thái đỏ", caption:"Social Post đơn món"},{file:"post-best-seller.png", alt:"Post tổng hợp Best Seller", caption:"Post tổng hợp bốn món"}]
    },
    {
      section: "B • SẢN PHẨM & TRIỂN KHAI · 80%",
      title: "09. Poster & Standee",
      lead: "Nhóm ấn phẩm tại điểm bán cần giúp khách nhận ra bộ sưu tập và từng món ngay cả khi quan sát từ xa.",
      body: `<div class="pres-two-col"><article><b>Poster A4 Best Seller</b><ul><li>Trình bày bốn lựa chọn trong một khung hình.</li><li>Giữ tên món và giá đi đúng với từng ly.</li><li>Đặt nhận diện 20/22 rõ nhưng không lấn át sản phẩm.</li></ul></article><article><b>Standee dọc</b><ul><li>Có bản tổng hợp Best Seller và standee riêng từng món.</li><li>Ưu tiên khả năng nhìn thấy từ xa và thứ bậc thông tin.</li><li>Giữ đồng nhất hình ảnh ly, tên món, giá và màu thương hiệu.</li></ul></article></div><p class="pres-note">Các file poster và standee được giới thiệu trong thư viện thiết kế của website; nội dung thuyết minh bám theo vai trò hệ thống ấn phẩm và tiêu chí nhất quán của báo cáo.</p>`,
      visual: [{file:"poster-best-seller-a4.png", alt:"Poster A4 Best Seller Collection", caption:"Poster A4 – Best Seller"},{file:"banner-standee-best-seller.png", alt:"Standee Best Seller Collection", caption:"Standee tổng hợp bốn món"}]
    },
    {
      section: "B • SẢN PHẨM & TRIỂN KHAI · 80%",
      title: "10. Story Ads – định dạng dọc 9:16",
      lead: "Story cần thu hút nhanh trên màn hình điện thoại và dẫn người xem đến hành động mua hoặc ghé xe.",
      body: `<ul><li>Đặt ly ở trung tâm hoặc vùng nhìn chính.</li><li>Tránh vùng giao diện ứng dụng ở mép trên và dưới.</li><li>Mở đầu bằng hình ảnh món nổi bật và một câu ngắn.</li><li>Tên món, giá và CTA phải tương phản cao, đủ lớn trên màn hình nhỏ.</li><li>Chỉ dùng chuyển động khi giúp nhấn sản phẩm; tránh hiệu ứng khiến người xem không kịp đọc.</li></ul><div class="pres-callout"><b>Nguyên tắc trình bày</b><p>Một điểm nhìn – một lợi ích chính – một hành động rõ ràng.</p></div>`,
      visual: [{file:"post-houjicha.png", alt:"Hình ảnh sản phẩm Houjicha sữa hạt", caption:"Ảnh sản phẩm minh họa; vùng an toàn Story cần được kiểm tra trên file 9:16 thực tế"}]
    },
    {
      section: "B • SẢN PHẨM & TRIỂN KHAI · 80%",
      title: "11. Brochure A5",
      lead: "Brochure là tài liệu giới thiệu menu tại điểm bán, hỗ trợ khách chọn món khi đứng trước xe.",
      body: `<ul><li>Dùng khổ A5 dọc hoặc ngang theo file thiết kế cuối.</li><li>Kiểm tra lề an toàn để chữ và giá không sát mép cắt.</li><li>Phân chia rõ: nhận diện thương hiệu, nhóm món, giá và CTA/thông tin mua hàng.</li><li>Giữ khoảng trống quanh ảnh ly; tránh nhồi sticker, icon hoặc chữ.</li><li>Kiểm tra cỡ chữ khi in thật và tương phản màu xanh – be – đen.</li></ul><p class="pres-note">README hiện chưa liệt kê file brochure riêng trong thư mục ảnh; slide này trình bày tiêu chí thiết kế theo báo cáo, không gán nhầm ảnh khác thành brochure.</p>`,
      visual: [],
      visualNote: "BROCHURE A5<br><span>Nhận diện thương hiệu</span><span>Nhóm món & giá</span><span>Thông tin mua hàng / CTA</span><small>Minh họa cấu trúc nội dung theo tiêu chí trong báo cáo</small>"
    },
    {
      section: "B • SẢN PHẨM & TRIỂN KHAI · 80%",
      title: "12. POSM – xe 20/22 & dù xanh–vàng",
      lead: "Xe là cấu trúc nhận diện vật lý; cây dù là dấu hiệu màu sắc nổi bật, giúp khách nhận ra điểm bán từ xa.",
      body: `<ul><li><b>Xe đẩy:</b> thể hiện mô hình phục vụ trực tiếp, nhanh gọn và linh hoạt.</li><li><b>Dù xanh–vàng:</b> nằm cao, dễ nhận ra từ xa; cặp màu tạo tương phản với môi trường.</li><li><b>Kết nối quảng cáo – thực tế:</b> khách thấy đúng xe/dù trong quảng cáo sẽ dễ tìm đúng điểm bán.</li><li><b>Hoàn chỉnh KV:</b> thể hiện đủ xe và mái dù hai mảng màu, đúng tỷ lệ, vị trí, hướng; không đổi dù thành một màu đơn sắc.</li></ul><div class="pres-callout"><b>5 tiêu chí thiết kế POSM</b><p><b>Độ trung thực:</b> đúng xe/dù thật. <b>Nhận diện:</b> tên 20/22 rõ, dù không bị che/crop. <b>Dễ đọc:</b> menu/giá có tương phản. <b>Đồng bộ:</b> xanh–vàng nhất quán trên KV, social, story, brochure. <b>Khả thi:</b> không đòi hỏi đổi cấu trúc xe hay vật liệu thực tế.</p></div>`,
      visual: [{file:"mockup-standee-xe-day-1.jpg", alt:"Mockup standee cạnh xe đẩy 20/22", caption:"Mockup 01"},{file:"mockup-standee-xe-day-2.jpg", alt:"Mockup standee cạnh xe đẩy 20/22 góc 2", caption:"Mockup 02"}]
    },
    {
      section: "B • SẢN PHẨM & TRIỂN KHAI · 80%",
      title: "13. Triển khai đa kênh",
      lead: "Các điểm chạm nối tiếp nhau trong cùng một hành trình, thay vì hoạt động tách rời.",
      body: `<div class="pres-channel"><article><b>Social Post đơn món</b><p>Tạo nhu cầu cho một món cụ thể: ảnh ly thật, tên món, giá, CTA.</p><small>Hành động: hỏi mua hoặc ghé điểm bán.</small></article><article><b>Post Best Seller</b><p>Giới thiệu và so sánh nhiều món: bốn ly, tên và giá được nhóm rõ.</p><small>Hành động: chọn món phù hợp.</small></article><article><b>Story Ads</b><p>Thu hút nhanh trên màn hình dọc: một thông điệp, hình ly, giá, CTA.</p><small>Hành động: dừng xem và hành động.</small></article><article><b>Brochure A5</b><p>Hỗ trợ chọn món tại điểm bán: menu ngắn, giá dễ đọc.</p><small>Hành động: chọn và gọi món.</small></article><article><b>Xe + dù xanh–vàng</b><p>Nhận diện trực tiếp ngoài đời: cụm xe/dù, tên thương hiệu, thông tin bán hàng.</p><small>Hành động: tìm đúng xe và mua hàng.</small></article></div>`,
      visual: [{file:"post-xe-day.png", alt:"Xe đẩy 20/22", caption:"Điểm chạm offline"},{file:"post-best-seller.png", alt:"Post Best Seller", caption:"Điểm chạm online"}]
    },
    {
      section: "B • SẢN PHẨM & TRIỂN KHAI · 80%",
      title: "14. Hành trình khách hàng",
      lead: "Từ lúc nhìn thấy quảng cáo đến khi tìm đúng xe và mua hàng.",
      body: `<div class="pres-journey"><span>Nhìn thấy bài quảng cáo</span><i>↓</i><span>Ghi nhớ món và giá</span><i>↓</i><span>Nhận ra xe 20/22 và dù xanh–vàng</span><i>↓</i><span>Xem menu / brochure tại điểm bán</span><i>↓</i><strong>Chọn món và mua</strong></div><p class="pres-note">Mỗi ấn phẩm cần chuyển tiếp thông tin cho điểm chạm tiếp theo, tạo trải nghiệm liền mạch giữa online và offline.</p>`,
      visual: [{file:"mockup-standee-xe-day-1.jpg", alt:"Mockup điểm bán 20/22", caption:"Kết nối hình ảnh quảng cáo với điểm bán"}]
    },
    {
      section: "B • SẢN PHẨM & TRIỂN KHAI · 80%",
      title: "15. Đánh giá & checklist trước khi in",
      lead: "Đánh giá theo năm tiêu chí thiết kế; không đồng nhất tiêu chí định hướng với kết quả đo lường thực tế.",
      body: `<div class="pres-checks"><article><b>Nhận diện</b><p>Có nhận ra tên 20/22 và hình ảnh xe/dù?</p></article><article><b>Khả năng đọc</b><p>Tên món và giá có đọc được trong vài giây?</p></article><article><b>Trung thực sản phẩm</b><p>Ảnh ly có phản ánh đúng màu, nắp, form và thành phần?</p></article><article><b>Tính nhất quán</b><p>Màu, kiểu chữ, giá, logo và CTA có đồng bộ?</p></article><article><b>Khả năng chuyển đổi</b><p>Người xem có biết chọn món nào và hành động tiếp theo?</p></article></div><ul class="pres-checklist"><li>Đối chiếu tên món và giá 20k/22k trên mọi ấn phẩm.</li><li>Đảm bảo mái dù xanh–vàng không bị crop, mất màu hoặc biến thành một màu.</li><li>Đối chiếu ảnh ly thật: màu thức uống, nắp, form ly và thành phần trang trí.</li><li>Kiểm tra chính tả, dấu tiếng Việt, tương phản và lề an toàn brochure A5.</li><li>Kiểm tra vùng an toàn Story Ads để CTA/giá không bị giao diện che.</li><li>Giữ tỷ trọng nội dung: lý thuyết/định hướng khoảng 20%, sản phẩm và triển khai khoảng 80%.</li></ul><p class="pres-note">Báo cáo chưa cung cấp KPI hoặc kết quả chiến dịch thực nghiệm; phần này là bộ tiêu chí đánh giá và checklist kiểm tra.</p>`,
      visual: [{file:"brand-guideline.png", alt:"Bảng nhận diện 20/22", caption:"Kiểm tra tính nhất quán nhận diện"}]
    },
    {
      section: "KẾT LUẬN",
      title: "16. Một hệ thống quảng cáo thống nhất",
      lead: "Thiết kế không chỉ cần đẹp về thị giác mà còn phải đúng sản phẩm, đúng bối cảnh, rõ giá và có mục tiêu hành động.",
      body: `<ul><li>Bộ sưu tập bốn món tạo nội dung bán hàng cụ thể.</li><li>Social Post, Story Ads và brochure phục vụ những tình huống tiếp xúc khác nhau.</li><li>Xe đẩy kết hợp dù xanh–vàng là POSM nhận diện trực tiếp, kết nối quảng cáo số với điểm bán thật.</li><li>Ảnh ly thật, màu thương hiệu, xe và dù cần đồng bộ để trải nghiệm liền mạch từ lúc khách nhìn thấy quảng cáo đến khi mua hàng.</li></ul><div class="pres-final">20/22 TAKEAWAY<br><span>MATCHA • COFFEE • MILKTEA</span></div>`,
      visual: [{file:"post-xe-day.png", alt:"Xe đẩy 20/22 Takeaway", caption:"Từ nhận diện đến trải nghiệm mua hàng"}],
      theme: "closing"
    }
  ];

  const escAttr = (value) => String(value).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
  const renderPresentation = () => {
    presentationStage.innerHTML = PRESENTATION_SLIDES.map((slide, i) => {
      const visuals = (slide.visual || []).map((v) => `
        <figure class="pres-visual-item">
          <img src="${IMG + v.file}" alt="${escAttr(v.alt)}" loading="lazy" />
          <figcaption>${v.caption || ""}</figcaption>
        </figure>`).join("");
      const visual = visuals
        ? `<div class="pres-visual-grid ${slide.visual.length > 1 ? "is-multiple" : ""}">${visuals}</div>`
        : `<div class="pres-visual-placeholder">${slide.visualNote || "20/22 TAKEAWAY"}</div>`;
      return `<article class="pres-slide ${slide.theme || ""}" data-slide="${i}" aria-hidden="${i !== 0}">
        <div class="pres-slide__copy">
          <span class="pres-kicker">${slide.section}</span>
          <h1>${slide.title}</h1>
          ${slide.subtitle ? `<p class="pres-subtitle">${slide.subtitle}</p>` : ""}
          <p class="pres-lead">${slide.lead || ""}</p>
          <div class="pres-body">${slide.body || ""}</div>
        </div>
        <div class="pres-slide__art">${visual}</div>
      </article>`;
    }).join("");
    presentationTocPanel.innerHTML = PRESENTATION_SLIDES.map((slide, i) =>
      `<button type="button" class="pres-toc-item" data-go-slide="${i}"><span>${String(i + 1).padStart(2, "0")}</span><b>${slide.title}</b><small>${slide.section}</small></button>`
    ).join("");
    withGuard(presentationStage);
  };

  const showPresentationSlide = (index) => {
    presentationIndex = Math.max(0, Math.min(PRESENTATION_SLIDES.length - 1, index));
    $$(".pres-slide", presentationStage).forEach((slide, i) => {
      const active = i === presentationIndex;
      slide.classList.toggle("is-active", active);
      slide.setAttribute("aria-hidden", String(!active));
    });
    $$(".pres-toc-item", presentationTocPanel).forEach((button, i) => button.classList.toggle("is-current", i === presentationIndex));
    presentationCounter.textContent = `${String(presentationIndex + 1).padStart(2, "0")} / ${String(PRESENTATION_SLIDES.length).padStart(2, "0")}`;
    presentationProgress.style.width = `${((presentationIndex + 1) / PRESENTATION_SLIDES.length) * 100}%`;
    presentationTitle.textContent = PRESENTATION_SLIDES[presentationIndex].title;
    $("#presentation-prev").disabled = presentationIndex === 0;
    $("#presentation-next").disabled = presentationIndex === PRESENTATION_SLIDES.length - 1;
  };

  const openPresentation = () => {
    if (!presentation) return;
    if (!presentationStage.children.length) renderPresentation();
    presentationOpen = true;
    presentation.classList.add("is-open");
    presentation.setAttribute("aria-hidden", "false");
    presentationTocPanel.classList.remove("is-open");
    showPresentationSlide(presentationIndex);
    lockScroll(true);
  };
  const closePresentation = async () => {
    if (!presentationOpen) return;
    presentationOpen = false;
    presentation.classList.remove("is-open");
    presentation.setAttribute("aria-hidden", "true");
    presentationTocPanel.classList.remove("is-open");
    if (document.fullscreenElement && document.exitFullscreen) {
      try { await document.exitFullscreen(); } catch (_) {}
    }
    lockScroll(false);
  };

  $$("[data-presentation-open]").forEach((el) => el.addEventListener("click", (e) => {
    e.preventDefault();
    closeMenu();
    openPresentation();
  }));
  $("#presentation-close").addEventListener("click", closePresentation);
  $("#presentation-prev").addEventListener("click", () => showPresentationSlide(presentationIndex - 1));
  $("#presentation-next").addEventListener("click", () => showPresentationSlide(presentationIndex + 1));
  $("#presentation-toc").addEventListener("click", () => presentationTocPanel.classList.toggle("is-open"));
  presentationTocPanel.addEventListener("click", (e) => {
    const button = e.target.closest("[data-go-slide]");
    if (!button) return;
    showPresentationSlide(+button.dataset.goSlide);
    presentationTocPanel.classList.remove("is-open");
  });
  $("#presentation-fullscreen").addEventListener("click", async () => {
    try {
      if (!document.fullscreenElement) await presentation.requestFullscreen();
      else await document.exitFullscreen();
    } catch (_) {
      presentation.classList.toggle("is-expanded");
    }
  });
  document.addEventListener("keydown", (e) => {
    if (!presentationOpen) return;
    if (e.key === "Escape") { e.preventDefault(); closePresentation(); return; }
    if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") {
      e.preventDefault(); showPresentationSlide(presentationIndex + 1);
    } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
      e.preventDefault(); showPresentationSlide(presentationIndex - 1);
    } else if (e.key === "Home") {
      e.preventDefault(); showPresentationSlide(0);
    } else if (e.key === "End") {
      e.preventDefault(); showPresentationSlide(PRESENTATION_SLIDES.length - 1);
    } else if (e.key.toLowerCase() === "f") {
      e.preventDefault(); $("#presentation-fullscreen").click();
    } else if (e.key.toLowerCase() === "m") {
      e.preventDefault(); presentationTocPanel.classList.toggle("is-open");
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
