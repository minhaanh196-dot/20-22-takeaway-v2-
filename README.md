# 20/22 Takeaway — Đồ Án Cuối Kỳ Truyền Thông Đa Phương Tiện

Kho lưu trữ mã nguồn cho website trưng bày đồ án **20/22 Takeaway**, được thiết kế theo phong cách cinematic portfolio cao cấp (lấy cảm hứng từ Marcus Vane style), tích hợp đầy đủ báo cáo học thuật phân tích chiến dịch TikTok, hệ thống ấn phẩm quảng cáo, và slide thuyết trình bảo vệ trước hội đồng.

## 👥 Thông tin tác giả & Đồ án
* **Sinh viên thực hiện:** Nguyễn Bùi Minh Ánh (Lớp 25MC113 - MSSV: 125001994)
* **Giảng viên hướng dẫn:** Khoa Truyền Thông Đa Phương Tiện, Đại học Lạc Hồng (LHU)
* **Địa điểm triển khai:** Cơ sở 5 LHU và khu vực cư dân lân cận.
* **Thời gian nghiên cứu:** 09/09/2026 – 21/10/2026.

---

## 📂 Cấu trúc thư mục kho lưu trữ (Repository Structure)
```text
20-22-takeaway-v2/
├── index.html              # Trang chủ Landing Page (Cinematic Dark Mode, Lenis Smooth Scroll, Preloader, Marquee, Liquid Hover)
├── report.html             # Trang báo cáo học thuật chi tiết (Phân tích 9 bài đăng TikTok, Share Rate 1.55%, Phễu TOFU-MOFU-BOFU, CLO Matrix)
├── presentation.html       # Trang Slide trình chiếu bảo vệ đồ án (Tích hợp hình ảnh nguyên vẹn không cắt xén, điều hướng phím mũi tên)
├── README.md               # Tài liệu mô tả kho lưu trữ
└── assets/
    └── images/             # Kho tài nguyên hình ảnh chuẩn nhận diện (18 file)
        ├── key-visual.png
        ├── brochure-a5.png
        ├── banner-standee-best-seller.png
        ├── banner-standee-matcha-latte.png
        ├── banner-standee-houjicha.png
        ├── banner-standee-tra-buoi-hoa-dao.png
        ├── banner-standee-tra-sua-thai-do.png
        ├── post-best-seller.png
        ├── post-matcha-latte.png
        ├── post-houjicha.png
        ├── post-tra-buoi-hoa-dao.png
        ├── post-tra-sua-thai-do.png
        ├── post-xe-day.png
        ├── poster-best-seller-a4.png
        ├── story-ads.png
        ├── brand-guideline.png
        ├── mockup-standee-xe-day-1.jpg
        └── mockup-standee-xe-day-2.jpg
```

---

## ✨ Điểm nổi bật của thiết kế & kỹ thuật
1. **Font chữ độc quyền:** Sử dụng hoàn toàn font **Baloo 2** (Google Fonts) kết hợp Inter cho tiêu đề và nội dung, mang lại cảm giác thân thiện, trẻ trung nhưng vô cùng chuyên nghiệp, chuẩn Gen Z.
2. **Bảo toàn tỷ lệ hình ảnh (No Cropping):** Mọi ấn phẩm từ Social Posts (tỷ lệ chuẩn `4:5`), Standee điểm bán (`850mm x 2000mm`), Brochure (`khổ A5`) cho đến Key Visual đều được hiển thị trọn vẹn 100% bằng thuộc tính `object-fit: contain`.
3. **Hiệu ứng chuyển động Cinematic:** 
   - Preloader đếm số % mượt mà trước khi mở trang.
   - Lenis Smooth Scroll mang lại trải nghiệm lướt mượt mà, cao cấp.
   - Infinite Marquee chạy liên tục các trụ nội dung và thông điệp cốt lõi.
   - Hiệu ứng Liquid Image distortion khi rê chuột vào các khối sản phẩm/chân dung.
4. **Hệ thống trình chiếu & báo cáo tích hợp:** 
   - `presentation.html` hoạt động như một slide deck thu nhỏ với bố cục 2 cột (chữ phân tích + hình ảnh minh họa song song), có thể điều hướng bằng nút bấm hoặc phím mũi tên.
   - `report.html` trình bày toàn bộ số liệu khảo sát, công thức tính Share Rate, bảng giữ-sửa-bỏ và đối chiếu năng lực CLO1–CLO4.

---

## 🚀 Hướng dẫn triển khai trên GitHub Pages
1. Tải toàn bộ mã nguồn này lên repository trên GitHub của bạn (`minhaanh196-dot/20-22-takeaway-v2`).
2. Vào **Settings** $ightarrow$ **Pages**.
3. Tại phần **Build and deployment**, chọn Branch là `main` và thư mục `/root` $ightarrow$ Nhấn **Save**.
4. Truy cập đường link công khai GitHub Pages (`https://minhaanh196-dot.github.io/20-22-takeaway-v2/`) để trải nghiệm trực tiếp hoặc trình chiếu bảo vệ trước hội đồng!
