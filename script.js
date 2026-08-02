/* =====================================================================
   GLASS — application logic
   Organized as small, focused classes. Each owns one piece of UI state
   and talks to the DOM directly (no framework, no build step).
===================================================================== */

'use strict';

/* ---------------------------------------------------------------------
   Mock data — stands in for a real backend. Keyed by conversation id so
   switching tabs/conversations is just a state swap, not a refetch.
--------------------------------------------------------------------- */
const CONVERSATIONS = {
  'design-team': {
    name: 'Design Team', sub: '4 members · 2 online', avatar: 'DT',
    messages: [
      { id: 'm1', author: 'Mina Farrokh', mine: false, text: 'Pushed the new glass mockups to Figma ✨', time: '9:41 AM' },
      { id: 'm2', author: 'You', mine: true, text: 'These look incredible. The edge refraction on the sidebar is *chef’s kiss*.', time: '9:44 AM' },
      { id: 'm3', author: 'Mina Farrokh', mine: false, text: 'Right?? Tried to get that real Apple "thick glass" feel instead of a flat blur.', time: '9:45 AM' },
      { id: 'm4', author: 'Arman Kiani', mine: false, text: 'Can we bump the corner radius on the input bar a touch? Feels slightly stiff next to the bubbles.', time: '9:52 AM' },
    ],
  },
  general: {
    name: 'General', sub: '12 members · 5 online', avatar: 'GN',
    messages: [
      { id: 'g1', author: 'Arman Kiani', mine: false, text: 'Standup moved to 10am today, heads up.', time: '8:02 AM' },
      { id: 'g2', author: 'You', mine: true, text: 'Got it, thanks for the heads up!', time: '8:05 AM' },
    ],
  },
  launch: {
    name: 'Launch Room', sub: '6 members · 6 online', avatar: 'LN',
    messages: [
      { id: 'l1', author: 'Sara Nazari', mine: false, text: 'Final build is green across the board. Shipping tonight 🚀', time: '6:12 PM' },
      { id: 'l2', author: 'You', mine: true, text: 'Let’s gooo. I’ll watch the dashboards during rollout.', time: '6:14 PM' },
    ],
  },
  mina: {
    name: 'Mina Farrokh', sub: 'Online', avatar: 'M',
    messages: [
      { id: 'dm1', author: 'Mina Farrokh', mine: false, text: 'Hey! Did you get a chance to look at the profile modal spacing?', time: 'Yesterday' },
      { id: 'dm2', author: 'You', mine: true, text: 'Yep, tightened it up. Should feel snappier now.', time: 'Yesterday' },
    ],
  },
  arman: {
    name: 'Arman Kiani', sub: 'Online', avatar: 'A',
    messages: [
      { id: 'a1', author: 'Arman Kiani', mine: false, text: 'Sounds good, talk soon.', time: '2:30 PM' },
    ],
  },
  sara: {
    name: 'Sara Nazari', sub: 'Last seen 2h ago', avatar: 'S',
    messages: [
      { id: 's1', author: 'Sara Nazari', mine: false, text: 'Sent over the launch checklist, lmk if anything is missing.', time: '11:10 AM' },
    ],
  },
};

let activeConversation = 'design-team';
let replyingTo = null;      // { id, author, text } | null
let pendingDeleteId = null; // message id awaiting confirm-popup decision

/* =====================================================================
   1. AMBIENT BACKGROUND — cycles the gradient palette on demand
===================================================================== */
class Ambient {
  constructor() {
    this.palettes = [
      { 1: '#6e7bff', 2: '#ff8bd0', 3: '#4fc3f7', 4: '#63e6a3' },
      { 1: '#ff7a6e', 2: '#ffd166', 3: '#c77dff', 4: '#4fc3f7' },
      { 1: '#43e97b', 2: '#38f9d7', 3: '#667eea', 4: '#f093fb' },
      { 1: '#ff9a9e', 2: '#a18cd1', 3: '#fbc2eb', 4: '#8fd3f4' },
    ];
    this.index = 0;
    document.getElementById('themeShift').addEventListener('click', () => this.next());
  }
  next() {
    this.index = (this.index + 1) % this.palettes.length;
    const p = this.palettes[this.index];
    const root = document.documentElement.style;
    root.setProperty('--bg-1', p[1]);
    root.setProperty('--bg-2', p[2]);
    root.setProperty('--bg-3', p[3]);
    root.setProperty('--bg-4', p[4]);
  }
}

