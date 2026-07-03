export const CATEGORIES = {
  LAPTOP: 'laptop',
  PHONE: 'điện thoại',
  GEAR: 'gaming gear',
  COMPONENT: 'linh kiện'
};

export const products = [
  // Laptops
  {
    id: '5bf5a4d1-a49c-4b9d-b95a-f036619fc401',
    name: 'Laptop ASUS ROG Strix G16 (2024)',
    category: CATEGORIES.LAPTOP,
    price: 36990000,
    oldPrice: 39990000,
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=400',
    specs: {
      cpu: 'Intel Core i7-13650HX',
      ram: '16GB DDR5 4800MHz',
      storage: '512GB SSD PCIe 4.0',
      gpu: 'NVIDIA RTX 4060 8GB'
    },
    rating: 4.8,
    reviews: 124,
    tags: ['Gaming', 'RTX 4060', '165Hz'],
    featured: true,
    inStock: true
  },
  {
    id: 'dd6c598e-c574-4054-a04a-afe10558c6df',
    name: 'MacBook Pro 14 inch M3 (2024)',
    category: CATEGORIES.LAPTOP,
    price: 39990000,
    oldPrice: 42990000,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=400',
    specs: {
      cpu: 'Apple M3 Chip (8-core CPU)',
      ram: '8GB Unified Memory',
      storage: '512GB SSD',
      gpu: '10-core GPU'
    },
    rating: 4.9,
    reviews: 86,
    tags: ['Workplace', 'M3 Chip', 'Retina'],
    featured: true,
    inStock: true
  },
  {
    id: '4a466d7e-7885-4dc5-80df-2326edea0b1f',
    name: 'Laptop Dell XPS 13 9340 (2024)',
    category: CATEGORIES.LAPTOP,
    price: 41990000,
    oldPrice: 44990000,
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=400',
    specs: {
      cpu: 'Intel Core Ultra 7 155H',
      ram: '16GB LPDDR5X 7467MHz',
      storage: '512GB SSD PCIe 4.0',
      gpu: 'Intel Arc Graphics'
    },
    rating: 4.9,
    reviews: 43,
    tags: ['Dell', 'XPS', 'Ultrabook'],
    featured: true,
    inStock: true
  },
  {
    id: '5a1bfe21-2601-44d9-a72a-47983552ba97',
    name: 'Laptop Acer Predator Helios Neo 16',
    category: CATEGORIES.LAPTOP,
    price: 33490000,
    oldPrice: 36990000,
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&q=80&w=400',
    specs: {
      cpu: 'Intel Core i7-13700HX',
      ram: '16GB DDR5 4800MHz',
      storage: '512GB SSD PCIe 4.0',
      gpu: 'NVIDIA RTX 4060 8GB'
    },
    rating: 4.7,
    reviews: 79,
    tags: ['Gaming', 'Predator', 'RTX 4060'],
    featured: true,
    inStock: true
  },
  {
    id: '1ce08b2d-d285-4d3c-8160-7cae24017d47',
    name: 'Laptop Lenovo Legion 5 16IRX9',
    category: CATEGORIES.LAPTOP,
    price: 31490000,
    oldPrice: 33990000,
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=400',
    specs: {
      cpu: 'Intel Core i5-13450HX',
      ram: '16GB DDR5 5600MHz',
      storage: '512GB SSD PCIe 4.0',
      gpu: 'NVIDIA RTX 4050 6GB'
    },
    rating: 4.7,
    reviews: 58,
    tags: ['Gaming', 'Legion', 'RTX 4050'],
    featured: false,
    inStock: true
  },
  {
    id: '28d29ac1-0464-4339-9b26-19b72ae532e8',
    name: 'Laptop HP Victus 16 (2024)',
    category: CATEGORIES.LAPTOP,
    price: 22990000,
    oldPrice: 24990000,
    image: 'https://images.unsplash.com/photo-1585241936222-7935767bdf8f?auto=format&fit=crop&q=80&w=400',
    specs: {
      cpu: 'AMD Ryzen 5 7640HS',
      ram: '16GB DDR5 5600MHz',
      storage: '512GB SSD',
      gpu: 'NVIDIA RTX 4050 6GB'
    },
    rating: 4.5,
    reviews: 94,
    tags: ['HP', 'Victus', 'Gaming'],
    featured: false,
    inStock: true
  },
  {
    id: '39157655-936c-477b-b40b-af5a56e9e905',
    name: 'Laptop Gigabyte G5 KF',
    category: CATEGORIES.LAPTOP,
    price: 20490000,
    oldPrice: 22490000,
    image: 'https://images.unsplash.com/photo-1629133676375-57dcbf7c65b5?auto=format&fit=crop&q=80&w=400',
    specs: {
      cpu: 'Intel Core i5-12500H',
      ram: '8GB DDR4 3200MHz',
      storage: '512GB SSD',
      gpu: 'NVIDIA RTX 4060 8GB'
    },
    rating: 4.4,
    reviews: 31,
    tags: ['Gigabyte', 'RTX 4060', 'Gaming'],
    featured: false,
    inStock: true
  },

  // Phones
  {
    id: 'c2acdbd0-5eaa-45be-8112-ee3cd1317af3',
    name: 'iPhone 15 Pro Max 256GB',
    category: CATEGORIES.PHONE,
    price: 29890000,
    oldPrice: 34990000,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=400',
    specs: {
      screen: '6.7 inch Super Retina XDR',
      cpu: 'Apple A17 Pro (3nm)',
      camera: 'Chính 48MP & Phụ 12MP, 12MP',
      battery: '4441 mAh'
    },
    rating: 4.9,
    reviews: 320,
    tags: ['Apple', 'A17 Pro', 'Titanium'],
    featured: true,
    inStock: true
  },
  {
    id: 'ed7c0fb2-1221-4ecf-85d7-e715672e7359',
    name: 'Samsung Galaxy S24 Ultra 256GB',
    category: CATEGORIES.PHONE,
    price: 26990000,
    oldPrice: 33990000,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=400',
    specs: {
      screen: '6.8 inch Dynamic AMOLED 2X',
      cpu: 'Snapdragon 8 Gen 3 for Galaxy',
      camera: 'Chính 200MP & Phụ 50MP, 12MP, 10MP',
      battery: '5000 mAh'
    },
    rating: 4.8,
    reviews: 195,
    tags: ['Samsung', 'Galaxy AI', 'S-Pen'],
    featured: true,
    inStock: true
  },
  {
    id: '2b81c0e5-bf59-433b-bfbf-ab9f5ce8ffab',
    name: 'iPhone 15 128GB',
    category: CATEGORIES.PHONE,
    price: 19790000,
    oldPrice: 22990000,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=400',
    specs: {
      screen: '6.1 inch Super Retina XDR',
      cpu: 'Apple A16 Bionic',
      camera: 'Chính 48MP & Phụ 12MP',
      battery: '3349 mAh'
    },
    rating: 4.7,
    reviews: 145,
    tags: ['Apple', 'iPhone 15', 'Dynamic Island'],
    featured: true,
    inStock: true
  },
  {
    id: '667be01a-bba9-429b-b0c4-93e27b887986',
    name: 'Samsung Galaxy Z Fold5 512GB',
    category: CATEGORIES.PHONE,
    price: 32990000,
    oldPrice: 40990000,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=400',
    specs: {
      screen: '7.6 inch Dynamic AMOLED 2X',
      cpu: 'Snapdragon 8 Gen 2 for Galaxy',
      camera: 'Chính 50MP & Phụ 12MP, 10MP',
      battery: '4400 mAh'
    },
    rating: 4.8,
    reviews: 88,
    tags: ['Samsung', 'Foldable', 'Z Fold5'],
    featured: true,
    inStock: true
  },
  {
    id: '8fbd52be-915f-4239-bd1b-3db11f1558dc',
    name: 'Xiaomi 14 Ultra 5G',
    category: CATEGORIES.PHONE,
    price: 28990000,
    oldPrice: 32990000,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&q=80&w=400',
    specs: {
      screen: '6.73 inch AMOLED WQHD+',
      cpu: 'Snapdragon 8 Gen 3',
      camera: '4 Camera Leica 50MP',
      battery: '5000 mAh'
    },
    rating: 4.7,
    reviews: 42,
    tags: ['Xiaomi', 'Leica Camera', '90W Fast'],
    featured: false,
    inStock: false
  },
  {
    id: '23cea6ff-61f8-4087-b763-78ece4881286',
    name: 'Google Pixel 8 Pro 128GB',
    category: CATEGORIES.PHONE,
    price: 17890000,
    oldPrice: 19990000,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&q=80&w=400',
    specs: {
      screen: '6.7 inch LTPO OLED',
      cpu: 'Google Tensor G3',
      camera: 'Chính 50MP & Phụ 48MP, 48MP',
      battery: '5050 mAh'
    },
    rating: 4.6,
    reviews: 67,
    tags: ['Google', 'Pixel 8', 'Tensor G3'],
    featured: false,
    inStock: true
  },
  {
    id: '3d9aa884-1992-47ce-b805-cb3fba8e8783',
    name: 'ASUS ROG Phone 8 Pro 512GB',
    category: CATEGORIES.PHONE,
    price: 25990000,
    oldPrice: 28990000,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&q=80&w=400',
    specs: {
      screen: '6.78 inch AMOLED 165Hz',
      cpu: 'Snapdragon 8 Gen 3',
      camera: 'Chính 50MP & Phụ 32MP, 13MP',
      battery: '5500 mAh'
    },
    rating: 4.8,
    reviews: 54,
    tags: ['ASUS', 'ROG Phone', 'Gaming Phone'],
    featured: false,
    inStock: true
  },

  // Gaming Gear
  {
    id: 'ad234ddf-5357-430e-ad3b-47487f59388f',
    name: 'Bàn phím cơ ASUS ROG Azoth Wireless',
    category: CATEGORIES.GEAR,
    price: 6190000,
    oldPrice: 6990000,
    image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&q=80&w=400',
    specs: {
      layout: 'Gasket-mount 75%',
      switches: 'ROG NX Red pre-lubed',
      connectivity: 'Wireless 2.4Ghz / Bluetooth / Type-C',
      features: 'Màn hình OLED tiện lợi, Hot-swap'
    },
    rating: 4.9,
    reviews: 73,
    tags: ['ROG', 'Mechanical', 'OLED Screen'],
    featured: true,
    inStock: true
  },
  {
    id: 'a9bc6e86-16a5-4b95-b626-f3790f4db080',
    name: 'Chuột Gaming Logitech G Pro X Superlight 2',
    category: CATEGORIES.GEAR,
    price: 3690000,
    oldPrice: 3990000,
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&q=80&w=400',
    specs: {
      sensor: 'HERO 2 (32.000 DPI)',
      weight: '60 grams siêu nhẹ',
      switches: 'LIGHTFORCE Hybrid',
      battery: 'Lên tới 95 giờ'
    },
    rating: 4.8,
    reviews: 215,
    tags: ['Logitech', 'Superlight', 'Wireless'],
    featured: true,
    inStock: true
  },
  {
    id: 'd3abffb3-7049-4fae-b77b-852efe3b0baa',
    name: 'Tai nghe ASUS ROG Delta S Animate',
    category: CATEGORIES.GEAR,
    price: 5490000,
    oldPrice: 5990000,
    image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&q=80&w=400',
    specs: {
      drivers: 'ASUS Essence 50mm',
      mic: 'AI Noise-Canceling Microphone',
      connectivity: 'Wired USB-C / USB-A',
      features: 'Màn hình LED AniMe Matrix tùy biến'
    },
    rating: 4.8,
    reviews: 49,
    tags: ['ROG', 'Headset', 'AniMe Matrix'],
    featured: true,
    inStock: true
  },
  {
    id: '2ac99da7-17f6-4d3d-9b4e-2f691ad0ec45',
    name: 'Chuột Gaming Razer Cobra Pro',
    category: CATEGORIES.GEAR,
    price: 3290000,
    oldPrice: 3590000,
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&q=80&w=400',
    specs: {
      sensor: 'Focus Pro 30K Optical Sensor',
      weight: '77 grams',
      connectivity: 'Razer HyperSpeed Wireless / BT',
      rgb: 'Chroma RGB 11 vùng sáng độc lập'
    },
    rating: 4.7,
    reviews: 35,
    tags: ['Razer', 'Wireless Mouse', 'Cobra'],
    featured: true,
    inStock: true
  },
  {
    id: '1676bd51-f25b-4d6f-bdd8-a4fbd82a719f',
    name: 'Tai nghe Razer BlackShark V2 Pro (2023)',
    category: CATEGORIES.GEAR,
    price: 4890000,
    oldPrice: 5290000,
    image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&q=80&w=400',
    specs: {
      drivers: 'Razer TriForce Titanium 50mm',
      mic: 'Razer HyperClear Super Wideband',
      connectivity: 'Wireless 2.4Ghz / Bluetooth',
      weight: '320 grams'
    },
    rating: 4.7,
    reviews: 98,
    tags: ['Razer', 'Esports', 'Spatial Audio'],
    featured: false,
    inStock: true
  },
  {
    id: '08dd4224-30ac-491c-a09d-c1786d70fa38',
    name: 'Bàn di chuột SteelSeries QcK Prism Cloth XL',
    category: CATEGORIES.GEAR,
    price: 1590000,
    oldPrice: 1890000,
    image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&q=80&w=400',
    specs: {
      material: 'Vải dệt vi cấu hình siêu mịn',
      size: '900mm x 300mm x 4mm',
      rgb: '2 vùng chiếu sáng dynamic RGB',
      base: 'Đế cao su chống trượt'
    },
    rating: 4.6,
    reviews: 154,
    tags: ['SteelSeries', 'Mousepad', 'RGB'],
    featured: false,
    inStock: true
  },
  {
    id: 'f35d5c7a-8f6a-4577-8f1f-449b1a6a9f2e',
    name: 'Tay cầm Xbox Elite Wireless Controller Series 2',
    category: CATEGORIES.GEAR,
    price: 4290000,
    oldPrice: 4790000,
    image: 'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&q=80&w=400',
    specs: {
      connectivity: 'Xbox Wireless / Bluetooth / Type-C',
      battery: 'Lên tới 40 giờ sử dụng',
      features: 'Cần gạt tùy chỉnh lực căng, 4 tay chèo kim loại'
    },
    rating: 4.8,
    reviews: 142,
    tags: ['Microsoft', 'Xbox', 'Gamepad'],
    featured: false,
    inStock: true
  },

  // PC Components (Linh kiện)
  {
    id: '38c9ae9f-b795-4eb9-b514-b39742838c68',
    name: 'CPU AMD Ryzen 7 7800X3D',
    category: CATEGORIES.COMPONENT,
    price: 9890000,
    oldPrice: 10890000,
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=400',
    specs: {
      socket: 'AM5',
      cores: '8 Nhân 16 Luồng',
      speed: 'Tối đa 5.0 GHz',
      tdp: '120W'
    },
    rating: 4.9,
    reviews: 142,
    tags: ['AMD', 'Ryzen 7', 'Gaming CPU'],
    featured: true,
    inStock: true
  },
  {
    id: '9083b163-194b-43ef-86f4-93eec86078cf',
    name: 'Card Màn Hình ASUS ROG Strix RTX 4080 Super OC 16GB',
    category: CATEGORIES.COMPONENT,
    price: 33990000,
    oldPrice: 35990000,
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=400',
    specs: {
      vram: '16GB GDDR6X',
      bus: '256-bit',
      fans: '3 Quạt Axial-tech',
      power: 'Đề xuất 850W'
    },
    rating: 4.9,
    reviews: 64,
    tags: ['ASUS', 'NVIDIA', 'RTX 4080 Super'],
    featured: true,
    inStock: true
  },
  {
    id: '1be3e66e-c820-4e1f-a614-6c4c199502cf',
    name: 'RAM Corsair Vengeance RGB 32GB (2x16GB) DDR5 6000MHz',
    category: CATEGORIES.COMPONENT,
    price: 3290000,
    oldPrice: 3690000,
    image: 'https://images.unsplash.com/photo-1541029071515-84cc54f84dc5?auto=format&fit=crop&q=80&w=400',
    specs: {
      capacity: '32GB (2x16GB)',
      type: 'DDR5',
      speed: '6000 MHz',
      rgb: 'Hỗ trợ iCUE RGB'
    },
    rating: 4.8,
    reviews: 110,
    tags: ['Corsair', 'DDR5', 'RGB RAM'],
    featured: true,
    inStock: true
  },
  {
    id: '1acaa9c4-bcd4-42cc-abbb-8f9da6082bdf',
    name: 'Nguồn Corsair RM1000x Shift 1000W Gold',
    category: CATEGORIES.COMPONENT,
    price: 4890000,
    oldPrice: 5290000,
    image: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&q=80&w=400',
    specs: {
      power: '1000W',
      efficiency: '80 Plus Gold Certified',
      modular: 'Full Modular, cáp cổng bên hông',
      atx3: 'Hỗ trợ ATX 3.0 & PCIe 5.0'
    },
    rating: 4.8,
    reviews: 57,
    tags: ['Corsair', 'PSU', '1000W'],
    featured: true,
    inStock: true
  },
  {
    id: '1bcd28ff-e2dd-4c96-acf5-0e8f47849e26',
    name: 'CPU Intel Core i7-14700K',
    category: CATEGORIES.COMPONENT,
    price: 10490000,
    oldPrice: 11290000,
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=400',
    specs: {
      socket: 'LGA1700',
      cores: '20 Nhân 28 Luồng',
      speed: 'Tối đa 5.6 GHz',
      tdp: '125W'
    },
    rating: 4.8,
    reviews: 95,
    tags: ['Intel', 'Core i7', 'Gen 14'],
    featured: false,
    inStock: true
  },
  {
    id: '5acdc3a5-94e9-4b6f-87a9-7b3f139f7a92',
    name: 'SSD Samsung 990 Pro 1TB NVMe M.2 PCIe Gen4',
    category: CATEGORIES.COMPONENT,
    price: 2690000,
    oldPrice: 2990000,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=400',
    specs: {
      interface: 'PCIe Gen4 x4',
      read: 'Tối đa 7450 MB/s',
      write: 'Tối đa 6900 MB/s',
      size: 'M.2 2280'
    },
    rating: 4.9,
    reviews: 184,
    tags: ['Samsung', 'NVMe SSD', 'PCIe 4.0'],
    featured: false,
    inStock: true
  },
  {
    id: '0623d0b2-56ea-49ab-8ae8-0af9fb526b4b',
    name: 'Vỏ Máy Tính Lian Li O11 Vision Black',
    category: CATEGORIES.COMPONENT,
    price: 3890000,
    oldPrice: 4290000,
    image: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&q=80&w=400',
    specs: {
      type: 'Mid Tower',
      material: 'Thép, Kính cường lực 3 mặt',
      motherboards: 'E-ATX, ATX, M-ATX',
      radiator: 'Hỗ trợ Rad tối đa 360mm'
    },
    rating: 4.7,
    reviews: 49,
    tags: ['Lian Li', 'O11 Vision', 'PC Case'],
    featured: false,
    inStock: true
  },
  {
    id: '12f1d5c1-bff5-4a0c-aacb-09923915d989',
    name: 'Tản nhiệt nước AIO ASUS ROG RYUJIN III 360 ARGB',
    category: CATEGORIES.COMPONENT,
    price: 9990000,
    oldPrice: 10990000,
    image: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&q=80&w=400',
    specs: {
      size: '360mm radiator',
      screen: 'Màn hình LCD 3.5 inch hiển thị GIF, thông số',
      fans: '3 quạt ROG Magnetic Daisy-chainable',
      pump: 'Bơm Asetek thế hệ 8 hiệu năng cao'
    },
    rating: 4.9,
    reviews: 28,
    tags: ['ASUS', 'ROG', 'Liquid Cooler'],
    featured: false,
    inStock: true
  },
  {
    id: 'a5ac3f65-d11c-435d-9768-a2c8cd983377',
    name: 'Mainboard ASUS ROG MAXIMUS Z790 HERO',
    category: CATEGORIES.COMPONENT,
    price: 16990000,
    oldPrice: 18990000,
    image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&q=80&w=400',
    specs: {
      socket: 'LGA1700 Intel Gen 14th/13th',
      ram: 'DDR5 lên tới 8000MHz (OC)',
      power: '20+1 pha nguồn 90A',
      features: 'Hỗ trợ PCIe 5.0, Wi-Fi 6E, Thunderbolt 4'
    },
    rating: 4.8,
    reviews: 41,
    tags: ['ASUS', 'ROG', 'Motherboard'],
    featured: false,
    inStock: true
  }
];

