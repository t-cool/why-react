// Button.js - 再利用可能なボタンコンポーネント
const Button = ({
    children,
    onClick,
    variant = 'primary', // primary, secondary, outline
    size = 'medium', // small, medium, large
    fullWidth = false,
    disabled = false,
    style = {}
}) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const [isPressed, setIsPressed] = React.useState(false);

    // バリアントごとのスタイル定義
    const variantStyles = {
        primary: {
            background: isPressed
                ? '#5568d3'
                : isHovered
                    ? '#7388ec'
                    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none'
        },
        secondary: {
            background: isPressed ? '#6b7280' : isHovered ? '#9ca3af' : '#8b92a4',
            color: 'white',
            border: 'none'
        },
        outline: {
            background: isPressed ? 'rgba(102, 126, 234, 0.1)' : isHovered ? 'rgba(102, 126, 234, 0.05)' : 'transparent',
            color: '#667eea',
            border: '2px solid #667eea'
        }
    };

    // サイズごとのスタイル定義
    const sizeStyles = {
        small: {
            padding: '8px 16px',
            fontSize: '14px'
        },
        medium: {
            padding: '12px 24px',
            fontSize: '16px'
        },
        large: {
            padding: '15px 40px',
            fontSize: '18px'
        }
    };

    const buttonStyle = {
        ...variantStyles[variant],
        ...sizeStyles[size],
        width: fullWidth ? '100%' : 'auto',
        borderRadius: '8px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontWeight: 'bold',
        transition: 'all 0.3s ease',
        transform: isHovered && !disabled ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: isHovered && !disabled ? '0 4px 12px rgba(0,0,0,0.15)' : '0 2px 4px rgba(0,0,0,0.1)',
        opacity: disabled ? 0.5 : 1,
        outline: 'none',
        ...style
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            style={buttonStyle}
            onMouseEnter={() => !disabled && setIsHovered(true)}
            onMouseLeave={() => {
                !disabled && setIsHovered(false);
                !disabled && setIsPressed(false);
            }}
            onMouseDown={() => !disabled && setIsPressed(true)}
            onMouseUp={() => !disabled && setIsPressed(false)}
        >
            {children}
        </button>
    );
};