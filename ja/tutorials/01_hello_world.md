---
layout: default
title: 'チュートリアル01 Hello world - Yosami'
---

# チュートリアル01 Hello world
[Yosamiのインストール](/ja/install)は済ませましたか？
まずは、画面に文字を表示する簡単なアプリケーションを作ってみましょう！

## コントローラの作成
ページを表示するためにはコントローラがなければなりません。ルータがアドレスを解釈し設定されているコントローラ(Mithrilのコンポーネント)をロードしてページをレンダリングします。

![コントローラのコンセプト](/assets/images/concepts/controller.png)

### ジェネレータ
ジェネレータを用いると、コントローラに必要なファイルと設定が自動的に準備され、テストも自動的に生成されます。

```shell
$ npm run generate controller hello
```

これだけでアプリケーションはすでに動作する状況になっています。

### 開発用サーバーを起動
下記コマンドで開発用サーバーが起動します。

```shell
$ npm run dev
```

`http://localhost:3001/hello` にブラウザからアクセスしてみましょう！ページは表示されたでしょうか？

開発用サーバーはHMRとLiveReloadが有効です。

## ビューを修正
ビューを修正してメッセージを表示しましょう！
`app/views/controllers/hello.js` を修正します。

```jsx
<div class='controllers/hello'>
  Hello world
</div>
```

## スタイルを修正
スタイルを修正してデザインを調整してみましょう！
`app/assets/controllers/hello.scss` を修正します。

```scss
.controllers\/hello {
  font-size: 24px;
  text-align: center;
};
```

## ルートを修正
`http://localhost:3001/` でアクセスできるようにしてみましょう！
ルート定義 `config/routes.js` を修正します。

```javascript
TrackRouter.configure(() => {
  get('/', {to: 'hello', as: 'root'});
});
```

## サーバーサイドレンダリング
本番サーバーで起動すると自動的にサーバーサイドレンダリングモードが始まります。

```shell
$ npm start
```

アクセスしてレスポンスを確認するとタグがレンダリングされていることを確認できると思います。

この本番サーバはpm2などと組み合わせ、実環境での運用に耐えることができるものとなっています。

----

いかがでしょうか？

本チュートリアルでは、コントローラの作成とルート定義の基礎、アプリケーションの起動方法について説明しました。

次回はコントローラの処理について、より詳しく説明します。
