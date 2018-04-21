---
layout: default
title: 'チュートリアル02 カウンターを作る - Yosami'
---

# チュートリアル02 カウンターを作る
今回はボタンをクリックすると、クリックした回数を数えるカウンターを作ってみましょう！

今回のチュートリアルで作成した[コード](https://github.com/yosami-framework/yosami-tutorial/tree/master/02_counter)と[デモ(SPA)](https://yosami-framework.github.io/demoes/02_counter/)です。

## コントローラの作成とルートの編集
カウンターコントローラを作成し、ルートを `/` に設定します。
[チュートリアル1](/ja/tutorials/01_hello_world)で解説したため、詳細は割愛します。

```shell
$ npm run generate controller counter
```

```javascript
TrackRouter.configure(() => {
  get('/', {to: 'counter', as: 'root'});
});
```

## ビューモデルの修正
ここで言うビューモデルは「MVVMのViewModel」ではなく「ビューの状態を保持するモデル」です。

コントローラレイヤとビューレイヤの中間に位置し、表示しているコンテンツやフォームの状態など、ビューの状態を保持します。

![ビューモデルのコンセプト](/assets/images/concepts/viewmodel.png)


### アトリビュートを定義
クリックした回数を数えるために、カウントビューモデル(`app/view_models/controllers/counter.js`)を修正します。

`definer` 関数内に `count` アトリビュートを定義します。

```javascript
static definer() {
  name('counter');
  accessor('count');
}
```

Yosamiでは、モデルの構造やコントローラの動作を `definer` 関数内にDSLで定義します。

## コントローラの修正
クリック回数を数えるために、カウントコントローラ (`app/controllers/counter_controller.js`) に次の機能を追加します。

### カウント回数の初期化処理
ページ読み込み時にカウント回数を初期化する処理を追加します。

まずは、初期化関数を作成します。

```javascript
clear() {
  this.vm.count = 0;
}
```

これだけでは動作しないので `definer` 関数内に `before_action` を定義します。

```javascript
static definer() {
  name('counter');
  before_action('clear');
}
```

`before_action` はページ読み込み前に実行する関数を指定するDSLです。

### カウントアップ処理
ボタンをクリックした時にカウンタの値を増やす関数を作成します。

```javascript
onUp() {
  this.vm.count++;
}
```

## ビューの修正
クリック数とボタンを表示するために、カウントビュー(`app/views/controllers/counter.js`)を修正します。

基本的にはMithrilでJSXを使用する場合と同様です。

```jsx
<div class='controllers/counter'>
  <p>{this.count} clicks</p>
  <button onclick={() => controller.onUp()}>CLICK</button>
</div>
```

ビュー関数の `this` にはビューモデルのインスタンスがバインドされるため `this.count` でビューモデルの値を参照可能です。

## タイトルの修正
タイトルにカウント数を表示してみます。

カウントビュー(`app/views/controllers/counter.js`)を開き `module.exports = ...` のすぐ下にタイトルを変更する処理を書きます。

```jsx
module.exports = function($, controller, pipe, _yield) {
  pipe.title = `${this.count} clicks`;
  return (
  ...
  );
};
```

`pipe` とは複数のビュー間でデータを共有するためのオブジェクトです。

![パイプのコンセプト](/assets/images/concepts/pipe.png)

pipeは次々と下層のレイヤーに渡されていきます。

`pipe.title`は最下層のApplicationView(`app/views/controller/application.js`)でタイトルとして設定しているため、
カウントビューで指定した値がタイトルに反映されます。

さて、ついに完成しました。早速ブラウザで動作確認してみましょう！

----
いかがでしたか？

本チュートリアルでは、ビューモデルの定義とコントローラへのロジック記述、ビューに動的な値を埋め込む方法について説明しました。

次回は国際化(i18n)について説明します。
