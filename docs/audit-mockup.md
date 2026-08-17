# Audit: demo vs 39 ảnh mockup trong file Excel

> **TRẠNG THÁI: ĐÃ SỬA XONG (17/08/2026).** Toàn bộ 16 hạng mục lệch trong báo cáo này đã được xử lý.
> Bảng "Việc đã làm" ở cuối file ghi rõ từng thay đổi. Các mục còn treo đều là **nội dung chờ khách hàng**,
> không phải lỗi giao diện.


Ngày: 17/08/2026. Nguồn: ảnh nhúng trong `1_Cấu trúc Website _ CT WELD.xlsx`, cột **F** (Sheet 1 & 2 — Hình ảnh tham khảo), cột **G/H** (Sheet 3 — Giao diện Desktop / Mobile).

Toàn bộ 39 ảnh đã giải nén ra [docs/mockup/](mockup/), đặt tên theo ô gốc để tra ngược:

- `home-D-*` = Sheet 1, trang chủ desktop (7 ảnh)
- `home-M-*` = Sheet 2, trang chủ mobile (8 ảnh)
- `p<STT>-*-D-*` / `-M-*` = Sheet 3, trang danh mục theo STT (24 ảnh)

Mockup lấy từ 2 site tham chiếu: **automech.vn** (đa số) và **weldcom.vn** (trang Về chúng tôi, nhà cung cấp).

---

## ✅ ĐÃ SỬA — Vấn đề chặn lớn nhất: không có responsive

**Trước khi sửa:** `css/style.css` (54KB) có **0 câu `@media`**. Nghĩa là:

- Sheet 2 của Excel — *"Cấu trúc trang chủ (Mobile)"*, 9 mục yêu cầu riêng — **chưa được triển khai một dòng nào**.
- Nút `.mobile-toggle` trong header có tồn tại, `js/main.js:248` có bắt sự kiện click và toggle class `.active`, nhưng **không có CSS nào cho class đó** → bấm vào không có gì xảy ra.
- Trên điện thoại, mọi trang sẽ vỡ layout: grid 3 cột giữ nguyên 3 cột, `container` cố định, carousel 3.5 thẻ không co lại.

Mockup mobile yêu cầu menu là **drawer trượt từ trái**, nền tối, mỗi mục 1 hàng, mục có con thì chevron ˅ mở accordion, cuối danh sách là bộ chọn ngôn ngữ. Xem `docs/mockup/home-M-1.0-menu-b.png`.

**Đã sửa:** thêm 6 khối `@media` (1280px / 1024px / 768px / 480px / print) — xem cuối `css/style.css`.
Menu mobile giờ là **drawer thật**: trượt từ trái, nền tối `#232629`, header "MENU", accordion cho mục có
danh mục con (mỗi lần chỉ mở 1 mục), bộ chọn ngôn ngữ VN/EN ở cuối, khoá scroll body khi mở, đóng bằng
overlay hoặc phím Esc. Markup drawer đã chèn vào cả 13 trang.

Điểm phá vỡ chính đã xử lý ở từng breakpoint:
- **1024px** — ẩn nav ngang + thanh tìm kiếm + block liên hệ header, hiện hamburger; grid 3→2 cột;
  carousel 3→2 thẻ; khối About và Tầm nhìn/Sứ mệnh xếp dọc (ảnh lên trên); sidebar lọc sản phẩm xuống dưới.
- **768px** — mọi grid về 1 cột; carousel 1 thẻ (dự án 86% để lộ mép thẻ sau); ẩn mũi tên banner;
  bảng thông số cuộn ngang trong khung riêng; bỏ canh đều hai bên cho văn bản bài viết.
- **480px** — pill chuyên mục cuộn ngang, thu nhỏ logo và icon.

Lưu ý kỹ thuật: rule giảm padding ở 768px dùng `section:not(.hero-slider):not(.contact-map-section):not(.partners-section)`
— nếu áp cho mọi `<section>` thì banner và bản đồ (2 khối không có padding) sẽ bị vỡ.

