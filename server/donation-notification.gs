// Create a separate Google Apps Script project. Do not replace the store endpoint.
function doPost(e) {
  const json = value => ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
  try {
    const raw = e && e.parameter && e.parameter.payload;
    if (!raw || raw.length > 5000) throw new Error('Invalid payload');
    const p = JSON.parse(raw);
    if (p.type !== 'donation_notice' || !Number.isInteger(p.amount) || p.amount < 1 || p.amount > 99999999) throw new Error('Invalid amount');
    const read = (key, max) => {
      const value = p[key] == null ? '' : p[key];
      if (typeof value !== 'string' || value.length > max) throw new Error('Invalid field');
      return value.trim();
    };
    const purpose = read('purpose', 80), lastFive = read('lastFive', 5);
    const name = read('name', 80), email = read('email', 160), phone = read('phone', 30), address = read('address', 250);
    if (lastFive && !/^\d{5}$/.test(lastFive)) throw new Error('Invalid last five');
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Invalid email');
    if ([name, email, phone, address].some(Boolean) && p.consent !== true) throw new Error('Consent required');
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      // Limit public endpoint mail volume and accidental repeat submissions.
      const cache = CacheService.getScriptCache();
      const key = Utilities.base64EncodeWebSafe(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, raw));
      if (cache.get(key)) return json({ok:true});
      const hour = Utilities.formatDate(new Date(), 'UTC', 'yyyyMMddHH');
      const count = Number(cache.get(hour) || 0);
      if (count >= 30) throw new Error('Rate limit');
      const live = PropertiesService.getScriptProperties().getProperty('LIVE_DONATIONS') === 'true';
      MailApp.sendEmail({to:'tw.trampoline.association@gmail.com',
        subject:(live ? '' : '【測試】') + 'CTTDA 捐款通知｜NT$ ' + p.amount,
        body:'收到網站提交的捐款通知，請核對銀行紀錄；這不是收款確認。\n\n用途：' + purpose + '\n金額：NT$ ' + p.amount + '\n轉出帳號末五碼：' + (lastFive || '未提供') + '\n姓名：' + (name || '匿名') + '\n電郵：' + (email || '未提供') + '\n電話：' + (phone || '未提供') + '\n地址：' + (address || '未提供') + '\n個資同意：' + (p.consent === true ? '已同意' : '未提供個人資料')});
      cache.put(key, 'sent', 600);
      cache.put(hour, String(count + 1), 3600);
      return json({ok:true});
    } finally { lock.releaseLock(); }
  } catch (_) { return json({ok:false}); }
}
