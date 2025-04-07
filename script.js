// Cache DOM elements
const elements = {
    qrCode: document.getElementById('qr-code'),
    ssid: document.getElementById('ssid'),
    password: document.getElementById('password'),
    printButton: document.getElementById('print-button'),
    form: document.getElementById('wifi-form')
};

// Constants
const QR_CODE_SIZE = 164;
const QR_CODE_API_URL = 'https://api.qrserver.com/v1/create-qr-code/';

// Utility functions
const encodeURIComponentSafe = (str) => {
    return encodeURIComponent(str).replace(/[!'()*]/g, (c) => {
        return '%' + c.charCodeAt(0).toString(16);
    });
};

const generateWifiString = (ssid, password) => {
    return `WIFI:T:WPA;S:${encodeURIComponentSafe(ssid)};P:${encodeURIComponentSafe(password)};;`;
};

const updateQRCode = () => {
    const ssid = elements.ssid.value.trim();
    const password = elements.password.value.trim();

    if (!ssid || !password) {
        elements.qrCode.src = `${QR_CODE_API_URL}?size=${QR_CODE_SIZE}x${QR_CODE_SIZE}&data=todo`;
        return;
    }

    const wifiString = generateWifiString(ssid, password);
    const qrUrl = `${QR_CODE_API_URL}?size=${QR_CODE_SIZE}x${QR_CODE_SIZE}&data=${wifiString}`;
    
    elements.qrCode.src = qrUrl;
};

// Event handlers
const handleInput = () => {
    // Debounce the update to prevent too many API calls
    clearTimeout(elements.qrCode.updateTimeout);
    elements.qrCode.updateTimeout = setTimeout(updateQRCode, 300);
};

const handlePrint = () => {
    window.print();
};

// Form validation
const validateForm = (event) => {
    const ssid = elements.ssid.value.trim();
    const password = elements.password.value.trim();

    if (!ssid || !password) {
        event.preventDefault();
        alert('Please fill in both network name and password');
        return false;
    }

    return true;
};

// Initialize
const init = () => {
    // Add event listeners
    elements.ssid.addEventListener('input', handleInput);
    elements.password.addEventListener('input', handleInput);
    elements.printButton.addEventListener('click', handlePrint);
    elements.form.addEventListener('submit', validateForm);

    // Initial QR code update
    updateQRCode();
};

// Start the application
document.addEventListener('DOMContentLoaded', init);
