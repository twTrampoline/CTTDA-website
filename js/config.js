// 商品、售價、尺寸與訂單連線集中於此修改。
// 實物相片使用使用者提供的原始檔名（含大小寫）；若尚未放入 assets 資料夾，會自動顯示原有 SVG 示意圖。
// 特別留意：襪子實物圖檔為 shocks.PNG（不是 socks.PNG）。
window.CTTDA_CONFIG = {
 DONATION_SCRIPT_URL: '', // 部署 server/donation-notification.gs 後填入 /exec 網址。
 APPS_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbyZSQZ9RpbYsRUjur21mtdHCQhOQrT7UuDNNDm9EzSKFJH6J2NR9QZa_hbqQWtVhC4g/exec',
 PRODUCTS: [
        {id:'suit',name:'體操衣',cat:'TEAM WEAR',price:1800,sizes:['XS','S','M','L','XL','2XL'],img:'assets/leotard.jpg',fallback:'assets/product-leotard.svg',desc:'訓練與比賽服裝；下單需填寫身體尺寸。',measurements:true},
        {id:'jacket',name:'外套',cat:'TEAM WEAR',price:1280,sizes:['120','130','140','150','XS','S','M','L','XL','XXL'],img:'assets/jacket.PNG',fallback:'assets/product-jacket.svg',desc:'協會團隊外套。'},
        {id:'shorts',name:'短褲',cat:'TEAM WEAR',price:580,sizes:['5XS','4XS','3XS','2XS','XS','S','M','L'],img:'assets/shorts.PNG',fallback:'assets/product-shorts.svg',desc:'日常訓練短褲。'},
        {id:'pants',name:'長褲',cat:'TEAM WEAR',price:null,sizes:['100','110','120','130','140','150','160','S','M','L','XL','XXL','XXXL'],img:'assets/product-pants.png',desc:'黑色束口長褲，搭配金色 CTTDA 圖案。成人及童裝尺寸可參考尺碼表。',sizeChart:true},
        {id:'slippers',name:'拖鞋',cat:'TEAM WEAR',price:350,sizes:['32-33','34-35','36-37','38-39','40-41','42-43','44-45','46-47'],img:'assets/slippers-photo.png',fallback:'assets/product-slippers.svg',desc:'黑色協會拖鞋。'},
        {id:'socks',name:'運動襪',cat:'TRAINING ACCESSORIES',price:380,sizes:['S','M','L'],img:'assets/shocks.PNG',fallback:'assets/socks-real.jpg|assets/product-socks.svg',desc:'白色襪款搭配金色協會標誌。'},
        {id:'omamori',name:'飛躍守御守',cat:'OFFICIAL GOODS',price:280,sizes:[],img:'assets/omamori.jpg',fallback:'assets/product-omamori.svg',desc:'寓意平安、突破與勇氣。'},
        {id:'towel',name:'運動毛巾',cat:'OFFICIAL GOODS',price:350,sizes:[],img:'assets/towel.PNG',fallback:'assets/product-towel.svg',desc:'訓練及日常運動皆適用。'},
        {id:'bag',name:'CTTDA 提袋',cat:'OFFICIAL GOODS',price:450,sizes:[],img:'assets/bag.png',fallback:'assets/product-bag.svg',desc:'協會紀念提袋。'},
        {id:'badge',name:'襟章',cat:'OFFICIAL GOODS',price:180,sizes:[],img:'assets/product-badge.svg',desc:'小巧的協會紀念品。'},
        {id:'strap',name:'手機帶',cat:'OFFICIAL GOODS',price:320,sizes:[],img:'assets/product-strap.svg',desc:'日常隨身配件。'}
      ]
};
