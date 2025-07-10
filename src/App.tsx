



import React, { useEffect, useState, Suspense } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { TonConnectButton, TonConnectUIProvider } from '@tonconnect/ui-react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const giftModels = [
  '/src/3d/Purple_Heart_Buddy_0704043729_texture.glb',
  '/src/3d/Purple_Heart_Buddy_0704043432_texture.glb',
  '/src/3d/Purple_Heart_Buddy_0704043415_texture.glb',
  '/src/3d/Purple_Heart_Buddy_0704043357_texture.glb',
];

function GiftModel({ url }: { url: string }) {
  const gltf = useLoader(GLTFLoader, url);
  // scale прежний, чтобы модель была хорошо видна
  return <primitive object={gltf.scene} scale={1.2} />;
}

function GiftCarousel() {
  const [idx, setIdx] = useState(0);
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start',
      minHeight: 'calc(100vh - 64px)', background: 'linear-gradient(180deg, #a18fff 0%, #7f5fff 100%)', padding: 0,
      width: '100vw',
      overflow: 'hidden',
    }}>
      <div style={{ width: '100%', textAlign: 'center', margin: '40px 0 28px' }}>
        <h2 style={{ color: '#fff', fontSize: 28, fontWeight: 800, margin: 0, zIndex: 10, position: 'relative' }}>Mint Your Gift Figure</h2>
      </div>
      {/* 3D модель без рамки, стрелки вынесены за пределы */}
      <div style={{
        width: '100%',
        maxWidth: 380,
        aspectRatio: '1/1',
        margin: '0 auto 32px auto',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'none',
        boxShadow: 'none',
        borderRadius: 0,
        overflow: 'visible',
        minHeight: 0,
      }}>
        <button onClick={() => setIdx((idx + giftModels.length - 1) % giftModels.length)}
          style={{
            position: 'absolute',
            left: -38, // вынесено за пределы
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            fontSize: 38,
            color: '#fff',
            cursor: 'pointer',
            zIndex: 3,
            filter: 'drop-shadow(0 2px 8px #7f5fff88)',
            padding: 0,
            lineHeight: 1,
          }}>&lt;</button>
        <div style={{ width: '100%', height: '100%', minWidth: 0, minHeight: 0 }}>
          <Canvas camera={{ position: [0, 0, 4], fov: 28 }} style={{ width: '100%', height: '100%', background: 'none', borderRadius: 0, overflow: 'visible', boxShadow: 'none', outline: 'none', border: 'none', display: 'block' }}>
            <ambientLight intensity={1} />
            <directionalLight position={[2, 2, 2]} intensity={1} />
            <Suspense fallback={null}>
              <GiftModel url={giftModels[idx]} />
            </Suspense>
            <OrbitControls enablePan={false} enableZoom={false} />
          </Canvas>
        </div>
        <button onClick={() => setIdx((idx + 1) % giftModels.length)}
          style={{
            position: 'absolute',
            right: -38, // вынесено за пределы
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            fontSize: 38,
            color: '#fff',
            cursor: 'pointer',
            zIndex: 3,
            filter: 'drop-shadow(0 2px 8px #7f5fff88)',
            padding: 0,
            lineHeight: 1,
          }}>&gt;</button>
      </div>
      {/* Информационный блок NFT */}
      <div style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        margin: '0 0 32px 0',
      }}>
        <div style={{
          background: '#fff',
          borderRadius: 28,
          boxShadow: '0 6px 32px #7f5fff22',
          padding: '20px 24px 20px 24px',
          maxWidth: 370,
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 18,
        }}>
          <div style={{
            width: 64, height: 64, borderRadius: '50%', background: 'linear-gradient(135deg,#a18fff 60%,#4fd1fa 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px #a18fff33',
            overflow: 'hidden', flexShrink: 0,
          }}>
            <Canvas camera={{ position: [0, 0, 4], fov: 28 }} style={{ width: 48, height: 48, background: 'none' }}>
              <ambientLight intensity={1} />
              <directionalLight position={[2, 2, 2]} intensity={1} />
              <Suspense fallback={null}>
                <GiftModel url={giftModels[idx]} />
              </Suspense>
              <OrbitControls enablePan={false} enableZoom={false} enableRotate={false} />
            </Canvas>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 700, fontSize: 20, color: '#222', marginBottom: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Meme Figure #{String(idx+1).padStart(3,'0')}</div>
            <div style={{ display: 'flex', gap: 10, fontSize: 15, color: '#888', fontWeight: 500, flexWrap: 'wrap' }}>
              <div>Faction <span style={{ color: '#222', fontWeight: 600, marginLeft: 2 }}>Peepo Legion</span></div>
              <div>Rarity <span style={{ color: '#7f5fff', fontWeight: 700, marginLeft: 2 }}>Epic</span></div>
              <div style={{ color: '#aaa', fontWeight: 500, marginLeft: 0 }}>1/1000</div>
            </div>
          </div>
          <button style={{
            background: 'linear-gradient(90deg, #4fd1fa 0%, #7f5fff 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: 16,
            padding: '14px 28px',
            fontWeight: 800,
            fontSize: 20,
            boxShadow: '0 2px 8px #0001',
            cursor: 'pointer',
            letterSpacing: 1,
            transition: 'filter .15s',
            marginLeft: 12,
            minWidth: 100,
          }}>MINT</button>
        </div>
      </div>
      <div style={{ color: '#fff', fontWeight: 600, fontSize: 18, marginBottom: 24, marginTop: 8 }}>Gift {idx + 1} / {giftModels.length}</div>
    </div>
  );
}

