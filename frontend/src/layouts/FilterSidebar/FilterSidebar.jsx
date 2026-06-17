import React from "react";

export default function FilterSidebar({ theme, activeView, onlyInStock, setOnlyInStock, minPrice, maxPrice, setMinPrice, setMaxPrice, selectedBrands, setSelectedBrands, getCategoryBrands, laptopFilters, setLaptopFilters, phoneFilters, setPhoneFilters, gearFilters, setGearFilters, componentFilters, setComponentFilters }) {
  return (
                <aside className="filter-sidebar glass-panel" style={{
                  borderRadius: 'var(--rounded-md)',
                  padding: '20px',
                  height: 'fit-content',
                  position: 'sticky',
                  top: '92px'
                }}>
                  <h3 style={{ fontSize: '14px', fontWeight: '800', borderBottom: theme === 'light' ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.08)', paddingBottom: '10px', marginBottom: '16px', color: 'var(--color-on-surface)' }}>
                    BỘ LỌC TÌM KIẾM
                  </h3>
                  
                  {/* Filter Stock */}
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', color: 'var(--color-on-surface)' }}>
                      <input 
                        type="checkbox" 
                        checked={onlyInStock}
                        onChange={(e) => setOnlyInStock(e.target.checked)}
                        style={{ width: '16px', height: '16px', accentColor: 'var(--color-primary)' }}
                      />
                      <span style={{ userSelect: 'none' }}>Chỉ hàng còn kho</span>
                    </label>
                  </div>

                  {/* 1. LAPTOP FILTERS */}
                  {activeView === 'laptop' && (
                    <>
                      {/* Price Preset */}
                      <div style={{ marginBottom: '14px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px', display: 'block', letterSpacing: '0.5px' }}>
                          Mức Giá
                        </span>
                        <select
                          value={`${minPrice}-${maxPrice}`}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (val === '0-80000000') {
                              setMinPrice(0);
                              setMaxPrice(80000000);
                            } else {
                              const parts = val.split('-');
                              setMinPrice(parseInt(parts[0]));
                              setMaxPrice(parseInt(parts[1]));
                            }
                          }}
                          className="form-input"
                          style={{ width: '100%', padding: '8px', fontSize: '13px', background: 'var(--color-surface-container-lowest)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline-variant)', borderRadius: '4px' }}
                        >
                          <option value="0-80000000">Tất cả mức giá</option>
                          <option value="0-10000000">Dưới 10 triệu</option>
                          <option value="10000000-15000000">10 - 15 triệu</option>
                          <option value="15000000-20000000">15 - 20 triệu</option>
                          <option value="20000000-25000000">20 - 25 triệu</option>
                          <option value="25000000-80000000">Trên 25 triệu</option>
                        </select>
                      </div>

                      {/* Brand */}
                      <div style={{ marginBottom: '14px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px', display: 'block', letterSpacing: '0.5px' }}>
                          Thương Hiệu
                        </span>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          {getCategoryBrands().map((brand) => {
                            const isChecked = selectedBrands.includes(brand);
                            return (
                              <label key={brand} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px' }}>
                                <input 
                                  type="checkbox" 
                                  checked={isChecked}
                                  onChange={() => {
                                    if (isChecked) {
                                      setSelectedBrands(prev => prev.filter(b => b !== brand));
                                    } else {
                                      setSelectedBrands(prev => [...prev, brand]);
                                    }
                                  }}
                                  style={{ width: '16px', height: '16px', accentColor: 'var(--color-primary)' }}
                                />
                                <span style={{ color: isChecked ? 'var(--color-primary)' : 'var(--color-on-surface-variant)', userSelect: 'none' }}>
                                  {brand}
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      </div>

                      {/* Usage */}
                      <div style={{ marginBottom: '14px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px', display: 'block', letterSpacing: '0.5px' }}>
                          Nhu Cầu Sử Dụng
                        </span>
                        <select
                          value={laptopFilters.usage}
                          onChange={(e) => setLaptopFilters(prev => ({ ...prev, usage: e.target.value }))}
                          className="form-input"
                          style={{ width: '100%', padding: '8px', fontSize: '13px', background: 'var(--color-surface-container-lowest)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline-variant)', borderRadius: '4px' }}
                        >
                          <option value="">Tất cả nhu cầu</option>
                          <option value="office">Học tập - Văn phòng</option>
                          <option value="gaming">Gaming</option>
                          <option value="graphics">Đồ họa - Kỹ thuật</option>
                          <option value="thin">Mỏng nhẹ - Cao cấp</option>
                        </select>
                      </div>

                      {/* CPU */}
                      <div style={{ marginBottom: '14px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px', display: 'block', letterSpacing: '0.5px' }}>
                          CPU
                        </span>
                        <select
                          value={laptopFilters.cpu}
                          onChange={(e) => setLaptopFilters(prev => ({ ...prev, cpu: e.target.value }))}
                          className="form-input"
                          style={{ width: '100%', padding: '8px', fontSize: '13px', background: 'var(--color-surface-container-lowest)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline-variant)', borderRadius: '4px' }}
                        >
                          <option value="">Tất cả CPU</option>
                          <option value="intel-i3">Intel Core i3</option>
                          <option value="intel-i5">Intel Core i5</option>
                          <option value="intel-i7">Intel Core i7</option>
                          <option value="intel-i9">Intel Core i9</option>
                          <option value="amd-r3">AMD Ryzen 3</option>
                          <option value="amd-r5">AMD Ryzen 5</option>
                          <option value="amd-r7">AMD Ryzen 7</option>
                          <option value="amd-r9">AMD Ryzen 9</option>
                          <option value="apple-m">Apple M-series</option>
                        </select>
                      </div>

                      {/* RAM */}
                      <div style={{ marginBottom: '14px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px', display: 'block', letterSpacing: '0.5px' }}>
                          Dung Lượng RAM
                        </span>
                        <select
                          value={laptopFilters.ram}
                          onChange={(e) => setLaptopFilters(prev => ({ ...prev, ram: e.target.value }))}
                          className="form-input"
                          style={{ width: '100%', padding: '8px', fontSize: '13px', background: 'var(--color-surface-container-lowest)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline-variant)', borderRadius: '4px' }}
                        >
                          <option value="">Tất cả RAM</option>
                          <option value="4gb">4GB</option>
                          <option value="8gb">8GB</option>
                          <option value="16gb">16GB</option>
                          <option value="32gb">32GB trở lên</option>
                        </select>
                      </div>

                      {/* Storage */}
                      <div style={{ marginBottom: '14px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px', display: 'block', letterSpacing: '0.5px' }}>
                          Ổ Cứng (Lưu Trữ)
                        </span>
                        <select
                          value={laptopFilters.storage}
                          onChange={(e) => setLaptopFilters(prev => ({ ...prev, storage: e.target.value }))}
                          className="form-input"
                          style={{ width: '100%', padding: '8px', fontSize: '13px', background: 'var(--color-surface-container-lowest)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline-variant)', borderRadius: '4px' }}
                        >
                          <option value="">Tất cả ổ cứng</option>
                          <option value="256gb">SSD 256GB</option>
                          <option value="512gb">SSD 512GB</option>
                          <option value="1tb">SSD 1TB trở lên</option>
                        </select>
                      </div>

                      {/* GPU */}
                      <div style={{ marginBottom: '14px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px', display: 'block', letterSpacing: '0.5px' }}>
                          Card Đồ Họa (VGA)
                        </span>
                        <select
                          value={laptopFilters.gpu}
                          onChange={(e) => setLaptopFilters(prev => ({ ...prev, gpu: e.target.value }))}
                          className="form-input"
                          style={{ width: '100%', padding: '8px', fontSize: '13px', background: 'var(--color-surface-container-lowest)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline-variant)', borderRadius: '4px' }}
                        >
                          <option value="">Tất cả VGA</option>
                          <option value="onboard">Card Onboard (Tích hợp)</option>
                          <option value="nvidia">NVIDIA (GTX/RTX)</option>
                          <option value="amd">AMD Radeon</option>
                        </select>
                      </div>

                      {/* Screen Size */}
                      <div style={{ marginBottom: '14px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px', display: 'block', letterSpacing: '0.5px' }}>
                          Kích Thước Màn Hình
                        </span>
                        <select
                          value={laptopFilters.screenSize}
                          onChange={(e) => setLaptopFilters(prev => ({ ...prev, screenSize: e.target.value }))}
                          className="form-input"
                          style={{ width: '100%', padding: '8px', fontSize: '13px', background: 'var(--color-surface-container-lowest)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline-variant)', borderRadius: '4px' }}
                        >
                          <option value="">Tất cả kích thước</option>
                          <option value="13">Khoảng 13 inch</option>
                          <option value="14">Khoảng 14 inch</option>
                          <option value="15">Khoảng 15.6 inch</option>
                          <option value="16">16 inch trở lên</option>
                        </select>
                      </div>

                      {/* Screen Hz */}
                      <div style={{ marginBottom: '20px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px', display: 'block', letterSpacing: '0.5px' }}>
                          Tần Số Quét Màn Hình
                        </span>
                        <select
                          value={laptopFilters.screenHz}
                          onChange={(e) => setLaptopFilters(prev => ({ ...prev, screenHz: e.target.value }))}
                          className="form-input"
                          style={{ width: '100%', padding: '8px', fontSize: '13px', background: 'var(--color-surface-container-lowest)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline-variant)', borderRadius: '4px' }}
                        >
                          <option value="">Tất cả tần số quét</option>
                          <option value="60">60Hz</option>
                          <option value="90">90Hz</option>
                          <option value="120">120Hz</option>
                          <option value="144">144Hz</option>
                          <option value="165">165Hz trở lên</option>
                        </select>
                      </div>
                    </>
                  )}

                  {/* 2. PHONE FILTERS */}
                  {activeView === 'điện thoại' && (
                    <>
                      {/* Price Preset */}
                      <div style={{ marginBottom: '14px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px', display: 'block', letterSpacing: '0.5px' }}>
                          Mức Giá
                        </span>
                        <select
                          value={`${minPrice}-${maxPrice}`}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (val === '0-80000000') {
                              setMinPrice(0);
                              setMaxPrice(80000000);
                            } else {
                              const parts = val.split('-');
                              setMinPrice(parseInt(parts[0]));
                              setMaxPrice(parseInt(parts[1]));
                            }
                          }}
                          className="form-input"
                          style={{ width: '100%', padding: '8px', fontSize: '13px', background: 'var(--color-surface-container-lowest)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline-variant)', borderRadius: '4px' }}
                        >
                          <option value="0-80000000">Tất cả mức giá</option>
                          <option value="0-2000000">Dưới 2 triệu</option>
                          <option value="2000000-4000000">2 - 4 triệu</option>
                          <option value="4000000-7000000">4 - 7 triệu</option>
                          <option value="7000000-13000000">7 - 13 triệu</option>
                          <option value="13000000-20000000">13 - 20 triệu</option>
                          <option value="20000000-80000000">Trên 20 triệu</option>
                        </select>
                      </div>

                      {/* Brand */}
                      <div style={{ marginBottom: '14px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px', display: 'block', letterSpacing: '0.5px' }}>
                          Thương Hiệu
                        </span>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          {getCategoryBrands().map((brand) => {
                            const isChecked = selectedBrands.includes(brand);
                            return (
                              <label key={brand} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px' }}>
                                <input 
                                  type="checkbox" 
                                  checked={isChecked}
                                  onChange={() => {
                                    if (isChecked) {
                                      setSelectedBrands(prev => prev.filter(b => b !== brand));
                                    } else {
                                      setSelectedBrands(prev => [...prev, brand]);
                                    }
                                  }}
                                  style={{ width: '16px', height: '16px', accentColor: 'var(--color-primary)' }}
                                />
                                <span style={{ color: isChecked ? 'var(--color-primary)' : 'var(--color-on-surface-variant)', userSelect: 'none' }}>
                                  {brand}
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      </div>

                      {/* OS */}
                      <div style={{ marginBottom: '14px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px', display: 'block', letterSpacing: '0.5px' }}>
                          Hệ Điều Hành
                        </span>
                        <select
                          value={phoneFilters.os}
                          onChange={(e) => setPhoneFilters(prev => ({ ...prev, os: e.target.value }))}
                          className="form-input"
                          style={{ width: '100%', padding: '8px', fontSize: '13px', background: 'var(--color-surface-container-lowest)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline-variant)', borderRadius: '4px' }}
                        >
                          <option value="">Tất cả HĐH</option>
                          <option value="ios">iOS</option>
                          <option value="android">Android</option>
                        </select>
                      </div>

                      {/* ROM */}
                      <div style={{ marginBottom: '14px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px', display: 'block', letterSpacing: '0.5px' }}>
                          Dung Lượng ROM
                        </span>
                        <select
                          value={phoneFilters.rom}
                          onChange={(e) => setPhoneFilters(prev => ({ ...prev, rom: e.target.value }))}
                          className="form-input"
                          style={{ width: '100%', padding: '8px', fontSize: '13px', background: 'var(--color-surface-container-lowest)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline-variant)', borderRadius: '4px' }}
                        >
                          <option value="">Tất cả bộ nhớ</option>
                          <option value="64GB">64GB</option>
                          <option value="128GB">128GB</option>
                          <option value="256GB">256GB</option>
                          <option value="512GB">512GB</option>
                          <option value="1TB">1TB</option>
                        </select>
                      </div>

                      {/* RAM */}
                      <div style={{ marginBottom: '14px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px', display: 'block', letterSpacing: '0.5px' }}>
                          Dung Lượng RAM
                        </span>
                        <select
                          value={phoneFilters.ram}
                          onChange={(e) => setPhoneFilters(prev => ({ ...prev, ram: e.target.value }))}
                          className="form-input"
                          style={{ width: '100%', padding: '8px', fontSize: '13px', background: 'var(--color-surface-container-lowest)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline-variant)', borderRadius: '4px' }}
                        >
                          <option value="">Tất cả RAM</option>
                          <option value="4gb">4GB</option>
                          <option value="6gb">6GB</option>
                          <option value="8gb">8GB</option>
                          <option value="12gb">12GB trở lên</option>
                        </select>
                      </div>

                      {/* Screen Size */}
                      <div style={{ marginBottom: '14px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px', display: 'block', letterSpacing: '0.5px' }}>
                          Đặc Điểm Màn Hình
                        </span>
                        <select
                          value={phoneFilters.screenSize}
                          onChange={(e) => setPhoneFilters(prev => ({ ...prev, screenSize: e.target.value }))}
                          className="form-input"
                          style={{ width: '100%', padding: '8px', fontSize: '13px', background: 'var(--color-surface-container-lowest)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline-variant)', borderRadius: '4px' }}
                        >
                          <option value="">Tất cả màn hình</option>
                          <option value="small">Dưới 6 inch (Nhỏ gọn)</option>
                          <option value="large">Trên 6 inch</option>
                          <option value="fold">Màn hình gập</option>
                        </select>
                      </div>

                      {/* Features */}
                      <div style={{ marginBottom: '14px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px', display: 'block', letterSpacing: '0.5px' }}>
                          Tính Năng Đặc Biệt
                        </span>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          {[
                            { id: '5g', label: 'Hỗ trợ mạng 5G' },
                            { id: 'fast', label: 'Sạc siêu nhanh' },
                            { id: 'waterproof', label: 'Kháng nước/bụi' },
                            { id: 'ois', label: 'Chống rung OIS' }
                          ].map(feat => {
                            const isChecked = phoneFilters.features.includes(feat.id);
                            return (
                              <label key={feat.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px' }}>
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() => {
                                    if (isChecked) {
                                      setPhoneFilters(prev => ({ ...prev, features: prev.features.filter(f => f !== feat.id) }));
                                    } else {
                                      setPhoneFilters(prev => ({ ...prev, features: [...prev.features, feat.id] }));
                                    }
                                  }}
                                  style={{ width: '16px', height: '16px', accentColor: 'var(--color-primary)' }}
                                />
                                <span style={{ color: isChecked ? 'var(--color-primary)' : 'var(--color-on-surface-variant)', userSelect: 'none' }}>
                                  {feat.label}
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      </div>

                      {/* Battery */}
                      <div style={{ marginBottom: '20px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px', display: 'block', letterSpacing: '0.5px' }}>
                          Dung Lượng Pin
                        </span>
                        <select
                          value={phoneFilters.battery}
                          onChange={(e) => setPhoneFilters(prev => ({ ...prev, battery: e.target.value }))}
                          className="form-input"
                          style={{ width: '100%', padding: '8px', fontSize: '13px', background: 'var(--color-surface-container-lowest)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline-variant)', borderRadius: '4px' }}
                        >
                          <option value="">Tất cả dung lượng</option>
                          <option value="under4000">Dưới 4000 mAh</option>
                          <option value="4000to5000">4000 - 5000 mAh</option>
                          <option value="over5000">Trên 5000 mAh</option>
                        </select>
                      </div>
                    </>
                  )}

                  {/* 3. GAMING GEAR FILTERS */}
                  {activeView === 'gaming gear' && (
                    <>
                      {/* Price Preset */}
                      <div style={{ marginBottom: '14px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px', display: 'block', letterSpacing: '0.5px' }}>
                          Mức Giá
                        </span>
                        <select
                          value={`${minPrice}-${maxPrice}`}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (val === '0-80000000') {
                              setMinPrice(0);
                              setMaxPrice(80000000);
                            } else {
                              const parts = val.split('-');
                              setMinPrice(parseInt(parts[0]));
                              setMaxPrice(parseInt(parts[1]));
                            }
                          }}
                          className="form-input"
                          style={{ width: '100%', padding: '8px', fontSize: '13px', background: 'var(--color-surface-container-lowest)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline-variant)', borderRadius: '4px' }}
                        >
                          <option value="0-80000000">Tất cả mức giá</option>
                          <option value="0-1000000">Dưới 1 triệu</option>
                          <option value="1000000-3000000">1 - 3 triệu</option>
                          <option value="3000000-5000000">3 - 5 triệu</option>
                          <option value="5000000-80000000">Trên 5 triệu</option>
                        </select>
                      </div>

                      {/* Brand */}
                      <div style={{ marginBottom: '14px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px', display: 'block', letterSpacing: '0.5px' }}>
                          Thương Hiệu
                        </span>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          {getCategoryBrands().map((brand) => {
                            const isChecked = selectedBrands.includes(brand);
                            return (
                              <label key={brand} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px' }}>
                                <input 
                                  type="checkbox" 
                                  checked={isChecked}
                                  onChange={() => {
                                    if (isChecked) {
                                      setSelectedBrands(prev => prev.filter(b => b !== brand));
                                    } else {
                                      setSelectedBrands(prev => [...prev, brand]);
                                    }
                                  }}
                                  style={{ width: '16px', height: '16px', accentColor: 'var(--color-primary)' }}
                                />
                                <span style={{ color: isChecked ? 'var(--color-primary)' : 'var(--color-on-surface-variant)', userSelect: 'none' }}>
                                  {brand}
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      </div>

                      {/* Product Type */}
                      <div style={{ marginBottom: '14px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px', display: 'block', letterSpacing: '0.5px' }}>
                          Loại Sản Phẩm
                        </span>
                        <select
                          value={gearFilters.type}
                          onChange={(e) => setGearFilters(prev => ({ ...prev, type: e.target.value }))}
                          className="form-input"
                          style={{ width: '100%', padding: '8px', fontSize: '13px', background: 'var(--color-surface-container-lowest)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline-variant)', borderRadius: '4px' }}
                        >
                          <option value="">Tất cả Gaming Gear</option>
                          <option value="keyboard">Bàn phím cơ</option>
                          <option value="mouse">Chuột gaming</option>
                          <option value="headset">Tai nghe</option>
                          <option value="mousepad">Lót chuột (Mousepad)</option>
                          <option value="gamepad">Tay cầm (Gamepad)</option>
                        </select>
                      </div>

                      {/* Connection */}
                      <div style={{ marginBottom: '14px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px', display: 'block', letterSpacing: '0.5px' }}>
                          Kết Nối
                        </span>
                        <select
                          value={gearFilters.connection}
                          onChange={(e) => setGearFilters(prev => ({ ...prev, connection: e.target.value }))}
                          className="form-input"
                          style={{ width: '100%', padding: '8px', fontSize: '13px', background: 'var(--color-surface-container-lowest)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline-variant)', borderRadius: '4px' }}
                        >
                          <option value="">Tất cả kết nối</option>
                          <option value="wired">Có dây (Type-C/USB)</option>
                          <option value="wireless">Không dây (Bluetooth)</option>
                          <option value="2.4g">Wireless 2.4GHz</option>
                        </select>
                      </div>

                      {/* LED */}
                      <div style={{ marginBottom: '14px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px', display: 'block', letterSpacing: '0.5px' }}>
                          Hệ Thống LED
                        </span>
                        <select
                          value={gearFilters.led}
                          onChange={(e) => setGearFilters(prev => ({ ...prev, led: e.target.value }))}
                          className="form-input"
                          style={{ width: '100%', padding: '8px', fontSize: '13px', background: 'var(--color-surface-container-lowest)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline-variant)', borderRadius: '4px' }}
                        >
                          <option value="">Tất cả hệ thống LED</option>
                          <option value="no">Không LED</option>
                          <option value="single">LED đơn sắc</option>
                          <option value="rgb">LED RGB</option>
                        </select>
                      </div>

                      {/* Dynamic Keyboard Filters */}
                      {gearFilters.type === 'keyboard' && (
                        <>
                          <div style={{ marginBottom: '14px' }}>
                            <span style={{ fontSize: '11px', color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px', display: 'block', letterSpacing: '0.5px' }}>
                              Loại Switch
                            </span>
                            <select
                              value={gearFilters.keyboardSwitch}
                              onChange={(e) => setGearFilters(prev => ({ ...prev, keyboardSwitch: e.target.value }))}
                              className="form-input"
                              style={{ width: '100%', padding: '8px', fontSize: '13px', background: 'var(--color-surface-container-lowest)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline-variant)', borderRadius: '4px' }}
                            >
                              <option value="">Tất cả Switch</option>
                              <option value="blue">Blue (Clicky)</option>
                              <option value="red">Red (Linear)</option>
                              <option value="brown">Brown (Tactile)</option>
                              <option value="custom">Custom Switch</option>
                            </select>
                          </div>
                          <div style={{ marginBottom: '20px' }}>
                            <span style={{ fontSize: '11px', color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px', display: 'block', letterSpacing: '0.5px' }}>
                              Kích Thước (Layout)
                            </span>
                            <select
                              value={gearFilters.keyboardLayout}
                              onChange={(e) => setGearFilters(prev => ({ ...prev, keyboardLayout: e.target.value }))}
                              className="form-input"
                              style={{ width: '100%', padding: '8px', fontSize: '13px', background: 'var(--color-surface-container-lowest)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline-variant)', borderRadius: '4px' }}
                            >
                              <option value="">Tất cả Layout</option>
                              <option value="fullsize">Fullsize (104/108 phím)</option>
                              <option value="tkl">TKL (87 phím)</option>
                              <option value="75">75%</option>
                              <option value="60">60-65%</option>
                            </select>
                          </div>
                        </>
                      )}

                      {/* Dynamic Mouse Filters */}
                      {gearFilters.type === 'mouse' && (
                        <>
                          <div style={{ marginBottom: '14px' }}>
                            <span style={{ fontSize: '11px', color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px', display: 'block', letterSpacing: '0.5px' }}>
                              Trọng Lượng
                            </span>
                            <select
                              value={gearFilters.mouseWeight}
                              onChange={(e) => setGearFilters(prev => ({ ...prev, mouseWeight: e.target.value }))}
                              className="form-input"
                              style={{ width: '100%', padding: '8px', fontSize: '13px', background: 'var(--color-surface-container-lowest)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline-variant)', borderRadius: '4px' }}
                            >
                              <option value="">Tất cả trọng lượng</option>
                              <option value="light">Siêu nhẹ (Dưới 70g)</option>
                              <option value="standard">Tiêu chuẩn</option>
                            </select>
                          </div>
                          <div style={{ marginBottom: '20px' }}>
                            <span style={{ fontSize: '11px', color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px', display: 'block', letterSpacing: '0.5px' }}>
                              DPI Tối Đa
                            </span>
                            <select
                              value={gearFilters.mouseDpi}
                              onChange={(e) => setGearFilters(prev => ({ ...prev, mouseDpi: e.target.value }))}
                              className="form-input"
                              style={{ width: '100%', padding: '8px', fontSize: '13px', background: 'var(--color-surface-container-lowest)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline-variant)', borderRadius: '4px' }}
                            >
                              <option value="">Tất cả mức DPI</option>
                              <option value="under10k">Dưới 10.000</option>
                              <option value="10k20k">10.000 - 20.000</option>
                              <option value="over20k">Trên 20.000</option>
                            </select>
                          </div>
                        </>
                      )}
                    </>
                  )}

                  {/* 4. PC COMPONENT FILTERS */}
                  {activeView === 'linh kiện' && (
                    <>
                      {/* Price Preset */}
                      <div style={{ marginBottom: '14px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px', display: 'block', letterSpacing: '0.5px' }}>
                          Mức Giá
                        </span>
                        <select
                          value={`${minPrice}-${maxPrice}`}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (val === '0-80000000') {
                              setMinPrice(0);
                              setMaxPrice(80000000);
                            } else {
                              const parts = val.split('-');
                              setMinPrice(parseInt(parts[0]));
                              setMaxPrice(parseInt(parts[1]));
                            }
                          }}
                          className="form-input"
                          style={{ width: '100%', padding: '8px', fontSize: '13px', background: 'var(--color-surface-container-lowest)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline-variant)', borderRadius: '4px' }}
                        >
                          <option value="0-80000000">Tất cả mức giá</option>
                          <option value="0-3000000">Dưới 3 triệu</option>
                          <option value="3000000-8000000">3 - 8 triệu</option>
                          <option value="8000000-15000000">8 - 15 triệu</option>
                          <option value="15000000-80000000">Trên 15 triệu</option>
                        </select>
                      </div>

                      {/* Brand */}
                      <div style={{ marginBottom: '14px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px', display: 'block', letterSpacing: '0.5px' }}>
                          Thương Hiệu
                        </span>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          {getCategoryBrands().map((brand) => {
                            const isChecked = selectedBrands.includes(brand);
                            return (
                              <label key={brand} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px' }}>
                                <input 
                                  type="checkbox" 
                                  checked={isChecked}
                                  onChange={() => {
                                    if (isChecked) {
                                      setSelectedBrands(prev => prev.filter(b => b !== brand));
                                    } else {
                                      setSelectedBrands(prev => [...prev, brand]);
                                    }
                                  }}
                                  style={{ width: '16px', height: '16px', accentColor: 'var(--color-primary)' }}
                                />
                                <span style={{ color: isChecked ? 'var(--color-primary)' : 'var(--color-on-surface-variant)', userSelect: 'none' }}>
                                  {brand}
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      </div>

                      {/* Component Type */}
                      <div style={{ marginBottom: '14px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px', display: 'block', letterSpacing: '0.5px' }}>
                          Loại Linh Kiện
                        </span>
                        <select
                          value={componentFilters.type}
                          onChange={(e) => setComponentFilters(prev => ({ ...prev, type: e.target.value }))}
                          className="form-input"
                          style={{ width: '100%', padding: '8px', fontSize: '13px', background: 'var(--color-surface-container-lowest)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline-variant)', borderRadius: '4px' }}
                        >
                          <option value="">Tất cả linh kiện</option>
                          <option value="cpu">CPU</option>
                          <option value="motherboard">Mainboard (Bo mạch chủ)</option>
                          <option value="ram">RAM</option>
                          <option value="vga">VGA (Card màn hình)</option>
                          <option value="ssd">Ổ cứng (SSD/HDD)</option>
                          <option value="psu">Nguồn (PSU)</option>
                          <option value="cooler">Tản nhiệt</option>
                          <option value="case">Vỏ case</option>
                        </select>
                      </div>

                      {/* Dynamic CPU & Mainboard Filters */}
                      {(componentFilters.type === 'cpu' || componentFilters.type === 'motherboard') && (
                        <>
                          <div style={{ marginBottom: '14px' }}>
                            <span style={{ fontSize: '11px', color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px', display: 'block', letterSpacing: '0.5px' }}>
                              Socket
                            </span>
                            <select
                              value={componentFilters.socket}
                              onChange={(e) => setComponentFilters(prev => ({ ...prev, socket: e.target.value }))}
                              className="form-input"
                              style={{ width: '100%', padding: '8px', fontSize: '13px', background: 'var(--color-surface-container-lowest)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline-variant)', borderRadius: '4px' }}
                            >
                              <option value="">Tất cả Socket</option>
                              <option value="lga1700">LGA 1700</option>
                              <option value="lga1200">LGA 1200</option>
                              <option value="am4">AM4</option>
                              <option value="am5">AM5</option>
                            </select>
                          </div>
                          {componentFilters.type === 'motherboard' && (
                            <div style={{ marginBottom: '20px' }}>
                              <span style={{ fontSize: '11px', color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px', display: 'block', letterSpacing: '0.5px' }}>
                                Chipset
                              </span>
                              <select
                                value={componentFilters.chipset}
                                onChange={(e) => setComponentFilters(prev => ({ ...prev, chipset: e.target.value }))}
                                className="form-input"
                                style={{ width: '100%', padding: '8px', fontSize: '13px', background: 'var(--color-surface-container-lowest)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline-variant)', borderRadius: '4px' }}
                              >
                                <option value="">Tất cả Chipset</option>
                                <option value="h-series">H-series</option>
                                <option value="b-series">B-series</option>
                                <option value="z-series">Z-series</option>
                                <option value="x-series">X-series</option>
                              </select>
                            </div>
                          )}
                        </>
                      )}

                      {/* Dynamic RAM Filters */}
                      {componentFilters.type === 'ram' && (
                        <>
                          <div style={{ marginBottom: '14px' }}>
                            <span style={{ fontSize: '11px', color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px', display: 'block', letterSpacing: '0.5px' }}>
                              Chuẩn RAM
                            </span>
                            <select
                              value={componentFilters.ramStandard}
                              onChange={(e) => setComponentFilters(prev => ({ ...prev, ramStandard: e.target.value }))}
                              className="form-input"
                              style={{ width: '100%', padding: '8px', fontSize: '13px', background: 'var(--color-surface-container-lowest)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline-variant)', borderRadius: '4px' }}
                            >
                              <option value="">Tất cả chuẩn RAM</option>
                              <option value="ddr4">DDR4</option>
                              <option value="ddr5">DDR5</option>
                            </select>
                          </div>
                          <div style={{ marginBottom: '20px' }}>
                            <span style={{ fontSize: '11px', color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px', display: 'block', letterSpacing: '0.5px' }}>
                              Tốc Độ Bus
                            </span>
                            <select
                              value={componentFilters.ramBus}
                              onChange={(e) => setComponentFilters(prev => ({ ...prev, ramBus: e.target.value }))}
                              className="form-input"
                              style={{ width: '100%', padding: '8px', fontSize: '13px', background: 'var(--color-surface-container-lowest)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline-variant)', borderRadius: '4px' }}
                            >
                              <option value="">Tất cả tốc độ Bus</option>
                              <option value="3200">3200MHz</option>
                              <option value="4800">4800MHz</option>
                              <option value="5600">5600MHz</option>
                              <option value="6000">6000MHz</option>
                            </select>
                          </div>
                        </>
                      )}

                      {/* Dynamic VGA Filters */}
                      {componentFilters.type === 'vga' && (
                        <>
                          <div style={{ marginBottom: '14px' }}>
                            <span style={{ fontSize: '11px', color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px', display: 'block', letterSpacing: '0.5px' }}>
                              Chip Đồ Họa
                            </span>
                            <select
                              value={componentFilters.vgaBrand}
                              onChange={(e) => setComponentFilters(prev => ({ ...prev, vgaBrand: e.target.value }))}
                              className="form-input"
                              style={{ width: '100%', padding: '8px', fontSize: '13px', background: 'var(--color-surface-container-lowest)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline-variant)', borderRadius: '4px' }}
                            >
                              <option value="">Tất cả Chip đồ họa</option>
                              <option value="nvidia">NVIDIA</option>
                              <option value="amd">AMD</option>
                            </select>
                          </div>
                          <div style={{ marginBottom: '20px' }}>
                            <span style={{ fontSize: '11px', color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px', display: 'block', letterSpacing: '0.5px' }}>
                              Dung Lượng VRAM
                            </span>
                            <select
                              value={componentFilters.vgaVram}
                              onChange={(e) => setComponentFilters(prev => ({ ...prev, vgaVram: e.target.value }))}
                              className="form-input"
                              style={{ width: '100%', padding: '8px', fontSize: '13px', background: 'var(--color-surface-container-lowest)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline-variant)', borderRadius: '4px' }}
                            >
                              <option value="">Tất cả VRAM</option>
                              <option value="4gb">4GB</option>
                              <option value="8gb">8GB</option>
                              <option value="12gb">12GB</option>
                              <option value="16gb">16GB trở lên</option>
                            </select>
                          </div>
                        </>
                      )}

                      {/* Dynamic PSU Filters */}
                      {componentFilters.type === 'psu' && (
                        <>
                          <div style={{ marginBottom: '14px' }}>
                            <span style={{ fontSize: '11px', color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px', display: 'block', letterSpacing: '0.5px' }}>
                              Công Suất
                            </span>
                            <select
                              value={componentFilters.psuPower}
                              onChange={(e) => setComponentFilters(prev => ({ ...prev, psuPower: e.target.value }))}
                              className="form-input"
                              style={{ width: '100%', padding: '8px', fontSize: '13px', background: 'var(--color-surface-container-lowest)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline-variant)', borderRadius: '4px' }}
                            >
                              <option value="">Tất cả công suất</option>
                              <option value="under500">Dưới 500W</option>
                              <option value="500to650">500W - 650W</option>
                              <option value="700to850">700W - 850W</option>
                              <option value="over850">Trên 850W</option>
                            </select>
                          </div>
                          <div style={{ marginBottom: '20px' }}>
                            <span style={{ fontSize: '11px', color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px', display: 'block', letterSpacing: '0.5px' }}>
                              Chuẩn Hiệu Suất
                            </span>
                            <select
                              value={componentFilters.psuEfficiency}
                              onChange={(e) => setComponentFilters(prev => ({ ...prev, psuEfficiency: e.target.value }))}
                              className="form-input"
                              style={{ width: '100%', padding: '8px', fontSize: '13px', background: 'var(--color-surface-container-lowest)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline-variant)', borderRadius: '4px' }}
                            >
                              <option value="">Tất cả chuẩn hiệu suất</option>
                              <option value="white">80 Plus White</option>
                              <option value="bronze">80 Plus Bronze</option>
                              <option value="gold">80 Plus Gold</option>
                              <option value="platinum">80 Plus Platinum</option>
                            </select>
                          </div>
                        </>
                      )}
                    </>
                  )}

                  {/* Reset Filters button */}
                  <div style={{ marginTop: '16px' }}>
                    <button 
                      onClick={() => {
                        setSelectedBrands([]);
                        setMinPrice(0);
                        setMaxPrice(80000000);
                        setOnlyInStock(false);
                        setLaptopFilters({
                          usage: '',
                          cpu: '',
                          ram: '',
                          storage: '',
                          gpu: '',
                          screenSize: '',
                          screenHz: ''
                        });
                        setPhoneFilters({
                          os: '',
                          rom: '',
                          ram: '',
                          screenSize: '',
                          features: [],
                          battery: ''
                        });
                        setGearFilters({
                          type: '',
                          connection: '',
                          led: '',
                          keyboardSwitch: '',
                          keyboardLayout: '',
                          mouseWeight: '',
                          mouseDpi: ''
                        });
                        setComponentFilters({
                          type: '',
                          socket: '',
                          chipset: '',
                          ramStandard: '',
                          ramBus: '',
                          vgaBrand: '',
                          vgaVram: '',
                          psuPower: '',
                          psuEfficiency: ''
                        });
                      }}
                      className="btn btn-outline"
                      style={{ width: '100%', padding: '8px', fontSize: '12px' }}
                    >
                      Xóa bộ lọc
                    </button>
                  </div>
                </aside>
  );
}
