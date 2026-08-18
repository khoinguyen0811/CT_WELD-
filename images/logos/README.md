# Logo nhà cung cấp

Thả file logo **tách nền (PNG trong suốt)** vào đây, đặt tên đúng như bảng dưới.
Không cần sửa code — trang sẽ tự hiển thị logo thay cho tên chữ.

| Thương hiệu | Tên file cần đặt |
|---|---|
| FANUC | `fanuc.png` |
| YASKAWA | `yaskawa.png` |
| MEGMEET | `megmeet.png` |
| ESTUN | `estun.png` |
| AOTAI | `aotai.png` |
| KEYENCE | `keyence.png` |
| LINCOLN ELECTRIC | `lincoln-electric.png` |
| HYPERTHERM | `hypertherm.png` |
| RAYTOOLS | `raytools.png` |

Khuyến nghị: nền trong suốt, chiều cao ≥ 96px, cân giữa, không viền thừa.
CSS đang hiển thị ở `max-height: 46px`, lọc xám và sáng lên khi rê chuột.

**Khi chưa có file:** `js/main.js` bắt sự kiện `error` của ảnh, thêm class
`.no-logo` để ẩn `<img>` và hiện lại tên chữ — nên không bao giờ thấy ảnh vỡ.

**Lưu ý:** danh sách 9 hãng này do AI đề xuất, file Excel không liệt kê hãng nào
(chỉ ghi *"Cần bổ sung thông tin danh sách các nhà cung cấp"*). Cần khách hàng
xác nhận danh sách và quyền sử dụng logo trước khi lên production.
