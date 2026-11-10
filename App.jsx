import React, { useState, useEffect } from 'react';

// --- MOCK DATABASE & INITIAL STATE ---
const INITIAL_TENANTS = [
  {
    id: 'tenant-1',
    name: 'Lezzet-i Ala Lokantası',
    slug: 'lezzetiala',
    customDomain: 'lezzetialamenu.com',
    status: 'active',
    logo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=150',
    themeColor: '#e11d48',
    ministryCode: 'TR-GM-35-00124',
    updatedAt: '2026-11-10 14:30',
    categories: [
      { id: 'c1', name: 'Çorbalar' },
      { id: 'c2', name: 'Ana Yemekler' },
      { id: 'c3', name: 'Tatlılar' }
    ],
    products: [
      { id: 'p1', categoryId: 'c1', name: 'Sarı Mercimek Çorbası', price: 95, description: 'Geleneksel kıvamında, kruton ekmek ile', available: true, image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=300' },
      { id: 'p2', categoryId: 'c2', name: 'Fırında Palamut', price: 280, description: 'Mevsim yeşillikleri ve limon dilimleriyle', available: true, image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=300' },
      { id: 'p3', categoryId: 'c2', name: 'Karnıyarık', price: 240, description: 'Özel kıymalı harç ile fırınlanmış patlıcan, arpa şehriyeli pilav eşliğinde', available: true, image: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?w=300' },
      { id: 'p4', categoryId: 'c3', name: 'Muzlu Kedidili Pastası', price: 150, description: 'Ev yapımı kedidili bisküvisi, taze muz ve hafif krema ile', available: true, image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=300' }
    ]
  },
  {
    id: 'tenant-2',
    name: 'Göl Kenarı Cafe & Bistro',
    slug: 'golkenaricafe',
    customDomain: 'golkenarimenu.com',
    status: 'active',
    logo: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=150',
    themeColor: '#0284c7',
    ministryCode: 'TR-GM-35-00892',
    updatedAt: '2026-11-09 11:15',
    categories: [
      { id: 'gc1', name: 'Kahvaltılar' },
      { id: 'gc2', name: 'Kahveler' }
    ],
    products: [
      { id: 'gp1', categoryId: 'gc1', name: 'Serpme Köy Kahvaltısı (Kişi Başı)', price: 350, description: 'Doğal yöresel peynirler, zeytinler, ev yapımı reçeller', available: true, image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=300' }
    ]
  }
];

export default function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [tenants, setTenants] = useState(INITIAL_TENANTS);
  const [selectedTenantId, setSelectedTenantId] = useState('tenant-1');
  
  const activeTenant = tenants.find(t => t.id === selectedTenantId) || tenants[0];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
      <header className="bg-slate-950 border-b border-slate-800 px-6 py-4 flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentView('landing')}>
          <div className="bg-indigo-600 p-2 rounded-xl text-white font-black text-xl">QR</div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white">MenuSaaS Pro</h1>
            <p className="text-xs text-slate-400">Çoklu İşletme QR Menü Bulut Platformu</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button onClick={() => setCurrentView('superAdmin')} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium rounded-lg transition">Süper Yönetici Paneli</button>
          <button onClick={() => setCurrentView('tenantAdmin')} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg shadow-lg shadow-indigo-600/30 transition">İşletme Paneli</button>
          <button onClick={() => setCurrentView('customerMenu')} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium rounded-lg shadow-lg shadow-emerald-600/30 transition">Müşteri Menüsü</button>
        </div>
      </header>
      <main className="p-6 max-w-7xl mx-auto">
        {currentView === 'landing' && (
          <div className="py-12 text-center space-y-6">
            <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-xs font-semibold rounded-full uppercase tracking-wider">Türkiye Standartlarına Uygun SaaS Altyapısı</span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white max-w-3xl mx-auto">Restoran ve Kafeniz İçin Profesyonel QR Menü Platformu</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">Kendi markanız, özel alan adınız, Bakanlık karekod uyumluluğunuz ve anlık stok/fiyat yönetiminizle müşterilerinize kusursuz bir dijital deneyim sunun.</p>
            <div className="flex justify-center gap-4 pt-4">
              <button onClick={() => setCurrentView('tenantAdmin')} className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl shadow-lg transition">Hemen İşletmeni Yönet</button>
              <button onClick={() => setCurrentView('customerMenu')} className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl transition">Örnek Menüyü İncele</button>
            </div>
          </div>
        )}
        {currentView === 'superAdmin' && <SuperAdminView tenants={tenants} setTenants={setTenants} setSelectedTenantId={setSelectedTenantId} />}
        {currentView === 'tenantAdmin' && <TenantAdminView tenant={activeTenant} setTenants={setTenants} tenants={tenants} />}
        {currentView === 'customerMenu' && <CustomerMenuView tenant={activeTenant} />}
      </main>
    </div>
  );
}

function SuperAdminView({ tenants, setTenants, setSelectedTenantId }) {
  const [newTenantName, setNewTenantName] = useState('');
  const [newTenantSlug, setNewTenantSlug] = useState('');

  const handleAddTenant = (e) => {
    e.preventDefault();
    if (!newTenantName) return;
    const newT = {
      id: 'tenant-' + Date.now(),
      name: newTenantName,
      slug: newTenantSlug || newTenantName.toLowerCase().replace(/\s+/g, ''),
      customDomain: '',
      status: 'active',
      logo: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=150',
      themeColor: '#4f46e5',
      ministryCode: 'TR-GM-35-' + Math.floor(10000 + Math.random() * 90000),
      updatedAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
      categories: [{ id: 'c1', name: 'Genel' }],
      products: []
    };
    setTenants([...tenants, newT]);
    setNewTenantName('');
    setNewTenantSlug('');
  };

  const toggleStatus = (id) => {
    setTenants(tenants.map(t => t.id === id ? { ...t, status: t.status === 'active' ? 'passive' : 'active' } : t));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Süper Yönetici Paneli</h2>
          <p className="text-sm text-slate-400">Tüm tenant yapılarını ve platform istatistiklerini yönetin.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800"><p className="text-xs text-slate-400 uppercase font-semibold">Toplam İşletme</p><p className="text-3xl font-extrabold text-white mt-1">{tenants.length}</p></div>
        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800"><p className="text-xs text-slate-400 uppercase font-semibold">Aktif İşletmeler</p><p className="text-3xl font-extrabold text-emerald-400 mt-1">{tenants.filter(t => t.status === 'active').length}</p></div>
        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800"><p className="text-xs text-slate-400 uppercase font-semibold">Toplam Ürün</p><p className="text-3xl font-extrabold text-indigo-400 mt-1">{tenants.reduce((acc, t) => acc + t.products.length, 0)}</p></div>
        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800"><p className="text-xs text-slate-400 uppercase font-semibold">Özel Domain</p><p className="text-3xl font-extrabold text-sky-400 mt-1">{tenants.filter(t => t.customDomain).length}</p></div>
      </div>
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800">
        <h3 className="text-lg font-bold mb-4 text-white">Yeni İşletme Kaydı Aç</h3>
        <form onSubmit={handleAddTenant} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input type="text" placeholder="İşletme Adı" value={newTenantName} onChange={(e) => setNewTenantName(e.target.value)} className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500" required />
          <input type="text" placeholder="URL Slug" value={newTenantSlug} onChange={(e) => setNewTenantSlug(e.target.value)} className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500" />
          <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl px-6 py-2.5 text-sm transition">İşletme Oluştur</button>
        </form>
      </div>
      <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-800 font-bold text-white">Kayıtlı İşletmeler</div>
        <div className="divide-y divide-slate-800">
          {tenants.map(tenant => (
            <div key={tenant.id} className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <img src={tenant.logo} alt="" className="w-12 h-12 rounded-xl object-cover border border-slate-700" />
                <div>
                  <h4 className="font-bold text-white text-base">{tenant.name}</h4>
                  <p className="text-xs text-slate-400">Slug: {tenant.slug} | Bakanlık No: {tenant.ministryCode}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${tenant.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>{tenant.status === 'active' ? 'Aktif' : 'Pasif'}</span>
                <button onClick={() => setSelectedTenantId(tenant.id)} className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-lg text-slate-200 transition">Paneline Git</button>
                <button onClick={() => toggleStatus(tenant.id)} className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${tenant.status === 'active' ? 'bg-rose-600/20 text-rose-400' : 'bg-emerald-600/20 text-emerald-400'}`}>{tenant.status === 'active' ? 'Pasifleştir' : 'Aktifleştir'}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TenantAdminView({ tenant, setTenants, tenants }) {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDesc, setProductDesc] = useState('');
  const [selectedCat, setSelectedCat] = useState(tenant.categories[0]?.id || '');

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!productName || !productPrice) return;
    const newProd = {
      id: 'p-' + Date.now(),
      categoryId: selectedCat,
      name: productName,
      price: parseFloat(productPrice),
      description: productDesc,
      available: true,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300'
    };
    const updatedTenants = tenants.map(t => t.id === tenant.id ? { ...t, products: [...t.products, newProd], updatedAt: new Date().toISOString().slice(0, 16).replace('T', ' ') } : t);
    setTenants(updatedTenants);
    setProductName('');
    setProductPrice('');
    setProductDesc('');
  };

  const toggleProductStatus = (productId) => {
    const updatedTenants = tenants.map(t => t.id === tenant.id ? { ...t, products: t.products.map(p => p.id === productId ? { ...p, available: !p.available } : p) } : t);
    setTenants(updatedTenants);
  };

  const deleteProduct = (productId) => {
    const updatedTenants = tenants.map(t => t.id === tenant.id ? { ...t, products: t.products.filter(p => p.id !== productId) } : t);
    setTenants(updatedTenants);
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center space-x-4">
          <img src={tenant.logo} alt="" className="w-16 h-16 rounded-2xl object-cover border border-slate-700 shadow-lg" />
          <div>
            <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">İşletme Yönetim Paneli</span>
            <h2 className="text-2xl font-extrabold text-white">{tenant.name}</h2>
            <p className="text-xs text-slate-400">Bakanlık Karekod: {tenant.ministryCode} | Son Güncelleme: {tenant.updatedAt}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 bg-slate-900 p-2 rounded-xl border border-slate-800">
          <span className="text-xs text-slate-400 px-2">Tema Rengi:</span>
          <input type="color" value={tenant.themeColor} onChange={(e) => { const color = e.target.value; setTenants(tenants.map(t => t.id === tenant.id ? { ...t, themeColor: color } : t)); }} className="w-8 h-8 rounded border-0 cursor-pointer bg-transparent" />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 h-fit space-y-4">
          <h3 className="text-lg font-bold text-white">Yeni Ürün Ekle</h3>
          <form onSubmit={handleAddProduct} className="space-y-4">
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Kategori</label>
              <select value={selectedCat} onChange={(e) => setSelectedCat(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500">
                {tenant.categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Ürün Adı</label>
              <input type="text" placeholder="Örn: Fırında Palamut" value={productName} onChange={(e) => setProductName(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500" required />
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Fiyat (TL)</label>
              <input type="number" placeholder="280" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500" required />
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Açıklama</label>
              <textarea placeholder="İçindekiler..." value={productDesc} onChange={(e) => setProductDesc(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500 h-24 resize-none"></textarea>
            </div>
            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl py-3 text-sm transition shadow-lg shadow-indigo-600/20">Ürünü Menüye Ekle</button>
          </form>
        </div>
        <div className="lg:col-span-2 bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center">
            <h3 className="font-bold text-white">Menü Ürünleri ({tenant.products.length})</h3>
            <span className="text-xs text-slate-400">Stok & Fiyat Kontrolü</span>
          </div>
          <div className="divide-y divide-slate-800">
            {tenant.products.map(prod => {
              const cat = tenant.categories.find(c => c.id === prod.categoryId);
              return (
                <div key={prod.id} className="p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center space-x-3">
                    <img src={prod.image} alt="" className="w-14 h-14 rounded-xl object-cover border border-slate-700" />
                    <div>
                      <h4 className="font-bold text-white text-sm">{prod.name}</h4>
                      <p className="text-xs text-indigo-400 font-medium">{cat?.name || 'Genel'}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="font-bold text-emerald-400 text-base">₺{prod.price}</span>
                    <button onClick={() => toggleProductStatus(prod.id)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${prod.available ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>{prod.available ? 'Satışta' : 'Kapalı'}</button>
                    <button onClick={() => deleteProduct(prod.id)} className="text-slate-500 hover:text-rose-400 p-1.5 transition">🗑️</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function CustomerMenuView({ tenant }) {
  const [activeCategory, setActiveCategory] = useState(tenant.categories[0]?.id || '');
  const filteredProducts = tenant.products.filter(p => p.categoryId === activeCategory && p.available);
  return (
    <div className="max-w-md mx-auto bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
      <div className="relative h-44 bg-slate-900">
        <img src={tenant.logo} alt="" className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
        <div className="absolute bottom-4 left-6 right-6 flex items-center space-x-4">
          <img src={tenant.logo} alt="" className="w-16 h-16 rounded-2xl object-cover border-2 border-white/20 shadow-xl" />
          <div>
            <h2 className="text-xl font-extrabold text-white tracking-tight">{tenant.name}</h2>
            <p className="text-xs text-slate-300">Dijital QR Menü</p>
          </div>
        </div>
      </div>
      <div className="bg-slate-900/80 px-6 py-2 border-y border-slate-800 flex justify-between items-center text-[11px] text-slate-400">
        <span>T.C. Bakanlık Karekod</span>
        <span className="font-mono text-indigo-400">{tenant.ministryCode}</span>
      </div>
      <div className="flex overflow-x-auto px-6 py-4 space-x-2 border-b border-slate-900 bg-slate-950">
        {tenant.categories.map(cat => (
          <button key={cat.id} onClick={() => setActiveCategory(cat.id)} style={{ backgroundColor: activeCategory === cat.id ? tenant.themeColor : undefined }} className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${activeCategory === cat.id ? 'text-white shadow-lg' : 'bg-slate-900 text-slate-400'}`}>{cat.name}</button>
        ))}
      </div>
      <div className="p-6 space-y-4 min-h-[350px]">
        {filteredProducts.map(prod => (
          <div key={prod.id} className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800/80 flex items-center space-x-4">
            <img src={prod.image} alt="" className="w-20 h-20 rounded-xl object-cover flex-shrink-0 border border-slate-800" />
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-white text-sm truncate">{prod.name}</h4>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">{prod.description}</p>
              <div className="mt-2 font-extrabold text-emerald-400 text-sm">₺{prod.price}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="py-4 text-center bg-slate-900/50 border-t border-slate-900 text-[10px] text-slate-500">Altyapı: MenuSaaS Pro • Cloudflare CDN Powered</div>
    </div>
  );
}
