# 20/22 Takeaway — Đồ Án Cuối Kỳ Truyền Thông Đa Phương Tiện

Kho lưu trữ mã nguồn cho website trưng bày đồ án **20/22 Takeaway**, được thiết kế theo phong cách cinematic portfolio cao cấp, tích hợp đầy đủ nội dung báo cáo chi tiết, chân dung khách hàng, định vị thương hiệu, POSM, mockup thực tế, ấn phẩm thiết kế có chế độ phóng to xem rõ nét và nội dung thuyết trình đi kèm ngay bên cạnh từng mục.

## 👥 Thông tin nhóm thực hiện & Hướng dẫn
* **Nhóm thực hiện:** Anh tài nhà bên
* **Giảng viên hướng dẫn:** Nguyễn Lê Anh Thi
* **Địa điểm triển khai:** Cơ sở 5 Đại học Lạc Hồng (LHU) và khu vực cư dân lân cận.

---

## 📂 Cấu trúc thư mục kho lưu trữ (Repository Structure)
```text
20-22-takeaway-v2/
├── index.html              # Trang chủ một trang (Single Page) tích hợp toàn bộ báo cáo, nội dung thuyết trình cạnh hình ảnh, modal phóng to ảnh, mockup thực tế
├── script.js               # File JavaScript điều khiển preloader, smooth scroll và modal phóng to hình ảnh
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
1. **Loại bỏ hoàn toàn thông tin cá nhân rườm rà:** Không hiển thị MSSV hay lớp, giao diện tập trung hoàn toàn vào nội dung đồ án và ấn phẩm của nhóm "Anh tài nhà bên".
2. **Nội dung thuyết trình đặt ngay bên cạnh hình ảnh:** Mỗi phần trưng bày thiết kế đều có cột nội dung tóm tắt từ file báo cáo Docx (Cơ sở lý thuyết, định vị thương hiệu, chân dung khách hàng, POSM, mockup) đặt song song giúp dễ dàng thuyết trình trực tiếp trên web.
3. **Tính năng Phóng to (Lightbox Modal):** Khi bấm vào bất kỳ hình ảnh thiết kế nào, ảnh sẽ tự động phóng to toàn màn hình với kích thước chuẩn để người xem quan sát rõ từng chi tiết.
4. **Sử dụng đầy đủ Mockup thực tế:** Đã tích hợp hình ảnh mockup xe đẩy ngày 1 và ngày 2 để hội đồng thấy rõ tính ứng dụng ngoài thực tế.
5. **Bảng màu đồng bộ thương hiệu:** Sử dụng hệ màu Xanh Matcha (`#1E5E3A`, `#0D3B22`), Kem tươi (`#F3EEE1`), Be (`#F7F4E9`) kết hợp nền Cinematic tối (`#05160D`), chữ trắng sắc nét và điểm nhấn hồng phấn (`#fbcfe8`).
6. **Bảo toàn tỷ lệ hình ảnh tuyệt đối (No Cropping):** Mọi ấn phẩm từ Social Posts (`4:5`), Standee (`850mm x 2000mm`), Brochure (`A5`) đều hiển thị trọn vẹn 100% bằng `object-fit: contain`.
