# Data JSON — CTWELD

Toàn bộ phần "data" của bản demo được tách ra thành JSON tại thư mục này, để sau import vào WordPress.

Nguồn: `1_Cấu trúc Website _ CT WELD.xlsx` (3 sheet) + các Google Docs / Google Drive được liên kết trong file đó.

> **Cập nhật 17/08/2026:** đã đối chiếu demo với **39 ảnh mockup** nhúng trong file Excel và sửa toàn bộ
> 16 hạng mục lệch, gồm cả việc bổ sung **responsive** (trước đó CSS không có `@media` nào) và **4 template
> trang cấp 2** còn thiếu. Chi tiết: [docs/audit-mockup.md](../docs/audit-mockup.md).
> Ảnh mockup gốc: [docs/mockup/](../docs/mockup/).

## Danh sách file

| File | Nội dung | Map sang WordPress |
|---|---|---|
| `site.json` | Thông tin công ty, liên hệ, mạng xã hội, chính sách, header, footer, nút liên hệ nhanh, song ngữ | Theme Options / ACF Options Page |
| `menu.json` | Cấu trúc menu 8 mục chính + danh mục con (Sheet 1 & 2, mục 1.0) | Appearance → Menus |
| `home.json` | Đặc tả 10 section trang chủ theo đúng STT trong Excel + nội dung từng section | Front page template / ACF Flexible Content |
| `product-categories.json` | Danh mục sản phẩm + danh sách thương hiệu (bộ lọc) | Taxonomy `product_cat`, `product_brand` |
| `products.json` | SAPO trang sản phẩm + **2 sản phẩm có tài liệu chính thức đầy đủ** + 9 sản phẩm demo | CPT `product` |
| `solutions.json` | SAPO + 3 giải pháp (4.1, 4.2, 4.3) | CPT `solution` |
| `services.json` | SAPO + 4 dịch vụ (5.1 → 5.4) + cam kết bảo hành | CPT `service` |
| `projects.json` | SAPO + 12 dự án | CPT `project` |
| `news.json` | 3 chuyên mục + 12 bài viết + sidebar | `post` + `category` |
| `about.json` | Trang Về chúng tôi: tầm nhìn, sứ mệnh, giá trị cốt lõi, số liệu, lịch sử | Page `ve-chung-toi` |
| `partners.json` | Nhà cung cấp chiến lược (băng truyền logo) | CPT `partner` hoặc ACF Repeater |
| `forms.json` | 3 form: tư vấn, yêu cầu dịch vụ, đăng ký nhận tin | Contact Form 7 / WPForms |
| `page-specs.json` | Bảng yêu cầu gốc Sheet 3 cho từng trang danh mục + trạng thái nội dung | Checklist khi dựng site |
| `source-links.json` | Kết quả kiểm tra truy cập toàn bộ link Google trong Excel | Tracking tài nguyên |

## Quy ước trạng thái nội dung

Mỗi khối dữ liệu đều có trường `content_status`:

- `official` — lấy từ tài liệu chính thức của khách hàng (Google Docs/Drive). Dùng được ngay.
- `draft` — nội dung viết cho demo, đúng hướng nhưng chưa được duyệt.
- `placeholder` — dữ liệu giả để dựng giao diện, **phải thay** trước khi lên production.
- `missing` — chưa có nội dung, đang chờ khách hàng.

Ảnh Unsplash trong các file JSON đều là ảnh stock — thay hết khi lên production.

## Nội dung đã lấy được từ Google (chính thức)

- SAPO trang **Sản phẩm**, **Giải pháp**, **Dịch vụ**, **Dự án** — 4 Google Docs.
- **2 bài viết sản phẩm SEO đầy đủ** (thông số, nội dung, bảng so sánh, FAQ):
  - Máy Phun Bi Làm Sạch Dầm H CTWELD CT1020-10
  - Máy hàn dầm H tự động 3 trong 1 CTWELD PHJ-0618CT2M
- **3 ảnh đã tải về `images/`** (đã thay ảnh stock trong demo):

| File | Kích thước | Nội dung thực tế | Đang dùng ở |
|---|---|---|---|
| `images/tam-nhin.jpg` | 2752×1536 | Ảnh chụp **trụ sở CTWELD** (biển hiệu Khai Sơn Town) | `ve-chung-toi.html` khối **TẦM NHÌN**, `index.html` mục 3.0, `lien-he.html` hero |
| `images/su-menh.jpg` | 1000×632 | Ảnh chụp **dây chuyền robot hàn** trong nhà máy | `ve-chung-toi.html` khối **SỨ MỆNH**, `index.html` mục 4.0, các trang archive |
| `images/han-3-trong-1.png` | 1126×586 | Ảnh render **máy hàn dầm H 3 trong 1 PHJ-0618CT2M** | `index.html` mục 4.0 + 5.0, `san-pham.html`, `giai-phap.html` |

Vị trí dùng 2 ảnh Tầm nhìn / Sứ mệnh là **đúng theo mockup** — chúng là 2 ảnh lớn cho 2 khối zig-zag ở section "Tầm Nhìn Sứ Mệnh" trang Về chúng tôi.

