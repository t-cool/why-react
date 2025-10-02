// HeaderWithNav.js - ナビゲーション機能付きヘッダーコンポーネント
function HeaderWithNav({ currentPage, onPageChange }) {
    const navItems = [
        { id: 'home', label: 'ホーム' },
        { id: 'about', label: '機能' },
        { id: 'contact', label: 'お問い合わせ' }
    ];

    return (
        <header style={{
            backgroundColor: '#282c34',
            padding: '20px',
            color: 'white',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            position: 'sticky',
            top: '0',
            zIndex: '1000'
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <h1
                    style={{
                        fontSize: '24px',
                        cursor: 'pointer'
                    }}
                    onClick={() => onPageChange('home')}
                >
                    Why React?
                </h1>
                <nav>
                    <ul style={{
                        display: 'flex',
                        listStyle: 'none',
                        gap: '20px',
                        margin: '0',
                        padding: '0'
                    }}>
                        {navItems.map((item) => (
                            <li key={item.id}>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onPageChange(item.id);
                                    }}
                                    style={{
                                        color: currentPage === item.id ? '#667eea' : 'white',
                                        textDecoration: 'none',
                                        fontWeight: currentPage === item.id ? 'bold' : 'normal',
                                        padding: '5px 10px',
                                        borderRadius: '5px',
                                        backgroundColor: currentPage === item.id ? 'rgba(102, 126, 234, 0.1)' : 'transparent',
                                        transition: 'all 0.3s',
                                        display: 'inline-block'
                                    }}
                                    onMouseOver={(e) => {
                                        if (currentPage !== item.id) {
                                            e.target.style.color = '#9ca3ea';
                                        }
                                    }}
                                    onMouseOut={(e) => {
                                        if (currentPage !== item.id) {
                                            e.target.style.color = 'white';
                                        }
                                    }}
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
};