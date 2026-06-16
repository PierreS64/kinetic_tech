const fs = require('fs');
let content = fs.readFileSync('src/mockData.js', 'utf8');

const genericDesc = {
  laptop: [
    { title: 'Hiệu suất vượt trội', content: 'Sản phẩm mang lại hiệu năng mạnh mẽ, đáp ứng hoàn hảo cho mọi nhu cầu làm việc và giải trí cường độ cao. Tích hợp hệ thống tản nhiệt tiên tiến giúp duy trì nhiệt độ lý tưởng.' },
    { title: 'Thiết kế sang trọng, màn hình sắc nét', content: 'Thiết kế tối giản nhưng không kém phần đẳng cấp, kết hợp cùng màn hình độ phân giải cao cho khả năng tái tạo màu sắc chân thực, phù hợp cho dân thiết kế đồ họa lẫn game thủ.', imageCaption: 'Màn hình hiển thị sắc nét với độ tương phản cao', image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=800' }
  ],
  'điện thoại': [
    { title: 'Thiết kế thời thượng, màn hình mượt mà', content: 'Sở hữu thiết kế nguyên khối sang trọng, viền siêu mỏng cùng màn hình tần số quét cao mang lại trải nghiệm vuốt chạm mượt mà nhất. Công nghệ bảo vệ mắt giúp bạn thoải mái sử dụng trong thời gian dài.' },
    { title: 'Camera nhiếp ảnh chuyên nghiệp', content: 'Hệ thống camera được nâng cấp toàn diện, từ ống kính chính góc rộng đến camera tele, hỗ trợ thuật toán AI thông minh giúp bạn dễ dàng lưu lại mọi khoảnh khắc với chất lượng tốt nhất dù là ngày hay đêm.', imageCaption: 'Camera chụp đêm với cảm biến siêu nhạy', image: 'https://images.unsplash.com/photo-1516724562728-afc824a36e84?auto=format&fit=crop&q=80&w=800' }
  ],
  'gaming gear': [
    { title: 'Trải nghiệm đỉnh cao dành cho game thủ', content: 'Được thiết kế chuyên biệt để mang lại lợi thế cạnh tranh tối đa trong mọi tựa game. Các công tắc cơ học siêu nhạy và cảm biến độ chính xác cao giúp mọi thao tác của bạn đều hoàn hảo.' },
    { title: 'Kết nối ổn định, LED RGB rực rỡ', content: 'Hỗ trợ các chuẩn kết nối hiện đại với độ trễ gần như bằng không. Hệ thống LED RGB có thể tùy chỉnh đa dạng qua phần mềm, giúp bạn dễ dàng đồng bộ ánh sáng cho toàn bộ góc máy của mình.', imageCaption: 'Hiệu ứng ánh sáng RGB tuyệt đẹp', image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&q=80&w=800' }
  ],
  'linh kiện': [
    { title: 'Nền tảng vững chắc cho hệ thống PC', content: 'Cung cấp nguồn sức mạnh ổn định và độ bền bỉ đáng kinh ngạc, linh kiện này là sự lựa chọn hàng đầu cho những bộ PC Custom cao cấp. Các linh kiện được chọn lọc kỹ càng đảm bảo tuổi thọ lâu dài.' },
    { title: 'Tương thích hoàn hảo, công nghệ tiên tiến', content: 'Tích hợp các chuẩn kết nối và công nghệ mới nhất trên thị trường, đảm bảo khả năng tương thích với hầu hết các thiết bị khác. Thiết kế tối ưu cho khả năng ép xung và hoạt động liên tục.', imageCaption: 'Hiệu năng tuyệt vời cho hệ thống cao cấp', image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=800' }
  ]
};

const productRegex = /{[\s\S]*?id: '([^']+)'[\s\S]*?category: CATEGORIES\.([A-Z_]+)[\s\S]*?tags: \[.*?\],[\s\S]*?inStock: (true|false)\s*}/g;

let updatedContent = content;

const matchArr = [...content.matchAll(productRegex)];

for (const match of matchArr) {
  const fullMatch = match[0];
  const id = match[1];
  const categoryEnum = match[2];
  
  if (!fullMatch.includes('longDescription:')) {
    let cat = 'laptop';
    if (categoryEnum === 'PHONE') cat = 'điện thoại';
    if (categoryEnum === 'GEAR') cat = 'gaming gear';
    if (categoryEnum === 'COMPONENT') cat = 'linh kiện';
    
    const descString = JSON.stringify(genericDesc[cat], null, 4).replace(/\n/g, '\n    ');
    
    const replacement = fullMatch.replace(/(\s+)(rating:)/, '$1longDescription: ' + descString.trim() + ',$1$2');
    updatedContent = updatedContent.replace(fullMatch, replacement);
  }
}

fs.writeFileSync('src/mockData.js', updatedContent, 'utf8');
console.log('Successfully added longDescription to all remaining products.');
