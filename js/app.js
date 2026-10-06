function headerIcon(name){const paths={home:'<path d="m3 10.5 9-7.5 9 7.5V21h-6v-6H9v6H3z"/>',store:'<path d="M3 10v10h18V10M2 10l2-6h16l2 6M8 10v10m8-10v10M2 10a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0"/>',grid:'<rect x="3.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.5"/>',game:'<path d="M6.5 8h11a4 4 0 0 1 3.8 2.8l1.1 3.7a2.5 2.5 0 0 1-4.2 2.5l-2.1-2H7.9l-2.1 2a2.5 2.5 0 0 1-4.2-2.5l1.1-3.7A4 4 0 0 1 6.5 8Z"/><path d="M7 10.5v4m-2-2h4m7-1h.01M18 14h.01"/>',console:'<path d="M6.5 8h11a4 4 0 0 1 3.8 2.8l1.1 3.7a2.5 2.5 0 0 1-4.2 2.5l-2.1-2H7.9l-2.1 2a2.5 2.5 0 0 1-4.2-2.5l1.1-3.7A4 4 0 0 1 6.5 8Z"/><path d="M7 10.5v4m-2-2h4m7-1h.01M18 14h.01"/>',cpu:'<rect x="6" y="6" width="12" height="12" rx="2"/><rect x="9" y="9" width="6" height="6" rx="1"/><path d="M9 2v4m6-4v4M9 18v4m6-4v4M2 9h4m-4 6h4m12-6h4m-4 6h4"/>',monitor:'<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8m-4-4v4"/>',package:'<path d="M16.5 9.4 7.55 4.24"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" y1="22" x2="12" y2="12"/>',headset:'<path d="M3 13v-1a9 9 0 0 1 18 0v1"/><rect x="3" y="12" width="4" height="8" rx="2"/><rect x="17" y="12" width="4" height="8" rx="2"/><path d="M21 18a4 4 0 0 1-4 4h-2"/>',gift:'<rect x="3" y="8" width="18" height="13" rx="2"/><path d="M12 8v13M3 12h18M12 8H7.5a2.5 2.5 0 1 1 2.2-3.7L12 8Zm0 0h4.5a2.5 2.5 0 1 0-2.2-3.7L12 8Z"/>',account:'<path d="M20 21a8 8 0 0 0-16 0"/><circle cx="12" cy="8" r="4"/>',discount:'<path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3.4 13.4a2 2 0 0 1-.6-1.4V5a2 2 0 0 1 2-2h7a2 2 0 0 1 1.4.6l7.4 7a2 2 0 0 1 0 2.8Z"/><circle cx="8" cy="8" r="1.3"/><path d="m10 14 4-4"/><circle cx="14.5" cy="14.5" r=".8"/>',vr:'<path d="M3 10a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3l-1.3 7a2 2 0 0 1-2 1.6h-1.2a3 3 0 0 1-2.3-1.1l-1.1-1.3h-2.2l-1.1 1.3a3 3 0 0 1-2.3 1.1H7.3a2 2 0 0 1-2-1.6L4 10Z"/><path d="M7 10h4m-2-2v4m6-2h.01m2 0h.01"/>',search:'<circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 4.5 4.5"/>',arrow:'<path d="M20 12H4m7-7-7 7 7 7"/>',heart:'<path d="M20.8 8.8c0 4.1-8.8 10-8.8 10s-8.8-5.9-8.8-10a4.8 4.8 0 0 1 8.8-2.7 4.8 4.8 0 0 1 8.8 2.7Z"/>',cart:'<path d="M3 4h2l2.1 10.2a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 1.9-1.4L22 8H6"/><circle cx="10" cy="20" r="1.35"/><circle cx="18" cy="20" r="1.35"/>',user:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',orders:'<path d="M6 3h12v18l-2-1.5-4 1.5-4-1.5L6 21z"/><path d="M9 8h6m-6 4h6m-6 4h4"/>',logout:'<path d="M10 17l5-5-5-5m5 5H3"/><path d="M12 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6"/>'};return `<svg class="header-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]||paths.grid}</svg>`}
function header(){
  const count=Object.values(state.cart).reduce((a,b)=>a+b,0);
  const wishCount=state.wish.length;
  const fmt=n=>new Intl.NumberFormat('fa-IR').format(n);
  return `<header class="site-header"><div class="header-main wrap"><a href="/" data-nav="/" class="logo header-brand" aria-label="صفحه‌ی اصلی بلکسی گیم"><span class="header-logo-frame" aria-hidden="true"><img class="header-logo-symbol" src="/assets/blacksy-game-mark.png" width="24" height="34" alt="" decoding="async"></span><span class="header-brand-copy">بلکسی گیم<small>BLACKSY GAME</small></span></a><form id="search-form" class="search header-search" role="search"><span class="header-search-mark" aria-hidden="true">${headerIcon('search')}</span><input id="search-box" type="search" value="${escHtml(state.query||'')}" placeholder="جستجو در بازی‌ها، کنسول، مانیتور، ماوس و کیبورد..." autocomplete="off" aria-label="جستجوی محصولات"><button type="submit" aria-label="جستجو">${headerIcon('arrow')}</button><div id="suggestions" class="suggestions"></div></form><div class="header-actions">${themeToggleMarkup()}<a href="/products" data-nav="/products" class="header-action" aria-label="محصولات">${headerIcon('grid')}<span>محصولات</span></a><a href="/support" data-nav="/support" class="header-action" aria-label="پشتیبانی">${headerIcon('headset')}<span>پشتیبانی</span></a><a href="/account/wishlist" data-nav="/account/wishlist" class="header-action" aria-label="علاقه‌مندی‌ها">${headerIcon('heart')}<span>علاقه‌مندی‌ها</span>${wishCount?`<i class="header-cart-count">${fmt(wishCount)}</i>`:''}</a><a href="/cart" data-nav="/cart" class="header-action header-cart-action" aria-label="سبد خرید">${headerIcon('cart')}<span>سبد خرید</span>${count?`<i class="header-cart-count">${fmt(count)}</i>`:''}</a></div><a href="/register" data-nav="/register" class="header-auth">${headerIcon('user')}<span>ثبت‌نام | ورود</span></a></div>${desktopNavMarkup(count,wishCount)}</header>`;
}

function desktopNavMarkup(cartCount,wishCount){const fmt=n=>new Intl.NumberFormat('fa-IR').format(n),categoryLinks=cats.map(([name])=>`<a href="/category/${encodeURIComponent(name)}" data-nav="/category/${encodeURIComponent(name)}">${categoryIcon(name)}<span>${escHtml(name)}</span></a>`).join('');return `<nav class="desktop-nav" aria-label="ناوبری فروشگاه"><div class="desktop-nav-inner wrap"><a class="desktop-nav-link" href="/" data-nav="/">${headerIcon('home')}<span>خانه</span></a><a class="desktop-nav-link" href="/products" data-nav="/products">${headerIcon('store')}<span>محصولات</span></a><details class="desktop-nav-categories"><summary class="desktop-nav-link desktop-nav-summary">${headerIcon('grid')}<span>دسته‌بندی‌ها</span><svg class="desktop-nav-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></summary><div class="desktop-nav-dropdown"><a class="desktop-nav-all" href="/products" data-nav="/products">${headerIcon('store')}<span>همه‌ی محصولات</span></a>${categoryLinks}</div></details><a class="desktop-nav-link" href="/support" data-nav="/support">${headerIcon('headset')}<span>پشتیبانی</span></a><a class="desktop-nav-link desktop-nav-cart" href="/cart" data-nav="/cart">${headerIcon('cart')}<span>سبد خرید</span>${cartCount?`<i class="desktop-nav-count">${fmt(cartCount)}</i>`:''}</a><a class="desktop-nav-link" href="/profile" data-nav="/profile">${headerIcon('user')}<span>پروفایل</span></a><a class="desktop-nav-link" href="/account/wishlist" data-nav="/account/wishlist">${headerIcon('heart')}<span>علاقه‌مندی‌ها</span>${wishCount?`<i class="desktop-nav-count">${fmt(wishCount)}</i>`:''}</a></div></nav>`}
function themeToggleMarkup(){const dark=state.theme==='dark';return `<button type="button" class="header-theme-toggle theme-toggle ${dark?'theme-is-dark':''}" data-theme-toggle aria-label="${dark?'تغییر به تم روشن':'تغییر به تم تیره'}" aria-pressed="${dark}" title="${dark?'تم روشن':'تم تیره'}"><span class="theme-icon" aria-hidden="true"><i class="theme-icon-glow"></i><svg class="theme-sun" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><circle class="solar-draw" pathLength="1" cx="12.5" cy="12.5" r="4.2"/><path class="solar-draw" pathLength="1" d="M12.5 1.8v2.1m0 17.2v2.1M1.8 12.5h2.1m17.2 0h2.1M4.94 4.94l1.48 1.48m12.16 12.16 1.48 1.48m0-15.12-1.48 1.48M6.42 18.58l-1.48 1.48"/></svg><svg class="theme-moon" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path class="solar-draw" pathLength="1" d="M21.19 13.2a9 9 0 0 1-17.75-1.14 9 9 0 0 1 8-8.65 7.4 7.4 0 0 0 9.75 9.79Z"/></svg></span></button>`}
function footer(){return `<footer><div class="wrap footer-grid"><div><p>بلکسی گیم؛ فروشگاه بازی و اکانت دیجیتال.</p></div><div><b>خبرنامه‌ی بلکسی گیم</b><p>ایمیل خود را برای عضویت وارد کن.</p><form id="newsletter" class="newsletter"><input type="email" required placeholder="ایمیل شما"><button>عضویت</button></form></div></div><div class="wrap copyright">© ۱۴۰۵ بلکسی گیم. تمامی حقوق محفوظ است. <span>ساخته‌شده برای خرید بهتر ◇</span></div></footer>`}
function shell(content){return `${header()}<main>${content}</main>${footer()}`}
function categoryIcon(name){const paths={'کنسول‌ها':'<rect x="3" y="4" width="18" height="15" rx="2"/><path d="M8 21h8m-4-2v2"/>','بازی‌های فیزیکی':'<path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1"/>','اکانت دیجیتال':'<rect x="3" y="4" width="18" height="16" rx="2.5"/><circle cx="9" cy="10" r="2.5"/><path d="M5.5 17c.8-2 2-3 3.5-3s2.7 1 3.5 3m2-6h3m-3 3h3"/>','لوازم جانبی':'<path d="M4 13v-2a8 8 0 0 1 16 0v2"/><rect x="3" y="12" width="4" height="7" rx="2"/><rect x="17" y="12" width="4" height="7" rx="2"/>','سیستم گیمینگ':'<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8m-4-4v4"/>','واقعیت مجازی':'<path d="M3 10a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3l-1.3 7a2 2 0 0 1-2 1.6h-1.2a3 3 0 0 1-2.3-1.1l-1.1-1.3h-2.2l-1.1 1.3a3 3 0 0 1-2.3 1.1H7.3a2 2 0 0 1-2-1.6L4 10Z"/><path d="M7 10h4m-2-2v4m6-2h.01m2 0h.01"/>','گیفت‌کارت و اشتراک':'<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18m-9-4v13"/><path d="M9 6c-2.5 0-2.5-4 0-3 2 1 3 3 3 3m3 0c2.5 0 2.5-4 0-3-2 1-3 3-3 3"/>'};return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]||paths['کنسول‌ها']}</svg>`}
function categoryBlock(){const tiles=[['console','کنـسول‌های بـازی','PlayStation، Xbox و Nintendo','کنسول‌ها','/assets/cat-consoles.webp'],['games','بازی‌های فیزیـکی','نسخه‌های دیسکی بازی‌ها','بازی‌های فیزیکی','/assets/cat-games.webp'],['accounts','اکـانـت دیجیتال','کد و اکـانـت بازی','اکانت دیجیتال','/assets/cat-account.webp'],['gear','لـوازم جانبی','کنترلر، هدست و تجهیزات','لوازم جانبی','/assets/cat-controller.webp'],['vr','واقـعیت مجازی','هدست و تجهیزات VR','واقعیت مجازی','/assets/cat-vr.webp'],['pc','سیسـتم گیمینگ','PC، مانیتور و قطعات','سیستم گیمینگ','/assets/cat-pc.webp'],['gift','گیفـت‌کارت','اعتبار و اشتراک بازی','گیفت‌کارت و اشتراک','/assets/cat-gift.webp']];return `<section class="gaming-hub section"><div class="gaming-hub-heading"><div><div class="eyebrow">دسته‌بندی فروشگاه</div><h2>بازی و تجهیزات، یک‌جا</h2><p>دسته‌ی موردنظرت را انتخاب کن.</p></div><a href="/products" data-nav="/products" class="hub-all">همه‌ی دسته‌ها <span>←</span></a></div><div class="gaming-hub-grid">${tiles.map(([kind,title,sub,cat,image],index)=>`<a class="gaming-tile gaming-tile--${kind}" href="/category/${encodeURIComponent(cat)}" data-nav="/category/${encodeURIComponent(cat)}" aria-label="${title.replace(/ـ/g, '')}"><img class="gaming-tile-image" src="${image}" alt="" loading="lazy" decoding="async"><span class="gaming-tile-glow" aria-hidden="true"></span><span class="gaming-tile-copy"><small>${sub}</small><b>${title}</b><i>مشاهده‌ی دسته</i></span><span class="gaming-tile-index" aria-hidden="true">${String(index+1).padStart(2,'0')}</span></a>`).join('')}</div></section>`}
const HOME_SLIDE_DEFAULTS=[
  {id:'gta',label:'GTA VI',badge:'پیشنهاد ویژه امروز',title:'اکانت GTA VI',description:'دنیای باز، شب‌های نئونی، ماجراجویی بی‌پایان',chips:['تحویل سریع','پشتیبانی ۲۴ ساعته'],cta_label:'مشاهده و خرید',cta_href:'/product/22',image:'/assets/slider/gta-vi.webp',accent:'#ff4f8b',accent2:'#ffb04a',enabled:true,position:1},
  {id:'fc27',label:'FC 27',badge:'جدید و پرطرفدار',title:'EA SPORTS FC 27',description:'فوتبال را از نو تجربه کن، گل بزن و قهرمان شو',chips:['نسخه کنسول و PC','تحویل فوری'],cta_label:'مشاهده و خرید',cta_href:'/product/21',image:'/assets/slider/fc-27.webp',accent:'#2ee66b',accent2:'#b6f25a',enabled:true,position:2},
  {id:'cod',label:'بلک آپس ۷',badge:'اکشن و رقابتی',title:'کال آف دیوتی: بلک آپس ۷',description:'نسخه‌ی Standard دیجیتال برای PC / Steam؛ وارد میدان شو.',chips:['PC / Steam','نسخه Standard'],cta_label:'مشاهده و خرید',cta_href:'/product/69',image:'/assets/slider/call-of-duty.webp',accent:'#ff8a1f',accent2:'#ffc04a',enabled:true,position:3},
  {id:'forza',label:'فورزا ۵',badge:'مسابقه و ماجراجویی',title:'فورزا هورایزن ۵',description:'نسخه‌ی Standard دیجیتال برای Xbox و PC؛ به جاده‌های مکزیک بزن.',chips:['Xbox و PC','کد دیجیتال'],cta_label:'مشاهده و خرید',cta_href:'/product/39',image:'/assets/slider/forza-horizon-5.webp',accent:'#ffb34a',accent2:'#ff6a3d',enabled:true,position:4},
  {id:'nightreign',label:'نایت‌رین',badge:'نقش‌آفرینی حماسی',title:'الدن رینگ: نایت‌رین',description:'نسخه‌ی PS5؛ با دو هم‌تیمی تا سپیده‌دم بجنگ.',chips:['نسخه PS5','کوآپ آنلاین سه‌نفره'],cta_label:'مشاهده و خرید',cta_href:'/product/70',image:'/assets/slider/elden-ring.webp',accent:'#f2c45a',accent2:'#ffe39a',enabled:true,position:5}
];
const DEFAULT_HOME_CONTENT={slides:HOME_SLIDE_DEFAULTS.map(x=>({...x})),showcases:[]};
function normalizeHomeContent(value){
  const incoming=Array.isArray(value?.slides)?value.slides:[];
  const slides=HOME_SLIDE_DEFAULTS.map(base=>{
    const candidate=incoming.find(x=>x&&x.id===base.id)||{};
    const text=(v,fallback,max=160)=>typeof v==='string'?v.trim().slice(0,max):fallback;
    const color=(v,fallback)=>typeof v==='string'&&/^#[0-9a-fA-F]{6}$/.test(v)?v:fallback;
    const href=typeof candidate.cta_href==='string'&&candidate.cta_href.startsWith('/')&&!candidate.cta_href.startsWith('//')?candidate.cta_href:base.cta_href;
    const image=typeof candidate.image==='string'&&(candidate.image.startsWith('/assets/')||/^https:\/\//i.test(candidate.image))?candidate.image:base.image;
    return {...base,...candidate,id:base.id,label:text(candidate.label,base.label,50),badge:text(candidate.badge,base.badge,80),title:text(candidate.title,base.title,100),description:text(candidate.description,base.description,240),chips:Array.isArray(candidate.chips)?candidate.chips.slice(0,2).map((x,i)=>text(x,base.chips[i]||'',60)):base.chips,cta_label:text(candidate.cta_label,base.cta_label,50),cta_href:href,image,accent:color(candidate.accent,base.accent),accent2:color(candidate.accent2,base.accent2),enabled:candidate.enabled!==false,position:Number.isFinite(Number(candidate.position))?Math.max(1,Math.min(99,Number(candidate.position))):base.position};
  }).sort((a,b)=>a.position-b.position);
  if(!slides.some(x=>x.enabled))slides[0].enabled=true;
  const showcases=Array.isArray(value?.showcases)?value.showcases.slice(0,8).map((x,i)=>({id:`showcase-${i+1}`,title:String(x?.title||'ویترین جدید').trim().slice(0,80),description:String(x?.description||'').trim().slice(0,220),product_ids:Array.isArray(x?.product_ids)?[...new Set(x.product_ids.map(Number).filter(n=>Number.isInteger(n)&&n>0))].slice(0,30):[],enabled:x?.enabled!==false,position:Number.isFinite(Number(x?.position))?Number(x.position):i+1})).sort((a,b)=>a.position-b.position):[];
  return {slides,showcases};
}
function safeSlideImage(value){const url=String(value||'');if(url.startsWith('/assets/'))return url;try{const parsed=new URL(url);return parsed.protocol==='https:'?parsed.href:'/assets/slider/gta-vi.webp'}catch{return '/assets/slider/gta-vi.webp'}}
function featureSliderMarkup(){
  const source=document.querySelector('#feature-slider-template')?.innerHTML||'';
  if(!source)return '';
  const box=document.createElement('div');box.innerHTML=source;
  const root=box.querySelector('.feature-slider');if(!root)return source;
  const content=normalizeHomeContent(state.homeContent||DEFAULT_HOME_CONTENT),ids=HOME_SLIDE_DEFAULTS.map(x=>x.id),slides=[...root.querySelectorAll('.s')],tabs=[...root.querySelectorAll('.tab')],slideMap=new Map(ids.map((id,i)=>[id,slides[i]])),tabMap=new Map(ids.map((id,i)=>[id,tabs[i]]));
  const ordered=[];
  for(const config of content.slides){const slide=slideMap.get(config.id),tab=tabMap.get(config.id);if(!slide||!tab)continue;if(!config.enabled){slide.remove();tab.remove();continue}
    const badge=slide.querySelector('.ct .bd'),title=slide.querySelector('.ct h2'),description=slide.querySelector('.ct p'),chips=[...slide.querySelectorAll('.ct .tg i')],cta=slide.querySelector('.ct .cta'),tabLabel=tab.querySelector('span');
    if(badge)badge.textContent=config.badge;if(title)title.textContent=config.title;if(description)description.textContent=config.description;
    chips.forEach((el,i)=>{el.textContent=config.chips[i]||'';el.hidden=!config.chips[i]});
    if(cta){cta.href=config.cta_href;cta.dataset.nav=config.cta_href;const labelNode=[...cta.childNodes].find(n=>n.nodeType===Node.TEXT_NODE);if(labelNode)labelNode.textContent=`${config.cta_label} `}
    if(tabLabel)tabLabel.textContent=config.label;
    slide.style.setProperty('--ac',config.accent);slide.style.setProperty('--ac2',config.accent2);slide.style.setProperty('--img',`url(${JSON.stringify(safeSlideImage(config.image))})`);tab.style.setProperty('--ac',config.accent);tab.style.setProperty('--ac2',config.accent2);slide.dataset.homeSlideId=config.id;ordered.push({slide,tab});
  }
  const fx=root.querySelector('.fx'),nav=root.querySelector('.nav'),slideFragment=document.createDocumentFragment(),tabFragment=document.createDocumentFragment();
  ordered.forEach((x,i)=>{x.slide.classList.toggle('on',i===0);x.slide.classList.remove('prev');x.tab.classList.toggle('on',i===0);x.tab.setAttribute('aria-pressed',i===0?'true':'false');slideFragment.appendChild(x.slide);tabFragment.appendChild(x.tab)});
  if(fx)root.insertBefore(slideFragment,fx);else root.appendChild(slideFragment);
  if(nav)nav.appendChild(tabFragment);
  const counter=root.querySelector('[data-slider-count]');if(counter)counter.textContent=`۰۱ / ${String(ordered.length).padStart(2,'0').replace(/\d/g,d=>'۰۱۲۳۴۵۶۷۸۹'[Number(d)])}`;
  return root.outerHTML;
}
function customShowcasesMarkup(){
  const config=normalizeHomeContent(state.homeContent||DEFAULT_HOME_CONTENT);
  return config.showcases.filter(x=>x.enabled&&x.product_ids.length).map((showcase,index)=>{
    const chosen=showcase.product_ids.map(id=>products.find(p=>Number(p.id)===id)).filter(Boolean);
    if(!chosen.length)return '';
    return `<section class="section admin-home-showcase" aria-label="${escHtml(showcase.title)}"><div class="section-head"><div><div class="eyebrow">ویترین بلکسی گیم</div><h2>${escHtml(showcase.title)}</h2>${showcase.description?`<p>${escHtml(showcase.description)}</p>`:''}</div></div><div class="product-grid">${chosen.map(productCard).join('')}</div></section>`;
  }).join('');
}
function home(){return `<div class="wrap">${featureSliderMarkup()}<section class="monitor-showcase section" aria-label="ویترین مانیتورهای گیمینگ"><div class="monitor-showcase-head"><div><div class="eyebrow">ویترین بلکسی گیم</div><h2>مانیتورهای گیمینگ</h2><p>قیمت‌ها در ۱۱ مهر ۱۴۰۵ از منابع آنلاین بررسی شده‌اند و ممکن است تغییر کنند.</p></div></div><div class="monitor-track" id="monitor-track" dir="rtl" tabindex="0" aria-label="پنج مانیتور؛ با کشیدن موس یا لمس افقی پیمایش کنید">${monitors.map((monitor,index)=>`<article class="monitor-card" data-model="monitor-${index+1}"><div class="monitor-image-wrap"><img src="${monitor.image}" alt="${monitor.name}" loading="lazy" fetchpriority="low" decoding="async"></div><div class="monitor-card-body"><h3 dir="ltr">${monitor.name}</h3><a class="monitor-price" href="${monitor.url}" target="_blank" rel="noopener noreferrer"><span><strong>${money(monitor.price)}</strong></span></a><a class="monitor-details product-glow-btn" href="/product/${index+1}" data-nav="/product/${index+1}">جزئیات محصول</a></div></article>`).join('')}</div></section><section class="monitor-showcase mouse-showcase section" aria-label="ویترین ماوس‌های گیمینگ"><div class="monitor-showcase-head"><div><h2>ماوس‌های گیمینگ</h2><p>قیمت‌ها در ۱۱ مهر ۱۴۰۵ از منابع آنلاین بررسی شده‌اند و ممکن است تغییر کنند.</p></div></div><div class="monitor-track mouse-track" id="mouse-track" dir="rtl" tabindex="0" aria-label="ماوس‌های گیمینگ؛ با کشیدن موس یا لمس افقی پیمایش کنید">${products.filter(product=>product.kind==='ماوس گیمینگ').map((mouse,index)=>`<article class="monitor-card mouse-card" data-model="mouse-${index+1}"><div class="monitor-image-wrap"><img src="${escHtml(safeImageUrl(mouse.art||mouse.image_url||mouse.images?.[0]))}" alt="${escHtml(mouse.name)}" loading="lazy" decoding="async"></div><div class="monitor-card-body"><h3 dir="ltr">${escHtml(mouse.name)}</h3><a class="monitor-price" href="${escHtml(safeLinkUrl(mouse.price_source_url||mouse.source_url))}" target="_blank" rel="noopener noreferrer"><span><strong>${money(mouse.price)}</strong></span></a><a class="monitor-details mouse-details product-glow-btn" href="/product/${mouse.id}" data-nav="/product/${mouse.id}">جزئیات محصول</a></div></article>`).join('')}</div></section><section class="monitor-showcase keyboard-showcase section" aria-label="ویترین کیبوردهای گیمینگ"><div class="monitor-showcase-head"><div><h2>کیبوردهای گیمینگ</h2><p>قیمت و مشخصات از ترب؛ برای جزئیات هر محصول وارد صفحه‌ی آن شوید.</p></div></div><div class="monitor-track keyboard-track" id="keyboard-track" dir="rtl" tabindex="0" aria-label="کیبوردهای گیمینگ؛ با کشیدن موس یا لمس افقی پیمایش کنید">${products.filter(product=>product.kind==='کیبورد گیمینگ'&&product.id>=59&&product.id<=68).map((keyboard,index)=>`<article class="monitor-card keyboard-card" data-model="keyboard-${index+1}"><div class="monitor-image-wrap"><img src="${escHtml(safeImageUrl(keyboard.art||keyboard.image_url||keyboard.images?.[0]))}" alt="${escHtml(keyboard.name)}" loading="lazy" decoding="async"></div><div class="monitor-card-body"><h3 dir="ltr">${escHtml(keyboard.name)}</h3><a class="monitor-price" href="${escHtml(safeLinkUrl(keyboard.price_source_url||keyboard.source_url))}" target="_blank" rel="noopener noreferrer"><span><strong>${money(keyboard.price)}</strong></span></a><a class="monitor-details product-glow-btn" href="/product/${keyboard.id}" data-nav="/product/${keyboard.id}">جزئیات محصول</a></div></article>`).join('')}</div></section>${categoryBlock()}<section class="blacksy-landing" aria-labelledby="blacksy-landing-title"><div class="blacksy-landing-copy"><div class="blacksy-landing-brand"><span class="blacksy-landing-mark"><img src="/assets/blacksy-game-mark.png" alt="" width="22" height="34" decoding="async"></span><span class="blacksy-landing-brand-copy"><strong>بلکسی گیم</strong><small>BLACKSY GAME</small></span></div><span class="blacksy-landing-kicker">فروشگاه بازی و تجهیزات گیمینگ</span><h1 id="blacksy-landing-title">دنیای بازی،<br><em>انتخابِ بهتر.</em></h1><p>از بازی و اکانت تا کنسول و لوازم گیمینگ؛ انتخابت را از یک‌جا شروع کن.</p><div class="blacksy-landing-actions"><a class="blacksy-landing-primary" href="/products" data-nav="/products">دیدن محصولات <span aria-hidden="true">←</span></a><a class="blacksy-landing-secondary" href="/support" data-nav="/support">راهنمای خرید</a></div><div class="blacksy-landing-highlights"><span>بازی و اکانت</span><i aria-hidden="true"></i><span>کنسول و تجهیزات</span></div></div><div class="blacksy-landing-visual"><img src="/assets/blacksy-landing-portrait.jpg" alt="چیدمان ساده‌ی کنسول، کنترلر و هدست گیمینگ" width="864" height="1536" fetchpriority="high" decoding="async"><span class="blacksy-landing-photo-note">BLACKSY GAME <i aria-hidden="true"></i> PLAY YOUR WAY</span></div></section><section class="section games-accounts-showcase"><div class="section-head"><div><div class="eyebrow">FC 27 و GTA VI</div><h2>بازی‌ها و اکـانـت‌ها</h2></div><a class="text-link" href="/products" data-nav="/products">همه‌ی بازی‌ها ←</a></div><div class="product-grid">${products.map(productCard).join('')}</div></section>${customShowcasesMarkup()}<section class="section coming-soon"><div class="section-head"><div><div class="eyebrow">فهرست فروشگاه</div><h2>بازی‌های بیشتر</h2></div></div><p>محصولات و قیمت‌ها پس از بررسی اضافه می‌شوند.</p></section></div>`}
function catalogMatchesCategory(p,category){if(!category||category==='بازی‌های جدید')return true;if(category==='اکانت دیجیتال'||category==='اکانت بازی')return p.kind==='اکانت بازی';if(category==='بازی‌های فیزیکی')return p.kind==='بازی';if(category==='کنسول‌ها')return p.kind==='کنسول بازی';if(category==='لوازم جانبی')return ['لوازم جانبی','موس Gaming','کیبورد Gaming','هدست Gaming','میکروفون Gaming','Mouse Pad','دسته بازی','تجهیزات Streaming','صندلی Gaming','Action Figure و Collectible'].includes(p.category);if(category==='واقعیت مجازی')return p.kind==='واقعیت مجازی';if(category==='سیستم گیمینگ')return p.platforms?.includes('PC');if(category==='گیفت‌کارت و اشتراک'||category==='گیفت‌کارت')return p.kind==='گیفت‌کارت'||p.kind==='اشتراک بازی';if(category==='اشتراک بازی')return p.kind==='اشتراک بازی';if(['PlayStation','Xbox','PC','Nintendo'].includes(category))return p.platforms?.includes(category);return p.category===category||p.cat===category}function catalog(title='همه‌ی بازی‌ها',category=''){let list=products.filter(p=>catalogMatchesCategory(p,category)&&(p.price==null?state.min===0&&state.max===1000000000:p.price>=state.min&&p.price<=state.max)&&(!state.query||`${p.name} ${p.brand} ${p.model} ${p.cat} ${p.category}`.toLocaleLowerCase().includes(state.query.toLocaleLowerCase())));if(state.sort==='cheap')list.sort((a,b)=>(a.price??Infinity)-(b.price??Infinity));if(state.sort==='expensive')list.sort((a,b)=>(b.price??-Infinity)-(a.price??-Infinity));if(state.sort==='sale')list=list.filter(p=>p.old);return `<div class="wrap catalog-page"><div class="breadcrumbs"><a href="/" data-nav="/">خانه</a>　/　${escHtml(title)}</div><div class="catalog-title"><div><div class="eyebrow">محصولات بلکسی گیم</div><h1>${escHtml(title)}</h1><p>${list.length} محصول</p></div><button class="filter-mobile" id="open-filter"><svg class="ui-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M7 12h10m-7 6h4"/></svg><span>فیلترها</span></button></div><div class="catalog-layout"><aside class="filters ${state.filterOpen?'filter-visible':''}" id="filters"><div class="filter-heading"><b>فیلتر محصولات</b><button id="close-filter">×</button></div><div class="filter-group"><b>دسته‌بندی</b>${cats.map(c=>`<label><input type="checkbox" data-cat="${c[0]}" ${category===c[0]?'checked':''}> ${c[0]}</label>`).join('')}</div><div class="filter-group"><b>محدوده قیمت</b><label class="price-filter">از <input id="min-price" type="number" value="${state.min||''}"></label><label class="price-filter">تا <input id="max-price" type="number" value="${state.max===1000000000?'':state.max}"></label><button class="apply-filter" id="apply-filter">اعمال قیمت</button></div><div class="filter-group"><b>ویژگی‌ها</b><label><input type="checkbox" id="discount-only" ${state.sort==='sale'?'checked':''}> فقط تخفیف‌دارها</label></div><button class="clear-filter" id="clear-filter">پاک کردن فیلترها</button></aside><div class="catalog-results"><div class="sortbar"><span>مرتب‌سازی:</span><button data-sort="default" class="${state.sort==='default'?'selected':''}">پیش‌فرض</button><button data-sort="cheap" class="${state.sort==='cheap'?'selected':''}">ارزان‌ترین</button><button data-sort="expensive" class="${state.sort==='expensive'?'selected':''}">گران‌ترین</button><button data-sort="sale" class="${state.sort==='sale'?'selected':''}">بیشترین تخفیف</button></div>${list.length?`<div class="product-grid">${list.map(productCard).join('')}</div>`:`<div class="empty-state"><span>⌕</span><h3>محصولی پیدا نشد</h3><p>عبارت دیگری را جستجو کن یا فیلترها را تغییر بده.</p><button class="primary-btn" id="reset-search">پاک کردن جستجو</button></div>`}</div></div></div>`}
const products=await fetch('/data/products.json').then(response=>{if(!response.ok)throw new Error('Product catalog could not be loaded');return response.json()});

const monitors=[
{name:'ASUS ROG Strix OLED XG27ACDNG',image:'/assets/monitors/asus-xg27acdng.webp?v=2',spec:'۲۷ اینچ · QD-OLED · QHD · 360Hz',price:298800000,source:'TopRayan',url:'https://toprayan.com/product/62655/asus-rog-strix-oled-xg27acdng-27-inch-quad-hd-0.03ms-(gtg)-360hz-qd-oled-gaming-monitor',detailsUrl:'https://rog.asus.com/monitors/27-to-31-5-inches/rog-strix-oled-xg27acdng/'},
{name:'ASUS TUF Gaming VG27AQ5A',image:'/assets/monitors/asus-vg27aq5a.webp?v=2',spec:'۲۷ اینچ · Fast IPS · QHD · 210Hz OC',price:64890000,source:'Torob',url:'https://torob.com/p/81fd42af-03ef-4725-b487-9f51474881af/مانیتور-گیمینگ-ایسوس-مدل-tuf-gaming-vg27aq5a-سایز-27-اینچ-qhd-210-هرتز/',detailsUrl:'https://www.asus.com/displays-desktops/monitors/tuf-gaming/tuf-gaming-vg27aq5a/'},
{name:'ASUS ROG Swift OLED PG27UCDM',image:'/assets/monitors/asus-pg27ucdm.webp?v=2',spec:'۲۷ اینچ · QD-OLED · 4K · 240Hz',price:271999000,source:'Torob',url:'https://torob.com/p/064a8879-67d9-4e46-903f-6c880ef0d375/مانیتور-گیمینگ-ایسوس-rog-pg27ucdm-سایز-27-اینچ-oled-با-زمان-پاسخگویی-003-میلی-ثانیه/',detailsUrl:'https://rog.asus.com/monitors/27-to-31-5-inches/rog-swift-oled-pg27ucdm/'},
{name:'MSI MAG 272PF X24',image:'/assets/monitors/msi-mag-272pf-x24.webp?v=2',spec:'۲۷ اینچ · Rapid IPS · Full HD · 240Hz',price:51000000,source:'Zoomit',url:'https://www.zoomit.ir/product/msi-mag-272pf-x24-fhd/',detailsUrl:'https://www.msi.com/Monitor/MAG-272PF-X24'},
{name:'MSI G275L E14',image:'/assets/monitors/msi-g275l-e14.webp?v=2',spec:'۲۷ اینچ · IPS · Full HD · 144Hz',price:38000000,source:'Poromix',url:'https://www.poromix.com/product-5807/g275l-e14',detailsUrl:'https://www.msi.com/Monitor/G275L-E14'}
];
const cats=[['کنسول‌ها','console','#f8e9df'],['بازی‌های فیزیکی','disc','#efe9ff'],['اکانت دیجیتال','account','#fff0e5'],['لوازم جانبی','gear','#fff1e6'],['سیستم گیمینگ','pc','#e8f1ff'],['واقعیت مجازی','vr','#e6f6ff'],['گیفت‌کارت و اشتراک','gift','#f8efe8']];
const money=n=>n==null?'قیمت به‌زودی':new Intl.NumberFormat('fa-IR').format(n)+' تومان';const faNum=n=>new Intl.NumberFormat('fa-IR').format(n||0);const img=key=>`https://images.unsplash.com/${key}?auto=format&fit=crop&w=600&q=80`;
function readLocalValue(key){try{return localStorage.getItem(key)}catch{return null}}
function readLocalJson(key,fallback){try{return JSON.parse(localStorage.getItem(key)||JSON.stringify(fallback))}catch{return fallback}}
function secureHex(bytes=32){const data=new Uint8Array(bytes);crypto.getRandomValues(data);return [...data].map(v=>v.toString(16).padStart(2,'0')).join('')}
function secureUuid(){if(crypto.randomUUID)return crypto.randomUUID();const a=crypto.getRandomValues(new Uint8Array(16));a[6]=(a[6]&15)|64;a[8]=(a[8]&63)|128;const h=[...a].map(v=>v.toString(16).padStart(2,'0')).join('');return `${h.slice(0,8)}-${h.slice(8,12)}-${h.slice(12,16)}-${h.slice(16,20)}-${h.slice(20)}`}
const supportThreadKey='blacksy-support-thread-v2',supportSecretKey='blacksy-support-secret-v2';
let initThreadId='',initThreadSecret='';
try{
  initThreadId=localStorage.getItem(supportThreadKey)||'';
  if(!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(initThreadId))initThreadId=secureUuid();
  initThreadSecret=localStorage.getItem(supportSecretKey)||'';
  if(!/^[0-9a-f]{64}$/.test(initThreadSecret))initThreadSecret=secureHex(32);
  localStorage.setItem(supportThreadKey,initThreadId);
  localStorage.setItem(supportSecretKey,initThreadSecret);
  localStorage.removeItem('blakci-support-tid');
  localStorage.removeItem('blakci-support-msgs');
  localStorage.removeItem('blakci-support-name');
  localStorage.removeItem('blakci-support-contact');
  localStorage.removeItem('blakci-orders');
}catch{initThreadId=initThreadId||secureUuid();initThreadSecret=initThreadSecret||secureHex(32)}
const state={
  cart:readLocalJson('blakci-cart',{}),
  wish:readLocalJson('blakci-wish',[]),
  orders:[],
  supportTid:initThreadId,
  supportSecret:initThreadSecret,
  supportName:'',
  supportContact:'',
  supportMessages:[],
  homeContent:null,
  theme:readLocalValue('blakci-theme')==='dark'?'dark':'light',
  query:'',cat:'',sort:'default',min:0,max:1000000000,filterOpen:false
};
document.documentElement.dataset.theme=state.theme;
if(!state.cart||typeof state.cart!=='object'||Array.isArray(state.cart))state.cart={};
Object.entries(state.cart).forEach(([id,qty])=>{const product=products.find(item=>Number(item.id)===Number(id)&&Number(item.price)>0),n=Math.trunc(Number(qty)),limit=product?.stock==null?20:Math.min(20,Number(product.stock));if(!product||!Number.isFinite(n)||n<1||limit<1)delete state.cart[id];else state.cart[id]=Math.min(limit,n)});
if(!Array.isArray(state.wish))state.wish=[];state.wish=[...new Set(state.wish.map(Number).filter(id=>products.some(p=>Number(p.id)===id)))];
const app=document.querySelector('#app');
function save(){
  try{localStorage.setItem('blakci-cart',JSON.stringify(state.cart));localStorage.setItem('blakci-wish',JSON.stringify(state.wish))}catch{}
}
function addCartItem(id,checkoutNow=false){
  const product=products.find(item=>Number(item.id)===Number(id));
  if(!product||product.price==null||Number(product.price)<=0){toast('این کالا هنوز قیمت تأییدشده ندارد.');return}
  const current=Number(state.cart[id]||0),limit=product.stock==null?20:Math.min(20,Number(product.stock));
  if(limit<1||current>=limit){toast(product.stock===0?'این کالا در حال حاضر ناموجود است.':'حداکثر تعداد مجاز برای این کالا ثبت شده است.');return}
  state.cart[id]=current+1;save();
  if(checkoutNow)go('/checkout');else{toast('به سبد خرید اضافه شد');render()}
}
function go(path){history.pushState({},'',path);render();window.scrollTo(0,0)}
function safeImageUrl(value){const raw=String(value||'').trim();if(/^\/assets\/[a-z0-9_./?=&%-]+$/i.test(raw)&&!raw.includes('..'))return raw;try{const url=new URL(raw,location.origin);return url.protocol==='https:'?url.href:'/assets/fc-27-cover.jpg'}catch{return '/assets/fc-27-cover.jpg'}}
function safeLinkUrl(value){const raw=String(value||'').trim();if(raw.startsWith('/')&&!raw.startsWith('//'))return raw;try{const url=new URL(raw);return url.protocol==='https:'?url.href:'#'}catch{return '#'}}
function productCard(p){const id=Number(p.id)||0,discount=p.old&&p.price?Math.round((1-p.price/p.old)*100):0,name=escHtml(p.name),kind=escHtml(p.kind||'بازی'),category=escHtml(p.cat||p.category||''),image=escHtml(safeImageUrl(p.art||p.image_url||p.images?.[0]||img(p.image)));return `<article class="product-card"><div class="product-image" role="link" tabindex="0" data-product="${id}"><img loading="lazy" fetchpriority="low" decoding="async" src="${image}" alt="${name}"><span class="tag ${p.old?'tag-sale':''}">${p.old?`${discount}٪ تخفیف`:p.kind==='اکانت بازی'?'اکـانـت بازی':kind}</span><button class="wish ${state.wish.includes(id)?'is-wish':''}" data-wish="${id}" aria-label="افزودن به علاقه‌مندی‌ها">${headerIcon('heart')}</button></div><div class="product-info"><div class="product-cat">${category}</div><h3 role="link" tabindex="0" data-product="${id}">${name}</h3><div class="price-line">${p.old?`<del>${money(p.old)}</del>`:''}<strong>${p.price?money(p.price):'قیمت به‌زودی'}</strong></div><button class="add-btn details-btn product-glow-btn" data-product="${id}">جزئیات محصول</button></div></article>`}

function detail(id){
 const p=products.find(x=>x.id===+id)||products[0];
 if(!p)return `<div class="wrap standard-page"><div class="empty-state"><h1>محصولی پیدا نشد</h1><a href="/products" data-nav="/products" class="primary-btn">بازگشت به محصولات</a></div></div>`;
 const pid=Number(p.id)||0,name=escHtml(p.name),category=escHtml(p.cat||p.category||''),image=escHtml(safeImageUrl(p.art||p.image_url||p.images?.[0]||img(p.image)));
 const available=p.stock==null||Number(p.stock)>0;
 const purchaseActions=p.price>0&&available?`<button class="primary-btn product-glow-btn" data-add="${pid}">افزودن به سبد خرید　＋</button><button class="outline-btn product-glow-btn" data-buy="${pid}">خرید سریع</button>`:p.stock===0?`<span class="outline-btn" aria-label="ناموجود">ناموجود</span>`:pid===22?`<button type="button" class="gta-preorder-rgb product-glow-btn preorder-disabled" disabled title="امکان ثبت پیش‌خرید پس از تأیید قیمت و موجودی فعال می‌شود">پیش‌خرید · به‌زودی</button>`:`<span class="outline-btn">قیمت و موجودی پس از بررسی اعلام می‌شود.</span>`;
 const wishButton=`<button class="round-btn" data-wish="${pid}" aria-label="افزودن به علاقه‌مندی‌ها">${headerIcon('heart')}</button>`;
 const specs=Object.entries(p.specifications||{}).map(([key,value])=>`<span>${escHtml(key)}</span><b>${escHtml(typeof value==='string'?value:JSON.stringify(value))}</b>`).join('');
 const source=safeLinkUrl(p.source_url),description=escHtml(p.description||''),shortDescription=escHtml(p.short_description||'');
 return `<div class="wrap detail-page"><div class="breadcrumbs"><a href="/" data-nav="/">خانه</a>　/　${category}　/　${name}</div><div class="detail-grid"><div class="gallery"><div class="main-photo"><img src="${image}" alt="${name}" fetchpriority="high" decoding="async"></div><div class="thumb-row"><img src="${image}" alt="نمای محصول"></div></div><div class="detail-info"><span class="eyebrow">${category}　·　کد محصول BG-${pid}24</span><h1>${name}</h1><div class="detail-price">${p.old?`<del>${money(p.old)}</del>`:''}<strong>${p.price?money(p.price):'قیمت به‌زودی'}</strong></div><div class="detail-actions">${purchaseActions}${wishButton}</div></div></div><div class="detail-tabs"><button class="tab active">معرفی محصول</button><button class="tab" id="spec-tab">مشخصات فنی</button><button class="tab" data-scroll="reviews">دیدگاه‌ها</button></div><section class="detail-description full-desc" id="specs"><h2>معرفی و مشخصات کالا</h2>${shortDescription?`<p class="detail-summary">${shortDescription}</p>`:''}${description&&description!==shortDescription?`<p>${description}</p>`:''}<div class="spec-table"><span>برند</span><b>${escHtml(p.brand)}</b><span>مدل</span><b>${escHtml(p.model)}</b><span>دسته‌بندی</span><b>${escHtml(p.category||p.cat)}</b><span>وضعیت موجودی</span><b>${p.stock==null?'نیازمند تأیید فروشگاه':p.stock>0?'موجود':'ناموجود'}</b><span>قیمت</span><b>${p.price==null?'قیمت به‌زودی':money(p.price)}</b><span>قیمت بررسی‌شده در</span><b>${escHtml(p.checked_at||'')}</b>${specs}<span>منبع قیمت / مشخصات</span><b><a href="${escHtml(source)}" target="_blank" rel="noopener noreferrer">${escHtml(p.source||'منبع')}</a></b></div></section><section class="reviews" id="reviews"><h2>دیدگاه‌ها</h2><p>هنوز دیدگاهی برای این کالا ثبت نشده است.</p></section><section class="section"><div class="section-head"><h2>محصولات مشابه</h2></div><div class="product-grid">${products.filter(x=>x.id!==p.id).slice(0,4).map(productCard).join('')}</div></section></div>`
}
function cartPage(){let es=Object.entries(state.cart).map(([id,q])=>[products.find(p=>p.id==id),q]).filter(x=>x[0]&&x[0].price!=null),sum=es.reduce((a,[p,q])=>a+p.price*q,0),disc=es.reduce((a,[p,q])=>a+(p.old?p.old-p.price:0)*q,0),ship=0;return `<div class="wrap standard-page"><div class="breadcrumbs">خانه　/　سبد خرید</div><h1>سبد خرید <small>(${es.length} کالا)</small></h1>${es.length?`<div class="cart-layout"><div class="cart-items">${es.map(([p,q])=>`<article class="cart-item"><img src="${escHtml(safeImageUrl(p.art||p.image_url||p.image))}" alt="${escHtml(p.name)}" loading="lazy" decoding="async"><div class="cart-item-info"><a href="/product/${Number(p.id)||0}" data-nav="/product/${Number(p.id)||0}"><b>${escHtml(p.name)}</b></a><small>کالای انتخاب‌شده</small><strong>${money(p.price)}</strong><div class="quantity"><button data-qty="${p.id}" data-delta="-1">−</button><span>${q}</span><button data-qty="${p.id}" data-delta="1">+</button><button class="remove" data-remove="${p.id}">حذف</button></div></div></article>`).join('')}</div><aside class="summary"><h3>خلاصه سفارش</h3><div><span>قیمت کالاها</span><b>${money(sum)}</b></div><div><span>تخفیف</span><b class="green">− ${money(disc)}</b></div><div><span>هزینه ارسال</span><b>پس از ثبت نشانی</b></div><hr><div class="total"><span>مبلغ قابل پرداخت</span><b>${money(sum+ship)}</b></div><button class="primary-btn wide" data-nav="/checkout">ادامه و ثبت سفارش</button><p>هزینه ارسال بعد از ثبت نشانی مشخص می‌شود.</p></aside></div>`:`<div class="empty-state"><span>${headerIcon('cart')}</span><h3>سبد خریدت هنوز خالیه</h3><p>هنوز کالایی به سبد اضافه نکرده‌ای.</p><a href="/products" data-nav="/products" class="primary-btn">دیدن محصولات</a></div>`}</div>`}
function checkout(){return `<div class="wrap standard-page"><div class="breadcrumbs">خانه　/　سبد خرید　/　ثبت سفارش</div><h1>تکمیل سفارش</h1><div class="steps"><span class="active">۱　اطلاعات و آدرس</span><span>۲　روش ارسال</span><span>۳　پرداخت</span></div><form id="checkout-form" class="checkout-layout"><div class="checkout-card"><h2>اطلاعات تحویل سفارش</h2><div class="form-grid"><label>نام و نام خانوادگی<input name="customer_name" required placeholder="نام گیرنده"></label><label>شماره موبایل<input name="customer_phone" required type="tel" placeholder="۰۹۱۲۱۲۳۴۵۶۷"></label><label class="full">نشانی کامل<input name="address" required placeholder="استان، شهر، خیابان، پلاک و واحد"></label><label>کد پستی<input name="postal_code" required placeholder="۱۰ رقمی"></label><label>روش ارسال<select name="shipping_method"><option>ارسال بلکسی گیم — رایگان</option><option>ارسال سریع</option></select></label></div><h2 class="payment-title">روش پرداخت</h2><label class="payment-option"><input type="radio" name="payment" value="پرداخت اینترنتی" checked> پرداخت اینترنتی <small>اتصال درگاه بانکی هنوز فعال نشده است.</small></label><label class="payment-option"><input type="radio" name="payment" value="پرداخت در محل"> پرداخت در محل <small>پرداخت هنگام تحویل سفارش</small></label></div><aside class="summary"><h3>خلاصه سفارش</h3><div><span>تعداد کالا</span><b>${faNum(Object.values(state.cart).reduce((a,b)=>a+b,0))}</b></div><div><span>هزینه ارسال</span><b>پس از ثبت نشانی</b></div><hr><div class="total"><span>مبلغ قابل پرداخت</span><b>${money(Object.entries(state.cart).reduce((a,[id,q])=>a+(products.find(p=>p.id==id)?.price||0)*q,0))}</b></div><button class="primary-btn wide" type="submit">ثبت سفارش</button><p>سفارش ابتدا در وضعیت «در انتظار بررسی» ثبت می‌شود؛ پرداخت آنلاین پس از اتصال درگاه فعال خواهد شد.</p></aside></form></div>`}
function account(path){
  if(path.includes('wishlist'))return `<div class="wrap standard-page"><div class="breadcrumbs">خانه　/　حساب کاربری　/　علاقه‌مندی‌ها</div><h1>علاقه‌مندی‌های من</h1><div class="product-grid">${products.filter(p=>state.wish.includes(p.id)).map(productCard).join('')||'<div class="empty-state"><span><svg class="header-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.8 8.8c0 4.1-8.8 10-8.8 10s-8.8-5.9-8.8-10a4.8 4.8 0 0 1 8.8-2.7 4.8 4.8 0 0 1 8.8 2.7Z"/></svg></span><h3>هنوز چیزی ذخیره نکردی</h3><p>محصولات مورد علاقه‌ات را اینجا نگه دار.</p><a href="/products" data-nav="/products" class="primary-btn">کشف محصولات</a></div>'}</div></div>`;
  if(path.includes('orders'))return `<div class="wrap standard-page"><div class="breadcrumbs">خانه　/　حساب کاربری　/　سفارش‌ها</div><h1>سفارش‌های من</h1>${state.orders.length?`<div class="cart-items">${state.orders.map(o=>`<article class="cart-item" style="grid-template-columns:1fr"><div class="cart-item-info"><b>سفارش ${escHtml(o.code)} — ${escHtml(o.date)}</b><small>${o.items.map(it=>`${escHtml(it.name)} (×${faNum(it.qty)})`).join('، ')}</small><strong>${money(o.total)}</strong></div></article>`).join('')}</div>`:`<div class="order-empty"><span>${headerIcon('orders')}</span><h3>هنوز سفارشی ثبت نکرده‌ای</h3><p>بعد از ثبت سفارش، وضعیت و جزئیات آن را همین‌جا دنبال کن.</p><a href="/products" data-nav="/products" class="primary-btn">شروع خرید</a></div>`}</div>`;
  return `<div class="wrap standard-page"><div class="breadcrumbs">خانه　/　حساب کاربری</div><h1>سلام، خوش آمدی <span class="green">●</span></h1><div class="account-layout"><aside class="account-menu"><b>حساب من</b><a href="/account" data-nav="/account">${headerIcon('home')}<span>نمای کلی</span></a><a href="/account/orders" data-nav="/account/orders">${headerIcon('orders')}<span>سفارش‌های من</span></a><a href="/account/wishlist" data-nav="/account/wishlist">${headerIcon('heart')}<span>علاقه‌مندی‌ها</span></a><a href="/login" data-nav="/login">${headerIcon('logout')}<span>خروج از حساب</span></a></aside><div class="account-content"><div class="account-welcome"><span class="account-avatar">ب</span><div><small>حساب کاربری بلکسی گیم</small><h2>اطلاعات حساب و سفارش‌ها</h2></div><a class="outline-btn" href="/account/orders" data-nav="/account/orders">سفارش‌ها ←</a></div><div class="account-stats"><div><small>سفارش‌های ثبت‌شده</small><b>${faNum(state.orders.length)}</b></div><div><small>علاقه‌مندی‌ها</small><b>${faNum(state.wish.length)}</b></div><div><small>امتیاز وفاداری</small><b>۰ <small>امتیاز</small></b></div></div><h3>پیشنهاد برای تو</h3><div class="product-grid">${products.slice(0,2).map(productCard).join('')}</div></div></div></div>`;
}
function escapeProfileText(value=''){return String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]))}
function safeProfileAvatarUrl(value=''){const url=String(value||'').trim();return /^https:\/\/[^\s"<>]+$/i.test(url)||/^data:image\/(?:webp|png|jpeg);base64,[a-z0-9+/=]+$/i.test(url)?url:''}
function profileLoading(){return `<div class="wrap standard-page profile-page"><div class="profile-loading" role="status" aria-live="polite"><span class="profile-loading-dot"></span>در حال بررسی حساب کاربری…</div></div>`}
function profileGate(){return `<div class="wrap standard-page profile-page"><section class="profile-gate"><span class="profile-gate-mark"><img src="/assets/blacksy-game-mark.png" alt="" width="28" height="42"></span><span class="eyebrow">پروفایل شخصی بلکسی گیم</span><h1>برای ساخت پروفایلت، ثبت‌نام کن</h1><p>با ساخت حساب می‌توانی اطلاعاتت را مدیریت کنی، عکس پروفایل بگذاری و سفارش‌ها و علاقه‌مندی‌هایت را یک‌جا ببینی.</p><div class="profile-gate-actions"><a class="primary-btn" href="/register" data-nav="/register">ثبت‌نام رایگان</a><a class="profile-gate-login" href="/login" data-nav="/login">قبلاً حساب ساخته‌ای؟ <b>وارد شو</b></a></div><div class="profile-gate-note">ثبت‌نام کرده‌ای؟ با همان ایمیل قبلی وارد شو تا پروفایلت باز شود.</div></section></div>`}
function profilePage(user,record={}){const meta=user?.user_metadata||{},name=String(meta.full_name||record.full_name||meta.name||user?.email?.split('@')[0]||'کاربر بلکسی گیم').trim(),email=String(user?.email||''),avatar=safeProfileAvatarUrl(record.avatar_signed_url||(profileAvatarPath(record.avatar_url)?'':record.avatar_url)||(profileAvatarPath(meta.avatar_url)?'':meta.avatar_url)),bio=meta.bio??record.bio??'',phone=meta.phone??record.phone??'',platform=meta.preferred_platform??record.preferred_platform??'',address=meta.default_address??record.default_address??'',postal=meta.postal_code??record.postal_code??'',newsletter=Boolean(meta.newsletter_opt_in??record.newsletter_opt_in??false);let joined='عضو بلکسی گیم';try{if(user?.created_at)joined=new Intl.DateTimeFormat('fa-IR',{year:'numeric',month:'long'}).format(new Date(user.created_at))}catch{}const ename=escapeProfileText(name),eemail=escapeProfileText(email),safeAvatar=escapeProfileText(avatar),avatarContent=avatar?`<img src="${safeAvatar}" alt="تصویر پروفایل">`:`<span aria-hidden="true">${escapeProfileText(name.slice(0,1)||'ب')}</span>`,platforms=['PlayStation','Xbox','PC','Nintendo'];return `<div class="wrap standard-page profile-page"><div class="profile-page-heading"><div><span class="eyebrow">فضای شخصی شما</span><h1>پروفایل من</h1><p>اطلاعات و ترجیحاتت را مدیریت کن.</p></div><button class="profile-logout" id="profile-logout" type="button">${headerIcon('logout')}<span>خروج از حساب</span></button></div><div class="profile-layout"><section class="profile-panel profile-main-panel"><div class="profile-identity"><div class="profile-avatar" id="profile-avatar-preview">${avatarContent}</div><div class="profile-identity-copy"><h2>${ename}</h2><p>${eemail}</p><label class="profile-photo-edit" for="profile-avatar-input">تغییر عکس پروفایل</label><input id="profile-avatar-input" class="profile-avatar-file" type="file" accept="image/png,image/jpeg,image/webp"><small>عکس مربعی · حداکثر ۵ مگابایت</small></div></div><form id="profile-form" class="profile-form"><div class="profile-form-heading"><h2>اطلاعات شخصی</h2><p>فیلدهای ستاره‌دار الزامی‌اند.</p></div><div class="profile-form-grid"><label>نام و نام خانوادگی <i>*</i><input name="full_name" required maxlength="70" autocomplete="name" value="${ename}" placeholder="نامی که دوست داری با آن شناخته شوی"></label><label>ایمیل حساب<input class="profile-readonly" type="email" value="${eemail}" readonly autocomplete="email"><small>برای تغییر ایمیل از تنظیمات حساب کاربری اقدام کن.</small></label><label>شماره تماس<input name="phone" type="tel" maxlength="24" autocomplete="tel" value="${escapeProfileText(phone)}" placeholder="مثلاً ۰۹۱۲۱۲۳۴۵۶۷"></label><label>پلتفرم محبوب<select name="preferred_platform"><option value="">انتخاب نشده</option>${platforms.map(item=>`<option value="${item}" ${platform===item?'selected':''}>${item}</option>`).join('')}</select></label><label class="profile-form-full">بیوگرافی کوتاه<textarea name="bio" maxlength="240" rows="3" placeholder="کمی درباره‌ی سلیقه‌ی گیمینگت بنویس…">${escapeProfileText(bio)}</textarea><small>حداکثر ۲۴۰ نویسه</small></label><div class="profile-form-full profile-address-heading"><h3>نشانی پیش‌فرض</h3><p>برای تکمیل سریع‌تر سفارش‌ها نگه داشته می‌شود.</p></div><label class="profile-form-full">نشانی<textarea name="default_address" maxlength="300" rows="2" autocomplete="street-address" placeholder="استان، شهر، خیابان، پلاک و واحد">${escapeProfileText(address)}</textarea></label><label>کد پستی<input name="postal_code" inputmode="numeric" maxlength="16" autocomplete="postal-code" value="${escapeProfileText(postal)}" placeholder="کد پستی"></label></div><label class="profile-newsletter"><input name="newsletter_opt_in" type="checkbox" ${newsletter?'checked':''}><span>مایلم خبرهای بازی‌ها و پیشنهادهای فروشگاه را دریافت کنم.</span></label><div class="profile-form-footer"><button type="submit" class="primary-btn profile-save">ذخیره‌ی تغییرات</button><span>عضویت از ${escapeProfileText(joined)}</span></div></form></section><aside class="profile-side"><div class="profile-quick-card"><h2>میانبرهای حساب</h2><a href="/account/orders" data-nav="/account/orders"><span class="profile-quick-icon">${headerIcon('orders')}</span><span><b>سفارش‌های من</b><small>${faNum(state.orders.length)} سفارش در این دستگاه</small></span><i>←</i></a><a href="/account/wishlist" data-nav="/account/wishlist"><span class="profile-quick-icon">${headerIcon('heart')}</span><span><b>علاقه‌مندی‌ها</b><small>${faNum(state.wish.length)} کالای ذخیره‌شده</small></span><i>←</i></a><a href="/support" data-nav="/support"><span class="profile-quick-icon">${headerIcon('headset')}</span><span><b>پشتیبانی</b><small>گفت‌وگو با تیم بلکسی گیم</small></span><i>←</i></a></div><div class="profile-side-note"><span>${headerIcon('account')}</span><div><b>حریم خصوصی</b><p>اطلاعات این صفحه فقط برای مدیریت حساب و سفارش‌های تو استفاده می‌شود.</p></div></div></aside></div></div>`}
function profileAvatarPath(value=''){
  const raw=String(value||'').trim();
  if(/^[0-9a-f-]{36}\/avatar\.webp$/i.test(raw))return raw;
  try{const url=new URL(raw);const match=url.pathname.match(/\/storage\/v1\/object\/(?:public|sign)\/avatars\/(.+)$/i);if(match){const path=decodeURIComponent(match[1]);return /^[0-9a-f-]{36}\/avatar\.webp$/i.test(path)?path:''}}catch{}
  return '';
}
function mapOrderRow(o){return {id:String(o.id),code:o.order_code,total:Number(o.total_amount||0),status:o.status,date:o.created_at?new Intl.DateTimeFormat('fa-IR').format(new Date(o.created_at)):'',customer_name:o.customer_name,customer_phone:o.customer_phone,address:o.address,postal_code:o.postal_code,items:Array.isArray(o.items)?o.items:[]}}
let activeProfileUser=null,activeProfileRecord={},profileLoadToken=0;
async function loadProfileRoute(path){
  const token=++profileLoadToken;activeProfileUser=null;activeProfileRecord={};let client=null,user=null;
  try{client=await getSupabaseClient();const result=await client.auth.getUser();if(!result.error)user=result.data?.user||null}catch{}
  if(token!==profileLoadToken||decodeURI(location.pathname)!==path)return;
  if(!user){app.innerHTML=shell(profileGate());bind();syncLiquidNav();return}
  let record={};
  try{
    const result=await client.from('profiles').select('id,email,full_name,role,bio,avatar_url,phone,preferred_platform,default_address,postal_code,newsletter_opt_in,created_at,updated_at').eq('id',user.id).maybeSingle();
    if(!result.error&&result.data)record=result.data;
  }catch{}
  const objectPath=profileAvatarPath(record.avatar_url||user.user_metadata?.avatar_url);
  if(objectPath){try{const result=await client.storage.from('avatars').createSignedUrl(objectPath,3600);if(!result.error)record.avatar_signed_url=result.data?.signedUrl||''}catch{}}
  if(path.includes('/orders')||path==='/account'){
    try{const result=await client.from('orders').select('id,order_code,status,total_amount,items,customer_name,customer_phone,address,postal_code,created_at').order('created_at',{ascending:false}).limit(100);if(!result.error&&Array.isArray(result.data))state.orders=result.data.map(mapOrderRow)}catch{}
  }
  if(token!==profileLoadToken||decodeURI(location.pathname)!==path)return;
  activeProfileUser=user;activeProfileRecord=record;
  const content=path.includes('wishlist')||path.includes('orders')?account(path):profilePage(user,record);
  app.innerHTML=shell(content);bind();syncLiquidNav();
}
function authPromoMotion(){return `<div class="auth-motion" role="group" aria-label="موشن متحرک بلکسی گیم و ویترین بازی‌ها"><iframe class="auth-motion-frame" src="/assets/registration-motion.html?v=blacksy-auth-motion-full-v5" title="موشن بلکسی گیم؛ لوگو و ویترین بازی‌ها" loading="eager" sandbox="allow-scripts" referrerpolicy="no-referrer"></iframe></div>`}
function auth(register=false){return `<div class="wrap auth-page"><div class="auth-shell"><aside class="auth-promo">${authPromoMotion()}</aside><section class="auth-form-panel"><a class="auth-mobile-brand logo" href="/" data-nav="/"><span class="logo-mark">B</span><span>بلکسی گیم<small>انتخاب هوشمند</small></span></a><div class="auth-heading"><div class="auth-step-mark">${headerIcon('user')}</div><div class="eyebrow">${register?'ثبت‌نام در بلکسی گیم':'حساب کاربری بلکسی گیم'}</div><h1>${register?'ساخت حساب کاربری':'ورود به حساب'}</h1><p>${register?'نام، ایمیل و رمز عبور را وارد کن.':'ایمیل و رمز عبور را وارد کن.'}</p></div><form id="auth-form" class="auth-box">${register?`<label class="auth-field"><span>نام و نام خانوادگی</span><input name="name" autocomplete="name" required placeholder="مثلاً نازنین احمدی"></label>`:''}<label class="auth-field"><span>${register?'ایمیل برای تأیید حساب':'ایمیل'}</span><input name="email" type="email" autocomplete="email" required placeholder="name@example.com"></label><label class="auth-field"><span>رمز عبور</span><input name="password" type="password" autocomplete="${register?'new-password':'current-password'}" minlength="6" required placeholder="حداقل ۶ کاراکتر"></label><button class="primary-btn auth-submit">${register?'ساخت حساب و ادامه':'ادامه'}</button></form><div id="auth-message" class="auth-message" role="status" aria-live="polite" hidden></div><div class="auth-separator"><span>یا</span></div><div class="auth-switch">${register?'حساب داری؟':'هنوز عضو بلکسی گیم نیستی؟'} <a href="/${register?'login':'register'}" data-nav="/${register?'login':'register'}">${register?'ورود به حساب':'ساخت حساب رایگان'}</a></div><div class="auth-safe">اطلاعات ورود را با کسی به‌اشتراک نگذار.</div></section></div></div>`}

const escHtml=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function renderSupportChatMessages(){
  const msgs=state.supportMessages||[];
  if(!msgs.length){
    return `<div class="sup-msg sup-msg--admin"><div class="sup-msg-avatar">ب</div><div class="sup-msg-bubble"><div class="sup-msg-meta"><b>پشتیبانی بلکسی گیم</b><span>آنلاین</span></div><p>سلام! به پشتیبانی آنلاین فروشگاه بلکسی گیم خوش آمدید.<br>سؤال، درخواست راهنمایی خرید یا پیگیری سفارش خود را بنویسید تا مدیر فروشگاه پاسخ دهد.</p></div></div>`;
  }
  return `<div class="sup-msg sup-msg--admin"><div class="sup-msg-avatar">ب</div><div class="sup-msg-bubble"><div class="sup-msg-meta"><b>پشتیبانی بلکسی گیم</b><span>آنلاین</span></div><p>سلام! به پشتیبانی آنلاین فروشگاه بلکسی گیم خوش آمدید.<br>سؤال یا پیام خود را بنویسید؛ پاسخ مدیریت همین‌جا نمایش داده می‌شود.</p></div></div>`+msgs.map(m=>{
    const isAdmin=m.sender==='admin';
    return `<div class="sup-msg ${isAdmin?'sup-msg--admin':'sup-msg--user'}">${isAdmin?'<div class="sup-msg-avatar">ب</div>':''}<div class="sup-msg-bubble"><div class="sup-msg-meta"><b>${isAdmin?'پشتیبانی بلکسی گیم (مدیر)':escHtml(state.supportName||'شما')}</b><span>${escHtml(m.time||'')}</span></div><p>${escHtml(m.text)}</p></div></div>`;
  }).join('');
}
function supportPage(){
  return `<div class="wrap standard-page support-page"><div class="breadcrumbs"><a href="/" data-nav="/">خانه</a>　/　پشتیبانی آنلاین</div><div class="support-shell"><aside class="support-info-card"><div class="support-badge"><span class="support-dot"></span>پشتیبانی آنلاین بلکسی گیم</div><h1>گفتگو با پشتیبانی</h1><p>پیام شما مستقیماً به پنل مدیریت بلکسی گیم ارسال می‌شود و پاسخ ادمین به صورت زنده در همین صفحه نمایش داده خواهد شد.</p><div class="support-user-fields"><label><span>نام شما</span><input id="sup-name" type="text" value="${escHtml(state.supportName)}" placeholder="مثلاً علی رضایی"></label><label><span>شماره تماس یا ایمیل (جهت اطلاع‌رسانی)</span><input id="sup-contact" type="text" value="${escHtml(state.supportContact)}" placeholder="۰۹۱۲... یا ایمیل"></label></div><div class="support-quick-box"><b>موضوعات پرتکرار (کلیک برای ارسال سریع):</b><div class="support-quick-chips"><button type="button" data-quick-msg="سلام، برای پیگیری وضعیت سفارشم پیام می‌دهم.">${headerIcon('package')}<span>پیگیری وضعیت سفارش</span></button><button type="button" data-quick-msg="سلام، درباره قیمت و موجودی اکانت بازی سؤال داشتم.">${headerIcon('game')}<span>موجودی و قیمت بازی‌ها</span></button><button type="button" data-quick-msg="سلام، برای خرید مانیتور و تجهیزات گیمینگ نیاز به مشاوره دارم.">${headerIcon('monitor')}<span>مشاوره خرید تجهیزات</span></button></div></div><div class="support-ticket-code"><span>کد گفتگوی شما:</span><b dir="ltr">${escHtml(state.supportTid)}</b></div></aside><section class="support-chat-card" aria-label="پنجره گفتگو با پشتیبانی"><header class="support-chat-head"><div class="support-agent"><span class="support-agent-avatar">${headerIcon('headset')}</span><div><b>پشتیبانی و مدیریت بلکسی گیم</b><small><i class="support-dot"></i> پاسخگویی مستقیم ادمین</small></div></div><button type="button" class="outline-btn support-refresh-btn" id="sup-refresh-btn">بروزرسانی گفتگو</button></header><div class="support-chat-messages" id="support-chat-box">${renderSupportChatMessages()}</div><form id="support-form" class="support-chat-input"><input id="sup-input" name="message" type="text" required autocomplete="off" placeholder="پیام خود را برای پشتیبانی بنویسید..."><button type="submit" class="primary-btn product-glow-btn"><span>ارسال پیام</span>${headerIcon('arrow')}</button></form></section></div></div>`;
}
let supportPollTimer=null,supportRealtimeChannel=null;
async function stopSupportRealtime(){
  const channel=supportRealtimeChannel;supportRealtimeChannel=null;
  if(channel){try{const c=await getSupabaseClient();await c.removeChannel(channel)}catch{}}
}
async function startSupportRealtime(){
  await stopSupportRealtime();
  if(decodeURI(location.pathname)!=='/support')return;
  try{
    const c=await getSupabaseClient();
    if(decodeURI(location.pathname)!=='/support')return;
    supportRealtimeChannel=c.channel(`support:${state.supportTid}`,{config:{private:false}})
      .on('broadcast',{event:'support_changed'},()=>syncSupportThread(false))
      .subscribe(status=>{if(status==='SUBSCRIBED')syncSupportThread(false)});
  }catch{}
}
async function syncSupportThread(scrollBottom=false){
  if(decodeURI(location.pathname)!=='/support')return;
  try{
    const c=await getSupabaseClient();
    const {data,error}=await c.rpc('get_support_thread',{p_thread_id:state.supportTid,p_secret:state.supportSecret});
    if(error)throw error;
    const remoteMsgs=Array.isArray(data?.messages)?data.messages:[];
    if(JSON.stringify(remoteMsgs)!==JSON.stringify(state.supportMessages)){
      const hadMore=remoteMsgs.length>state.supportMessages.length;
      state.supportMessages=remoteMsgs;
      const box=document.querySelector('#support-chat-box');
      if(box){box.innerHTML=renderSupportChatMessages();if(hadMore||scrollBottom)box.scrollTop=box.scrollHeight}
    }else if(scrollBottom){const box=document.querySelector('#support-chat-box');if(box)box.scrollTop=box.scrollHeight}
  }catch(err){
    if(scrollBottom)toast('اتصال پشتیبانی برقرار نشد؛ پس از اجرای schema.sql دوباره تلاش کن.');
  }
}
function render(){let path=decodeURI(location.pathname),content,profileRoute=path==='/profile'||path==='/account'||path.startsWith('/account/');if(path==='/')content=home();else if(path==='/support')content=supportPage();else if(path==='/products')content=catalog('همه‌ی بازی‌ها');else if(path.startsWith('/category/'))content=catalog(path.split('/').pop(),path.split('/').pop());else if(path.startsWith('/product/'))content=detail(path.split('/').pop());else if(path==='/search'){state.query=new URLSearchParams(location.search).get('q')||state.query;content=catalog(state.query?`نتایج جستجو برای «${state.query}»`:'جستجوی محصولات')}else if(path==='/cart')content=cartPage();else if(path==='/checkout')content=checkout();else if(path==='/login')content=auth(false);else if(path==='/register')content=auth(true);else if(profileRoute)content=profileLoading();else content=home();app.innerHTML=shell(content);bind();syncLiquidNav();clearInterval(supportPollTimer);stopSupportRealtime();if(path==='/support'){syncSupportThread(true);startSupportRealtime();supportPollTimer=setInterval(()=>syncSupportThread(false),30000)}if(profileRoute)loadProfileRoute(path)}
function setTheme(theme,button){const dark=theme==='dark';document.body.classList.add('theme-animating');void document.body.offsetWidth;state.theme=dark?'dark':'light';try{localStorage.setItem('blakci-theme',state.theme)}catch{}document.documentElement.dataset.theme=state.theme;document.querySelector('meta[name=theme-color]')?.setAttribute('content',dark?'#081a22':'#f7f8fa');button.classList.toggle('theme-is-dark',dark);button.classList.toggle('is-active',dark);button.setAttribute('aria-pressed',String(dark));button.setAttribute('aria-label',dark?'تغییر به تم روشن':'تغییر به تم تیره');button.title=dark?'تم روشن':'تم تیره';button.classList.remove('theme-pulse');void button.offsetWidth;button.classList.add('theme-pulse');clearTimeout(window.blakciThemeTimer);window.blakciThemeTimer=setTimeout(()=>{document.body.classList.remove('theme-animating');button.classList.remove('theme-pulse')},1000)}
function initImageLoading(){document.querySelectorAll('img').forEach(image=>{if(image.dataset.imageState)return;image.dataset.imageState='pending';image.classList.add('image-pending');const finish=ok=>{image.dataset.imageState=ok?'ready':'error';image.classList.remove('image-pending');image.classList.toggle('image-ready',ok);image.classList.toggle('image-error',!ok)};if(image.complete){finish(image.naturalWidth>0);return}image.addEventListener('load',()=>finish(true),{once:true});image.addEventListener('error',()=>finish(false),{once:true})})}
function bind(){initImageLoading();initGameSlider();initFeatureSlider();initHubTiles();initMonitorRail();document.querySelector('[data-theme-toggle]')?.addEventListener('click',e=>setTheme(state.theme==='dark'?'light':'dark',e.currentTarget));document.querySelector('[data-toggle-password]')?.addEventListener('click',e=>{const input=document.querySelector('#register-password'),visible=input.type==='password';input.type=visible?'text':'password';e.currentTarget.textContent=visible?'پنهان':'نمایش'});document.querySelectorAll('[data-nav]').forEach(el=>el.addEventListener('click',e=>{e.preventDefault();if(el.dataset.nav==='/products?sort=sale')state.sort='sale';go(el.dataset.nav)}));document.querySelectorAll('[data-product]').forEach(el=>el.addEventListener('click',()=>go('/product/'+el.dataset.product)));document.querySelectorAll('[data-add]').forEach(el=>el.addEventListener('click',()=>addCartItem(el.dataset.add)));document.querySelectorAll('[data-buy]').forEach(el=>el.addEventListener('click',()=>addCartItem(el.dataset.buy,true)));document.querySelectorAll('[data-wish]').forEach(el=>el.addEventListener('click',e=>{e.stopPropagation();const id=+el.dataset.wish;state.wish=state.wish.includes(id)?state.wish.filter(x=>x!==id):[...state.wish,id];save();render();toast(state.wish.includes(id)?'به علاقه‌مندی‌ها اضافه شد':'از علاقه‌مندی‌ها حذف شد')}));document.querySelectorAll('[data-qty]').forEach(el=>el.addEventListener('click',()=>{const id=el.dataset.qty,delta=Number(el.dataset.delta),current=Number(state.cart[id]||0),product=products.find(item=>Number(item.id)===Number(id));if(delta>0){const limit=product?.stock==null?20:Math.min(20,Number(product.stock));if(!product||limit<1||current>=limit){toast(product?.stock===0?'این کالا در حال حاضر ناموجود است.':'حداکثر تعداد مجاز برای این کالا ثبت شده است.');return}state.cart[id]=current+1}else{state.cart[id]=current-1;if(state.cart[id]<=0)delete state.cart[id]}save();render()}));document.querySelectorAll('[data-remove]').forEach(el=>el.addEventListener('click',()=>{delete state.cart[el.dataset.remove];save();render();toast('محصول از سبد حذف شد')}));document.querySelectorAll('[data-sort]').forEach(el=>el.addEventListener('click',()=>{state.sort=el.dataset.sort;render()}));document.querySelectorAll('[data-cat]').forEach(el=>el.addEventListener('change',()=>go(el.checked?'/category/'+encodeURIComponent(el.dataset.cat):'/products')));document.querySelector('#open-filter')?.addEventListener('click',()=>{state.filterOpen=true;document.querySelector('#filters').classList.add('filter-visible')});document.querySelector('#close-filter')?.addEventListener('click',()=>document.querySelector('#filters').classList.remove('filter-visible'));document.querySelector('#apply-filter')?.addEventListener('click',()=>{state.min=+(document.querySelector('#min-price').value||0);state.max=+(document.querySelector('#max-price').value||1000000000);render()});document.querySelector('#clear-filter')?.addEventListener('click',()=>{state.min=0;state.max=1000000000;state.sort='default';go('/products')});document.querySelector('#discount-only')?.addEventListener('change',e=>{state.sort=e.target.checked?'sale':'popular';render()});document.querySelector('#rated')?.addEventListener('change',e=>{if(e.target.checked){document.querySelectorAll('.product-card').forEach(card=>{const id=+card.querySelector('[data-product]').dataset.product;if(products.find(p=>p.id===id).rate<4)card.remove()})}});document.querySelector('#reset-search')?.addEventListener('click',()=>{state.query='';go('/products')});document.querySelectorAll('[data-scroll]').forEach(el=>el.addEventListener('click',()=>document.getElementById(el.dataset.scroll)?.scrollIntoView({behavior:'smooth'})));document.querySelector('#spec-tab')?.addEventListener('click',()=>document.getElementById('specs').scrollIntoView({behavior:'smooth'}));document.querySelector('#search-form')?.addEventListener('submit',e=>{e.preventDefault();state.query=document.querySelector('#search-box').value.trim();go('/search?q='+encodeURIComponent(state.query))});const search=document.querySelector('#search-box'),suggestions=document.querySelector('#suggestions');search?.addEventListener('input',()=>{let q=search.value.trim();suggestions.innerHTML=q?`<div class="suggest-label">پیشنهاد برای جستجو</div>${products.filter(p=>`${p.name} ${p.brand} ${p.model} ${p.cat} ${p.category}`.toLocaleLowerCase().includes(q.toLocaleLowerCase())).slice(0,4).map(p=>`<a href="/product/${Number(p.id)||0}" data-suggestion="${Number(p.id)||0}"><img src="${escHtml(safeImageUrl(p.image_url||p.images?.[0]||p.art))}" alt=""><span>${escHtml(p.name)}</span><small>${p.price==null?'قیمت به‌زودی':money(p.price)}</small></a>`).join('')||`<a data-search="${escHtml(q)}">جستجوی «${escHtml(q)}» در محصولات ←</a>`}`:'';suggestions.classList.toggle('open',!!q);suggestions.querySelectorAll('[data-suggestion]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();go('/product/'+a.dataset.suggestion)}));suggestions.querySelector('[data-search]')?.addEventListener('click',()=>{state.query=q;go('/search?q='+encodeURIComponent(q))})});document.addEventListener('click',e=>{if(!e.target.closest('.search'))suggestions?.classList.remove('open')},{once:true});document.querySelector('#newsletter')?.addEventListener('submit',e=>{e.preventDefault();toast('این بخش هنوز فعال نیست');e.target.reset()});
const sendSupportText=async text=>{
  const msgText=String(text||'').trim();if(!msgText)return false;
  if(msgText.length>2000){toast('متن پیام نمی‌تواند بیشتر از ۲۰۰۰ نویسه باشد.');return false}
  const nameIn=document.querySelector('#sup-name'),contactIn=document.querySelector('#sup-contact');
  if(nameIn)state.supportName=nameIn.value.trim();if(contactIn)state.supportContact=contactIn.value.trim();
  try{
    const c=await getSupabaseClient();
    const {data,error}=await c.rpc('submit_support_message',{
      p_thread_id:state.supportTid,p_secret:state.supportSecret,
      p_customer_name:state.supportName||'کاربر بلکسی گیم',
      p_customer_contact:state.supportContact||'',p_text:msgText
    });
    if(error)throw error;
    state.supportMessages=Array.isArray(data?.messages)?data.messages:state.supportMessages;
    const box=document.querySelector('#support-chat-box');if(box){box.innerHTML=renderSupportChatMessages();box.scrollTop=box.scrollHeight}
    toast('پیام شما به‌صورت امن برای پشتیبانی ارسال شد.');return true;
  }catch(err){toast('ارسال پیام انجام نشد؛ اتصال یا migration دیتابیس پشتیبانی را بررسی کن.');return false}
};
document.querySelector('#sup-name')?.addEventListener('input',e=>{state.supportName=e.target.value.trim()});
document.querySelector('#sup-contact')?.addEventListener('input',e=>{state.supportContact=e.target.value.trim()});
document.querySelector('#sup-refresh-btn')?.addEventListener('click',()=>{syncSupportThread(true);toast('گفتگو در حال بروزرسانی است')});
document.querySelectorAll('[data-quick-msg]').forEach(btn=>btn.addEventListener('click',()=>sendSupportText(btn.dataset.quickMsg)));
document.querySelector('#support-form')?.addEventListener('submit',async e=>{e.preventDefault();const inp=document.querySelector('#sup-input');if(!inp||!inp.value.trim())return;const val=inp.value.trim();if(await sendSupportText(val))inp.value=''});
document.querySelector('#checkout-form')?.addEventListener('submit',async e=>{
  e.preventDefault();const form=e.currentTarget,button=form.querySelector('button[type="submit"]');
  const lines=Object.entries(state.cart).map(([id,qty])=>({id:Number(id),qty:Number(qty)})).filter(x=>Number.isInteger(x.id)&&Number.isInteger(x.qty)&&x.qty>0);
  if(!lines.length){toast('سبد خرید خالی است یا کالای قابل سفارش ندارد.');return}
  if(button){button.disabled=true;button.dataset.originalText=button.textContent;button.textContent='در حال ثبت امن سفارش…'}
  try{
    const customerName=form.elements.customer_name?.value?.trim()||'',customerPhone=form.elements.customer_phone?.value?.trim()||'',address=form.elements.address?.value?.trim()||'',postalCode=form.elements.postal_code?.value?.trim()||'';
    const shippingMethod=form.elements.shipping_method?.value||'ارسال بلکسی گیم — رایگان',paymentMethod=form.elements.payment?.value||'پرداخت اینترنتی';
    const c=await getSupabaseClient(),authResult=await c.auth.getUser();let guestSecret='';
    if(!authResult.data?.user)guestSecret=secureHex(32)
    const {data,error}=await c.rpc('create_order',{
      p_customer_name:customerName,p_customer_phone:customerPhone,p_address:address,
      p_postal_code:postalCode,p_shipping_method:shippingMethod,p_payment_method:paymentMethod,
      p_items:lines,p_guest_secret:guestSecret||null
    });
    if(error)throw error;
    const result=Array.isArray(data)?data[0]:data;if(!result?.order_code)throw new Error('order_not_created');
    if(guestSecret){try{localStorage.setItem(`blacksy-order-token:${result.order_code}`,guestSecret)}catch{}}
    const order={id:result.id,code:result.order_code,status:result.status||'pending',total:Number(result.total_amount||0),date:new Intl.DateTimeFormat('fa-IR').format(new Date(result.created_at||Date.now())),customer_name:customerName,customer_phone:customerPhone,address,postal_code:postalCode,items:Array.isArray(result.items)?result.items:[]};
    state.orders.unshift(order);state.cart={};save();
    app.innerHTML=shell(`<div class="wrap standard-page"><div class="success-state"><span>✓</span><h1>سفارش ${escHtml(order.code)} ثبت شد</h1><p>سفارش با وضعیت «در انتظار بررسی» در پایگاه داده ذخیره شد. پرداخت اینترنتی تا اتصال درگاه بانکی انجام نمی‌شود.</p><a href="/account/orders" data-nav="/account/orders" class="primary-btn">پیگیری سفارش در حساب کاربری</a></div></div>`);bind();syncLiquidNav();
  }catch(err){toast('سفارش ثبت نشد؛ قیمت، موجودی یا اتصال پایگاه داده را بررسی کن.');}
  finally{if(button?.isConnected){button.disabled=false;button.textContent=button.dataset.originalText||'ثبت سفارش'}}
});
document.querySelector('#auth-form')?.addEventListener('submit',async e=>{
  e.preventDefault();
  const form=e.currentTarget,button=form.querySelector('.auth-submit'),email=form.elements.email.value.trim().toLowerCase(),password=form.elements.password.value,register=location.pathname==='/register';
  const feedback=form.parentElement?.querySelector('#auth-message');
  const setAuthMessage=(text,type='error')=>{if(!feedback){if(text)toast(text);return}feedback.textContent=text;feedback.dataset.state=type;feedback.hidden=!text};
  setAuthMessage('');
  button.disabled=true;button.textContent=register?'در حال ساخت حساب…':'در حال ورود…';
  try{
    const client=await getSupabaseClient();
    if(register){
      const fullName=form.elements.name.value.trim();
      const {data,error}=await client.auth.signUp({email,password,options:{data:{full_name:fullName},emailRedirectTo:`${location.origin}/profile`}});
      if(error)throw error;
      if(data.session){toast('حساب ساخته شد.');go('/profile')}
      else setAuthMessage('درخواست ثبت‌نام پذیرفته شد. لینک تأیید را در ایمیل و پوشه‌ی هرزنامه بررسی کن؛ پس از تأیید، با همین ایمیل وارد شو.','success');
    }else{
      const {error}=await client.auth.signInWithPassword({email,password});
      if(error)throw error;
      toast('وارد حساب شدی.');go('/profile');
    }
  }catch(err){
    const raw=String(err?.message||'').trim(),lower=raw.toLowerCase();
    let message=raw;
    if(lower.includes('database error saving new user')||lower.includes('public.profiles')||lower.includes('profiles table')||raw.includes('PGRST205'))message='جدول پروفایل یا trigger ثبت‌نام در Supabase آماده نیست. فایل schema.sql را در SQL Editor همان پروژه اجرا کن.';
    else if(lower.includes('redirect_to')||lower.includes('redirect url')||lower.includes('not allowed'))message='نشانی بازگشت ایمیل مجاز نیست. در Supabase → Authentication → URL Configuration، دامنه‌ی فروشگاه و مسیر /profile را به Redirect URLs اضافه کن.';
    else if(lower.includes('email rate limit')||lower.includes('rate limit exceeded'))message='سقف ارسال ایمیل تأیید Supabase پر شده است. کمی صبر کن یا SMTP سفارشی تنظیم کن؛ سرویس ایمیل پیش‌فرض Supabase محدودیت ارسال دارد.';
    else if(lower.includes('error sending confirmation email')||lower.includes('smtp')||lower.includes('email address not authorized'))message='Supabase نتوانست ایمیل تأیید را ارسال کند. اگر SMTP پیش‌فرض را استفاده می‌کنی، فقط به آدرس‌های اعضای تیم پروژه ایمیل می‌فرستد؛ برای ثبت‌نام کاربران عادی SMTP سفارشی لازم است. اگر SMTP را قبلاً تنظیم کرده‌ای، میزبان، پورت، نام کاربری، رمز و آدرس فرستنده را بررسی کن. پوشه هرزنامه را فقط اگر ارسال موفق بوده ولی ایمیل پیدا نیست بررسی کن.';
    else if(lower.includes('invalid login credentials'))message='ایمیل یا رمز عبور درست نیست.';
    else if(lower.includes('email not confirmed'))message='ابتدا ایمیلت را با لینک تأیید بازشده از صندوق ورودی تأیید کن.';
    else if(lower.includes('already registered')||lower.includes('user already exists'))message='این ایمیل قبلاً ثبت شده؛ از ورود یا بازیابی رمز استفاده کن.';
    else if(lower.includes('password should be')||lower.includes('weak password'))message='رمز عبور باید دست‌کم ۶ کاراکتر و مطابق سیاست رمز Supabase باشد.';
    else if(lower.includes('failed to fetch')||lower.includes('load failed')||lower.includes('networkerror'))message='ارتباط با Supabase برقرار نشد. اتصال اینترنت و تنظیمات پروژه را بررسی کن.';
    else if(raw)message=`${register?'ثبت‌نام':'ورود'} ناموفق بود: ${raw.slice(0,220)}`;
    else message=`${register?'ثبت‌نام':'ورود'} ناموفق بود؛ یک‌بار دیگر تلاش کن.`;
    setAuthMessage(message,'error');
  }finally{
    if(form.isConnected){button.disabled=false;button.textContent=register?'ساخت حساب و ادامه':'ورود به حساب'}
  }
});document.querySelectorAll('.color-dot').forEach(el=>el.addEventListener('click',()=>{document.querySelectorAll('.color-dot').forEach(x=>x.classList.remove('active'));el.classList.add('active')}));bindProfile();}


function bindProfile(){
  const form=document.querySelector('#profile-form');
  form?.addEventListener('submit',async e=>{
    e.preventDefault();
    if(!activeProfileUser){toast('برای ذخیره‌ی پروفایل ابتدا وارد حساب شو.');go('/login');return}
    const f=e.currentTarget,button=f.querySelector('[type="submit"]'),original=button?.textContent;
    const record={
      full_name:f.elements.full_name.value.trim(),bio:f.elements.bio.value.trim(),
      phone:f.elements.phone.value.trim(),preferred_platform:f.elements.preferred_platform.value,
      default_address:f.elements.default_address.value.trim(),postal_code:f.elements.postal_code.value.trim(),
      newsletter_opt_in:!!f.elements.newsletter_opt_in.checked,
      avatar_url:activeProfileRecord.avatar_url||profileAvatarPath(activeProfileUser.user_metadata?.avatar_url)||''
    };
    if(button){button.disabled=true;button.textContent='در حال ذخیره…'}
    try{
      const client=await getSupabaseClient();
      const {data,error}=await client.from('profiles').update(record).eq('id',activeProfileUser.id).select('id').maybeSingle();
      if(error||!data)throw error||new Error('profile_not_found');
      const metadata={full_name:record.full_name,bio:record.bio,phone:record.phone,preferred_platform:record.preferred_platform,default_address:record.default_address,postal_code:record.postal_code,newsletter_opt_in:record.newsletter_opt_in};
      try{await client.auth.updateUser({data:metadata})}catch{}
      activeProfileRecord={...activeProfileRecord,...record};
      const objectPath=profileAvatarPath(record.avatar_url);
      if(objectPath){try{const signed=await client.storage.from('avatars').createSignedUrl(objectPath,3600);if(!signed.error)activeProfileRecord.avatar_signed_url=signed.data?.signedUrl||''}catch{}}
      activeProfileUser={...activeProfileUser,user_metadata:{...(activeProfileUser.user_metadata||{}),...metadata}};
      app.innerHTML=shell(profilePage(activeProfileUser,activeProfileRecord));bind();syncLiquidNav();toast('تغییرات پروفایل با موفقیت ذخیره شد.');
    }catch(err){toast('ذخیره‌ی تغییرات انجام نشد؛ schema و دسترسی مالک پروفایل را بررسی کن.');}
    finally{if(button?.isConnected){button.disabled=false;button.textContent=original||'ذخیره‌ی تغییرات'}}
  });

  const avatarInput=document.querySelector('#profile-avatar-input');
  avatarInput?.addEventListener('change',async e=>{
    const file=e.currentTarget.files?.[0];if(!file)return;
    if(!activeProfileUser){toast('برای بارگذاری عکس ابتدا وارد حساب شو.');return}
    if(!['image/jpeg','image/png','image/webp'].includes(file.type)){toast('فقط عکس PNG، JPG یا WebP انتخاب کن.');e.currentTarget.value='';return}
    if(file.size>5*1024*1024){toast('حجم عکس باید کمتر از ۵ مگابایت باشد.');e.currentTarget.value='';return}
    let objectUrl='';
    try{
      objectUrl=URL.createObjectURL(file);const image=new Image();
      await new Promise((resolve,reject)=>{image.onload=resolve;image.onerror=reject;image.src=objectUrl});
      const size=320,canvas=document.createElement('canvas');canvas.width=size;canvas.height=size;
      const ctx=canvas.getContext('2d');if(!ctx)throw new Error('Canvas unavailable');
      const scale=Math.max(size/image.naturalWidth,size/image.naturalHeight),w=image.naturalWidth*scale,h=image.naturalHeight*scale;
      ctx.drawImage(image,(size-w)/2,(size-h)/2,w,h);
      const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/webp',.82));if(!blob)throw new Error('Image compression failed');
      const client=await getSupabaseClient(),objectPath=`${activeProfileUser.id}/avatar.webp`;
      const uploaded=await client.storage.from('avatars').upload(objectPath,blob,{upsert:true,contentType:'image/webp',cacheControl:'3600'});
      if(uploaded.error)throw uploaded.error;
      const signed=await client.storage.from('avatars').createSignedUrl(objectPath,3600);if(signed.error)throw signed.error;
      activeProfileRecord={...activeProfileRecord,avatar_url:objectPath,avatar_signed_url:signed.data?.signedUrl||''};
      const preview=document.querySelector('#profile-avatar-preview');if(preview)preview.innerHTML=`<img src="${escapeProfileText(safeProfileAvatarUrl(activeProfileRecord.avatar_signed_url))}" alt="تصویر پروفایل">`;
      toast('عکس به فضای خصوصی حساب آپلود شد؛ برای ثبت نهایی، تغییرات پروفایل را ذخیره کن.');
    }catch(err){toast('آپلود عکس انجام نشد؛ migration امن Storage را اجرا و دوباره تلاش کن.');}
    finally{if(objectUrl)URL.revokeObjectURL(objectUrl);e.currentTarget.value=''}
  });

  document.querySelector('#profile-logout')?.addEventListener('click',async e=>{
    const button=e.currentTarget;button.disabled=true;
    try{const client=await getSupabaseClient();const result=await client.auth.signOut();if(result.error)throw result.error;activeProfileUser=null;activeProfileRecord={};toast('از حساب خارج شدی.');go('/profile')}
    catch(err){toast('خروج از حساب انجام نشد؛ دوباره تلاش کن.');button.disabled=false}
  });
}

function initGameSlider(){const slides=[...document.querySelectorAll('.game-slide')];if(slides.length<2)return;let active=0,timer;const dots=[...document.querySelectorAll('.slide-dot')],counter=document.querySelector('#slide-current');const show=index=>{active=(index+slides.length)%slides.length;slides.forEach((el,i)=>el.classList.toggle('is-active',i===active));dots.forEach((el,i)=>{el.classList.toggle('active',i===active);el.setAttribute('aria-pressed',String(i===active))});if(counter)counter.textContent=active?'02':'01';};const start=()=>{clearInterval(timer);if(!matchMedia('(prefers-reduced-motion: reduce)').matches)timer=setInterval(()=>show(active+1),6800)};document.querySelectorAll('[data-go-slide]').forEach(el=>el.addEventListener('click',()=>{show(+el.dataset.goSlide);start()}));document.querySelectorAll('[data-direction]').forEach(el=>el.addEventListener('click',()=>{show(active+(el.dataset.direction==='next'?1:-1));start()}));const hero=document.querySelector('.game-hero');let touchX=0,touchY=0;let heroRect;hero?.addEventListener('pointerenter',e=>{if(e.pointerType==='touch')return;heroRect=hero.getBoundingClientRect();hero.classList.add('has-spotlight')});hero?.addEventListener('pointermove',e=>{if(e.pointerType==='touch')return;heroRect=heroRect||hero.getBoundingClientRect();hero.style.setProperty('--spot-x',`${e.clientX-heroRect.left}px`);hero.style.setProperty('--spot-y',`${e.clientY-heroRect.top}px`)});hero?.addEventListener('pointerleave',()=>{hero.classList.remove('has-spotlight');heroRect=null});hero?.addEventListener('pointerdown',e=>{if(e.pointerType!=='touch')return;touchX=e.clientX;touchY=e.clientY},{passive:true});hero?.addEventListener('pointerup',e=>{if(e.pointerType!=='touch')return;const dx=e.clientX-touchX,dy=e.clientY-touchY;if(Math.abs(dx)>46&&Math.abs(dx)>Math.abs(dy)*1.15){show(active+(dx<0?1:-1));start()}},{passive:true});hero?.addEventListener('mouseenter',()=>clearInterval(timer));hero?.addEventListener('mouseleave',start);show(0);start()}

let blakciSupabase;async function getSupabaseClient(){if(blakciSupabase)return blakciSupabase;const [sdk,config]=await Promise.all([import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'),import('./supabase-config.js')]);if(!config.SUPABASE_URL||!config.SUPABASE_ANON_KEY)throw new Error('Supabase is not configured');blakciSupabase=sdk.createClient(config.SUPABASE_URL,config.SUPABASE_ANON_KEY);return blakciSupabase}
function initFeatureSlider(){
const root=document.querySelector('.feature-slider');if(!root||root.dataset.featureSliderBound==='true')return;
root.dataset.featureSliderBound='true';
const slides=[...root.querySelectorAll('.s')],tabs=[...root.querySelectorAll('.tab')],counter=root.querySelector('[data-slider-count]'),fx=root.querySelector('.fx'),appRoot=document.getElementById('app');
if(!slides.length)return;
if(fx&&!fx.childElementCount){for(let i=0;i<16;i++){const particle=document.createElement('i'),size=2+Math.random()*4;particle.style.cssText=`left:${Math.random()*100}%;width:${size}px;height:${size}px;animation-delay:${-Math.random()*9}s;animation-duration:${7+Math.random()*5}s`;fx.appendChild(particle)}}
let active=slides.findIndex(slide=>slide.classList.contains('on'));if(active<0){active=0;slides[0].classList.add('on')}
let introReady=!document.body.classList.contains('site-intro-active'),inView=!('IntersectionObserver'in window),autoplayTimer=0,animationFrame=0,destroyed=false,introObserver=null,visibilityObserver=null,mountObserver=null;
const controller=new AbortController(),{signal}=controller,motionQuery=window.matchMedia('(prefers-reduced-motion: reduce)');
const durationValue=getComputedStyle(root).getPropertyValue('--feature-duration').trim(),durationNumber=parseFloat(durationValue),durationMs=Number.isFinite(durationNumber)?durationNumber*(durationValue.endsWith('ms')?1:1000):6000;
const persianNumber=n=>String(n).padStart(2,'0').replace(/\d/g,d=>'۰۱۲۳۴۵۶۷۸۹'[Number(d)]);
const updateCounter=()=>{if(counter)counter.textContent=`${persianNumber(active+1)} / ${persianNumber(slides.length)}`};
function stopAutoplay(){window.clearTimeout(autoplayTimer);autoplayTimer=0;if(animationFrame){window.cancelAnimationFrame(animationFrame);animationFrame=0}root.classList.remove('is-autoplaying')}
function startAutoplay(){
 stopAutoplay();if(destroyed||!root.isConnected||!introReady||!inView||document.hidden)return;
 root.classList.add('is-ready');
 const advance=()=>{autoplayTimer=0;if(destroyed||!root.isConnected||!introReady||!inView||document.hidden)return;show(active+1)};
 if(motionQuery.matches){autoplayTimer=window.setTimeout(advance,durationMs);return}
 animationFrame=window.requestAnimationFrame(()=>{animationFrame=0;if(destroyed||!root.isConnected||!introReady||!inView||document.hidden)return;root.classList.add('is-autoplaying');autoplayTimer=window.setTimeout(advance,durationMs)})
}
function show(index){
 const next=(index+slides.length)%slides.length;
 if(next!==active){const previous=slides[active];slides.forEach(slide=>slide.classList.remove('prev'));previous.classList.remove('on');previous.classList.add('prev');active=next;slides[active].classList.add('on');tabs.forEach((tab,i)=>{tab.classList.toggle('on',i===active);tab.setAttribute('aria-pressed',i===active?'true':'false')});window.setTimeout(()=>previous.classList.remove('prev'),1250)}
 updateCounter();startAutoplay();
}
const cleanup=()=>{if(destroyed)return;destroyed=true;stopAutoplay();introObserver?.disconnect();visibilityObserver?.disconnect();mountObserver?.disconnect();controller.abort()};
root.querySelector('[data-slider-prev]')?.addEventListener('click',()=>show(active-1),{signal});
root.querySelector('[data-slider-next]')?.addEventListener('click',()=>show(active+1),{signal});
tabs.forEach((tab,i)=>tab.addEventListener('click',()=>show(i),{signal}));
root.addEventListener('keydown',event=>{if(event.key==='ArrowRight'){event.preventDefault();show(active+1)}else if(event.key==='ArrowLeft'){event.preventDefault();show(active-1)}else if(event.key==='Home'){event.preventDefault();show(0)}else if(event.key==='End'){event.preventDefault();show(slides.length-1)}},{signal});
root.addEventListener('pointermove',event=>{const rect=root.getBoundingClientRect();if(!rect.width||!rect.height)return;root.style.setProperty('--px',(((event.clientX-rect.left)/rect.width)-.5).toFixed(3));root.style.setProperty('--py',(((event.clientY-rect.top)/rect.height)-.5).toFixed(3))},{passive:true,signal});
root.addEventListener('pointerleave',()=>{root.style.setProperty('--px','0');root.style.setProperty('--py','0')},{signal});
let touchStart=null;
root.addEventListener('pointerdown',event=>{if(event.pointerType!=='mouse')touchStart={x:event.clientX,y:event.clientY}},{passive:true,signal});
root.addEventListener('pointerup',event=>{if(!touchStart)return;const dx=event.clientX-touchStart.x,dy=event.clientY-touchStart.y;touchStart=null;if(Math.abs(dx)>48&&Math.abs(dx)>Math.abs(dy))show(active+(dx<0?1:-1))},{passive:true,signal});
const onVisibilityChange=()=>document.hidden?stopAutoplay():startAutoplay();
document.addEventListener('visibilitychange',onVisibilityChange,{signal});
if('IntersectionObserver'in window){inView=false;visibilityObserver=new IntersectionObserver(entries=>{const entry=entries[0];inView=!!entry?.isIntersecting&&entry.intersectionRatio>=.12;if(inView)startAutoplay();else stopAutoplay()},{threshold:[0,.12]});visibilityObserver.observe(root)}
if(!introReady){const checkIntro=()=>{if(destroyed||introReady||document.body.classList.contains('site-intro-active'))return;introReady=true;introObserver?.disconnect();startAutoplay()};introObserver=new MutationObserver(checkIntro);introObserver.observe(document.body,{attributes:true,attributeFilter:['class']});window.addEventListener('intro:done',()=>window.setTimeout(checkIntro,950),{once:true,signal})}
if(appRoot){mountObserver=new MutationObserver(()=>{if(!root.isConnected)cleanup()});mountObserver.observe(appRoot,{childList:true,subtree:true})}
updateCounter();startAutoplay();
}

let monitorDragController;function initMonitorRail(){
 monitorDragController?.abort();
 const rails=[...document.querySelectorAll('#monitor-track, #mouse-track, #keyboard-track')];
 if(!rails.length)return;
 const controller=new AbortController(),{signal}=controller;monitorDragController=controller;
 const rtlType=(()=>{
  const outer=document.createElement('div'),inner=document.createElement('div');
  outer.dir='rtl';outer.style.cssText='position:absolute;left:-9999px;width:4px;height:1px;overflow:scroll';
  inner.style.cssText='width:8px;height:1px';outer.append(inner);document.body.append(outer);
  let type;if(outer.scrollLeft>0)type='reverse';else{outer.scrollLeft=1;type=outer.scrollLeft===0?'negative':'default'}outer.remove();return type;
 })();
 const maxScroll=rail=>Math.max(0,rail.scrollWidth-rail.clientWidth);
 const getLogical=rail=>{const max=maxScroll(rail),raw=rail.scrollLeft;return rtlType==='negative'?-raw:rtlType==='reverse'?max-raw:raw};
 const setLogical=(rail,value)=>{const max=maxScroll(rail),bounded=Math.max(0,Math.min(max,value));rail.scrollLeft=rtlType==='negative'?-bounded:rtlType==='reverse'?max-bounded:bounded};
 rails.forEach(rail=>{
  let startX=0,startScroll=0,dragging=false,moved=false,suppressClick=false,repositioning=false,recycleTimer;
  const rtl=getComputedStyle(rail).direction==='rtl';
  const recyclePassedCards=()=>{
   if(dragging||repositioning)return;
   const gap=parseFloat(getComputedStyle(rail).columnGap)||0;
   let stride=(rail.firstElementChild?.getBoundingClientRect().width||0)+gap;
   if(!stride)return;
   const logical=getLogical(rail),rotations=Math.min(Math.floor(logical/stride),rail.children.length);
   if(!rotations)return;
   repositioning=true;
   const behavior=rail.style.scrollBehavior,snap=rail.style.scrollSnapType,anchor=rail.style.overflowAnchor;
   rail.style.scrollBehavior='auto';rail.style.scrollSnapType='none';rail.style.overflowAnchor='none';
   for(let i=0;i<rotations;i++)rail.append(rail.firstElementChild);
   setLogical(rail,logical-rotations*stride);
   requestAnimationFrame(()=>{rail.style.scrollBehavior=behavior;rail.style.scrollSnapType=snap;rail.style.overflowAnchor=anchor;repositioning=false});
  };
  const finish=()=>{if(!dragging)return;dragging=false;rail.classList.remove('is-dragging');requestAnimationFrame(recyclePassedCards);if(moved){suppressClick=true;setTimeout(()=>{suppressClick=false},0)}};
  const scheduleRecycle=()=>{clearTimeout(recycleTimer);recycleTimer=setTimeout(recyclePassedCards,100)};
  signal.addEventListener('abort',()=>clearTimeout(recycleTimer),{once:true});
  rail.addEventListener('scroll',scheduleRecycle,{passive:true,signal});
  rail.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse'||e.button!==0)return;startX=e.clientX;startScroll=rail.scrollLeft;dragging=true;moved=false},{signal});
  document.addEventListener('pointermove',e=>{if(!dragging)return;const delta=e.clientX-startX;if(Math.abs(delta)>5){moved=true;rail.classList.add('is-dragging');e.preventDefault()}if(moved)rail.scrollLeft=startScroll+delta*(rtl?1:-1)},{signal});
  document.addEventListener('pointerup',finish,{signal});document.addEventListener('pointercancel',finish,{signal});
  document.addEventListener('click',e=>{if(!suppressClick||!e.target.closest?.(`#${rail.id}`))return;e.preventDefault();e.stopPropagation();e.stopImmediatePropagation()},{capture:true,signal});
 });
}
function initHubTiles(){if(!matchMedia('(hover:hover) and (pointer:fine)').matches)return;document.querySelectorAll('.gaming-tile').forEach(tile=>{let rect;tile.addEventListener('pointerenter',()=>{rect=tile.getBoundingClientRect();tile.classList.add('is-hovered')});tile.addEventListener('pointermove',e=>{rect=rect||tile.getBoundingClientRect();const x=(e.clientX-rect.left)/rect.width,y=(e.clientY-rect.top)/rect.height;tile.style.setProperty('--pointer-x',`${(x*100).toFixed(1)}%`);tile.style.setProperty('--pointer-y',`${(y*100).toFixed(1)}%`);tile.style.setProperty('--tilt-x',`${((x-.5)*5).toFixed(2)}deg`);tile.style.setProperty('--tilt-y',`${((.5-y)*4).toFixed(2)}deg`)});tile.addEventListener('pointerleave',()=>{tile.classList.remove('is-hovered');tile.style.setProperty('--tilt-x','0deg');tile.style.setProperty('--tilt-y','0deg');rect=null})})}
function toast(text){const el=document.querySelector('#toast');el.textContent=text;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),2400)}

let syncLiquidNav=()=>{};
(function(){
var $=function(s){return document.querySelector(s)},cl=function(v,a,b){return Math.min(Math.max(v,a),b)},
bar=$('#bar'),glass=$('#glass'),pill=$('#pill'),halo=$('#halo'),bd=$('#bar-bd'),
items=[].slice.call(document.querySelectorAll('#bar .it')),root=document.documentElement;
if(!bar||!items.length)return;

function routeToIdx(path){
  if(path.startsWith('/support'))return 1;
  if(path.startsWith('/cart')||path.startsWith('/checkout'))return 2;
  if(path==='/profile'||path.startsWith('/account')||path==='/login'||path==='/register')return 3;
  return 0;
}

/* ---------- افکت شیشه مایع (LiquidGlassViewport / LiquidGlassButton) ---------- */
var BINS=24,DISP_SCALE=35,LIGHT_SOURCE={x:0.5,y:0.0},W=0,H=0;
var glassFe0=$('#lg-glass-fe0'),glassFe1=$('#lg-glass-fe1'),pillFe0=$('#lg-pill-fe0'),pillFe1=$('#lg-pill-fe1');
var activeGlassFilter=0,activePillFilter=0,lastPillSize='';
var isIOS=/iPad|iPhone|iPod/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
var isSafariMac=/^((?!chrome|android).)*safari/i.test(navigator.userAgent);
var glassRenderMode=(isIOS||isSafariMac)?'blur':'svg';

function generateSmoothConvexMap(width,height,renderMode){
  var w=Math.max(1,Math.round(width)||0);
  var h=Math.max(1,Math.round(height)||0);
  var canvas=document.createElement('canvas');
  canvas.width=w;
  canvas.height=h;
  var ctx=canvas.getContext('2d');
  if(!ctx)return null;
  var imgData=ctx.createImageData(w,h);
  var data=imgData.data;
  var power=3.5;
  for(var y=0;y<h;y++){
    for(var x=0;x<w;x++){
      var nx=(x/w)*2-1;
      var ny=(y/h)*2-1;
      var d=Math.pow(Math.abs(nx),power)+Math.pow(Math.abs(ny),power);
      var r=128,g=128,a=0;
      if(d<=1){
        var curveMagnitude=Math.sin(Math.pow(d,0.8)*Math.PI);
        var dx=-nx*curveMagnitude;
        var dy=-ny*curveMagnitude;
        r=Math.round(128+dx*127);
        g=Math.round(128+dy*127);
        a=255;
      }
      var index=(y*w+x)*4;
      data[index]=r;
      data[index+1]=g;
      data[index+2]=128;
      data[index+3]=renderMode==='webgl'?a:255;
    }
  }
  ctx.putImageData(imgData,0,0);
  var url=canvas.toDataURL('image/png');
  return{width:w,height:h,data:data,url:url};
}

function analyzeRefraction(mapRef,lightAz){
  if(!mapRef)return null;
  var width=mapRef.width,height=mapRef.height,data=mapRef.data;
  var profile=new Array(BINS).fill(0);
  var counts=new Array(BINS).fill(0);
  var sumX=0,sumY=0,sumMag=0;
  var step=2;
  for(var y=0;y<height;y+=step){
    for(var x=0;x<width;x+=step){
      var i=(y*width+x)*4;
      var bx=((data[i]!==undefined?data[i]:128)-128)/127;
      var by=((data[i+1]!==undefined?data[i+1]:128)-128)/127;
      var mag=Math.hypot(bx,by);
      if(mag<0.02)continue;
      var ang=Math.atan2(by,bx);
      var facing=Math.max(0,Math.cos(ang-lightAz));
      var bright=mag*(0.35+0.65*facing);
      sumX+=Math.cos(ang)*bright;
      sumY+=Math.sin(ang)*bright;
      sumMag+=bright;
      var bin=Math.floor(((ang+Math.PI)/(2*Math.PI))*BINS)%BINS;
      if(bin<0)bin+=BINS;
      profile[bin]+=bright;
      counts[bin]++;
    }
  }
  var maxP=0;
  for(var b=0;b<BINS;b++){
    if(counts[b])profile[b]/=counts[b];
    if(profile[b]>maxP)maxP=profile[b];
  }
  if(maxP>0){
    for(var b2=0;b2<BINS;b2++)profile[b2]/=maxP;
  }
  var domAngle=Math.atan2(sumY,sumX);
  var samples=Math.max(1,(width*height)/(step*step));
  var magnitude=Math.min(1,(sumMag/samples)*6);
  return{profile:profile,domAngle:domAngle,magnitude:magnitude};
}

function buildConicGradient(profile,fromDeg){
  var stops=[];
  for(var b=0;b<=BINS;b++){
    var idx=b%BINS;
    var deg=(b/BINS)*360;
    var rad=(deg*Math.PI)/180;
    var spec=Math.pow(Math.cos(rad),2);
    var t=Math.max(profile[idx]||0,spec);
    if(spec>=0.28){
      var wOp=(0.45+t*0.53).toFixed(3);
      stops.push('rgba(255,255,255,'+wOp+') '+deg.toFixed(1)+'deg');
    }else{
      var dOp=(0.38+(0.28-spec)*0.65).toFixed(3);
      stops.push('rgba(14,18,26,'+dOp+') '+deg.toFixed(1)+'deg');
    }
  }
  return'conic-gradient(from 135deg at 50% 50%, '+stops.join(', ')+')';
}

function lighten(el,M,cx,cy,th){
  if(!W||!H||!M)return;
  var currentX=cx/W,currentY=cy/H;
  var dx=LIGHT_SOURCE.x-currentX,dy=LIGHT_SOURCE.y-currentY;
  var lightAz=Math.atan2(dy,dx)-th;
  var key=lightAz.toFixed(2);
  if(key!==el._k){
    el._k=key;
    var analysis=analyzeRefraction(M,lightAz);
    if(analysis){
      var intensity=0.4+analysis.magnitude*0.6;
      var cosVal=-Math.cos(analysis.domAngle)*intensity;
      var sinVal=-Math.sin(analysis.domAngle)*intensity;
      var lightAngleDeg=(analysis.domAngle*180)/Math.PI+90;
      var rimGradient=buildConicGradient(analysis.profile,lightAngleDeg);
      el.style.setProperty('--cos',cosVal.toString());
      el.style.setProperty('--sin',sinVal.toString());
      el.style.setProperty('--light-angle',lightAngleDeg+'deg');
      el.style.setProperty('--rim-intensity',analysis.magnitude.toString());
      el.style.setProperty('--rim-gradient',rimGradient);
    }
  }
}

/* ---------- حالت و فیزیک ژله‌ای ---------- */
var S={cx:0,cy:0,tcx:0,tcy:0,vx:0,vy:0,th:0,tth:0,vth:0},P={xL:0,xR:0,vL:0,vR:0,pf:1,tpf:1},
Gl={g:0,tg:0},PV=0,LX=0,LY=0,lx=0,lt=0,BW,BH,PW,PH,MB,MP,slot=[],lo,hi,idx=routeToIdx(decodeURI(location.pathname)),tgtC=0,drag=false,mode=null,run=false,last=0,rz;
function physics(){
  S.vx=(S.vx+(S.tcx-S.cx)*.14)*.74;S.cx+=S.vx;S.vy=(S.vy+(S.tcy-S.cy)*.14)*.74;S.cy+=S.vy;
  S.vth=(S.vth+(S.tth-S.th)*.12)*.76;S.th+=S.vth;
  P.pf+=(P.tpf-P.pf)*.16;PV*=.88;Gl.g+=(Gl.tg-Gl.g)*(Gl.tg>Gl.g?.4:.045);
  /* لبهٔ جلویی تند و لبهٔ عقبی نرم؛ هرچه سرعت بیشتر، کشیدگی بیشتر */
  var hw=PW*P.pf/2,c=(P.xL+P.xR)/2,d=Math.abs(PV)>2?(PV>0?1:-1):(tgtC>=c?1:-1),
  E=Math.min(120,Math.max(Math.abs(PV)*3.2,Math.abs(tgtC-c)*.5)),kl=drag?.22:.12,dl=drag?.7:.775,
  tR=tgtC+hw+(d<0?E:0),tL=tgtC-hw-(d>0?E:0),MW=PW*3.3;
  if(d>0){P.vR=(P.vR+(tR-P.xR)*kl)*dl;P.vL=(P.vL+(tL-P.xL)*.032)*.85}
  else{P.vL=(P.vL+(tL-P.xL)*kl)*dl;P.vR=(P.vR+(tR-P.xR)*.032)*.85}
  P.xL+=P.vL;P.xR+=P.vR;
  if(P.xL<-2){P.xL=-2;P.vL=0}if(P.xR>BW+2){P.xR=BW+2;P.vR=0}
  if(P.xR-P.xL>MW){if(d>0){P.xL=P.xR-MW;P.vL=P.vR}else{P.xR=P.xL+MW;P.vR=P.vL}}
  if(P.xR-P.xL<PW*.7){var m=(P.xL+P.xR)/2;P.xL=m-PW*.35;P.xR=m+PW*.35;P.vL=P.vR=0}}
function moving(){var hw=PW*P.tpf/2,e=Math.abs(S.tcx-S.cx)+Math.abs(S.tcy-S.cy)+Math.abs(S.vx)+Math.abs(S.vy)+Math.abs(P.xL-(tgtC-hw))+Math.abs(P.xR-(tgtC+hw))+Math.abs(P.vL)+Math.abs(P.vR)+Math.abs(P.pf-P.tpf)*50+(Math.abs(S.tth-S.th)+Math.abs(S.vth))*200;
  return drag||mode||Gl.g>.01||Gl.tg>0||e+Math.abs(PV)>.15}
function renderNav(){
  var c=Math.cos(S.th),s=Math.sin(S.th),w=P.xR-P.xL,pc=(P.xL+P.xR)/2,hs=cl(Math.pow(PW*P.pf/w,.45),.72,1.15),h=Math.min(PH*P.pf*hs,w,BH+6),
  px=S.cx+c*(pc-BW/2),py=S.cy+s*(pc-BW/2),st=pill.style;
  bar.style.transform='translate('+(S.cx-BW/2).toFixed(2)+'px,'+(S.cy-BH/2).toFixed(2)+'px) rotate('+S.th.toFixed(4)+'rad)';
  st.left=P.xL.toFixed(2)+'px';st.width=w.toFixed(2)+'px';st.top=((BH-h)/2).toFixed(2)+'px';st.height=h.toFixed(2)+'px';st.borderRadius=(Math.min(w,h)/2).toFixed(1)+'px';
  var hh=halo.style,gx=cl((LX-P.xL)/w,0,1)*100,gy=cl((LY-(BH-h)/2)/h,0,1)*100,gg=Gl.g.toFixed(3);
  hh.left=st.left;hh.width=st.width;hh.top=st.top;hh.height=st.height;hh.borderRadius=st.borderRadius;
  st.setProperty('--gx',gx.toFixed(1)+'%');st.setProperty('--gy',gy.toFixed(1)+'%');st.setProperty('--g',gg);hh.setProperty('--g',gg);
  if(glassRenderMode==='svg'){
    var pKey=w.toFixed(1)+'x'+h.toFixed(1);
    if(pKey!==lastPillSize){
      lastPillSize=pKey;
      var currentPillFe=activePillFilter===0?pillFe0:pillFe1;
      if(currentPillFe){
        currentPillFe.setAttribute('x','0%');
        currentPillFe.setAttribute('y','0%');
        currentPillFe.setAttribute('width','100%');
        currentPillFe.setAttribute('height','100%');
      }
      var fid='lg-pill-'+activePillFilter;
      st.setProperty('--lg-filter','url(#'+fid+')');
      st.setProperty('--lg-webkit-filter','url(#'+fid+')');
      activePillFilter=1-activePillFilter;
    }
  }
  lighten(glass,MB,S.cx,S.cy,S.th);lighten(pill,MP,px,py,S.th)}
function loop(t){var n=cl(Math.round((t-last)/16.67),1,4);last=t;while(n--)physics();renderNav();if(moving())requestAnimationFrame(loop);else run=false}
function wake(){if(!run){run=true;last=performance.now();requestAnimationFrame(loop)}}

function applyGlassFilterSwap(){
  var gfid='lg-glass-'+activeGlassFilter;
  glass.style.setProperty('--lg-filter','url(#'+gfid+')');
  glass.style.setProperty('--lg-webkit-filter','url(#'+gfid+')');
  activeGlassFilter=1-activeGlassFilter;
}
function applyPillFilterSwap(){
  var pfid='lg-pill-'+activePillFilter;
  pill.style.setProperty('--lg-filter','url(#'+pfid+')');
  pill.style.setProperty('--lg-webkit-filter','url(#'+pfid+')');
  activePillFilter=1-activePillFilter;
}

function build(){
  W=innerWidth;H=innerHeight;
  var pad=parseFloat(getComputedStyle(bar).paddingTop)||5;
  BW=bar.offsetWidth||Math.min(Math.round(W*0.84),336);BH=bar.offsetHeight||64;PH=BH-pad*2;PW=Math.round((items[0].offsetWidth||((BW-pad*2)/4))-2);
  slot=items.map(function(b,i){return b.offsetWidth?b.offsetLeft+b.offsetWidth/2:pad+(i+0.5)*((BW-pad*2)/items.length)});lo=Math.min.apply(0,slot);hi=Math.max.apply(0,slot);
  MB=generateSmoothConvexMap(BW,BH,glassRenderMode);
  MP=generateSmoothConvexMap(PW,PH,glassRenderMode);
  if(glassRenderMode==='svg'){
    if(MB&&MB.url){
      [glassFe0,glassFe1].forEach(function(fe){
        if(!fe)return;
        fe.setAttribute('href',MB.url);
        fe.setAttributeNS('http://www.w3.org/1999/xlink','xlink:href',MB.url);
        fe.setAttribute('x','0%');
        fe.setAttribute('y','0%');
        fe.setAttribute('width','100%');
        fe.setAttribute('height','100%');
      });
      applyGlassFilterSwap();
      var gImg=new Image();
      gImg.onload=function(){requestAnimationFrame(applyGlassFilterSwap)};
      gImg.src=MB.url;
    }
    if(MP&&MP.url){
      [pillFe0,pillFe1].forEach(function(fe){
        if(!fe)return;
        fe.setAttribute('href',MP.url);
        fe.setAttributeNS('http://www.w3.org/1999/xlink','xlink:href',MP.url);
        fe.setAttribute('x','0%');
        fe.setAttribute('y','0%');
        fe.setAttribute('width','100%');
        fe.setAttribute('height','100%');
      });
      applyPillFilterSwap();
      var pImg=new Image();
      pImg.onload=function(){requestAnimationFrame(applyPillFilterSwap)};
      pImg.src=MP.url;
    }
  }
  glass._k=pill._k=null;lastPillSize='';
  var sb=parseFloat(getComputedStyle(root).paddingBottom)||0;
  var bGap=W<=395?12:16;
  S.cx=S.tcx=W/2;S.cy=S.tcy=H-bGap-sb-BH/2;
  tgtC=slot[idx];P.xL=tgtC-PW/2;P.xR=tgtC+PW/2;P.vL=P.vR=0;renderNav();bar.classList.add('is-ready')}

/* ---------- تعامل ---------- */
function loc(e){var dx=e.clientX-S.cx,dy=e.clientY-S.cy,c=Math.cos(S.th),s=Math.sin(S.th);LX=c*dx+s*dy+BW/2;LY=-s*dx+c*dy+BH/2;return LX}
function soft(x){return x<lo?lo-Math.min(34,(lo-x)*.3):x>hi?hi+Math.min(34,(x-hi)*.3):x}
function pick(i,nav){
  idx=i;tgtC=slot[i];items.forEach(function(b,j){b.setAttribute('aria-current',j===i)});
  if(nav){var p=items[i].getAttribute('data-path');if(p&&decodeURI(location.pathname)!==p)go(p)}}
function near(x){var b=0;slot.forEach(function(s,i){if(Math.abs(s-x)<Math.abs(slot[b]-x))b=i});return b}
bar.addEventListener('pointerdown',function(e){drag=true;P.tpf=1.16;Gl.tg=1;Gl.g=Math.max(Gl.g,.55);PV=0;bar.setPointerCapture(e.pointerId);lx=loc(e);lt=e.timeStamp;tgtC=soft(lx);wake()});
bar.addEventListener('pointermove',function(e){if(!drag)return;var x=loc(e),dt=Math.max(1,(e.timeStamp-lt)/16.67);PV+=((x-lx)/dt-PV)*.55;lx=x;lt=e.timeStamp;tgtC=soft(x)});
bar.addEventListener('pointerup',function(e){if(!drag)return;drag=false;P.tpf=1;Gl.tg=0;pick(near(loc(e)),true);wake()});
bar.addEventListener('pointercancel',function(){drag=false;P.tpf=1;Gl.tg=0;pick(idx,false);wake()});
items.forEach(function(b,i){b.addEventListener('click',function(e){if(e.detail===0){Gl.g=.8;pick(i,true);wake()}})});

syncLiquidNav=function(){
  if(bd){
    var count=Object.values(state.cart).reduce(function(a,b){return a+b},0);
    bd.hidden=count<=0;
    if(count>0)bd.textContent=new Intl.NumberFormat('fa-IR').format(count);
  }
  var next=routeToIdx(decodeURI(location.pathname));
  if(slot.length&&next!==idx){pick(next,false);wake()}
  else items.forEach(function(b,j){b.setAttribute('aria-current',j===next)});
};

addEventListener('resize',function(){clearTimeout(rz);rz=setTimeout(build,150)});
(function tint(t){bar.style.setProperty('--tc','hsl('+(119-91*Math.cos(t/7000*6.2832)).toFixed(1)+',100%,62%)');requestAnimationFrame(tint)})(0);
build();
syncLiquidNav();
})();
window.addEventListener('popstate',render);render();
let publicProductRealtimeChannel=null;
async function refreshPublicProducts(){
  try{
    const c=await getSupabaseClient(),{data,error}=await c.from('products').select('*').eq('is_published',true).order('id',{ascending:true});
    if(error||!Array.isArray(data)||!data.length)return;
    products.splice(0,products.length,...data);
    Object.entries(state.cart).forEach(([id,qty])=>{const product=products.find(item=>Number(item.id)===Number(id)&&item.price!=null&&Number(item.price)>0);if(!product)delete state.cart[id];else{const limit=product.stock==null?20:Math.min(20,Number(product.stock));if(limit<1)delete state.cart[id];else state.cart[id]=Math.min(Number(qty)||1,limit)}});
    state.wish=state.wish.filter(id=>products.some(product=>Number(product.id)===Number(id)));
    save();
    if(typeof render==='function')render();
  }catch{}
}
async function subscribePublicProductsRealtime(){
  try{
    const c=await getSupabaseClient();
    if(publicProductRealtimeChannel)await c.removeChannel(publicProductRealtimeChannel);
    publicProductRealtimeChannel=c.channel('blacksy-public-product-catalog')
      .on('postgres_changes',{event:'*',schema:'public',table:'products'},()=>refreshPublicProducts())
      .subscribe();
  }catch{}
}
(async()=>{await refreshPublicProducts();await subscribePublicProductsRealtime()})();
let homeContentRealtimeChannel=null;
async function subscribeHomeContentRealtime(){try{const c=await getSupabaseClient();if(homeContentRealtimeChannel)await c.removeChannel(homeContentRealtimeChannel);homeContentRealtimeChannel=c.channel('blacksy-home-content').on('postgres_changes',{event:'*',schema:'public',table:'site_content',filter:'id=eq.home'},payload=>{if(payload.new?.content){state.homeContent=normalizeHomeContent(payload.new.content);if(decodeURI(location.pathname)==='/')render()}}).subscribe()}catch{}}
(async()=>{try{const c=await getSupabaseClient(),{data,error}=await c.from('site_content').select('content').eq('id','home').maybeSingle();if(!error&&data?.content){state.homeContent=normalizeHomeContent(data.content);if(decodeURI(location.pathname)==='/')render()}await subscribeHomeContentRealtime()}catch{}})();
