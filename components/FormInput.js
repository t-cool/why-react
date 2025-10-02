// FormInput.js - 再利用可能なフォーム入力コンポーネント
const FormInput = ({
    label,
    type = 'text',
    name,
    value,
    onChange,
    placeholder,
    error,
    required = false,
    disabled = false,
    rows, // textarea用
    style = {}
}) => {
    const [isFocused, setIsFocused] = React.useState(false);

    const labelStyle = {
        display: 'block',
        marginBottom: '8px',
        fontWeight: 'bold',
        color: error ? '#e74c3c' : '#333',
        fontSize: '14px',
        transition: 'color 0.3s'
    };

    const inputStyle = {
        width: '100%',
        padding: '12px',
        fontSize: '16px',
        border: error
            ? '2px solid #e74c3c'
            : isFocused
                ? '2px solid #667eea'
                : '1px solid #ddd',
        borderRadius: '8px',
        outline: 'none',
        transition: 'all 0.3s',
        backgroundColor: disabled ? '#f5f5f5' : 'white',
        cursor: disabled ? 'not-allowed' : 'text',
        boxShadow: isFocused ? '0 0 0 3px rgba(102, 126, 234, 0.1)' : 'none',
        ...style
    };

    const errorStyle = {
        color: '#e74c3c',
        fontSize: '14px',
        marginTop: '5px',
        display: 'flex',
        alignItems: 'center',
        animation: 'shake 0.5s'
    };

    return (
        <div style={{ marginBottom: '20px' }}>
            {label && (
                <label style={labelStyle}>
                    {label}
                    {required && <span style={{ color: '#e74c3c', marginLeft: '4px' }}>*</span>}
                </label>
            )}

            {type === 'textarea' ? (
                <textarea
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    rows={rows || 6}
                    style={{
                        ...inputStyle,
                        resize: 'vertical',
                        minHeight: '120px'
                    }}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
            ) : (
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    style={inputStyle}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
            )}

            {error && (
                <p style={errorStyle}>
                    <span style={{ marginRight: '5px' }}>⚠️</span>
                    {error}
                </p>
            )}
        </div>
    );
};

// フォームグループコンポーネント（複数の入力フィールドをグループ化）
const FormGroup = ({ children, title }) => {
    return (
        <div style={{
            marginBottom: '30px',
            padding: '20px',
            backgroundColor: '#f8f9fa',
            borderRadius: '10px',
            border: '1px solid #e9ecef'
        }}>
            {title && (
                <h3 style={{
                    fontSize: '18px',
                    marginBottom: '20px',
                    color: '#495057',
                    borderBottom: '2px solid #667eea',
                    paddingBottom: '10px'
                }}>
                    {title}
                </h3>
            )}
            {children}
        </div>
    );
};