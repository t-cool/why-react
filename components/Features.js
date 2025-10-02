// Features.js - 機能セクションコンポーネント
// Card コンポーネントを使用するように更新

// メインのFeaturesコンポーネント
function Features() {
    // 機能データを配列で管理（データとUIの分離）
    const features = [
        {
            icon: '🧩',
            title: 'コンポーネント指向',
            description: 'UIを独立した再利用可能なコンポーネントに分割し、効率的な開発を実現します。'
        },
        {
            icon: '⚡',
            title: 'Virtual DOM',
            description: '仮想DOMによる効率的な差分更新により、高速なレンダリングを実現します。'
        },
        {
            icon: '🔄',
            title: '単方向データフロー',
            description: '予測可能な状態管理により、バグの少ない堅牢なアプリケーションを構築できます。'
        }
    ];

    return (
        <section style={{
            padding: '80px 20px',
            backgroundColor: '#f8f9fa'
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                <h2 style={{
                    fontSize: '36px',
                    textAlign: 'center',
                    marginBottom: '50px',
                    color: '#333'
                }}>
                    Reactの主な特徴
                </h2>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '30px'
                }}>
                    {/* Card コンポーネントを使用して機能カードを動的に生成 */}
                    {features.map((feature, index) => (
                        <Card
                            key={index}
                            icon={feature.icon}
                            title={feature.title}
                            description={feature.description}
                            hoverable={true}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};