> Lưu ý: 2 file trên Drive đặt tên "Tầm nhìn" / "Sứ mệnh" nhưng nội dung là ảnh trụ sở và ảnh dây chuyền — không phải đồ hoạ minh hoạ tầm nhìn/sứ mệnh. Ảnh trụ sở còn hiển thị số điện thoại `0789.6?6.444` trên biển hiệu, khác cả 2 số đang dùng — cần hỏi lại khách hàng.

## Việc còn thiếu (tổng hợp)

1. **Google Docs "Về chúng tôi" không mở được** (HTTP 401) — cần khách hàng mở quyền chia sẻ. Đây là link duy nhất bị chặn.
2. Danh sách sản phẩm đầy đủ (hiện mới 2/N sản phẩm có tài liệu).
3. Nội dung giải pháp cấp 2, dịch vụ cấp 2, dự án cấp 2 (Excel yêu cầu bài viết SEO cho từng mục).
4. Giải pháp 4.3 "Công nghiệp xây dựng" — chưa có nội dung ở bất kỳ nguồn nào.
5. Danh sách + file logo nhà cung cấp chiến lược.
6. Ảnh banner, ảnh dự án, ảnh sản phẩm thật; file logo thương hiệu chất lượng cao.
7. Link Zalo OA, Linkedin, Instagram.
8. Bài viết tin tức thật.
9. Bản dịch tiếng Anh (Excel yêu cầu song ngữ Việt/Anh).

## Khác biệt giữa Excel và bản demo — trạng thái xử lý

### Đã sửa (17/08/2026)

| Điểm | Excel yêu cầu | Đã làm gì |
|---|---|---|
| Banner trang chủ | Tự đổi slide ~8 giây | `js/main.js`: autoplay 8000ms, tạm dừng khi hover / tab ẩn, đếm lại 8s sau thao tác thủ công. Vẫn giữ mũi tên + dot. |
| Ngôn ngữ | Việt / Anh | Xoá nút cờ 🇨🇳 khỏi cả 9 trang HTML. |
| Giải pháp | 3 mục (4.1, 4.2, 4.3) | Dựng thêm section `#xay-dung` trong `giai-phap.html`. Link menu 4.3 trước đây bấm vào không tới đâu — nay đã tới. Nội dung là **draft cần khách hàng duyệt**. |
| Danh mục sản phẩm | 2 danh mục (3.1, 3.2) | Gộp còn 2. Chi tiết ánh xạ ở `product-categories.json → merged_categories`. |
| Hotline | 0866060894 (Footer Excel) | **Chốt 0866 060 894** cho toàn site. 0969.730.762 đánh dấu `deprecated`, cần khách hàng sửa trong 2 tài liệu sản phẩm gốc. |

Cách gộp danh mục sản phẩm:

- `cat-cnc` (Máy Cắt CNC Laser) → gộp vào **Dây chuyền kết cấu thép**, thành 2 danh mục con `laser-tam`, `laser-ong`. Lý do: cắt phôi bản mã là công đoạn đầu của dây chuyền kết cấu thép.
- `thiet-bi-han` (Vật Tư & Phụ Tùng) → tách đôi: đồ gá Jig về **Dây chuyền kết cấu thép**, nguồn hàn Megmeet về **Robot công nghiệp**. Phần vật tư tiêu hao / phụ tùng thay thế thuộc **Dịch vụ 5.3 và 5.4**, không phải danh mục sản phẩm.
- Cần khai báo redirect 301 khi lên WordPress — URL cũ đã ghi trong `merged_categories`.

### Đã sửa vòng 2 — sau khi đọc 39 ảnh mockup (17/08/2026)

| Hạng mục | Đã làm |
|---|---|
| **Responsive** | Thêm 6 khối `@media` + drawer mobile thật (trượt từ trái, accordion, khoá scroll, đóng bằng Esc) trên cả 13 trang |
| **4 template thiếu** | `giai-phap-chi-tiet.html`, `dich-vu-chi-tiet.html`, `du-an-chi-tiet.html`, `tin-tuc-chi-tiet.html` |
| **Trang Về chúng tôi** | Dựng lại đúng 4 section mockup; 2 ảnh Drive dùng đúng chỗ (2 khối zig-zag Tầm nhìn / Sứ mệnh) |
| **Trang chủ** | Sửa cả 6 mục 3.0 → 8.0 (xem bảng chi tiết trong audit) |
| **Sidebar tin tức** | **Bỏ** — mockup đã trả lời câu hỏi treo. Thay bằng bộ lọc pill |
| **Form** | Chỉ còn 2 field bắt buộc (họ tên + SĐT) thay vì 8 |
| **Trang sản phẩm** | Nhóm theo danh mục; thẻ đổi sang Hãng sản xuất/Model; cấp 2 có nút zoom + bảng 2 cột |

### Còn treo, chờ khách hàng chốt

| Điểm | Ghi chú |
|---|---|
| Chuyên mục "TIN KỸ THUẬT" | Gộp vào "Tin tức ngành" hay mở thêm chuyên mục 7.4? |
| Tab "Khuyến mại và sự kiện" | Có trong mockup mục 6.0, không có trong text Excel. Đang để trạng thái rỗng — cần nội dung hoặc bỏ tab |
| SĐT trên biển hiệu | `0789.6?6.444` trong ảnh trụ sở — số thứ ba, khác cả 2 số đang dùng |
| Nội dung draft cần duyệt | 5 giá trị cốt lõi; nội dung 4 template cấp 2; giải pháp 4.3 |