/* =====================================================================
   2. SIDEBAR — tab glider morph + conversation list selection
   The "glider" pill physically slides/stretches between tabs using the
   spring easing, which is what sells the jelly feel rather than a flat
   fade between panels.
===================================================================== */
class Sidebar {
  constructor(onSelectConversation) {
    this.tabs = document.getElementById('sidebarTabs');
    this.glider = document.getElementById('tabGlider');
    this.panels = {
      channels: document.getElementById('panel-channels'),
      direct: document.getElementById('panel-direct'),
    };
    this.onSelectConversation = onSelectConversation;

    this.tabs.querySelectorAll('.tab').forEach((btn, i) => {
      btn.addEventListener('click', () => this.selectTab(btn.dataset.tab, i));
    });

    document.querySelectorAll('.list__item').forEach((item) => {
      item.addEventListener('click', () => this.selectConversation(item));
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.selectConversation(item); }
      });
    });

    // Mobile menu toggle
    document.getElementById('menuToggle').addEventListener('click', () => {
      document.getElementById('app').classList.toggle('sidebar-open');
    });
    document.getElementById('mobileBack')?.addEventListener('click', () => {
      document.getElementById('app').classList.remove('sidebar-open');
    });
  }

  selectTab(name, index) {
    this.tabs.querySelectorAll('.tab').forEach((t) => {
      t.classList.toggle('is-active', t.dataset.tab === name);
      t.setAttribute('aria-selected', t.dataset.tab === name);
    });
    // The spring-eased transform is what gives the pill its "stretch and
    // settle" jelly quality when it slides to the second tab position.
    this.glider.style.transform = index === 0 ? 'translateX(0)' : 'translateX(100%)';

    Object.entries(this.panels).forEach(([key, el]) => {
      const active = key === name;
      el.classList.toggle('is-active', active);
      el.hidden = !active;
    });
  }

  selectConversation(item) {
    document.querySelectorAll('.list__item').forEach((el) => el.classList.remove('is-active'));
    item.classList.add('is-active');
    this.onSelectConversation(item.dataset.conversation);
    // Auto-close the mobile drawer once a conversation is picked.
    document.getElementById('app').classList.remove('sidebar-open');
  }
}

/* =====================================================================
   3. CHAT — renders messages for the active conversation, handles
   right-click/long-press context menu, edit/delete/reply actions.
===================================================================== */
class Chat {
  constructor() {
    this.headerAvatar = document.getElementById('headerAvatar');
    this.headerName = document.getElementById('headerName');
    this.headerSub = document.getElementById('headerSub');
    this.messagesEl = document.getElementById('messages');
    this.composerInput = document.getElementById('composerInput');

    this.contextMenu = document.getElementById('contextMenu');
    this.contextTargetId = null;
    this.longPressTimer = null;

    this.messagesEl.addEventListener('contextmenu', (e) => this.handleContextMenuTrigger(e));
    this.messagesEl.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
    this.messagesEl.addEventListener('touchend', () => clearTimeout(this.longPressTimer));

    this.contextMenu.querySelectorAll('button').forEach((btn) => {
      btn.addEventListener('click', () => this.handleContextAction(btn.dataset.action));
    });

    document.addEventListener('click', (e) => {
      if (!this.contextMenu.contains(e.target)) this.closeContextMenu();
    });
    document.addEventListener('scroll', () => this.closeContextMenu(), true);

    // Soft confirm popup
    this.confirmPopup = document.getElementById('confirmPopup');
    document.getElementById('confirmCancel').addEventListener('click', () => this.closeConfirmPopup());
    document.getElementById('confirmDelete').addEventListener('click', () => this.performDelete());

    this.render('design-team');
  }

