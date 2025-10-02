// Contact.js - お問い合わせページ（フロントエンドのみ）
const Contact = () => {
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [errors, setErrors] = React.useState({});
    const [isSubmitted, setIsSubmitted] = React.useState(false);
    const [submissions, setSubmissions] = React.useState(() => {
        // ローカルストレージから既存の送信データを取得
        const saved = localStorage.getItem('contactSubmissions');
        return saved ? JSON.parse(saved) : [];
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // エラーをクリア
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'お名前を入力してください';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'メールアドレスを入力してください';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = '有効なメールアドレスを入力してください';
        }

        if (!formData.subject.trim()) {
            newErrors.subject = '件名を入力してください';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'メッセージを入力してください';
        } else if (formData.message.length < 10) {
            newErrors.message = 'メッセージは10文字以上入力してください';
        }

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validateForm();

        if (Object.keys(newErrors).length === 0) {
            // 送信データを作成
            const submission = {
                ...formData,
                id: Date.now().toString(),
                timestamp: new Date().toISOString()
            };

            // ローカルストレージに保存
            const updatedSubmissions = [...submissions, submission];
            setSubmissions(updatedSubmissions);
            localStorage.setItem('contactSubmissions', JSON.stringify(updatedSubmissions));

            // コンソールに表示
            console.log('========================================');
            console.log('📬 お問い合わせを受信しました！');
            console.log('========================================');
            console.log('📅 受信日時:', new Date(submission.timestamp).toLocaleString('ja-JP'));
            console.log('🆔 ID:', submission.id);
            console.log('👤 お名前:', submission.name);
            console.log('📧 メール:', submission.email);
            console.log('📝 件名:', submission.subject);
            console.log('💬 メッセージ:');
            console.log('   ', submission.message.replace(/\n/g, '\n    '));
            console.log('========================================');
            console.log('💾 ローカルストレージに保存しました');
            console.log('========================================\n');

            // 送信完了状態にする
            setIsSubmitted(true);

            // 5秒後にフォームをリセット
            setTimeout(() => {
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: ''
                });
                setIsSubmitted(false);
            }, 5000);
        } else {
            setErrors(newErrors);
        }
    };

    // 送信履歴をクリア
    const clearHistory = () => {
        if (confirm('送信履歴をすべて削除しますか？')) {
            setSubmissions([]);
            localStorage.removeItem('contactSubmissions');
            console.log('✅ 送信履歴をクリアしました');
        }
    };

    return (
        <div style={{ padding: '40px 20px', minHeight: 'calc(100vh - 200px)' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <h1 style={{
                    fontSize: '48px',
                    textAlign: 'center',
                    marginBottom: '20px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                }}>
                    お問い合わせ
                </h1>
                <p style={{
                    fontSize: '18px',
                    textAlign: 'center',
                    color: '#666',
                    marginBottom: '40px'
                }}>
                    ご質問・ご要望などお気軽にお問い合わせください
                </p>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '40px',
                    marginBottom: '40px'
                }}>
                    {/* 左側：お問い合わせフォーム */}
                    <div>
                        {isSubmitted ? (
                            <Card
                                style={{
                                    backgroundColor: '#d4edda',
                                    border: '1px solid #c3e6cb',
                                    textAlign: 'center'
                                }}
                                hoverable={false}
                            >
                                <div style={{ fontSize: '48px', marginBottom: '20px' }}>✅</div>
                                <h3 style={{ color: '#155724', marginBottom: '10px' }}>
                                    送信完了しました！
                                </h3>
                                <p style={{ color: '#155724' }}>
                                    お問い合わせいただきありがとうございます。<br />
                                    内容はブラウザのコンソールとローカルストレージに保存されました。
                                </p>
                                <p style={{
                                    marginTop: '20px',
                                    fontSize: '14px',
                                    color: '#666'
                                }}>
                                    5秒後に新しいフォームが表示されます...
                                </p>
                            </Card>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <FormInput
                                    label="お名前"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="山田 太郎"
                                    error={errors.name}
                                    required={true}
                                />

                                <FormInput
                                    label="メールアドレス"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="example@email.com"
                                    error={errors.email}
                                    required={true}
                                />

                                <FormInput
                                    label="件名"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="お問い合わせの件名"
                                    error={errors.subject}
                                    required={true}
                                />

                                <FormInput
                                    label="メッセージ"
                                    type="textarea"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="お問い合わせ内容をご記入ください"
                                    error={errors.message}
                                    required={true}
                                    rows={6}
                                />

                                <Button
                                    type="submit"
                                    variant="primary"
                                    size="large"
                                    fullWidth={true}
                                >
                                    送信する
                                </Button>
                            </form>
                        )}
                    </div>

                    {/* 右側：送信履歴と情報 */}
                    <div>
                        <Card
                            style={{
                                backgroundColor: '#f8f9fa',
                                marginBottom: '20px'
                            }}
                            hoverable={false}
                        >
                            <h3 style={{
                                fontSize: '24px',
                                marginBottom: '20px',
                                color: '#333'
                            }}>
                                📊 送信履歴
                            </h3>

                            <div style={{
                                fontSize: '14px',
                                color: '#666',
                                marginBottom: '15px'
                            }}>
                                合計送信数: <strong>{submissions.length}件</strong>
                            </div>

                            {submissions.length > 0 && (
                                <div style={{
                                    maxHeight: '200px',
                                    overflow: 'auto',
                                    backgroundColor: 'white',
                                    padding: '10px',
                                    borderRadius: '5px',
                                    marginBottom: '15px'
                                }}>
                                    {submissions.slice(-5).reverse().map(sub => (
                                        <div key={sub.id} style={{
                                            padding: '8px',
                                            borderBottom: '1px solid #eee',
                                            fontSize: '12px'
                                        }}>
                                            <div style={{ color: '#999' }}>
                                                {new Date(sub.timestamp).toLocaleString('ja-JP')}
                                            </div>
                                            <div style={{ fontWeight: 'bold' }}>{sub.name}</div>
                                            <div style={{ color: '#667eea' }}>{sub.subject}</div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <Button
                                onClick={clearHistory}
                                variant="outline"
                                size="small"
                                disabled={submissions.length === 0}
                            >
                                履歴をクリア
                            </Button>
                        </Card>

                        <Card
                            style={{
                                backgroundColor: '#fff3cd',
                                border: '1px solid #ffeeba'
                            }}
                            hoverable={false}
                        >
                            <h4 style={{
                                fontSize: '18px',
                                marginBottom: '10px',
                                color: '#856404'
                            }}>
                                💡 開発者向け情報
                            </h4>
                            <ul style={{
                                listStyle: 'none',
                                padding: '0',
                                color: '#856404',
                                fontSize: '14px'
                            }}>
                                <li style={{ marginBottom: '8px' }}>
                                    <strong>データ保存先:</strong><br />
                                    ブラウザのローカルストレージ
                                </li>
                                <li style={{ marginBottom: '8px' }}>
                                    <strong>コンソール確認:</strong><br />
                                    F12 → Console タブで送信内容を確認
                                </li>
                                <li style={{ marginBottom: '8px' }}>
                                    <strong>ローカルストレージ確認:</strong><br />
                                    F12 → Application → Local Storage
                                </li>
                                <li>
                                    <strong>キー名:</strong><br />
                                    <code style={{
                                        backgroundColor: '#fff',
                                        padding: '2px 6px',
                                        borderRadius: '3px'
                                    }}>contactSubmissions</code>
                                </li>
                            </ul>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};