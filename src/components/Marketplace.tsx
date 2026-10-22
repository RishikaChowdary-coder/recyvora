import React, { useState } from 'react';
import { MarketplaceProduct } from '../types';
import { marketplaceProducts as initialProducts } from '../data/mockData';
import { useToast } from './Toast';

interface MarketplaceProps {
  onNavigate: (path: string) => void;
}

export const Marketplace: React.FC<MarketplaceProps> = ({ onNavigate }) => {
  const { showToast } = useToast();
  const [products, setProducts] = useState<MarketplaceProduct[]>(initialProducts);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<MarketplaceProduct | null>(null);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);

  // New listing form state
  const [newTitle, setNewTitle] = useState<string>('');
  const [newCategory, setNewCategory] = useState<MarketplaceProduct['category']>('Electronics');
  const [newPrice, setNewPrice] = useState<number>(15000);
  const [newGrade, setNewGrade] = useState<string>('Grade A Refurbished');
  const [newLocation, setNewLocation] = useState<string>('Bengaluru Tech Park Hub');
  const [newSpecs, setNewSpecs] = useState<string>('Diagnostic Tested • 90-Day Enterprise Warranty');
  const [newDescription, setNewDescription] = useState<string>('');

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'all' || p.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCat;
  });

  const handleCreateListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    const newProd: MarketplaceProduct = {
      id: `prod-${Date.now()}`,
      title: newTitle,
      subtitle: newSpecs,
      category: newCategory,
      price: newPrice,
      conditionGrade: newGrade,
      location: newLocation,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6ZnF--qVWNr1nZ1jjfkSt-isB2CCy5SvbJWOKDXBYznJHBMXcOERMIDNtRibZOFvsIKQkZFIzuH9oTaWh6yiMArC0B3V8F04f1PkstwAEfpO2dAFBn0z0R4prbHHWNdCW_pUJhENUwh6vQTRwyDogztU3NeFoXlWQKg8z4QPIBUsuFuelysvX5Fa8sP5K3uZiYZpRhOS5nVqeR5OwqHlyslNfwnpbskD3L4M2LvcOTllEb2s_ENocQQ',
      description: newDescription || 'Pre-inspected circular enterprise asset ready for deployment.',
      testedSpecs: newSpecs.split('•').map((s) => s.trim()),
      sellerName: 'Recyvora Verified Corporate Member',
      status: 'active',
      postedDate: 'Today'
    };

    setProducts([newProd, ...products]);
    setShowCreateModal(false);
    setNewTitle('');
    setNewDescription('');
    showToast('Asset published successfully to the Recyvora Recommerce Marketplace!', 'success', 'Listing Active');
  };

  return (
    <div className="flex flex-col w-full px-gutter-lg pt-space-lg pb-space-xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-lg">
        <div>
          <div className="inline-flex items-center gap-space-xs px-space-sm py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold tracking-wide mb-1">
            <span className="material-symbols-outlined text-[15px] text-primary">storefront</span>
            <span>B2B & Enterprise Circular Recommerce</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface font-semibold tracking-tight">
            Reusable Marketplace
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
            Pre-inspected IT infrastructure, premium furnishings, and factory spares refurbished for authenticated second-life circular deployment.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center gap-space-xs px-space-lg py-2.5 bg-primary-container text-on-primary font-label-md text-label-md font-semibold rounded-lg shadow-sm hover:bg-primary transition-all self-start md:self-auto"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          <span>List Reusable Asset</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-outline-variant/30 flex flex-col md:flex-row gap-space-md items-center justify-between mb-space-lg">
        <div className="relative w-full md:w-96">
          <span className="material-symbols-outlined absolute left-space-sm top-1/2 -translate-y-1/2 text-[18px] text-outline">
            search
          </span>
          <input
            type="text"
            placeholder="Search equipment, models, locations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface-container-low text-on-surface placeholder:text-outline pl-9 pr-space-md py-2 rounded-lg text-body-sm font-body-sm focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div className="flex flex-wrap items-center gap-space-xs w-full md:w-auto">
          {[
            { id: 'all', label: 'All Equipment' },
            { id: 'electronics', label: 'Laptops & IT' },
            { id: 'office furnishing', label: 'Office Furnishing' },
            { id: 'industrial storage', label: 'Storage & Racking' },
            { id: 'networking hardware', label: 'Networking' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter-lg">
        {filteredProducts.map((prod) => (
          <div
            key={prod.id}
            className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between border border-outline-variant/30 group"
          >
            <div>
              <div className="relative h-48 w-full bg-surface-container overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  src={prod.imageUrl}
                  alt={prod.title}
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface font-label-sm text-label-sm font-semibold">
                  {prod.conditionGrade}
                </span>
                <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-surface-container-lowest/90 text-primary text-[10px] font-mono font-bold">
                  Inspected
                </span>
              </div>
              <div className="p-space-md">
                <div className="flex items-center gap-1 text-on-surface-variant text-[11px] font-mono mb-1">
                  <span className="material-symbols-outlined text-[14px]">pin_drop</span>
                  <span>{prod.location}</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface line-clamp-1">
                  {prod.title}
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 line-clamp-2">
                  {prod.subtitle}
                </p>
              </div>
            </div>

            <div className="p-space-md pt-0 flex items-center justify-between border-t border-outline-variant/20 mt-2">
              <div>
                <span className="font-label-sm text-label-sm text-on-surface-variant">Price</span>
                <p className="font-metric-num text-metric-num font-bold text-primary font-mono">
                  ₹{prod.price.toLocaleString('en-IN')}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProduct(prod)}
                className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-secondary-container text-on-surface transition-colors text-xs font-semibold flex items-center gap-1"
                title="View details"
              >
                <span className="material-symbols-outlined text-[16px]">visibility</span>
                <span>Inspect</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="bg-surface-container-lowest p-12 text-center rounded-2xl border border-outline-variant/30 mt-6">
          <span className="material-symbols-outlined text-[48px] text-outline mb-2">inventory_2</span>
          <h3 className="font-bold text-lg text-on-surface">No products match your filter</h3>
          <p className="text-sm text-outline mt-1 mb-4">Try clearing your search query or selecting another category.</p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
            className="px-4 py-2 bg-primary text-on-primary rounded-lg text-sm font-semibold"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Inspect / Buy Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-background/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-surface-container-lowest rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-outline-variant/40 max-h-[90vh] flex flex-col">
            <div className="p-4 bg-surface-container-low border-b border-outline-variant/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-secondary-container text-on-secondary-fixed text-xs font-bold">
                  {selectedProduct.conditionGrade}
                </span>
                <span className="text-body-sm text-outline font-mono">{selectedProduct.location}</span>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="w-8 h-8 rounded-lg hover:bg-surface-container flex items-center justify-center text-on-surface-variant"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              <div className="h-64 rounded-xl overflow-hidden bg-surface-container">
                <img
                  src={selectedProduct.imageUrl}
                  alt={selectedProduct.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-on-surface">{selectedProduct.title}</h3>
                <p className="text-primary font-bold text-2xl font-mono mt-1">₹{selectedProduct.price.toLocaleString('en-IN')}</p>
                <p className="text-body-md text-on-surface-variant mt-2 leading-relaxed">{selectedProduct.description}</p>
              </div>

              <div className="bg-surface-container-low p-4 rounded-xl">
                <h4 className="font-bold text-sm text-on-surface mb-2">Verified Diagnostic Inspection Checklist:</h4>
                <ul className="space-y-1.5 text-xs text-on-surface-variant font-mono">
                  {selectedProduct.testedSpecs.map((spec, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-[16px]">verified</span>
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between text-xs text-outline font-mono">
                <span>Seller: {selectedProduct.sellerName}</span>
                <span>Protected by Recyvora Escrow Settlement Guarantee</span>
              </div>
            </div>

            <div className="p-4 bg-surface-container-low border-t border-outline-variant/30 flex gap-3">
              <button
                onClick={() => setSelectedProduct(null)}
                className="px-4 py-2 bg-surface-container text-on-surface rounded-lg font-semibold text-sm hover:bg-surface-container-high"
              >
                Close
              </button>
              <button
                onClick={() => {
                  showToast(
                    `Purchase Request Logged for ${selectedProduct.title}! Our logistics team will coordinate dispatch to your dock.`,
                    'success',
                    'Escrow Reserved'
                  );
                  setSelectedProduct(null);
                }}
                className="flex-1 py-2 bg-primary text-on-primary rounded-lg font-semibold text-sm hover:bg-tertiary-container shadow-sm flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                <span>Reserve with Escrow Settlement</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Listing Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-background/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-surface-container-lowest rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-outline-variant/40">
            <div className="p-4 bg-surface-container-low border-b border-outline-variant/30 flex items-center justify-between">
              <h3 className="font-bold text-lg text-on-surface">List Reusable Asset for Recommerce</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="w-8 h-8 rounded-lg hover:bg-surface-container flex items-center justify-center text-outline"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateListing} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-outline uppercase mb-1">Asset Title / Model</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dell UltraSharp 27-inch 4K Monitor"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-surface-container-low px-3 py-2 rounded border border-outline-variant/60 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-outline uppercase mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full bg-surface-container-low px-3 py-2 rounded border border-outline-variant/60 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="Electronics">Electronics &amp; IT</option>
                    <option value="Office Furnishing">Office Furnishing</option>
                    <option value="Industrial Storage">Storage &amp; Racking</option>
                    <option value="Networking Hardware">Networking</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-outline uppercase mb-1">Asking Price (₹)</label>
                  <input
                    type="number"
                    min="100"
                    value={newPrice}
                    onChange={(e) => setNewPrice(parseFloat(e.target.value) || 0)}
                    className="w-full bg-surface-container-low px-3 py-2 rounded border border-outline-variant/60 text-sm font-mono font-bold focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-outline uppercase mb-1">Condition Grade</label>
                  <select
                    value={newGrade}
                    onChange={(e) => setNewGrade(e.target.value)}
                    className="w-full bg-surface-container-low px-3 py-2 rounded border border-outline-variant/60 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option>Grade A Refurbished</option>
                    <option>Certified Refurb</option>
                    <option>Diagnostic Verified</option>
                    <option>Excellent Struct</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-outline uppercase mb-1">Location / Hub</label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full bg-surface-container-low px-3 py-2 rounded border border-outline-variant/60 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-outline uppercase mb-1">Specs &amp; Tested Features</label>
                <input
                  type="text"
                  placeholder="IPS Panel • Color Calibrated • 65W USB-C PD"
                  value={newSpecs}
                  onChange={(e) => setNewSpecs(e.target.value)}
                  className="w-full bg-surface-container-low px-3 py-2 rounded border border-outline-variant/60 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-outline uppercase mb-1">Detailed Description</label>
                <textarea
                  rows={2}
                  placeholder="Decommissioned asset in excellent condition, factory cleaned..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full bg-surface-container-low p-2 rounded border border-outline-variant/60 text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 bg-surface-container rounded-lg text-sm font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-on-primary rounded-lg text-sm font-semibold shadow hover:bg-tertiary-container"
                >
                  Publish Asset Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
