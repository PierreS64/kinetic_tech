import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import ProductCard from '../../components/common/ProductCard';
import FilterSidebar from '../../layouts/FilterSidebar/FilterSidebar';
import { getFilteredProducts } from '../../utils/filterProducts';
import { useAppContext } from '../../contexts/AppContext';

export default function Catalog({ activeView }) {
  const { storeProducts, searchQuery, setSelectedProduct } = useAppContext();
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(80000000);
  const [onlyInStock, setOnlyInStock] = useState(false);

  const [laptopFilters, setLaptopFilters] = useState({ usage: '', cpu: '', ram: '', storage: '', gpu: '', screenSize: '', screenHz: '' });
  const [phoneFilters, setPhoneFilters] = useState({ os: '', rom: '', ram: '', screenSize: '', features: [], battery: '' });
  const [gearFilters, setGearFilters] = useState({ type: '', connection: '', led: '', keyboardSwitch: '', keyboardLayout: '', mouseWeight: '', mouseDpi: '' });
  const [componentFilters, setComponentFilters] = useState({ type: '', socket: '', chipset: '', ramStandard: '', ramBus: '', vgaBrand: '', vgaVram: '', psuPower: '', psuEfficiency: '' });

  useEffect(() => {
    setSelectedBrands([]);
    setMinPrice(0);
    setMaxPrice(80000000);
    setOnlyInStock(false);
    setLaptopFilters({ usage: '', cpu: '', ram: '', storage: '', gpu: '', screenSize: '', screenHz: '' });
    setPhoneFilters({ os: '', rom: '', ram: '', screenSize: '', features: [], battery: '' });
    setGearFilters({ type: '', connection: '', led: '', keyboardSwitch: '', keyboardLayout: '', mouseWeight: '', mouseDpi: '' });
    setComponentFilters({ type: '', socket: '', chipset: '', ramStandard: '', ramBus: '', vgaBrand: '', vgaVram: '', psuPower: '', psuEfficiency: '' });
  }, [activeView]);
  
  const filteredProducts = getFilteredProducts(
    storeProducts, activeView, searchQuery, selectedBrands, minPrice, maxPrice, onlyInStock, laptopFilters, phoneFilters, gearFilters, componentFilters
  );

  const getCategoryBrands = () => {
    if (activeView === 'laptop') return ['ASUS', 'Apple', 'Lenovo'];
    if (activeView === 'điện thoại') return ['Apple', 'Samsung', 'Xiaomi'];
    if (activeView === 'gaming gear') return ['ASUS', 'Logitech', 'Razer'];
    if (activeView === 'linh kiện') return ['Intel', 'AMD', 'ASUS', 'MSI', 'Gigabyte', 'Corsair', 'Samsung', 'Lian Li'];
    return ['ASUS', 'Apple', 'Samsung', 'Xiaomi', 'Lenovo', 'Logitech', 'Razer', 'AMD', 'Intel', 'MSI', 'Gigabyte', 'Corsair', 'Kingston'];
  };

  return (
    <div style={{ paddingTop: '40px' }} className="container">
      <div className="animate-fade-in-up">
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '800', fontFamily: 'Montserrat', textTransform: 'capitalize' }}>
            DANH MỤC: {activeView}
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)', marginTop: '4px' }}>
            Hiển thị {filteredProducts.length} sản phẩm phù hợp.
          </p>
        </div>
        <div style={{ display: 'grid', gap: '30px' }} className="grid-responsive-sidebar catalog-layout">
          <FilterSidebar 
            activeView={activeView}
            onlyInStock={onlyInStock} setOnlyInStock={setOnlyInStock}
            minPrice={minPrice} maxPrice={maxPrice} setMinPrice={setMinPrice} setMaxPrice={setMaxPrice}
            selectedBrands={selectedBrands} setSelectedBrands={setSelectedBrands}
            getCategoryBrands={getCategoryBrands}
            laptopFilters={laptopFilters} setLaptopFilters={setLaptopFilters}
            phoneFilters={phoneFilters} setPhoneFilters={setPhoneFilters}
            gearFilters={gearFilters} setGearFilters={setGearFilters}
            componentFilters={componentFilters} setComponentFilters={setComponentFilters}
          />
          <div>
            {filteredProducts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--color-outline)', background: 'rgba(255,255,255,0.01)', borderRadius: 'var(--rounded-lg)', border: '1px dashed var(--color-surface-dim)' }}>
                <Search size={48} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>Không tìm thấy sản phẩm</h3>
                <p style={{ fontSize: '14px' }}>Thử thay đổi hoặc xóa bớt các bộ lọc để xem thêm kết quả.</p>
                <button onClick={() => {
                  setSelectedBrands([]);
                  setMinPrice(0);
                  setMaxPrice(80000000);
                  setOnlyInStock(false);
                }} style={{ marginTop: '20px', padding: '10px 20px', background: 'var(--color-primary-dim)', color: 'white', border: 'none', borderRadius: 'var(--rounded-md)', cursor: 'pointer' }}>Xóa bộ lọc</button>
              </div>
            ) : (
              <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} onViewDetails={setSelectedProduct} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
