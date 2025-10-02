// Card.js - 再利用可能なカードコンポーネント
const Card = ({
    children,
    title,
    icon,
    description,
    hoverable = true,
    clickable = false,
    selected = false,
    onClick,
    padding = '30px',
    style = {}
}) => {
    const [isHovered, setIsHovered] = React.useState(false);

    const cardStyle = {
        backgroundColor: 'white',
        padding: padding,
        borderRadius: '15px',
        boxShadow: isHovered && hoverable
            ? '0 10px 30px rgba(0,0,0,0.15)'
            : '0 5px 15px rgba(0,0,0,0.1)',
        transform: isHovered && hoverable
            ? 'translateY(-5px) scale(1.02)'
            : 'translateY(0) scale(1)',
        transition: 'all 0.3s ease',
        cursor: clickable ? 'pointer' : 'default',
        border: selected ? '2px solid #667eea' : '2px solid transparent',
        position: 'relative',
        overflow: 'hidden',
        ...style
    };

    // アイコンとタイトルが提供されている場合の標準レイアウト
    if (icon || title || description) {
        return (
            <div
                style={cardStyle}
                onMouseEnter={() => hoverable && setIsHovered(true)}
                onMouseLeave={() => hoverable && setIsHovered(false)}
                onClick={onClick}
            >
                {/* 選択状態のインジケーター */}
                {selected && (
                    <div style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        backgroundColor: '#667eea',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '14px'
                    }}>
                        ✓
                    </div>
                )}

                {icon && (
                    <div style={{
                        fontSize: '48px',
                        marginBottom: '20px',
                        transition: 'transform 0.3s',
                        transform: isHovered ? 'scale(1.1)' : 'scale(1)'
                    }}>
                        {icon}
                    </div>
                )}

                {title && (
                    <h3 style={{
                        fontSize: '24px',
                        marginBottom: '15px',
                        color: '#333',
                        fontWeight: 'bold'
                    }}>
                        {title}
                    </h3>
                )}

                {description && (
                    <p style={{
                        color: '#666',
                        lineHeight: '1.6'
                    }}>
                        {description}
                    </p>
                )}

                {children}
            </div>
        );
    }

    // カスタムコンテンツの場合
    return (
        <div
            style={cardStyle}
            onMouseEnter={() => hoverable && setIsHovered(true)}
            onMouseLeave={() => hoverable && setIsHovered(false)}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

// 拡張可能なカードコンポーネント（詳細表示付き）
const ExpandableCard = ({
    icon,
    title,
    shortDescription,
    longDescription,
    benefits = [],
    isExpanded = false,
    onToggle
}) => {
    const [localExpanded, setLocalExpanded] = React.useState(isExpanded);

    const expanded = onToggle ? isExpanded : localExpanded;
    const handleToggle = onToggle || (() => setLocalExpanded(!localExpanded));

    return (
        <Card
            icon={icon}
            title={title}
            description={shortDescription}
            clickable={true}
            selected={expanded}
            onClick={handleToggle}
        >
            {expanded && (
                <div style={{
                    marginTop: '20px',
                    paddingTop: '20px',
                    borderTop: '1px solid #e0e0e0',
                    animation: 'fadeIn 0.3s ease'
                }}>
                    {longDescription && (
                        <p style={{
                            color: '#555',
                            lineHeight: '1.8',
                            marginBottom: '20px'
                        }}>
                            {longDescription}
                        </p>
                    )}

                    {benefits.length > 0 && (
                        <>
                            <h4 style={{
                                fontSize: '18px',
                                color: '#667eea',
                                marginBottom: '10px'
                            }}>
                                主な利点：
                            </h4>
                            <ul style={{
                                listStyle: 'none',
                                padding: '0'
                            }}>
                                {benefits.map((benefit, idx) => (
                                    <li key={idx} style={{
                                        padding: '5px 0',
                                        color: '#666',
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}>
                                        <span style={{ color: '#667eea', marginRight: '10px' }}>✓</span>
                                        {benefit}
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            )}
        </Card>
    );
};