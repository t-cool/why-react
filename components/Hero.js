// Hero.js - ヒーローセクションコンポーネント
// メインビジュアルとCTAボタンを含む独立したコンポーネント
// Button コンポーネントを使用するように更新
function Hero() {
    return (
        <section style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '100px 20px',
            textAlign: 'center'
        }}>
            <h2 style={{
                fontSize: '48px',
                marginBottom: '20px',
                fontWeight: 'bold'
            }}>
                Reactでモダンなウェブ開発を
            </h2>
            <p style={{
                fontSize: '20px',
                marginBottom: '30px',
                opacity: '0.9'
            }}>
                コンポーネント指向で再利用可能なUIを構築しましょう
            </p>
            <Button
                size="large"
                variant="outline"
                onClick={() => console.log('Getting started with React!')}
                style={{
                    background: 'white',
                    color: '#667eea',
                    border: 'none',
                    borderRadius: '50px'
                }}
            >
                今すぐ始める
            </Button>
        </section>
    );
}