  render(conversationId) {
    activeConversation = conversationId;
    const convo = CONVERSATIONS[conversationId];
    this.headerAvatar.textContent = convo.avatar;
    this.headerName.textContent = convo.name;
    this.headerSub.textContent = convo.sub;
    this.composerInput.placeholder = `Message ${convo.name}`;

    this.messagesEl.innerHTML = '';
    convo.messages.forEach((m) => this.messagesEl.appendChild(this.buildMessageEl(m)));
    this.messagesEl.scrollTop = this.messagesEl.scrollHeight;
    this.clearReply();
  }

  buildMessageEl(m) {
    const wrap = document.createElement('div');
    wrap.className = `msg${m.mine ? ' msg--mine' : ''}`;
    wrap.dataset.id = m.id;

    const initials = m.author.split(' ').map((w) => w[0]).slice(0, 2).join('');
    const replyHtml = m.replyTo
      ? `<div class="msg__reply-ref">↩ ${escapeHtml(m.replyTo.author)}: ${escapeHtml(truncate(m.replyTo.text, 40))}</div>`
      : '';

    wrap.innerHTML = `
      <span class="msg__avatar">${initials}</span>
      <span class="msg__col">
        <span class="msg__meta"><span class="msg__author">${escapeHtml(m.author)}</span><span class="msg__time">${m.time}</span></span>
        ${replyHtml}
        <span class="msg__bubble${m.edited ? ' is-edited' : ''}">${escapeHtml(m.text)}</span>
      </span>
    `;
    return wrap;
  }

  /* ---- context menu -------------------------------------------------- */

  handleContextMenuTrigger(e) {
    const msgEl = e.target.closest('.msg');
    if (!msgEl) return;
    e.preventDefault();
    this.openContextMenu(msgEl, e.clientX, e.clientY);
  }

  handleTouchStart(e) {
    const msgEl = e.target.closest('.msg');
    if (!msgEl) return;
    const touch = e.touches[0];
    this.longPressTimer = setTimeout(() => {
      this.openContextMenu(msgEl, touch.clientX, touch.clientY);
    }, 480);
  }

  openContextMenu(msgEl, x, y) {
    this.contextTargetId = msgEl.dataset.id;
    const menu = this.contextMenu;
    menu.classList.add('is-open');
    // Keep the menu on-screen near the click point.
    const w = 200, h = 200;
    const left = Math.min(x, window.innerWidth - w - 12);
    const top = Math.min(y, window.innerHeight - h - 12);
    menu.style.left = `${left}px`;
    menu.style.top = `${top}px`;
  }

  closeContextMenu() {
    this.contextMenu.classList.remove('is-open');
  }

  handleContextAction(action) {
    const id = this.contextTargetId;
    this.closeContextMenu();
    if (!id) return;
    const convo = CONVERSATIONS[activeConversation];
    const msg = convo.messages.find((m) => m.id === id);
    if (!msg) return;

    if (action === 'reply') this.startReply(msg);
    if (action === 'edit') this.startEdit(msg);
    if (action === 'copy') this.copyText(msg);
    if (action === 'delete') this.confirmDeletePrompt(id);
  }

  /* ---- reply preview --------------------------------------------------- */

  startReply(msg) {
    replyingTo = { id: msg.id, author: msg.author, text: msg.text };
    document.getElementById('replyTarget').textContent = msg.author;
    document.getElementById('replySnippet').textContent = truncate(msg.text, 60);
    document.getElementById('replyPreview').hidden = false;
    this.composerInput.focus();
  }

  clearReply() {
    replyingTo = null;
    document.getElementById('replyPreview').hidden = true;
  }

