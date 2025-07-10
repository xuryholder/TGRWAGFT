



import React, { useEffect, useState, Suspense } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { TonConnectButton, TonConnectUIProvider } from '@tonconnect/ui-react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const giftModels = [
  '/3d/Purple_Heart_Buddy_0704043729_texture.glb',
  '/3d/Purple_Heart_Buddy_0704043432_texture.glb',
  '/3d/Purple_Heart_Buddy_0704043415_texture.glb',
  '/3d/Purple_Heart_Buddy_0704043357_texture.glb',
];

function GiftModel({ url }: { url: string }) {
  const gltf = useLoader(GLTFLoader, url);
  // scale уменьшен для более компактного отображения
  return <primitive object={gltf.scene} scale={0.9} />;
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
        maxWidth: 340,
        aspectRatio: '1/1',
        margin: '0 auto 32px auto',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'none',
        boxShadow: 'none',
        borderRadius: 24,
        overflow: 'visible',
        minHeight: 0,
        padding: '0 16px',
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
        padding: '0 16px',
        boxSizing: 'border-box',
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
          boxSizing: 'border-box',
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

function ShopPage() {
// --- SHOP PAGE ---
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
  // Данные для карточек (можно вынести в отдельный файл)
  const popular = [
    { icon: '🟢', img: '/3d/pepe.png', name: 'Pepe Toy', sub: 'Rare', price: '', btn: 'Gift' },
    { icon: '🐰', img: '/3d/bunny.png', name: 'Plush Bunny', sub: '$2,00', price: '$2,00', btn: 'Gift' },
    { icon: '🪙', img: '/3d/shiba.png', name: 'Shiba Inu Coin', sub: '$5,00', price: '$5,00', btn: 'Gift' },
  ];
  const arrivals = [
    { icon: '🧸', img: '/3d/bear.png', name: 'Lovey Bear', sub: 'Epic', price: '', btn: 'Gift' },
    { icon: '🐔', img: '/3d/chicken.png', name: 'Birthday Chicken', sub: '', price: '', btn: 'Gift' },
  ];
  const collections = [
    { icon: '🟢', img: '/3d/pepe.png', name: 'Memes' },
    { icon: '🟦', img: '/3d/nft.png', name: 'NFTs' },
    { icon: '🔵', img: '/3d/plush.png', name: 'Plush' },
  ];
  return (
    <div style={{
      minHeight: '100vh', background: 'linear-gradient(180deg,#eaf3ff 0%,#cbe3ff 100%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start',
      padding: 0,
    }}>
      <div style={{
        width: 370, maxWidth: '100vw', margin: '24px auto 0', background: '#fff', borderRadius: 32, boxShadow: '0 8px 32px #b3d6ff33',
        padding: '0 0 24px 0', position: 'relative',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}>
        {/* Header */}
        <div style={{ width: '100%', padding: '0 0 0 0', position: 'relative', minHeight: 120 }}>
          <button style={{ position: 'absolute', left: 18, top: 24, background: 'none', border: 'none', fontSize: 28, color: '#8bb6e6', cursor: 'pointer' }}>{'\u2190'}</button>
          <div style={{ textAlign: 'center', fontWeight: 700, fontSize: 28, marginTop: 24, color: '#222' }}>Gift Store</div>
          <img src="/3d/peepo_hero.png" alt="hero" style={{ position: 'absolute', right: -18, top: 0, width: 160, height: 160, objectFit: 'contain', pointerEvents: 'none' }} />
        </div>
        <div style={{ width: '100%', padding: '0 24px', marginTop: 8, marginBottom: 18 }}>
          <div style={{ fontWeight: 700, fontSize: 26, color: '#222', marginBottom: 6 }}>Give Emotions<br />in Telegram</div>
        </div>
        {/* Popular Gifts */}
        <div style={{ width: '100%', padding: '0 24px', marginTop: 8 }}>
          <div style={{ fontWeight: 700, fontSize: 20, color: '#222', marginBottom: 10 }}>Popular Gifts</div>
          <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
            {popular.map((g, i) => (
              <div key={i} style={{ flex: 1, background: '#f7faff', borderRadius: 18, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 12, minWidth: 0 }}>
                <img src={g.img} alt={g.name} style={{ width: 54, height: 54, marginBottom: 6 }} />
                <div style={{ fontWeight: 700, fontSize: 15, color: '#222', textAlign: 'center', marginBottom: 2 }}>{g.name}</div>
                <div style={{ fontSize: 13, color: '#8bb6e6', fontWeight: 600, marginBottom: 8 }}>{g.sub}</div>
                <button style={{ background: 'linear-gradient(90deg,#4fd1fa 0%,#7f5fff 100%)', color: '#fff', border: 'none', borderRadius: 12, fontWeight: 700, fontSize: 15, padding: '7px 0', width: '100%', maxWidth: 70, boxShadow: '0 2px 8px #4fd1fa22', cursor: 'pointer' }}>{g.btn}</button>
              </div>
            ))}
          </div>
        </div>
        {/* New Arrivals */}
        <div style={{ width: '100%', padding: '0 24px', marginTop: 8 }}>
          <div style={{ fontWeight: 700, fontSize: 20, color: '#222', marginBottom: 10 }}>New Arrivals</div>
          <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
            {arrivals.map((g, i) => (
              <div key={i} style={{ flex: 1, background: '#f7faff', borderRadius: 18, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 12, minWidth: 0 }}>
                <img src={g.img} alt={g.name} style={{ width: 54, height: 54, marginBottom: 6 }} />
                <div style={{ fontWeight: 700, fontSize: 15, color: '#222', textAlign: 'center', marginBottom: 2 }}>{g.name}</div>
                <div style={{ fontSize: 13, color: '#8bb6e6', fontWeight: 600, marginBottom: 8 }}>{g.sub}</div>
                <button style={{ background: 'linear-gradient(90deg,#4fd1fa 0%,#7f5fff 100%)', color: '#fff', border: 'none', borderRadius: 12, fontWeight: 700, fontSize: 15, padding: '7px 0', width: '100%', maxWidth: 70, boxShadow: '0 2px 8px #4fd1fa22', cursor: 'pointer' }}>{g.btn}</button>
              </div>
            ))}
          </div>
        </div>
        {/* Collections */}
        <div style={{ width: '100%', padding: '0 24px', marginTop: 8 }}>
          <div style={{ fontWeight: 700, fontSize: 20, color: '#222', marginBottom: 10 }}>Collections</div>
          <div style={{ display: 'flex', gap: 12, marginBottom: 18 }}>
            {collections.map((g, i) => (
              <div key={i} style={{ flex: 1, background: '#f7faff', borderRadius: 18, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 12, minWidth: 0 }}>
                <img src={g.img} alt={g.name} style={{ width: 44, height: 44, marginBottom: 6 }} />
                <div style={{ fontWeight: 700, fontSize: 15, color: '#222', textAlign: 'center' }}>{g.name}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Shop Now Button */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: 8 }}>
          <button style={{ background: 'linear-gradient(90deg,#4fd1fa 0%,#7f5fff 100%)', color: '#fff', border: 'none', borderRadius: 18, fontWeight: 800, fontSize: 22, padding: '16px 0', width: '90%', maxWidth: 320, boxShadow: '0 2px 8px #4fd1fa22', cursor: 'pointer', marginTop: 8 }}>Shop Now</button>
        </div>
      </div>
    </div>
  );
}

// ...existing code...

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
          {page === 'shop' && <ShopPage />}
          {page === 'gifts' && <GiftCarousel />}
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