---

## Trang chủ (Sheet 1)

| Mục | Mockup yêu cầu | Demo hiện tại | Kết luận |
|---|---|---|---|
| 2.0 Banner | Ảnh banner thiết kế sẵn full-width (~1920×630), thông số máy in luôn trong ảnh, mũi tên ‹ › đè hai bên | Đúng dạng "pure media, no overlay", đã có autoplay 8s | ✅ **Khớp** |
| 3.0 Về chúng tôi | Tiêu đề + gạch chân ngắn, sapo, **4 ô số liệu 2×2** có nhãn trên + số lớn dưới + đường kẻ, nút "Xem thêm" viền tròn **canh giữa dưới cột text**; ảnh phải là **1 ảnh đơn bo góc** | Tiêu đề 2 dòng in hoa, **3 ô số liệu ngang**, nút viền trái; ảnh phải là **gallery 1 ảnh lớn + 3 thumbnail** | ⚠️ Lệch: 3 vs 4 ô số liệu, gallery vs ảnh đơn |
| 4.0 Danh mục sản phẩm | **2 card**, mỗi card: ảnh lớn trên → tên danh mục (header nền xám) → **danh sách các sản phẩm trong danh mục dạng list có đường kẻ** → "Xem thêm +" | 2 card: ảnh + badge số → tiêu đề → **1 đoạn mô tả** → "Xem Danh Mục" | 🔴 **Lệch nặng.** Đúng như câu trong Excel: *"Hiển thị các danh mục sản phẩm **và các sản phẩm chi tiết có trong danh mục**"* — mình đã hiểu sai thành đoạn mô tả |
| 5.0 Dòng máy nổi bật | 3 thẻ/khung, **carousel có mũi tên tròn đè hai bên + dot ở dưới**, thẻ: ảnh → tên → excerpt cắt "..." → **"Hãng sản xuất:" + "Model:"** dạng bullet → không có nút | 4 thẻ grid tĩnh, thẻ: ảnh + tag HOT/MỚI → "MOD: xxx" → tên → 3 dòng spec → nút "Xem Chi Tiết & Báo Giá" | ⚠️ Lệch: grid vs carousel, 4 vs 3 thẻ, cấu trúc thông tin trong thẻ |
| 6.0 Dự án nổi bật | **Tab "Dự án \| Khuyến mại và sự kiện"**, mũi tên ‹ › + "Xem tất cả →" ở **góc trên phải**, thẻ: ảnh → icon mũi tên chéo → **TÊN IN HOA** → mô tả | Không có tab; mũi tên + CTA ở **dưới**; thẻ có **badge trạng thái** trên ảnh và **dòng địa điểm có ghim bản đồ** (mockup không có) | ⚠️ Lệch: thiếu tab, vị trí điều khiển, thẻ thừa badge/địa điểm |
| 7.0 Nhà cung cấp | Tiêu đề canh giữa, **logo ảnh thật**, mũi tên ‹ › hai bên | Tiêu đề + subtitle, **logo là chữ text**, băng chạy marquee không mũi tên | ⚠️ Cần file logo thật + thêm mũi tên |
| 8.0 Tin tức | Tiêu đề + gạch chân, **"XEM TẤT CẢ" viền tròn góc trên phải**, **grid 3 thẻ**, thẻ: ảnh bo góc → **ngày (chỉ ngày, xám nhỏ)** → tiêu đề → "Xem chi tiết →" | CTA ở dưới, **carousel 3.5 thẻ autoplay**, thẻ có **"ngày \| CHUYÊN MỤC"** | ⚠️ Lệch: grid vs carousel, vị trí CTA, thẻ thừa nhãn chuyên mục |

---

## Trang Về chúng tôi (Sheet 3, STT 1.0) — ô G2, 5 ảnh

Mẫu lấy từ **weldcom.vn**, thứ tự 4 section:

