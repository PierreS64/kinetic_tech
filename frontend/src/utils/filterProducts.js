/**
 * Filters a list of products based on various criteria including category, search query, brand, price, stock status, and category-specific specs.
 *
 * @param {Array} storeProducts - The list of all products in the store.
 * @param {string} activeView - The current active view or category (e.g., 'laptop', 'điện thoại', 'deals').
 * @param {string} searchQuery - The search query string.
 * @param {Array<string>} selectedBrands - List of selected brand names to filter by.
 * @param {number} minPrice - Minimum price for filtering.
 * @param {number} maxPrice - Maximum price for filtering.
 * @param {boolean} onlyInStock - If true, only returns products currently in stock.
 * @param {Object} laptopFilters - Specific filters for laptops.
 * @param {Object} phoneFilters - Specific filters for phones.
 * @param {Object} gearFilters - Specific filters for gaming gear.
 * @param {Object} componentFilters - Specific filters for PC components.
 * @returns {Array} The filtered list of products.
 */
export function getFilteredProducts(storeProducts, activeView, searchQuery, selectedBrands, minPrice, maxPrice, onlyInStock, laptopFilters, phoneFilters, gearFilters, componentFilters) {
  return storeProducts.filter(product => {
  // Filter products based on search query and sidebar filters
  const filteredProducts = storeProducts.filter(product => {
    // 1. Category check
    const matchesCategory = activeView === 'deals' ? true : product.category === activeView;
    
    // 2. Search check
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          Object.values(product.specs).some(val => val.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // 3. Brand check
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.some(brand => {
      return product.name.toLowerCase().includes(brand.toLowerCase()) || 
             product.tags.some(tag => tag.toLowerCase() === brand.toLowerCase()) ||
             (brand.toLowerCase() === 'asus' && product.name.toLowerCase().includes('rog'));
    });
    
    // 4. Price check
    const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
    
    // 5. Stock check
    const matchesStock = !onlyInStock || product.inStock;
    
    // 6. Category-specific specs check
    let matchesSpecs = true;
    if (activeView === 'laptop') {
      const f = laptopFilters;
      
      // Nhu cầu
      if (f.usage) {
        const nameLower = product.name.toLowerCase();
        const tagsLower = product.tags.map(t => t.toLowerCase());
        const hasGpu = product.specs.gpu && !product.specs.gpu.toLowerCase().includes('onboard') && !product.specs.gpu.toLowerCase().includes('integrated') && !product.specs.gpu.toLowerCase().includes('arc') && !product.specs.gpu.toLowerCase().includes('intel');
        if (f.usage === 'gaming') {
          matchesSpecs = matchesSpecs && (tagsLower.includes('gaming') || nameLower.includes('gaming') || nameLower.includes('rog') || nameLower.includes('predator') || nameLower.includes('helios') || nameLower.includes('legion') || nameLower.includes('victus') || nameLower.includes('msi'));
        } else if (f.usage === 'office') {
          matchesSpecs = matchesSpecs && (tagsLower.includes('workplace') || tagsLower.includes('ultrabook') || nameLower.includes('air') || nameLower.includes('xps') || nameLower.includes('zenbook') || (!hasGpu && product.price < 25000000));
        } else if (f.usage === 'graphics') {
          matchesSpecs = matchesSpecs && (tagsLower.includes('đồ họa') || tagsLower.includes('kỹ thuật') || nameLower.includes('pro') || nameLower.includes('creator') || hasGpu || nameLower.includes('macbook pro'));
        } else if (f.usage === 'thin') {
          matchesSpecs = matchesSpecs && (tagsLower.includes('ultrabook') || nameLower.includes('macbook') || nameLower.includes('xps') || nameLower.includes('zenbook') || nameLower.includes('thin') || nameLower.includes('slim'));
        }
      }
      
      // CPU
      if (f.cpu) {
        const cpuLower = (product.specs.cpu || '').toLowerCase();
        if (f.cpu === 'intel-i3') matchesSpecs = matchesSpecs && cpuLower.includes('i3');
        else if (f.cpu === 'intel-i5') matchesSpecs = matchesSpecs && cpuLower.includes('i5');
        else if (f.cpu === 'intel-i7') matchesSpecs = matchesSpecs && (cpuLower.includes('i7') || cpuLower.includes('ultra 7'));
        else if (f.cpu === 'intel-i9') matchesSpecs = matchesSpecs && (cpuLower.includes('i9') || cpuLower.includes('ultra 9'));
        else if (f.cpu === 'amd-r3') matchesSpecs = matchesSpecs && cpuLower.includes('ryzen 3');
        else if (f.cpu === 'amd-r5') matchesSpecs = matchesSpecs && cpuLower.includes('ryzen 5');
        else if (f.cpu === 'amd-r7') matchesSpecs = matchesSpecs && cpuLower.includes('ryzen 7');
        else if (f.cpu === 'amd-r9') matchesSpecs = matchesSpecs && cpuLower.includes('ryzen 9');
        else if (f.cpu === 'apple-m') matchesSpecs = matchesSpecs && (cpuLower.includes('apple m') || cpuLower.includes('m1') || cpuLower.includes('m2') || cpuLower.includes('m3') || cpuLower.includes('m4'));
      }
      
      // RAM
      if (f.ram) {
        const ramLower = (product.specs.ram || '').toLowerCase();
        const nameLower = product.name.toLowerCase();
        if (f.ram === '4gb') matchesSpecs = matchesSpecs && (ramLower.includes('4gb') || nameLower.includes('4gb'));
        else if (f.ram === '8gb') matchesSpecs = matchesSpecs && (ramLower.includes('8gb') || nameLower.includes('8gb'));
        else if (f.ram === '16gb') matchesSpecs = matchesSpecs && (ramLower.includes('16gb') || nameLower.includes('16gb'));
        else if (f.ram === '32gb') matchesSpecs = matchesSpecs && (ramLower.includes('32gb') || ramLower.includes('64gb') || nameLower.includes('32gb') || nameLower.includes('64gb'));
      }
      
      // Storage
      if (f.storage) {
        const storageLower = (product.specs.storage || '').toLowerCase();
        const nameLower = product.name.toLowerCase();
        if (f.storage === '256gb') matchesSpecs = matchesSpecs && (storageLower.includes('256gb') || nameLower.includes('256gb'));
        else if (f.storage === '512gb') matchesSpecs = matchesSpecs && (storageLower.includes('512gb') || storageLower.includes('512gb') || nameLower.includes('512gb'));
        else if (f.storage === '1tb') matchesSpecs = matchesSpecs && (storageLower.includes('1tb') || storageLower.includes('2tb') || nameLower.includes('1tb') || nameLower.includes('2tb'));
      }
      
      // GPU/VGA
      if (f.gpu) {
        const gpuLower = (product.specs.gpu || '').toLowerCase();
        if (f.gpu === 'onboard') matchesSpecs = matchesSpecs && (gpuLower.includes('onboard') || gpuLower.includes('integrated') || gpuLower.includes('intel arc') || gpuLower.includes('intel iris') || (gpuLower.includes('gpu') && gpuLower.includes('core')) || gpuLower.includes('graphics'));
        else if (f.gpu === 'nvidia') matchesSpecs = matchesSpecs && (gpuLower.includes('nvidia') || gpuLower.includes('rtx') || gpuLower.includes('gtx'));
        else if (f.gpu === 'amd') matchesSpecs = matchesSpecs && (gpuLower.includes('radeon') || gpuLower.includes('rx'));
      }
      
      // Screen size
      if (f.screenSize) {
        const nameLower = product.name.toLowerCase();
        const screenLower = (product.specs.screen || '').toLowerCase();
        if (f.screenSize === '13') matchesSpecs = matchesSpecs && (nameLower.includes('13') || screenLower.includes('13'));
        else if (f.screenSize === '14') matchesSpecs = matchesSpecs && (nameLower.includes('14') || screenLower.includes('14'));
        else if (f.screenSize === '15') matchesSpecs = matchesSpecs && (nameLower.includes('15') || screenLower.includes('15'));
        else if (f.screenSize === '16') matchesSpecs = matchesSpecs && (nameLower.includes('16') || nameLower.includes('17') || nameLower.includes('18') || screenLower.includes('16') || screenLower.includes('17'));
      }
      
      // Screen Hz
      if (f.screenHz) {
        const tagsLower = product.tags.map(t => t.toLowerCase());
        const nameLower = product.name.toLowerCase();
        const screenLower = (product.specs.screen || '').toLowerCase();
        const fullText = nameLower + ' ' + screenLower + ' ' + tagsLower.join(' ');
        if (f.screenHz === '60') matchesSpecs = matchesSpecs && (fullText.includes('60hz') || !fullText.includes('hz'));
        else if (f.screenHz === '90') matchesSpecs = matchesSpecs && fullText.includes('90hz');
        else if (f.screenHz === '120') matchesSpecs = matchesSpecs && fullText.includes('120hz');
        else if (f.screenHz === '144') matchesSpecs = matchesSpecs && fullText.includes('144hz');
        else if (f.screenHz === '165') matchesSpecs = matchesSpecs && (fullText.includes('165hz') || fullText.includes('240hz') || fullText.includes('360hz'));
      }
    } else if (activeView === 'điện thoại') {
      const f = phoneFilters;
      
      // OS
      if (f.os) {
        const nameLower = product.name.toLowerCase();
        const isApple = nameLower.includes('iphone') || nameLower.includes('apple');
        if (f.os === 'ios') matchesSpecs = matchesSpecs && isApple;
        else if (f.os === 'android') matchesSpecs = matchesSpecs && !isApple;
      }
      
      // Storage ROM
      if (f.rom) {
        const nameLower = product.name.toLowerCase();
        const screenLower = (product.specs.screen || '').toLowerCase();
        const fullText = nameLower + ' ' + screenLower;
        matchesSpecs = matchesSpecs && fullText.includes(f.rom.toLowerCase());
      }
      
      // RAM
      if (f.ram) {
        const nameLower = product.name.toLowerCase();
        let estRam = 8;
        if (nameLower.includes('15 pro max')) estRam = 8;
        else if (nameLower.includes('s24 ultra')) estRam = 12;
        else if (nameLower.includes('z fold5')) estRam = 12;
        else if (nameLower.includes('14 ultra')) estRam = 16;
        else if (nameLower.includes('pixel 8 pro')) estRam = 12;
        else if (nameLower.includes('rog phone 8 pro')) estRam = 16;
        else if (nameLower.includes('iphone 15')) estRam = 6;
        
        if (f.ram === '4gb') matchesSpecs = matchesSpecs && estRam === 4;
        else if (f.ram === '6gb') matchesSpecs = matchesSpecs && estRam === 6;
        else if (f.ram === '8gb') matchesSpecs = matchesSpecs && estRam === 8;
        else if (f.ram === '12gb') matchesSpecs = matchesSpecs && estRam >= 12;
      }
      
      // Screen Size
      if (f.screenSize) {
        const screenStr = (product.specs.screen || '').toLowerCase();
        const match = screenStr.match(/(\d+\.?\d*)\s*inch/);
        const size = match ? parseFloat(match[1]) : 6.0;
        const isFold = product.name.toLowerCase().includes('fold') || product.name.toLowerCase().includes('gập') || product.tags.some(t => t.toLowerCase().includes('fold'));
        
        if (f.screenSize === 'small') matchesSpecs = matchesSpecs && size < 6.0 && !isFold;
        else if (f.screenSize === 'large') matchesSpecs = matchesSpecs && size >= 6.0 && !isFold;
        else if (f.screenSize === 'fold') matchesSpecs = matchesSpecs && isFold;
      }
      
      // Special features
      if (f.features && f.features.length > 0) {
        const nameLower = product.name.toLowerCase();
        const tagsLower = product.tags.map(t => t.toLowerCase());
        const specsStr = JSON.stringify(product.specs).toLowerCase();
        const fullText = nameLower + ' ' + tagsLower.join(' ') + ' ' + specsStr;
        
        f.features.forEach(feat => {
          if (feat === '5g') matchesSpecs = matchesSpecs && fullText.includes('5g');
          if (feat === 'fast') matchesSpecs = matchesSpecs && (fullText.includes('fast') || fullText.includes('sạc nhanh') || fullText.includes('90w') || fullText.includes('charge'));
          if (feat === 'waterproof') matchesSpecs = matchesSpecs && (fullText.includes('kháng nước') || fullText.includes('waterproof') || fullText.includes('ip68') || nameLower.includes('iphone') || nameLower.includes('s24 ultra') || nameLower.includes('pixel'));
          if (feat === 'ois') matchesSpecs = matchesSpecs && (fullText.includes('ois') || fullText.includes('chống rung') || nameLower.includes('iphone 15 pro') || nameLower.includes('s24 ultra') || nameLower.includes('pixel 8 pro'));
        });
      }
      
      // Battery
      if (f.battery) {
        const batteryStr = (product.specs.battery || '').toLowerCase();
        const match = batteryStr.match(/(\d+)\s*mah/);
        const capacity = match ? parseInt(match[1]) : 4500;
        if (f.battery === 'under4000') matchesSpecs = matchesSpecs && capacity < 4000;
        else if (f.battery === '4000to5000') matchesSpecs = matchesSpecs && capacity >= 4000 && capacity <= 5000;
        else if (f.battery === 'over5000') matchesSpecs = matchesSpecs && capacity > 5000;
      }
    } else if (activeView === 'gaming gear') {
      const f = gearFilters;
      
      // Product Type
      if (f.type) {
        const nameLower = product.name.toLowerCase();
        const tagsLower = product.tags.map(t => t.toLowerCase());
        const fullText = nameLower + ' ' + tagsLower.join(' ');
        if (f.type === 'keyboard') matchesSpecs = matchesSpecs && (fullText.includes('phím') || fullText.includes('keyboard') || fullText.includes('azoth'));
        else if (f.type === 'mouse') matchesSpecs = matchesSpecs && (fullText.includes('chuột') || fullText.includes('mouse') || fullText.includes('superlight') || fullText.includes('cobra'));
        else if (f.type === 'headset') matchesSpecs = matchesSpecs && (fullText.includes('tai nghe') || fullText.includes('headset') || fullText.includes('headphone') || fullText.includes('delta') || fullText.includes('blackshark'));
        else if (f.type === 'mousepad') matchesSpecs = matchesSpecs && (fullText.includes('lót') || fullText.includes('pad') || fullText.includes('bàn di'));
        else if (f.type === 'gamepad') matchesSpecs = matchesSpecs && (fullText.includes('tay cầm') || fullText.includes('gamepad') || fullText.includes('controller') || fullText.includes('xbox'));
      }
      
      // Connection
      if (f.connection) {
        const connectivity = (product.specs.connectivity || '').toLowerCase();
        const nameLower = product.name.toLowerCase();
        const fullText = connectivity + ' ' + nameLower;
        if (f.connection === 'wired') matchesSpecs = matchesSpecs && (fullText.includes('wired') || fullText.includes('có dây') || fullText.includes('type-c') || fullText.includes('usb') && !fullText.includes('wireless'));
        else if (f.connection === 'wireless') matchesSpecs = matchesSpecs && (fullText.includes('wireless') || fullText.includes('không dây') || fullText.includes('bluetooth') || fullText.includes('bt') || fullText.includes('2.4ghz'));
        else if (f.connection === '2.4g') matchesSpecs = matchesSpecs && (fullText.includes('2.4') || fullText.includes('receiver') || fullText.includes('dongle'));
      }
      
      // LED
      if (f.led) {
        const specsStr = JSON.stringify(product.specs).toLowerCase();
        const nameLower = product.name.toLowerCase();
        const tagsLower = product.tags.map(t => t.toLowerCase());
        const fullText = specsStr + ' ' + nameLower + ' ' + tagsLower.join(' ');
        
        if (f.led === 'no') matchesSpecs = matchesSpecs && !fullText.includes('rgb') && !fullText.includes('led') && !fullText.includes('matrix') && !fullText.includes('prism');
        else if (f.led === 'single') matchesSpecs = matchesSpecs && fullText.includes('led') && !fullText.includes('rgb');
        else if (f.led === 'rgb') matchesSpecs = matchesSpecs && (fullText.includes('rgb') || fullText.includes('chroma') || fullText.includes('prism') || fullText.includes('matrix'));
      }
      
      // Keyboard dynamic
      if (f.type === 'keyboard') {
        if (f.keyboardSwitch) {
          const switchStr = (product.specs.switches || '').toLowerCase();
          if (f.keyboardSwitch === 'blue') matchesSpecs = matchesSpecs && switchStr.includes('blue');
          else if (f.keyboardSwitch === 'red') matchesSpecs = matchesSpecs && switchStr.includes('red');
          else if (f.keyboardSwitch === 'brown') matchesSpecs = matchesSpecs && switchStr.includes('brown');
          else if (f.keyboardSwitch === 'custom') matchesSpecs = matchesSpecs && (switchStr.includes('nx') || switchStr.includes('pre-lubed') || switchStr.includes('lubed') || switchStr.includes('custom') || switchStr.includes('hybrid'));
        }
        if (f.keyboardLayout) {
          const layoutStr = (product.specs.layout || '').toLowerCase();
          if (f.keyboardLayout === 'fullsize') matchesSpecs = matchesSpecs && (layoutStr.includes('full') || layoutStr.includes('104') || layoutStr.includes('108'));
          else if (f.keyboardLayout === 'tkl') matchesSpecs = matchesSpecs && (layoutStr.includes('tkl') || layoutStr.includes('87'));
          else if (f.keyboardLayout === '75') matchesSpecs = matchesSpecs && layoutStr.includes('75%');
          else if (f.keyboardLayout === '60') matchesSpecs = matchesSpecs && (layoutStr.includes('60%') || layoutStr.includes('65%'));
        }
      }
      
      // Mouse dynamic
      if (f.type === 'mouse') {
        if (f.mouseWeight) {
          const weightStr = (product.specs.weight || '').toLowerCase();
          const match = weightStr.match(/(\d+)\s*gram/);
          const weightVal = match ? parseInt(match[1]) : 80;
          if (f.mouseWeight === 'light') matchesSpecs = matchesSpecs && weightVal < 70;
          else if (f.mouseWeight === 'standard') matchesSpecs = matchesSpecs && weightVal >= 70;
        }
        if (f.mouseDpi) {
          const sensorStr = (product.specs.sensor || '').toLowerCase();
          let dpiVal = 16000;
          if (sensorStr.includes('32.000') || sensorStr.includes('32k')) dpiVal = 32000;
          else if (sensorStr.includes('30k') || sensorStr.includes('30.000')) dpiVal = 30000;
          else if (sensorStr.includes('20.000') || sensorStr.includes('20k')) dpiVal = 20000;
          else if (sensorStr.includes('10.000') || sensorStr.includes('10k')) dpiVal = 10000;
          
          if (f.mouseDpi === 'under10k') matchesSpecs = matchesSpecs && dpiVal < 10000;
          else if (f.mouseDpi === '10k20k') matchesSpecs = matchesSpecs && dpiVal >= 10000 && dpiVal <= 20000;
          else if (f.mouseDpi === 'over20k') matchesSpecs = matchesSpecs && dpiVal > 20000;
        }
      }
    } else if (activeView === 'linh kiện') {
      const f = componentFilters;
      
      // Component Type
      if (f.type) {
        const nameLower = product.name.toLowerCase();
        const tagsLower = product.tags.map(t => t.toLowerCase());
        const fullText = nameLower + ' ' + tagsLower.join(' ');
        
        if (f.type === 'cpu') matchesSpecs = matchesSpecs && (fullText.includes('cpu') || fullText.includes('processor') || nameLower.includes('ryzen') || nameLower.includes('core i'));
        else if (f.type === 'motherboard') matchesSpecs = matchesSpecs && (fullText.includes('mainboard') || fullText.includes('bo mạch chủ') || fullText.includes('motherboard') || nameLower.includes('maximus') || nameLower.includes('z790') || nameLower.includes('b650'));
        else if (f.type === 'ram') matchesSpecs = matchesSpecs && (fullText.includes('ram') || fullText.includes('memory') || nameLower.includes('ddr'));
        else if (f.type === 'vga') matchesSpecs = matchesSpecs && (fullText.includes('vga') || fullText.includes('card màn hình') || fullText.includes('card đồ họa') || nameLower.includes('rtx') || nameLower.includes('radeon'));
        else if (f.type === 'ssd') matchesSpecs = matchesSpecs && (fullText.includes('ssd') || fullText.includes('hdd') || fullText.includes('ổ cứng') || nameLower.includes('nvme') || nameLower.includes('m.2'));
        else if (f.type === 'psu') matchesSpecs = matchesSpecs && (fullText.includes('psu') || fullText.includes('nguồn') || fullText.includes('power supply') || nameLower.includes('shift') || nameLower.includes('rm1000x'));
        else if (f.type === 'cooler') matchesSpecs = matchesSpecs && (fullText.includes('tản nhiệt') || fullText.includes('cooler') || nameLower.includes('ryujin') || nameLower.includes('aio'));
        else if (f.type === 'case') matchesSpecs = matchesSpecs && (fullText.includes('case') || fullText.includes('vỏ') || nameLower.includes('lian li') || nameLower.includes('vision'));
      }
      
      // Dynamic filters CPU & Mainboard
      if (f.type === 'cpu' || f.type === 'motherboard') {
        if (f.socket) {
          const socketStr = (product.specs.socket || '').toLowerCase();
          const nameLower = product.name.toLowerCase();
          const fullText = socketStr + ' ' + nameLower;
          if (f.socket === 'lga1700') matchesSpecs = matchesSpecs && fullText.includes('lga1700');
          else if (f.socket === 'lga1200') matchesSpecs = matchesSpecs && fullText.includes('lga1200');
          else if (f.socket === 'am4') matchesSpecs = matchesSpecs && fullText.includes('am4');
          else if (f.socket === 'am5') matchesSpecs = matchesSpecs && fullText.includes('am5');
        }
        if (f.chipset) {
          const nameLower = product.name.toLowerCase();
          if (f.chipset === 'h-series') matchesSpecs = matchesSpecs && (nameLower.includes('h610') || nameLower.includes('h510') || nameLower.includes('h-series'));
          else if (f.chipset === 'b-series') matchesSpecs = matchesSpecs && (nameLower.includes('b760') || nameLower.includes('b650') || nameLower.includes('b550') || nameLower.includes('b-series'));
          else if (f.chipset === 'z-series') matchesSpecs = matchesSpecs && (nameLower.includes('z790') || nameLower.includes('z690') || nameLower.includes('z-series'));
          else if (f.chipset === 'x-series') matchesSpecs = matchesSpecs && (nameLower.includes('x670') || nameLower.includes('x570') || nameLower.includes('x-series'));
        }
      }
      
      // Dynamic filters RAM
      if (f.type === 'ram') {
        if (f.ramStandard) {
          const typeStr = (product.specs.type || '').toLowerCase();
          const nameLower = product.name.toLowerCase();
          const fullText = typeStr + ' ' + nameLower;
          if (f.ramStandard === 'ddr4') matchesSpecs = matchesSpecs && fullText.includes('ddr4');
          else if (f.ramStandard === 'ddr5') matchesSpecs = matchesSpecs && fullText.includes('ddr5');
        }
        if (f.ramBus) {
          const speedStr = (product.specs.speed || '').toLowerCase();
          const nameLower = product.name.toLowerCase();
          const fullText = speedStr + ' ' + nameLower;
          matchesSpecs = matchesSpecs && fullText.includes(f.ramBus);
        }
      }
      
      // Dynamic filters VGA
      if (f.type === 'vga') {
        if (f.vgaBrand) {
          const nameLower = product.name.toLowerCase();
          const tagsLower = product.tags.map(t => t.toLowerCase());
          const fullText = nameLower + ' ' + tagsLower.join(' ');
          if (f.vgaBrand === 'nvidia') matchesSpecs = matchesSpecs && (fullText.includes('nvidia') || fullText.includes('rtx') || fullText.includes('gtx'));
          else if (f.vgaBrand === 'amd') matchesSpecs = matchesSpecs && (fullText.includes('amd') || fullText.includes('radeon') || fullText.includes('rx'));
        }
        if (f.vgaVram) {
          const vramStr = (product.specs.vram || '').toLowerCase();
          const nameLower = product.name.toLowerCase();
          const fullText = vramStr + ' ' + nameLower;
          if (f.vgaVram === '4gb') matchesSpecs = matchesSpecs && fullText.includes('4gb');
          else if (f.vgaVram === '8gb') matchesSpecs = matchesSpecs && fullText.includes('8gb');
          else if (f.vgaVram === '12gb') matchesSpecs = matchesSpecs && fullText.includes('12gb');
          else if (f.vgaVram === '16gb') matchesSpecs = matchesSpecs && (fullText.includes('16gb') || fullText.includes('24gb'));
        }
      }
      
      // Dynamic filters PSU
      if (f.type === 'psu') {
        if (f.psuPower) {
          const powerStr = (product.specs.power || '').toLowerCase();
          const nameLower = product.name.toLowerCase();
          const fullText = powerStr + ' ' + nameLower;
          const match = fullText.match(/(\d+)\s*w/);
          const watts = match ? parseInt(match[1]) : 750;
          
          if (f.psuPower === 'under500') matchesSpecs = matchesSpecs && watts < 500;
          else if (f.psuPower === '500to650') matchesSpecs = matchesSpecs && watts >= 500 && watts <= 650;
          else if (f.psuPower === '700to850') matchesSpecs = matchesSpecs && watts >= 700 && watts <= 850;
          else if (f.psuPower === 'over850') matchesSpecs = matchesSpecs && watts > 850;
        }
        if (f.psuEfficiency) {
          const effStr = (product.specs.efficiency || '').toLowerCase();
          const nameLower = product.name.toLowerCase();
          const fullText = effStr + ' ' + nameLower;
          if (f.psuEfficiency === 'white') matchesSpecs = matchesSpecs && fullText.includes('white');
          else if (f.psuEfficiency === 'bronze') matchesSpecs = matchesSpecs && fullText.includes('bronze');
          else if (f.psuEfficiency === 'gold') matchesSpecs = matchesSpecs && fullText.includes('gold');
          else if (f.psuEfficiency === 'platinum') matchesSpecs = matchesSpecs && fullText.includes('platinum');
        }
      }
    }
    
    return matchesCategory && matchesSearch && matchesBrand && matchesPrice && matchesStock && matchesSpecs;
  });

  });
}
