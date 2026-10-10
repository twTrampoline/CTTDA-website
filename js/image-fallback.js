/* CTTDA 實物圖片後備處理。保留既有商品 SVG，不會以錯誤圖片路徑取代原設計。 */
(() => {
  document.addEventListener('error', (event) => {
    const img = event.target;
    if (!(img instanceof HTMLImageElement) || !img.hasAttribute('data-fallback')) return;
    const options = (img.getAttribute('data-fallback') || '').split('|').filter(Boolean);
    const next = options.shift();
    if (!next) {
      img.removeAttribute('data-fallback');
      return;
    }
    if (options.length) img.setAttribute('data-fallback', options.join('|'));
    else img.removeAttribute('data-fallback');
    img.src = next;
  }, true);
})();