  /* ---- edit-in-place ----------------------------------------------------- */

  startEdit(msg) {
    const msgEl = this.messagesEl.querySelector(`.msg[data-id="${msg.id}"] .msg__bubble`);
    if (!msgEl) return;
    const original = msg.text;

    const input = document.createElement('textarea');
    input.className = 'glass-inset';
    input.style.cssText = 'width:100%;min-width:220px;font-size:0.88rem;padding:8px 10px;color:inherit;';
    input.value = original;
    msgEl.replaceWith(input);
    input.focus();
    input.setSelectionRange(input.value.length, input.value.length);

    const commit = () => {
      const val = input.value.trim();
      if (val && val !== original) {
        msg.text = val;
        msg.edited = true;
      }
      const rebuilt = this.buildMessageEl(msg);
      input.closest('.msg').replaceWith(rebuilt);
    };

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); commit(); }
      if (e.key === 'Escape') { const rebuilt = this.buildMessageEl(msg); input.closest('.msg').replaceWith(rebuilt); }
    });
    input.addEventListener('blur', commit, { once: true });
  }

  copyText(msg) {
    navigator.clipboard?.writeText(msg.text).catch(() => {});
  }

  /* ---- delete with soft confirm ------------------------------------------ */

  confirmDeletePrompt(id) {
    pendingDeleteId = id;
    const menuRect = this.contextMenu.getBoundingClientRect();
    const popup = this.confirmPopup;
    popup.style.left = `${Math.min(menuRect.left, window.innerWidth - 260)}px`;
    popup.style.top = `${Math.min(menuRect.top, window.innerHeight - 140)}px`;
    popup.classList.add('is-open');
    popup.setAttribute('aria-hidden', 'false');
  }

  closeConfirmPopup() {
    pendingDeleteId = null;
    this.confirmPopup.classList.remove('is-open');
    this.confirmPopup.setAttribute('aria-hidden', 'true');
  }

  performDelete() {
    if (!pendingDeleteId) return;
    const id = pendingDeleteId;
    const convo = CONVERSATIONS[activeConversation];
    const el = this.messagesEl.querySelector(`.msg[data-id="${id}"]`);
    this.closeConfirmPopup();
    if (!el) return;
    el.classList.add('msg--deleting');
    el.addEventListener('animationend', () => {
      convo.messages = convo.messages.filter((m) => m.id !== id);
      el.remove();
    }, { once: true });
  }

  /* ---- sending ------------------------------------------------------------ */

  sendMessage(text) {
    if (!text.trim()) return;
    const convo = CONVERSATIONS[activeConversation];
    const msg = {
      id: `m${Date.now()}`,
      author: 'You',
      mine: true,
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
    };
    if (replyingTo) msg.replyTo = { author: replyingTo.author, text: replyingTo.text };
    convo.messages.push(msg);
    this.messagesEl.appendChild(this.buildMessageEl(msg));
    this.messagesEl.scrollTop = this.messagesEl.scrollHeight;
    this.clearReply();
  }
}

