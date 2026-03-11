import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Search, 
  Tag, 
  Package, 
  Clock, 
  Mail, 
  ChevronRight, 
  X,
  Camera,
  Filter,
  ArrowLeft,
  User,
  MapPin,
  Star,
  CheckCircle,
  History,
  ShieldCheck,
  MailCheck,
  ArrowLeftRight,
  MessageSquare,
  Activity,
  Heart,
  Library,
  ExternalLink,
  Zap,
  TrendingUp,
  Eye,
  Flame,
  BookOpen,
  Box,
  CheckSquare,
  DollarSign,
  Scale,
  Info,
  Shield,
  Bell,
  Sparkles,
  ShieldCheck as ShieldCheckIcon
} from 'lucide-react';
import { Listing, Category, CATEGORIES, CONDITIONS, Notification } from './types';

// --- Components ---

const NotificationCenter = ({ 
  notifications, 
  onNotificationClick, 
  onViewTrade 
}: { 
  notifications: Notification[], 
  onNotificationClick: (id: number) => void,
  onViewTrade: (listingId: number) => void
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full bg-zinc-100 text-zinc-600 hover:bg-zinc-200 transition-colors"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-1 right-1 w-3 h-3 bg-red-600 rounded-sm border-2 border-white shadow-sm"
            title="New Notifications"
          />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-20" onClick={() => setIsOpen(false)} />
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-zinc-100 z-30 overflow-hidden"
            >
              <div className="p-4 border-b border-zinc-100 flex justify-between items-center bg-zinc-50/50">
                <h3 className="font-bold text-zinc-900">Notifications</h3>
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{unreadCount} New</span>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center">
                    <Bell className="w-8 h-8 text-zinc-200 mx-auto mb-2" />
                    <p className="text-sm text-zinc-400 font-medium">No notifications yet</p>
                  </div>
                ) : (
                  notifications.map(n => (
                    <div 
                      key={n.id} 
                      className={`p-4 border-b border-zinc-50 hover:bg-zinc-50 transition-colors cursor-pointer relative ${!n.is_read ? 'bg-red-50/30' : ''}`}
                      onClick={() => onNotificationClick(n.id)}
                    >
                      {!n.is_read && <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-600" />}
                      <p className="text-sm text-zinc-800 font-medium mb-2">{n.message}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-zinc-400 font-bold uppercase">{n.timestamp}</span>
                        {n.type === 'trade' && (
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              onViewTrade(n.listing_id);
                              setIsOpen(false);
                            }}
                            className="text-[10px] font-black uppercase tracking-widest text-red-600 hover:text-red-700"
                          >
                            View Trade
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const Header = ({ 
  onPostClick, 
  onSearch, 
  onViewChange, 
  currentView,
  notifications,
  onNotificationClick,
  onViewTrade
}: { 
  onPostClick: () => void, 
  onSearch: (q: string) => void,
  onViewChange: (view: 'marketplace' | 'profile') => void,
  currentView: string,
  notifications: Notification[],
  onNotificationClick: (id: number) => void,
  onViewTrade: (listingId: number) => void
}) => (
  <header className="border-b border-zinc-200 bg-white sticky top-0 z-10">
    <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <h1 
          className="text-2xl font-bold tracking-tighter text-zinc-900 flex items-center gap-2 cursor-pointer"
          onClick={() => onViewChange('marketplace')}
        >
          <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center text-white font-black text-xs">
            LEGO
          </div>
          Lego Trader
        </h1>
        <nav className="hidden md:flex items-center gap-6">
          <button 
            onClick={() => onViewChange('marketplace')}
            className={`text-sm font-medium transition-colors ${currentView === 'marketplace' ? 'text-red-600' : 'text-zinc-500 hover:text-zinc-900'}`}
          >
            Marketplace
          </button>
          <button 
            onClick={() => onViewChange('profile')}
            className={`text-sm font-medium transition-colors ${currentView === 'profile' ? 'text-red-600' : 'text-zinc-500 hover:text-zinc-900'}`}
          >
            Profile
          </button>
        </nav>
        <div className="hidden lg:flex items-center bg-zinc-100 rounded-full px-4 py-1.5 w-80">
          <Search className="w-4 h-4 text-zinc-400 mr-2" />
          <input 
            type="text" 
            placeholder="Search sets, minifigures..." 
            className="bg-transparent border-none focus:ring-0 text-sm w-full"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <NotificationCenter 
          notifications={notifications} 
          onNotificationClick={onNotificationClick}
          onViewTrade={onViewTrade}
        />
        <button 
          onClick={onPostClick}
          className="bg-zinc-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-zinc-800 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Post Listing
        </button>
        <button 
          onClick={() => onViewChange('profile')}
          className={`p-2 rounded-full transition-colors ${currentView === 'profile' ? 'bg-red-50 text-red-600' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'}`}
        >
          <User className="w-5 h-5" />
        </button>
      </div>
    </div>
  </header>
);

const FeaturedHero = ({ onTradeClick }: { onTradeClick: () => void }) => (
  <div className="relative w-full h-[400px] rounded-[2.5rem] overflow-hidden mb-12 group">
    <div className="absolute inset-0 bg-zinc-900">
      <img 
        src="https://images.unsplash.com/photo-1635443474323-667794017631?auto=format&fit=crop&q=80&w=1600" 
        className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" 
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-900/40 to-transparent" />
    </div>
    
    <div className="relative h-full flex flex-col justify-center px-12 max-w-2xl">
      <div className="flex items-center gap-2 mb-4">
        <span className="bg-red-600 text-white text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full">Spotlight</span>
        <span className="text-zinc-400 text-[10px] font-black uppercase tracking-[0.2em]">Featured Build</span>
      </div>
      <h2 className="text-5xl font-black text-white mb-4 leading-tight">
        The Unsinkable <br />
        <span className="text-red-600">LEGO Titanic</span>
      </h2>
      <p className="text-zinc-300 text-lg mb-8 font-medium leading-relaxed">
        9,090 pieces of pure engineering. One of the largest LEGO sets ever created is now available for trade in the community.
      </p>
      <div className="flex items-center gap-4">
        <button 
          onClick={onTradeClick}
          className="bg-white text-zinc-900 px-8 py-4 rounded-2xl font-black hover:bg-zinc-100 transition-all shadow-xl shadow-white/10 flex items-center gap-2"
        >
          <ArrowLeftRight className="w-5 h-5" />
          Propose Trade
        </button>
        <div className="flex -space-x-3">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="w-10 h-10 rounded-full border-2 border-zinc-900 bg-zinc-800 overflow-hidden">
              <img src={`https://i.pravatar.cc/100?img=${i + 10}`} className="w-full h-full object-cover" />
            </div>
          ))}
          <div className="w-10 h-10 rounded-full border-2 border-zinc-900 bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-white">
            +12
          </div>
        </div>
        <span className="text-zinc-400 text-xs font-medium">Interested collectors</span>
      </div>
    </div>
  </div>
);

const ListingCard = ({ listing, onClick }: { listing: Listing, onClick: () => void, key?: React.Key }) => (
  <motion.div 
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -4 }}
    onClick={onClick}
    className="group cursor-pointer bg-white border border-zinc-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
  >
    <div className="aspect-square bg-zinc-100 relative overflow-hidden">
      {listing.image_url ? (
        <img 
          src={listing.image_url} 
          alt={listing.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-zinc-300">
          <Package className="w-12 h-12" />
        </div>
      )}
      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider text-zinc-600 border border-zinc-200">
        {listing.condition}
      </div>
    </div>
    <div className="p-4">
      <div className="flex justify-between items-start mb-1">
        <h3 className="font-semibold text-zinc-900 line-clamp-1 group-hover:text-red-600 transition-colors">
          {listing.title}
        </h3>
        <span className="text-sm font-bold text-zinc-900">${listing.price}</span>
      </div>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <Tag className="w-3 h-3" />
          {listing.category}
        </div>
        {listing.set_number && (
          <span className="text-[10px] font-bold text-zinc-400">#{listing.set_number}</span>
        )}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-[10px] text-zinc-400 uppercase font-medium">
            <Clock className="w-3 h-3" />
            {new Date(listing.created_at).toLocaleDateString()}
          </div>
          {listing.trade_availability && (
            <span className={`text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-md ${
              listing.trade_availability === 'Available for Trade' ? 'bg-emerald-50 text-emerald-600' :
              listing.trade_availability === 'Trade + Cash' ? 'bg-blue-50 text-blue-600' :
              'bg-zinc-50 text-zinc-600'
            }`}>
              {listing.trade_availability === 'Available for Trade' ? 'Trade' : 
               listing.trade_availability === 'Trade + Cash' ? 'Trade+' : 'Sale'}
            </span>
          )}
        </div>
        <ChevronRight className="w-4 h-4 text-zinc-300 group-hover:text-zinc-900 transition-colors" />
      </div>
    </div>
  </motion.div>
);

const PostModal = ({ isOpen, onClose, onPost }: { isOpen: boolean, onClose: () => void, onPost: () => void }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: CATEGORIES[0],
    condition: CONDITIONS[0],
    image_url: '',
    contact_info: '',
    set_number: '',
    trade_availability: 'Available for Trade',
    has_box: false,
    has_instructions: false,
    is_complete: true,
    piece_count: '',
    year_released: '',
    is_verified: false
  });

  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);

  const handleVerify = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
      setFormData(prev => ({ ...prev, is_verified: true }));
    }, 2000);
  };

  const handleFetchDetails = () => {
    if (!formData.set_number) return;
    
    // Mock fetch logic
    const mockData: Record<string, { title: string, piece_count: string, year: string }> = {
      '75192': { title: 'UCS Millennium Falcon', piece_count: '7541', year: '2017' },
      '10305': { title: "Lion Knights' Castle", piece_count: '4514', year: '2022' },
      '10294': { title: 'LEGO Titanic', piece_count: '9090', year: '2021' },
      '42115': { title: 'Lamborghini Sián FKP 37', piece_count: '3696', year: '2020' }
    };

    const details = mockData[formData.set_number];
    if (details) {
      setFormData(prev => ({
        ...prev,
        title: details.title,
        piece_count: details.piece_count,
        year_released: details.year
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image_url: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          piece_count: formData.piece_count ? parseInt(formData.piece_count) : undefined,
          year_released: formData.year_released ? parseInt(formData.year_released) : undefined,
          is_verified: formData.is_verified
        })
      });
      if (res.ok) {
        onPost();
        onClose();
        setFormData({
          title: '',
          description: '',
          price: '',
          category: CATEGORIES[0],
          condition: CONDITIONS[0],
          image_url: '',
          contact_info: '',
          set_number: '',
          trade_availability: 'Available for Trade',
          has_box: false,
          has_instructions: false,
          is_complete: true,
          piece_count: '',
          year_released: ''
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="p-6 border-b border-zinc-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-zinc-900">Create New Listing</h2>
              <button onClick={onClose} className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
                <X className="w-5 h-5 text-zinc-500" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-500 uppercase">Title</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. UCS Millennium Falcon 75192"
                    className="w-full px-4 py-2 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-500 uppercase">Price ($)</label>
                  <input 
                    required
                    type="number" 
                    placeholder="0.00"
                    className="w-full px-4 py-2 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-500 uppercase">Category</label>
                  <select 
                    className="w-full px-4 py-2 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all appearance-none bg-white"
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value as Category})}
                  >
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-500 uppercase">Condition</label>
                  <select 
                    className="w-full px-4 py-2 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all appearance-none bg-white"
                    value={formData.condition}
                    onChange={e => setFormData({...formData, condition: e.target.value as any})}
                  >
                    {CONDITIONS.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-500 uppercase flex justify-between">
                    Set Number
                    {formData.set_number && (
                      <button 
                        type="button"
                        onClick={handleFetchDetails}
                        className="text-red-600 hover:text-red-700 transition-colors flex items-center gap-1"
                      >
                        <Sparkles className="w-3 h-3" />
                        Fetch Details
                      </button>
                    )}
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g. 75192"
                    className="w-full px-4 py-2 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                    value={formData.set_number}
                    onChange={e => setFormData({...formData, set_number: e.target.value})}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-500 uppercase">Trade Availability</label>
                  <select 
                    className="w-full px-4 py-2 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all appearance-none bg-white"
                    value={formData.trade_availability}
                    onChange={e => setFormData({...formData, trade_availability: e.target.value as any})}
                  >
                    <option value="Available for Trade">Available for Trade</option>
                    <option value="Trade + Cash">Trade + Cash</option>
                    <option value="For Sale Only">For Sale Only</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-500 uppercase">Piece Count</label>
                  <input 
                    type="number" 
                    placeholder="e.g. 7541"
                    className="w-full px-4 py-2 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                    value={formData.piece_count}
                    onChange={e => setFormData({...formData, piece_count: e.target.value})}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-500 uppercase">Year Released</label>
                  <input 
                    type="number" 
                    placeholder="e.g. 2017"
                    className="w-full px-4 py-2 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                    value={formData.year_released}
                    onChange={e => setFormData({...formData, year_released: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold text-zinc-500 uppercase">Builder Insights</label>
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-zinc-300 text-red-600 focus:ring-red-500"
                      checked={formData.has_box}
                      onChange={e => setFormData({...formData, has_box: e.target.checked})}
                    />
                    <span className="text-sm text-zinc-600 group-hover:text-zinc-900 transition-colors">Original Box</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-zinc-300 text-red-600 focus:ring-red-500"
                      checked={formData.has_instructions}
                      onChange={e => setFormData({...formData, has_instructions: e.target.checked})}
                    />
                    <span className="text-sm text-zinc-600 group-hover:text-zinc-900 transition-colors">Instructions</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-zinc-300 text-red-600 focus:ring-red-500"
                      checked={formData.is_complete}
                      onChange={e => setFormData({...formData, is_complete: e.target.checked})}
                    />
                    <span className="text-sm text-zinc-600 group-hover:text-zinc-900 transition-colors">100% Complete</span>
                  </label>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-500 uppercase">Description</label>
                <textarea 
                  required
                  rows={4}
                  placeholder="Describe the set, missing pieces, box condition, etc."
                  className="w-full px-4 py-2 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-500 uppercase">Lego Set Photo</label>
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-zinc-200 border-dashed rounded-xl cursor-pointer hover:bg-zinc-50 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Camera className="w-8 h-8 text-zinc-400 mb-2" />
                        <p className="text-xs text-zinc-500">Click to upload photo</p>
                      </div>
                      <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                  {formData.image_url && (
                    <div className="w-32 h-32 rounded-xl overflow-hidden border border-zinc-200 relative group">
                      <img src={formData.image_url} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      {isScanning && (
                        <div className="absolute inset-0 bg-red-600/20 backdrop-blur-[2px] flex items-center justify-center">
                          <motion.div 
                            animate={{ y: [-40, 40, -40] }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                            className="w-full h-1 bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.8)]"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-[10px] font-black text-white uppercase tracking-widest bg-red-600 px-2 py-1 rounded">Scanning...</span>
                          </div>
                        </div>
                      )}
                      {scanComplete && (
                        <div className="absolute top-2 right-2 bg-emerald-500 text-white p-1 rounded-full shadow-lg">
                          <CheckCircle className="w-3 h-3" />
                        </div>
                      )}
                      <button 
                        type="button"
                        onClick={() => {
                          setFormData({...formData, image_url: ''});
                          setScanComplete(false);
                        }}
                        className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                      >
                        <X className="w-6 h-6 text-white" />
                      </button>
                    </div>
                  )}
                </div>
                {formData.image_url && !scanComplete && !isScanning && (
                  <button
                    type="button"
                    onClick={handleVerify}
                    className="mt-2 w-full flex items-center justify-center gap-2 py-2 bg-zinc-900 text-white rounded-xl text-xs font-bold hover:bg-zinc-800 transition-colors"
                  >
                    <ShieldCheck className="w-4 h-4 text-red-500" />
                    Verify My Bricks (AI Scanner)
                  </button>
                )}
                {scanComplete && (
                  <div className="mt-2 flex items-center gap-2 text-emerald-600 text-xs font-bold bg-emerald-50 p-2 rounded-xl border border-emerald-100">
                    <ShieldCheck className="w-4 h-4" />
                    LEGO Authenticity Verified
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-500 uppercase">Contact Info</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3 w-4 h-4 text-zinc-400" />
                  <input 
                    required
                    type="text" 
                    placeholder="Email or Phone Number"
                    className="w-full pl-11 pr-4 py-2 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                    value={formData.contact_info}
                    onChange={e => setFormData({...formData, contact_info: e.target.value})}
                  />
                </div>
              </div>

              <div className="pt-4">
                <button 
                  type="submit"
                  className="w-full bg-red-600 text-white py-3 rounded-xl font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20"
                >
                  Post Listing
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const TradeModal = ({ isOpen, onClose, targetListing }: { isOpen: boolean, onClose: () => void, targetListing: Listing }) => {
  const [selectedOfferItems, setSelectedOfferItems] = useState<Listing[]>([]);
  
  // Mock user collection for selection
  const userCollection: Listing[] = [
    {
      id: 201,
      title: "Lego Ideas Tree House",
      description: "Complete with all seasonal leaves.",
      price: 180,
      category: "Other",
      condition: "Used (Complete)",
      image_url: "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&q=80&w=400",
      contact_info: "",
      created_at: new Date().toISOString(),
      piece_count: 3036
    },
    {
      id: 202,
      title: "Star Wars R2-D2",
      description: "New in box.",
      price: 200,
      category: "Star Wars",
      condition: "New (Sealed)",
      image_url: "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&q=80&w=400",
      contact_info: "",
      created_at: new Date().toISOString(),
      piece_count: 2314
    }
  ];

  const toggleItem = (item: Listing) => {
    if (selectedOfferItems.find(i => i.id === item.id)) {
      setSelectedOfferItems(selectedOfferItems.filter(i => i.id !== item.id));
    } else {
      setSelectedOfferItems([...selectedOfferItems, item]);
    }
  };

  const offerTotal = selectedOfferItems.reduce((sum, item) => sum + item.price, 0);
  const targetPrice = targetListing.price;
  const difference = offerTotal - targetPrice;
  
  // Scale logic: -20 to 20 degrees
  const scaleRotation = Math.max(-20, Math.min(20, (difference / targetPrice) * 40));

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-zinc-900/80 backdrop-blur-md"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            className="relative bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="p-8 border-b border-zinc-100 flex justify-between items-center bg-zinc-50/50">
              <div>
                <h2 className="text-2xl font-black text-zinc-900 tracking-tight">Propose Trade</h2>
                <p className="text-zinc-500 text-sm font-medium">Balance the scale for a fair exchange</p>
              </div>
              <button onClick={onClose} className="p-3 hover:bg-zinc-200 rounded-full transition-colors">
                <X className="w-6 h-6 text-zinc-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Target Item */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-xs">1</div>
                    <h3 className="font-black uppercase tracking-widest text-zinc-400 text-xs">Target Item</h3>
                  </div>
                  <div className="bg-zinc-50 rounded-3xl p-6 border border-zinc-100 flex gap-6">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden bg-white border border-zinc-200 flex-shrink-0">
                      <img src={targetListing.image_url || ''} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div>
                      <h4 className="font-bold text-zinc-900 leading-tight mb-1">{targetListing.title}</h4>
                      <div className="text-red-600 font-black text-lg">${targetListing.price}</div>
                      <div className="text-[10px] text-zinc-400 font-bold uppercase mt-2">Seller's Valuation</div>
                    </div>
                  </div>
                </div>

                {/* Your Offer */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-xs">2</div>
                    <h3 className="font-black uppercase tracking-widest text-zinc-400 text-xs">Your Offer</h3>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    {userCollection.map(item => (
                      <button 
                        key={item.id}
                        onClick={() => toggleItem(item)}
                        className={`p-4 rounded-3xl border-2 transition-all flex items-center gap-4 text-left ${
                          selectedOfferItems.find(i => i.id === item.id) 
                          ? 'border-emerald-500 bg-emerald-50 shadow-md translate-x-1' 
                          : 'border-zinc-100 bg-white hover:border-zinc-200'
                        }`}
                      >
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-zinc-100 flex-shrink-0">
                          <img src={item.image_url || ''} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-zinc-900 text-sm">{item.title}</div>
                          <div className="text-emerald-600 font-black text-sm">${item.price}</div>
                        </div>
                        {selectedOfferItems.find(i => i.id === item.id) && (
                          <CheckCircle className="w-5 h-5 text-emerald-500" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* The Scale */}
              <div className="mt-16 bg-zinc-50 rounded-[2rem] p-10 border border-zinc-100 relative">
                <div className="absolute top-4 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-300">Lego Trade Scale</div>
                
                <div className="flex flex-col items-center">
                  <motion.div 
                    animate={{ rotate: scaleRotation }}
                    transition={{ type: 'spring', damping: 15 }}
                    className="w-full max-w-md h-2 bg-zinc-900 rounded-full relative mb-12"
                  >
                    {/* Left Plate */}
                    <div className="absolute -left-4 -top-12 flex flex-col items-center">
                      <div className="w-24 h-2 bg-zinc-900 rounded-full" />
                      <div className="text-[10px] font-black text-zinc-400 mt-2 uppercase">Target</div>
                    </div>
                    {/* Right Plate */}
                    <div className="absolute -right-4 -top-12 flex flex-col items-center">
                      <div className="w-24 h-2 bg-zinc-900 rounded-full" />
                      <div className="text-[10px] font-black text-zinc-400 mt-2 uppercase">Offer</div>
                    </div>
                    {/* Pivot point */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-zinc-900 rounded-full border-4 border-white" />
                  </motion.div>

                  <div className="flex items-center gap-8">
                    <div className="text-center">
                      <div className="text-zinc-400 text-[10px] font-black uppercase tracking-widest mb-1">Total Offer</div>
                      <div className="text-2xl font-black text-emerald-600">${offerTotal}</div>
                    </div>
                    <div className="h-10 w-px bg-zinc-200" />
                    <div className="text-center">
                      <div className="text-zinc-400 text-[10px] font-black uppercase tracking-widest mb-1">Market Difference</div>
                      <div className={`text-2xl font-black ${difference >= -50 && difference <= 50 ? 'text-emerald-500' : 'text-red-500'}`}>
                        {difference > 0 ? `+$${difference}` : `-$${Math.abs(difference)}`}
                      </div>
                    </div>
                  </div>

                  {Math.abs(difference) <= 50 ? (
                    <div className="mt-6 flex items-center gap-2 text-emerald-600 font-bold text-sm bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100">
                      <Shield className="w-4 h-4" />
                      Fair Trade Detected
                    </div>
                  ) : (
                    <div className="mt-6 flex items-center gap-2 text-red-500 font-bold text-sm bg-red-50 px-4 py-2 rounded-full border border-red-100">
                      <Info className="w-4 h-4" />
                      Value Mismatch
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-8 bg-zinc-900 flex items-center justify-between">
              <div className="flex items-center gap-4 text-zinc-400 text-sm font-medium">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                Trade is protected by Lego Trader Escrow
              </div>
              <button 
                disabled={selectedOfferItems.length === 0}
                className="bg-white text-zinc-900 px-10 py-4 rounded-2xl font-black hover:bg-zinc-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-white/10"
              >
                Send Trade Request
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const ListingDetail = ({ listing, onClose, initialShowTrade = false }: { listing: Listing, onClose: () => void, initialShowTrade?: boolean }) => {
  const [offerValue, setOfferValue] = useState('');
  const [showOfferInput, setShowOfferInput] = useState(false);
  const [showTradeModal, setShowTradeModal] = useState(initialShowTrade);

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, x: '100%' }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed inset-0 z-50 bg-white overflow-y-auto"
      >
        <div className="max-w-5xl mx-auto px-4 py-8">
          <button 
            onClick={onClose}
            className="mb-8 flex items-center gap-2 text-zinc-500 hover:text-zinc-900 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Marketplace
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="aspect-square bg-zinc-100 rounded-3xl overflow-hidden border border-zinc-200 shadow-inner relative">
                {listing.image_url ? (
                  <img 
                    src={listing.image_url} 
                    alt={listing.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-300">
                    <Package className="w-24 h-24" />
                  </div>
                )}
                {listing.is_verified && (
                  <div className="absolute top-4 right-4 flex items-center gap-2 bg-emerald-500 text-white px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified Bricks
                  </div>
                )}
              </div>

              {/* Set Statistics - Blueprint Aesthetic */}
              <div className="bg-blue-600 rounded-2xl p-6 relative overflow-hidden border-2 border-blue-400 shadow-lg">
                {/* Grid Lines Overlay */}
                <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                
                <div className="relative z-10">
                  <h3 className="text-white/60 text-[10px] font-black uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                    <Library className="w-3 h-3" />
                    Technical Specifications
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <div className="text-blue-100 text-[10px] font-bold uppercase">Set Number</div>
                      <div className="text-white font-mono text-xl font-black">{listing.set_number || 'N/A'}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-blue-100 text-[10px] font-bold uppercase">Piece Count</div>
                      <div className="text-white font-mono text-xl font-black">{listing.piece_count || '---'}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-blue-100 text-[10px] font-bold uppercase">Year</div>
                      <div className="text-white font-mono text-xl font-black">{listing.year_released || '---'}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hype Indicators */}
              <div className="flex items-center gap-6 px-2">
                <motion.div 
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="flex items-center gap-2 text-red-600 font-bold text-sm"
                >
                  <Flame className="w-4 h-4 fill-red-600" />
                  {listing.watching_count || Math.floor(Math.random() * 15) + 5} people are watching this
                </motion.div>
                <div className="flex items-center gap-2 text-zinc-400 text-xs font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  Last viewed 4 minutes ago
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    {listing.category}
                  </span>
                  <span className="bg-zinc-100 text-zinc-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    {listing.condition}
                  </span>
                  {listing.trade_availability && (
                    <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                      {listing.trade_availability}
                    </span>
                  )}
                </div>
                <h1 className="text-4xl font-bold text-zinc-900 mb-2">{listing.title}</h1>
                <p className="text-3xl font-bold text-red-600">${listing.price}</p>
              </div>

              {/* Builder Insights - Condition Checklist */}
              <div className="bg-zinc-50 rounded-2xl p-6 border border-zinc-100 space-y-4">
                <h3 className="text-sm font-black uppercase tracking-widest text-zinc-400">Builder Insights</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${listing.has_box ? 'bg-emerald-50 text-emerald-600' : 'bg-zinc-100 text-zinc-400'}`}>
                      <Box className="w-5 h-5" />
                    </div>
                    <div className="text-xs font-bold text-zinc-700">Original Box</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${listing.has_instructions ? 'bg-emerald-50 text-emerald-600' : 'bg-zinc-100 text-zinc-400'}`}>
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div className="text-xs font-bold text-zinc-700">Instructions</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${listing.is_complete ? 'bg-emerald-50 text-emerald-600' : 'bg-zinc-100 text-zinc-400'}`}>
                      <CheckSquare className="w-5 h-5" />
                    </div>
                    <div className="text-xs font-bold text-zinc-700">100% Complete</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-bold text-zinc-900">Description</h2>
                <p className="text-zinc-600 leading-relaxed whitespace-pre-wrap">
                  {listing.description}
                </p>
              </div>

              <div className="p-6 bg-zinc-900 rounded-3xl space-y-6 shadow-xl shadow-zinc-900/20">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Mail className="w-5 h-5 text-red-500" />
                    Interested?
                  </h2>
                  <div className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Secure Marketplace</div>
                </div>
                
                <div className="flex flex-col gap-3">
                  <div className="grid grid-cols-2 gap-3">
                    <button className="bg-white text-zinc-900 py-3.5 rounded-2xl font-bold hover:bg-zinc-100 transition-colors flex items-center justify-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Message
                    </button>
                    <button 
                      onClick={() => setShowOfferInput(!showOfferInput)}
                      className="bg-zinc-800 text-white py-3.5 rounded-2xl font-bold hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <DollarSign className="w-4 h-4" />
                      Make Offer
                    </button>
                  </div>

                  <button 
                    onClick={() => setShowTradeModal(true)}
                    className="w-full bg-red-600 text-white py-4 rounded-2xl font-black hover:bg-red-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-red-600/20"
                  >
                    <ArrowLeftRight className="w-5 h-5" />
                    Propose Trade
                  </button>

                  <AnimatePresence>
                    {showOfferInput && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-2 space-y-3">
                          <div className="relative">
                            <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                            <input 
                              type="number" 
                              placeholder="Enter your offer value..."
                              className="w-full pl-11 pr-4 py-3 bg-zinc-800 border border-zinc-700 rounded-2xl text-white outline-none focus:ring-2 focus:ring-red-500 transition-all font-bold"
                              value={offerValue}
                              onChange={e => setOfferValue(e.target.value)}
                            />
                          </div>
                          <button className="w-full bg-white/10 text-white py-3 rounded-2xl text-sm font-bold hover:bg-white/20 transition-colors">
                            Submit Offer
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center gap-3 text-zinc-400 text-xs">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    Your payment is protected until you receive the set.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      <TradeModal 
        isOpen={showTradeModal} 
        onClose={() => setShowTradeModal(false)} 
        targetListing={listing} 
      />
    </>
  );
};

const ProfilePage = ({ onListingClick, key }: { onListingClick: (l: Listing) => void, key?: string }) => {
  const [activeTab, setActiveTab] = useState<'listings' | 'history' | 'wishlist' | 'collection'>('listings');

  // Mock data for the profile
  const userListings: Listing[] = [
    {
      id: 101,
      title: "Star Wars Millennium Falcon (75192)",
      description: "Ultimate Collector Series. Complete with all pieces and box.",
      price: 850,
      category: "Star Wars",
      condition: "Like New",
      image_url: "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&q=80&w=800",
      contact_info: "masterbuilder@example.com",
      created_at: new Date().toISOString(),
      set_number: "75192",
      trade_availability: "Available for Trade",
      has_box: true,
      has_instructions: true,
      is_complete: true,
      piece_count: 7541,
      year_released: 2017,
      watching_count: 24,
      is_verified: true
    },
    {
      id: 102,
      title: "Technic Lamborghini Sián FKP 37",
      description: "Built once, displayed in a smoke-free home.",
      price: 320,
      category: "Technic",
      condition: "Like New",
      image_url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800",
      contact_info: "masterbuilder@example.com",
      created_at: new Date().toISOString(),
      set_number: "42115",
      trade_availability: "Trade + Cash",
      has_box: true,
      has_instructions: true,
      is_complete: true,
      piece_count: 3696,
      year_released: 2020,
      watching_count: 12
    }
  ];

  const tradeHistory = [
    { 
      id: 1, 
      mySet: "Creator Expert Ghostbusters ECTO-1", 
      partnerSet: "Lego Titanic",
      partner: "BrickCollector",
      date: "Feb 12, 2024",
      rating: 5
    },
    { 
      id: 2, 
      mySet: "Ideas Medieval Blacksmith", 
      partnerSet: "Barracuda Bay",
      partner: "LegoFanatic",
      date: "Jan 05, 2024",
      rating: 5
    }
  ];

  const wishlist = [
    { id: 1, name: "Lego Titanic", number: "10294", value: "$680", image: "https://images.unsplash.com/photo-1560167012-06a9f845ee3d?auto=format&fit=crop&q=80&w=800" },
    { id: 2, name: "Lego AT-AT", number: "75313", value: "$850", image: "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&q=80&w=800" }
  ];

  const collection = [
    { id: 1, name: "Daily Bugle", number: "76178", status: "Not Trading", image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800" },
    { id: 2, name: "Rivendell", number: "10316", status: "Available for Trade", image: "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&q=80&w=800" }
  ];

  const activity = [
    { id: 1, text: "User listed Millennium Falcon", time: "2 hours ago" },
    { id: 2, text: "User added Lego Titanic to wishlist", time: "1 day ago" },
    { id: 3, text: "User completed trade with BrickCollector", time: "3 days ago" }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto px-4 py-12 space-y-8"
    >
      {/* Top Section */}
      <div className="bg-white rounded-3xl border border-zinc-200 p-8 md:p-12 shadow-sm">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
          {/* Profile Photo */}
          <div className="w-32 h-32 md:w-40 md:h-40 bg-zinc-100 rounded-full flex items-center justify-center border-4 border-white shadow-lg overflow-hidden shrink-0">
            <User className="w-16 h-16 md:w-20 md:h-20 text-zinc-300" />
          </div>

          {/* User Info */}
          <div className="flex-1 text-center md:text-left space-y-6">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 tracking-tight">MasterBuilder99</h2>
                <div className="flex items-center justify-center md:justify-start gap-2 text-zinc-500 mt-2">
                  <MapPin className="w-4 h-4 text-red-600" />
                  <span className="text-sm font-medium">Billund, Denmark</span>
                </div>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Trusted Trader
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                    <MailCheck className="w-3.5 h-3.5" />
                    Verified Account
                  </div>
                </div>
                
                {/* Trust Signals */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-4">
                  <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-zinc-400 bg-zinc-50 px-2 py-1 rounded-md border border-zinc-100">
                    <Zap className="w-3 h-3 text-yellow-500" />
                    Responds within 2 hours
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-zinc-400 bg-zinc-50 px-2 py-1 rounded-md border border-zinc-100">
                    <TrendingUp className="w-3 h-3 text-emerald-500" />
                    98% Success Rate
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-zinc-400 bg-zinc-50 px-2 py-1 rounded-md border border-zinc-100">
                    <Eye className="w-3 h-3 text-blue-500" />
                    Active 3 hours ago
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3">
                <button className="bg-zinc-900 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-zinc-800 transition-colors flex items-center gap-2 shadow-lg shadow-zinc-900/10">
                  <MessageSquare className="w-4 h-4" />
                  Message User
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm">
                <div className="bg-zinc-100 px-4 py-2 rounded-full font-medium text-zinc-600">
                  Joined March 2024
                </div>
                <div className="flex items-center gap-1">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="font-bold text-zinc-900 ml-1">(128 trades)</span>
                </div>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-6 py-4 border-y border-zinc-100">
                <div className="text-center md:text-left">
                  <div className="text-xl font-black text-zinc-900">128</div>
                  <div className="text-[10px] uppercase tracking-widest font-bold text-zinc-400">Trades Completed</div>
                </div>
                <div className="w-px h-8 bg-zinc-100" />
                <div className="text-center md:text-left">
                  <div className="text-xl font-black text-zinc-900">4</div>
                  <div className="text-[10px] uppercase tracking-widest font-bold text-zinc-400">Active Listings</div>
                </div>
                <div className="w-px h-8 bg-zinc-100" />
                <div className="text-center md:text-left">
                  <div className="text-xl font-black text-zinc-900">7</div>
                  <div className="text-[10px] uppercase tracking-widest font-bold text-zinc-400">Wishlist Items</div>
                </div>
              </div>

              {/* User Bio */}
              <div className="text-center md:text-left space-y-2">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Bio</h4>
                <p className="text-sm text-zinc-600 leading-relaxed max-w-lg">
                  Collector of Star Wars UCS sets and large Technic builds. Always open to trades.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-3">
              <button className="bg-red-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20">
                Edit Profile
              </button>
              <button className="bg-white border border-zinc-200 text-zinc-900 px-6 py-2.5 rounded-xl font-bold hover:bg-zinc-50 transition-colors">
                Settings
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Trade Preferences */}
      <div className="bg-white rounded-3xl border border-zinc-200 p-8 shadow-sm space-y-6">
        <h3 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
          <ArrowLeftRight className="w-5 h-5 text-red-600" />
          Trade Preferences
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-zinc-400">Preferred Themes</h4>
            <div className="flex flex-wrap gap-2">
              {['Star Wars', 'Technic', 'Modular Buildings', 'Minifigures'].map(tag => (
                <span key={tag} className="px-3 py-1.5 bg-zinc-100 text-zinc-700 rounded-full text-xs font-bold border border-zinc-200">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-zinc-400">Trade Options</h4>
            <div className="flex flex-wrap gap-2">
              {['Accepts Trades', 'Trades + Cash', 'Ships Worldwide', 'Local Pickup'].map(tag => (
                <span key={tag} className="px-3 py-1.5 bg-red-50 text-red-600 rounded-full text-xs font-bold border border-red-100">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="space-y-8">
        <div className="flex items-center gap-2 p-1.5 bg-zinc-100 rounded-2xl w-full md:w-fit overflow-x-auto no-scrollbar">
          {[
            { id: 'listings', label: 'Active Listings', icon: Package },
            { id: 'history', label: 'Trade History', icon: History },
            { id: 'wishlist', label: 'Wishlist', icon: Heart },
            { id: 'collection', label: 'Collection', icon: Library }
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 rounded-xl text-sm font-bold transition-all duration-200 flex items-center gap-2 whitespace-nowrap ${
                activeTab === tab.id 
                  ? 'bg-white text-zinc-900 shadow-sm scale-[1.02] translate-y-[-2px] border-b-4 border-red-600' 
                  : 'text-zinc-500 hover:text-zinc-900'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'listings' && (
            <motion.div 
              key="listings"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="space-y-6"
            >
              {userListings.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {userListings.map(listing => (
                    <div key={listing.id} className="bg-white border border-zinc-200 rounded-2xl overflow-hidden flex flex-col group">
                      <div className="aspect-video bg-zinc-100 relative overflow-hidden">
                        <img src={listing.image_url} alt={listing.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                        <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                          ${listing.price}
                        </div>
                      </div>
                      <div className="p-5 flex-1 flex flex-col">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{listing.category}</span>
                          <span className="text-[10px] font-black uppercase tracking-widest text-red-600">#{listing.set_number || 'N/A'}</span>
                        </div>
                        <h4 className="font-bold text-zinc-900 mb-2 line-clamp-1 group-hover:text-red-600 transition-colors">{listing.title}</h4>
                        <div className="mb-4">
                          <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${
                            listing.trade_availability === 'Available for Trade' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                            listing.trade_availability === 'Trade + Cash' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                            'bg-zinc-50 text-zinc-600 border border-zinc-100'
                          }`}>
                            {listing.trade_availability || 'Available for Trade'}
                          </span>
                        </div>
                        <button 
                          onClick={() => onListingClick(listing)}
                          className="mt-auto w-full py-2.5 bg-zinc-900 text-white rounded-xl text-sm font-bold hover:bg-zinc-800 transition-colors"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-zinc-200">
                  <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Package className="w-10 h-10 text-zinc-300" />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900 mb-2">This builder hasn't posted any sets yet!</h3>
                  <p className="text-zinc-500 max-w-xs mx-auto">When they list Lego sets for trade, they will appear right here.</p>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'history' && (
            <motion.div 
              key="history"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="bg-white rounded-3xl border border-zinc-200 divide-y divide-zinc-100 overflow-hidden"
            >
              {tradeHistory.map(item => (
                <div key={item.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-zinc-50 transition-colors">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-zinc-100 rounded-xl flex items-center justify-center text-zinc-900 mb-1">
                          <Package className="w-6 h-6" />
                        </div>
                        <div className="text-[10px] font-black uppercase text-zinc-400">My Set</div>
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-zinc-900 text-sm">{item.mySet}</div>
                      </div>
                    </div>
                    <ArrowLeftRight className="w-5 h-5 text-red-600 shrink-0" />
                    <div className="flex items-center gap-3 flex-1 text-right md:text-left">
                      <div className="flex-1 order-2 md:order-1">
                        <div className="font-bold text-zinc-900 text-sm">{item.partnerSet}</div>
                      </div>
                      <div className="text-center order-1 md:order-2">
                        <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-600 mb-1">
                          <Package className="w-6 h-6" />
                        </div>
                        <div className="text-[10px] font-black uppercase text-red-400">Their Set</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between md:flex-col md:items-end gap-2 pt-4 md:pt-0 border-t md:border-t-0 border-zinc-100">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-zinc-500">with</span>
                      <span className="text-sm font-black text-zinc-900 hover:text-red-600 cursor-pointer">{item.partner}</span>
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-zinc-400">{item.date}</div>
                      <div className="flex items-center gap-0.5 mt-1">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'wishlist' && (
            <motion.div 
              key="wishlist"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1 max-w-md relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input 
                    type="text" 
                    placeholder="Search Lego sets to add..." 
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-zinc-200 rounded-xl text-sm focus:ring-2 focus:ring-red-600/20 focus:border-red-600 outline-none transition-all"
                  />
                </div>
                <button className="flex items-center justify-center gap-2 px-6 py-2.5 bg-red-600 text-white rounded-xl text-sm font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20">
                  <Plus className="w-4 h-4" />
                  Add Set
                </button>
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-bold text-zinc-900">Searching for...</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {wishlist.map(item => (
                    <div key={item.id} className="bg-white border border-zinc-200 rounded-2xl p-4 flex gap-4 group">
                      <div className="w-24 h-24 bg-zinc-100 rounded-xl overflow-hidden shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-bold text-zinc-900 text-sm line-clamp-1">{item.name}</h4>
                          <p className="text-xs text-zinc-500 font-medium">Set #{item.number}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-black text-red-600">{item.value}</span>
                          <button className="p-1.5 hover:bg-zinc-100 rounded-lg transition-colors">
                            <ExternalLink className="w-4 h-4 text-zinc-400" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Suggested Sets */}
              <div className="space-y-4 pt-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-zinc-400">Suggested for you</h4>
                <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                  {[
                    { name: "Lion Knights' Castle", number: "10305", image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=400" },
                    { name: "Mos Eisley Cantina", number: "75290", image: "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&q=80&w=400" },
                    { name: "Assembly Square", number: "10255", image: "https://images.unsplash.com/photo-1560167012-06a9f845ee3d?auto=format&fit=crop&q=80&w=400" }
                  ].map((set, i) => (
                    <div key={i} className="min-w-[200px] bg-white border border-zinc-200 rounded-2xl p-3 space-y-3">
                      <div className="aspect-square bg-zinc-100 rounded-xl overflow-hidden">
                        <img src={set.image} alt={set.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-zinc-900 line-clamp-1">{set.name}</h5>
                        <p className="text-[10px] text-zinc-400 font-bold">#{set.number}</p>
                      </div>
                      <button className="w-full py-1.5 bg-zinc-100 text-zinc-600 rounded-lg text-[10px] font-bold hover:bg-zinc-200 transition-colors">
                        Add to Wishlist
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'collection' && (
            <motion.div 
              key="collection"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between bg-red-50 p-4 rounded-2xl border border-red-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center text-white">
                    <Library className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900">Interested in one of these sets?</h4>
                    <p className="text-xs text-zinc-500">Send a trade proposal to start a conversation.</p>
                  </div>
                </div>
                <button className="hidden md:block px-4 py-2 bg-zinc-900 text-white rounded-xl text-xs font-bold hover:bg-zinc-800 transition-colors">
                  Propose Trade
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {collection.map(item => (
                  <div key={item.id} className="bg-white border border-zinc-200 rounded-2xl overflow-hidden group">
                    <div className="aspect-video bg-zinc-100 relative overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                      <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        item.status === 'Available for Trade' ? 'bg-emerald-500 text-white' : 
                        item.status === 'Considering Offers' ? 'bg-blue-500 text-white' :
                        'bg-zinc-900/80 text-white backdrop-blur-sm'
                      }`}>
                        {item.status}
                      </div>
                    </div>
                    <div className="p-4 flex items-center justify-between gap-4">
                      <div>
                        <h4 className="font-bold text-zinc-900">{item.name}</h4>
                        <p className="text-xs text-zinc-500 font-medium">Set #{item.number}</p>
                      </div>
                      {item.status !== 'Private Collection' && (
                        <button className="px-3 py-1.5 bg-zinc-100 text-zinc-900 rounded-lg text-[10px] font-bold hover:bg-zinc-900 hover:text-white transition-all">
                          Propose Trade
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-3xl border border-zinc-200 p-8 shadow-sm space-y-6">
        <h3 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
          <Activity className="w-5 h-5 text-red-600" />
          Recent Activity
        </h3>
        <div className="space-y-4">
          {activity.map(item => (
            <div key={item.id} className="flex items-center gap-4 p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-zinc-200 shadow-sm shrink-0">
                <Clock className="w-5 h-5 text-zinc-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-zinc-900">{item.text}</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mt-0.5">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [initialShowTrade, setInitialShowTrade] = useState(false);
  const [currentView, setCurrentView] = useState<'marketplace' | 'profile'>('marketplace');
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      message: "Someone made an offer on your Millennium Falcon!",
      type: 'offer',
      listing_id: 101,
      timestamp: "2m ago",
      is_read: false
    },
    {
      id: 2,
      message: "BrickBuilder99 proposed a trade!",
      type: 'trade',
      listing_id: 102,
      timestamp: "1h ago",
      is_read: false
    }
  ]);

  const handleNotificationClick = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
  };

  const handleViewTrade = (listingId: number) => {
    // In a real app, we'd fetch the listing. For now, we'll try to find it in our mock data or current listings.
    const listing = listings.find(l => l.id === listingId) || 
                    (listingId === 101 ? {
                      id: 101,
                      title: "Star Wars Millennium Falcon (75192)",
                      description: "Ultimate Collector Series. Complete with all pieces and box.",
                      price: 850,
                      category: "Star Wars",
                      condition: "Like New",
                      image_url: "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&q=80&w=800",
                      contact_info: "masterbuilder@example.com",
                      created_at: new Date().toISOString(),
                      set_number: "75192",
                      trade_availability: "Available for Trade",
                      has_box: true,
                      has_instructions: true,
                      is_complete: true,
                      piece_count: 7541,
                      year_released: 2017,
                      watching_count: 24,
                      is_verified: true
                    } : null);
    
    if (listing) {
      setInitialShowTrade(true);
      setSelectedListing(listing as Listing);
    }
  };

  const fetchListings = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);
      if (selectedCategory) params.append('category', selectedCategory);
      
      const res = await fetch(`/api/listings?${params.toString()}`);
      const data = await res.json();
      setListings(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentView === 'marketplace') {
      fetchListings();
    }
  }, [searchQuery, selectedCategory, currentView]);

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900">
      <Header 
        onPostClick={() => setIsPostModalOpen(true)} 
        onSearch={setSearchQuery}
        onViewChange={setCurrentView}
        currentView={currentView}
        notifications={notifications}
        onNotificationClick={handleNotificationClick}
        onViewTrade={handleViewTrade}
      />

      <AnimatePresence mode="wait">
        {currentView === 'marketplace' ? (
          <motion.main 
            key="marketplace"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-7xl mx-auto px-4 py-8"
          >
            <div className="flex flex-col md:flex-row gap-8">
              {/* Sidebar Filters */}
              <aside className="w-full md:w-64 space-y-8">
                <div>
                  <h2 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Categories
                  </h2>
                  <div className="space-y-1">
                    <button 
                      onClick={() => setSelectedCategory(null)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${!selectedCategory ? 'bg-zinc-900 text-white font-medium' : 'text-zinc-600 hover:bg-zinc-200'}`}
                    >
                      All Items
                    </button>
                    {CATEGORIES.map(cat => (
                      <button 
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedCategory === cat ? 'bg-zinc-900 text-white font-medium' : 'text-zinc-600 hover:bg-zinc-200'}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-5 bg-zinc-900 rounded-3xl text-white shadow-xl shadow-zinc-900/20">
                  <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-red-600" />
                    Trading Safely
                  </h3>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                        <ShieldCheckIcon className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div>
                        <div className="text-[11px] font-bold">Verified Bricks</div>
                        <div className="text-[10px] text-zinc-400">Always look for the AI Scan badge.</div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                        <Scale className="w-4 h-4 text-blue-400" />
                      </div>
                      <div>
                        <div className="text-[11px] font-bold">Balanced Trades</div>
                        <div className="text-[10px] text-zinc-400">Use the Scale to ensure fairness.</div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                        <Box className="w-4 h-4 text-amber-400" />
                      </div>
                      <div>
                        <div className="text-[11px] font-bold">Tracked Shipping</div>
                        <div className="text-[10px] text-zinc-400">Never ship without a tracking number.</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-red-600 rounded-2xl text-white">
                  <h3 className="font-bold mb-2">Safety Tip</h3>
                  <p className="text-xs opacity-90 leading-relaxed">
                    Always meet in a public place for trades. Check all pieces before finalizing your purchase!
                  </p>
                </div>
              </aside>

              {/* Listings Grid */}
              <div className="flex-1">
                <FeaturedHero onTradeClick={() => {
                  const titanicListing = listings.find(l => l.title.includes('Titanic')) || {
                    id: 999,
                    title: 'LEGO Titanic (10294)',
                    description: 'The ultimate build. 9090 pieces of history.',
                    price: 680,
                    category: 'Other',
                    condition: 'New (Sealed)',
                    image_url: 'https://images.unsplash.com/photo-1635443474323-667794017631?auto=format&fit=crop&q=80&w=1200',
                    contact_info: 'collector@example.com',
                    created_at: new Date().toISOString(),
                    set_number: '10294',
                    trade_availability: 'Available for Trade',
                    has_box: true,
                    has_instructions: true,
                    is_complete: true,
                    piece_count: 9090,
                    year_released: 2021,
                    watching_count: 150,
                    is_verified: true
                  };
                  setSelectedListing(titanicListing as Listing);
                  setInitialShowTrade(true);
                }} />

                {loading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="bg-zinc-200 animate-pulse rounded-2xl aspect-[3/4]" />
                    ))}
                  </div>
                ) : listings.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {listings.map(listing => (
                      <ListingCard 
                        key={listing.id} 
                        listing={listing} 
                        onClick={() => setSelectedListing(listing)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-zinc-300">
                    <Package className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-zinc-900">No listings found</h3>
                    <p className="text-zinc-500">Try adjusting your search or category filters.</p>
                  </div>
                )}
              </div>
            </div>
          </motion.main>
        ) : (
          <ProfilePage 
            key="profile" 
            onListingClick={setSelectedListing}
          />
        )}
      </AnimatePresence>

      <PostModal 
        isOpen={isPostModalOpen} 
        onClose={() => setIsPostModalOpen(false)} 
        onPost={fetchListings}
      />

      <AnimatePresence>
        {selectedListing && (
          <ListingDetail 
            listing={selectedListing} 
            onClose={() => {
              setSelectedListing(null);
              setInitialShowTrade(false);
            }} 
            initialShowTrade={initialShowTrade}
          />
        )}
      </AnimatePresence>

      <footer className="border-t border-zinc-200 bg-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-zinc-500">
            &copy; {new Date().getFullYear()} Lego Trader. Built for the community.
          </p>
          <p className="text-[10px] text-zinc-400 mt-2 uppercase tracking-widest">
            Not affiliated with the LEGO Group.
          </p>
        </div>
      </footer>
    </div>
  );
}
