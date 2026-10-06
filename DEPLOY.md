# راه‌اندازی BLACKSY GAME — Supabase و Netlify

## وضعیت اجرا

کد اتصال فروشگاه، پنل مدیریت و migration آماده شده؛ **هیچ SQL روی پروژه‌ی واقعی اجرا نشده و هیچ سایت Netlify deploy نشده است**. پیش از انتشار، migration را با دسترسی مدیر Supabase اجرا و smoke testها را انجام دهید.

## ۱) آماده‌سازی Supabase

1. از دیتابیس/پروژه‌ی فعلی backup بگیرید.
2. در Supabase → **SQL Editor**، محتوای `/schema.sql` را یک‌بار اجرا کنید. این فایل جدول‌های `profiles`, `products`, `orders`, `support_threads`, `site_content`، RLS و کمترین دسترسی لازم، triggerها، RPCهای سفارش/پشتیبانی، Storage policyهای آواتار و تصاویر محصول، و Realtime را آماده می‌کند. اجرای مجدد برای به‌روزرسانی طراحی شده، اما policyها و triggerهای همان جدول‌های فروشگاه را با نسخه‌ی این پروژه جایگزین می‌کند.
3. در **Project Settings → API** آدرس پروژه و کلید عمومی (publishable یا anon) را بردارید. آن‌ها را فقط در این دو فایل قرار دهید:
   - `js/supabase-config.js`
   - `admin-panel/js/supabase-config.js`
   این کلید عمومی است؛ کلید `service_role`/secret را هرگز در این فایل‌ها، Git، HTML یا مرورگر قرار ندهید.
4. در **Authentication → Users** حساب `admin@blakci.ir` را بسازید و رمز درخواستی مدیر را فقط از Dashboard/Auth روی همان حساب تنظیم کنید؛ رمز در این مخزن ذخیره نمی‌شود.
5. پس از ساخته‌شدن حساب، در SQL Editor این bootstrap را با ایمیل همان حساب اجرا کنید:

   ```sql
   update public.profiles
   set role = 'admin'
   where email = 'admin@blakci.ir';
   ```

   اگر نتیجه‌ی `UPDATE 0` بود، Auth user هنوز ساخته نشده یا ایمیل دقیق نیست. پنل نام `blakci_admin` را به همین ایمیل تبدیل می‌کند و نقش `admin` را هم جداگانه بررسی می‌کند.
6. در **Authentication → URL Configuration**، دامنه‌ی واقعی storefront را برای Site URL و redirect مجاز تأیید ایمیل ثبت‌نام اضافه کنید؛ کد، لینک تأیید را به `${location.origin}/profile` برمی‌گرداند، پس مسیر `/profile` هم باید در Redirect URLs مجاز باشد.
7. تنظیمات فعلی پروژه ایمیل را روشن و تأیید ایمیل را اجباری نگه می‌دارد (`mailer_autoconfirm=false`). سرویس SMTP پیش‌فرض Supabase محدود است: فقط به آدرس اعضای تیم پروژه ایمیل می‌فرستد و سقف فعلی آن ۲ ایمیل در ساعت است. برای ثبت‌نام کاربران عادی، SMTP سفارشی را در **Authentication → SMTP Settings** فعال و آزمایش کنید؛ host، port، username/password و آدرس فرستنده‌ی تأییدشده را از سرویس ایمیل بگیرید. برای تست محلی می‌توان موقتاً از **Authentication → Sign In / Providers → Email → Confirm email** تأیید را خاموش کرد؛ این کار ایمیل‌ها را تأییدشده فرض می‌کند و برای سایت عمومی توصیه نمی‌شود.

اگر ثبت‌نام خطای **Database error saving new user** داد، جدول `public.profiles` یا trigger ثبت‌نام آماده نیست: در پروژه‌ی تازه، کل `schema.sql` را اجرا کنید؛ اگر بقیه‌ی schema از قبل نصب است، `profile-migration.sql` را برای ترمیم پروفایل اجرا کنید.

## ۲) انتشار دو سایت مجزا در Netlify

### فروشگاه عمومی

- یک Netlify Site بسازید که publish directory آن ریشه‌ی پروژه (`.`) باشد؛ `netlify.toml` ریشه، SPA fallback و security headers فروشگاه را دارد.
- دامنه‌ی عمومی فروشگاه را به این Site متصل کنید.
- متغیر server-side با Service Role برای این سایت لازم نیست؛ مرورگر فقط URL و کلید عمومی Supabase را دارد.

