import React, { useState, useEffect } from 'react';
import PCBuilderModal from './PCBuilderModal';
import '../../styles/components/modal.css';
import '../../styles/components/pcbuilder.css';
import { createPortal } from 'react-dom';
import { Check, AlertTriangle, Cpu, Wrench, ShoppingCart, RefreshCw, Layers, Search, X, Filter } from 'lucide-react';
import { builderParts } from '../../mockData';

export default function PCBuilder({ onAddPartsToCart }) {
  const [selectedParts, setSelectedParts] = useState({
    cpu: null,
    motherboard: null,
    ram: null,
    gpu: null,
    ssd: null,
    psu: null,
    cooler: null,
    pcCase: null
  });

  const [activeModalCat, setActiveModalCat] = useState(null);
  const [modalSearchQuery, setModalSearchQuery] = useState('');
  const [compatibilities, setCompatibilities] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalWattage, setTotalWattage] = useState(0);

  // Selection Modal Detailed Filters
  const [filterPriceMin, setFilterPriceMin] = useState(0);
  const [filterPriceMax, setFilterPriceMax] = useState(80000000);
  const [filterSelectedBrand, setFilterSelectedBrand] = useState('all');
  const [filterSelectedColor, setFilterSelectedColor] = useState('all'); // 'all', 'Đen', 'Trắng'
  const [filterSocket, setFilterSocket] = useState('all');
  const [filterRamType, setFilterRamType] = useState('all');

  const handleOpenModal = (catId) => {
    setActiveModalCat(catId);
    setModalSearchQuery('');

    // Reset filters to defaults
    setFilterPriceMin(0);
    setFilterPriceMax(80000000);
    setFilterSelectedColor('all');
    setFilterSelectedBrand('all');

    // Smart auto-filters based on compatibility rules
    if (catId === 'cpu') {
      if (selectedParts.motherboard) {
        setFilterSocket(selectedParts.motherboard.socket);
      } else {
        setFilterSocket('all');
      }
      setFilterRamType('all');
    } else if (catId === 'motherboard') {
      if (selectedParts.cpu) {
        setFilterSocket(selectedParts.cpu.socket);
      } else {
        setFilterSocket('all');
      }
      if (selectedParts.ram) {
        setFilterRamType(selectedParts.ram.ramType);
      } else {
        setFilterRamType('all');
      }
    } else if (catId === 'ram') {
      if (selectedParts.motherboard) {
        setFilterRamType(selectedParts.motherboard.ramType);
      } else {
        setFilterRamType('all');
      }
      setFilterSocket('all');
    } else {
      setFilterSocket('all');
      setFilterRamType('all');
    }
  };

  const categories = [
    { id: 'cpu', name: 'Bộ Vi Xử Lý (CPU)', icon: Cpu, db: builderParts.cpu },
    { id: 'motherboard', name: 'Bo Mạch Chủ (Mainboard)', icon: Layers, db: builderParts.motherboard },
    { id: 'ram', name: 'Bộ Nhớ Trong (RAM)', icon: Layers, db: builderParts.ram },
    { id: 'gpu', name: 'Card Đồ Họa (VGA)', icon: Cpu, db: builderParts.gpu },
    { id: 'ssd', name: 'Ổ Cứng (SSD)', icon: Layers, db: builderParts.ssd },
    { id: 'psu', name: 'Nguồn Máy Tính (PSU)', icon: Layers, db: builderParts.psu },
    { id: 'cooler', name: 'Tản Nhiệt (Cooler)', icon: Layers, db: builderParts.cooler },
    { id: 'pcCase', name: 'Vỏ Máy Tính (Case)', icon: Layers, db: builderParts.pcCase },
  ];

  // Recalculate price, wattage, and check compatibility rules
  useEffect(() => {
    let priceSum = 0;
    let wattSum = 60; // Base wattage
    const rules = [];

    // Sum price and wattage
    Object.keys(selectedParts).forEach(cat => {
      const part = selectedParts[cat];
      if (part) {
        priceSum += part.price;
        if (part.wattage) wattSum += part.wattage;
      }
    });

    setTotalPrice(priceSum);
    setTotalWattage(wattSum);

    // 1. CPU & Motherboard Socket match
    if (selectedParts.cpu && selectedParts.motherboard) {
      if (selectedParts.cpu.socket !== selectedParts.motherboard.socket) {
        rules.push({
          type: 'error',
          message: `Lỗi socket: CPU dùng Socket ${selectedParts.cpu.socket} không tương thích với socket ${selectedParts.motherboard.socket} của Mainboard.`
        });
      } else {
        rules.push({
          type: 'success',
          message: `Socket tương thích: CPU và Mainboard đều dùng chung Socket ${selectedParts.cpu.socket}.`
        });
      }
    }

    // 2. Motherboard & RAM Type match
    if (selectedParts.motherboard && selectedParts.ram) {
      if (selectedParts.motherboard.ramType !== selectedParts.ram.ramType) {
        rules.push({
          type: 'error',
          message: `Lỗi RAM: Mainboard hỗ trợ ${selectedParts.motherboard.ramType} nhưng bạn đang chọn RAM ${selectedParts.ram.ramType}.`
        });
      } else {
        rules.push({
          type: 'success',
          message: `Bộ nhớ tương thích: RAM và Mainboard đều hỗ trợ chuẩn kết nối ${selectedParts.ram.ramType}.`
        });
      }
    }

    // 3. VGA & Case Length check
    if (selectedParts.gpu && selectedParts.pcCase) {
      if (selectedParts.gpu.length > selectedParts.pcCase.maxGpuLength) {
        rules.push({
          type: 'error',
          message: `Lỗi kích thước VGA: Chiều dài VGA (${selectedParts.gpu.length}mm) vượt quá khoảng trống tối đa của Vỏ Case (${selectedParts.pcCase.maxGpuLength}mm).`
        });
      } else {
        rules.push({
          type: 'success',
          message: `Kích thước VGA vừa vặn: Chiều dài VGA (${selectedParts.gpu.length}mm) lắp vừa Vỏ Case (Tối đa ${selectedParts.pcCase.maxGpuLength}mm).`
        });
      }
    }

    // 4. Cooler (Air) & Case Height check
    if (selectedParts.cooler && selectedParts.cooler.type === 'air' && selectedParts.pcCase) {
      if (selectedParts.cooler.height > selectedParts.pcCase.maxCpuCoolerHeight) {
        rules.push({
          type: 'error',
          message: `Lỗi tản khí: Chiều cao tản nhiệt khí (${selectedParts.cooler.height}mm) vượt quá chiều cao tối đa vỏ case hỗ trợ (${selectedParts.pcCase.maxCpuCoolerHeight}mm).`
        });
      } else {
        rules.push({
          type: 'success',
          message: `Chiều cao tản khí phù hợp: Tản khí cao ${selectedParts.cooler.height}mm nằm gọn trong Vỏ Case (Tối đa ${selectedParts.pcCase.maxCpuCoolerHeight}mm).`
        });
      }
    }

    // 5. Cooler (Liquid AIO) & Case Radiator check
    if (selectedParts.cooler && selectedParts.cooler.type === 'liquid' && selectedParts.pcCase) {
      const isRadSupported = selectedParts.pcCase.supportedRadiators?.includes(selectedParts.cooler.radiatorSize);
      if (!isRadSupported) {
        rules.push({
          type: 'error',
          message: `Lỗi tản nước AIO: Vỏ Case này không hỗ trợ lắp đặt tản nước kích thước Radiator ${selectedParts.cooler.radiatorSize}mm (Chỉ hỗ trợ: ${selectedParts.pcCase.supportedRadiators?.join(', ')}mm).`
        });
      } else {
        rules.push({
          type: 'success',
          message: `Kích thước tản AIO phù hợp: Radiator ${selectedParts.cooler.radiatorSize}mm lắp đặt tương thích với Vỏ Case.`
        });
      }
    }

    // 6. PSU Wattage capacity check
    if (selectedParts.psu) {
      const psuRating = selectedParts.psu.wattageRating;
      if (wattSum > psuRating) {
        rules.push({
          type: 'error',
          message: `Lỗi nguồn PSU: Tổng công suất ước tính (${wattSum}W) vượt quá công suất nguồn (${psuRating}W).`
        });
      } else if (wattSum > psuRating * 0.8) {
        rules.push({
          type: 'warning',
          message: `Cảnh báo nguồn: Tổng công suất (${wattSum}W) chiếm hơn 80% định mức nguồn (${psuRating}W). Hãy nâng cấp PSU để chạy ổn định hơn.`
        });
      } else {
        rules.push({
          type: 'success',
          message: `Công suất an toàn: Nguồn ${psuRating}W đáp ứng cực tốt tổng công suất ${wattSum}W của hệ thống.`
        });
      }
    }

    setCompatibilities(rules);
  }, [selectedParts]);

  const handleSelectPart = (category, part) => {
    setSelectedParts(prev => ({
      ...prev,
      [category]: part
    }));
    setActiveModalCat(null); // Close modal on select
  };

  const handleClearCategory = (category) => {
    setSelectedParts(prev => ({
      ...prev,
      [category]: null
    }));
  };

  const handleReset = () => {
    setSelectedParts({
      cpu: null,
      motherboard: null,
      ram: null,
      gpu: null,
      ssd: null,
      psu: null,
      cooler: null,
      pcCase: null
    });
  };

  const handleAddAllToCart = () => {
    const activeParts = Object.values(selectedParts).filter(p => p !== null);
    if (activeParts.length === 0) return;
    onAddPartsToCart(activeParts);
  };

  const formatVND = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  const isConfigEmpty = Object.values(selectedParts).every(p => p === null);

  // Check item compatibility error to show warnings inline in modal list
  const checkPartCompatibilityError = (catId, part) => {
    // Check against CPU
    if (catId === 'cpu' && selectedParts.motherboard) {
      if (part.socket !== selectedParts.motherboard.socket) {
        return `Không khớp Socket với Mainboard đang chọn (${selectedParts.motherboard.socket})`;
      }
    }
    // Check against Motherboard
    if (catId === 'motherboard') {
      if (selectedParts.cpu && part.socket !== selectedParts.cpu.socket) {
        return `Không khớp Socket với CPU đang chọn (${selectedParts.cpu.socket})`;
      }
      if (selectedParts.ram && part.ramType !== selectedParts.ram.ramType) {
        return `Loại RAM không khớp với RAM đang chọn (${selectedParts.ram.ramType})`;
      }
    }
    // Check against RAM
    if (catId === 'ram' && selectedParts.motherboard) {
      if (part.ramType !== selectedParts.motherboard.ramType) {
        return `Chuẩn RAM không khớp với Mainboard đang chọn (${selectedParts.motherboard.ramType})`;
      }
    }
    // Check against GPU (VGA)
    if (catId === 'gpu' && selectedParts.pcCase) {
      if (part.length > selectedParts.pcCase.maxGpuLength) {
        return `VGA quá dài (${part.length}mm), vỏ case đang chọn chỉ hỗ trợ tối đa ${selectedParts.pcCase.maxGpuLength}mm`;
      }
    }
    // Check against Case (với GPU, Cooler)
    if (catId === 'pcCase') {
      if (selectedParts.gpu && selectedParts.gpu.length > part.maxGpuLength) {
        return `Không vừa VGA đang chọn (Card dài ${selectedParts.gpu.length}mm, Case chỉ hỗ trợ ${part.maxGpuLength}mm)`;
      }
      if (selectedParts.cooler) {
        if (selectedParts.cooler.type === 'air' && selectedParts.cooler.height > part.maxCpuCoolerHeight) {
          return `Không vừa Tản khí đang chọn (Tản cao ${selectedParts.cooler.height}mm, Case chỉ hỗ trợ ${part.maxCpuCoolerHeight}mm)`;
        }
        if (selectedParts.cooler.type === 'liquid' && !part.supportedRadiators?.includes(selectedParts.cooler.radiatorSize)) {
          return `Không hỗ trợ Radiator tản nước đang chọn (${selectedParts.cooler.radiatorSize}mm)`;
        }
      }
    }
    // Check against Cooler (với Case)
    if (catId === 'cooler' && selectedParts.pcCase) {
      if (part.type === 'air' && part.height > selectedParts.pcCase.maxCpuCoolerHeight) {
        return `Tản khí quá cao (${part.height}mm), vỏ case đang chọn chỉ hỗ trợ tối đa ${selectedParts.pcCase.maxCpuCoolerHeight}mm`;
      }
      if (part.type === 'liquid' && !selectedParts.pcCase.supportedRadiators?.includes(part.radiatorSize)) {
        return `Radiator ${part.radiatorSize}mm không được hỗ trợ bởi vỏ case đang chọn`;
      }
    }

    return null;
  };

  // Filter items in modal search & detailed filters
  const activeCatDetails = activeModalCat ? categories.find(c => c.id === activeModalCat) : null;
  const filteredModalParts = activeCatDetails
    ? activeCatDetails.db.filter(part => {
      // 1. Text Search
      const matchesSearch = part.name.toLowerCase().includes(modalSearchQuery.toLowerCase()) ||
        part.specs.toLowerCase().includes(modalSearchQuery.toLowerCase());

      // 2. Price Range Filter [min, max]
      const price = part.price || 0;
      const matchesPrice = price >= filterPriceMin && price <= filterPriceMax;

      // 3. Brand Filter
      let matchesBrand = true;
      if (filterSelectedBrand !== 'all') {
        matchesBrand = part.brand?.toLowerCase() === filterSelectedBrand.toLowerCase();
      }

      // 4. Color Filter
      let matchesColor = true;
      if (filterSelectedColor !== 'all') {
        matchesColor = part.color?.toLowerCase() === filterSelectedColor.toLowerCase();
      }

      // 5. Socket Filter (Tương thích)
      let matchesSocket = true;
      if (filterSocket !== 'all' && part.socket) {
        matchesSocket = part.socket.toLowerCase() === filterSocket.toLowerCase();
      }

      // 6. RAM Type Filter (Tương thích)
      let matchesRam = true;
      if (filterRamType !== 'all' && part.ramType) {
        matchesRam = part.ramType.toLowerCase() === filterRamType.toLowerCase();
      }

      return matchesSearch && matchesPrice && matchesBrand && matchesColor && matchesSocket && matchesRam;
    })
    : [];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '30px' }} className="pc-builder-container">
      {/* Selector List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: '800', fontFamily: 'Montserrat' }}>XÂY DỰNG CẤU HÌNH PC</h2>
            <p style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)' }}>Lựa chọn các linh kiện tương thích để tạo nên bộ PC hoàn chỉnh.</p>
          </div>
          {!isConfigEmpty && (
            <button
              onClick={handleReset}
              className="btn btn-outline"
              style={{ padding: '8px 14px', fontSize: '12px' }}
            >
              <RefreshCw size={14} />
              Reset cấu hình
            </button>
          )}
        </div>

        {/* Categories checklist */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {categories.map((cat) => {
            const Icon = cat.icon;
            const selected = selectedParts[cat.id];

            return (
              <div
                key={cat.id}
                className="glass-panel"
                style={{
                  borderRadius: 'var(--rounded-md)',
                  padding: '16px',
                  borderLeft: selected ? '4px solid var(--color-primary)' : '1px solid rgba(255, 255, 255, 0.08)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{
                      background: selected ? 'rgba(0, 123, 255, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid rgba(255,255,255,0.05)',
                      flexShrink: 0
                    }}>
                      <Icon size={18} color={selected ? 'var(--color-primary)' : 'var(--color-outline)'} />
                    </div>
                    {/* Item Image Preview if selected */}
                    {selected && (
                      <img
                        src={selected.image}
                        alt={selected.name}
                        style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: 'var(--rounded-sm)',
                          objectFit: 'cover',
                          background: 'rgba(255,255,255,0.02)',
                          border: '1px solid rgba(255,255,255,0.1)'
                        }}
                      />
                    )}
                    <div>
                      <h4 style={{ fontSize: '14px', fontWeight: '700' }}>{cat.name}</h4>
                      {selected ? (
                        <p style={{ fontSize: '13px', color: '#ffffff', fontWeight: '500', marginTop: '2px', maxWidth: '380px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {selected.name}
                        </p>
                      ) : (
                        <p style={{ fontSize: '12px', color: 'var(--color-outline)', marginTop: '2px' }}>Chưa chọn linh kiện</p>
                      )}
                    </div>
                  </div>

                  {/* Right: Price & Buttons */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    {selected && (
                      <span style={{ fontSize: '15px', fontWeight: '700', color: 'var(--color-secondary-dim)' }}>
                        {formatVND(selected.price)}
                      </span>
                    )}

                    <div style={{ display: 'flex', gap: '8px' }}>
                      {selected && (
                        <button
                          onClick={() => handleClearCategory(cat.id)}
                          className="btn btn-ghost"
                          style={{ color: 'var(--color-error)', fontSize: '12px', padding: '6px 12px' }}
                        >
                          Xóa
                        </button>
                      )}

                      <button
                        onClick={() => handleOpenModal(cat.id)}
                        className={`btn ${selected ? 'btn-outline' : 'btn-primary'}`}
                        style={{ padding: '8px 14px', fontSize: '12px' }}
                      >
                        {selected ? 'Thay đổi' : 'Chọn linh kiện'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Selected part specifications detail dropdown */}
                {selected && (
                  <div style={{
                    marginTop: '12px',
                    padding: '10px 14px',
                    background: 'rgba(0,0,0,0.2)',
                    borderRadius: 'var(--rounded-sm)',
                    fontSize: '12px',
                    color: 'var(--color-on-surface-variant)',
                    borderLeft: '2px solid rgba(255,255,255,0.1)',
                    lineHeight: '1.5'
                  }}>
                    <strong>Thông số:</strong> {selected.specs}
                    {selected.socket && ` | Socket: ${selected.socket}`}
                    {selected.ramType && ` | Loại RAM: ${selected.ramType}`}
                    {selected.length && ` | Chiều dài: ${selected.length}mm`}
                    {selected.height && ` | Chiều cao: ${selected.height}mm`}
                    {selected.radiatorSize && ` | Kích thước Rad: ${selected.radiatorSize}mm`}
                    {selected.color && ` | Màu sắc: ${selected.color}`}
                    {selected.wattage && ` | Điện tiêu thụ: ${selected.wattage}W`}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bill & Compatibility Dashboard */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Bill Summary */}
        <div className="glass-panel" style={{ borderRadius: 'var(--rounded-md)', padding: '24px', position: 'sticky', top: '92px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '800', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px', marginBottom: '16px' }}>
            TỔNG QUAN HÓA ĐƠN
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: 'var(--color-on-surface-variant)' }}>
              <span>Linh kiện đã chọn:</span>
              <span style={{ fontWeight: '600', color: 'white' }}>
                {Object.values(selectedParts).filter(p => p !== null).length} / 8
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: 'var(--color-on-surface-variant)' }}>
              <span>Điện năng ước tính:</span>
              <span style={{ fontWeight: '600', color: totalWattage > 60 ? 'var(--color-primary-dim)' : 'white' }}>
                {totalWattage} W
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '16px' }}>
              <span style={{ fontSize: '16px', fontWeight: '600' }}>Tổng chi phí:</span>
              <span style={{ fontSize: '20px', fontWeight: '800', color: 'var(--color-secondary-dim)' }}>
                {formatVND(totalPrice)}
              </span>
            </div>
          </div>

          {/* Compatibility alerts */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
            <h4 style={{ fontSize: '13px', textTransform: 'uppercase', color: 'var(--color-outline)', fontWeight: '700', letterSpacing: '0.5px' }}>
              ĐÁNH GIÁ TƯƠNG THÍCH
            </h4>

            {compatibilities.length === 0 ? (
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '12px', color: 'var(--color-outline)', padding: '10px', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--rounded-sm)' }}>
                <Wrench size={14} />
                <span>Bắt đầu chọn linh kiện để hệ thống kiểm tra sự tương thích.</span>
              </div>
            ) : (
              compatibilities.map((rule, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'flex-start',
                    fontSize: '12px',
                    padding: '10px 12px',
                    borderRadius: 'var(--rounded-sm)',
                    background: rule.type === 'error' ? 'rgba(147, 0, 10, 0.15)' : rule.type === 'warning' ? 'rgba(253, 139, 0, 0.1)' : 'rgba(76, 175, 80, 0.1)',
                    border: `1px solid ${rule.type === 'error' ? 'rgba(147,0,10,0.3)' : rule.type === 'warning' ? 'rgba(253,139,0,0.3)' : 'rgba(76,175,80,0.2)'}`,
                    color: rule.type === 'error' ? '#ffb4ab' : rule.type === 'warning' ? '#ffb77d' : '#81c784'
                  }}
                >
                  {rule.type === 'success' ? (
                    <Check size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
                  ) : (
                    <AlertTriangle size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
                  )}
                  <span>{rule.message}</span>
                </div>
              ))
            )}
          </div>

          <button
            onClick={handleAddAllToCart}
            className="btn btn-secondary"
            disabled={isConfigEmpty}
            style={{
              width: '100%',
              padding: '14px',
              fontSize: '14px',
              opacity: isConfigEmpty ? 1 : 1,
              cursor: isConfigEmpty ? 'default' : 'pointer',
              background: 'linear-gradient(135deg, #d95300, #b33c00)',
              boxShadow: '0 4px 14px 0 rgba(217, 83, 0, 0.3)'
            }}
          >
            <ShoppingCart size={16} />
            <b>Thêm Cấu Hình Vào Giỏ Hàng</b>
          </button>
        </div>
      </div>


      {activeModalCat && typeof document !== 'undefined' && createPortal(
        <PCBuilderModal 
          activeModalCat={activeModalCat} setActiveModalCat={setActiveModalCat} categories={categories} 
          selectedParts={selectedParts} handleSelectPart={handleSelectPart} modalSearchQuery={modalSearchQuery} 
          setModalSearchQuery={setModalSearchQuery} filterPriceMin={filterPriceMin} setFilterPriceMin={setFilterPriceMin} 
          filterPriceMax={filterPriceMax} setFilterPriceMax={setFilterPriceMax} filterSelectedBrand={filterSelectedBrand} 
          setFilterSelectedBrand={setFilterSelectedBrand} filterSelectedColor={filterSelectedColor} 
          setFilterSelectedColor={setFilterSelectedColor} filterSocket={filterSocket} filterRamType={filterRamType} 
          formatVND={formatVND} activeCatDetails={activeCatDetails} filteredModalParts={filteredModalParts} 
          checkPartCompatibilityError={checkPartCompatibilityError} 
        />,
        document.body
      )}
    </div>
  );
}
