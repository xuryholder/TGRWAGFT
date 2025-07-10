import React from 'react';
import { TonConnectButton, TonConnectUIProvider } from '@tonconnect/ui-react';

function App() {
  return (
    <TonConnectUIProvider manifestUrl="https://your-server.com/tonconnect-manifest.json">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <h1>Telegram Mini App</h1>
        <TonConnectButton />
      </div>
    </TonConnectUIProvider>
  );
}

export default App;
