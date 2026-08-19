
    let appSettings = { schoolName: 'Test', email: 'test@test' };
    let registeredSchools = [{name: 'School A', email: 'a@a'}];
    let currentChatRecipient = 'master';
    let unreadCounts = {};
    let currentView = 'chat';
    let firebase = {};
    let db = {};
    
    // Stub browser things
    function escapeHtml(str) { return str; }
    

(function(){

/* =====================================================
   DATA MODEL
===================================================== */
const CATEGORIES = {
  science: {
    label:'STEM / Science Equipment', short:'Science', color:'var(--science)', hex:'#2D6A4F', prefix:'SCI',
    },
  it: {
    label:'IT Infrastructure', short:'IT', color:'var(--it)', hex:'#1D6E8A', prefix:'ITI',
    },
  math: {
    label:'Mathematics Equipment', short:'Mathematics', color:'var(--math)', hex:'#C9622A', prefix:'MTH',
    },
  engineering: {
    label:'Engineering Equipment', short:'Engineering', color:'var(--engineering)', hex:'#6B4FA0', prefix:'ENG',
    }
};
const STATUSES = ['Available','In Use','Reserved','Under Maintenance','Needs Repair','Broken','Lost','Retired'];
const UNITS = ['Each','Pack','Set','Roll','Books','Boxes','500ml','500g','250g','2.5L','25g','1L','1KG'];

const STATUS_COLORS = {
  'Available':        {bg:'#E1EFE6', fg:'#1F5C40'},
  'In Use':           {bg:'#E5EEF5', fg:'#235A78'},
  'Reserved':         {bg:'#EFE6F7', fg:'#5E3F8A'},
  'Under Maintenance':{bg:'#FBEFDD', fg:'#92521A'},
  'Needs Repair':     {bg:'#FCE5CD', fg:'#B45F06'},
  'Broken':           {bg:'#F8E1DF', fg:'#A8332A'},
  'Lost':             {bg:'#4A4A4A', fg:'#FFFFFF'},
  'Retired':          {bg:'#ECECEC', fg:'#666666'}
};

const STORAGE_KEY = 'flawlex-stem-ledger-v3';
const firebaseConfig = {
  apiKey: "AIzaSyAglujmMOheEDXPBfwFDNepngWpp3CT6sk",
  authDomain: "stem-ledger.firebaseapp.com",
  projectId: "stem-ledger",
  storageBucket: "stem-ledger.firebasestorage.app",
  messagingSenderId: "1065092724638",
  appId: "1:1065092724638:web:09e020e2252e48b47c488f"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

let items = [];
let currentView = 'dashboard';
  let appSettings = JSON.parse(localStorage.getItem('stem_settings')) || { schoolName: '', email: '', isAuthenticated: false };
let filters = { category:'all', status:'all', search:'' };
let sortState = { col:'assetTag', dir:'asc' };
let storageMode = 'unknown';

/* =====================================================
   HELPERS
===================================================== */
function uid(){ return 'itm_' + Date.now().toString(36) + Math.random().toString(36).slice(2,8); }

function mkItem(partial){
  const now = new Date().toISOString();
  return Object.assign({
    id: uid(), name:'', category:'science', subcategory:'', assetTag:'', serialNumber:'',
    quantity:1, unit:'Each', status:'Available', location:'',
    minStock:0, cost:0, supplier:'', purchaseDate:'', warrantyExpiry:'', notes:'',
    isLowStock: false,
    dateAdded: now, lastUpdated: now
  }, partial);
}

function escapeHtml(str){
  return String(str ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function fmtMoney(n){
  return 'GH&#8373; ' + Number(n||0).toLocaleString(undefined,{minimumFractionDigits:2, maximumFractionDigits:2});
}
function badge(text, colorMap){
  const c = colorMap[text] || {bg:'#ECECEC', fg:'#666'};
  return `<span class="badge" style="background:${c.bg};color:${c.fg}">${escapeHtml(text)}</span>`;
}

/* =====================================================
   SEED DATA (All 91 Items + Estimated GHS Costs)
===================================================== */
function seedData(){
  const now = new Date().toISOString();
  const b = {dateAdded: now, lastUpdated: now, status: 'Available', isLowStock: false};
  
  const rawData = [
    // SCIENCE (JS)
    { t: 'JS1', n: 'Balance compression 2kg', c: 'science', sc: 'Measuring Instruments', q: 2, u: 'Each', p: 350 },
    { t: 'JS2', n: 'Beaker Glass 100ml', c: 'science', sc: 'Lab Glassware', q: 20, u: 'Each', p: 30 },
    { t: 'JS3', n: 'Beaker Plastic 250ml', c: 'science', sc: 'Lab Glassware', q: 10, u: 'Each', p: 25 },
    { t: 'JS4', n: 'Beaker Plastic 500ml', c: 'science', sc: 'Lab Glassware', q: 5, u: 'Each', p: 35 },
    { t: 'JS5', n: 'Conducting Thermal Rods', c: 'science', sc: 'Heating & Cooling', q: 5, u: 'Each', p: 120 },
    { t: 'JS6', n: 'Conical Flask 100ml', c: 'science', sc: 'Lab Glassware', q: 10, u: 'Each', p: 35 },
    { t: 'JS7', n: 'Dropping Pipettes Plastic', c: 'science', sc: 'Lab Glassware', q: 50, u: 'Each', p: 2 },
    { t: 'JS8', n: 'Electricity Kit', c: 'engineering', sc: 'Electronic Components', q: 1, u: 'Each', p: 450 },
    { t: 'JS9', n: 'Electronics Kit', c: 'engineering', sc: 'Electronic Components', q: 9, u: 'Each', p: 400 },
    { t: 'JS10', n: 'Evaporating Dish', c: 'science', sc: 'General Lab Equipment', q: 5, u: 'Each', p: 45 },
    { t: 'JS11', n: 'Filter Paper 12.5cm', c: 'science', sc: 'General Lab Equipment', q: 4, u: 'Pack', p: 80 },
    { t: 'JS12', n: 'Funnel Filter Plastic', c: 'science', sc: 'General Lab Equipment', q: 10, u: 'Each', p: 15 },
    { t: 'JS13', n: 'Iron Filings', c: 'science', sc: 'Chemicals & Reagents', q: 4, u: 'Pack', p: 40 },
    { t: 'JS14', n: 'JHS Mapped Science Activity Book', c: 'science', sc: 'General Lab Equipment', q: 1, u: 'Each', p: 100 },
    { t: 'JS15', n: 'Leads Red/Black with Croc-clips', c: 'engineering', sc: 'Electronic Components', q: 20, u: 'Each', p: 15 },
    { t: 'JS16', n: 'Litmus Paper - Blue', c: 'science', sc: 'Chemicals & Reagents', q: 5, u: 'Books', p: 20 },
    { t: 'JS17', n: 'Litmus Paper - Red', c: 'science', sc: 'Chemicals & Reagents', q: 5, u: 'Books', p: 20 },
    { t: 'JS18', n: 'Magnet Kit', c: 'science', sc: 'General Lab Equipment', q: 2, u: 'Pack', p: 180 },
    { t: 'JS19', n: 'Magnets (Bar)', c: 'science', sc: 'General Lab Equipment', q: 20, u: 'Each', p: 40 },
    { t: 'JS20', n: 'Masses 100g', c: 'science', sc: 'Measuring Instruments', q: 4, u: 'Set', p: 150 },
    { t: 'JS21', n: 'Measuring Cylinder Plastic 100ml', c: 'science', sc: 'Lab Glassware', q: 10, u: 'Each', p: 35 },
    { t: 'JS22', n: 'Measuring Cylinder Plastic 250ml', c: 'science', sc: 'Lab Glassware', q: 10, u: 'Each', p: 50 },
    { t: 'JS23', n: 'Metal Rod Retort, Base, Clamp', c: 'science', sc: 'General Lab Equipment', q: 3, u: 'Set', p: 250 },
    { t: 'JS24', n: 'Mirrors Kit', c: 'science', sc: 'Microscopes & Optics', q: 3, u: 'Set', p: 120 },
    { t: 'JS25', n: 'Optical Pins', c: 'science', sc: 'Microscopes & Optics', q: 1, u: 'Pack', p: 30 },
    { t: 'JS26', n: 'Petri Dish Plastic 90mm', c: 'science', sc: 'Lab Glassware', q: 20, u: 'Each', p: 10 },
    { t: 'JS27', n: 'Ray Box & Lenses Kit', c: 'science', sc: 'Microscopes & Optics', q: 4, u: 'Each', p: 300 },
    { t: 'JS28', n: 'Safety Goggles (Junior)', c: 'science', sc: 'Safety Equipment', q: 45, u: 'Each', p: 25 },
    { t: 'JS29', n: 'Spatulas', c: 'science', sc: 'General Lab Equipment', q: 10, u: 'Each', p: 15 },
    { t: 'JS30', n: 'Spirit Burners', c: 'science', sc: 'Heating & Cooling', q: 10, u: 'Each', p: 45 },
    { t: 'JS31', n: 'Spring Balances 1kg', c: 'science', sc: 'Measuring Instruments', q: 10, u: 'Each', p: 60 },
    { t: 'JS32', n: 'Spring Balances 500g', c: 'science', sc: 'Measuring Instruments', q: 10, u: 'Each', p: 60 },
    { t: 'JS33', n: 'Stirrer (Plastic, Hand)', c: 'science', sc: 'General Lab Equipment', q: 10, u: 'Each', p: 10 },
    { t: 'JS34', n: 'Stoppers Assorted', c: 'science', sc: 'General Lab Equipment', q: 1, u: 'Each', p: 150 },
    { t: 'JS35', n: 'Stopwatch Digital', c: 'science', sc: 'Measuring Instruments', q: 10, u: 'Each', p: 80 },
    { t: 'JS36', n: 'Syringes re-useable 10ml', c: 'science', sc: 'General Lab Equipment', q: 10, u: 'Each', p: 5 },
    { t: 'JS37', n: 'Syringes re-useable 20ml', c: 'science', sc: 'General Lab Equipment', q: 10, u: 'Each', p: 8 },
    { t: 'JS38', n: 'Syringes re-useable 2ml', c: 'science', sc: 'General Lab Equipment', q: 10, u: 'Each', p: 3 },
    { t: 'JS39', n: 'Syringes re-useable 5ml', c: 'science', sc: 'General Lab Equipment', q: 10, u: 'Each', p: 4 },
    { t: 'JS40', n: 'Test-tube Holder', c: 'science', sc: 'General Lab Equipment', q: 10, u: 'Each', p: 25 },
    { t: 'JS41', n: 'Test-tube Rack', c: 'science', sc: 'General Lab Equipment', q: 10, u: 'Each', p: 45 },
    { t: 'JS42', n: 'Test-tubes 16x100mm, Plastic with Lids', c: 'science', sc: 'Lab Glassware', q: 50, u: 'Each', p: 5 },
    { t: 'JS43', n: 'Test-tubes 24x150mm, Glass', c: 'science', sc: 'Lab Glassware', q: 50, u: 'Each', p: 10 },
    { t: 'JS44', n: 'Thermometer', c: 'science', sc: 'Measuring Instruments', q: 12, u: 'Each', p: 35 },
    { t: 'JS45', n: 'Tongs', c: 'science', sc: 'General Lab Equipment', q: 5, u: 'Each', p: 30 },
    { t: 'JS46', n: 'Transparent Tubing', c: 'science', sc: 'General Lab Equipment', q: 2, u: 'Roll', p: 40 },
    { t: 'JS47', n: 'Stand with Wire Gauze for Spirit Burners', c: 'science', sc: 'Heating & Cooling', q: 10, u: 'Each', p: 60 },
    { t: 'JS48', n: 'White Tile Spotted', c: 'science', sc: 'General Lab Equipment', q: 10, u: 'Each', p: 40 },

    // CHEMICALS (JC)
    { t: 'JC1', n: 'Aluminium Foil', c: 'science', sc: 'General Lab Equipment', q: 1, u: 'Roll', p: 50 },
    { t: 'JC2', n: "Benedict's Solution (Qualitative)", c: 'science', sc: 'Chemicals & Reagents', q: 1, u: '500ml', p: 150 },
    { t: 'JC3', n: 'Calcium Chloride (Anhydrous)', c: 'science', sc: 'Chemicals & Reagents', q: 1, u: '500g', p: 180 },
    { t: 'JC4', n: 'Calcium Hydroxide', c: 'science', sc: 'Chemicals & Reagents', q: 1, u: '250g', p: 120 },
    { t: 'JC5', n: 'Copper Metal Turnings', c: 'science', sc: 'Chemicals & Reagents', q: 1, u: '250g', p: 200 },
    { t: 'JC6', n: 'Copper Sulphate', c: 'science', sc: 'Chemicals & Reagents', q: 1, u: '500g', p: 250 },
    { t: 'JC7', n: 'Hydrochloric Acid (1 Molar)', c: 'science', sc: 'Chemicals & Reagents', q: 1, u: '2.5L', p: 350 },
    { t: 'JC8', n: 'Iodine Solution', c: 'science', sc: 'Chemicals & Reagents', q: 1, u: '500ml', p: 180 },
    { t: 'JC9', n: 'Magnesium Ribbon', c: 'science', sc: 'Chemicals & Reagents', q: 1, u: '25g', p: 150 },
    { t: 'JC10', n: 'Industrial denatured alcohol', c: 'science', sc: 'Chemicals & Reagents', q: 2, u: '1L', p: 120 },
    { t: 'JC11', n: 'Sodium Hydrogen Carbonate', c: 'science', sc: 'Chemicals & Reagents', q: 1, u: '1KG', p: 150 },
    { t: 'JC12', n: 'Sodium Hydroxide', c: 'science', sc: 'Chemicals & Reagents', q: 1, u: '1KG', p: 200 },
    { t: 'JC13', n: 'Universal Indicator pH4 - 11', c: 'science', sc: 'Chemicals & Reagents', q: 1, u: '250ml', p: 180 },
    { t: 'JC14', n: 'Zinc Metal', c: 'science', sc: 'Chemicals & Reagents', q: 1, u: '500g', p: 250 },

    // MATH (JM)
    { t: 'JM1', n: '100 Cards', c: 'math', sc: 'Manipulatives & Models', q: 9, u: 'Pack', p: 45 },
    { t: 'JM2', n: '360 Degree Protractor', c: 'math', sc: 'Geometry Sets', q: 45, u: 'Each', p: 15 },
    { t: 'JM3', n: 'Calculator (4 function)', c: 'math', sc: 'Calculators', q: 45, u: 'Each', p: 60 },
    { t: 'JM4', n: 'Counters', c: 'math', sc: 'Manipulatives & Models', q: 1, u: 'Pack', p: 150 },
    { t: 'JM5', n: 'Dice Multi (4,8,10,12,20 sides)', c: 'math', sc: 'Manipulatives & Models', q: 15, u: 'Pack', p: 80 },
    { t: 'JM6', n: 'Dice numeral', c: 'math', sc: 'Manipulatives & Models', q: 100, u: 'Each', p: 5 },
    { t: 'JM7', n: 'Dice operator', c: 'math', sc: 'Manipulatives & Models', q: 45, u: 'Each', p: 5 },
    { t: 'JM8', n: 'Geared Compasses', c: 'math', sc: 'Geometry Sets', q: 45, u: 'Each', p: 25 },
    { t: 'JM9', n: 'GeoBoards (12x12) and Rubber Bands', c: 'math', sc: 'Manipulatives & Models', q: 9, u: 'Each', p: 80 },
    { t: 'JM10', n: 'Geometric Solids (19 piece)', c: 'math', sc: 'Manipulatives & Models', q: 1, u: 'Set', p: 250 },
    { t: 'JM11', n: 'Geometry Builder Kit', c: 'math', sc: 'Geometry Sets', q: 9, u: 'Pack', p: 350 },
    { t: 'JM12', n: 'GridLines Card Game', c: 'math', sc: 'Manipulatives & Models', q: 9, u: 'Pack', p: 90 },
    { t: 'JM13', n: 'JHS Mapped Mathematics Activity Book', c: 'math', sc: 'General Math Equipment', q: 1, u: 'Each', p: 100 },
    { t: 'JM14', n: 'Large Plastic Storage Boxes', c: 'math', sc: 'General Math Equipment', q: 10, u: 'Each', p: 120 },
    { t: 'JM15', n: 'Mini Chalk Slate', c: 'math', sc: 'General Math Equipment', q: 45, u: 'Each', p: 35 },
    { t: 'JM16', n: 'Ruler 30cm', c: 'math', sc: 'Measuring Tools', q: 45, u: 'Each', p: 5 },
    { t: 'JM17', n: 'Sand Timers', c: 'math', sc: 'Measuring Tools', q: 15, u: 'Each', p: 40 },
    { t: 'JM18', n: 'Scissors (12RH/3LH)', c: 'math', sc: 'General Math Equipment', q: 15, u: 'Each', p: 15 },
    { t: 'JM19', n: 'Tape Measure', c: 'math', sc: 'Measuring Tools', q: 15, u: 'Each', p: 10 },
    { t: 'JM20', n: 'Target Maths Card Game Packs', c: 'math', sc: 'Manipulatives & Models', q: 9, u: 'Pack', p: 120 },
    { t: 'JM21', n: 'Teacher Board Equipment', c: 'math', sc: 'General Math Equipment', q: 1, u: 'Each', p: 250 },

    // ICT & ENGINEERING (ICT)
    { t: 'ICT1', n: 'Projector', c: 'it', sc: 'Projectors & Displays', q: 1, u: 'Each', p: 4500 },
    { t: 'ICT2', n: 'Laptop', c: 'it', sc: 'Computers & Laptops', q: 1, u: 'Each', p: 7000 },
    { t: 'ICT2b', n: 'Speaker', c: 'it', sc: 'Peripherals & Accessories', q: 1, u: 'Each', p: 300 },
    { t: 'ICT3', n: 'Warranty (ICT1 & ICT2)', c: 'it', sc: 'General Engineering Equipment', q: 1, u: 'Each', p: 500 },
    { t: 'ICT4', n: 'Programming Portal', c: 'it', sc: 'Software Licenses', q: 1, u: 'Each', p: 200 },
    { t: 'ICT5', n: 'Robotics Educational Robot', c: 'engineering', sc: 'Robotics Kits', q: 1, u: 'Set', p: 1500 },
    { t: 'ICT6', n: 'Datalogging Sensors', c: 'engineering', sc: 'Testing & Measurement Equipment', q: 1, u: 'Set', p: 800 },
    { t: 'ICT7', n: 'JHS Mapped Tech & Engineering Book', c: 'engineering', sc: 'General Engineering Equipment', q: 1, u: 'Each', p: 100 },
    { t: 'ICT8', n: 'Batteries and Charger', c: 'engineering', sc: 'Electronic Components', q: 1, u: 'Set', p: 250 }
  ];

  return rawData.map(item => mkItem(Object.assign({}, b, {
    name: item.n,
    category: item.c,
    subcategory: item.sc,
    assetTag: item.t,
    quantity: item.q,
    unit: item.u,
    cost: item.p,
    cost: item.p,
    location: ''
  })));
}

/* =====================================================
   VIEW LOGIC
===================================================== */
async function loadItems(){
  try{
    const result = localStorage.getItem(STORAGE_KEY);
    if (result){
      items = JSON.parse(result);
    } else {
      items = seedData();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
    storageMode = 'persistent';
  } catch(e){
    items = seedData();
    storageMode = 'memory';
  }
}

async function saveItems(){
  if (storageMode !== 'persistent') { renderStorageNotice(); return; }
  try{
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    
    // Auto-Sync to Firebase in the background if authenticated
    if (typeof appSettings !== 'undefined' && appSettings.isAuthenticated && appSettings.schoolName) {
      db.collection('schools').doc(appSettings.schoolName).set({
        schoolName: appSettings.schoolName,
        email: appSettings.email || '',
        items: items,
        lastSync: firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true }).catch(err => console.error("Auto-sync failed:", err));
    }
  } catch(e){
    storageMode = 'memory';
    renderStorageNotice();
  }
}

/* =====================================================
   RENDERING
===================================================== */
function render(){
  renderSidebar();
  renderView();
}

function renderSidebar(){
  const nav = document.getElementById('categoryNav');
  let html = `<button class="category-nav-item ${currentView==='inventory' && filters.category==='all' ? 'active':''}" data-action="filter-category" data-cat="all">
      <span class="category-dot" style="background:var(--ink-soft)"></span>
      <span>All categories</span>
      <span class="count">${items.length}</span>
    </button>`;
  for (const [key, cat] of Object.entries(CATEGORIES)){
    const count = items.filter(i=>i.category===key).length;
    const active = currentView==='inventory' && filters.category===key;
    html += `<button class="category-nav-item ${active?'active':''}" data-action="filter-category" data-cat="${key}">
      <span class="category-dot" style="background:${cat.color}"></span>
      <span>${cat.short}</span>
      <span class="count">${count}</span>
    </button>`;
  }
  nav.innerHTML = html;

  document.querySelectorAll('.nav-item, .bottom-nav-btn').forEach(btn=>{
    btn.classList.toggle('active', btn.dataset.view === currentView);
  });

  renderStorageNotice();
}

function renderStorageNotice(){
  const el = document.getElementById('storageNotice');
  if (storageMode === 'memory'){
    el.hidden = false;
    el.innerHTML = "<strong>Warning:</strong> Private browsing or restricted storage detected. Changes will not be saved across sessions. Use <em>Export backup</em> to keep your data.";
  } else {
    el.hidden = true;
  }
}

function renderView(){
  const root = document.getElementById('view');
  root.classList.remove('page-fade-in');
  void root.offsetWidth; // trigger reflow to restart animation
  root.classList.add('page-fade-in');
  
  // Hide navbar topbar on login/register
  const topbar = document.querySelector('.topbar');
  const bottomNav = document.querySelector('.bottom-nav');
  const fab = document.querySelector('.fab');
  const isAuthView = (currentView === 'login' || currentView === 'register');
  const isChatView = (currentView === 'chat');
  if (topbar) topbar.style.display = isAuthView ? 'none' : 'flex';
  if (bottomNav) bottomNav.style.display = isAuthView ? 'none' : 'flex';
  if (fab) fab.style.display = (isAuthView || isChatView) ? 'none' : 'flex';

  if (currentView === 'dashboard') {
    root.innerHTML = dashboardHTML();
  } else if (currentView === 'settings') {
    root.innerHTML = settingsHTML();
  } else if (currentView === 'login') {
    root.innerHTML = loginHTML();
  } else if (currentView === 'register') {
    root.innerHTML = registerHTML();
  } else if (currentView === 'chat') {
    root.innerHTML = chatHTML();
    renderChatMessages();
    scrollToChatBottom();
  } else {
    root.innerHTML = inventoryHTML();
  }
}

/* ---------- Dashboard ---------- */

    function settingsHTML(){
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Settings</h1>
          <p class="page-subtitle">Account Management</p>
        </div>
      </div>
      <div style="max-width:400px; margin:24px auto;">
        <div style="background:var(--surface); padding:24px; border-radius:12px; border:1px solid var(--border);">
          <div style="text-align:center; margin-bottom: 20px;">
            <svg style="width:48px; height:48px; fill:var(--primary);" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
            </svg>
            <h3 style="margin:8px 0 4px 0; color:var(--ink);">Firebase Connected</h3>
            <p style="font-size:12px; color:var(--ink-soft); margin:0;">Your data is securely synced to the cloud.</p>
          </div>
          
          <h3 style="margin:24px 0 12px 0; padding-top:24px; border-top:1px solid var(--border);">Account</h3>
          <p style="font-size:13px; color:var(--ink-soft); margin-bottom:12px;">Logged in as: <strong>${escapeHtml(appSettings.schoolName)}</strong></p>
          <button class="btn btn-ghost" data-action="logout" style="width:100%; color:var(--danger); border:1px solid var(--danger-soft);">Log Out Device</button>
        </div>
      </div>
    `;
  }

  function loginHTML(){
    return `
      <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh; padding:20px;">
        <div style="text-align:center; margin-bottom:24px;">
          <h1 style="font-size:28px; margin:0 0 8px 0; color:var(--primary);">Stem Ledger</h1>
          <p style="color:var(--ink-soft); margin:0;">Welcome back to your school's inventory.</p>
        </div>
        <form id="loginForm" style="width:100%; max-width:320px; background:var(--surface); padding:24px; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.05); border:1px solid var(--border);">
          <div class="field">
            <label>Email Address</label>
            <input type="email" id="loginEmail" required placeholder="Enter email">
          </div>
          <div class="field">
            <label>Master Password</label>
            <input type="password" id="loginPassword" required placeholder="Enter password">
          </div>
          <button type="submit" class="btn primary" style="width:100%; margin-top:8px;">Log In</button>
          <div id="loginError" style="color:var(--danger); font-size:13px; text-align:center; margin-top:12px; display:none;">Login failed, incorrect username/password</div>
        </form>
        <p style="margin-top:24px; font-size:14px; color:var(--ink-soft);">
          Don't have an account? 
          <a href="#" data-action="goto-register" style="color:var(--primary); text-decoration:none; font-weight:600;">Register School</a>
        </p>
      </div>
    `;
  }

  function registerHTML(){
    return `
      <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh; padding:20px;">
        <div style="text-align:center; margin-bottom:24px;">
          <h1 style="font-size:28px; margin:0 0 8px 0; color:var(--primary);">Register School</h1>
          <p style="color:var(--ink-soft); margin:0;">Create a master profile for your school.</p>
        </div>
        <form id="registerForm" style="width:100%; max-width:320px; background:var(--surface); padding:24px; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.05); border:1px solid var(--border);">
          <div class="field">
            <label>School Name</label>
            <input type="text" id="regSchoolName" required placeholder="e.g. Kpando High">
          </div>
          <div class="field">
            <label>Email Address</label>
            <input type="email" id="regEmail" required placeholder="e.g. admin@school.edu">
          </div>
          <div class="field">
            <label>Master Password</label>
            <input type="password" id="regPassword" required placeholder="Set a password for staff">
          </div>
          <div class="field">
            <label>Confirm Password</label>
            <input type="password" id="regPasswordConfirm" required placeholder="Re-enter password">
          </div>
          <button type="submit" class="btn primary" style="width:100%; margin-top:8px;">Register School</button>
        </form>
        <p style="margin-top:24px; font-size:14px; color:var(--ink-soft);">
          Already registered? 
          <a href="#" data-action="goto-login" style="color:var(--primary); text-decoration:none; font-weight:600;">Log In</a>
        </p>
      </div>
    `;
  }

  async function syncToCloud() {
    if (!appSettings.schoolName || !appSettings.isAuthenticated) {
      alert("You must be logged in to sync.");
      return;
    }
    const btn = document.getElementById('syncToCloudBtn');
    if (btn) btn.textContent = 'Syncing...';
    try {
      await db.collection('schools').doc(appSettings.schoolName).set({
        schoolName: appSettings.schoolName,
        email: appSettings.email,
        items: items,
        lastSync: firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
      
      alert("Successfully synced to Firebase!");
    } catch(e) {
      console.error(e);
      alert("Sync failed: " + e.message);
    }
    if (btn) btn.textContent = 'Sync to Cloud';
  }

  async function syncFromCloud() {
    if (!appSettings.schoolName || !appSettings.isAuthenticated) {
      alert("You must be logged in to sync.");
      return;
    }
    const btn = document.getElementById('syncFromCloudBtn');
    if (btn) btn.textContent = 'Downloading...';
    try {
      const doc = await db.collection('schools').doc(appSettings.schoolName).get();
      if (doc.exists) {
          const data = doc.data();
          if (data.items) {
              items = data.items;
              saveItems();
              render();
              alert("Successfully downloaded from Firebase!");
          } else {
              alert("No inventory data found in the cloud for this school.");
          }
      } else {
          alert("No cloud profile found for this school. Try syncing to cloud first.");
      }
    } catch(e) {
      console.error(e);
      alert("Download failed: " + e.message);
    }
    if (btn) btn.textContent = 'Download from Cloud';
  }
  
function dashboardHTML(){
  const totalItems = items.length;
  const totalQty = items.reduce((s,i)=>s+Number(i.quantity||0),0);
  const totalValue = items.reduce((s,i)=>s+Number(i.quantity||0)*Number(i.cost||0),0);
  
  const lowStock = items.filter(i=> (Number(i.minStock||0)>0 && Number(i.quantity||0)<=Number(i.minStock)) || i.isLowStock);
  
  // Calculate aggregate quantities for Available, Broken, Lost
  const availableValue = items.reduce((s,i) => {
    const avail = Number(i.quantity||0) - Number(i.brokenQty||0) - Number(i.lostQty||0);
    return s + (avail * Number(i.cost||0));
  }, 0);
  
  const availableItems = items.filter(i => (Number(i.quantity||0) - Number(i.brokenQty||0) - Number(i.lostQty||0)) > 0);
  const brokenItems = items.filter(i => Number(i.brokenQty||0) > 0);
  const lostItems = items.filter(i => Number(i.lostQty||0) > 0);
  const needsRepairItems = items.filter(i => i.status === 'Needs Repair'); // Legacy support

  const catCounts = Object.keys(CATEGORIES).map(k=>({key:k, count: items.filter(i=>i.category===k).length}));
  const total = catCounts.reduce((s,c)=>s+c.count,0);
  let acc = 0;
  let gradient = 'var(--surface-2) 0% 100%';
  if (total > 0){
    gradient = catCounts.map(c=>{
      const start = acc/total*100;
      acc += c.count;
      const end = acc/total*100;
      return `${CATEGORIES[c.key].color} ${start}% ${end}%`;
    }).join(', ');
  }

  const attentionItems = [
    ...brokenItems.map(i=>({item:i, reason:`${i.brokenQty} Broken`})),
    ...lostItems.map(i=>({item:i, reason:`${i.lostQty} Lost`})),
    ...needsRepairItems.map(i=>({item:i, reason:'Needs Repair'}))
  ];

  return `
    <div class="page-header">
      <div>
        <h1 class="page-title">${appSettings.schoolName ? escapeHtml(appSettings.schoolName) : 'Dashboard'}</h1>
        <p class="page-subtitle">${appSettings.email ? escapeHtml(appSettings.email) : 'Overview of equipment'}</p>
        <div style="margin-top: 12px; font-weight: 600; font-size: 16px; display:flex; align-items:center; gap:8px;">
          <span style="width:8px; height:8px; border-radius:50%; background:var(--accent);"></span>
          Total Assets: ${totalItems}
        </div>
      </div>
    </div>

    <div class="stat-grid">
      <div class="stat-card clickable-card" data-action="dashboard-drilldown" data-type="all" style="background: linear-gradient(135deg, rgba(33,150,243,0.1), rgba(33,150,243,0.02)); border-color: rgba(33,150,243,0.3);">
        <div class="stat-label" style="color: #1976D2;">Line items</div>
        <div class="stat-value" style="color: #1976D2;">${totalItems}</div>
        <div class="stat-meta" style="color: #1976D2; opacity:0.8;">${totalQty.toLocaleString()} units total</div>
      </div>
      <div class="stat-card clickable-card" data-action="dashboard-drilldown" data-type="all" style="background: linear-gradient(135deg, rgba(156,39,176,0.1), rgba(156,39,176,0.02)); border-color: rgba(156,39,176,0.3);">
        <div class="stat-label" style="margin-bottom:2px; color: #7B1FA2;">Estimated value</div>
        <div style="font-size:12px; color:#7B1FA2; opacity:0.7; margin-bottom:6px;">Total Value: ${fmtMoney(totalValue)}</div>
        <div class="stat-value" style="color: #7B1FA2;">${fmtMoney(availableValue)}</div>
        <div class="stat-meta" style="color: #7B1FA2; opacity:0.8;">Available Value</div>
      </div>
      <div class="stat-card clickable-card" data-action="dashboard-drilldown" data-type="lowstock" style="background: linear-gradient(135deg, rgba(255,152,0,0.15), rgba(255,152,0,0.02)); border-color: rgba(255,152,0,0.4);">
        <div class="stat-label" style="color: #E65100;">Low stock alerts</div>
        <div class="stat-value" style="color: #E65100;">${lowStock.length}</div>
        <div class="stat-meta" style="color: #E65100; opacity:0.8;">At/below minimum or manually flagged</div>
      </div>
      <div class="stat-card clickable-card" data-action="dashboard-drilldown" data-type="available" style="background: linear-gradient(135deg, rgba(76,175,80,0.15), rgba(76,175,80,0.02)); border-color: rgba(76,175,80,0.4);">
        <div class="stat-label" style="color: #2E7D32;">Available</div>
        <div class="stat-value" style="color: #2E7D32;">${availableItems.length}</div>
        <div class="stat-meta" style="color: #2E7D32; opacity:0.8;">Ready for use</div>
      </div>
      <div class="stat-card clickable-card" data-action="dashboard-drilldown" data-type="broken" style="background: linear-gradient(135deg, rgba(244,67,54,0.15), rgba(244,67,54,0.02)); border-color: rgba(244,67,54,0.4);">
        <div class="stat-label" style="color: #C62828;">Broken</div>
        <div class="stat-value" style="color: #C62828;">${brokenItems.length}</div>
        <div class="stat-meta" style="color: #C62828; opacity:0.8;">Requires action</div>
      </div>
      <div class="stat-card clickable-card" data-action="dashboard-drilldown" data-type="lost" style="background: linear-gradient(135deg, rgba(158,158,158,0.15), rgba(158,158,158,0.02)); border-color: rgba(158,158,158,0.4);">
        <div class="stat-label" style="color: #424242;">Lost</div>
        <div class="stat-value" style="color: #424242;">${lostItems.length}</div>
        <div class="stat-meta" style="color: #424242; opacity:0.8;">Missing inventory</div>
      </div>
    </div>

    <div class="dash-grid">
      <div class="panel">
        <h3>Items by category</h3>
        <div class="donut-row">
          <div class="donut" style="background:conic-gradient(${gradient})">
            <div class="donut-center">
              <div class="num">${totalItems}</div>
              <div class="lbl">Items</div>
            </div>
          </div>
          <div class="legend">
            ${Object.entries(CATEGORIES).map(([k,c])=>`
              <div class="legend-item clickable-row" data-action="dashboard-drilldown" data-type="category" data-category="${k}" style="padding:4px; border-radius:4px; margin-bottom:4px;">
                <span class="category-dot" style="background:${c.color}"></span>
                <span class="legend-name">${c.label}</span>
                <span class="legend-count">${items.filter(i=>i.category===k).length}</span>
              </div>`).join('')}
          </div>
        </div>
      </div>
      <div class="panel">
        <h3>Needs attention</h3>
                ${attentionItems.length === 0
          ? '<p class="empty-note">Nothing needs attention right now &mdash; all items are within their normal levels.</p>'
          : `<div class="attention-list">${attentionItems.slice(0,8).map(({item,reason})=>`
              <div class="attention-item">
                <span class="category-dot" style="background:${CATEGORIES[item.category].color}"></span>
                <div style="flex:1;">
                  <div class="att-name">${escapeHtml(item.name)}</div>
                  <div class="att-reason">${escapeHtml(reason)}</div>
                  <div style="display:flex; gap:4px;">
                    <a href="https://www.alibaba.com/trade/search?SearchText=${encodeURIComponent(item.name)}" target="_blank" class="btn" style="background:#FF6A00; color:white; font-size:11px; padding:4px 8px; text-decoration:none;">Alibaba</a>
                    <button class="icon-btn" data-action="view-item" data-id="${item.id}">View</button>
                    <button class="icon-btn" data-action="edit-item" data-id="${item.id}">Edit</button>
                  </div>
                </div>
              </div>`).join('')}</div>`}
      </div>
    </div>
  `;
}

/* ---------- Inventory ---------- */
function inventoryHTML(){
  let list = items.filter(i=>{
    if (filters.category!=='all' && i.category!==filters.category) return false;
    
    // New status filter logic using numerical fields
    if (filters.status !== 'all') {
      if (filters.status === 'Broken' && (i.brokenQty || 0) === 0) return false;
      if (filters.status === 'Lost' && (i.lostQty || 0) === 0) return false;
      if (filters.status === 'Available' && (i.quantity - (i.brokenQty||0) - (i.lostQty||0)) <= 0) return false;
      if (filters.status === 'Maintenance' && i.status !== 'Maintenance') return false; // Legacy fallback if needed
    }

    if (filters.search){
      const s = filters.search.toLowerCase();
      const haystack = [i.name,i.assetTag,i.serialNumber,i.location,i.supplier].join(' ').toLowerCase();
      if (!haystack.includes(s)) return false;
    }
    return true;
  });

  list = sortItems(list);

  return `
    <div class="page-header">
      <div>
        <h1 class="page-title">Inventory</h1>
        <p class="page-subtitle">${list.length} of ${items.length} item${items.length===1?'':'s'} shown</p>
      </div>
    </div>

    <div class="filter-bar">
      <button class="pill ${filters.category==='all'?'active':''}" data-action="filter-category" data-cat="all">All</button>
      ${Object.entries(CATEGORIES).map(([k,c])=>`<button class="pill ${filters.category===k?'active':''}" data-action="filter-category" data-cat="${k}">${c.short}</button>`).join('')}
      <select class="select-sm" id="statusFilter">
        <option value="all">All statuses</option>
        <option value="Available" ${filters.status==='Available'?'selected':''}>Available</option>
        <option value="Broken" ${filters.status==='Broken'?'selected':''}>Broken</option>
        <option value="Lost" ${filters.status==='Lost'?'selected':''}>Lost</option>
      </select>
    </div>

    <div class="table-wrap" style="background:transparent; border:none; box-shadow:none; overflow:visible;">
      <div style="display:flex; flex-direction:column; gap:8px;">
        ${list.length===0
          ? `<div class="empty-note" style="padding:20px; text-align:center; background:var(--surface); border-radius:var(--radius); border:1px solid var(--border);">No items match these filters.</div>`
          : list.map(i=>{
              const avail = i.quantity - (i.brokenQty||0) - (i.lostQty||0);
              let statusBadges = '';
              if (avail > 0) statusBadges += badge(avail + ' Avail', STATUS_COLORS) + ' ';
              if ((i.brokenQty||0) > 0) statusBadges += badge(i.brokenQty + ' Broken', STATUS_COLORS) + ' ';
              if ((i.lostQty||0) > 0) statusBadges += badge(i.lostQty + ' Lost', STATUS_COLORS) + ' ';
              if (!statusBadges) statusBadges = badge('0 Avail', STATUS_COLORS);

              return `
            <div class="compact-list-item" data-action="view-item" data-id="${i.id}" style="border-left-color:${CATEGORIES[i.category].color}">
              <div class="row-top">
                <span class="item-name">${escapeHtml(i.name)}</span>
                <span class="item-qty">${i.quantity} ${escapeHtml(i.unit||'')} Total</span>
                <span class="item-status">${statusBadges}</span>
              </div>
              <div class="row-bottom">
                <span class="item-cat">${CATEGORIES[i.category].label}</span>
                <span class="item-tag">${escapeHtml(i.assetTag||'--')}</span>
                <span class="item-cost">${fmtMoney(i.cost)}/unit</span>
              </div>
            </div>
          `}).join('')}
      </div>
    </div>
  `;
}

function sortItems(list){
  const {col, dir} = sortState;
  const mult = dir==='asc' ? 1 : -1;
  return [...list].sort((a,b)=>{
    if (col==='quantity') return (Number(a.quantity)-Number(b.quantity))*mult;
    if (col==='cost') return (Number(a.cost)-Number(b.cost))*mult;
    let av, bv;
    if (col==='category'){ av=CATEGORIES[a.category].label; bv=CATEGORIES[b.category].label; }
    else if (col==='assetTag'){ 
        return a.assetTag.localeCompare(b.assetTag, undefined, {numeric: true}) * mult;
    }
    else { av=a[col]; bv=b[col]; }
    av = String(av??'').toLowerCase();
    bv = String(bv??'').toLowerCase();
    if (av<bv) return -1*mult;
    if (av>bv) return 1*mult;
    return 0;
  });
}

/* =====================================================
   MODAL / FORM
===================================================== */
function openModal(id){
  const item = id ? items.find(i=>i.id===id) : null;
  document.getElementById('modal').innerHTML = formHTML(item);
  document.getElementById('modalOverlay').hidden = false;

  

  
  document.getElementById('modalForm').addEventListener('submit', e=>{
    e.preventDefault();
    saveItemFromForm(id);
  });

  setTimeout(()=>{ const el = document.getElementById('nameInput'); if (el) el.focus(); }, 50);
}

function closeModal(){
  document.getElementById('modalOverlay').hidden = true;
  document.getElementById('modal').innerHTML = '';
}

function formHTML(item){
  const isEdit = !!item;
  return `
    <div class="modal-header">
      <h3>${isEdit ? 'Edit item' : 'Add new item'}</h3>
      <button class="close-btn" type="button" data-action="close-modal" aria-label="Close">&times;</button>
    </div>
    <form id="modalForm">
      <div class="modal-body">
        <div class="form-grid">
          <div class="field full">
            <label for="nameInput">Item name *</label>
            <input id="nameInput" required value="${escapeHtml(item?.name||'')}" placeholder="e.g. Digital Oscilloscope" />
          </div>
          <div class="field">
            <label for="categorySelect">Category *</label>
            <select id="categorySelect">
              ${Object.entries(CATEGORIES).map(([k,c])=>`<option value="${k}" ${item?.category===k?'selected':''}>${c.label}</option>`).join('')}
            </select>
          </div>
          <div class="field">
            <label for="subcategoryInput">Subcategory</label>
            <input id="subcategoryInput" list="subcategoryOptions" value="${escapeHtml(item?.subcategory||'')}" placeholder="e.g. Measuring Instruments" />
            
          </div>
          <div class="field">
            <label for="quantityInput">Total Quantity *</label>
            <input id="quantityInput" type="number" min="0" step="1" required value="${item?.quantity ?? 1}" />
          </div>
          <div class="field">
            <label for="unitInput">Unit</label>
            <input id="unitInput" list="unitOptions" value="${escapeHtml(item?.unit||'Each')}" />
            <datalist id="unitOptions">${UNITS.map(u=>`<option value="${u}"></option>`).join('')}</datalist>
          </div>
          <div class="field" style="background:#fff3f3; padding:8px; border-radius:4px; border:1px solid #ffcdd2;">
            <label for="brokenQtyInput" style="color:#C62828;">Broken Quantity</label>
            <input id="brokenQtyInput" type="number" min="0" step="1" value="${item?.brokenQty ?? 0}" />
          </div>
          <div class="field" style="background:#fff3f3; padding:8px; border-radius:4px; border:1px solid #ffcdd2;">
            <label for="lostQtyInput" style="color:#C62828;">Lost Quantity</label>
            <input id="lostQtyInput" type="number" min="0" step="1" value="${item?.lostQty ?? 0}" />
          </div>
          <div class="field full">
            <label for="locationInput">Location</label>
            <input id="locationInput" value="${escapeHtml(item?.location||'')}" placeholder="e.g. Science Lab 2, Shelf B" />
          </div>
          <div class="field">
            <label for="assetTagInput">Asset tag</label>
            <input id="assetTagInput" value="${escapeHtml(item?.assetTag||'')}" placeholder="e.g. SCI-0012" />
          </div>
          <div class="field">
            <label for="serialInput">Serial number</label>
            <input id="serialInput" value="${escapeHtml(item?.serialNumber||'')}" />
          </div>
          <div class="field">
            <label for="minStockInput">Minimum stock level</label>
            <input id="minStockInput" type="number" min="0" step="1" value="${item?.minStock ?? 0}" />
          </div>
          <div class="field">
            <label for="costInput">Unit cost (GH&#8373;)</label>
            <input id="costInput" type="number" min="0" step="0.01" value="${item?.cost ?? 0}" />
          </div>
          <div class="field">
            <label for="purchaseDateInput">Purchase date</label>
            <input id="purchaseDateInput" type="date" value="${item?.purchaseDate||''}" />
          </div>
          <div class="field">
            <label for="warrantyInput">Warranty expiry</label>
            <input id="warrantyInput" type="date" value="${item?.warrantyExpiry||''}" />
          </div>
          <div class="field full">
            <label for="supplierInput">Supplier / Vendor</label>
            <input id="supplierInput" value="${escapeHtml(item?.supplier||'')}" />
          </div>
          <div class="field full">
            <label for="notesInput">Notes</label>
            <textarea id="notesInput">${escapeHtml(item?.notes||'')}</textarea>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn" data-action="close-modal">Cancel</button>
        <button type="submit" class="btn btn-primary">${isEdit ? 'Save changes' : 'Add item'}</button>
      </div>
    </form>
  `;
}

async function saveItemFromForm(id){
  const now = new Date().toISOString();
  const quantity = Number(document.getElementById('quantityInput').value) || 0;
  const brokenQty = Number(document.getElementById('brokenQtyInput').value) || 0;
  const lostQty = Number(document.getElementById('lostQtyInput').value) || 0;

  if (brokenQty + lostQty > quantity) {
    alert("Error: The sum of Broken and Lost quantities (" + (brokenQty + lostQty) + ") cannot exceed the Total Quantity (" + quantity + ").");
    return;
  }

  const data = {
    name: document.getElementById('nameInput').value.trim(),
    category: document.getElementById('categorySelect').value,
    subcategory: document.getElementById('subcategoryInput').value.trim(),
    quantity: quantity,
    brokenQty: brokenQty,
    lostQty: lostQty,
    unit: document.getElementById('unitInput').value.trim() || 'Each',
    location: document.getElementById('locationInput').value.trim(),
    assetTag: document.getElementById('assetTagInput').value.trim(),
    serialNumber: document.getElementById('serialInput').value.trim(),
    minStock: Number(document.getElementById('minStockInput').value) || 0,
    cost: Number(document.getElementById('costInput').value) || 0,
    purchaseDate: document.getElementById('purchaseDateInput').value,
    warrantyExpiry: document.getElementById('warrantyInput').value,
    supplier: document.getElementById('supplierInput').value.trim(),
    notes: document.getElementById('notesInput').value.trim(),
    lastUpdated: now
  };

  if (!data.name){
    alert('Please enter an item name.');
    return;
  }

  if (id){
    const idx = items.findIndex(i=>i.id===id);
    // Keep the existing isLowStock flag when editing
    data.isLowStock = items[idx].isLowStock;
    items[idx] = Object.assign({}, items[idx], data);
  } else {
    items.push(Object.assign({id:uid(), dateAdded:now, isLowStock:false}, data));
  }

  await saveItems();
  closeModal();
  render();
}

function deleteItem(id){
  const item = items.find(i=>i.id===id);
  if (!item) return;
  if (!confirm(`Delete "${item.name}" from inventory? This can't be undone.`)) return;
  items = items.filter(i=>i.id!==id);
  saveItems();
  render();
}

/* =====================================================
   EXPORT / IMPORT
===================================================== */
function csvEscape(val){
  const s = String(val ?? '');
  if (/[",\n]/.test(s)) return '"' + s.replace(/"/g,'""') + '"';
  return s;
}
function downloadFile(content, filename, mime){
  const blob = new Blob([content], {type:mime});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
function exportCSV(){
  const headers = ['Name','Category','Subcategory','Quantity','Unit','Status','Location','Asset Tag','Serial Number','Min Stock','Low Stock Flag','Unit Cost (GH&#8373;)','Total Value (GH&#8373;)','Supplier','Purchase Date','Warranty Expiry','Notes','Date Added','Last Updated'];
  const rows = items.map(i=>[
    i.name, CATEGORIES[i.category].label, i.subcategory, i.quantity, i.unit, i.status,
    i.location, i.assetTag, i.serialNumber, i.minStock, i.isLowStock ? 'Yes' : 'No', i.cost,
    (Number(i.quantity||0)*Number(i.cost||0)).toFixed(2),
    i.supplier, i.purchaseDate, i.warrantyExpiry, i.notes, i.dateAdded, i.lastUpdated
  ]);
  const csv = [headers, ...rows].map(row=>row.map(csvEscape).join(',')).join('\n');
  downloadFile(csv, 'equipment-inventory.csv', 'text/csv');
}
function exportJSON(){
  downloadFile(JSON.stringify(items, null, 2), 'equipment-inventory-backup.json', 'application/json');
}
function importJSON(file){
  const reader = new FileReader();
  reader.onload = async (e)=>{
    try{
      const data = JSON.parse(e.target.result);
      if (!Array.isArray(data)) throw new Error('Invalid format');
      if (!confirm(`Import ${data.length} item(s)? This will replace your current inventory.`)) return;
      items = data.map(d=>Object.assign(mkItem({}), d));
      await saveItems();
      render();
    } catch(err){
      alert("Couldn't import this file. Make sure it's a backup exported from Equipment Ledger.");
    }
  };
  reader.readAsText(file);
}

/* =====================================================
   EVENTS
===================================================== */

function viewDrilldown(type, categoryKey) {
  const modal = document.getElementById('dashboardDrilldownModal');
  const title = document.getElementById('drilldownTitle');
  const body = document.getElementById('drilldownBody');
  
  // Also close other modals to avoid stacking issues (added earlier)
  document.getElementById('itemDetailsModal').hidden = true;
  document.getElementById('modalOverlay').hidden = true;

  let filtered = [];
  if (type === 'all') {
    title.textContent = 'All Items';
    filtered = items;
  } else if (type === 'lowstock') {
    title.textContent = 'Low Stock Items';
    filtered = items.filter(i => (i.quantity <= i.minStock) || i.isLowStock);
  } else if (type === 'available') {
    title.textContent = 'Available Items';
    filtered = items.filter(i => (Number(i.quantity||0) - Number(i.brokenQty||0) - Number(i.lostQty||0)) > 0);
  } else if (type === 'broken') {
    title.textContent = 'Broken Items';
    filtered = items.filter(i => Number(i.brokenQty||0) > 0);
  } else if (type === 'lost') {
    title.textContent = 'Lost Items';
    filtered = items.filter(i => Number(i.lostQty||0) > 0);
  } else if (type === 'category') {
    title.textContent = CATEGORIES[categoryKey].label;
    filtered = items.filter(i => i.category === categoryKey);
  }

  if (filtered.length === 0) {
    body.innerHTML = '<div style="color:var(--ink-soft); font-size:14px; text-align:center; padding:20px;">No items found.</div>';
  } else {
    body.innerHTML = filtered.map(i => `
      <div class="clickable-row" data-action="view-item" data-id="${i.id}" style="padding:10px; border-bottom:1px solid rgba(0,0,0,0.05); display:flex; justify-content:space-between; align-items:center;">
        <div>
          <div style="font-weight:600; font-size:14px;">${escapeHtml(i.name)}</div>
          <div style="font-size:12px; color:var(--ink-soft);">${escapeHtml(i.assetTag||'--')} &middot; ${i.quantity} total units</div>
        </div>
        <span style="font-size:18px; color:var(--ink-soft);">&rsaquo;</span>
      </div>
    `).join('');
  }
  modal.hidden = false;
}

function viewItem(id) {
  const modal = document.getElementById('itemDetailsModal');
  const item = items.find(i => i.id === id);
  if (!item) return;
  
  // Close drilldown modal if open
  document.getElementById('dashboardDrilldownModal').hidden = true;

  document.getElementById('viewItemName').textContent = item.name;
  
  const avail = item.quantity - (item.brokenQty||0) - (item.lostQty||0);
  let statusBadges = '';
  if (avail > 0) statusBadges += badge(avail + ' Avail', STATUS_COLORS) + ' ';
  if ((item.brokenQty||0) > 0) statusBadges += badge(item.brokenQty + ' Broken', STATUS_COLORS) + ' ';
  if ((item.lostQty||0) > 0) statusBadges += badge(item.lostQty + ' Lost', STATUS_COLORS) + ' ';
  if (!statusBadges) statusBadges = badge('0 Avail', STATUS_COLORS);

  const body = document.getElementById('itemDetailsBody');
  body.innerHTML = `
    <div><strong>Asset Tag:</strong> ${item.assetTag ? escapeHtml(item.assetTag) : '&mdash;'}</div>
    <div><strong>Category:</strong> ${CATEGORIES[item.category].label} </div>
    <div><strong>Total Quantity:</strong> ${item.quantity} ${escapeHtml(item.unit||'')}</div>
    <div><strong>Current Status:</strong> ${statusBadges}</div>
    <div><strong>Unit Cost:</strong> ${fmtMoney(item.cost)}</div>
    <div><strong>Total Value:</strong> ${fmtMoney(item.cost * item.quantity)}</div>
    <div><strong>Supplier:</strong> ${item.supplier ? escapeHtml(item.supplier) : '&mdash;'}</div>
    <div><strong>Purchase Date:</strong> ${item.purchaseDate ? item.purchaseDate : '&mdash;'}</div>
    <div><strong>Warranty Expiry:</strong> ${item.warrantyExpiry ? item.warrantyExpiry : '&mdash;'}</div>
    <div><strong>Notes:</strong><br>${item.notes ? escapeHtml(item.notes) : '&mdash;'}</div>
  `;
  
  document.getElementById('viewItemEditBtn').onclick = () => {
    modal.hidden = true;
    openModal(id);
  };
  document.getElementById('viewItemDeleteBtn').onclick = () => {
    modal.hidden = true;
    deleteItem(id);
  };
  
  modal.hidden = false;
}

function setupGlobalListeners(){
  document.body.addEventListener('submit', async e => {
      if (e.target.id === 'loginForm') {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value.trim();
        const pwd = document.getElementById('loginPassword').value;
        const errDiv = document.getElementById('loginError');
        if (errDiv) errDiv.style.display = 'none';
        
        try {
            await firebase.auth().signInWithEmailAndPassword(email, pwd);
            // onAuthStateChanged will handle the rest (fetching schoolName and redirecting)
        } catch (error) {
            const errDiv = document.getElementById('loginError');
            if (errDiv) {
                errDiv.style.display = 'block';
            } else {
                alert("Login failed, incorrect username/password");
            }
        }
      } else if (e.target.id === 'registerForm') {
        e.preventDefault();
        const schoolName = document.getElementById('regSchoolName').value.trim();
        const email = document.getElementById('regEmail').value.trim();
        const pwd = document.getElementById('regPassword').value;
        const confirmPwd = document.getElementById('regPasswordConfirm').value;
        
        if (pwd !== confirmPwd) {
            alert("Passwords do not match!");
            return;
        }
        
        try {
            // Register them in Firebase
            await firebase.auth().createUserWithEmailAndPassword(email, pwd);
            
            // Registration successful!
            appSettings.schoolName = schoolName;
            appSettings.email = email;
            delete appSettings.coordinator; // Clear deprecated field
            appSettings.isAuthenticated = true;
            localStorage.setItem('stem_settings', JSON.stringify(appSettings));
            
            // Write initial profile to Firestore
            await db.collection('schools').doc(schoolName).set({
                schoolName: schoolName,
                email: email,
                items: items,
                lastSync: firebase.firestore.FieldValue.serverTimestamp()
            }, { merge: true });

            currentView = 'dashboard';
            render();
        } catch (error) {
            // If they are already registered, try logging them in instead
            if (error.code === 'auth/email-already-in-use') {
                 try {
                     await firebase.auth().signInWithEmailAndPassword(email, pwd);
                     
                     appSettings.schoolName = schoolName;
                     appSettings.email = email;
                     delete appSettings.coordinator;
                     appSettings.isAuthenticated = true;
                     localStorage.setItem('stem_settings', JSON.stringify(appSettings));
                     
                     // Force an initial profile write to Firestore since they bypassed registration
                     await db.collection('schools').doc(schoolName).set({
                         schoolName: schoolName,
                         email: email,
                         items: items,
                         lastSync: firebase.firestore.FieldValue.serverTimestamp()
                     }, { merge: true });

                     currentView = 'dashboard';
                     render();
                 } catch (signInError) {
                     alert("Email already in use, but login failed: " + signInError.message);
                 }
            } else {
                alert("Registration Failed: " + error.message);
            }
        }
      } else if (e.target.id === 'chatForm') {
        // Handled directly by handleChatSubmit inline function
      } else {
        e.preventDefault();
        saveItemFromForm();
      }
    });

  document.body.addEventListener('click', e=>{
      const el = e.target.closest('[data-action]');
      if(!el) return;
      const action = el.dataset.action;
      const id = el.dataset.id;
      
      if(action === 'delete'){
          if(confirm('Delete this item?')){
              db.collection('schools').doc(appSettings.schoolName).update({
                  [`items.${id}`]: firebase.firestore.FieldValue.delete(),
                  lastSync: firebase.firestore.FieldValue.serverTimestamp()
              }).catch(console.error);
          }
      } else if(action === 'edit'){
          showModal(id);
      }
      
    switch(action){
      case 'set-view':
        currentView = el.dataset.view;
        document.getElementById('sidebar').classList.remove('open');
        render();
        break;
      case 'filter-category':
        filters.category = el.dataset.cat;
        currentView = 'inventory';
        document.getElementById('sidebar').classList.remove('open');
        render();
        break;
      case 'switch-chat-tab':
        chatTab = el.dataset.tab;
        render();
        break;
      
        case 'save-settings':
          const token = document.getElementById('githubTokenInput').value.trim();
          const gist = document.getElementById('gistIdInput').value.trim();
          appSettings.githubToken = token;
          appSettings.gistId = gist;
          localStorage.setItem('stem_settings', JSON.stringify(appSettings));
          alert("Settings saved!");
          break;
        case 'sync-to-cloud':
          syncToCloud();
          break;
        case 'sync-from-cloud':
          syncFromCloud();
          break;
        case 'goto-register':
          currentView = 'register';
          render();
          break;
        case 'goto-login':
          currentView = 'login';
          render();
          break;
        case 'logout':
          try {
            if (typeof firebase !== 'undefined') {
              firebase.auth().signOut();
            }
            appSettings.isAuthenticated = false;
            if (chatUnsubscribe) { chatUnsubscribe(); chatUnsubscribe = null; }
            localStorage.setItem('stem_settings', JSON.stringify(appSettings));
            currentView = 'login';
            const sidebar = document.getElementById('sidebar');
            if (sidebar) sidebar.classList.remove('open');
            render();
          } catch(e) {
            console.error("Logout error: ", e);
            alert("Error logging out: " + e.message);
          }
          break;


        case 'add-item':
        openModal(null);
        break;
              case 'dashboard-drilldown':
          viewDrilldown(el.dataset.type, el.dataset.category);
          break;
        case 'view-item':
        viewItem(el.dataset.id);
        break;
      case 'edit-item':
        openModal(el.dataset.id);
        break;
      case 'delete-item':
        deleteItem(el.dataset.id);
        break;
      case 'close-modal':
        closeModal();
        break;
      case 'sort':{
        const col = el.dataset.col;
        if (sortState.col===col) sortState.dir = sortState.dir==='asc' ? 'desc' : 'asc';
        else { sortState.col=col; sortState.dir='asc'; }
        renderView();
        break;
      }
      case 'export-csv':
        exportCSV();
        break;
      case 'export-json':
        exportJSON();
        break;
      case 'toggle-sidebar':
        document.getElementById('sidebar').classList.toggle('open');
        break;
    }
  });

      document.getElementById('modalOverlay').addEventListener('click', e=>{
      if (e.target.id === 'modalOverlay') closeModal();
    });
    document.getElementById('dashboardDrilldownModal').addEventListener('click', e=>{
      if (e.target.id === 'dashboardDrilldownModal') e.target.hidden = true;
    });
    document.getElementById('itemDetailsModal').addEventListener('click', e=>{
      if (e.target.id === 'itemDetailsModal') e.target.hidden = true;
    });
    document.addEventListener('keydown', e=>{
      if (e.key === 'Escape') {
        if (!document.getElementById('itemDetailsModal').hidden) {
          document.getElementById('itemDetailsModal').hidden = true;
        } else if (!document.getElementById('dashboardDrilldownModal').hidden) {
          document.getElementById('dashboardDrilldownModal').hidden = true;
        } else if (!document.getElementById('modalOverlay').hidden) {
          closeModal();
        }
      }
    });

  document.getElementById('searchInput').addEventListener('input', e=>{
    filters.search = e.target.value;
    currentView = 'inventory';
    render();
  });

  document.getElementById('importFile').addEventListener('change', e=>{
    const file = e.target.files[0];
    if (file) importJSON(file);
    e.target.value = '';
  });

  // Handle Select Filters and Checkbox Toggles
  document.getElementById('view').addEventListener('change', e=>{
    if (e.target.dataset.action === 'toggle-lowstock') {
      const itemId = e.target.dataset.id;
      const itemToToggle = items.find(i => i.id === itemId);
      if(itemToToggle) {
        itemToToggle.isLowStock = e.target.checked;
        saveItems();
        // Silently update the data so the user doesn't lose focus by re-rendering the whole view. 
        // It will perfectly reflect on the dashboard when they switch tabs.
      }
      return; 
    }
    
    if (e.target.id === 'categoryFilter'){ filters.category = e.target.value; renderView(); }
    if (e.target.id === 'statusFilter'){ filters.status = e.target.value; renderView(); }
    if (e.target.id === 'chatRecipientSelect'){ currentChatRecipient = e.target.value; renderView(); }
  });
}

  /* =====================================================
     CHAT LOGIC
  ===================================================== */
  let chatMessages = [];
  let registeredSchools = [];
  let currentChatRecipient = 'master'; // email or 'master'
  let unreadCounts = {}; 
  let chatUnsubscribe = null;
  
  function getUnreadTotal() {
      return Object.values(unreadCounts).reduce((a, b) => a + b, 0);
  }

  function fetchRegisteredSchools() {
      if (typeof firebase === 'undefined' || !db) return;
      db.collection('schools').get().then(snap => {
          const arr = [];
          snap.forEach(doc => {
              if (doc.data().email !== appSettings.email) {
                  arr.push({ name: doc.id, email: doc.data().email });
              }
          });
          arr.sort((a,b) => a.name.localeCompare(b.name));
          registeredSchools = arr;
          if (currentView === 'chat') renderView();
      }).catch(err => console.error(err));
  }

  function getChatRecipientName() {
      if (currentChatRecipient === 'master') return 'Science Coordinator';
      const school = registeredSchools.find(s => s.email === currentChatRecipient);
      return school ? escapeHtml(school.name) : 'Select School';
  }

  function getChatRecipientInitials(name) {
      if (!name || name === 'Select School') return '?';
      if (name === 'Science Coordinator') return 'SC';
      const parts = name.split(' ');
      return parts.map(p => p[0]).join('').substring(0,2).toUpperCase();
  }

  window.openChatDropdown = function() {
      document.getElementById('chatDropdownOverlay').classList.add('show');
  };

  window.closeChatDropdown = function() {
      document.getElementById('chatDropdownOverlay').classList.remove('show');
  };

  window.selectChatRecipient = function(email) {
      currentChatRecipient = email;
      closeChatDropdown();
      setTimeout(() => {
          renderView();
      }, 200); // Wait for animation to finish
  };

  function chatHTML() {
      const recipientName = getChatRecipientName();
      const initials = getChatRecipientInitials(recipientName);

      let optionsListHTML = `
        <div class="chat-school-item ${currentChatRecipient === 'master' ? 'active' : ''}" onclick="selectChatRecipient('master'); closeChatDropdown();">
            <div class="chat-avatar" style="background: var(--accent);">SC</div>
            <div class="chat-school-name">Science Coordinator</div>
            ${unreadCounts['master'] ? `<div class="chat-school-badge">${unreadCounts['master']}</div>` : ''}
        </div>
      `;

      registeredSchools.forEach(s => {
          let badgeHTML = unreadCounts[s.email] ? `<div class="chat-school-badge">${unreadCounts[s.email]}</div>` : '';
          let sInitials = getChatRecipientInitials(s.name);
          optionsListHTML += `
            <div class="chat-school-item ${currentChatRecipient === s.email ? 'active' : ''}" onclick="selectChatRecipient('${escapeHtml(s.email)}'); closeChatDropdown();">
                <div class="chat-avatar" style="background: var(--ink);">${escapeHtml(sInitials)}</div>
                <div class="chat-school-name">${escapeHtml(s.name)}</div>
                ${badgeHTML}
            </div>
          `;
      });

      return `
        <div class="chat-container">
          <div class="chat-sleek-selector" onclick="toggleChatDropdown()">
              <div style="font-size: 13px; color: var(--ink-soft); margin-bottom: 4px;">Messaging with:</div>
              <div class="chat-sleek-selector-inner">
                  <div class="chat-avatar" style="width: 32px; height: 32px; font-size: 13px;">${initials}</div>
                  <div class="chat-sleek-name">${recipientName}</div>
                  <svg id="chatDropdownChevron" style="width:24px;height:24px;fill:var(--ink-soft); transition: transform 0.3s;" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg>
              </div>
          </div>
          
          <div id="chatInlineDropdown" class="chat-inline-dropdown">
              ${optionsListHTML}
          </div>

          <div class="chat-messages" id="chatMessagesArea" style="flex:1;"></div>
          <form class="chat-input-area" id="chatForm" onsubmit="handleChatSubmit(event)">
            <input type="text" class="chat-input" id="chatInput" placeholder="Type a message..." required autocomplete="off">
            <button type="submit" class="chat-send-btn">
              <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
            </button>
          </form>
        </div>
      `;
  }
  
  window.toggleChatDropdown = function() {
      const dropdown = document.getElementById('chatInlineDropdown');
      const chevron = document.getElementById('chatDropdownChevron');
      if (dropdown.classList.contains('show')) {
          dropdown.classList.remove('show');
          chevron.style.transform = 'rotate(0deg)';
      } else {
          dropdown.classList.add('show');
          chevron.style.transform = 'rotate(180deg)';
      }
  };
  
  window.closeChatDropdown = function() {
      const dropdown = document.getElementById('chatInlineDropdown');
      const chevron = document.getElementById('chatDropdownChevron');
      if (dropdown && dropdown.classList.contains('show')) {
          dropdown.classList.remove('show');
          if (chevron) chevron.style.transform = 'rotate(0deg)';
      }
  };
  
  window.selectChatRecipient = function(email) {
      currentChatRecipient = email;
      if (currentView === 'chat') {
          renderView();
      }
  };
  function renderChatMessages() {
      const area = document.getElementById('chatMessagesArea');
      if (!area) return;
      
      if (unreadCounts[currentChatRecipient]) {
          unreadCounts[currentChatRecipient] = 0;
          updateChatBadge();
      }
      
      const filtered = chatMessages.filter(m => {
          if (currentChatRecipient === 'master') {
              return m.type === 'global' || m.type === 'master' || m.recipientEmail === 'master' || (m.senderEmail === 'master' && m.recipientEmail === appSettings.email);
          } else {
              return (m.senderEmail === appSettings.email && m.recipientEmail === currentChatRecipient) || 
                     (m.senderEmail === currentChatRecipient && m.recipientEmail === appSettings.email);
          }
      });
      
      if (filtered.length === 0) {
          area.innerHTML = `<div style="text-align:center; color:var(--ink-soft); font-size:12px; margin-top:20px;">No messages.</div>`;
          return;
      }
      
      area.innerHTML = filtered.map(m => {
          const isMine = m.senderEmail === appSettings.email;
          let ts = m.timestamp;
          if (ts && typeof ts.toDate === 'function') ts = ts.toDate();
          const time = ts ? new Date(ts).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'Just now';
          const senderName = isMine ? 'You' : (m.senderEmail === 'master' ? 'Science Coordinator' : escapeHtml(m.senderSchool || 'User'));
          return `
            <div class="chat-bubble ${isMine ? 'mine' : 'theirs'}">
              <div class="chat-sender">${senderName}</div>
              <div>${escapeHtml(m.text)}</div>
              <div class="chat-time">${time}</div>
            </div>
          `;
      }).join('');
      scrollToChatBottom();
  }
  
  function scrollToChatBottom() {
      setTimeout(() => {
          const area = document.getElementById('chatMessagesArea');
          if (area) area.scrollTop = area.scrollHeight;
      }, 50);
  }
  
  function updateChatBadge() {
      const badge = document.getElementById('chatBadge');
      if (!badge) return;
      const total = getUnreadTotal();
      badge.innerText = total;
      badge.style.display = total > 0 ? 'inline-block' : 'none';
  }
  
  
  window.showToast = function(senderName, messageText) {
      if (!document.getElementById('toastNotification')) {
          const toast = document.createElement('div');
          toast.id = 'toastNotification';
          toast.className = 'toast-notification';
          toast.innerHTML = `
              <div class="chat-avatar" style="width: 30px; height: 30px; font-size: 14px; background: var(--primary);" id="toastAvatar"></div>
              <div style="flex:1; overflow:hidden;">
                  <div style="font-weight:600; font-size:14px; margin-bottom:2px;" id="toastTitle"></div>
                  <div style="font-size:12px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; color:var(--ink-soft);" id="toastText"></div>
              </div>
          `;
          toast.onclick = () => {
              toast.classList.remove('show');
              if (document.querySelector('[data-target="chat"]')) {
                  document.querySelector('[data-target="chat"]').click();
              }
          };
          document.body.appendChild(toast);
      }
      
      const toast = document.getElementById('toastNotification');
      const title = document.getElementById('toastTitle');
      const text = document.getElementById('toastText');
      const avatar = document.getElementById('toastAvatar');
      
      let initials = senderName ? senderName.split(' ').map(n=>n[0]).join('').substring(0,2).toUpperCase() : '??';
      avatar.innerText = initials;
      title.innerText = `New message from ${senderName}`;
      text.innerText = messageText;
      
      toast.classList.add('show');
      
      try {
          const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
          const oscillator = audioCtx.createOscillator();
          const gainNode = audioCtx.createGain();
          oscillator.connect(gainNode);
          gainNode.connect(audioCtx.destination);
          oscillator.type = 'sine';
          oscillator.frequency.value = 880;
          gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
          oscillator.start();
          gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.3);
          oscillator.stop(audioCtx.currentTime + 0.3);
      } catch(e) {}
      
      try {
          if (typeof Capacitor !== 'undefined' && Capacitor.Plugins && Capacitor.Plugins.LocalNotifications) {
              Capacitor.Plugins.LocalNotifications.schedule({
                  notifications: [
                      {
                          title: title.innerText,
                          body: messageText,
                          id: new Date().getTime() % 2147483647,
                          schedule: { at: new Date(Date.now() + 100) },
                          sound: null,
                          actionTypeId: "",
                          extra: null
                      }
                  ]
              });
          }
      } catch (e) {
          console.error("Local notification error", e);
      }

      setTimeout(() => { toast.classList.remove('show'); }, 4000);
  };

  function startChatListener() {
      if (typeof firebase === 'undefined' || !db) return;
      if (chatUnsubscribe) chatUnsubscribe();
      fetchRegisteredSchools();
      chatUnsubscribe = db.collection('chat_messages')
          .orderBy('timestamp', 'asc')
          .onSnapshot(snapshot => {
                const newMessages = [];
                snapshot.forEach(doc => newMessages.push({ id: doc.id, ...doc.data() }));
                
                // Add unknown senders to registeredSchools dynamically
                let addedNew = false;
                newMessages.forEach(m => {
                    let otherEmail = m.senderEmail === appSettings.email ? m.recipientEmail : m.senderEmail;
                    if (otherEmail && otherEmail !== 'master' && otherEmail !== appSettings.email) {
                        if (!registeredSchools.find(s => s.email === otherEmail)) {
                            registeredSchools.push({ name: m.senderSchool || otherEmail, email: otherEmail });
                            addedNew = true;
                        }
                    }
                });
                if (addedNew) {
                    registeredSchools.sort((a,b) => a.name.localeCompare(b.name));
                    if (currentView === 'chat') renderView();
                }

                if (chatMessages.length > 0 && newMessages.length > chatMessages.length) {
                  for (let i = chatMessages.length; i < newMessages.length; i++) {
                      const m = newMessages[i];
                      if (m.senderEmail === appSettings.email) continue;
                      const relevantSender = (m.type === 'master' || m.recipientEmail === 'master') ? 'master' : m.senderEmail;
                      if (currentView !== 'chat' || currentChatRecipient !== relevantSender) {
                          unreadCounts[relevantSender] = (unreadCounts[relevantSender] || 0) + 1;
                          updateChatBadge();
                          if (currentView === 'chat') renderView();
                          showToast(m.senderSchool || m.senderEmail || 'Someone', m.text);
                      }
                  }
              }
              chatMessages = newMessages;
              if (currentView === 'chat') renderChatMessages();
          });
  }

/* =====================================================
   INIT
===================================================== */
async function init(){
  try {
    if (typeof firebase !== 'undefined') {
      firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
          appSettings.isAuthenticated = true;
          appSettings.email = user.email;
          
          if (!appSettings.schoolName) {
              try {
                  const snap = await db.collection('schools').where('email', '==', user.email).limit(1).get();
                  if (!snap.empty) {
                      appSettings.schoolName = snap.docs[0].id;
                  }
              } catch(e) {
                  console.error("Failed to fetch school profile:", e);
              }
          }
          
          localStorage.setItem('stem_settings', JSON.stringify(appSettings));
          if (currentView === 'login' || currentView === 'register') {
            currentView = 'dashboard';
            startChatListener();
            render();
          } else {
            // Re-render in case schoolName just loaded
            startChatListener();
            render();
          }
        } else {
          appSettings.isAuthenticated = false;
          if (chatUnsubscribe) { chatUnsubscribe(); chatUnsubscribe = null; }
          localStorage.setItem('stem_settings', JSON.stringify(appSettings));
          if (currentView !== 'login' && currentView !== 'register') {
            currentView = 'login';
            render();
          }
        }
      });
    }

  await loadItems();
  setupGlobalListeners();
  if (appSettings.isAuthenticated) {
      startChatListener();
  }

  let pct = 0;
  const pctEl = document.getElementById('splashPercent');
  const iv = setInterval(() => {
    pct += 2;
    if (pctEl) pctEl.style.width = Math.min(pct, 100) + '%';
    if (pct >= 100) {
      clearInterval(iv);
      const splash = document.getElementById('splashScreen');
      if (splash) {
        splash.style.opacity = '0';
        setTimeout(() => splash.remove(), 500);
      }
    }
  }, 100);

  } catch(e) { alert("Error: " + e.message); console.error(e); }
}

window.handleChatSubmit = async function(e) {
    e.preventDefault();
    if (!appSettings.isAuthenticated || !db) return;
    const input = document.getElementById('chatInput');
    if(!input) return;
    const text = input.value.trim();
    if (!text) return;
    
    input.value = '';
    
    let payload = {
        text: text,
        senderEmail: appSettings.email || 'unknown@school',
        senderSchool: appSettings.schoolName || 'Unknown',
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    };

    if (currentChatRecipient === 'master') {
        payload.type = 'master'; 
        payload.recipient = 'master';
        payload.recipientEmail = 'master';
    } else {
        payload.type = 'direct';
        payload.recipientEmail = currentChatRecipient || 'unknown@school';
    }

    Object.keys(payload).forEach(key => {
        if (payload[key] === undefined) {
            payload[key] = null;
        }
    });

    // Optimistic rendering
    let optimisticMsg = { ...payload, timestamp: new Date(), _temp: true };
    chatMessages.push(optimisticMsg);
    if (currentView === 'chat') renderChatMessages();

    // Send without awaiting, let snapshot handle the rest
    db.collection('chat_messages').add(payload).catch(err => {
        console.error("Failed to send message:", err);
        // Remove optimistic message if it failed
        chatMessages = chatMessages.filter(m => m !== optimisticMsg);
        if (currentView === 'chat') renderChatMessages();
        alert("Failed to send message: " + err.message);
    });
};

init();




    try {
        console.log("Calling chatHTML...");
        const result = chatHTML();
        console.log("chatHTML succeeded. Length:", result.length);
    } catch(e) {
        console.log("ERROR in chatHTML:", e);
    }
