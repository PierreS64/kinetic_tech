export const CATEGORIES = {
  LAPTOP: 'laptop',
  PHONE: 'điện thoại',
  GEAR: 'gaming gear',
  COMPONENT: 'linh kiện'
};

export const products = [
  // Laptops
  {
    id: 'lap-01',
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
    longDescription: [
      {
        title: 'Cỗ máy chiến game hoàn hảo ASUS ROG Strix G16 (2024)',
        content: 'Với thiết kế đậm chất tương lai và viền LED RGB bao quanh rực rỡ, ASUS ROG Strix G16 (2024) không chỉ là một chiếc laptop gaming mà còn là một tác phẩm nghệ thuật. Khung máy được tinh chỉnh với các rãnh hút gió lớn giúp tối ưu khả năng làm mát, cho phép bạn chơi các tựa game AAA trong nhiều giờ liền mà không lo tụt xung nhịp.'
      },
      {
        title: 'Sức mạnh từ Intel Core i7 thế hệ 13',
        content: 'Trang bị CPU Intel Core i7-13650HX 14 nhân, 20 luồng cực kỳ mạnh mẽ, Strix G16 dư sức đáp ứng từ việc xử lý đa nhiệm, streaming đến render video chất lượng cao. Khả năng ép xung tự động thông minh giúp CPU luôn đạt mức hiệu năng tối đa khi cần thiết.',
        imageCaption: 'Hiệu suất đa luồng vượt trội với Intel Core i7-13650HX',
        image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80&w=800'
      },
      {
        title: 'Card đồ họa NVIDIA GeForce RTX 4060',
        content: 'Sức mạnh đồ họa được nâng tầm nhờ GPU RTX 4060 8GB với công nghệ DLSS 3 và Frame Generation. Mọi tựa game bom tấn hiện nay đều có thể được trải nghiệm mượt mà ở mức thiết lập đồ họa Ultra, đi kèm với đó là hiệu ứng Ray Tracing siêu thực.',
        imageCaption: 'Hiệu năng đồ họa đỉnh cao với kiến trúc Ada Lovelace',
        image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=800'
      },
      {
        title: 'Màn hình 16 inch siêu mượt 165Hz',
        content: 'Trải nghiệm thị giác không thể tuyệt vời hơn với màn hình 16 inch tỷ lệ 16:10, cung cấp không gian hiển thị rộng rãi hơn. Tần số quét 165Hz và thời gian phản hồi cực thấp giúp các chuyển động trong game eSports như CS2 hay Valorant trở nên mượt mà, nắm bắt mọi khoảnh khắc quyết định.',
        imageCaption: 'Màn hình 165Hz với độ phủ màu sRGB 100%',
        image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=800'
      }
    ],
    rating: 4.8,
    reviews: 124,
    tags: ['Gaming', 'RTX 4060', '165Hz'],
    featured: true,
    inStock: true
  },
  {
    id: 'lap-02',
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
    longDescription: [
      {
        title: 'MacBook Pro 14 inch M3: Sức mạnh đáng kinh ngạc',
        content: 'Với con chip M3 thế hệ mới được sản xuất trên tiến trình 3nm, MacBook Pro 14 inch 2024 mang lại hiệu suất CPU và GPU vượt trội hơn bao giờ hết. Mọi tác vụ từ duyệt web, chỉnh sửa ảnh cho đến render video 4K đều được xử lý nhẹ nhàng với mức tiêu thụ điện năng cực thấp, giúp máy hoạt động mát mẻ cả ngày dài.'
      },
      {
        title: 'Màn hình Liquid Retina XDR rực rỡ',
        content: 'Trải nghiệm hình ảnh tuyệt đẹp trên màn hình Liquid Retina XDR với độ sáng tối đa lên tới 1600 nits khi xem nội dung HDR. Tỷ lệ tương phản 1.000.000:1 kết hợp cùng công nghệ ProMotion 120Hz mang đến hình ảnh sắc nét, dải màu rộng và các chuyển động cuộn siêu mượt mà.',
        imageCaption: 'Màn hình tốt nhất từng có trên máy Mac',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800'
      },
      {
        title: 'Thời lượng pin vô đối lên đến 22 giờ',
        content: 'Sự tối ưu hóa phần cứng và phần mềm hoàn hảo từ Apple giúp MacBook Pro 14 inch M3 đạt thời lượng pin kỷ lục lên tới 22 giờ phát lại video liên tục. Bạn có thể tự tin làm việc cả ngày dài, trong các chuyến bay xuyên lục địa mà không cần phải mang theo bộ sạc.',
        imageCaption: 'Làm việc cả ngày không lo hết pin',
        image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&q=80&w=800'
      }
    ],
    rating: 4.9,
    reviews: 86,
    tags: ['Workplace', 'M3 Chip', 'Retina'],
    featured: true,
    inStock: true
  },
  {
    id: 'lap-04',
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
    longDescription: [
        {
            "title": "Hiệu suất vượt trội",
            "content": "Sản phẩm mang lại hiệu năng mạnh mẽ, đáp ứng hoàn hảo cho mọi nhu cầu làm việc và giải trí cường độ cao. Tích hợp hệ thống tản nhiệt tiên tiến giúp duy trì nhiệt độ lý tưởng."
        },
        {
            "title": "Thiết kế sang trọng, màn hình sắc nét",
            "content": "Thiết kế tối giản nhưng không kém phần đẳng cấp, kết hợp cùng màn hình độ phân giải cao cho khả năng tái tạo màu sắc chân thực, phù hợp cho dân thiết kế đồ họa lẫn game thủ.",
            "imageCaption": "Màn hình hiển thị sắc nét với độ tương phản cao",
            "image": "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=800"
        }
    ],
    rating: 4.9,
    reviews: 43,
    tags: ['Dell', 'XPS', 'Ultrabook'],
    featured: true,
    inStock: true
  },
  {
    id: 'lap-05',
    name: 'Laptop Acer Predator Helios Neo 16 PHN16 I31 50H7',
    category: CATEGORIES.LAPTOP,
    price: 33490000,
    oldPrice: 36990000,
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&q=80&w=400',
    specs: {
      cpu: 'Intel Core i5-14450HX',
      ram: '32GB DDR5 5600MHz',
      storage: '512GB SSD PCIe NVMe',
      gpu: 'NVIDIA RTX 5050 8GB GDDR7',
      screen: '16" FHD+ 180Hz sRGB 100%'
    },
    longDescription: [
      {
        title: 'Khám phá laptop gaming Acer Predator Helios Neo 16 PHN16 I31 50H7',
        content: 'Acer Predator Helios Neo 16 PHN16 I31 50H7 là chiếc laptop gaming tối ưu chi phí nhưng vẫn đủ “chiến” lâu dài. Máy giữ DNA đặc trưng của dòng Helios Neo với thiết kế hầm hố với màu Abyssal Black và mang lại hiệu năng ổn định, phù hợp cho những ai muốn chơi game mượt mà mà không nhất thiết phải “max option” cấu hình.'
      },
      {
        title: 'CPU Intel Core i5‑14450HX hiệu năng cao',
        content: 'Sức mạnh của PHN16 I31 50H7 là vi xử lý Intel Core i5‑14450HX với 10 nhân, 16 luồng cùng với 20MB Intel Smart Cache để tối ưu tốc độ xử lý. Cấu hình này giúp máy chạy tốt các tựa game eSports, game AAA ở thiết lập hợp lý, đồng thời vẫn đáp ứng được những tác vụ nặng như chỉnh sửa video, dựng cảnh 3D cơ bản hay mở nhiều ứng dụng cùng lúc.',
        imageCaption: 'Laptop Acer Predator Helios Neo 16 PHN16 I31 50H7 có CPU Intel Core i5‑14450HX',
        image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80&w=800'
      },
      {
        title: 'RAM DDR5 32GB đa nhiệm thoải mái',
        content: 'Máy được trang bị sẵn 32GB RAM DDR5 với tốc độ hỗ trợ tới 5600MHz, mang lại băng thông lớn và độ trễ thấp, rất phù hợp cho các tác vụ đa nhiệm nặng. Hai khe RAM rời cho phép nâng cấp tối đa lên 96GB nên khi nhu cầu làm việc với project lớn, chạy song song nhiều phần mềm đồ họa hoặc dùng máy như một workstation di động, bạn vẫn có không gian để mở rộng. Với dung lượng 32GB ngay từ đầu, người dùng có thể yên tâm vừa chơi game, vừa mở trình duyệt nhiều tab, vừa chạy ứng dụng chat, stream và các công cụ hỗ trợ khác mà hệ thống vẫn giữ được độ mượt.',
        imageCaption: 'Laptop Acer Predator Helios Neo 16 PHN16 I31 50H7 có RAM DDR5 32GB đa nhiệm thoải mái',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800'
      },
      {
        title: 'Lưu trữ SSD NVMe hỗ trợ hai khe',
        content: 'Acer Predator Helios Neo 16 PHN16 I31 50H7 đi kèm SSD PCIe NVMe 512GB cho tốc độ đọc ghi cao để khởi động máy nhanh và load bản đồ hoặc level trong thời gian ngắn. Hệ thống hỗ trợ tới 2 khe SSD với khả năng nâng cấp tối đa 4TB tạo điều kiện cho game thủ cài cùng lúc nhiều tựa game dung lượng lớn, thư viện video hay dữ liệu đồ họa nặng. Việc chia ổ riêng cho hệ điều hành/ứng dụng và ổ riêng cho game, dự án cũng trở nên đơn giản hơn khi bạn mở rộng dung lượng về sau.',
        imageCaption: 'Laptop Acer Predator Helios Neo 16 PHN16 I31 50H7 có lưu trữ SSD NVMe',
        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=800'
      },
      {
        title: 'Màn hình 16" FHD+ với sRGB 100%',
        content: 'Laptop sử dụng màn hình 16 inch FHD+ độ phủ màu sRGB 100% mang đến hình ảnh sắc nét, màu sắc tươi và chính xác. Chất lượng hiển thị này không chỉ đẹp mắt khi chơi game mà còn đủ tin cậy cho các tác vụ chỉnh sửa ảnh, video ở mức bán chuyên. Tần số quét 180Hz kết hợp thời gian phản hồi 3ms giúp chuyển động trên màn hình rất mượt, hạn chế xé hình và bóng mờ khi xoay camera nhanh hoặc combat dồn dập trong các tựa game FPS, MOBA.',
        imageCaption: 'Laptop Acer Predator Helios Neo 16 PHN16 I31 50H7 có màn hình 16',
        image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=800'
      },
      {
        title: 'Sức mạnh đồ họa RTX 5050 8GB GDDR7',
        content: 'Điểm nhấn quan trọng của PHN16 I31 50H7 nằm ở card đồ họa rời NVIDIA GeForce RTX 5050 với 8GB VRAM GDDR7 và 2560 nhân CUDA. GPU này mang lại hiệu năng đồ họa rất tốt trong phân khúc, đủ sức “cân” mượt các game mới ở mức thiết lập cao. Ngoài chơi game, RTX 5050 còn giúp tăng tốc cho nhiều phần mềm sáng tạo nội dung, rút ngắn thời gian render video, xử lý hiệu ứng hay dựng cảnh 3D, phù hợp với người dùng vừa giải trí vừa làm việc.',
        imageCaption: 'Laptop Acer Predator Helios Neo 16 PHN16 I31 50H7 có sức mạnh đồ họa RTX 5050 8GB GDDR7',
        image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=800'
      },
      {
        title: 'Cổng kết nối đầy đủ cho dàn gaming gear',
        content: 'Acer Predator Helios Neo 16 PHN16 I31 50H7 được trang bị 2 cổng USB Type‑C, 3 cổng USB Standard‑A, cổng HDMI 2.1, khe đọc thẻ microSD, cổng Ethernet RJ‑45 và jack âm thanh 3.5 mm. Nhờ hệ thống cổng kết nối phong phú, bạn dễ dàng hoàn thiện góc gaming với chuột, bàn phím, tay cầm, tai nghe và màn hình phụ mà không lo thiếu cổng.',
        imageCaption: 'Laptop Acer Predator Helios Neo 16 PHN16 I31 50H7 có cổng kết nối đầy đủ cho dàn gaming gear',
        image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&q=80&w=800'
      },
      {
        title: 'Mua ngay Acer Predator Helios Neo 16 PHN16 I31 50H7 tại GearVN',
        content: 'Ai bảo i5 là không đủ "chiến"? Ai bảo tối ưu chi phí là phải hy sinh trải nghiệm? Acer Predator Helios Neo 16 PHN16 I31 50H7 tại GearVN sẽ thay đổi hoàn toàn suy nghĩ của bạn! Đến với GearVN, bạn không chỉ nhận được mức giá tốt nhất thị trường mà còn là sự an tâm tuyệt đối với chính sách bảo hành uy tín từ nhà GearVN. Đừng mải mê tìm kiếm đâu xa, "kèo thơm" nhất năm chính là đây!'
      }
    ],
    rating: 4.7,
    reviews: 79,
    tags: ['Gaming', 'Predator', 'RTX 5050'],
    featured: true,
    inStock: true
  },
  {
    id: 'lap-03',
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
    longDescription: [
        {
            "title": "Hiệu suất vượt trội",
            "content": "Sản phẩm mang lại hiệu năng mạnh mẽ, đáp ứng hoàn hảo cho mọi nhu cầu làm việc và giải trí cường độ cao. Tích hợp hệ thống tản nhiệt tiên tiến giúp duy trì nhiệt độ lý tưởng."
        },
        {
            "title": "Thiết kế sang trọng, màn hình sắc nét",
            "content": "Thiết kế tối giản nhưng không kém phần đẳng cấp, kết hợp cùng màn hình độ phân giải cao cho khả năng tái tạo màu sắc chân thực, phù hợp cho dân thiết kế đồ họa lẫn game thủ.",
            "imageCaption": "Màn hình hiển thị sắc nét với độ tương phản cao",
            "image": "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=800"
        }
    ],
    rating: 4.7,
    reviews: 58,
    tags: ['Gaming', 'Legion', 'RTX 4050'],
    featured: false,
    inStock: true
  },
  {
    id: 'lap-06',
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
    longDescription: [
        {
            "title": "Hiệu suất vượt trội",
            "content": "Sản phẩm mang lại hiệu năng mạnh mẽ, đáp ứng hoàn hảo cho mọi nhu cầu làm việc và giải trí cường độ cao. Tích hợp hệ thống tản nhiệt tiên tiến giúp duy trì nhiệt độ lý tưởng."
        },
        {
            "title": "Thiết kế sang trọng, màn hình sắc nét",
            "content": "Thiết kế tối giản nhưng không kém phần đẳng cấp, kết hợp cùng màn hình độ phân giải cao cho khả năng tái tạo màu sắc chân thực, phù hợp cho dân thiết kế đồ họa lẫn game thủ.",
            "imageCaption": "Màn hình hiển thị sắc nét với độ tương phản cao",
            "image": "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=800"
        }
    ],
    rating: 4.5,
    reviews: 94,
    tags: ['HP', 'Victus', 'Gaming'],
    featured: false,
    inStock: true
  },
  {
    id: 'lap-07',
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
    longDescription: [
        {
            "title": "Hiệu suất vượt trội",
            "content": "Sản phẩm mang lại hiệu năng mạnh mẽ, đáp ứng hoàn hảo cho mọi nhu cầu làm việc và giải trí cường độ cao. Tích hợp hệ thống tản nhiệt tiên tiến giúp duy trì nhiệt độ lý tưởng."
        },
        {
            "title": "Thiết kế sang trọng, màn hình sắc nét",
            "content": "Thiết kế tối giản nhưng không kém phần đẳng cấp, kết hợp cùng màn hình độ phân giải cao cho khả năng tái tạo màu sắc chân thực, phù hợp cho dân thiết kế đồ họa lẫn game thủ.",
            "imageCaption": "Màn hình hiển thị sắc nét với độ tương phản cao",
            "image": "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=800"
        }
    ],
    rating: 4.4,
    reviews: 31,
    tags: ['Gigabyte', 'RTX 4060', 'Gaming'],
    featured: false,
    inStock: true
  },

  // Phones
  {
    id: 'phone-01',
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
    longDescription: [
      {
        title: 'iPhone 15 Pro Max: Đỉnh cao thiết kế Titanium',
        content: 'Lần đầu tiên trên iPhone, Apple trang bị vật liệu Titanium chuẩn hàng không vũ trụ cho iPhone 15 Pro Max. Không chỉ mang lại vẻ ngoài nhám sang trọng và chống bám vân tay, Titanium còn giúp giảm đáng kể trọng lượng của máy, mang lại cảm giác cầm nắm thoải mái và chắc chắn hơn bao giờ hết.'
      },
      {
        title: 'Sức mạnh không tưởng từ chip A17 Pro 3nm',
        content: 'Được trang bị vi xử lý A17 Pro - con chip 3nm đầu tiên trong ngành smartphone, iPhone 15 Pro Max cung cấp hiệu năng CPU và GPU vượt trội. Khả năng hỗ trợ Ray Tracing bằng phần cứng cho phép bạn trải nghiệm các tựa game console như Resident Evil Village ngay trên chiếc điện thoại của mình với độ mượt mà đáng kinh ngạc.',
        imageCaption: 'Chip A17 Pro mạnh mẽ hỗ trợ Ray Tracing',
        image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=800'
      },
      {
        title: 'Camera tiềm vọng zoom quang 5x',
        content: 'Hệ thống camera Pro được nâng cấp mạnh mẽ với camera chính 48MP cho khả năng chụp ảnh thiếu sáng xuất sắc. Đặc biệt, ống kính Telephoto mới trên bản Pro Max hỗ trợ zoom quang học lên đến 5x ở tiêu cự 120mm, giúp bạn dễ dàng lưu lại những khoảnh khắc từ xa một cách sắc nét nhất.',
        imageCaption: 'Hệ thống camera đỉnh cao với zoom quang học 5x',
        image: 'https://images.unsplash.com/photo-1516724562728-afc824a36e84?auto=format&fit=crop&q=80&w=800'
      },
      {
        title: 'Cổng USB-C tốc độ cao & Nút Action mới',
        content: 'Sự thay đổi lịch sử với việc chuyển sang cổng USB-C hỗ trợ chuẩn USB 3, cho tốc độ truyền dữ liệu lên đến 10Gbps. Cùng với đó là nút Action Button hoàn toàn mới thay thế cần gạt rung truyền thống, cho phép tùy chỉnh để khởi chạy camera, bật đèn pin, hay kích hoạt phím tắt chỉ với một thao tác nhấn giữ.',
        imageCaption: 'Cổng kết nối USB-C và nút Action thông minh',
        image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&q=80&w=800'
      }
    ],
    rating: 4.9,
    reviews: 320,
    tags: ['Apple', 'A17 Pro', 'Titanium'],
    featured: true,
    inStock: true
  },
  {
    id: 'phone-02',
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
    longDescription: [
      {
        title: 'Kỷ nguyên AI trên điện thoại di động',
        content: 'Galaxy S24 Ultra mở ra một kỷ nguyên mới với Galaxy AI tích hợp sẵn. Từ khả năng phiên dịch trực tiếp cuộc gọi (Live Translate), khoanh vùng tìm kiếm thông minh (Circle to Search), cho đến các công cụ trợ lý chỉnh sửa ảnh, viết lại văn bản bằng AI - mọi thứ đều trở nên dễ dàng và tự nhiên hơn bao giờ hết.'
      },
      {
        title: 'Khung viền Titanium bền bỉ, màn hình phẳng hoàn hảo',
        content: 'Sở hữu khung viền Titanium chắc chắn nhưng cực kỳ sang trọng, kết hợp cùng kính cường lực Corning Gorilla Armor chống xước vượt trội và giảm độ bóng lóa đến 75%. Thiết kế màn hình đã được tinh chỉnh phẳng hơn, tối ưu hoàn hảo cho trải nghiệm sử dụng S-Pen để ghi chú, vẽ và điều hướng.',
        imageCaption: 'Thiết kế nam tính, khung viền Titanium siêu bền',
        image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=800'
      },
      {
        title: 'Camera 200MP - Mắt thần bóng đêm',
        content: 'Cụm camera xuất sắc nhất thế giới Android với cảm biến chính 200MP, đem lại độ chi tiết kinh ngạc. Ống kính Telephoto 50MP mới cung cấp khả năng zoom quang học 5x cực kỳ sắc nét. Cùng với AI xử lý hình ảnh ProVisual Engine mới, ảnh chụp đêm giờ đây sáng rõ, ít nhiễu hạt và sống động hơn bao giờ hết.',
        imageCaption: 'Thu phóng quang học 5x sắc nét bất kể ngày đêm',
        image: 'https://images.unsplash.com/photo-1621330396163-4f0ccff2dbd8?auto=format&fit=crop&q=80&w=800'
      }
    ],
    rating: 4.8,
    reviews: 195,
    tags: ['Samsung', 'Galaxy AI', 'S-Pen'],
    featured: true,
    inStock: true
  },
  {
    id: 'phone-04',
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
    longDescription: [
        {
            "title": "Thiết kế thời thượng, màn hình mượt mà",
            "content": "Sở hữu thiết kế nguyên khối sang trọng, viền siêu mỏng cùng màn hình tần số quét cao mang lại trải nghiệm vuốt chạm mượt mà nhất. Công nghệ bảo vệ mắt giúp bạn thoải mái sử dụng trong thời gian dài."
        },
        {
            "title": "Camera nhiếp ảnh chuyên nghiệp",
            "content": "Hệ thống camera được nâng cấp toàn diện, từ ống kính chính góc rộng đến camera tele, hỗ trợ thuật toán AI thông minh giúp bạn dễ dàng lưu lại mọi khoảnh khắc với chất lượng tốt nhất dù là ngày hay đêm.",
            "imageCaption": "Camera chụp đêm với cảm biến siêu nhạy",
            "image": "https://images.unsplash.com/photo-1516724562728-afc824a36e84?auto=format&fit=crop&q=80&w=800"
        }
    ],
    rating: 4.7,
    reviews: 145,
    tags: ['Apple', 'iPhone 15', 'Dynamic Island'],
    featured: true,
    inStock: true
  },
  {
    id: 'phone-05',
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
    longDescription: [
        {
            "title": "Thiết kế thời thượng, màn hình mượt mà",
            "content": "Sở hữu thiết kế nguyên khối sang trọng, viền siêu mỏng cùng màn hình tần số quét cao mang lại trải nghiệm vuốt chạm mượt mà nhất. Công nghệ bảo vệ mắt giúp bạn thoải mái sử dụng trong thời gian dài."
        },
        {
            "title": "Camera nhiếp ảnh chuyên nghiệp",
            "content": "Hệ thống camera được nâng cấp toàn diện, từ ống kính chính góc rộng đến camera tele, hỗ trợ thuật toán AI thông minh giúp bạn dễ dàng lưu lại mọi khoảnh khắc với chất lượng tốt nhất dù là ngày hay đêm.",
            "imageCaption": "Camera chụp đêm với cảm biến siêu nhạy",
            "image": "https://images.unsplash.com/photo-1516724562728-afc824a36e84?auto=format&fit=crop&q=80&w=800"
        }
    ],
    rating: 4.8,
    reviews: 88,
    tags: ['Samsung', 'Foldable', 'Z Fold5'],
    featured: true,
    inStock: true
  },
  {
    id: 'phone-03',
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
    longDescription: [
        {
            "title": "Thiết kế thời thượng, màn hình mượt mà",
            "content": "Sở hữu thiết kế nguyên khối sang trọng, viền siêu mỏng cùng màn hình tần số quét cao mang lại trải nghiệm vuốt chạm mượt mà nhất. Công nghệ bảo vệ mắt giúp bạn thoải mái sử dụng trong thời gian dài."
        },
        {
            "title": "Camera nhiếp ảnh chuyên nghiệp",
            "content": "Hệ thống camera được nâng cấp toàn diện, từ ống kính chính góc rộng đến camera tele, hỗ trợ thuật toán AI thông minh giúp bạn dễ dàng lưu lại mọi khoảnh khắc với chất lượng tốt nhất dù là ngày hay đêm.",
            "imageCaption": "Camera chụp đêm với cảm biến siêu nhạy",
            "image": "https://images.unsplash.com/photo-1516724562728-afc824a36e84?auto=format&fit=crop&q=80&w=800"
        }
    ],
    rating: 4.7,
    reviews: 42,
    tags: ['Xiaomi', 'Leica Camera', '90W Fast'],
    featured: false,
    inStock: false
  },
  {
    id: 'phone-06',
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
    longDescription: [
        {
            "title": "Thiết kế thời thượng, màn hình mượt mà",
            "content": "Sở hữu thiết kế nguyên khối sang trọng, viền siêu mỏng cùng màn hình tần số quét cao mang lại trải nghiệm vuốt chạm mượt mà nhất. Công nghệ bảo vệ mắt giúp bạn thoải mái sử dụng trong thời gian dài."
        },
        {
            "title": "Camera nhiếp ảnh chuyên nghiệp",
            "content": "Hệ thống camera được nâng cấp toàn diện, từ ống kính chính góc rộng đến camera tele, hỗ trợ thuật toán AI thông minh giúp bạn dễ dàng lưu lại mọi khoảnh khắc với chất lượng tốt nhất dù là ngày hay đêm.",
            "imageCaption": "Camera chụp đêm với cảm biến siêu nhạy",
            "image": "https://images.unsplash.com/photo-1516724562728-afc824a36e84?auto=format&fit=crop&q=80&w=800"
        }
    ],
    rating: 4.6,
    reviews: 67,
    tags: ['Google', 'Pixel 8', 'Tensor G3'],
    featured: false,
    inStock: true
  },
  {
    id: 'phone-07',
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
    longDescription: [
        {
            "title": "Thiết kế thời thượng, màn hình mượt mà",
            "content": "Sở hữu thiết kế nguyên khối sang trọng, viền siêu mỏng cùng màn hình tần số quét cao mang lại trải nghiệm vuốt chạm mượt mà nhất. Công nghệ bảo vệ mắt giúp bạn thoải mái sử dụng trong thời gian dài."
        },
        {
            "title": "Camera nhiếp ảnh chuyên nghiệp",
            "content": "Hệ thống camera được nâng cấp toàn diện, từ ống kính chính góc rộng đến camera tele, hỗ trợ thuật toán AI thông minh giúp bạn dễ dàng lưu lại mọi khoảnh khắc với chất lượng tốt nhất dù là ngày hay đêm.",
            "imageCaption": "Camera chụp đêm với cảm biến siêu nhạy",
            "image": "https://images.unsplash.com/photo-1516724562728-afc824a36e84?auto=format&fit=crop&q=80&w=800"
        }
    ],
    rating: 4.8,
    reviews: 54,
    tags: ['ASUS', 'ROG Phone', 'Gaming Phone'],
    featured: false,
    inStock: true
  },

  // Gaming Gear
  {
    id: 'gear-01',
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
    longDescription: [
      {
        title: 'Bàn phím cơ Custom cao cấp ASUS ROG Azoth',
        content: 'ROG Azoth là bàn phím cơ định dạng 75% mang đến trải nghiệm gõ phím chuẩn "custom" cho giới game thủ. Thiết kế Gasket Mount với 3 lớp đệm silicon giúp triệt tiêu hoàn toàn tiếng ồn và tiếng vang, tạo ra âm thanh "thock" cực kỳ êm ái và đã tai mỗi khi gõ.'
      },
      {
        title: 'Màn hình OLED đa chức năng độc đáo',
        content: 'Điểm nhấn của ROG Azoth là màn hình OLED 2 inch góc trên cùng bên phải. Nó không chỉ hiển thị các thông số hệ thống, nhiệt độ CPU/GPU, dung lượng pin mà còn cho phép hiển thị ảnh động GIF cá nhân hóa. Núm xoay điều khiển 3 chiều tích hợp bên cạnh giúp bạn dễ dàng điều chỉnh âm lượng hoặc chuyển đổi hiệu ứng LED RGB.',
        imageCaption: 'Màn hình OLED thông minh hiển thị đa thông tin',
        image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&q=80&w=800'
      },
      {
        title: 'Kết nối 3 chế độ siêu tốc',
        content: 'Với công nghệ ROG SpeedNova ở chế độ không dây 2.4 GHz, Azoth đảm bảo độ trễ siêu thấp và thời lượng pin cực khủng, lên tới hơn 2.000 giờ sử dụng nếu tắt màn hình OLED và LED RGB. Bạn cũng có thể linh hoạt chuyển đổi qua Bluetooth (hỗ trợ kết nối cùng lúc 3 thiết bị) hoặc cắm cáp USB-C.',
        imageCaption: 'Kết nối linh hoạt với thời lượng pin khủng',
        image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=800'
      },
      {
        title: 'Switch ROG NX Pre-lubed & Hot-swappable',
        content: 'Được trang bị sẵn Switch ROG NX Red Linear đã được lube (bôi trơn) sẵn từ nhà máy, mang lại hành trình nhấn mượt mà và ổn định. Đặc biệt, mạch Hot-swap hỗ trợ thay thế nóng cả switch 3-pin và 5-pin, cho phép người dùng thoải mái tùy biến loại switch yêu thích mà không cần phải rã hàn.',
        imageCaption: 'Trải nghiệm gõ phím tuyệt vời với mạch Hot-swap',
        image: 'https://images.unsplash.com/photo-1621609764180-2a558a9d601b?auto=format&fit=crop&q=80&w=800'
      }
    ],
    rating: 4.9,
    reviews: 73,
    tags: ['ROG', 'Mechanical', 'OLED Screen'],
    featured: true,
    inStock: true
  },
  {
    id: 'gear-02',
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
    longDescription: [
      {
        title: 'Sự tiến hóa của nhà vua eSports',
        content: 'Logitech G Pro X Superlight 2 giữ nguyên thiết kế công thái học đối xứng được yêu thích trên toàn cầu, nhưng được nâng cấp toàn diện bên trong. Trọng lượng vẫn giữ ở mức 60 gram ấn tượng nhưng sở hữu cảm biến và switch hoàn toàn mới, đáp ứng đòi hỏi khắt khe nhất của các tuyển thủ FPS chuyên nghiệp.'
      },
      {
        title: 'Switch quang học LIGHTFORCE hoàn toàn mới',
        content: 'Lần đầu tiên dòng Superlight được trang bị switch LIGHTFORCE Hybrid - sự kết hợp giữa tốc độ siêu phản hồi của switch quang học và cảm giác nhấn tactile nảy đặc trưng của switch cơ. Sự nâng cấp này giúp loại bỏ hoàn toàn vấn đề double-click rắc rối, đồng thời mang lại độ bền siêu hạng.',
        imageCaption: 'Switch LIGHTFORCE siêu bền, không lo double-click',
        image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&q=80&w=800'
      },
      {
        title: 'Cảm biến HERO 2 mạnh mẽ, Type-C tiện dụng',
        content: 'Mắt đọc HERO thế hệ thứ 2 cho phép theo dõi tới 32.000 DPI, tốc độ lướt trên 500 IPS, đảm bảo tracking chuẩn xác từng pixel. Bên cạnh đó, Logitech cuối cùng cũng trang bị cổng sạc USB Type-C hiện đại thay cho Micro-USB cũ, đi kèm là thời lượng pin trâu bò lên tới 95 giờ sử dụng liên tục.',
        imageCaption: 'Cảm biến HERO 2 và cổng sạc USB-C',
        image: 'https://images.unsplash.com/photo-1527814050087-379381547384?auto=format&fit=crop&q=80&w=800'
      }
    ],
    rating: 4.8,
    reviews: 215,
    tags: ['Logitech', 'Superlight', 'Wireless'],
    featured: true,
    inStock: true
  },
  {
    id: 'gear-04',
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
    longDescription: [
        {
            "title": "Trải nghiệm đỉnh cao dành cho game thủ",
            "content": "Được thiết kế chuyên biệt để mang lại lợi thế cạnh tranh tối đa trong mọi tựa game. Các công tắc cơ học siêu nhạy và cảm biến độ chính xác cao giúp mọi thao tác của bạn đều hoàn hảo."
        },
        {
            "title": "Kết nối ổn định, LED RGB rực rỡ",
            "content": "Hỗ trợ các chuẩn kết nối hiện đại với độ trễ gần như bằng không. Hệ thống LED RGB có thể tùy chỉnh đa dạng qua phần mềm, giúp bạn dễ dàng đồng bộ ánh sáng cho toàn bộ góc máy của mình.",
            "imageCaption": "Hiệu ứng ánh sáng RGB tuyệt đẹp",
            "image": "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&q=80&w=800"
        }
    ],
    rating: 4.8,
    reviews: 49,
    tags: ['ROG', 'Headset', 'AniMe Matrix'],
    featured: true,
    inStock: true
  },
  {
    id: 'gear-05',
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
    longDescription: [
        {
            "title": "Trải nghiệm đỉnh cao dành cho game thủ",
            "content": "Được thiết kế chuyên biệt để mang lại lợi thế cạnh tranh tối đa trong mọi tựa game. Các công tắc cơ học siêu nhạy và cảm biến độ chính xác cao giúp mọi thao tác của bạn đều hoàn hảo."
        },
        {
            "title": "Kết nối ổn định, LED RGB rực rỡ",
            "content": "Hỗ trợ các chuẩn kết nối hiện đại với độ trễ gần như bằng không. Hệ thống LED RGB có thể tùy chỉnh đa dạng qua phần mềm, giúp bạn dễ dàng đồng bộ ánh sáng cho toàn bộ góc máy của mình.",
            "imageCaption": "Hiệu ứng ánh sáng RGB tuyệt đẹp",
            "image": "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&q=80&w=800"
        }
    ],
    rating: 4.7,
    reviews: 35,
    tags: ['Razer', 'Wireless Mouse', 'Cobra'],
    featured: true,
    inStock: true
  },
  {
    id: 'gear-03',
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
    longDescription: [
        {
            "title": "Trải nghiệm đỉnh cao dành cho game thủ",
            "content": "Được thiết kế chuyên biệt để mang lại lợi thế cạnh tranh tối đa trong mọi tựa game. Các công tắc cơ học siêu nhạy và cảm biến độ chính xác cao giúp mọi thao tác của bạn đều hoàn hảo."
        },
        {
            "title": "Kết nối ổn định, LED RGB rực rỡ",
            "content": "Hỗ trợ các chuẩn kết nối hiện đại với độ trễ gần như bằng không. Hệ thống LED RGB có thể tùy chỉnh đa dạng qua phần mềm, giúp bạn dễ dàng đồng bộ ánh sáng cho toàn bộ góc máy của mình.",
            "imageCaption": "Hiệu ứng ánh sáng RGB tuyệt đẹp",
            "image": "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&q=80&w=800"
        }
    ],
    rating: 4.7,
    reviews: 98,
    tags: ['Razer', 'Esports', 'Spatial Audio'],
    featured: false,
    inStock: true
  },
  {
    id: 'gear-06',
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
    longDescription: [
        {
            "title": "Trải nghiệm đỉnh cao dành cho game thủ",
            "content": "Được thiết kế chuyên biệt để mang lại lợi thế cạnh tranh tối đa trong mọi tựa game. Các công tắc cơ học siêu nhạy và cảm biến độ chính xác cao giúp mọi thao tác của bạn đều hoàn hảo."
        },
        {
            "title": "Kết nối ổn định, LED RGB rực rỡ",
            "content": "Hỗ trợ các chuẩn kết nối hiện đại với độ trễ gần như bằng không. Hệ thống LED RGB có thể tùy chỉnh đa dạng qua phần mềm, giúp bạn dễ dàng đồng bộ ánh sáng cho toàn bộ góc máy của mình.",
            "imageCaption": "Hiệu ứng ánh sáng RGB tuyệt đẹp",
            "image": "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&q=80&w=800"
        }
    ],
    rating: 4.6,
    reviews: 154,
    tags: ['SteelSeries', 'Mousepad', 'RGB'],
    featured: false,
    inStock: true
  },
  {
    id: 'gear-07',
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
    longDescription: [
        {
            "title": "Trải nghiệm đỉnh cao dành cho game thủ",
            "content": "Được thiết kế chuyên biệt để mang lại lợi thế cạnh tranh tối đa trong mọi tựa game. Các công tắc cơ học siêu nhạy và cảm biến độ chính xác cao giúp mọi thao tác của bạn đều hoàn hảo."
        },
        {
            "title": "Kết nối ổn định, LED RGB rực rỡ",
            "content": "Hỗ trợ các chuẩn kết nối hiện đại với độ trễ gần như bằng không. Hệ thống LED RGB có thể tùy chỉnh đa dạng qua phần mềm, giúp bạn dễ dàng đồng bộ ánh sáng cho toàn bộ góc máy của mình.",
            "imageCaption": "Hiệu ứng ánh sáng RGB tuyệt đẹp",
            "image": "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&q=80&w=800"
        }
    ],
    rating: 4.8,
    reviews: 142,
    tags: ['Microsoft', 'Xbox', 'Gamepad'],
    featured: false,
    inStock: true
  },

  // PC Components (Linh kiện)
  {
    id: 'comp-01',
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
    longDescription: [
      {
        title: 'Vị vua đích thực của thế giới Gaming PC',
        content: 'AMD Ryzen 7 7800X3D hiện là bộ vi xử lý chơi game tốt nhất thế giới. Sở hữu 8 nhân, 16 luồng trên kiến trúc Zen 4, CPU này mang lại hiệu suất xuất sắc không chỉ trong chơi game mà còn cho các tác vụ đa nhiệm cơ bản hàng ngày.'
      },
      {
        title: 'Công nghệ 3D V-Cache đột phá',
        content: 'Điều làm nên sự vĩ đại của 7800X3D chính là công nghệ xếp chồng bộ nhớ đệm 3D V-Cache. Với tổng bộ nhớ đệm lên tới 104MB, CPU này giải quyết triệt để vấn đề "nghẽn cổ chai" dữ liệu trong các tựa game tối ưu kém hoặc đòi hỏi xử lý vật lý lớn, mang lại số khung hình (FPS) cao ngất ngưởng và độ ổn định khung hình (1% Low) cực tốt.',
        imageCaption: 'Sức mạnh 3D V-Cache tối ưu hóa FPS tối đa',
        image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=800'
      },
      {
        title: 'Hiệu suất năng lượng ấn tượng',
        content: 'Dù sở hữu hiệu năng đứng top 1, Ryzen 7 7800X3D lại vô cùng mát mẻ và tiết kiệm điện. Khi chơi game nặng, CPU chỉ tiêu thụ khoảng 50-70W điện, cho phép bạn dễ dàng làm mát nó bằng các loại tản nhiệt khí tầm trung hoặc tản AIO giá rẻ mà không cần đến các hệ thống tản nhiệt đắt đỏ.',
        imageCaption: 'Socket AM5 mới hỗ trợ lâu dài',
        image: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&q=80&w=800'
      }
    ],
    rating: 4.9,
    reviews: 142,
    tags: ['AMD', 'Ryzen 7', 'Gaming CPU'],
    featured: true,
    inStock: true
  },
  {
    id: 'comp-03',
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
    longDescription: [
      {
        title: 'Sự hoàn hảo của kiến trúc Ada Lovelace',
        content: 'Phiên bản RTX 4080 SUPER từ dòng ROG Strix là một con quái vật thực sự. Sở hữu lượng nhân CUDA tăng cường và bộ nhớ GDDR6X tốc độ cao, chiếc card màn hình này đủ sức "thổi bay" mọi tựa game AAA ở độ phân giải 4K với mức thiết lập đồ họa Max Setting.'
      },
      {
        title: 'Thiết kế hầm hố, tản nhiệt buồng hơi siêu mát',
        content: 'Thiết kế Exoskeleton kết hợp khung kim loại nguyên khối cùng viền LED Aura Sync chạy dọc bo mạch mang tới vẻ ngoài đẳng cấp. Hệ thống tản nhiệt siêu to nạc chiếm tới 3.5 slot PCIe với công nghệ tản nhiệt buồng hơi (Vapor Chamber) và 3 quạt Axial-tech thế hệ mới giúp GPU luôn mát mẻ dưới 65 độ ngay cả khi chạy full load liên tục.',
        imageCaption: 'Tản nhiệt đỉnh cao, thiết kế độc quyền từ ROG',
        image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&q=80&w=800'
      },
      {
        title: 'Công nghệ DLSS 3 và Frame Gen tối tân',
        content: 'Nhân AI Tensor thế hệ thứ 4 cho phép tính năng DLSS 3 hoạt động ở mức cao nhất. Trí tuệ nhân tạo sẽ "tạo ra" các khung hình mới, giúp tăng gấp đôi hoặc gấp ba FPS trong các game nặng như Cyberpunk 2077 hay Alan Wake 2, mang lại trải nghiệm chơi game siêu mượt mà.',
        imageCaption: 'Chinh phục mọi tựa game 4K dễ dàng',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800'
      }
    ],
    rating: 4.9,
    reviews: 64,
    tags: ['ASUS', 'NVIDIA', 'RTX 4080 Super'],
    featured: true,
    inStock: true
  },
  {
    id: 'comp-04',
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
    longDescription: [
        {
            "title": "Nền tảng vững chắc cho hệ thống PC",
            "content": "Cung cấp nguồn sức mạnh ổn định và độ bền bỉ đáng kinh ngạc, linh kiện này là sự lựa chọn hàng đầu cho những bộ PC Custom cao cấp. Các linh kiện được chọn lọc kỹ càng đảm bảo tuổi thọ lâu dài."
        },
        {
            "title": "Tương thích hoàn hảo, công nghệ tiên tiến",
            "content": "Tích hợp các chuẩn kết nối và công nghệ mới nhất trên thị trường, đảm bảo khả năng tương thích với hầu hết các thiết bị khác. Thiết kế tối ưu cho khả năng ép xung và hoạt động liên tục.",
            "imageCaption": "Hiệu năng tuyệt vời cho hệ thống cao cấp",
            "image": "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=800"
        }
    ],
    rating: 4.8,
    reviews: 110,
    tags: ['Corsair', 'DDR5', 'RGB RAM'],
    featured: true,
    inStock: true
  },
  {
    id: 'comp-07',
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
    longDescription: [
        {
            "title": "Nền tảng vững chắc cho hệ thống PC",
            "content": "Cung cấp nguồn sức mạnh ổn định và độ bền bỉ đáng kinh ngạc, linh kiện này là sự lựa chọn hàng đầu cho những bộ PC Custom cao cấp. Các linh kiện được chọn lọc kỹ càng đảm bảo tuổi thọ lâu dài."
        },
        {
            "title": "Tương thích hoàn hảo, công nghệ tiên tiến",
            "content": "Tích hợp các chuẩn kết nối và công nghệ mới nhất trên thị trường, đảm bảo khả năng tương thích với hầu hết các thiết bị khác. Thiết kế tối ưu cho khả năng ép xung và hoạt động liên tục.",
            "imageCaption": "Hiệu năng tuyệt vời cho hệ thống cao cấp",
            "image": "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=800"
        }
    ],
    rating: 4.8,
    reviews: 57,
    tags: ['Corsair', 'PSU', '1000W'],
    featured: true,
    inStock: true
  },
  {
    id: 'comp-02',
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
    longDescription: [
        {
            "title": "Nền tảng vững chắc cho hệ thống PC",
            "content": "Cung cấp nguồn sức mạnh ổn định và độ bền bỉ đáng kinh ngạc, linh kiện này là sự lựa chọn hàng đầu cho những bộ PC Custom cao cấp. Các linh kiện được chọn lọc kỹ càng đảm bảo tuổi thọ lâu dài."
        },
        {
            "title": "Tương thích hoàn hảo, công nghệ tiên tiến",
            "content": "Tích hợp các chuẩn kết nối và công nghệ mới nhất trên thị trường, đảm bảo khả năng tương thích với hầu hết các thiết bị khác. Thiết kế tối ưu cho khả năng ép xung và hoạt động liên tục.",
            "imageCaption": "Hiệu năng tuyệt vời cho hệ thống cao cấp",
            "image": "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=800"
        }
    ],
    rating: 4.8,
    reviews: 95,
    tags: ['Intel', 'Core i7', 'Gen 14'],
    featured: false,
    inStock: true
  },
  {
    id: 'comp-05',
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
    longDescription: [
        {
            "title": "Nền tảng vững chắc cho hệ thống PC",
            "content": "Cung cấp nguồn sức mạnh ổn định và độ bền bỉ đáng kinh ngạc, linh kiện này là sự lựa chọn hàng đầu cho những bộ PC Custom cao cấp. Các linh kiện được chọn lọc kỹ càng đảm bảo tuổi thọ lâu dài."
        },
        {
            "title": "Tương thích hoàn hảo, công nghệ tiên tiến",
            "content": "Tích hợp các chuẩn kết nối và công nghệ mới nhất trên thị trường, đảm bảo khả năng tương thích với hầu hết các thiết bị khác. Thiết kế tối ưu cho khả năng ép xung và hoạt động liên tục.",
            "imageCaption": "Hiệu năng tuyệt vời cho hệ thống cao cấp",
            "image": "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=800"
        }
    ],
    rating: 4.9,
    reviews: 184,
    tags: ['Samsung', 'NVMe SSD', 'PCIe 4.0'],
    featured: false,
    inStock: true
  },
  {
    id: 'comp-06',
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
    longDescription: [
        {
            "title": "Nền tảng vững chắc cho hệ thống PC",
            "content": "Cung cấp nguồn sức mạnh ổn định và độ bền bỉ đáng kinh ngạc, linh kiện này là sự lựa chọn hàng đầu cho những bộ PC Custom cao cấp. Các linh kiện được chọn lọc kỹ càng đảm bảo tuổi thọ lâu dài."
        },
        {
            "title": "Tương thích hoàn hảo, công nghệ tiên tiến",
            "content": "Tích hợp các chuẩn kết nối và công nghệ mới nhất trên thị trường, đảm bảo khả năng tương thích với hầu hết các thiết bị khác. Thiết kế tối ưu cho khả năng ép xung và hoạt động liên tục.",
            "imageCaption": "Hiệu năng tuyệt vời cho hệ thống cao cấp",
            "image": "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=800"
        }
    ],
    rating: 4.7,
    reviews: 49,
    tags: ['Lian Li', 'O11 Vision', 'PC Case'],
    featured: false,
    inStock: true
  },
  {
    id: 'comp-08',
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
    longDescription: [
        {
            "title": "Nền tảng vững chắc cho hệ thống PC",
            "content": "Cung cấp nguồn sức mạnh ổn định và độ bền bỉ đáng kinh ngạc, linh kiện này là sự lựa chọn hàng đầu cho những bộ PC Custom cao cấp. Các linh kiện được chọn lọc kỹ càng đảm bảo tuổi thọ lâu dài."
        },
        {
            "title": "Tương thích hoàn hảo, công nghệ tiên tiến",
            "content": "Tích hợp các chuẩn kết nối và công nghệ mới nhất trên thị trường, đảm bảo khả năng tương thích với hầu hết các thiết bị khác. Thiết kế tối ưu cho khả năng ép xung và hoạt động liên tục.",
            "imageCaption": "Hiệu năng tuyệt vời cho hệ thống cao cấp",
            "image": "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=800"
        }
    ],
    rating: 4.9,
    reviews: 28,
    tags: ['ASUS', 'ROG', 'Liquid Cooler'],
    featured: false,
    inStock: true
  },
  {
    id: 'comp-09',
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
    longDescription: [
        {
            "title": "Nền tảng vững chắc cho hệ thống PC",
            "content": "Cung cấp nguồn sức mạnh ổn định và độ bền bỉ đáng kinh ngạc, linh kiện này là sự lựa chọn hàng đầu cho những bộ PC Custom cao cấp. Các linh kiện được chọn lọc kỹ càng đảm bảo tuổi thọ lâu dài."
        },
        {
            "title": "Tương thích hoàn hảo, công nghệ tiên tiến",
            "content": "Tích hợp các chuẩn kết nối và công nghệ mới nhất trên thị trường, đảm bảo khả năng tương thích với hầu hết các thiết bị khác. Thiết kế tối ưu cho khả năng ép xung và hoạt động liên tục.",
            "imageCaption": "Hiệu năng tuyệt vời cho hệ thống cao cấp",
            "image": "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=800"
        }
    ],
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
      id: 'cpu-01',
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
      id: 'cpu-02',
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
      id: 'cpu-03',
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
      id: 'cpu-04',
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
      id: 'mobo-01',
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
      id: 'mobo-02',
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
      id: 'mobo-03',
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
      id: 'mobo-04',
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
      id: 'ram-01',
      name: 'Corsair Vengeance RGB 32GB (2x16GB) DDR5 6000MHz Black',
      price: 3290000,
      ramType: 'DDR5',
      brand: 'Corsair',
      color: 'Đen',
      image: 'https://images.unsplash.com/photo-1541029071515-84cc54f84dc5?auto=format&fit=crop&q=80&w=200',
      specs: 'DDR5 RAM, Bus 6000MHz, LED RGB iCUE, Cas 36'
    },
    {
      id: 'ram-02',
      name: 'Kingston FURY Beast RGB 16GB (2x8GB) DDR5 5600MHz Black',
      price: 1790000,
      ramType: 'DDR5',
      brand: 'Kingston',
      color: 'Đen',
      image: 'https://images.unsplash.com/photo-1541029071515-84cc54f84dc5?auto=format&fit=crop&q=80&w=200',
      specs: 'DDR5 RAM, Bus 5600MHz, Thiết kế tản nhiệt nhôm mỏng nhẹ'
    },
    {
      id: 'ram-03',
      name: 'Corsair Vengeance RGB 32GB (2x16GB) DDR5 6000MHz White',
      price: 3490000,
      ramType: 'DDR5',
      brand: 'Corsair',
      color: 'Trắng',
      image: 'https://images.unsplash.com/photo-1541029071515-84cc54f84dc5?auto=format&fit=crop&q=80&w=200',
      specs: 'DDR5 RAM, Bus 6000MHz, Tông màu trắng tinh tế, LED RGB'
    },
    {
      id: 'ram-04',
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
      id: 'gpu-01',
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
      id: 'gpu-02',
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
      id: 'gpu-03',
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
      id: 'gpu-04',
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
      id: 'ssd-01',
      name: 'Samsung 990 Pro 1TB NVMe M.2 PCIe Gen4 x4',
      price: 2690000,
      brand: 'Samsung',
      color: 'Đen',
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=200',
      specs: 'Tốc độ Đọc 7450 MB/s, Ghi 6900 MB/s, Dung lượng 1TB M.2 2280'
    },
    {
      id: 'ssd-02',
      name: 'Crucial P3 Plus 1TB M.2 PCIe Gen4 NVMe',
      price: 1890000,
      brand: 'Crucial',
      color: 'Đen',
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=200',
      specs: 'Tốc độ Đọc 5000 MB/s, Ghi 4200 MB/s, Dung lượng 1TB'
    },
    {
      id: 'ssd-03',
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
      id: 'psu-01',
      name: 'Corsair RM850x Shift 850W Gold PCIe 5.0 (Full Modular)',
      price: 3990000,
      brand: 'Corsair',
      color: 'Đen',
      wattageRating: 850,
      image: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&q=80&w=200',
      specs: '850W Gold, Chuẩn PCIe 5.0/ATX 3.0, Cáp Modular cắm hông'
    },
    {
      id: 'psu-02',
      name: 'Cooler Master MWE Bronze 650W V2',
      price: 1590000,
      brand: 'Cooler Master',
      color: 'Đen',
      wattageRating: 650,
      image: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&q=80&w=200',
      specs: 'Công suất 650W, Chuẩn 80 Plus Bronze hiệu suất ổn định'
    },
    {
      id: 'psu-03',
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
      id: 'cooler-01',
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
      id: 'cooler-02',
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
      id: 'cooler-03',
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
      id: 'cooler-04',
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
      id: 'case-01',
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
      id: 'case-02',
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
      id: 'case-03',
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
      id: 'case-04',
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
