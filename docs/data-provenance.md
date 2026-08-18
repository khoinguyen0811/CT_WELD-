# Data nào là GỐC, data nào do AI tạo mẫu

Kiểm tra ngày 18/08/2026, đối chiếu source hiện tại (`3bc7064`) với:
- `1_Cấu trúc Website _ CT WELD.xlsx` — 3 sheet, 401 chuỗi text
- 7 Google Docs của khách hàng (5 SAPO/nội dung + 2 tài liệu sản phẩm)
- 3 file ảnh trên Google Drive

Ký hiệu: **GỐC** = khớp nguồn khách hàng · **GỐC (sửa chữ)** = đúng ý nhưng đã viết lại/rút gọn · **AI** = hoàn toàn do AI soạn để dựng giao diện

---

## Tóm tắt nhanh

| Nhóm | Tình trạng |
|---|---|
| Thông tin doanh nghiệp, liên hệ, mạng xã hội | ✅ GỐC |
| Cấu trúc menu 8 mục + danh mục con | ✅ GỐC |
| SAPO trang Sản phẩm / Dịch vụ / Dự án | ✅ GỐC |
| SAPO trang Giải pháp | ❌ **đã bị mất khỏi site** |
| Trang Về chúng tôi (intro, lịch sử, tầm nhìn, sứ mệnh, 6 giá trị) | ✅ GỐC (mô tả 6 giá trị có rút gọn) |
| Số liệu "6+ năm" và "2025" | ✅ GỐC |
| Số liệu "350+ dự án" và "99.8%" | ❌ AI bịa |
| 12 dự án | ❌ AI bịa 100% |
| 12 bài tin tức | ❌ AI bịa 100% |
| 11 sản phẩm trên trang danh mục | ⚠️ 2 tên GỐC + 9 AI bịa |
| Nội dung chi tiết 2 sản phẩm chính thức | ⚠️ có trong JSON, **chưa render ra web** |
| Nội dung 3 giải pháp + 4 dịch vụ | ❌ AI bịa |
| 9 hãng nhà cung cấp | ❌ AI bịa |
| Ảnh | ⚠️ 22 chỗ dùng ảnh thật / 61 chỗ còn ảnh stock Unsplash |

---

## 1. Dữ liệu GỐC — dùng được ngay

### 1.1 Thông tin doanh nghiệp (Excel Sheet 1, mục 9.0)
Xuất hiện ở footer cả 13 trang:

| Trường | Giá trị | Ghi chú |
|---|---|---|
| MST | 0111059841 | chỉ có ở `ve-chung-toi.html` |
| Địa chỉ | 6.10, Khai Sơn Town, Thượng Thanh, Long Biên, Hà Nội | 13/13 trang |
| Hotline | 0866 060 894 | 13/13 trang |
| Email | minhtuan@ctweld.vn | 13/13 trang |
| Facebook | facebook.com/ctweld.SME | 13/13 trang |
| Youtube | youtube.com/@ctweld_SME | 13/13 trang |
| Tiktok | tiktok.com/@ctweld_sme | 13/13 trang |
| Messenger | m.me/ctweld.SME | quick contact bar |

**Thiếu so với Excel:** link **Pinterest** (`pinterest.com/ctweld_SME`) có trong Excel nhưng chưa gắn lên site. Tên pháp nhân đầy đủ "CÔNG TY TNHH DỊCH VỤ KỸ THUẬT VÀ GIẢI PHÁP CƠ KHÍ CTWELD" cũng chưa xuất hiện dạng đầy đủ ở footer.

### 1.2 Cấu trúc menu (Excel Sheet 1, mục 1.0)
**Khớp 15/15 mục** — 7 mục chính + 8 danh mục con đều đúng tên trong Excel.

Khác biệt duy nhất: Excel ghi **"Về chúng tôi"**, site hiển thị **"Giới thiệu"**.

### 1.3 SAPO các trang danh mục (Google Docs)

| Trang | Nguồn | Tình trạng |
|---|---|---|
| Sản phẩm | Doc `1gALiv…` | ✅ đang hiển thị |
| Dịch vụ | Doc `1hetkjJ…` | ✅ đang hiển thị |
| Dự án | Doc `1Ku953…` | ✅ đang hiển thị |
| **Giải pháp** | Doc `1VBRd2…` | ❌ **mất khỏi site** khi trang được thiết kế lại |

### 1.4 Trang Về chúng tôi (Google Docs `1JKgaj…`)
Nội dung chính thức, đang hiển thị đúng:
- Đoạn giới thiệu mở đầu — nguyên văn
- "Lịch sử hình thành và phát triển" — nguyên văn, gồm mốc **thành lập 2025** và **hơn 6 năm kinh nghiệm**
- Tầm nhìn — nguyên văn
- Sứ mệnh — nguyên văn
- **6 giá trị cốt lõi** — đúng cả 6 tiêu đề (Chất Lượng Hàng Đầu, Công Nghệ Tiên Phong, Khách Hàng Là Trung Tâm, Đổi Mới & Sáng Tạo, Trách Nhiệm & Uy Tín, Phát Triển Bền Vững). Phần **mô tả đã rút ngắn** so với doc để vừa layout timeline.

### 1.5 Ảnh thật từ Drive
3 file, đang dùng ở 22 vị trí: `tam-nhin.jpg` (trụ sở), `su-menh.jpg` (dây chuyền robot hàn), `han-3-trong-1.png` (render máy PHJ-0618CT2M).

