
import React, { useEffect } from 'react';
import { TonConnectButton, TonConnectUIProvider } from '@tonconnect/ui-react';


function App() {
  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.ready();
      // Можно добавить дополнительную логику взаимодействия с Telegram WebApp API
    }
  }, []);

  return (
    <TonConnectUIProvider manifestUrl="https://tgrwagft.fly.dev/tonconnect-manifest.json">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <h1>Telegram Mini App</h1>
        <TonConnectButton />
      </div>
    </TonConnectUIProvider>
  );
}

export default App;
