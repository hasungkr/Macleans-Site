"use strict";
//Typescript is what I prefer to use but it is a bit newer to me.
const containers = document.querySelectorAll('.email-container');
containers.forEach((container) => {
    const copyButton = container.querySelector('.copy-btn');
    const emailSpan = container.querySelector('.email-address');
    let resetTimeoutId;
    copyButton?.addEventListener('click', async () => {
        if (!emailSpan || !copyButton)
            return;
        const emailText = emailSpan.textContent?.trim() || '';
        try {
            await navigator.clipboard.writeText(emailText);
            const originalText = copyButton.dataset.originalText || copyButton.textContent || 'Copy Email';
            if (!copyButton.dataset.originalText) {
                copyButton.dataset.originalText = originalText;
            }
            copyButton.textContent = 'Copied!';
            clearTimeout(resetTimeoutId);
            resetTimeoutId = window.setTimeout(() => {
                copyButton.textContent = copyButton.dataset.originalText || 'Copy Email';
            }, 2000);
        }
        catch (err) {
            // Log an error to the console if clipboard access is denied or fails
            console.error('Failed to copy email: ', err);
        }
    });
});
