window.donationForm = () => ({
    donorName: '', donorEmail: '', donorPhone: '', donorAddress: '',
    privacyConsent: false, donationSending: false, donationSent: false,
    donationStatus: '目前為示範帳戶，請勿實際匯款。通知服務待部署後啟用；通知不代表已確認收款。',
    get hasPersonalData() { return [this.donorName, this.donorEmail, this.donorPhone, this.donorAddress].some(v => v.trim()); },
    async submitDonation() {
        if (this.donationSending || this.donationSent) return;
        if (this.hasPersonalData && !this.privacyConsent) { this.donationStatus = '請先勾選個資同意，或清空個人資料以匿名提交。'; return; }
        const endpoint = window.CTTDA_CONFIG.DONATION_SCRIPT_URL;
        if (!endpoint) { this.donationStatus = '自動通知服務尚未啟用，請聯絡協會；目前沒有提交或寄出任何資料。'; return; }
        this.donationSending = true;
        this.donationStatus = '正在提交，請稍候…';
        try {
            const response = await fetch(endpoint, {
                method: 'POST', body: new URLSearchParams({payload: JSON.stringify({
                    type: 'donation_notice', purpose: this.donationPurpose,
                    amount: Number(this.modalDonationAmount), lastFive: this.donorLastFive.trim(),
                    name: this.donorName.trim(), email: this.donorEmail.trim(),
                    phone: this.donorPhone.trim(), address: this.donorAddress.trim(),
                    consent: this.privacyConsent
                })})
            });
            const result = await response.json();
            if (!response.ok || result.ok !== true) throw new Error('Submission failed');
            this.donationSent = true;
            this.donationStatus = '通知已寄送至協會，待核對轉帳。此通知不代表已確認收款。';
            this.donorName = this.donorEmail = this.donorPhone = this.donorAddress = this.donorLastFive = '';
            this.privacyConsent = false;
        } catch (_) {
            this.donationStatus = '未能確認通知是否寄出，請聯絡協會確認後再試，避免重複通知。';
        } finally { this.donationSending = false; }
    }
});