| # | Mockup | Demo | Kết luận |
|---|---|---|---|
| 1 | Tiêu đề in hoa canh giữa + các đoạn văn xuôi, **không có banner** | Có hero banner + tiêu đề canh trái | ⚠️ |
| 2 | **Tầm Nhìn Sứ Mệnh**: tiêu đề canh giữa, rồi 2 khối **zig-zag** — TẦM NHÌN (ảnh lớn trái + text phải), SỨ MỆNH (text trái + ảnh lớn phải) | 3 card ngang chỉ có **icon FontAwesome**, không ảnh | 🔴 **Lệch nặng** |
| 3 | **GIÁ TRỊ CỐT LÕI**: section riêng, tiêu đề in hoa canh giữa, **5 cột card** nền xám nhạt, mỗi card: icon tròn viền → tiêu đề màu thương hiệu → **3 gạch đầu dòng** | Bị nhét làm card thứ 3 của mục 2, chỉ 1 đoạn text | 🔴 **Lệch nặng** |
| 4 | **Nhà cung cấp chiến lược**: băng logo + mũi tên ‹ › | Không có trên trang này | 🔴 **Thiếu** |

**Điều này giải thích 2 ảnh trên Drive:** `1_Tầm nhìn` và `2_Sứ mệnh` chính là 2 ảnh lớn cho 2 khối zig-zag ở mục 2 — đúng số lượng, đúng thứ tự đánh số. Trước đó mình đã dùng sai chỗ (đưa vào gallery trang chủ và ảnh giới thiệu).

Hai section demo tự thêm — "Công Trình & Dây Chuyền Đã Triển Khai" và "Quá Trình Hình Thành" — **giữ lại, đặt sau 4 section chuẩn** (đã thống nhất).

---

## Trang sản phẩm

### Cấp 1 (STT 2.0) — ô G3, 3 ảnh

Mockup: **nhóm theo từng danh mục**, mỗi nhóm có tiêu đề danh mục in hoa màu thương hiệu, dưới là **grid 3 thẻ**. Thẻ: ảnh nền trắng → tên → excerpt cắt "..." → bullet **"Hãng sản xuất:"** và **"Model:"** → nút **"Xem chi tiết"** nền đặc.

Demo: 1 grid phẳng 9 sản phẩm, không nhóm theo danh mục; thẻ có `CODE:` + tag thương hiệu thay vì Hãng sản xuất/Model.

⚠️ Lệch: cần nhóm theo danh mục + đổi cấu trúc thông tin trong thẻ.

Ghi chú: mockup **không thấy bộ lọc sidebar**, nhưng cột text của Excel ghi rõ *"có nút lọc theo danh mục sản phẩm và theo thương hiệu"* → giữ sidebar lọc của demo, chỉ sửa phần thẻ.

### Cấp 2 (STT 3.0) — ô G4, 2 ảnh

Mockup: tên sản phẩm heading lớn → **ảnh sản phẩm lớn có nút zoom 🔍** → mục **"Mô tả sản phẩm"** với **bảng 2 cột Thông số / Mô tả** → các đoạn văn SEO.

Demo `san-pham-chi-tiet.html`: có gallery 1 ảnh lớn + 4 thumbnail. Cần kiểm tra có bảng thông số 2 cột + nút zoom chưa.

✅ Cấu trúc này khớp với 2 tài liệu sản phẩm chính thức trên Drive (đều mở đầu bằng bảng Thông số/Mô tả) → dữ liệu trong [data/products.json](../data/products.json) đã đúng dạng.

---

## Giải pháp / Dịch vụ / Dự án — cấp 1 (STT 5.0, 8.0, 11.0)

**Cả 3 trang dùng chung 1 mockup** (`p5-7-9-cap1-D.png`) — khớp với text Excel *"cấu trúc hiển thị tương tự trang giải pháp cấp 1"*.