// Добавляем объявление для window.Telegram
declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        ready: () => void;
        // Можно добавить другие методы и свойства по необходимости
      };
    };
  }
}



function App() {
  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.ready();
    }
  }, []);

  const [page, setPage] = useState<'shop' | 'gifts' | 'profile'>('shop');

  return (
    <TonConnectUIProvider manifestUrl="https://tgrwagft.fly.dev/tonconnect-manifest.json">
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <div style={{ flex: 1, width: '100%' }}>
          {page === 'shop' && (
            <div style={{ padding: 24, textAlign: 'center' }}>
              <h2>Gift Store</h2>
              <div>Здесь будет магазин подарков</div>
            </div>
          )}
          {page === 'gifts' && (
            <GiftCarousel />
          )}
          {page === 'profile' && (
            <div style={{ padding: 24, textAlign: 'center' }}>
              <h2>Profile</h2>
              <div>Здесь будет профиль пользователя</div>
              <div style={{ marginTop: 24 }}>
                <TonConnectButton />
              </div>
            </div>
          )}
        </div>
        <div style={{
          display: 'flex',
          borderTop: '1px solid #eee',
          background: '#fff',
          height: 64,
          alignItems: 'center',
          justifyContent: 'space-around',
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 100,
        }}>
          <button
            onClick={() => setPage('shop')}
            style={{
              background: 'none',
              border: 'none',
              outline: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: page === 'shop' ? '#229ED9' : '#222',
              fontWeight: page === 'shop' ? 600 : 400,
              fontSize: 16,
              flex: 1,
              cursor: 'pointer',
            }}
          >
            <span style={{ fontSize: 24 }}>🛒</span>
            <span>Shop</span>
          </button>
          <button
            onClick={() => setPage('gifts')}
            style={{
              background: 'none',
              border: 'none',
              outline: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: page === 'gifts' ? '#229ED9' : '#222',
              fontWeight: page === 'gifts' ? 600 : 400,
              fontSize: 16,
              flex: 1,
              cursor: 'pointer',
            }}
          >
            <span style={{ fontSize: 24 }}>🎁</span>
            <span>My Gifts</span>
          </button>
          <button
            onClick={() => setPage('profile')}
            style={{
              background: 'none',
              border: 'none',
              outline: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: page === 'profile' ? '#229ED9' : '#222',
              fontWeight: page === 'profile' ? 600 : 400,
              fontSize: 16,
              flex: 1,
              cursor: 'pointer',
            }}
          >
            <span style={{ fontSize: 24 }}>👤</span>
            <span>Profile</span>
          </button>
        </div>
        {/* Кнопка TonConnect теперь только в профиле */}
      </div>
    </TonConnectUIProvider>
  );
}

export default App;
