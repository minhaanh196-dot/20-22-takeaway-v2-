# Kết quả kiểm tra kỹ thuật — 20/22 Takeaway

## Đã kiểm tra
- `script.js`: Node.js `--check` thành công, không có lỗi cú pháp.
- `index.html`: phân tích cấu trúc HTML bằng HTMLParser thành công.
- `style.css`: phân tích bằng tinycss2, không phát hiện lỗi cú pháp CSS.
- Các ID tĩnh được JavaScript truy vấn đều tồn tại trong HTML.
- 18 slide có tiêu đề, nội dung body và visual hoặc visualNote; không có slide dữ liệu rỗng.
- Bộ đếm slide khởi tạo `00 / 00` và được cập nhật động từ `PRESENTATION_SLIDES.length`.
- Các điều khiển phím được triển khai: ←/→, PageUp/PageDown, Space, Home/End, M, F, Esc.
- Previous/Next, mục lục, fullscreen và đóng trình chiếu có xử lý trong JavaScript.
- Landing page được ẩn khi trình chiếu và khôi phục khi thoát.
- CSS bổ sung khung 16:9, breakpoint laptop/máy chiếu và bố cục màn hình nhỏ.

## Giới hạn xác minh
- Không có thư mục `assets/images/` trong các file tải lên lượt này. Vì vậy không thể xác nhận ảnh thực tế có tồn tại; mã hiện có ảnh dự phòng khi ảnh thiếu. Cần đưa thư mục ảnh gốc lên cùng repository GitHub.
- Môi trường kiểm tra chặn trình duyệt tự động truy cập trang local (`ERR_BLOCKED_BY_ADMINISTRATOR`), nên không thể xác nhận trực quan toàn bộ animation/keyboard/fullscreen bằng thao tác browser thật ở đây. Các chức năng đã được rà soát trong mã và kiểm tra cú pháp/static.
- Chưa có file brochure A5 riêng trong danh sách ảnh; slide brochure dùng sơ đồ cấu trúc và ghi rõ đây không phải mockup brochure thật.

## Tệp bàn giao
- `index.html`
- `script.js`
- `style.css`
- `README.md`
