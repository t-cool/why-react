// About.js - 機能ページコンポーネント
// ExpandableCard コンポーネントを使用するように更新
const About = () => {
    const [selectedFeature, setSelectedFeature] = React.useState(null);

    const detailedFeatures = [
        {
            icon: '🧩',
            title: 'コンポーネント指向',
            shortDesc: 'UIを独立した再利用可能なコンポーネントに分割',
            longDesc: 'Reactのコンポーネントシステムにより、UIを独立した小さなパーツに分割できます。各コンポーネントは独自の状態とロジックを持ち、他のコンポーネントと組み合わせて複雑なUIを構築できます。',
            benefits: ['再利用性の向上', 'メンテナンスが容易', 'テストしやすい', 'チーム開発に適している']
        },
        {
            icon: '⚡',
            title: 'Virtual DOM',
            shortDesc: '仮想DOMによる効率的な差分更新',
            longDesc: 'Virtual DOMは実際のDOMの軽量なJavaScript表現です。Reactは変更を検出すると、まずVirtual DOMを更新し、実際のDOMとの最小限の差分のみを適用します。',
            benefits: ['高速レンダリング', 'バッチ更新', '予測可能な更新', 'クロスブラウザ対応']
        },
        {
            icon: '🔄',
            title: '単方向データフロー',
            shortDesc: '予測可能な状態管理',
            longDesc: 'データは常に親から子へと一方向に流れます。これにより、アプリケーションの状態がどのように変化するかを予測しやすくなり、デバッグが容易になります。',
            benefits: ['デバッグが簡単', 'データフローが明確', 'バグが少ない', '大規模アプリに対応']
        },
        {
            icon: '🎣',
            title: 'React Hooks',
            shortDesc: '関数コンポーネントで状態管理',
            longDesc: 'Hooksにより、クラスコンポーネントを書かずに状態やその他のReactの機能を使えます。useState、useEffect、useContextなど、様々なHooksが提供されています。',
            benefits: ['シンプルな構文', 'ロジックの再利用', '関数型プログラミング', 'コードの最適化']
        },
        {
            icon: '🌍',
            title: '巨大なエコシステム',
            shortDesc: '豊富なライブラリとツール',
            longDesc: 'Reactには巨大なコミュニティがあり、数多くのライブラリ、ツール、リソースが利用可能です。Next.js、Redux、Material-UIなど、様々な選択肢があります。',
            benefits: ['豊富な選択肢', '活発なコミュニティ', '問題解決が容易', '継続的な改善']
        }
    ];

    return (
        <div style={{ padding: '40px 20px', minHeight: 'calc(100vh - 200px)' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <h1 style={{
                    fontSize: '48px',
                    textAlign: 'center',
                    marginBottom: '20px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                }}>
                    Reactの機能
                </h1>
                <p style={{
                    fontSize: '20px',
                    textAlign: 'center',
                    color: '#666',
                    marginBottom: '60px'
                }}>
                    モダンなウェブ開発を支える強力な機能群
                </p>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                    gap: '30px',
                    marginBottom: '60px'
                }}>
                    {/* ExpandableCard コンポーネントを使用 */}
                    {detailedFeatures.map((feature, index) => (
                        <ExpandableCard
                            key={index}
                            icon={feature.icon}
                            title={feature.title}
                            shortDescription={feature.shortDesc}
                            longDescription={feature.longDesc}
                            benefits={feature.benefits}
                            isExpanded={selectedFeature === index}
                            onToggle={() => setSelectedFeature(selectedFeature === index ? null : index)}
                        />
                    ))}
                </div>

                <div style={{
                    textAlign: 'center',
                    padding: '40px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '15px'
                }}>
                    <h2 style={{
                        fontSize: '32px',
                        marginBottom: '20px',
                        color: '#333'
                    }}>
                        Reactを選ぶ理由
                    </h2>
                    <p style={{
                        fontSize: '18px',
                        color: '#666',
                        lineHeight: '1.8',
                        maxWidth: '800px',
                        margin: '0 auto'
                    }}>
                        Reactは、Facebook（現Meta）によって開発され、世界中の企業や開発者に愛用されているライブラリです。
                        Instagram、Netflix、Airbnb、Uberなど、多くの大規模サービスがReactを採用しています。
                        学習曲線は緩やかで、小規模なプロジェクトから大規模なエンタープライズアプリケーションまで対応可能です。
                    </p>
                </div>
            </div>
        </div>
    );
};