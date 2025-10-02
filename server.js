// server.js - 開発用シンプルサーバー（Node.js）
// URLルーティングをテストするための簡易サーバー

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000; // Live Serverの5500ではなく3000を使用

const server = http.createServer((req, res) => {
    // 静的ファイルのMIMEタイプ
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.ico': 'image/x-icon'
    };

    // リクエストされたパスを取得
    let filePath = '.' + req.url;

    // ディレクトリの場合はindex.htmlを返す
    if (filePath === './') {
        filePath = './index.html';
    }

    // 拡張子がない場合（ルーティング用）、index.htmlを返す
    const extname = path.extname(filePath).toLowerCase();
    if (!extname && !fs.existsSync(filePath)) {
        filePath = './index.html';
    }

    // ファイルを読み込んで返す
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                // ファイルが見つからない場合もindex.htmlを返す（SPAのため）
                fs.readFile('./index.html', (error, content) => {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(content, 'utf-8');
                });
            } else {
                res.writeHead(500);
                res.end('Server error: ' + error.code);
            }
        } else {
            // 成功時
            const contentType = mimeTypes[extname] || 'application/octet-stream';
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`
    ========================================
    🚀 サーバーが起動しました！

    URL: http://localhost:${PORT}

    以下のURLでアクセスできます:
    - http://localhost:${PORT}/        (ホーム)
    - http://localhost:${PORT}/about   (機能)
    - http://localhost:${PORT}/contact (お問い合わせ)

    Ctrl+C で終了
    ========================================
    `);
});