Mockup: tiêu đề trang in hoa canh giữa → heading phụ + gạch chân ngắn + đoạn intro → **grid 3 cột ảnh lớn bo góc, chú thích IN HOA canh giữa dưới ảnh**. Không mô tả, không nút, không badge.

| Trang | Demo hiện tại | Kết luận |
|---|---|---|
| Giải pháp | 3 khối **zig-zag lớn** có bullet list + nút CTA riêng | 🔴 Lệch hoàn toàn |
| Dịch vụ | 4 khối dọc có mô tả | 🔴 Lệch hoàn toàn |
| Dự án | Grid 3 cột — **gần đúng**, nhưng thẻ có badge trạng thái + dòng địa điểm + mô tả | ⚠️ Lệch phần thẻ |

## Giải pháp / Dịch vụ / Dự án — cấp 2 (STT 6.0, 9.0, 12.0)

**Cả 3 dùng chung mockup** `p6-8-10-cap2-D.png`: tiêu đề in hoa canh giữa → các đoạn văn xuôi full-width → ảnh canh giữa + **caption in nghiêng dưới ảnh**.

Demo: **chưa có trang nào**. Excel còn yêu cầu thêm form đăng ký tư vấn cuối bài (mockup không thấy, nhưng text Excel ghi rõ → giữ theo text).

🔴 Thiếu 3 template trang.

---

## Tin tức

### Cấp 1 (STT 13.0) — `p13-tintuc-c1-D.png`

Mockup: grid **3 cột × nhiều hàng**, thẻ: ảnh bo góc → **ngày (xám nhỏ)** → tiêu đề → "Xem chi tiết →". **Không có sidebar.**

Demo: 3 cột × 4 hàng ✅ đúng, **có sidebar** (chuyên mục + bài viết gần đây + tìm kiếm), thẻ có nhãn chuyên mục.

⚠️ Câu hỏi treo ở README — *"sidebar giữ hay bỏ"* — **mockup trả lời: bỏ.** Excel cũng chỉ ghi "3 cột 4 hàng", không đề cập sidebar.

### Cấp 2 (STT 14.0) — `p14-tintuc-c2-D-*.png`

Mockup: "BÀI VIẾT" canh giữa → tiêu đề bài in hoa màu thương hiệu → **badge ngày canh giữa trên đường kẻ ngang** → hàng meta: **"Tác giả: xxx"** bên trái + **"Share post:" + icon Facebook/Zalo/Twitter** bên phải → sapo → ảnh + caption.

Demo: chưa có trang bài viết chi tiết.

🔴 Thiếu template. Cần bổ sung field **tác giả** và **nút share** vào [data/news.json](../data/news.json).

---

## Liên hệ (STT 15.0) — ô G13, 3 ảnh

Mockup, thứ tự: **ảnh nhà máy full-width bo góc** → "LIÊN HỆ" canh giữa → "Nhận báo giá" + gạch chân + dòng *"Leave us a message!"* → **form 2 cột** → **danh sách địa chỉ** (icon ghim + nhãn in đậm + địa chỉ, mỗi cơ sở 1 dòng) → **bản đồ Google full-width**.

Form trong mockup — 8 field, khớp gần như tuyệt đối với demo:

| Field | Mockup | Demo |
|---|---|---|
| Họ và tên | ✅ bắt buộc | ✅ bắt buộc |
| Số điện thoại | ✅ bắt buộc | ✅ bắt buộc |
| Địa chỉ (input) | có | ❌ thiếu |
| Email | không bắt buộc | **đang bắt buộc** |
| Tên công ty | không bắt buộc | **đang bắt buộc** |
| Lĩnh vực hoạt động | không bắt buộc | **đang bắt buộc** |
| Loại máy cần tư vấn | không bắt buộc | **đang bắt buộc** |
| Độ dày vật liệu | không bắt buộc | **đang bắt buộc** |
| Địa chỉ (textarea) | có | ✅ có |

⚠️ Demo đang đặt **cả 8 field là bắt buộc**, mockup chỉ 2. Nên sửa — bắt buộc quá nhiều field làm giảm tỷ lệ điền form.

