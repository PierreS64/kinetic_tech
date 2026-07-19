import React, { useEffect } from 'react';
import './styles/base/category-slider.css';
import './styles/base/footer.css';
import './styles/base/button.css';
import './styles/base/badge.css';
import './styles/base/form.css';
import './styles/base/table.css';
import './styles/base/modal.css';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, MessageCircle } from 'lucide-react';

import Navbar from './layouts/Navbar/Navbar';
import Home from './pages/Home/Home';
import Catalog from './pages/Catalog/Catalog';
import PCBuilder from './pages/PCBuilder';
import AIAdvisor from './components/common/AIAdvisor';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/CheckoutPage';
import Auth from './pages/Auth/Auth';
import TradeIn from './pages/TradeIn/TradeIn';
import SupportTicket from './pages/Support/SupportTicket';
import Warranty from './pages/Support/Warranty';
import OrderTracking from './pages/Support/OrderTracking';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Appointments from './pages/Support/Appointments';
import AdminDashboard from './pages/AdminDashboard';
import AboutUs from './pages/AboutUs/AboutUs';
import AccountPortal from './pages/AccountPortal';

import { useAppContext } from './contexts/AppContext';

import { useCart } from './contexts/CartContext';

export default function App() {
  const { theme, storeProducts, aiOpen, setAiOpen, selectedProduct, setSelectedProduct, selectedDetailProduct, setSelectedDetailProduct } = useAppContext();
  const { cartOpen, setCartOpen, cartItems } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  // Sync URL with selectedProduct
  useEffect(() => {
    try {
      const url = new URL(window.location);
      if (selectedProduct) {
        url.searchParams.set('product', selectedProduct.id);
      } else {
        url.searchParams.delete('product');
      }
      window.history.replaceState({}, '', url);
    } catch (e) {
      console.error('Failed to sync URL', e);
    }
  }, [selectedProduct]);

  useEffect(() => {
    try {
      const url = new URL(window.location);
      if (selectedDetailProduct) {
        url.searchParams.set('detail', selectedDetailProduct.id);
      } else {
        url.searchParams.delete('detail');
      }
      window.history.replaceState({}, '', url);
    } catch (e) {
      console.error('Failed to sync URL', e);
    }
  }, [selectedDetailProduct]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />

      <main style={{ flex: 1, padding: '0 0 60px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/laptop" element={<Catalog activeView="laptop" />} />
          <Route path="/phone" element={<Catalog activeView="điện thoại" />} />
          <Route path="/gear" element={<Catalog activeView="gaming gear" />} />
          <Route path="/components" element={<Catalog activeView="linh kiện" />} />
          <Route path="/pc-builder" element={<PCBuilder />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/trade-in" element={<TradeIn />} />
          <Route path="/support-ticket" element={<SupportTicket theme={theme} />} />
          <Route path="/warranty" element={<Warranty />} />
          <Route path="/order-tracking" element={<OrderTracking orders={[]} />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/about-us" element={<AboutUs theme={theme} />} />
          <Route path="/account" element={<AccountPortal products={storeProducts} />} />
        </Routes>
      </main>

      {/* Global Modals & Float Buttons */}
      {selectedProduct && (
        <ProductDetail product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
      
      {selectedDetailProduct && (
        <ProductDetail product={selectedDetailProduct} onClose={() => setSelectedDetailProduct(null)} />
      )}

      <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} onCheckout={() => { setCartOpen(false); navigate('/checkout'); }} />

      {aiOpen && (
        <div style={{ position: 'fixed', bottom: '90px', right: '24px', zIndex: 100, width: '400px', maxWidth: 'calc(100vw - 48px)', height: '600px', maxHeight: 'calc(100vh - 120px)', boxShadow: '0 8px 32px rgba(0,0,0,0.2)', borderRadius: '16px', overflow: 'hidden' }}>
          <AIAdvisor onClose={() => setAiOpen(false)} />
        </div>
      )}

      <button 
        className="floating-cart-btn-assistive"
        onClick={() => setCartOpen(true)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 90,
          background: 'var(--color-primary)',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '56px',
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)',
          cursor: 'pointer',
          animation: 'pulseGlow 2s infinite',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <ShoppingCart size={24} />
        {cartItems && cartItems.length > 0 && (
          <span style={{
            position: 'absolute',
            top: '-4px',
            right: '-4px',
            background: 'white',
            color: 'var(--color-primary)',
            fontSize: '12px',
            fontWeight: 'bold',
            borderRadius: '50%',
            width: '20px',
            height: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid var(--color-primary)'
          }}>
            {cartItems.length}
          </span>
        )}
      </button>

      <button 
        className="floating-ai-btn-assistive"
        onClick={() => setAiOpen(true)}
        style={{
          position: 'fixed',
          bottom: '96px',
          right: '24px',
          zIndex: 90,
          background: theme === 'light' ? 'white' : 'var(--color-surface-container-high)',
          color: theme === 'light' ? 'var(--color-primary)' : 'white',
          border: '2px solid var(--color-primary)',
          borderRadius: '50%',
          width: '56px',
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          cursor: 'pointer',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <MessageCircle size={28} />
      </button>
    </div>
  );
}
