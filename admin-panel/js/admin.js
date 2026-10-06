const app = document.querySelector('#admin-app');
const money = n => n == null ? 'قیمت به‌زودی' : new Intl.NumberFormat('fa-IR').format(n) + ' تومان';
const faNum = n => new Intl.NumberFormat('fa-IR').format(n || 0);
const img = key => `https://images.unsplash.com/${key}?auto=format&fit=crop&w=600&q=80`;

let blakciSupabase,adminRealtimeChannel=null;
async function getSupabaseClient() {
  if (blakciSupabase) return blakciSupabase;
  const [sdk, config] = await Promise.all([
    import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'),
    import('./supabase-config.js')
  ]);
  if (!config.SUPABASE_URL || !config.SUPABASE_ANON_KEY) throw new Error('Supabase is not configured');
  blakciSupabase = sdk.createClient(config.SUPABASE_URL, config.SUPABASE_ANON_KEY, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
  });
  return blakciSupabase;
}

function toast(text) {
  const el = document.querySelector('#toast');
  if (!el) return;
  el.textContent = text;
  el.classList.add('show');
  clearTimeout(window.__adminToastTimer);
  window.__adminToastTimer = setTimeout(() => el.classList.remove('show'), 3200);
}

const DEFAULT_HOME_CONTENT = {
  slides: [
    {id:'gta',label:'GTA VI',badge:'پیشنهاد ویژه امروز',title:'اکانت GTA VI',description:'دنیای باز، شب‌های نئونی، ماجراجویی بی‌پایان',chips:['تحویل سریع','پشتیبانی ۲۴ ساعته'],cta_label:'مشاهده و خرید',cta_href:'/product/22',image:'/assets/slider/gta-vi.webp',accent:'#ff4f8b',accent2:'#ffb04a',enabled:true,position:1},
    {id:'fc27',label:'FC 27',badge:'جدید و پرطرفدار',title:'EA SPORTS FC 27',description:'فوتبال را از نو تجربه کن، گل بزن و قهرمان شو',chips:['نسخه کنسول و PC','تحویل فوری'],cta_label:'مشاهده و خرید',cta_href:'/product/21',image:'/assets/slider/fc-27.webp',accent:'#2ee66b',accent2:'#b6f25a',enabled:true,position:2},
    {id:'cod',label:'بلک آپس ۷',badge:'اکشن و رقابتی',title:'کال آف دیوتی: بلک آپس ۷',description:'نسخه‌ی Standard دیجیتال برای PC / Steam؛ وارد میدان شو.',chips:['PC / Steam','نسخه Standard'],cta_label:'مشاهده و خرید',cta_href:'/product/69',image:'/assets/slider/call-of-duty.webp',accent:'#ff8a1f',accent2:'#ffc04a',enabled:true,position:3},
    {id:'forza',label:'فورزا ۵',badge:'مسابقه و ماجراجویی',title:'فورزا هورایزن ۵',description:'نسخه‌ی Standard دیجیتال برای Xbox و PC؛ به جاده‌های مکزیک بزن.',chips:['Xbox و PC','کد دیجیتال'],cta_label:'مشاهده و خرید',cta_href:'/product/39',image:'/assets/slider/forza-horizon-5.webp',accent:'#ffb34a',accent2:'#ff6a3d',enabled:true,position:4},
    {id:'nightreign',label:'نایت‌رین',badge:'نقش‌آفرینی حماسی',title:'الدن رینگ: نایت‌رین',description:'نسخه‌ی PS5؛ با دو هم‌تیمی تا سپیده‌دم بجنگ.',chips:['نسخه PS5','کوآپ آنلاین سه‌نفره'],cta_label:'مشاهده و خرید',cta_href:'/product/70',image:'/assets/slider/elden-ring.webp',accent:'#f2c45a',accent2:'#ffe39a',enabled:true,position:5}
  ],
  showcases: []
};

const escHtml = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
let products = [], seedProducts = [];
try { const res = await fetch('./data/products.seed.json', { cache: 'no-store' }); seedProducts = res.ok ? await res.json() : []; } catch {}

const state = {
  authenticated: false,
  adminEmail: 'admin@blakci.ir',
  theme: localStorage.getItem('blakci-admin-theme') === 'light' ? 'light' : 'dark',
  tab: 'dashboard', search: '', cat: '', modalProduct: null, catalogNeedsBootstrap: false,
  orders: [], users: [], supportThreads: [], activeThreadId: null,
  homeContent: DEFAULT_HOME_CONTENT,
  supabaseOnline: null
};
try {
  sessionStorage.removeItem('blakci-admin-auth');
  sessionStorage.removeItem('blakci-admin-email');
  localStorage.removeItem('blakci-admin-user-v2');
  localStorage.removeItem('blakci-admin-pin-v2');
} catch {}
document.documentElement.dataset.theme = state.theme;

function safeAdminImage(value) {
  const raw = String(value || '').trim();
  if (/^\/assets\/[a-z0-9_./?=&%-]+$/i.test(raw) && !raw.includes('..')) return raw;
  try { const url = new URL(raw); return url.protocol === 'https:' ? url.href : '/assets/fc-27-cover.jpg'; }
  catch { return '/assets/fc-27-cover.jpg'; }
}
function mapProductRow(row) {
  return { ...row, id: Number(row.id), cat: row.cat || row.category || 'بازی', category: row.category || row.cat || 'بازی',
    art: row.art || row.image_url || '', image_url: row.image_url || row.art || '', images: Array.isArray(row.images) ? row.images : [],
    platforms: Array.isArray(row.platforms) ? row.platforms : [], specifications: row.specifications || {}, stock: row.stock ?? null };
}
function toProductRow(p) {
  const id = Number(p.id);
  return {
    id, sku: String(p.sku || `BLG-${String(id).padStart(4, '0')}`), name: String(p.name || '').trim(), slug: p.slug || null,
    category: String(p.category || p.cat || 'بازی'), cat: String(p.cat || p.category || 'بازی'), kind: String(p.kind || 'بازی'),
    brand: String(p.brand || 'Blacksy Game'), model: String(p.model || ''), short_description: String(p.short_description || ''),
    description: String(p.description || ''), specifications: p.specifications && typeof p.specifications === 'object' ? p.specifications : {},
    price: p.price == null || p.price === '' ? null : Number(p.price), old: p.old == null || p.old === '' ? null : Number(p.old),
    stock: p.stock == null || p.stock === '' ? null : Number(p.stock), art: String(p.art || p.image_url || ''),
    image_url: String(p.image_url || p.art || ''), images: Array.isArray(p.images) ? p.images : [],
    platforms: Array.isArray(p.platforms) ? p.platforms : [], source: String(p.source || 'فروشگاه بلکسی گیم'),
    source_url: String(p.source_url || ''), price_source_url: String(p.price_source_url || ''), checked_at: String(p.checked_at || ''),
    status: String(p.status || 'active'), featured: Boolean(p.featured), is_published: p.is_published !== false
  };
}
function mapOrderRow(o) {
  return { ...o, id: String(o.id), code: o.order_code, total: Number(o.total_amount || 0),
    date: o.created_at ? new Intl.DateTimeFormat('fa-IR').format(new Date(o.created_at)) : '', items: Array.isArray(o.items) ? o.items : [] };
}
function mapProfileRow(u) {
  return { id: u.id, name: u.full_name || u.email || 'کاربر', email: u.email || '', role: u.role || 'customer',
    date: u.created_at ? new Intl.DateTimeFormat('fa-IR').format(new Date(u.created_at)) : '' };
}
function mapSupportRow(t) {
  return { thread_id: t.thread_id, customer_name: t.customer_name, customer_contact: t.customer_contact,
    status: t.status, messages: Array.isArray(t.messages) ? t.messages : [], updated_at: t.updated_at };
}

async function loadAdminData() {
  const c = await getSupabaseClient();
  const results = await Promise.all([
    c.from('products').select('*').order('id', { ascending: true }),
    c.from('orders').select('id,order_code,user_id,customer_name,customer_phone,address,postal_code,status,total_amount,items,created_at,updated_at').order('created_at', { ascending: false }).limit(500),
    c.from('profiles').select('id,email,full_name,role,created_at').order('created_at', { ascending: false }).limit(1000),
    c.from('support_threads').select('thread_id,customer_name,customer_contact,status,messages,updated_at').order('updated_at', { ascending: false }).limit(500),
    c.from('site_content').select('content').eq('id', 'home').maybeSingle()
  ]);
  const failed = results.find(result => result.error);
  if (failed) throw failed.error;
  const [productRows, orderRows, profileRows, supportRows, contentRow] = results.map(result => result.data);
  state.catalogNeedsBootstrap = !Array.isArray(productRows) || productRows.length === 0;
  products = state.catalogNeedsBootstrap ? seedProducts.map(mapProductRow) : productRows.map(mapProductRow);
  state.orders = (orderRows || []).map(mapOrderRow);
  state.users = (profileRows || []).map(mapProfileRow);
  state.supportThreads = (supportRows || []).map(mapSupportRow);
  const storedHome = contentRow?.content;
  state.homeContent = storedHome && typeof storedHome === 'object' && Array.isArray(storedHome.slides) && storedHome.slides.length
    ? storedHome : DEFAULT_HOME_CONTENT;
  if (!state.activeThreadId || !state.supportThreads.some(t => t.thread_id === state.activeThreadId)) state.activeThreadId = state.supportThreads[0]?.thread_id || null;
  state.supabaseOnline = true;
}