Lưu ý: mockup có **2 field "Địa chỉ"** (1 input + 1 textarea) — nhìn như lỗi của chính site tham chiếu. Demo chỉ có 1 textarea, mình cho là hợp lý hơn, giữ nguyên.

CTWELD chỉ có 1 địa chỉ, nên phần danh sách địa chỉ 5 dòng của mockup sẽ rút còn 1 dòng.

---

## Tổng hợp mức độ lệch

| Mức | Số hạng mục | Gồm |
|---|---|---|
| 🔴 Phải làm lại | 7 | Responsive toàn site; Về chúng tôi (3 section); Danh mục SP trang chủ; Giải pháp cấp 1; Dịch vụ cấp 1; + 4 template còn thiếu (GP/DV/DA cấp 2, tin tức cấp 2) |
| ⚠️ Sửa vừa | 9 | Về chúng tôi trang chủ; Dòng máy nổi bật; Dự án nổi bật; Nhà cung cấp; Tin tức trang chủ; SP cấp 1; Dự án cấp 1; Tin tức cấp 1 (bỏ sidebar); Form liên hệ |
| ✅ Khớp | 2 | Banner trang chủ; cấu trúc dữ liệu sản phẩm cấp 2 |

## Việc phát sinh ngoài danh sách cũ

1. **Responsive / Sheet 2 chưa làm gì** — việc lớn nhất.
2. Cần **4 template trang mới**: giải pháp cấp 2, dịch vụ cấp 2, dự án cấp 2, tin tức cấp 2.
3. Cần thêm field **tác giả** + **nút share** cho bài viết.
4. Cần **danh sách sản phẩm theo từng danh mục** để dựng mục 4.0 trang chủ (list trong card, không phải mô tả).
5. Bỏ **sidebar** trang tin tức (mockup đã trả lời câu hỏi treo).
6. Cần **file logo thật** của nhà cung cấp.
7. Cân nhắc **tab "Khuyến mại và sự kiện"** ở mục 6.0 — có trong mockup, không có trong text Excel.


---

# Việc đã làm (17/08/2026)

## File mới

| File | Nội dung |
|---|---|
| `giai-phap-chi-tiet.html` | Template giải pháp cấp 2 (STT 6.0) + form tư vấn cuối bài |
| `dich-vu-chi-tiet.html` | Template dịch vụ cấp 2 (STT 9.0) + form tư vấn cuối bài |
| `du-an-chi-tiet.html` | Template dự án cấp 2 (STT 12.0) + form tư vấn cuối bài |
| `tin-tuc-chi-tiet.html` | Template tin tức cấp 2 (STT 14.0) — có tác giả + nút share, **không** form |
| `docs/mockup/` | 39 ảnh mockup giải nén, đặt tên theo ô Excel |
| `docs/audit-mockup.md` | Chính file này |

## Trang chủ

| Mục | Thay đổi |
|---|---|
| 3.0 | 4 ô số liệu 2×2 (nhãn trên → kẻ ngang → số lớn dưới), bổ sung ô "Khách Hàng Doanh Nghiệp 200+"; bỏ gallery 3 thumbnail, dùng 1 ảnh đơn; nút "Xem thêm về chúng tôi" viền tròn canh giữa |
| 4.0 | Card danh mục dựng lại: ảnh lớn → tên danh mục nền xám → **danh sách 5 sản phẩm có đường kẻ** → "Xem thêm +" |
| 5.0 | Grid tĩnh → **carousel** 3 thẻ/khung, mũi tên tròn đè hai bên + dot; thẻ đổi từ `MOD:`/tag/3 spec sang **excerpt + Hãng sản xuất + Model**; nâng từ 4 lên 6 sản phẩm, 2 sản phẩm chính thức xếp đầu; CTA "XEM TẤT CẢ" lên góc trên phải |
| 6.0 | Thêm **tab "Dự án \| Khuyến mại và sự kiện"**; mũi tên + "Xem tất cả" chuyển lên góc trên phải; thẻ bỏ badge trạng thái và dòng địa điểm, tiêu đề in hoa + icon mũi tên chéo |
| 7.0 | Thêm **mũi tên ‹ ›** hai bên băng logo (bấm thì tạm dừng chạy tự động và cuộn tay) |
| 8.0 | Carousel 3.5 thẻ → **grid 3 thẻ**; CTA lên góc trên phải; thẻ bỏ nhãn chuyên mục, chỉ còn ngày |

