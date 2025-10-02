// Router.js - URLルーティング機能を提供するコンポーネント
function Router() {
    // URLパスからページを判定
    const getPageFromPath = (pathname) => {
        // パスの正規化（最初と最後のスラッシュを削除）
        const path = pathname.replace(/^\/|\/$/g, '');

        switch (path) {
            case '':
            case 'home':
                return 'home';
            case 'about':
            case 'features':
                return 'about';
            case 'contact':
                return 'contact';
            default:
                return 'home';
        }
    };

    // 初期ページをURLから取得
    const [currentPage, setCurrentPage] = React.useState(() => {
        return getPageFromPath(window.location.pathname);
    });

    // ページ変更時にURLを更新
    const handlePageChange = React.useCallback((page) => {
        // 状態を更新
        setCurrentPage(page);

        // URLを更新（ブラウザの履歴に追加）
        const url = page === 'home' ? '/' : `/${page}`;
        window.history.pushState({ page }, '', url);

        // ページトップへスクロール
        window.scrollTo(0, 0);
    }, []);

    // ブラウザの戻る/進むボタンへの対応
    React.useEffect(() => {
        const handlePopState = (event) => {
            // ブラウザの履歴から状態を取得、なければURLから判定
            const page = event.state?.page || getPageFromPath(window.location.pathname);
            setCurrentPage(page);
        };

        // popstateイベントをリッスン
        window.addEventListener('popstate', handlePopState);

        // 初期状態を履歴に記録
        const initialPage = getPageFromPath(window.location.pathname);
        window.history.replaceState({ page: initialPage }, '', window.location.pathname);

        // クリーンアップ
        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);

    // 現在のページに応じてコンポーネントを表示
    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return <Home />;
            case 'about':
                return <About />;
            case 'contact':
                return <Contact />;
            default:
                return <Home />;
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            {/* ナビゲーション付きヘッダー */}
            <HeaderWithNav
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />

            {/* ページコンテンツ */}
            <main style={{ flex: '1' }}>
                {renderPage()}
            </main>

            {/* フッター */}
            <Footer />
        </div>
    );
};

// リンクコンポーネント（オプション：通常のリンクのような動作）
function Link({ to, children, style = {}, className = '' }) {
    const handleClick = (e) => {
        e.preventDefault();

        // ページを判定
        const page = to === '/' ? 'home' : to.replace(/^\//, '');

        // カスタムイベントを発火（Routerコンポーネントで使用する場合）
        window.dispatchEvent(new CustomEvent('navigate', { detail: { page } }));

        // URLを更新
        window.history.pushState({ page }, '', to);

        // popstateイベントを手動で発火
        window.dispatchEvent(new PopStateEvent('popstate', { state: { page } }));
    };

    return (
        <a
            href={to}
            onClick={handleClick}
            style={{
                textDecoration: 'none',
                color: 'inherit',
                ...style
            }}
            className={className}
        >
            {children}
        </a>
    );
};