async function syncProducts(rows = products) {
  const c = await getSupabaseClient(), payload = rows.map(toProductRow);
  if (!payload.length) return;
  const { error } = await c.from('products').upsert(payload, { onConflict: 'id' });
  if (error) throw error;
}
async function ensureCatalogBootstrapped() {
  if (!state.catalogNeedsBootstrap) return;
  if (!seedProducts.length) throw new Error('catalog_seed_unavailable');
  const c = await getSupabaseClient();
  const { data, error } = await c.from('products').select('id').limit(1);
  if (error) throw error;
  if (!data?.length) await syncProducts(seedProducts.map(mapProductRow));
  state.catalogNeedsBootstrap = false;
}
async function saveProductRow(product, { create = false, updateStock = true } = {}) {
  const c = await getSupabaseClient(), row = toProductRow(product);
  if (create) {
    const { error } = await c.from('products').upsert(row, { onConflict: 'id' });
    if (error) throw error;
    return;
  }
  delete row.id;
  if (!updateStock) delete row.stock;
  const { data, error } = await c.from('products').update(row).eq('id', product.id).select('id').maybeSingle();
  if (error) throw error;
  if (!data) throw new Error('product_row_missing');
}
async function syncOrders() {
  const c = await getSupabaseClient();
  for (const order of state.orders) {
    const { error } = await c.from('orders').update({ status: order.status }).eq('id', order.id);
    if (error) throw error;
  }
}
async function reloadAdminData(preserveReply = true) {
  const input = document.querySelector('#admin-reply-input');
  const draft = input?.value || '', hadFocus = !!input && document.activeElement === input;
  const selectedThread = state.activeThreadId;
  await loadAdminData();
  if (selectedThread && state.supportThreads.some(t => t.thread_id === selectedThread)) state.activeThreadId = selectedThread;
  if (!state.authenticated) return;
  render();
  if (preserveReply && (draft || hadFocus)) {
    const next = document.querySelector('#admin-reply-input');
    if (next) { next.value = draft; if (hadFocus) next.focus(); }
  }
}
async function subscribeAdminRealtime() {
  if (adminRealtimeChannel) { try { const c = await getSupabaseClient(); await c.removeChannel(adminRealtimeChannel); } catch {} }
  if (!state.authenticated) return;
  const c = await getSupabaseClient();
  adminRealtimeChannel = c.channel('blacksy-admin-live')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'support_threads' }, () => reloadAdminData(true))
    .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, () => reloadAdminData(true))
    .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, () => reloadAdminData(true))
    .subscribe();
}
async function verifyAdminUser(client, user) {
  if (!user?.id) throw new Error('user_not_found');
  const { data, error } = await client.from('profiles').select('role,email').eq('id', user.id).maybeSingle();
  if (error || data?.role !== 'admin') {
    await client.auth.signOut();
    throw new Error('admin_role_required');
  }
  state.adminEmail = user.email || data.email || 'admin@blakci.ir';
  await loadAdminData();
  state.authenticated = true;
  await subscribeAdminRealtime();
}
async function adminFunction(path, body) {
  const c = await getSupabaseClient(), { data, error } = await c.auth.getSession();
  if (error || !data?.session?.access_token) throw new Error('admin_session_missing');
  const response = await fetch(`/.netlify/functions/${path}`, { method: 'POST', headers: {
    'content-type': 'application/json', authorization: `Bearer ${data.session.access_token}`
  }, body: JSON.stringify(body) });
  const result = await response.json().catch(() => ({}));
  if (!response.ok || !result.ok) throw new Error(result.error || 'admin_function_failed');
  return result;
}

function getStorefrontUrl() {
  const host = location.hostname;
  if (host.startsWith('4174-')) return `${location.protocol}//${host.replace(/^4174-/, '4173-')}`;
  if (host.startsWith('admin.')) return `${location.protocol}//${host.slice(6)}`;
  return 'https://blacksy.ir';
}

function loginView() {
  return `
    <div class="login-gate">
      <div class="login-card">
        <div class="login-brand">
          <span class="logo-mark">B</span>
          <div>
            <b>BLACKSY GAME CORE</b>
            <small>PRIVATE ADMIN DOMAIN · NOINDEX</small>
          </div>
        </div>
        <span class="security-pill">دامنه اختصاصی و مخفی مدیریت</span>
        <h1>ورود به پنل مدیریت بلکسی گیم</h1>
        <p>احراز هویت با Supabase انجام می‌شود؛ دسترسی فقط به حسابی داده می‌شود که نقش <code>admin</code> در پایگاه داده داشته باشد.</p>
        <form id="admin-login-form" class="login-form">
          <label>ایمیل یا نام کاربری مدیر
            <input name="email" type="text" required autocomplete="username" value="" dir="ltr" placeholder="blakci_admin یا admin@blakci.ir">
          </label>
          <label>رمز عبور Supabase Auth
            <input name="password" type="password" required autocomplete="current-password" value="" dir="ltr" placeholder="رمز عبور مدیر...">
          </label>
          <button type="submit" class="admin-btn primary" style="height:42px;font-size:13px">ورود امن به پنل مدیریت ←</button>
        </form>
      </div>
    </div>
  `;
}