/* =====================================================================
   4. COMPOSER — auto-growing textarea, attachment bubble menu, and the
   send button's bubble-burst micro-interaction.
===================================================================== */
class Composer {
  constructor(chat) {
    this.chat = chat;
    this.input = document.getElementById('composerInput');
    this.sendBtn = document.getElementById('sendBtn');
    this.attachBtn = document.getElementById('attachBtn');
    this.attachMenu = document.getElementById('attachMenu');

    this.input.addEventListener('input', () => this.autoGrow());
    this.input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); this.send(); }
    });
    this.sendBtn.addEventListener('click', () => this.send());

    this.attachBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleAttachMenu();
    });
    document.addEventListener('click', () => this.closeAttachMenu());
    this.attachMenu.querySelectorAll('.attach-menu__item').forEach((item) => {
      item.addEventListener('click', () => this.closeAttachMenu());
    });

    document.getElementById('cancelReply').addEventListener('click', () => this.chat.clearReply());
  }

  autoGrow() {
    this.input.style.height = 'auto';
    this.input.style.height = `${Math.min(this.input.scrollHeight, 120)}px`;
  }

  toggleAttachMenu() {
    const open = this.attachMenu.classList.toggle('is-open');
    this.attachBtn.setAttribute('aria-expanded', String(open));
  }

  closeAttachMenu() {
    this.attachMenu.classList.remove('is-open');
    this.attachBtn.setAttribute('aria-expanded', 'false');
  }

  send() {
    const text = this.input.value;
    if (!text.trim()) return;
    this.chat.sendMessage(text);
    this.input.value = '';
    this.autoGrow();

    // Bubble-burst: retrigger the animation by toggling the class off
    // and back on across a frame boundary.
    this.sendBtn.classList.remove('is-sent');
    void this.sendBtn.offsetWidth; // force reflow so the animation replays
    this.sendBtn.classList.add('is-sent');
  }
}

/* =====================================================================
   5. MODALS — shared open/close choreography for any .modal element.
===================================================================== */
class ModalController {
  constructor() {
    this.backdrop = document.getElementById('modalBackdrop');
    this.openModalEl = null;

    document.querySelectorAll('[data-close-modal]').forEach((btn) => {
      btn.addEventListener('click', () => this.close());
    });
    this.backdrop.addEventListener('click', () => this.close());
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.close();
    });

    document.getElementById('newChannelBtn').addEventListener('click', () => this.open('createChannelModal'));
    document.getElementById('openProfile').addEventListener('click', () => this.open('profileModal'));

    document.getElementById('confirmCreateChannel').addEventListener('click', () => this.close());
  }

  open(id) {
    this.openModalEl = document.getElementById(id);
    this.backdrop.classList.add('is-open');
    this.openModalEl.classList.add('is-open');
    this.openModalEl.setAttribute('aria-hidden', 'false');
  }

  close() {
    if (this.openModalEl) {
      this.openModalEl.classList.remove('is-open');
      this.openModalEl.setAttribute('aria-hidden', 'true');
    }
    this.backdrop.classList.remove('is-open');
    this.openModalEl = null;
  }
}

/* =====================================================================
   6. REFRACTIVE HOVER — a soft light highlight that tracks the cursor
   across glass surfaces via a radial-gradient positioned with CSS vars,
   giving the "light diffraction following the mouse" effect cheaply.
===================================================================== */
function initRefractiveHover() {
  document.querySelectorAll('.glass, .glass-capsule').forEach((el) => {
    el.style.setProperty('--mx', '50%');
    el.style.setProperty('--my', '0%');
    el.addEventListener('pointermove', (e) => {
      const rect = el.getBoundingClientRect();
      const mx = ((e.clientX - rect.left) / rect.width) * 100;
      const my = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty('--mx', `${mx}%`);
      el.style.setProperty('--my', `${my}%`);
    });
  });
  // Inject the highlight layer via a stylesheet rule referencing --mx/--my
  const style = document.createElement('style');
  style.textContent = `
    .glass::after, .glass-capsule::after {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background: radial-gradient(circle at var(--mx,50%) var(--my,0%), rgba(255,255,255,0.16), transparent 45%);
      opacity: 0;
      transition: opacity 0.4s ease;
      pointer-events: none;
    }
    .glass:hover::after, .glass-capsule:hover::after { opacity: 1; }
  `;
  document.head.appendChild(style);
}

/* ---- helpers ---------------------------------------------------------- */
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
function truncate(str, n) {
  return str.length > n ? `${str.slice(0, n)}…` : str;
}

/* =====================================================================
   BOOT
===================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  new Ambient();
  const chat = new Chat();
  new Sidebar((conversationId) => chat.render(conversationId));
  new Composer(chat);
  new ModalController();
  initRefractiveHover();
});
