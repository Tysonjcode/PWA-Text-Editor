const installButton = document.getElementById('buttonInstall');

// Listen for the 'beforeinstallprompt' event
// This event is triggered when the browser thinks the user may want to install the PWA
// We save the event object to the `deferredPrompt` variable so that we can use it later
window.addEventListener('beforeinstallprompt', (event) => {
  window.deferredPrompt = event;

  // Show the install button
  installButton.classList.toggle('hidden', false);
});

// Listen for a click event on the install button
// When the button is clicked, we show the install prompt and then hide the install button
installButton.addEventListener('click', async () => {
  const promptEvent = window.deferredPrompt;

  // If the prompt event doesn't exist, we can't install the PWA
  if (!promptEvent) {
    return;
  }

  // Show the install prompt
  promptEvent.prompt();

  // Wait for the user to respond to the prompt
  const result = await promptEvent.userChoice;

  // If the user accepts the installation, log the result
  if (result.outcome === 'accepted') {
    console.log('PWA installation accepted.');
  } else {
    console.log('PWA installation rejected.');
  }

  // Reset the deferred prompt variable to null, since it can only be used once
  window.deferredPrompt = null;

  // Hide the install button
  installButton.classList.toggle('hidden', true);
});

// Listen for the 'appinstalled' event
// This event is triggered when the PWA has been successfully installed
// We set the `deferredPrompt` variable to null to clear it
window.addEventListener('appinstalled', (event) => {
  window.deferredPrompt = null;
});