## Trang con

| Trang | Thay đổi |
|---|---|
| `ve-chung-toi.html` | Dựng lại đúng 4 section mockup: intro không banner → Tầm nhìn/Sứ mệnh **2 khối zig-zag ảnh lớn** → Giá trị cốt lõi **section riêng 5 cột card** → Nhà cung cấp chiến lược. Hai section demo (công trình, quá trình hình thành) giữ lại đặt sau |
| `san-pham.html` | **Nhóm theo danh mục** (tiêu đề danh mục in hoa màu thương hiệu + grid 3 thẻ); thẻ đổi sang Hãng sản xuất/Model + nút "Xem chi tiết"; bỏ banner tối, thêm tiêu đề "SẢN PHẨM" + Sapo theo Excel mục 2.0; giữ sidebar lọc (Excel yêu cầu) |
| `san-pham-chi-tiet.html` | Thêm **nút zoom + lightbox** trên ảnh chính; bảng thông số 3 cột → **2 cột "Thông số / Mô tả"**; đổi tiêu đề thành "Mô tả sản phẩm" |
| `giai-phap.html` | Khối zig-zag → **grid 3 cột ảnh + chú thích in hoa** theo mockup dùng chung cho 3 trang cấp 1 |
| `dich-vu.html` | Khối dọc → grid 3 cột (4 dịch vụ) |
| `du-an.html` | Thẻ bỏ badge trạng thái + địa điểm + mô tả, về dạng ảnh + chú thích in hoa; giữ 12 dự án + phân trang |
| `tin-tuc.html` | **Bỏ sidebar** (mockup không có), thay bằng bộ lọc chuyên mục dạng pill; thẻ bỏ nhãn chuyên mục, chỉ còn ngày |
| `lien-he.html` | Dựng lại theo mockup: hero ảnh trụ sở bo góc → "LIÊN HỆ" canh giữa → "Nhận báo giá" + form 2 cột → danh sách địa chỉ có icon → bản đồ full-width |
| Toàn bộ | Form chỉ còn **2 field bắt buộc** (họ tên + SĐT) thay vì 8; chèn drawer mobile + lightbox |

## Còn treo — chờ khách hàng

1. **Google Docs "Về chúng tôi" vẫn HTTP 401** — chưa lấy được nội dung chính thức.
2. **5 giá trị cốt lõi là bản draft** — soạn từ nội dung CTWELD có thật, không sao chép 5 giá trị của weldcom.vn. Cần duyệt.
3. **Nội dung 4 template cấp 2 là draft** — soạn từ 2 tài liệu sản phẩm chính thức. Cần duyệt.
4. Ảnh banner, ảnh dự án, ảnh sản phẩm thật (79 ảnh Unsplash còn lại); file logo nhà cung cấp.
5. Chuyên mục "TIN KỸ THUẬT": gộp vào "Tin tức ngành" hay mở chuyên mục 7.4?
6. Tab "Khuyến mại và sự kiện" đang để trạng thái rỗng — cần nội dung, hoặc bỏ tab nếu không dùng.
7. Số điện thoại thứ ba `0789.6?6.444` trên biển hiệu trong ảnh trụ sở.
8. Số liệu 4 ô thống kê trang chủ (12+ / 350+ / 200+ / 99.8%).
9. Tên tác giả thật cho từng bài viết.
10. Bản dịch tiếng Anh (Excel yêu cầu song ngữ).
