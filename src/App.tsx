



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

function GiftCarousel({ setPage }: { setPage: (page: 'shop' | 'gifts' | 'profile' | 'hero' | 'order', giftId?: number) => void }) {
  const [idx, setIdx] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Минимальное расстояние для свайпа
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      setIdx((idx + 1) % giftModels.length);
    }
    if (isRightSwipe) {
      setIdx((idx + giftModels.length - 1) % giftModels.length);
    }
  };

  const handleMintClick = () => {
    // Передаем ID текущего подарка (idx + 1)
    const giftId = idx + 1;
    setPage('order', giftId);
  };

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start',
      minHeight: 'calc(100vh - 64px)', background: '#f8f9ff', padding: 0,
      width: '100vw',
      overflow: 'hidden',
    }}>
      <div style={{ width: '100%', textAlign: 'center', margin: '40px 0 28px' }}>
        <h2 style={{ color: '#222', fontSize: 28, fontWeight: 800, margin: 0, zIndex: 10, position: 'relative' }}>Mint Your Gift Figure</h2>
      </div>
      {/* 3D модель с поддержкой свайпа */}
      <div 
        style={{
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
          touchAction: 'pan-y',
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
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
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 700, fontSize: 20, color: '#222', marginBottom: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Meme Figure #{String(idx+1).padStart(3,'0')}</div>
            <div style={{ display: 'flex', gap: 10, fontSize: 15, color: '#888', fontWeight: 500, flexWrap: 'wrap' }}>
              <div>Faction <span style={{ color: '#222', fontWeight: 600, marginLeft: 2 }}>Peepo Legion</span></div>
              <div>Rarity <span style={{ color: '#7f5fff', fontWeight: 700, marginLeft: 2 }}>Epic</span></div>
              <div style={{ color: '#aaa', fontWeight: 500, marginLeft: 0 }}>1/1000</div>
            </div>
          </div>
          <button 
            onClick={handleMintClick}
            style={{
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
      <div style={{ color: '#222', fontWeight: 600, fontSize: 18, marginBottom: 24, marginTop: 8 }}>Gift {idx + 1} / {giftModels.length}</div>
      
      {/* Стрелки для переключения карусели */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 40,
        marginBottom: 24,
      }}>
        <button
          onClick={() => setIdx((idx + giftModels.length - 1) % giftModels.length)}
          style={{
            background: 'rgba(127, 95, 255, 0.2)',
            border: '2px solid rgba(127, 95, 255, 0.3)',
            borderRadius: '50%',
            width: 50,
            height: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#7f5fff',
            fontSize: 20,
            fontWeight: 'bold',
            transition: 'all 0.2s ease',
            backdropFilter: 'blur(10px)',
          }}
        >
          ←
        </button>
        <button
          onClick={() => setIdx((idx + 1) % giftModels.length)}
          style={{
            background: 'rgba(127, 95, 255, 0.2)',
            border: '2px solid rgba(127, 95, 255, 0.3)',
            borderRadius: '50%',
            width: 50,
            height: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#7f5fff',
            fontSize: 20,
            fontWeight: 'bold',
            transition: 'all 0.2s ease',
            backdropFilter: 'blur(10px)',
          }}
        >
          →
        </button>
      </div>
    </div>
  );
}

function HeroBlock({ setPage }: { setPage: (page: 'shop' | 'gifts' | 'profile' | 'hero' | 'order') => void }) {
  return (
    <div style={{
      width: '100%',
      background: 'linear-gradient(135deg, #7f5fff 0%, #a18fff 100%)',
      borderRadius: '24px 24px 0 0',
      padding: '32px 24px',
      position: 'relative',
      overflow: 'hidden',
      marginBottom: 24,
    }}>
      {/* Фоновые элементы */}
      <div style={{
        position: 'absolute',
        top: -20,
        right: -20,
        width: 120,
        height: 120,
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '50%',
        zIndex: 1,
      }} />
      <div style={{
        position: 'absolute',
        bottom: -30,
        left: -30,
        width: 80,
        height: 80,
        background: 'rgba(255, 255, 255, 0.08)',
        borderRadius: '50%',
        zIndex: 1,
      }} />
      
      {/* Основной контент */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        alignItems: 'center',
        gap: 20,
      }}>
        {/* Изображение фигурки лягушки */}
        <div style={{
          flexShrink: 0,
          width: 100,
          height: 100,
          borderRadius: '20px',
          background: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
          overflow: 'hidden',
        }}>
          <img 
            src="/img/pepe.png" 
            alt="Frog Figure Gift" 
            style={{
              width: '80%',
              height: '80%',
              objectFit: 'contain',
            }}
          />
        </div>
        
        {/* Текстовый контент */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            color: '#fff',
            fontSize: 22,
            fontWeight: 800,
            marginBottom: 8,
            lineHeight: 1.2,
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
          }}>
            Special PEPE Figure
          </div>
          <div style={{
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: 14,
            fontWeight: 500,
            marginBottom: 16,
            lineHeight: 1.4,
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
          }}>
            Send this adorable frog figure to your friends in Telegram!
          </div>
          <button 
            onClick={() => setPage('shop')}
            style={{
            background: 'rgba(255, 255, 255, 0.2)',
            color: '#fff',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            borderRadius: 12,
            padding: '10px 20px',
            fontWeight: 700,
            fontSize: 16,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            backdropFilter: 'blur(10px)',
          }}>
            Send Gift
          </button>
        </div>
      </div>
    </div>
  );
}

