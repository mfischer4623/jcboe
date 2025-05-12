// --- frontend-server.js --- (Place in your monorepo root)

const https = require('https'); // Use https for the proxy server
const fs = require('fs');
const path = require('path');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

// --- Configuration ---
const PROXY_PORT = 443; // Standard HTTPS port. Change if needed (e.g., 8443)
const LIVE_IP = '10.0.0.42';
const TEST_IP = '10.0.0.43';

// --- Target Development Server Ports ---
// UPDATED based on your information
const LIVE_DEV_SERVER_PORT = 8080; // Your live dev server runs here
const TEST_DEV_SERVER_PORT = 8081; // Must be different from live (e.g., 8081)

// --- Target URLs (Using HTTPS as npm start uses it) ---
// UPDATED targets
const liveTarget = `https://localhost:${LIVE_DEV_SERVER_PORT}`; // Target port 8080
const testTarget = `https://localhost:${TEST_DEV_SERVER_PORT}`; // Target port 8081

// --- SSL Configuration for the Proxy Server ---
// *** IMPORTANT: Update paths if certs are not in the root ***
const sslKeyPath = path.resolve(__dirname, 'wildcard_jcboe_org.key');
const sslCertPath = path.resolve(__dirname, 'wildcard_jcboe_org.crt');

let sslOptions;
try {
    sslOptions = {
        key: fs.readFileSync(sslKeyPath),
        cert: fs.readFileSync(sslCertPath),
    };
    console.log(`[Proxy Server] SSL certificate and key loaded successfully.`);
} catch (error) {
    console.error(`[Proxy Server] ERROR: Could not read SSL certificate/key files.`);
    console.error(`   Key Path: ${sslKeyPath}`);
    console.error(`   Cert Path: ${sslCertPath}`);
    console.error(`   Error: ${error.message}`);
    console.error(`   Please ensure the files exist at these paths and have read permissions.`);
    process.exit(1); // Exit if SSL certs can't be loaded
}
// --------------------

const app = express();

// --- Proxy Middleware Configuration ---
const commonProxyOptions = {
    changeOrigin: true,
    ws: true,
    secure: false, // OK for localhost targets with non-public certs
    logLevel: 'info',
    onError: (err, req, res) => {
        console.error('[Proxy Server] Proxy error:', err);
         if (!res.headersSent) {
           res.writeHead(500, { 'Content-Type': 'text/plain' });
         }
        res.end('Proxy error: ' + err.message);
    }
};

const liveProxy = createProxyMiddleware({
    ...commonProxyOptions,
    target: liveTarget, // Updated target
});

const testProxy = createProxyMiddleware({
    ...commonProxyOptions,
    target: testTarget, // Updated target
});

// --- Request Routing based on IP ---
app.use((req, res, next) => {
    const localIP = req.socket.localAddress;
    console.log(`[Proxy Server] Request from ${req.ip} to ${req.hostname} (${localIP})${req.originalUrl}`); // Logging

    if (localIP === LIVE_IP) {
        console.log(`[Proxy Server] Routing to LIVE target: ${liveTarget}`); // Log target
        liveProxy(req, res, next);
    } else if (localIP === TEST_IP) {
        console.log(`[Proxy Server] Routing to TEST target: ${testTarget}`); // Log target
        testProxy(req, res, next);
    } else {
        console.warn(`[Proxy Server] Request received on unconfigured IP: ${localIP}. Sending 403.`);
        res.status(403).send(`Forbidden: Service not configured for IP ${localIP}`);
    }
});

// --- Create and Start HTTPS Proxy Servers ---
const liveProxyServer = https.createServer(sslOptions, app);
const testProxyServer = https.createServer(sslOptions, app);

liveProxyServer.listen(PROXY_PORT, LIVE_IP, () => {
    console.log(`🚀 Live Proxy Server listening at https://${LIVE_IP}:${PROXY_PORT}`);
    console.log(`   Forwarding requests to Live Dev Server at ${liveTarget}`); // Log target
});

testProxyServer.listen(PROXY_PORT, TEST_IP, () => {
    console.log(`🧪 Test Proxy Server listening at https://${TEST_IP}:${PROXY_PORT}`);
    console.log(`   Forwarding requests to Test Dev Server at ${testTarget}`); // Log target
});

// --- Error Handling ---
liveProxyServer.on('error', (error) => {
    console.error(`❌ Failed to start Live Proxy listener on ${LIVE_IP}:${PROXY_PORT}. Error: ${error.code}`);
});

testProxyServer.on('error', (error) => {
    console.error(`❌ Failed to start Test Proxy listener on ${TEST_IP}:${PROXY_PORT}. Error: ${error.code}`);
});

// --- WebSocket Handling ---
const handleUpgrade = (req, socket, head, targetHost) => {
    console.log(`[Proxy Server] WebSocket upgrade request for ${targetHost}`);
    const proxy = targetHost === liveTarget ? liveProxy : testProxy;
    if (proxy && proxy.upgrade) {
         proxy.upgrade(req, socket, head);
    } else {
        console.error(`[Proxy Server] Cannot handle WebSocket upgrade for target ${targetHost}`);
        socket.destroy();
    }
};

liveProxyServer.on('upgrade', (req, socket, head) => {
    handleUpgrade(req, socket, head, liveTarget);
});
testProxyServer.on('upgrade', (req, socket, head) => {
     handleUpgrade(req, socket, head, testTarget);
});