---

## 2. Dữ liệu AI tạo mẫu — PHẢI thay trước khi lên production

### 2.1 Dự án — 12/12 bịa
Toàn bộ tên dự án, khách hàng, địa điểm, mô tả trên `du-an.html` và mục 6.0 trang chủ đều do AI soạn.

⚠️ **Rủi ro pháp lý:** các tên đang dùng là **thương hiệu có thật** — Zamil Steel, VinFast, Đại Dũng, ATAD, BMB Steel, Hòa Phát, Thaco, Lilama 10, Tân Á Đại Thành, Seico. CTWELD thành lập 2025, chưa xác nhận có hợp tác với các đơn vị này. **Phải bỏ hoặc được khách hàng xác nhận bằng văn bản** trước khi công khai.

### 2.2 Tin tức — 12/12 bịa
Tiêu đề, ngày đăng, mô tả, tác giả đều là mẫu. Chưa có bài viết thật nào.

### 2.3 Sản phẩm — 2 gốc / 9 bịa
- **GỐC (tên):** Máy phun bi CT1020-10, Máy hàn dầm H 3 trong 1 PHJ-0618CT2M
- **AI bịa:** Cobot Estun CO-ARC 350, SAW-1250, Laser Fiber 12000W, Nắn dầm 1000T, Yaskawa AR1440, Megmeet PM500A, Cắt ống 3D, Cần cột SAW, Fanuc ARC Mate 120iD — kèm toàn bộ thông số kỹ thuật

**Điểm quan trọng:** nội dung chi tiết chính thức của 2 sản phẩm gốc (~34.600 ký tự: bảng thông số, 12–13 mục nội dung, bảng so sánh, FAQ) đã nằm đầy đủ trong `data/products.json` nhưng **chưa được render ra HTML**. Trang `san-pham-chi-tiet.html` hiện đang hiển thị Cobot Estun CO-ARC 350 — một sản phẩm AI bịa.

### 2.4 Giải pháp và Dịch vụ — nội dung bịa
Excel chỉ chốt **tên** 3 giải pháp và 4 dịch vụ (mục 4.1–4.3, 5.1–5.4). Toàn bộ phần mô tả, lợi ích, số liệu (+50% năng suất, −70% nhân công, 100% NDT), sơ đồ 5 bước, ma trận ROI đều do AI soạn.

Excel ghi rõ ở cột LƯU Ý NỘI BỘ: *"Cần bổ sung thông tin các giải pháp"* và *"Cần bổ sung thông tin các dịch vụ"*.

### 2.5 Nhà cung cấp — 9/9 bịa
FANUC, YASKAWA, MEGMEET, ESTUN, AOTAI, KEYENCE, LINCOLN ELECTRIC, HYPERTHERM, RAYTOOLS.

Excel **không liệt kê hãng nào**, chỉ ghi *"Cần bổ sung thông tin danh sách các nhà cung cấp"*. AOTAI và KEYENCE có căn cứ (được nêu trong tài liệu sản phẩm PHJ-0618CT2M), 7 hãng còn lại là suy đoán. Chưa có file logo thật.

### 2.6 Số liệu trang chủ — 2 gốc / 2 bịa

| Ô | Giá trị | Nguồn |
|---|---|---|
| Năm kinh nghiệm | 6+ | ✅ GỐC — doc ghi "hơn 6 năm kinh nghiệm" |
| Năm thành lập | 2025 | ✅ GỐC — doc ghi "thành lập vào năm 2025" |
| Dự án bàn giao | 350+ | ❌ AI bịa — **mâu thuẫn với năm thành lập 2025** |
| Độ chính xác kỹ thuật | 99.8% | ❌ AI bịa, không có nguồn |

### 2.7 Nội dung 4 trang cấp 2
`giai-phap-chi-tiet.html`, `dich-vu-chi-tiet.html`, `du-an-chi-tiet.html`, `tin-tuc-chi-tiet.html` — bố cục đúng mockup, nhưng **toàn bộ bài viết là AI soạn**.

### 2.8 Ảnh
**61 vị trí** vẫn dùng ảnh stock Unsplash. Chỉ 22 vị trí dùng ảnh thật của khách hàng.

### 2.9 Văn bản giao diện
Câu chào topbar, tiêu đề section, subtitle, placeholder form, nhãn nút — do AI soạn (Excel không quy định phần này).

---

## 3. Việc cần làm

**Ưu tiên cao — rủi ro nếu để nguyên:**
1. Bỏ hoặc xin xác nhận 10 tên thương hiệu trong mục dự án
2. Sửa/bỏ số liệu 350+ dự án (mâu thuẫn năm thành lập)
3. Khôi phục SAPO Giải pháp đã mất

**Cần khách hàng cấp nội dung:**
4. Danh sách sản phẩm đầy đủ (hiện 2/N có tài liệu)
5. Dự án thật, bài viết thật
6. Nội dung giải pháp và dịch vụ
7. Danh sách + logo nhà cung cấp
8. Ảnh thật thay 61 ảnh stock
9. Link Pinterest, Zalo OA, Linkedin, Instagram

**Kỹ thuật:**
10. Render nội dung chính thức 2 sản phẩm từ `data/products.json` ra trang chi tiết, thay sản phẩm demo
