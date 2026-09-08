//Typescript is what I prefer to use but it is a bit newer to me so it will include more comments

// Select all elements with the class 'email-container' on the page as HTMLDivElement types
const containers = document.querySelectorAll<HTMLDivElement>('.email-container');

// Iterate through each email container element found
containers.forEach((container) => {
  // Query for the copy button and email text span inside the current container,
  // casting them to their respective HTML element types for TypeScript type safety
  const copyButton = container.querySelector<HTMLButtonElement>('.copy-btn');
  const emailSpan = container.querySelector<HTMLSpanElement>('.email-address');

  // Maintain a reference ID for the reset timeout per container to manage rapid clicks
  let resetTimeoutId: number | undefined;

  // Attach a click event listener to the copy button using optional chaining in case it doesn't exist
  copyButton?.addEventListener('click', async () => {
    // Early exit safeguard: stop execution if either element is missing from the DOM
    if (!emailSpan || !copyButton) return;

    // Extract and trim the text content from the email span element, falling back to an empty string
    const emailText = emailSpan.textContent?.trim() || '';

    try {
      // Write the extracted email address string to the user's system clipboard asynchronously
      await navigator.clipboard.writeText(emailText);

      // Check for a saved original label in 'data-original-text'; fallback to current button text or a default string
      const originalText = copyButton.dataset.originalText || copyButton.textContent || 'Copy Email';
      
      // Cache the original button label in a custom HTML data attribute if it hasn't been saved yet
      if (!copyButton.dataset.originalText) {
        copyButton.dataset.originalText = originalText;
      }

      // Provide visual feedback by updating the button label
      copyButton.textContent = 'Copied!';

      // Cancel any active countdown timer if the user clicks the button multiple times quickly
      if (resetTimeoutId !== undefined) {
        clearTimeout(resetTimeoutId);
      }

      // Schedule a timer to restore the original button label back after a 2-second delay (2000 ms)
      resetTimeoutId = window.setTimeout(() => {
        copyButton.textContent = copyButton.dataset.originalText || 'Copy Email';
      }, 2000);

    } catch (err) {
      // Log an error to the console if clipboard access is denied or fails
      console.error('Failed to copy email: ', err);
    }
  });
});