### پنل مدیریت خصوصی

- یک **Netlify Site جداگانه** از همان مخزن بسازید، با base directory برابر `admin-panel/` و publish directory برابر `.`؛ تنظیمات توابع در `admin-panel/netlify.toml` است.
- این Site را به دامنه‌ی اختصاصی مدیریت متصل کنید؛ آن را زیر مسیر عمومی فروشگاه منتشر نکنید و لینکی از سایت عمومی به آن نسازید. `noindex` فقط جلوی ایندکس معمول را می‌گیرد و جای احراز هویت/RLS را نمی‌گیرد.
- فقط در محیط server-side همین Site، متغیرهای زیر را تنظیم کنید:
  - `SUPABASE_URL` — URL پروژه
  - `SUPABASE_ANON_KEY` — کلید عمومی پروژه (برای اعتبارسنجی درخواست مدیر)
  - `SUPABASE_SERVICE_ROLE_KEY` — کلید secret/service-role؛ فقط برای invite/delete در Netlify Functions، هرگز در کد مرورگر
  - `ADMIN_ORIGIN` — origin دقیق پنل، مانند `https://admin.example.com`، بدون slash انتهایی
- `SUPABASE_SERVICE_ROLE_KEY` را در Site فروشگاه عمومی تنظیم نکنید. توابع مدیریت، Bearer token را با Supabase Auth و نقش `profiles.role='admin'` اعتبارسنجی می‌کنند و Origin پنل را هم کنترل می‌کنند.
- برای توابع، Node runtime پیش‌فرض Netlify کافی است؛ package build جداگانه لازم نیست.

## ۳) راه‌اندازی کاتالوگ و تست

1. بعد از اجرای migration و ارتقای نقش مدیر، وارد پنل شوید.
2. در بخش «امنیت و دیتابیس» ابتدا «تست اتصال و نقش مدیر» را بزنید؛ سپس «ارسال کاتالوگ اولیه به Supabase». این کار فقط وقتی جدول خالی است seed می‌کند و اگر داده وجود داشته باشد آن را بی‌اجازه بازنویسی نمی‌کند.
3. در SQL Editor یا Table Editor وجود پنج جدول، policyها، bucketهای `avatars` خصوصی و `product-assets` عمومی، و انتشار Realtime برای `products`, `orders`, `support_threads`, `site_content` را بررسی کنید.
4. Smoke test: ثبت‌نام/تأیید ایمیل، ورود مدیر، تغییر یک محصول و مشاهده‌ی آن در storefront، آواتار خصوصی، ثبت سفارش آزمایشی با قیمت تأییدشده، لغو و بازگشت موجودی، ارسال/پاسخ گفت‌وگوی پشتیبانی و دریافت تغییر زنده.
5. هنوز درگاه بانکی متصل نیست؛ RPC سفارش را با مبلغ محاسبه‌شده از دیتابیس و وضعیت `pending` ثبت می‌کند، ولی وجهی دریافت نمی‌شود. پرداخت را فقط پس از افزودن درگاه و callback امن فعال کنید.

## ۴) توسعه‌ی محلی

در دو ترمینال از ریشه‌ی پروژه:

```bash
python3 dev_server.py
python3 admin_server.py
```

فروشگاه روی `http://localhost:4173` و پنل روی `http://localhost:4174` بالا می‌آید. این دو سرور استاتیک‌اند؛ Netlify Functions دعوت/حذف کاربر روی سرور محلی اجرا نمی‌شوند. برای آزمودن آن‌ها از Netlify CLI یا deployment جداگانه استفاده کنید.

## نکات امنیتی

- دسترسی سفارش مستقیم به جدول INSERT ندارد؛ RPC قیمت را از `products` می‌خواند، مجموع را خودش محاسبه می‌کند و موجودی محدود را رزرو می‌کند. لغو/حذف سفارش باز موجودی رزروشده را برمی‌گرداند.
- سفارش مهمان و گفت‌وگوی مهمان با secret تصادفی ۲۵۶بیتی محافظت می‌شوند؛ فقط hash آن در دیتابیس نگهداری می‌شود.
- Broadcast عمومی پشتیبانی فقط ping خالی است؛ متن پیام و اطلاعات تماس در payload سوکت قرار نمی‌گیرد. محتوای گفتگو از RPC کنترل‌شده خوانده می‌شود.
- داده‌های پویای HTML در storefront و admin باید escape شوند؛ Service Role فقط در محیط server-side و کلید عمومی در مرورگر.
