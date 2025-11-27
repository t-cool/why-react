// pages/Lesson.js - propsと親子コンポーネントに関するレッスンページ
const Lesson = () => {
    // スタイル定義
    const styles = {
        container: {
            maxWidth: '800px',
            margin: '40px auto',
            padding: '20px',
            lineHeight: '1.6',
            color: '#333',
            fontFamily: 'sans-serif'
        },
        h1: {
            borderBottom: '2px solid #eee',
            paddingBottom: '10px',
            marginBottom: '20px'
        },
        h2: {
            marginTop: '40px',
            marginBottom: '20px',
            paddingBottom: '5px',
            borderBottom: '1px solid #eee'
        },
        h3: {
            marginTop: '30px',
            marginBottom: '15px'
        },
        p: {
            margin: '15px 0'
        },
        codeBlock: {
            backgroundColor: '#f4f4f4',
            padding: '15px',
            borderRadius: '5px',
            overflowX: 'auto',
            fontFamily: 'monospace',
            whiteSpace: 'pre-wrap'
        },
        inlineCode: {
            backgroundColor: '#eee',
            padding: '2px 5px',
            borderRadius: '3px',
            fontFamily: 'monospace'
        },
        ul: {
            paddingLeft: '20px'
        },
        li: {
            marginBottom: '10px'
        },
        strong: {
            fontWeight: 'bold'
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.h1}>Reactにおけるpropsと親子コンポーネント</h1>

            <p style={styles.p}>
                Reactアプリケーションは、コンポーネントと呼ばれる独立した再利用可能な部品から構成されます。これらのコンポーネントが互いにどのように情報をやり取りするのかを理解することは、Reactを学ぶ上で非常に重要です。その中心的な役割を担うのが<code style={styles.inlineCode}>props</code>です。
            </p>

            <h2 style={styles.h2}>親コンポーネントと子コンポーネント</h2>

            <p style={styles.p}>
                Reactでは、コンポーネントは階層構造（ツリー構造）を形成します。あるコンポーネントが別のコンポーネントをレンダリング（描画）する場合、レンダリングする側を<strong style={styles.strong}>親コンポーネント</strong>、レンダリングされる側を<strong style={styles.strong}>子コンポーネント</strong>と呼びます。
            </p>

            <pre style={styles.codeBlock}>
                <code>
{`// 親コンポーネント
function Parent() {
  return (
    <div>
      <h1>私は親コンポーネントです</h1>
      <Child /> {/* 子コンポーネントを呼び出す */}
    </div>
  );
}

// 子コンポーネント
function Child() {
  return <p>私は子コンポーネントです</p>;
}`}
                </code>
            </pre>

            <p style={styles.p}>
                この例では、<code style={styles.inlineCode}>Parent</code>コンポーネントが<code style={styles.inlineCode}>Child</code>コンポーネントを呼び出しているので、<code style={styles.inlineCode}>Parent</code>が親、<code style={styles.inlineCode}>Child</code>が子となります。
            </p>

            <h2 style={styles.h2}>propsとは？</h2>

            <p style={styles.p}>
                <code style={styles.inlineCode}>props</code>（プロパティの略）は、親コンポーネントから子コンポーネントへデータを渡すための仕組みです。これにより、子コンポーネントの振る舞いや表示を動的に変更することができます。
            </p>

            <p style={styles.p}>
                <code style={styles.inlineCode}>props</code>は、HTMLの属性のように記述します。
            </p>

            <pre style={styles.codeBlock}>
                <code>
{`// 親コンポーネント
function Parent() {
  return (
    <div>
      {/* 子コンポーネントに'name'という名前で'"田中"'というデータを渡す */}
      <Greeting name="田中" />
      <Greeting name="鈴木" />
    </div>
  );
}

// 子コンポーネント
function Greeting(props) {
  // propsオブジェクトからnameプロパティを取り出す
  return <p>こんにちは、{props.name}さん！</p>;
}`}
                </code>
            </pre>

            <p style={styles.p}>
                この例では、<code style={styles.inlineCode}>Parent</code>コンポーネントから<code style={styles.inlineCode}>Greeting</code>コンポーネントに対して、<code style={styles.inlineCode}>name</code>という名前の<code style={styles.inlineCode}>props</code>を渡しています。<code style={styles.inlineCode}>Greeting</code>コンポーネントは、受け取った<code style={styles.inlineCode}>props</code>オブジェクト（この場合は <code style={styles.inlineCode}>{`{ name: "田中" }`}</code> や <code style={styles.inlineCode}>{`{ name: "鈴木" }`}</code>）を引数として受け取り、そのデータを使ってメッセージを表示します。
            </p>

            <h3 style={styles.h3}>propsの主な特徴</h3>
            <ul style={styles.ul}>
                <li style={styles.li}>
                    <strong style={styles.strong}>読み取り専用:</strong> 子コンポーネントは受け取った<code style={styles.inlineCode}>props</code>を直接変更することはできません。これはReactの「データはトップダウンに流れる」という原則に基づいています。もし子コンポーネント内でデータを変更したい場合は、親コンポーネントからデータを変更するための関数を<code style={styles.inlineCode}>props</code>として受け取る必要があります（これは少し発展的な内容です）。
                </li>
                <li style={styles.li}>
                    <strong style={styles.strong}>オブジェクト:</strong> <code style={styles.inlineCode}>props</code>はJavaScriptのオブジェクトです。複数のデータを渡すこともできます。
                </li>
            </ul>

            <pre style={styles.codeBlock}>
                <code>
{`<UserProfile name="佐藤" age={25} hobby="読書" />`}
                </code>
            </pre>
             <pre style={styles.codeBlock}>
                <code>
{`function UserProfile(props) {
  return (
    <div>
      <p>名前: {props.name}</p>
      <p>年齢: {props.age}</p>
      <p>趣味: {props.hobby}</p>
    </div>
  );
}`}
                </code>
            </pre>

            <h2 style={styles.h2}>まとめ</h2>
            <ul style={styles.ul}>
                <li style={styles.li}>Reactのコンポーネントは親子関係を持つことができる。</li>
                <li style={styles.li}><code style={styles.inlineCode}>props</code>は、親コンポーネントから子コンポーネントへデータを渡すための仕組み。</li>
                <li style={styles.li}><code style={styles.inlineCode}>props</code>は子コンポーネントからは変更できない（読み取り専用）。</li>
            </ul>

            <p style={styles.p}>
                <code style={styles.inlineCode}>props</code>を理解することは、コンポーネント間で情報を共有し、再利用性の高いコンポーネントを作成するための第一歩です。
            </p>
        </div>
    );
};
