# 20/22 Takeaway — Đồ Án Cuối Kỳ Truyền Thông Đa Phương Tiện

Kho lưu trữ mã nguồn cho website trưng bày đồ án **20/22 Takeaway**, được thiết kế theo phong cách cinematic portfolio cao cấp, tích hợp đầy đủ báo cáo phân tích thiết kế quảng cáo chi tiết, hệ thống ấn phẩm quảng cáo, và slide thuyết trình bảo vệ trước hội đồng.

## 👥 Thông tin nhóm thực hiện & Hướng dẫn
* **Nhóm thực hiện:** Anh tài nhà bên
* **Sinh viên thực hiện:** Nguyễn Bùi Minh Ánh (Lớp 25MC113 - MSSV: 125001994)
* **Giảng viên hướng dẫn:** Nguyễn Lê Anh Thi
* **Địa điểm triển khai:** Cơ sở 5 Đại học Lạc Hồng (LHU) và khu vực cư dân lân cận.

---

## 📂 Cấu trúc thư mục kho lưu trữ (Repository Structure)
```text
20-22-takeaway-v2/
├── index.html              # Trang chủ Landing Page (Cinematic Dark Mode, Lenis Smooth Scroll, Preloader, Marquee, Layout tối ưu không che chữ, màu sắc đồng bộ)
├── report.html             # Trang báo cáo chi tiết (Phân tích Phần A & Phần B theo đúng file Docx chuẩn)
├── presentation.html       # Trang Slide trình chiếu bảo vệ đồ án (Tích hợp hình ảnh nguyên vẹn side-by-side, điều hướng phím mũi tên)
├── script.js               # File JavaScript điều khiển hiệu ứng cuộn, preloader và tương tác
├── README.md               # Tài liệu mô tả kho lưu trữ chuẩn GitHub
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
1. **Font chữ Baloo 2:** Sử dụng hoàn toàn font **Baloo 2** (Google Fonts) kết hợp Inter cho tiêu đề và nội dung, mang lại cảm giác thân thiện, trẻ trung, chuẩn Gen Z.
2. **Bố cục tối ưu (Không che chữ, không khoảng trống thừa):** Các khối hiển thị được căn chỉnh dạng lưới (Grid/Flexbox) khoa học, tách bạch rõ ràng giữa phần hình ảnh và văn bản, đảm bảo không có hiện tượng ảnh đè lên chữ hoặc lãng phí không gian.
3. **Bảng màu đồng bộ thương hiệu:** Sử dụng hệ màu chủ đạo từ báo cáo: Xanh Matcha (`#1E5E3A`, `#0D3B22`), Kem tươi (`#F3EEE1`), Be (`#F7F4E9`) kết hợp nền tối Cinematic sang trọng (`#08080a`, `#05160D`), chữ trắng sắc nét và điểm nhấn hồng phấn (`#fbcfe8`).
4. **Bảo toàn tỷ lệ hình ảnh (No Cropping):** Mọi ấn phẩm từ Social Posts (`4:5`), Standee điểm bán (`850mm x 2000mm`), Brochure (`A5`) đều hiển thị trọn vẹn 100% bằng `object-fit: contain`.
5. **Hệ thống trình chiếu chuyên nghiệp:** `presentation.html` hoạt động như slide deck 2 cột, hỗ trợ phím mũi tên bàn phím.