function dashboardView() {
  const pricedCount = products.filter(p => p.price != null).length;
  const saleCount = products.filter(p => p.old && p.price && p.old > p.price).length;
  const totalRevenue = state.orders.filter(o => o.status !== 'cancelled').reduce((s, o) => s + (o.total || 0), 0);
  const statusMap = {
    pending: ['در انتظار بررسی', 'pending'],
    processing: ['در حال آماده‌سازی', 'processing'],
    shipped: ['ارسال شده', 'shipped'],
    delivered: ['تحویل شده', 'delivered'],
    cancelled: ['لغو شده', 'cancelled']
  };
  const allCats = [...new Set(products.map(p => p.cat).filter(Boolean))];
  const filteredProducts = products.filter(p => {
    const matchSearch = !state.search || `${p.name} ${p.brand || ''} ${p.model || ''} ${p.cat || ''} ${p.category || ''}`.toLocaleLowerCase().includes(state.search.toLocaleLowerCase());
    const matchCat = !state.cat || (state.cat === '__pending' ? p.price == null : state.cat === '__sale' ? Boolean(p.old && p.price) : p.cat === state.cat);
    return matchSearch && matchCat;
  });

  const modalP = state.modalProduct;
  const modalMarkup = modalP ? `
    <div class="admin-modal-backdrop" id="admin-modal-backdrop">
      <div class="admin-modal" role="dialog" aria-modal="true">
        <div class="admin-modal-head">
          <h3>${modalP.id ? `ویرایش محصول #${faNum(modalP.id)}` : 'افزودن محصول جدید به فروشگاه'}</h3>
          <button type="button" class="admin-btn" id="close-admin-modal">✕ بستن</button>
        </div>
        <form id="admin-product-form" class="admin-form-grid">
          <input type="hidden" name="id" value="${modalP.id || ''}">
          <label class="full">نام کامل محصول
            <input name="name" required value="${escHtml(modalP.name || '')}" placeholder="مثلاً کنسول PlayStation 5 Slim یا بازی GTA VI">
          </label>
          <label>برند
            <input name="brand" required value="${escHtml(modalP.brand || 'Blacksy Game')}" placeholder="مثلاً Sony، ASUS، Razer">
          </label>
          <label>مدل / کد
            <input name="model" value="${escHtml(modalP.model || '')}" placeholder="مثلاً CFI-2000 یا Viper V3">
          </label>
          <label>دسته‌ی اصلی (cat)
            <select name="cat">
              ${['بازی', 'کنسول‌ها', 'لوازم جانبی', 'سیستم گیمینگ', 'واقعیت مجازی', 'گیفت‌کارت و اشتراک'].map(c => `<option value="${c}" ${modalP.cat === c ? 'selected' : ''}>${c}</option>`).join('')}
            </select>
          </label>
          <label>نوع کالا (kind)
            <select name="kind">
              ${['بازی', 'اکانت بازی', 'کنسول بازی', 'ماوس گیمینگ', 'کیبورد گیمینگ', 'مانیتور گیمینگ', 'لوازم جانبی', 'واقعیت مجازی', 'گیفت‌کارت', 'اشتراک بازی'].map(k => `<option value="${k}" ${modalP.kind === k ? 'selected' : ''}>${k}</option>`).join('')}
            </select>
          </label>
          <label>قیمت فروش (تومان — خالی = قیمت به‌زودی)
            <input name="price" type="number" min="0" step="1000" value="${modalP.price ?? ''}" placeholder="مثلاً 3500000">
          </label>
          <label>قیمت قبل از تخفیف (اختیاری — تومان)
            <input name="old" type="number" min="0" step="1000" value="${modalP.old ?? ''}" placeholder="مثلاً 4200000">
          </label>
          <label>موجودی انبار
            <input name="stock" type="number" min="0" value="${modalP.stock ?? ''}" data-original-stock="${modalP.stock ?? ''}" placeholder="۱۰">
          </label>
          <label>پلتفرم‌ها (با کاما جدا کنید)
            <input name="platforms" value="${escHtml((modalP.platforms || ['PlayStation', 'PC']).join(', '))}" placeholder="PlayStation, Xbox, PC">
          </label>
          <label class="full">آدرس تصویر محصول یا آپلود از سیستم
            <input name="art" id="admin-art-input" value="${escHtml(modalP.art || modalP.image_url || '')}" placeholder="/assets/fc-27-cover.jpg یا لینک مستقیم تصویر">
          </label>
          <div class="full admin-img-preview">
            <img id="admin-art-preview" src="${escHtml(safeAdminImage(modalP.art || modalP.image_url || '/assets/fc-27-cover.jpg'))}" alt="پیش‌نمایش">
            <div style="flex:1">
              <small style="display:block;margin-bottom:6px;color:var(--muted)">می‌توانید فایل تصویر را مستقیماً از کامپیوتر یا موبایل انتخاب کنید:</small>
              <input type="file" id="admin-art-file" accept="image/*">
            </div>
          </div>
          <label class="full">توضیح کوتاه محصول
            <input name="short_description" value="${escHtml(modalP.short_description || '')}" placeholder="توضیح یک‌خطی در بالای صفحه محصول">
          </label>
          <label class="full">توضیحات و معرفی کامل
            <textarea name="description" placeholder="معرفی کامل ویژگی‌ها و مشخصات محصول...">${escHtml(modalP.description || '')}</textarea>
          </label>
          <div class="full" style="display:flex;justify-content:flex-end;gap:10px;margin-top:8px">
            <button type="button" class="admin-btn" id="cancel-admin-modal">انصراف</button>
            <button type="submit" class="admin-btn primary">${modalP.id ? 'ذخیره تغییرات محصول' : 'ثبت و انتشار محصول'}</button>
          </div>
        </form>
      </div>
    </div>
  ` : '';

  const openSupportCount = state.supportThreads.filter(t => t.status === 'open').length;
  let tabContent = '';
  if (state.tab === 'dashboard') {
    const pendingProducts = products.filter(p => p.price == null).slice(0, 6);
    tabContent = `
      <div class="admin-kpi-grid">
        <div class="admin-kpi"><small>کل محصولات فروشگاه</small><strong>${faNum(products.length)} کالا</strong><span>${faNum(pricedCount)} کالای قیمت‌گذاری‌شده</span></div>
        <div class="admin-kpi"><small>پیام‌های پشتیبانی</small><strong>${faNum(state.supportThreads.length)} گفتگو</strong><span>${faNum(openSupportCount)} پیام در انتظار پاسخ ادمین</span></div>
        <div class="admin-kpi"><small>سفارش‌های ثبت‌شده</small><strong>${faNum(state.orders.length)} سفارش</strong><span>${faNum(state.orders.filter(o => o.status === 'pending').length)} در انتظار بررسی</span></div>
        <div class="admin-kpi"><small>مجموع فروش ثبت‌شده</small><strong>${money(totalRevenue)}</strong><span>${faNum(state.users.length)} کاربر ثبت‌نام‌شده</span></div>
      </div>
      <div class="admin-card">
        <div class="admin-card-head">
          <h2>آخرین پیام‌های پشتیبانی کاربران (${faNum(openSupportCount)} در انتظار پاسخ)</h2>
          <button class="admin-btn primary" data-admin-tab="support">ورود به بخش پاسخگویی پشتیبانی ←</button>
        </div>
        ${state.supportThreads.length ? `
          <div class="admin-table-wrap">
            <table class="admin-table">
              <thead><tr><th>کاربر / کد گفتگو</th><th>اطلاعات تماس</th><th>آخرین پیام</th><th>وضعیت</th><th>عملیات</th></tr></thead>
              <tbody>
                ${state.supportThreads.slice(0, 4).map(t => {
                  const lastMsg = (t.messages || [])[t.messages.length - 1];
                  const isOpen = t.status === 'open';
                  return `<tr><td><b>${escHtml(t.customer_name || 'کاربر بلکسی گیم')}</b><br><small dir="ltr">${escHtml(t.thread_id)}</small></td><td>${escHtml(t.customer_contact || '—')}</td><td><small>${escHtml(lastMsg?.text || '')}</small></td><td><span class="admin-status-pill ${isOpen ? 'pending' : 'delivered'}">${isOpen ? 'در انتظار پاسخ' : 'پاسخ داده شده'}</span></td><td><button class="admin-btn primary" data-open-thread="${escHtml(t.thread_id)}">پاسخ دادن ←</button></td></tr>`;
                }).join('')}
              </tbody>
            </table>
          </div>
        ` : `<p style="color:var(--muted);margin:0">هنوز پیامی از سمت کاربران در بخش پشتیبانی ارسال نشده است.</p>`}
      </div>
      <div class="admin-card">
        <div class="admin-card-head">
          <h2>محصولات نیازمند تعیین قیمت / پیش‌فروش</h2>
          <button class="admin-btn primary" data-admin-open-modal="new">＋ افزودن محصول جدید</button>
        </div>
        ${pendingProducts.length ? `
          <div class="admin-table-wrap">
            <table class="admin-table">
              <thead><tr><th>محصول</th><th>دسته / نوع</th><th>تعیین سریع قیمت (تومان)</th><th>موجودی</th><th>عملیات</th></tr></thead>
              <tbody>
                ${pendingProducts.map(p => `
                  <tr>
                    <td><div class="admin-prod-cell"><img src="${escHtml(safeAdminImage(p.art || p.image_url || p.image))}" alt=""><div><b>${escHtml(p.name)}</b><small>${escHtml(p.brand || '')} · کد #${faNum(p.id)}</small></div></div></td>
                    <td>${escHtml(p.cat || '')} / ${escHtml(p.kind || '')}</td>
                    <td><input class="admin-inline-input" type="number" placeholder="مثلاً 2950000" data-quick-price="${p.id}" value="${p.price ?? ''}"></td>
                    <td><input class="admin-inline-input stock-input" type="number" min="0" data-quick-stock="${p.id}" value="${p.stock ?? ''}" placeholder="نامشخص"></td>
                    <td><div class="admin-row-actions"><button class="admin-btn primary" data-quick-save="${p.id}">ذخیره</button><button class="admin-btn" data-edit-product="${p.id}">ویرایش کامل</button></div></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        ` : `<p>همه محصولات دارای قیمت هستند.</p>`}
      </div>
      <div class="admin-card">
        <div class="admin-card-head">
          <h2>آخرین سفارش‌های مشتریان</h2>
          <button class="admin-btn" data-admin-tab="orders">مشاهده همه سفارش‌ها ←</button>
        </div>
        ${state.orders.length ? `
          <div class="admin-table-wrap">
            <table class="admin-table">
              <thead><tr><th>کد سفارش</th><th>مشتری</th><th>مبلغ</th><th>وضعیت</th><th>تغییر وضعیت</th></tr></thead>
              <tbody>
                ${state.orders.slice(0, 5).map(o => {
                  const st = statusMap[o.status] || statusMap.pending;
                  return `<tr><td><b>${escHtml(o.code)}</b></td><td>${escHtml(o.customer_name)} (${escHtml(o.customer_phone)})</td><td><b>${money(o.total)}</b></td><td><span class="admin-status-pill ${st[1]}">${st[0]}</span></td><td><select class="admin-select" data-order-status="${o.id}">${Object.entries(statusMap).map(([k, [label]]) => `<option value="${k}" ${o.status === k ? 'selected' : ''}>${label}</option>`).join('')}</select></td></tr>`;
                }).join('')}
              </tbody>
            </table>
          </div>
        ` : `
          <p style="color:var(--muted);margin:0">هنوز سفارشی در پایگاه داده ثبت نشده است.</p>
        `}
      </div>
    `;
  } else if (state.tab === 'products') {
    tabContent = `
      <div class="admin-card">
        <div class="admin-card-head">
          <h2>مدیریت محصولات و قیمت‌ها (${faNum(filteredProducts.length)} کالا)</h2>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            <button class="admin-btn primary" data-admin-open-modal="new">＋ افزودن محصول جدید</button>
            <button class="admin-btn" id="admin-export-json">دانلود JSON محصولات</button>
            <button class="admin-btn danger" id="admin-reset-products">بازنشانی به کاتالوگ اولیه</button>
          </div>
        </div>
        <div class="admin-toolbar">
          <input id="admin-search" class="admin-search-input" type="search" value="${escHtml(state.search)}" placeholder="جستجوی نام محصول، برند، مدل یا دسته‌بندی...">
          <select id="admin-cat-filter" class="admin-select">
            <option value="">همه دسته‌بندی‌ها</option>
            <option value="__pending" ${state.cat === '__pending' ? 'selected' : ''}>فقط بدون قیمت (پیش‌فروش)</option>
            <option value="__sale" ${state.cat === '__sale' ? 'selected' : ''}>فقط تخفیف‌دارها</option>
            ${allCats.map(c => `<option value="${escHtml(c)}" ${state.cat === c ? 'selected' : ''}>${escHtml(c)}</option>`).join('')}
          </select>
        </div>
        <div class="admin-table-wrap">
          <table class="admin-table">
            <thead><tr><th>محصول</th><th>دسته / نوع</th><th>قیمت فعلی (تومان)</th><th>قیمت قبل تخفیف</th><th>موجودی</th><th>عملیات</th></tr></thead>
            <tbody>
              ${filteredProducts.map(p => `
                <tr>
                  <td><div class="admin-prod-cell"><img src="${escHtml(safeAdminImage(p.art || p.image_url || p.image))}" alt=""><div><b>${escHtml(p.name)}</b><small>${escHtml(p.brand || '')} · #${faNum(p.id)}</small></div></div></td>
                  <td>${escHtml(p.cat || '')}<br><small style="color:var(--muted)">${escHtml(p.kind || '')}</small></td>
                  <td><input class="admin-inline-input" type="number" data-quick-price="${p.id}" value="${p.price ?? ''}" placeholder="قیمت به‌زودی"></td>
                  <td><input class="admin-inline-input" type="number" data-quick-old="${p.id}" value="${p.old ?? ''}" placeholder="بدون تخفیف"></td>
                  <td><input class="admin-inline-input stock-input" type="number" min="0" data-quick-stock="${p.id}" value="${p.stock ?? ''}" placeholder="نامشخص"></td>
                  <td><div class="admin-row-actions"><button class="admin-btn primary" data-quick-save="${p.id}">ذخیره</button><button class="admin-btn" data-edit-product="${p.id}">ویرایش</button><button class="admin-btn danger" data-delete-product="${p.id}">حذف</button></div></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  } else if (state.tab === 'orders') {
    tabContent = `
      <div class="admin-card">
        <div class="admin-card-head">
          <h2>مدیریت سفارش‌های مشتریان (${faNum(state.orders.length)})</h2>
          <div style="display:flex;gap:8px">
            <button class="admin-btn" id="admin-refresh-orders">↻ بروزرسانی لیست</button>
          </div>
        </div>
        ${state.orders.length ? `
          <div class="admin-table-wrap">
            <table class="admin-table">
              <thead><tr><th>کد سفارش</th><th>مشتری و تماس</th><th>آدرس تحویل</th><th>اقلام سفارش</th><th>مبلغ کل</th><th>وضعیت</th><th>عملیات</th></tr></thead>
              <tbody>
                ${state.orders.map(o => {
                  const st = statusMap[o.status] || statusMap.pending;
                  return `<tr><td><b>${escHtml(o.code)}</b><br><small>${escHtml(o.date)}</small></td><td><b>${escHtml(o.customer_name)}</b><br><small>${escHtml(o.customer_phone)}</small></td><td><small>${escHtml(o.address)}${o.postal_code ? ` — کدپستی: ${escHtml(o.postal_code)}` : ''}</small></td><td>${(o.items || []).map(it => `<div>• ${escHtml(it.name)} (×${faNum(it.qty)})</div>`).join('')}</td><td><b>${money(o.total)}</b></td><td><span class="admin-status-pill ${st[1]}">${st[0]}</span></td><td><div class="admin-row-actions"><select class="admin-select" data-order-status="${o.id}">${Object.entries(statusMap).map(([k, [label]]) => `<option value="${k}" ${o.status === k ? 'selected' : ''}>${label}</option>`).join('')}</select><button class="admin-btn danger" data-delete-order="${o.id}">حذف</button></div></td></tr>`;
                }).join('')}
              </tbody>
            </table>
          </div>
        ` : `<p style="color:var(--muted)">سفارشی در سیستم ثبت نشده است.</p>`}
      </div>
    `;
  } else if (state.tab === 'users') {
    tabContent = `
      <div class="admin-card">
        <div class="admin-card-head">
          <h2>مدیریت کاربران و سطح دسترسی (${faNum(state.users.length)})</h2>
        </div>
        <form id="admin-add-user-form" class="admin-toolbar">
          <input name="name" required maxlength="80" class="admin-search-input" placeholder="نام و نام خانوادگی کاربر">
          <input name="email" type="email" required maxlength="254" class="admin-search-input" placeholder="ایمیل برای ارسال دعوت‌نامه">
          <button type="submit" class="admin-btn primary">دعوت کاربر از طریق ایمیل</button>
        </form>
        <p style="font-size:12px;color:var(--muted);line-height:1.8">دعوت‌نامه از طریق Netlify Function امن ارسال می‌شود؛ حساب‌های جدید به‌طور پیش‌فرض نقش مشتری دارند. ارتقای نقش فقط با تابع کنترل‌شده‌ی دیتابیس انجام می‌شود.</p>
        <div class="admin-table-wrap">
          <table class="admin-table">
            <thead><tr><th>نام کاربر</th><th>ایمیل</th><th>نقش کاربری</th><th>تاریخ عضویت</th><th>عملیات</th></tr></thead>
            <tbody>
              ${state.users.map(u => `
                <tr>
                  <td><b>${escHtml(u.name)}</b></td>
                  <td dir="ltr" style="text-align:right">${escHtml(u.email)}</td>
                  <td>
                    <select class="admin-select" data-user-role="${u.id}">
                      <option value="customer" ${u.role === 'customer' ? 'selected' : ''}>مشتری</option>
                      <option value="admin" ${u.role === 'admin' ? 'selected' : ''}>مدیر (Admin)</option>
                    </select>
                  </td>
                  <td>${u.date || '۱۴۰۵/۰۷/۱۴'}</td>
                  <td><button class="admin-btn danger" data-delete-user="${u.id}">حذف</button></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  } else if (state.tab === 'support') {
    const activeThread = state.supportThreads.find(t => t.thread_id === state.activeThreadId) || state.supportThreads[0] || null;
    if (activeThread && state.activeThreadId !== activeThread.thread_id) {
      state.activeThreadId = activeThread.thread_id;
    }
    tabContent = `
      <div class="admin-card">
        <div class="admin-card-head">
          <h2>پشتیبانی آنلاین و گفتگو با کاربران (${faNum(state.supportThreads.length)} گفتگو · ${faNum(openSupportCount)} در انتظار پاسخ)</h2>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            <button class="admin-btn" id="admin-refresh-support">↻ بروزرسانی پیام‌ها</button>
          </div>
        </div>
        <div class="admin-support-grid">
          <div class="admin-support-list">
            ${state.supportThreads.length ? state.supportThreads.map(t => {
              const lastMsg = (t.messages || [])[t.messages.length - 1];
              const isOpen = t.status === 'open';
              const isSelected = activeThread && activeThread.thread_id === t.thread_id;
              return `
                <button type="button" class="admin-thread-item ${isSelected ? 'active' : ''}" data-select-thread="${escHtml(t.thread_id)}">
                  <div class="admin-thread-top">
                    <b>${escHtml(t.customer_name || 'کاربر بلکسی گیم')}</b>
                    <span class="admin-status-pill ${isOpen ? 'pending' : 'delivered'}">${isOpen ? 'نیاز به پاسخ' : 'پاسخ داده شده'}</span>
                  </div>
                  <div class="admin-thread-sub">
                    <span>${escHtml(t.customer_contact || 'بدون شماره/ایمیل')}</span>
                    <small dir="ltr">${escHtml(t.thread_id)}</small>
                  </div>
                  <p class="admin-thread-preview">${escHtml(lastMsg ? (lastMsg.sender === 'admin' ? 'شما: ' : 'کاربر: ') + lastMsg.text : 'بدون پیام')}</p>
                </button>
              `;
            }).join('') : `<div style="padding:20px;text-align:center;color:var(--muted)">هنوز پیامی از سمت کاربران ارسال نشده است.</div>`}
          </div>
          <div class="admin-support-chat">
            ${activeThread ? `
              <div class="admin-support-chat-head">
                <div>
                  <b>گفتگو با: ${escHtml(activeThread.customer_name || 'کاربر بلکسی گیم')}</b>
                  <small>اطلاعات تماس: ${escHtml(activeThread.customer_contact || 'ثبت نشده')} &nbsp;|&nbsp; کد گفتگو: <code dir="ltr">${escHtml(activeThread.thread_id)}</code></small>
                </div>
                <div style="display:flex;gap:8px">
                  <button type="button" class="admin-btn danger" data-delete-thread="${escHtml(activeThread.thread_id)}">حذف گفتگو</button>
                </div>
              </div>
              <div class="admin-support-messages" id="admin-support-messages">
                ${(activeThread.messages || []).map(m => `
                  <div class="admin-chat-msg ${m.sender === 'admin' ? 'is-admin' : 'is-user'}">
                    <div class="admin-chat-meta">
                      <b>${m.sender === 'admin' ? 'پاسخ شما (پشتیبانی بلکسی گیم)' : escHtml(activeThread.customer_name || 'کاربر')}</b>
                      <span>${escHtml(m.time || '')}</span>
                    </div>
                    <p>${escHtml(m.text)}</p>
                  </div>
                `).join('')}
              </div>
              <div class="admin-quick-replies">
                <span>پاسخ‌های آماده:</span>
                <button type="button" class="admin-btn" data-admin-quick-reply="سلام وقت بخیر، پیام شما دریافت شد؛ سفارش شما در حال آماده‌سازی و ارسال است."><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16.5 9.4 7.55 4.24"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" y1="22" x2="12" y2="12"/></svg><span>وضعیت سفارش</span></button>
                <button type="button" class="admin-btn" data-admin-quick-reply="سلام وقت بخیر، بله، این محصول موجود و آماده تحویل فوری در فروشگاه بلکسی گیم است."><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg><span>موجودی کالا</span></button>
                <button type="button" class="admin-btn" data-admin-quick-reply="سلام وقت بخیر، در خدمت شما هستیم؛ لطفاً شماره سفارش یا مدل مدنظرتان را بفرمایید."><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg><span>درخواست جزئیات</span></button>
              </div>
              <form id="admin-support-reply-form" class="admin-support-reply-form">
                <input id="admin-reply-input" name="reply" type="text" required autocomplete="off" placeholder="پاسخ خود را برای ${escHtml(activeThread.customer_name || 'کاربر')} بنویسید...">
                <button type="submit" class="admin-btn primary">ارسال پاسخ به کاربر ←</button>
              </form>
            ` : `
              <div style="display:grid;place-items:center;height:100%;padding:40px;text-align:center;color:var(--muted)">
                <div>
                  <b style="display:block;font-size:15px;color:var(--ink);margin-bottom:6px">هیچ گفتگویی انتخاب نشده است</b>
                  <span>وقتی کاربری از بخش «پشتیبانی» در سایت پیام بفرستد، همین‌جا نمایش داده می‌شود و می‌توانید پاسخ دهید.</span>
                </div>
              </div>
            `}
          </div>
        </div>
      </div>
    `;
  } else if (state.tab === 'home') {
    tabContent = `
      <div class="admin-card">
        <div class="admin-card-head"><h2>مدیریت اسلایدر و ویترین صفحه‌ی اصلی</h2>
          <button class="admin-btn primary" id="admin-save-home-content">ذخیره و انتشار محتوا</button>
        </div>
        <p style="font-size:12.5px;line-height:1.9;color:var(--muted)">
          تنظیمات به‌صورت JSON در جدول <code>site_content</code> ذخیره می‌شود. اسلایدهای ثابت <code>gta</code>، <code>fc27</code>، <code>cod</code>، <code>forza</code> و <code>nightreign</code> را ویرایش، جابه‌جا یا غیرفعال کنید. برای هر اسلاید از <code>enabled</code>، <code>position</code>، <code>title</code>، <code>description</code>، <code>chips</code>، <code>cta_label</code>، <code>cta_href</code>، <code>image</code> و رنگ‌های <code>accent</code> و <code>accent2</code> استفاده کنید.
          در <code>showcases</code> می‌توانید چند ویترین جدید بسازید؛ هر ویترین شامل <code>title</code>، <code>description</code>، آرایه‌ی شناسه‌ی محصول در <code>product_ids</code> و <code>enabled</code> است. لینک CTA باید مسیر داخلی مانند <code>/products</code> یا <code>/product/21</code> باشد.
        </p>
        <label style="display:block;font-weight:700;margin:12px 0 6px">محتوای صفحه‌ی اصلی (JSON معتبر)</label>
        <textarea id="admin-home-content-json" spellcheck="false" dir="ltr" style="width:100%;min-height:460px;padding:14px;border:1px solid var(--line);border-radius:12px;background:var(--surface-2);color:var(--ink);font:12px/1.7 ui-monospace,SFMono-Regular,Consolas,monospace;resize:vertical">${escHtml(JSON.stringify(state.homeContent || DEFAULT_HOME_CONTENT, null, 2))}</textarea>
        <div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap"><button type="button" class="admin-btn" id="admin-reset-home-content">بازگردانی تنظیمات پیش‌فرض</button><small style="align-self:center;color:var(--muted)">تغییر پس از انتشار با بارگذاری مجدد صفحه‌ی فروشگاه دیده می‌شود.</small></div>
      </div>
    `;
  } else if (state.tab === 'security') {
    tabContent = `
      <div class="admin-card">
        <div class="admin-card-head">
          <h2>پایگاه داده، احراز هویت و استقرار امن</h2>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            <button class="admin-btn primary" id="admin-test-supabase">تست اتصال و نقش مدیر</button>
            <button class="admin-btn" id="admin-sync-supabase">ارسال کاتالوگ اولیه به Supabase</button>
          </div>
        </div>
        <p style="font-size:12.5px;line-height:1.95;color:var(--muted)">
          <b>۱. Migration:</b> فایل <code>schema.sql</code> را در Supabase SQL Editor اجرا کنید؛ جداول، RLS، توابع امن سفارش و پشتیبانی، Storage خصوصی آواتار، ویترین صفحه‌ی اصلی و Realtime را می‌سازد.<br>
          <b>۲. حساب ادمین:</b> در Supabase Auth یک کاربر با ایمیل <code>admin@blakci.ir</code> بسازید. صفحه‌ی ورود نام <code>blakci_admin</code> را به همین ایمیل تبدیل می‌کند. سپس در SQL Editor نقش همان حساب را به <code>admin</code> ارتقا دهید. رمز عبور در کد یا مرورگر ذخیره نمی‌شود.<br>
          <b>۳. کلیدها:</b> کلید publishable فقط برای اتصال عمومی Supabase است. <code>SUPABASE_SERVICE_ROLE_KEY</code> را فقط در Netlify → Environment variables برای سایت ادمین قرار دهید؛ هرگز در فایل‌های JS، Git یا سایت عمومی نگذارید. برای Functions متغیر <code>ADMIN_ORIGIN</code> را برابر origin دقیق دامنه‌ی ادمین تنظیم کنید.<br>
          <b>۴. جداسازی:</b> فروشگاه را از ریشه‌ی پروژه و پنل را به‌عنوان سایت Netlify جداگانه از پوشه‌ی <code>admin-panel/</code> روی دامنه‌ی ادمین منتشر کنید. <code>noindex</code> پنهان‌سازی است، نه جایگزین RLS و احراز هویت.<br>
          <b>۵. پرداخت:</b> ثبت سفارش سمت دیتابیس و محاسبه‌ی مبلغ از قیمت واقعی محصول انجام می‌شود؛ درگاه بانکی تا زمانی که سرویس پرداخت و callback آن جداگانه تنظیم نشود، وجهی دریافت نمی‌کند.
        </p>
        <div class="admin-sql-box" id="admin-sql-preview">-- در حال بارگذاری schema.sql...</div>
      </div>
    `;
  }

  return `
    <header class="admin-topbar">
      <div class="wrap admin-topbar-inner">
        <div class="admin-brand">
          <span class="logo-mark">B</span>
          <div>
            <b>پنل مدیریت اختصاصی بلکسی گیم (دامنه مجزا)</b>
            <small>PRIVATE ADMIN INSTANCE · ${escHtml(state.adminEmail)}</small>
          </div>
        </div>
        <div class="admin-head-actions">
          <span class="admin-badge ${state.supabaseOnline === false ? 'is-offline' : ''}">
            ● ${state.supabaseOnline === true ? 'متصل به Supabase' : state.supabaseOnline === false ? 'خطا در اتصال' : 'در انتظار بررسی اتصال'}
          </span>
          <button type="button" class="admin-btn" id="toggle-admin-theme">${state.theme === 'dark' ? '☀ تم روشن' : '☾ تم تیره'}</button>
          <a href="${getStorefrontUrl()}" target="_blank" rel="noopener noreferrer" class="admin-btn">مشاهده سایت عمومی ↗</a>
          <button type="button" class="admin-btn danger" id="admin-logout">🔒 قفل پنل / خروج</button>
        </div>
      </div>
    </header>
    <div class="wrap admin-page">
      <div class="admin-head">
        <div>
          <span class="eyebrow">BLACKSY GAME CORE CONTROL CENTER</span>
          <h1>مدیریت یکپارچه محصولات، قیمت‌ها و سفارش‌ها</h1>
        </div>
        <div class="admin-head-actions">
          <button class="admin-btn primary" data-admin-open-modal="new">＋ افزودن محصول جدید</button>
        </div>
      </div>
      <div class="admin-layout">
        <aside class="admin-nav">
          <button type="button" class="admin-nav-btn ${state.tab === 'dashboard' ? 'active' : ''}" data-admin-tab="dashboard"><span>پیشخوان و آمار</span><small>۴</small></button>
          <button type="button" class="admin-nav-btn ${state.tab === 'support' ? 'active' : ''}" data-admin-tab="support"><span>پشتیبانی و پیام‌ها</span><small class="${openSupportCount ? 'badge-alert' : ''}">${faNum(state.supportThreads.length)}</small></button>
          <button type="button" class="admin-nav-btn ${state.tab === 'products' ? 'active' : ''}" data-admin-tab="products"><span>مدیریت محصولات</span><small>${faNum(products.length)}</small></button>
          <button type="button" class="admin-nav-btn ${state.tab === 'orders' ? 'active' : ''}" data-admin-tab="orders"><span>مدیریت سفارش‌ها</span><small>${faNum(state.orders.length)}</small></button>
          <button type="button" class="admin-nav-btn ${state.tab === 'users' ? 'active' : ''}" data-admin-tab="users"><span>مدیریت کاربران</span><small>${faNum(state.users.length)}</small></button>
          <button type="button" class="admin-nav-btn ${state.tab === 'home' ? 'active' : ''}" data-admin-tab="home"><span>اسلایدر و ویترین صفحه‌ی اصلی</span><small>CMS</small></button>
          <button type="button" class="admin-nav-btn ${state.tab === 'security' ? 'active' : ''}" data-admin-tab="security"><span>دامنه، امنیت و دیتابیس</span><small>SQL</small></button>
        </aside>
        <section class="admin-main">${tabContent}</section>
      </div>
      ${modalMarkup}
    </div>
  `;
}

