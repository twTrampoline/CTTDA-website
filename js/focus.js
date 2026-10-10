document.querySelectorAll('.focus-section').forEach((section) => {
    const triggers = [...section.querySelectorAll('.focus-summary')];
    triggers.forEach((trigger) => {
        trigger.addEventListener('click', () => {
            const expand = trigger.getAttribute('aria-expanded') !== 'true';
            triggers.forEach((item) => {
                const active = item === trigger && expand;
                item.setAttribute('aria-expanded', String(active));
                document.getElementById(item.getAttribute('aria-controls')).hidden = !active;
            });
        });
    });
});