function ShopPage({ setPage }: { setPage: (page: 'shop' | 'gifts' | 'profile' | 'hero') => void }) {
  // Данные для карточек (можно вынести в отдельный файл)
  const popular = [
    { icon: '🟢', img: '/img/frog.png', name: 'Pepe Toy', sub: 'Rare', price: '', btn: 'Gift' },
    { icon: '🐰', img: '/img/bunny.png', name: 'Plush Bunny', sub: '$2,00', price: '$2,00', btn: 'Gift' },
    { icon: '🪙', img: '/img/pepe.png', name: 'Shiba Inu', sub: '$5,00', price: '$5,00', btn: 'Gift' },
  ];
  const arrivals = [
    { icon: '🧸', img: '/img/bunny.png', name: 'Lovey Bear', sub: 'Epic', price: '', btn: 'Gift' },
    { icon: '🐔', img: '/img/pepe.png', name: 'Birthday Chicken', sub: '', price: '', btn: 'Gift' },
  ];
  const collections = [
    { icon: '🟢', img: '/img/frog.png', name: 'Memes' },
    { icon: '🟦', img: '/img/bunny.png', name: 'NFTs' },
    { icon: '🔵', img: '/img/pepe.png', name: 'Plush' },
  ];
  return (
    <div style={{
      minHeight: '100vh', background: '#f8f9ff',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start',
      padding: 0,
    }}>
      <div style={{
        width: 370, maxWidth: '100vw', margin: '24px auto 0', background: '#fff', borderRadius: 32, boxShadow: '0 8px 32px #b3d6ff33',
        padding: '0 0 24px 0', position: 'relative',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}>
        {/* Header */}
        <div style={{ width: '100%', padding: '0 0 0 0', position: 'relative', minHeight: 80 }}>
          <div style={{ textAlign: 'center', fontWeight: 700, fontSize: 28, marginTop: 24, color: '#222' }}>Gift Store</div>
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
                <button 
                  onClick={() => setPage('gifts')}
                  style={{ background: 'linear-gradient(90deg,#4fd1fa 0%,#7f5fff 100%)', color: '#fff', border: 'none', borderRadius: 12, fontWeight: 700, fontSize: 15, padding: '7px 0', width: '100%', maxWidth: 70, boxShadow: '0 2px 8px #4fd1fa22', cursor: 'pointer' }}
                >
                  {g.btn}
                </button>
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
                <button 
                  onClick={() => setPage('gifts')}
                  style={{ background: 'linear-gradient(90deg,#4fd1fa 0%,#7f5fff 100%)', color: '#fff', border: 'none', borderRadius: 12, fontWeight: 700, fontSize: 15, padding: '7px 0', width: '100%', maxWidth: 70, boxShadow: '0 2px 8px #4fd1fa22', cursor: 'pointer' }}
                >
                  {g.btn}
                </button>
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
          <button 
            onClick={() => setPage('gifts')}
            style={{ background: 'linear-gradient(90deg,#4fd1fa 0%,#7f5fff 100%)', color: '#fff', border: 'none', borderRadius: 18, fontWeight: 800, fontSize: 22, padding: '16px 0', width: '90%', maxWidth: 320, boxShadow: '0 2px 8px #4fd1fa22', cursor: 'pointer', marginTop: 8 }}
          >
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
}

function OrderPage({ giftId, onBack }: { giftId: number, onBack: () => void }) {
  const giftName = `Meme Figure #${String(giftId).padStart(3, '0')}`;
  const priceTON = 888;
  const priceUSD = 2841;
  const [showSuccess, setShowSuccess] = useState(false);
  const orderNumber = '089424322';
  
  const handleMintPay = () => {
    setShowSuccess(true);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    onBack();
  };
  
  return (
    <div style={{
      minHeight: '100vh',
      background: '#f8f9ff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '24px 0 0 0',
    }}>
      <div style={{
        width: 370,
        maxWidth: '100vw',
        background: '#fff',
        borderRadius: 32,
        boxShadow: '0 8px 32px #b3d6ff33',
        overflow: 'hidden',
        position: 'relative',
      }}>
        {/* Header с кнопкой назад */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid #f0f0f0',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
        }}>
          <button
            onClick={onBack}
            style={{
              background: 'none',
              border: 'none',
              fontSize: 24,
              cursor: 'pointer',
              color: '#666',
              padding: 8,
              borderRadius: 8,
            }}
          >
            ←
          </button>
          <div style={{ fontWeight: 700, fontSize: 20, color: '#222' }}>
            Order Details
          </div>
        </div>
        
        {/* Картинка товара */}
        <div style={{
          padding: '32px 24px',
          textAlign: 'center',
        }}>
          <div style={{
            width: 200,
            height: 200,
            margin: '0 auto 24px',
            borderRadius: 20,
            background: '#f7faff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
          }}>
            <img 
              src="/img/pack.png" 
              alt={giftName}
              style={{
                width: '80%',
                height: '80%',
                objectFit: 'contain',
              }}
            />
          </div>
          
          {/* Название и ID */}
          <div style={{ marginBottom: 24 }}>
            <div style={{
              fontWeight: 800,
              fontSize: 24,
              color: '#222',
              marginBottom: 8,
            }}>
              {giftName}
            </div>
            <div style={{
              fontSize: 16,
              color: '#666',
              fontWeight: 500,
            }}>
              ID: {giftId}
            </div>
          </div>
          
          {/* Характеристики */}
          <div style={{
            background: '#f8f9ff',
            borderRadius: 16,
            padding: '20px',
            marginBottom: 24,
            textAlign: 'left',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 12,
              paddingBottom: 12,
              borderBottom: '1px solid #e8eaff',
            }}>
              <span style={{ fontSize: 16, color: '#666' }}>Material:</span>
              <span style={{ fontSize: 16, fontWeight: 600, color: '#222' }}>Carbon</span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 12,
              paddingBottom: 12,
              borderBottom: '1px solid #e8eaff',
            }}>
              <span style={{ fontSize: 16, color: '#666' }}>Delivery:</span>
              <span style={{ fontSize: 16, fontWeight: 600, color: '#222' }}>5-7 days</span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <span style={{ fontSize: 16, color: '#666' }}>Price:</span>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: '#7f5fff' }}>
                  {priceTON} TON
                </div>
                <div style={{ fontSize: 14, color: '#666' }}>
                  ≈ ${priceUSD}
                </div>
              </div>
            </div>
          </div>
          
          {/* Кнопка оплаты */}
          <button 
            onClick={handleMintPay}
            style={{
            background: 'linear-gradient(90deg, #4fd1fa 0%, #7f5fff 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: 18,
            fontWeight: 800,
            fontSize: 20,
            padding: '16px 32px',
            cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(79, 209, 250, 0.3)',
            width: '100%',
            marginBottom: 24,
          }}>
            Mint/Pay
          </button>
        </div>
      </div>

      {/* Модальное окно успеха */}
      {showSuccess && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }}>
          <div style={{
            background: '#fff',
            borderRadius: 24,
            padding: '32px 24px',
            maxWidth: 320,
            width: '90%',
            textAlign: 'center',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
          }}>
            <div style={{
              fontSize: 48,
              marginBottom: 16,
            }}>
              ✅
            </div>
            <div style={{
              fontWeight: 700,
              fontSize: 24,
              color: '#222',
              marginBottom: 8,
            }}>
              Success!
            </div>
            <div style={{
              fontSize: 16,
              color: '#666',
              lineHeight: 1.5,
              marginBottom: 24,
            }}>
              We are delivering your order {orderNumber}
            </div>
            <button
              onClick={handleCloseSuccess}
              style={{
                background: 'linear-gradient(90deg, #4fd1fa 0%, #7f5fff 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: 16,
                fontWeight: 700,
                fontSize: 18,
                padding: '12px 24px',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(79, 209, 250, 0.3)',
                width: '100%',
              }}
            >
              Continue
            </button>
          </div>
        </div>
      )}
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

  const [page, setPage] = useState<'shop' | 'gifts' | 'profile' | 'hero' | 'order'>('hero');
  const [currentGiftId, setCurrentGiftId] = useState(1);

  const handleOrderPage = (giftId: number) => {
    setCurrentGiftId(giftId);
    setPage('order');
  };

  const handleBackFromOrder = () => {
    setPage('gifts');
  };

  const handlePageChange = (newPage: 'shop' | 'gifts' | 'profile' | 'hero' | 'order', giftId?: number) => {
    if (newPage === 'order' && giftId) {
      setCurrentGiftId(giftId);
    }
    setPage(newPage);
  };

  return (
    <TonConnectUIProvider manifestUrl="https://tgrwagft.fly.dev/tonconnect-manifest.json">
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <div style={{ flex: 1, width: '100%' }}>
          {page === 'shop' && <ShopPage setPage={setPage} />}
          {page === 'gifts' && <GiftCarousel setPage={handlePageChange} />}
          {page === 'order' && <OrderPage giftId={currentGiftId} onBack={handleBackFromOrder} />}
          {page === 'hero' && (
            <div style={{
              minHeight: '100vh',
              background: '#f8f9ff',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '24px 0 0 0',
            }}>
              <div style={{
                width: 370,
                maxWidth: '100vw',
                background: '#fff',
                borderRadius: 32,
                boxShadow: '0 8px 32px #b3d6ff33',
                overflow: 'hidden',
              }}>
                <HeroBlock setPage={setPage} />
                <div style={{ padding: '24px', textAlign: 'center' }}>
                  <div style={{ fontWeight: 700, fontSize: 24, color: '#222', marginBottom: 16 }}>
                    Welcome to Gift Store
                  </div>
                  <div style={{ fontSize: 16, color: '#666', lineHeight: 1.5, marginBottom: 24 }}>
                    Discover amazing gifts for your friends and family
                  </div>
                  <button 
                    onClick={() => setPage('shop')}
                    style={{
                      background: 'linear-gradient(90deg, #4fd1fa 0%, #7f5fff 100%)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 18,
                      fontWeight: 700,
                      fontSize: 18,
                      padding: '14px 32px',
                      cursor: 'pointer',
                      boxShadow: '0 4px 16px rgba(79, 209, 250, 0.3)',
                      marginBottom: 24,
                    }}
                  >
                    Explore Store
                  </button>
                  
                  {/* Картинка под кнопкой */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: 16,
                  }}>
                    <img 
                      src="/img/pepe figure.png" 
                      alt="Pepe Figure" 
                      style={{
                        width: '80%',
                        maxWidth: 280,
                        height: 'auto',
                        borderRadius: 16,
                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          {page === 'profile' && (
            <div style={{
              minHeight: '100vh',
              background: '#f8f9ff',
              display: 'flex',
              flexDirection: 'column',
              padding: 0,
            }}>
              {/* Header */}
              <div style={{
                background: '#7f5fff',
                padding: '16px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                color: '#fff',
                position: 'relative',
              }}>
                <div style={{ fontWeight: 700, fontSize: 20 }}>Your Profile</div>
                <div style={{ fontSize: 24 }}>⚙️</div>
              </div>
              
              {/* Main Content Card */}
              <div style={{
                flex: 1,
                background: '#fff',
                margin: '24px 16px',
                borderRadius: 24,
                padding: '32px 24px',
                boxShadow: '0 8px 32px rgba(127, 95, 255, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
                {/* Profile Picture */}
                <div style={{
                  width: 120,
                  height: 120,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #7f5fff 0%, #a18fff 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 24,
                  boxShadow: '0 4px 16px rgba(127, 95, 255, 0.3)',
                }}>
                  <div style={{ fontSize: 48, color: '#fff' }}>👤</div>
                </div>
                
                {/* Name and Role */}
                <div style={{ textAlign: 'center', marginBottom: 32 }}>
                  <div style={{ fontWeight: 700, fontSize: 24, color: '#7f5fff', marginBottom: 4 }}>
                    Telegram User
                  </div>
                  <div style={{ fontSize: 16, color: '#888', fontWeight: 500 }}>
                    Gift Collector
                  </div>
                </div>
                
                {/* Wallet Section */}
                <div style={{
                  width: '100%',
                  background: '#f8f9ff',
                  borderRadius: 16,
                  padding: '20px',
                  marginBottom: 24,
                  border: '1px solid #e8eaff',
                }}>
                  <div style={{ fontWeight: 600, fontSize: 16, color: '#7f5fff', marginBottom: 12 }}>
                    Wallet Connection
                  </div>
                                     <div style={{ marginBottom: 16 }}>
                <TonConnectButton />
                   </div>
                </div>
                
                {/* Stats Section */}
                <div style={{
                  width: '100%',
                  display: 'flex',
                  gap: 16,
                  marginBottom: 24,
                }}>
                  <div style={{
                    flex: 1,
                    background: '#f8f9ff',
                    borderRadius: 12,
                    padding: '16px',
                    textAlign: 'center',
                    border: '1px solid #e8eaff',
                  }}>
                    <div style={{ fontSize: 24, fontWeight: 700, color: '#7f5fff', marginBottom: 4 }}>0</div>
                    <div style={{ fontSize: 12, color: '#888' }}>Gifts Collected</div>
                  </div>
                  <div style={{
                    flex: 1,
                    background: '#f8f9ff',
                    borderRadius: 12,
                    padding: '16px',
                    textAlign: 'center',
                    border: '1px solid #e8eaff',
                  }}>
                    <div style={{ fontSize: 24, fontWeight: 700, color: '#7f5fff', marginBottom: 4 }}>0</div>
                    <div style={{ fontSize: 12, color: '#888' }}>Gifts Sent</div>
                  </div>
                </div>
                
                {/* Settings Section */}
                <div style={{
                  width: '100%',
                  background: '#f8f9ff',
                  borderRadius: 16,
                  padding: '20px',
                  border: '1px solid #e8eaff',
                }}>
                  <div style={{ fontWeight: 600, fontSize: 16, color: '#7f5fff', marginBottom: 16 }}>
                    Settings
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 0',
                      borderBottom: '1px solid #e8eaff',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ fontSize: 20 }}>🔔</div>
                        <span style={{ fontSize: 14, color: '#333' }}>Notifications</span>
                      </div>
                      <div style={{ fontSize: 16 }}>→</div>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 0',
                      borderBottom: '1px solid #e8eaff',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ fontSize: 20 }}>🔒</div>
                        <span style={{ fontSize: 14, color: '#333' }}>Privacy</span>
                      </div>
                      <div style={{ fontSize: 16 }}>→</div>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 0',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ fontSize: 20 }}>ℹ️</div>
                        <span style={{ fontSize: 14, color: '#333' }}>About</span>
                      </div>
                      <div style={{ fontSize: 16 }}>→</div>
                    </div>
                  </div>
                </div>
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
            onClick={() => setPage('hero')}
            style={{
              background: 'none',
              border: 'none',
              outline: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: page === 'hero' ? '#7f5fff' : '#666',
              fontWeight: page === 'hero' ? 600 : 400,
              fontSize: 16,
              flex: 1,
              cursor: 'pointer',
            }}
          >
            <span style={{ fontSize: 20, marginBottom: 2 }}>⌂</span>
            <span>Home</span>
          </button>
          <button
            onClick={() => setPage('shop')}
            style={{
              background: 'none',
              border: 'none',
              outline: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: page === 'shop' ? '#7f5fff' : '#666',
              fontWeight: page === 'shop' ? 600 : 400,
              fontSize: 16,
              flex: 1,
              cursor: 'pointer',
            }}
          >
            <span style={{ fontSize: 20, marginBottom: 2 }}>☰</span>
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
              color: page === 'gifts' ? '#7f5fff' : '#666',
              fontWeight: page === 'gifts' ? 600 : 400,
              fontSize: 16,
              flex: 1,
              cursor: 'pointer',
            }}
          >
            <span style={{ fontSize: 20, marginBottom: 2 }}>◊</span>
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
              color: page === 'profile' ? '#7f5fff' : '#666',
              fontWeight: page === 'profile' ? 600 : 400,
              fontSize: 16,
              flex: 1,
              cursor: 'pointer',
            }}
          >
            <span style={{ fontSize: 20, marginBottom: 2 }}>⚪</span>
            <span>Profile</span>
          </button>
        </div>
        {/* Кнопка TonConnect теперь только в профиле */}
      </div>
    </TonConnectUIProvider>
  );
}

export default App;