// PC Builder Parts catalog database
export const builderParts = {
  cpu: [
    {
      id: '8cbcfae9-5d00-4438-8319-c02b58384ad0',
      name: 'AMD Ryzen 7 7800X3D (8C/16T, up to 5.0GHz, AM5)',
      price: 9890000,
      socket: 'AM5',
      brand: 'AMD',
      color: 'Đen',
      wattage: 120,
      image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=200',
      specs: 'AM5 Socket, Cache 104MB 3D V-Cache, TDP 120W'
    },
    {
      id: 'ab1f0c80-4e93-472b-84f8-aad99f502bf4',
      name: 'Intel Core i7-14700K (20C/28T, up to 5.6GHz, LGA1700)',
      price: 10490000,
      socket: 'LGA1700',
      brand: 'Intel',
      color: 'Đen',
      wattage: 125,
      image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=200',
      specs: 'LGA1700 Socket, 20 Cores / 28 Threads, TDP 125W'
    },
    {
      id: '8f70680d-e4f1-4662-ab26-0baa3ad5383b',
      name: 'AMD Ryzen 5 7600 (6C/12T, up to 5.1GHz, AM5)',
      price: 5290000,
      socket: 'AM5',
      brand: 'AMD',
      color: 'Đen',
      wattage: 65,
      image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=200',
      specs: 'AM5 Socket, 6 Cores / 12 Threads, TDP 65W'
    },
    {
      id: 'd87bd5a9-e28f-4307-95d9-205c2fddbc9f',
      name: 'Intel Core i5-14400F (10C/16T, up to 4.7GHz, LGA1700)',
      price: 5390000,
      socket: 'LGA1700',
      brand: 'Intel',
      color: 'Đen',
      wattage: 65,
      image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=200',
      specs: 'LGA1700 Socket, 10 Cores / 16 Threads, No iGPU'
    }
  ],
  motherboard: [
    {
      id: '4d17b1e5-b341-4725-a508-5ae57f8163a1',
      name: 'ASUS ROG STRIX B650-A GAMING WIFI (AM5, DDR5, Màu Trắng)',
      price: 5990000,
      socket: 'AM5',
      ramType: 'DDR5',
      brand: 'ASUS',
      color: 'Trắng',
      image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&q=80&w=200',
      specs: 'ATX Form Factor, AM5, DDR5, Hỗ trợ PCIe 5.0, Tông trắng cực đẹp'
    },
    {
      id: 'd4ab5706-2d2c-4b60-b6a5-f47ac28ef341',
      name: 'MSI PRO Z790-A MAX WIFI (LGA1700, DDR5, Màu Đen)',
      price: 6490000,
      socket: 'LGA1700',
      ramType: 'DDR5',
      brand: 'MSI',
      color: 'Đen',
      image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&q=80&w=200',
      specs: 'ATX, LGA1700, DDR5, Wi-Fi 7 thế hệ mới, Intel Z790 Chipset'
    },
    {
      id: '042966d1-f1bb-40a1-bd98-dbd4651ef854',
      name: 'Gigabyte B760M GAMING X AX (LGA1700, DDR5, Màu Đen)',
      price: 3690000,
      socket: 'LGA1700',
      ramType: 'DDR5',
      brand: 'GIGABYTE',
      color: 'Đen',
      image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&q=80&w=200',
      specs: 'Micro-ATX, LGA1700, DDR5, Wi-Fi 6E tích hợp'
    },
    {
      id: 'af2aec81-2670-43a0-8ce3-113ca0a1903b',
      name: 'MSI MPG B760M EDGE TI WIFI (LGA1700, DDR5, Màu Trắng)',
      price: 4990000,
      socket: 'LGA1700',
      ramType: 'DDR5',
      brand: 'MSI',
      color: 'Trắng',
      image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&q=80&w=200',
      specs: 'Micro-ATX, LGA1700, DDR5, Silver/White heatsinks'
    }
  ],
  ram: [
    {
      id: '2f3d8918-ef5f-404f-bb9d-ec2c10e39bb2',
      name: 'Corsair Vengeance RGB 32GB (2x16GB) DDR5 6000MHz Black',
      price: 3290000,
      ramType: 'DDR5',
      brand: 'Corsair',
      color: 'Đen',
      image: 'https://images.unsplash.com/photo-1541029071515-84cc54f84dc5?auto=format&fit=crop&q=80&w=200',
      specs: 'DDR5 RAM, Bus 6000MHz, LED RGB iCUE, Cas 36'
    },
    {
      id: '366c0fdc-4e7c-4ba6-abcc-f455606799b7',
      name: 'Kingston FURY Beast RGB 16GB (2x8GB) DDR5 5600MHz Black',
      price: 1790000,
      ramType: 'DDR5',
      brand: 'Kingston',
      color: 'Đen',
      image: 'https://images.unsplash.com/photo-1541029071515-84cc54f84dc5?auto=format&fit=crop&q=80&w=200',
      specs: 'DDR5 RAM, Bus 5600MHz, Thiết kế tản nhiệt nhôm mỏng nhẹ'
    },
    {
      id: '4bb5d979-7787-4921-8bf2-627743af7f29',
      name: 'Corsair Vengeance RGB 32GB (2x16GB) DDR5 6000MHz White',
      price: 3490000,
      ramType: 'DDR5',
      brand: 'Corsair',
      color: 'Trắng',
      image: 'https://images.unsplash.com/photo-1541029071515-84cc54f84dc5?auto=format&fit=crop&q=80&w=200',
      specs: 'DDR5 RAM, Bus 6000MHz, Tông màu trắng tinh tế, LED RGB'
    },
    {
      id: '7c608750-0c29-4b59-9f45-f1b51aadba76',
      name: 'Kingston FURY Beast 16GB (2x8GB) DDR4 3200MHz Black',
      price: 1090000,
      ramType: 'DDR4',
      brand: 'Kingston',
      color: 'Đen',
      image: 'https://images.unsplash.com/photo-1541029071515-84cc54f84dc5?auto=format&fit=crop&q=80&w=200',
      specs: 'DDR4 RAM, Bus 3200MHz, Cas 16, Hỗ trợ XMP 2.0'
    }
  ],
  gpu: [
    {
      id: 'f26a437f-a7f3-4cf2-b081-47b1f0d49424',
      name: 'ASUS ROG Strix RTX 4080 Super OC Edition 16GB Black',
      price: 33990000,
      length: 357, // length in mm
      brand: 'ASUS',
      color: 'Đen',
      wattage: 320,
      image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=200',
      specs: '16GB GDDR6X, OC Edition, Rất dài 357mm, Fan Axial-tech'
    },
    {
      id: 'e7729cdd-d928-4628-afef-c110b53ba824',
      name: 'MSI Gaming X Slim RTX 4070 Ti Super 16GB White',
      price: 24690000,
      length: 307,
      brand: 'MSI',
      color: 'Trắng',
      wattage: 285,
      image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=200',
      specs: '16GB GDDR6X, Bản Slim mỏng nhẹ 307mm, Màu trắng tuyết'
    },
    {
      id: 'cd36f3d6-6661-42dd-9edc-e84533cf699d',
      name: 'Gigabyte GeForce RTX 4060 Ti Gaming OC 8G Black',
      price: 11490000,
      length: 272,
      brand: 'GIGABYTE',
      color: 'Đen',
      wattage: 160,
      image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=200',
      specs: '8GB GDDR6, Dài 272mm, Tản nhiệt WindForce 3X'
    },
    {
      id: 'b827c623-0b2f-4d99-b744-45f3b24f4cfa',
      name: 'GALAX GeForce RTX 4060 EX White 8GB',
      price: 7990000,
      length: 251,
      brand: 'GALAX',
      color: 'Trắng',
      wattage: 115,
      image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=200',
      specs: '8GB GDDR6, Dài 251mm, 2 quạt màu trắng có LED RGB'
    }
  ],
  ssd: [
    {
      id: '6345e661-21b1-4c0b-a507-276b7f441ae9',
      name: 'Samsung 990 Pro 1TB NVMe M.2 PCIe Gen4 x4',
      price: 2690000,
      brand: 'Samsung',
      color: 'Đen',
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=200',
      specs: 'Tốc độ Đọc 7450 MB/s, Ghi 6900 MB/s, Dung lượng 1TB M.2 2280'
    },
    {
      id: 'b5cfd199-2e9f-4c89-8472-f16a3e397025',
      name: 'Crucial P3 Plus 1TB M.2 PCIe Gen4 NVMe',
      price: 1890000,
      brand: 'Crucial',
      color: 'Đen',
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=200',
      specs: 'Tốc độ Đọc 5000 MB/s, Ghi 4200 MB/s, Dung lượng 1TB'
    },
    {
      id: '9e53fc2a-e755-4a5c-8d3f-85e6f6ae8dd3',
      name: 'Kingston NV2 500GB M.2 PCIe NVMe Gen4',
      price: 990000,
      brand: 'Kingston',
      color: 'Đen',
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=200',
      specs: 'Tốc độ Đọc 3500 MB/s, Ghi 2100 MB/s, Phổ thông giá tốt'
    }
  ],
  psu: [
    {
      id: 'f116fbba-ccc9-4934-9caf-4600e1058f4c',
      name: 'Corsair RM850x Shift 850W Gold PCIe 5.0 (Full Modular)',
      price: 3990000,
      brand: 'Corsair',
      color: 'Đen',
      wattageRating: 850,
      image: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&q=80&w=200',
      specs: '850W Gold, Chuẩn PCIe 5.0/ATX 3.0, Cáp Modular cắm hông'
    },
    {
      id: '2f360bad-b10a-444a-a52f-36a18605c51d',
      name: 'Cooler Master MWE Bronze 650W V2',
      price: 1590000,
      brand: 'Cooler Master',
      color: 'Đen',
      wattageRating: 650,
      image: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&q=80&w=200',
      specs: 'Công suất 650W, Chuẩn 80 Plus Bronze hiệu suất ổn định'
    },
    {
      id: 'b1c62c3f-4ae7-427f-afb4-e29288eadd79',
      name: 'MSI MAG A750GL 750W White 80 Plus Gold',
      price: 2290000,
      brand: 'MSI',
      color: 'Trắng',
      wattageRating: 750,
      image: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&q=80&w=200',
      specs: 'Công suất 750W, Chuẩn 80 Plus Gold, Tông màu trắng hoàn toàn'
    }
  ],
  cooler: [
    {
      id: 'be9ab0bb-c850-4224-99bd-0d7b0675f740',
      name: 'Tản nhiệt nước AIO Deepcool LT720 A-RGB 360mm Black',
      price: 3190000,
      type: 'liquid',
      radiatorSize: 360, // size in mm
      height: 0,
      brand: 'Deepcool',
      color: 'Đen',
      image: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&q=80&w=200',
      specs: 'Tản nước AIO, Radiator 360mm, Bơm vô cực ARGB thế hệ 4'
    },
    {
      id: 'c1e8fae7-f4c0-462e-b2f2-57074b6ca8b1',
      name: 'Tản nhiệt khí Thermalright Peerless Assassin 120 SE Black',
      price: 950000,
      type: 'air',
      height: 155, // height in mm
      radiatorSize: 0,
      brand: 'Thermalright',
      color: 'Đen',
      image: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&q=80&w=200',
      specs: 'Tản khí dual-tower, Cao 155mm, 6 ống đồng, 2 quạt 120mm PWM'
    },
    {
      id: 'e23eb750-4c14-434b-9d4a-9a7379a736b3',
      name: 'Tản nhiệt nước AIO ASUS ROG RYUJIN III 360 ARGB White',
      price: 9990000,
      type: 'liquid',
      radiatorSize: 360,
      height: 0,
      brand: 'ASUS',
      color: 'Trắng',
      image: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&q=80&w=200',
      specs: 'AIO cao cấp, Màn hình LCD 3.5 inch, Radiator 360mm, Màu Trắng'
    },
    {
      id: '9b005e63-ff15-42f6-bfae-c4be2f2a799f',
      name: 'Tản nhiệt khí Jonsbo CR-1000 EVO ARGB White',
      price: 390000,
      type: 'air',
      height: 154,
      radiatorSize: 0,
      brand: 'Jonsbo',
      color: 'Trắng',
      image: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&q=80&w=200',
      specs: 'Tản khí single-tower, Cao 154mm, Led ARGB tự động màu trắng'
    }
  ],
  pcCase: [
    {
      id: '97030c14-46c1-419b-b76a-1c9cf3f1e9d3',
      name: 'Lian Li O11 Vision Black (Mặt kính 3 bên liền mạch)',
      price: 3890000,
      maxGpuLength: 455, // maximum GPU clearance in mm
      maxCpuCoolerHeight: 167, // maximum CPU cooler height in mm
      supportedRadiators: [240, 280, 360], // supported radiator sizes in mm
      brand: 'Lian Li',
      color: 'Đen',
      image: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&q=80&w=200',
      specs: 'Mid Tower, VGA dài tối đa 455mm, Tản khí cao 167mm, Hỗ trợ Rad 360mm'
    },
    {
      id: 'a1bdc1a7-fb53-4cab-9f8c-cf62bc0b261a',
      name: 'Montech AIR 903 MAX Black (Có sẵn 4 quạt ARGB)',
      price: 1490000,
      maxGpuLength: 400,
      maxCpuCoolerHeight: 180,
      supportedRadiators: [240, 280, 360],
      brand: 'Montech',
      color: 'Đen',
      image: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&q=80&w=200',
      specs: 'Mid Tower thoáng khí, GPU tối đa 400mm, Tản khí cao 180mm, Rad 360mm'
    },
    {
      id: 'e0514ad0-19a4-43f7-8970-acef50da6ed4',
      name: 'Lian Li O11 Dynamic EVO White (Màu Trắng)',
      price: 4390000,
      maxGpuLength: 426,
      maxCpuCoolerHeight: 167,
      supportedRadiators: [240, 280, 360],
      brand: 'Lian Li',
      color: 'Trắng',
      image: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&q=80&w=200',
      specs: 'Mid Tower cao cấp, GPU tối đa 426mm, Tản khí cao 167mm, Rad 360mm, Màu Trắng'
    },
    {
      id: '7a778bcf-9e48-48a0-84e3-5579c71959f8',
      name: 'SAMA IM01 White (Mini-ITX / Micro-ATX nhỏ gọn)',
      price: 950000,
      maxGpuLength: 335,
      maxCpuCoolerHeight: 155,
      supportedRadiators: [240], // Only supports up to 240mm liquid cooling
      brand: 'SAMA',
      color: 'Trắng',
      image: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&q=80&w=200',
      specs: 'Mini Case siêu nhỏ, GPU tối đa 335mm, Tản khí cao 155mm, Rad tối đa 240mm'
    }
  ]
};