function render() {
  app.innerHTML = state.authenticated ? dashboardView() : loginView();
  bind();
}

function bind() {
  const loginForm = document.querySelector('#admin-login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', async e => {
      e.preventDefault();
      const button = loginForm.querySelector('button[type="submit"]');
      const typed = loginForm.elements.email.value.trim().toLowerCase();
      const password = loginForm.elements.password.value;
      const email = typed === 'blakci_admin' ? 'admin@blakci.ir' : typed;
      if (button) { button.disabled = true; button.textContent = 'در حال تأیید حساب…'; }
      try {
        const client = await getSupabaseClient();
        const { data, error } = await client.auth.signInWithPassword({ email, password });
        if (error) throw error;
        await verifyAdminUser(client, data.user);
        toast('ورود امن با Supabase Auth انجام شد.');
        render();
      } catch (err) {
        state.authenticated = false;
        const message = err?.message === 'admin_role_required'
          ? 'حساب واردشده نقش admin ندارد یا schema دیتابیس هنوز اجرا نشده است.'
          : 'ایمیل/نام کاربری یا رمز عبور Supabase نادرست است.';
        toast(message);
      } finally {
        if (button?.isConnected) { button.disabled = false; button.textContent = 'ورود امن به پنل مدیریت ←'; }
      }
    });
    return;
  }

  document.querySelector('#toggle-admin-theme')?.addEventListener('click', () => {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('blakci-admin-theme', state.theme);
    document.documentElement.dataset.theme = state.theme;
    render();
  });

  document.querySelector('#admin-logout')?.addEventListener('click', async () => {
    try { const c = await getSupabaseClient(); await c.auth.signOut(); } catch {}
    state.authenticated = false;
    state.adminEmail = 'admin@blakci.ir';
    await subscribeAdminRealtime();
    toast('از پنل مدیریت خارج شدی.');
    render();
  });

  document.querySelectorAll('[data-admin-tab]').forEach(btn =>
    btn.addEventListener('click', () => {
      state.tab = btn.dataset.adminTab;
      render();
    })
  );

  document.querySelectorAll('[data-admin-open-modal]').forEach(btn =>
    btn.addEventListener('click', () => {
      state.modalProduct = {
        name: '',
        brand: 'Blacksy Game',
        model: '',
        cat: 'بازی',
        kind: 'بازی',
        price: '',
        old: '',
        stock: 10,
        art: '/assets/fc-27-cover.jpg',
        platforms: ['PlayStation', 'PC'],
        short_description: '',
        description: ''
      };
      render();
    })
  );

  document.querySelectorAll('[data-edit-product]').forEach(btn =>
    btn.addEventListener('click', () => {
      const p = products.find(x => x.id === +btn.dataset.editProduct);
      if (p) {
        state.modalProduct = structuredClone(p);
        render();
      }
    })
  );

  const closeModal = () => {
    state.modalProduct = null;
    render();
  };
  document.querySelector('#close-admin-modal')?.addEventListener('click', closeModal);
  document.querySelector('#cancel-admin-modal')?.addEventListener('click', closeModal);
  document.querySelector('#admin-modal-backdrop')?.addEventListener('click', e => {
    if (e.target.id === 'admin-modal-backdrop') closeModal();
  });

  document.querySelector('#admin-art-input')?.addEventListener('input', e => {
    const imgEl = document.querySelector('#admin-art-preview');
    if (imgEl && e.target.value.trim()) imgEl.src = e.target.value.trim();
  });

  document.querySelector('#admin-art-file')?.addEventListener('change', async e => {
    const file = e.currentTarget.files?.[0];
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 5 * 1024 * 1024) {
      toast('فقط JPG، PNG یا WebP تا حجم ۵ مگابایت مجاز است.'); e.currentTarget.value = ''; return;
    }
    try {
      const client = await getSupabaseClient();
      const ext = file.type === 'image/png' ? 'png' : file.type === 'image/webp' ? 'webp' : 'jpg';
      const objectPath = `products/${crypto.randomUUID()}.${ext}`;
      const { error } = await client.storage.from('product-assets').upload(objectPath, file, { upsert: false, contentType: file.type, cacheControl: '3600' });
      if (error) throw error;
      const url = client.storage.from('product-assets').getPublicUrl(objectPath).data.publicUrl;
      const inp = document.querySelector('#admin-art-input'), prev = document.querySelector('#admin-art-preview');
      if (inp) inp.value = url; if (prev) prev.src = url;
      toast('تصویر محصول در Storage آپلود شد.');
    } catch {
      toast('آپلود انجام نشد؛ نقش مدیر و Storage policy را بررسی کن.');
    } finally { e.currentTarget.value = ''; }
  });

  document.querySelector('#admin-product-form')?.addEventListener('submit', async e => {
    e.preventDefault();
    const f = e.currentTarget;
    const idVal = f.elements.id.value ? +f.elements.id.value : null;
    const priceVal = f.elements.price.value.trim() === '' ? null : Number(f.elements.price.value);
    const oldVal = f.elements.old.value.trim() === '' ? null : Number(f.elements.old.value);
    const stockVal = f.elements.stock.value.trim() === '' ? null : Number(f.elements.stock.value);
    const stockChanged = idVal ? f.elements.stock.value.trim() !== String(f.elements.stock.dataset.originalStock ?? '') : true;
    const artVal = f.elements.art.value.trim() || '/assets/fc-27-cover.jpg';
    if ((priceVal != null && (!Number.isSafeInteger(priceVal) || priceVal <= 0)) || (oldVal != null && (!Number.isSafeInteger(oldVal) || oldVal < 0)) || (stockVal != null && (!Number.isSafeInteger(stockVal) || stockVal < 0))) {
      toast('قیمت و موجودی باید عدد صحیح و معتبر باشند؛ قیمت فروش نیز باید بزرگ‌تر از صفر باشد.'); return;
    }
    const platforms = f.elements.platforms.value.split(',').map(s => s.trim()).filter(Boolean);

    if (idVal) {
      const idx = products.findIndex(p => p.id === idVal);
      if (idx > -1) {
        products[idx] = {
          ...products[idx],
          name: f.elements.name.value.trim(),
          brand: f.elements.brand.value.trim(),
          model: f.elements.model.value.trim(),
          cat: f.elements.cat.value,
          category: f.elements.cat.value,
          kind: f.elements.kind.value,
          price: priceVal,
          old: oldVal,
          stock: stockChanged ? stockVal : products[idx].stock,
          art: artVal,
          image_url: artVal,
          images: [artVal],
          platforms,
          short_description: f.elements.short_description.value.trim(),
          description: f.elements.description.value.trim() || f.elements.short_description.value.trim()
        };
      }

    } else {
      const nextId = products.reduce((m, p) => Math.max(m, Number(p.id) || 0), 0) + 1;
      const newProd = {
        id: nextId,
        sku: `BLG-${String(nextId).padStart(4, '0')}`,
        name: f.elements.name.value.trim(),
        brand: f.elements.brand.value.trim(),
        model: f.elements.model.value.trim(),
        cat: f.elements.cat.value,
        category: f.elements.cat.value,
        kind: f.elements.kind.value,
        price: priceVal,
        old: oldVal,
        stock: stockVal,
        art: artVal,
        image_url: artVal,
        images: [artVal],
        platforms,
        short_description: f.elements.short_description.value.trim(),
        description: f.elements.description.value.trim() || f.elements.short_description.value.trim(),
        specifications: { برند: f.elements.brand.value.trim(), مدل: f.elements.model.value.trim() || 'استاندارد' },
        source: 'فروشگاه بلکسی گیم',
        source_url: '#',
        checked_at: '۱۴۰۵/۰۷/۱۴'
      };
      products.unshift(newProd);

    }
    try {
      await ensureCatalogBootstrapped();
      const changedProduct = products.find(product => product.id === (idVal || products[0]?.id));
      if (!changedProduct) throw new Error('product_missing');
      await saveProductRow(changedProduct, { create: !idVal, updateStock: !idVal || stockChanged });
      state.modalProduct = null;
      toast('محصول در Supabase ذخیره شد و در ویترین فروشگاه قرار گرفت.');
      await reloadAdminData(false);
    } catch { toast('ذخیره‌ی محصول انجام نشد؛ اتصال دیتابیس یا مجوز admin را بررسی کن.'); }
  });

  document.querySelectorAll('[data-quick-save]').forEach(btn =>
    btn.addEventListener('click', async () => {
      const id = +btn.dataset.quickSave;
      const p = products.find(x => x.id === id);
      if (!p) return;
      const priceInput = document.querySelector(`[data-quick-price="${id}"]`);
      const oldInput = document.querySelector(`[data-quick-old="${id}"]`);
      const stockInput = document.querySelector(`[data-quick-stock="${id}"]`);
      const stockChanged = !!stockInput && stockInput.value.trim() !== String(p.stock ?? '');
      if (priceInput) p.price = priceInput.value.trim() === '' ? null : Number(priceInput.value);
      if (oldInput) p.old = oldInput.value.trim() === '' ? null : Number(oldInput.value);
      if (stockChanged) p.stock = stockInput.value.trim() === '' ? null : Number(stockInput.value);
      if ((p.price != null && (!Number.isSafeInteger(p.price) || p.price <= 0)) || (p.old != null && (!Number.isSafeInteger(p.old) || p.old < 0)) || (p.stock != null && (!Number.isSafeInteger(p.stock) || p.stock < 0))) { toast('قیمت و موجودی باید عدد صحیح و معتبر باشند.'); return; }
      try {
        await ensureCatalogBootstrapped();
        await saveProductRow(p, { updateStock: stockChanged });
        toast(`تغییرات «${p.name}» در فروشگاه ذخیره شد`);
        render();
      } catch { toast('ذخیره‌ی قیمت/موجودی انجام نشد؛ مجوز مدیر را بررسی کن.'); }
    })
  );

  document.querySelectorAll('[data-delete-product]').forEach(btn =>
    btn.addEventListener('click', async () => {
      const id = +btn.dataset.deleteProduct;
      const p = products.find(x => x.id === id);
      if (!p) return;
      try {
        const c = await getSupabaseClient();
        const { error } = await c.from('products').delete().eq('id', id);
        if (error) throw error;
        products = products.filter(x => x.id !== id);
        toast(`«${p.name}» از فروشگاه حذف شد`);
        render();
      } catch { toast('حذف محصول انجام نشد؛ مجوز مدیر یا وابستگی سفارش‌ها را بررسی کن.'); }
    })
  );

  const adminSearch = document.querySelector('#admin-search');
  if (adminSearch) {
    adminSearch.addEventListener('input', e => {
      state.search = e.target.value;
      const pos = e.target.selectionStart;
      render();
      const nextInput = document.querySelector('#admin-search');
      if (nextInput) {
        nextInput.focus();
        try { nextInput.setSelectionRange(pos, pos); } catch {}
      }
    });
  }

  document.querySelector('#admin-cat-filter')?.addEventListener('change', e => {
    state.cat = e.target.value;
    render();
  });

  document.querySelector('#admin-export-json')?.addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(products, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'products.json';
    a.click();
    toast('فایل products.json آماده دانلود شد');
  });

  document.querySelector('#admin-reset-products')?.addEventListener('click', async () => {
    if (!confirm('کاتالوگ فعلی حذف و با فایل اولیه جایگزین شود؟')) return;
    try {
      const response = await fetch('./data/products.seed.json', { cache: 'no-store' });
      if (!response.ok) throw new Error('seed_file_missing');
      const seed = (await response.json()).map(mapProductRow);
      const c = await getSupabaseClient();
      const removed = await c.from('products').delete().neq('id', 0);
      if (removed.error) throw removed.error;
      const { error } = await c.from('products').upsert(seed.map(toProductRow), { onConflict: 'id' });
      if (error) throw error;
      products = seed;
      state.catalogNeedsBootstrap = false;
      toast('کاتالوگ اولیه در دیتابیس بازیابی شد.');
      render();
    } catch { toast('بازنشانی انجام نشد؛ نقش مدیر و جدول products را بررسی کن.'); }
  });

  document.querySelector('#admin-refresh-orders')?.addEventListener('click', async () => {
    try { await reloadAdminData(false); toast('لیست سفارش‌ها از Supabase بروزرسانی شد.'); }
    catch { toast('خواندن سفارش‌ها از دیتابیس انجام نشد.'); }
  });

  document.querySelectorAll('[data-order-status]').forEach(sel =>
    sel.addEventListener('change', async () => {
      const order = state.orders.find(x => x.id === sel.dataset.orderStatus);
      if (!order) return;
      const previous = order.status, nextStatus = sel.value;
      try {
        const c = await getSupabaseClient();
        const { error } = await c.from('orders').update({ status: nextStatus }).eq('id', order.id);
        if (error) throw error;
        order.status = nextStatus;
        toast('وضعیت سفارش در دیتابیس بروزرسانی شد.');
        render();
      } catch { sel.value = previous; toast('تغییر وضعیت سفارش ذخیره نشد.'); }
    })
  );

  document.querySelectorAll('[data-delete-order]').forEach(btn =>
    btn.addEventListener('click', async () => {
      if (!confirm('این سفارش از سامانه حذف شود؟')) return;
      try {
        const c = await getSupabaseClient();
        const { error } = await c.from('orders').delete().eq('id', btn.dataset.deleteOrder);
        if (error) throw error;
        state.orders = state.orders.filter(x => x.id !== btn.dataset.deleteOrder);
        toast('سفارش حذف شد.'); render();
      } catch { toast('حذف سفارش انجام نشد؛ مجوز مدیر را بررسی کن.'); }
    })
  );

  document.querySelector('#admin-add-user-form')?.addEventListener('submit', async e => {
    e.preventDefault(); const form = e.currentTarget, button = form.querySelector('button[type="submit"]');
    if (button) { button.disabled = true; button.textContent = 'در حال ارسال دعوت‌نامه…'; }
    try {
      await adminFunction('admin-invite-user', { name: form.elements.name.value.trim(), email: form.elements.email.value.trim() });
      form.reset(); toast('دعوت‌نامه‌ی ورود ارسال شد.'); await reloadAdminData(false);
    } catch { toast('ارسال دعوت‌نامه انجام نشد؛ Netlify Functions و کلید محیطی سرور را بررسی کن.'); }
    finally { if (button?.isConnected) { button.disabled = false; button.textContent = 'دعوت کاربر از طریق ایمیل'; } }
  });

  document.querySelectorAll('[data-user-role]').forEach(sel =>
    sel.addEventListener('change', async () => {
      const user = state.users.find(x => x.id === sel.dataset.userRole); if (!user) return;
      const previous = user.role, nextRole = sel.value;
      try {
        const c = await getSupabaseClient();
        const { error } = await c.rpc('admin_set_user_role', { p_user_id: user.id, p_role: nextRole });
        if (error) throw error;
        user.role = nextRole; toast('نقش کاربر از طریق تابع امن دیتابیس تغییر کرد.'); render();
      } catch { sel.value = previous; toast('تغییر نقش انجام نشد؛ تابع admin_set_user_role یا نقش مدیر را بررسی کن.'); }
    })
  );

  document.querySelectorAll('[data-delete-user]').forEach(btn =>
    btn.addEventListener('click', async () => {
      if (!confirm('حساب کاربری و داده‌های وابسته به آن حذف شود؟')) return;
      try {
        await adminFunction('admin-delete-user', { user_id: btn.dataset.deleteUser });
        state.users = state.users.filter(x => x.id !== btn.dataset.deleteUser);
        toast('حساب کاربری از Supabase Auth حذف شد.'); render();
      } catch { toast('حذف کاربر انجام نشد؛ Function امن یا تنظیمات Netlify را بررسی کن.'); }
    })
  );

  document.querySelector('#admin-reset-home-content')?.addEventListener('click', () => {
    const editor = document.querySelector('#admin-home-content-json');
    if (editor) editor.value = JSON.stringify(DEFAULT_HOME_CONTENT, null, 2);
    toast('پیش‌فرض‌ها در ویرایشگر قرار گرفتند؛ برای انتشار، ذخیره را بزن.');
  });
  document.querySelector('#admin-save-home-content')?.addEventListener('click', async () => {
    const editor = document.querySelector('#admin-home-content-json');
    try {
      const content = JSON.parse(editor?.value || '{}');
      if (!Array.isArray(content.slides) || !Array.isArray(content.showcases) || content.slides.length > 5 || content.showcases.length > 8) {
        throw new Error('invalid_home_content');
      }
      const c = await getSupabaseClient();
      const { error } = await c.from('site_content').upsert({ id: 'home', content }, { onConflict: 'id' });
      if (error) throw error;
      state.homeContent = content; toast('محتوای اسلایدر و ویترین در Supabase منتشر شد.');
    } catch { toast('JSON نامعتبر است یا دسترسی انتشار وجود ندارد.'); }
  });

  document.querySelector('#admin-test-supabase')?.addEventListener('click', async () => {
    try {
      const c = await getSupabaseClient(), { data: auth } = await c.auth.getUser();
      const { data: profile, error: profileError } = await c.from('profiles').select('role').eq('id', auth.user.id).maybeSingle();
      if (profileError || profile?.role !== 'admin') throw profileError || new Error('admin_required');
      const { error } = await c.from('products').select('id').limit(1);
      if (error) throw error;
      state.supabaseOnline = true; toast('Supabase، جدول محصولات و نقش admin تأیید شدند.'); render();
    } catch { state.supabaseOnline = false; toast('اتصال/نقش مدیر تأیید نشد؛ schema و ورود Supabase را بررسی کن.'); render(); }
  });

  document.querySelector('#admin-sync-supabase')?.addEventListener('click', async () => {
    try {
      await ensureCatalogBootstrapped(); state.supabaseOnline = true;
      toast('کاتالوگ بررسی شد؛ از بازنویسی محصولات موجود جلوگیری شد.'); await reloadAdminData(false);
    } catch { state.supabaseOnline = false; toast('همگام‌سازی ناموفق بود؛ schema و RLS مدیر را بررسی کن.'); render(); }
  });

  const sqlBox = document.querySelector('#admin-sql-preview');
  if (sqlBox && !sqlBox.dataset.loaded) {
    sqlBox.dataset.loaded = '1';
    fetch('./schema.sql').then(r => r.ok ? r.text() : Promise.reject()).then(t => { sqlBox.textContent = t; }).catch(() => { sqlBox.textContent = 'فایل schema.sql کنار پنل مدیریت در دسترس نیست؛ از ریشه‌ی پروژه آن را بردارید.'; });
  }

  document.querySelectorAll('[data-open-thread]').forEach(btn =>
    btn.addEventListener('click', () => {
      state.activeThreadId = btn.dataset.openThread;
      state.tab = 'support';
      render();
    })
  );

  document.querySelectorAll('[data-select-thread]').forEach(btn =>
    btn.addEventListener('click', () => {
      state.activeThreadId = btn.dataset.selectThread;
      render();
    })
  );

  document.querySelector('#admin-refresh-support')?.addEventListener('click', async () => {
    try { await reloadAdminData(true); toast('گفتگوها از دیتابیس بروزرسانی شدند.'); }
    catch { toast('خواندن گفتگوها از دیتابیس انجام نشد.'); }
  });

  document.querySelectorAll('[data-delete-thread]').forEach(btn =>
    btn.addEventListener('click', async () => {
      if (!confirm('این گفتگوی پشتیبانی حذف شود؟')) return;
      const tid = btn.dataset.deleteThread;
      try {
        const c = await getSupabaseClient();
        const { error } = await c.from('support_threads').delete().eq('thread_id', tid);
        if (error) throw error;
        state.supportThreads = state.supportThreads.filter(t => t.thread_id !== tid);
        if (state.activeThreadId === tid) state.activeThreadId = state.supportThreads[0]?.thread_id || null;
        toast('گفتگو حذف شد.'); render();
      } catch { toast('حذف گفتگو انجام نشد؛ نقش مدیر یا RLS را بررسی کن.'); }
    })
  );

  const sendAdminReply = async text => {
    const replyText = String(text || '').trim();
    if (!replyText || !state.activeThreadId) return false;
    if (replyText.length > 2000) { toast('حداکثر طول پاسخ ۲۰۰۰ نویسه است.'); return false; }
    try {
      const c = await getSupabaseClient();
      const { data, error } = await c.rpc('admin_send_support_reply', { p_thread_id: state.activeThreadId, p_text: replyText });
      if (error) throw error;
      const thread = state.supportThreads.find(t => t.thread_id === state.activeThreadId);
      if (thread && Array.isArray(data?.messages)) { thread.messages = data.messages; thread.status = data.status || 'answered'; }
      toast('پاسخ با Supabase Realtime برای کاربر ارسال شد.'); render();
      const msgBox = document.querySelector('#admin-support-messages'); if (msgBox) msgBox.scrollTop = msgBox.scrollHeight;
      return true;
    } catch { toast('ارسال پاسخ انجام نشد؛ نقش مدیر یا تابع امن پشتیبانی را بررسی کن.'); return false; }
  };

  document.querySelectorAll('[data-admin-quick-reply]').forEach(btn =>
    btn.addEventListener('click', () => sendAdminReply(btn.dataset.adminQuickReply))
  );

  document.querySelector('#admin-support-reply-form')?.addEventListener('submit', async e => {
    e.preventDefault();
    const inp = document.querySelector('#admin-reply-input');
    if (!inp || !inp.value.trim()) return;
    const val = inp.value.trim();
    if (await sendAdminReply(val)) { const next = document.querySelector('#admin-reply-input'); if (next) next.value = ''; }
  });

  const msgBox = document.querySelector('#admin-support-messages');
  if (msgBox) msgBox.scrollTop = msgBox.scrollHeight;
}

render();
(async () => {
  try {
    const c = await getSupabaseClient();
    const { data: sessionData, error: sessionError } = await c.auth.getSession();
    if (sessionError || !sessionData?.session) return;
    const { data, error } = await c.auth.getUser();
    if (error || !data?.user) throw error || new Error('session_invalid');
    await verifyAdminUser(c, data.user);
    render();
  } catch {
    try { const c = await getSupabaseClient(); await c.auth.signOut(); } catch {}
    state.authenticated = false;
    render();
  }
})();
