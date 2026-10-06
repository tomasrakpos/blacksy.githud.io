# BLACKSY GAME

فروشگاه فارسی بازی و تجهیزات گیمینگ با storefront عمومی و Admin Panel جداگانه.

## اجرای محلی

در دو ترمینال از ریشه‌ی پروژه اجرا کنید:

```bash
python3 dev_server.py
python3 admin_server.py
```

فروشگاه: `http://localhost:4173` · پنل: `http://localhost:4174`

سرورهای محلی فقط فایل‌های استاتیک را ارائه می‌کنند؛ داده‌های Auth، محصولات، سفارش‌ها، پروفایل و گفتگوها از Supabase می‌آیند. توابع دعوت/حذف Admin در اجرای استاتیک محلی فعال نیستند.

## Backend

- Migration/RLS/RPC/Storage/Realtime: `schema.sql`
- کلید عمومی Supabase: `js/supabase-config.js` و `admin-panel/js/supabase-config.js`
- Netlify Functions امن پنل: `admin-panel/netlify/functions/`
- فایل seed کاتالوگ: `admin-panel/data/products.seed.json`
- راهنمای استقرار دو دامنه: `DEPLOY.md`

**وضعیت:** کد backend آماده‌ی اجرای migration است؛ migration واقعی و Deploy هنوز انجام نشده‌اند. درگاه پرداخت هم هنوز فعال نیست. قبل از انتشار، `DEPLOY.md` را دنبال کنید.
