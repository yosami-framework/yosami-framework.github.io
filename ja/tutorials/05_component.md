---
layout: default
title: 'チュートリアル05 コンポーネント - Yosami'
---

# チュートリアル05 コンポーネント
今回はコンポーネントの仕組みを使って、たくさんの(無意味な)スイッチが配置されたアプリケーションを作ってみましょう！


今回のチュートリアルで作成した[コード](https://github.com/yosami-framework/yosami-tutorial/tree/master/05_component)と[デモ(SPA)](https://yosami-framework.github.io/demoes/05_component/)です。

# コントローラの作成とルートの定義
スイッチコントローラを作成し、ルートを `/` に設定します。
[チュートリアル1](/ja/tutorials/01_hello_world)で解説したため、詳細は割愛します。

```shell
$ npm run generate controller switches
```

```javascript
TrackRouter.configure(() => {
  get('/', {to: 'switches', as: 'root'});
});
```

# コンポーネントの作成
コンポーネントジェネレータでコンポーネントの雛形を生成します。

```shell
$ npm run generate component switch
```

余談ですが、コントローラとコンポーネントの構造はほとんど一緒です。
なぜならコントローラもコンポーネントの一種だからです。

## スイッチコンポーネントのビューモデルを修正
スイッチが押された回数を記録する`count`アトリビュートをコンポーネントのビューモデルに定義します。

`app/view_models/components/switch.js`

```javascript
static definer() {
  name('switch');
  accessor('count');
}
```

## スイッチコンポーネントを修正
コンポーネント初期化時にカウントに0をセットし、カウントを増やすための`onUp`関数をスイッチコンポーネントに実装します。

`app/components/switch.js`

```javascript
module.exports = class SwitchComponent extends ApplicationComponent {
  static definer() {
    name('switch');
  }

  oninit(...args) {
    super.oninit(...args);
    this.vm.count = 0;
  }

  onUp() {
    this.vm.count++;
  }
}
```

`oninit`は[Mithrilのライフサイクルメソッド](http://mithril-ja.js.org/lifecycle-methods.html)です。
YosamiのコンポーネントではMithrilのライフサイクルメソッドが呼び出し可能です。
ただし呼び出す際には`super`で基底クラスを呼び出してください。


## スイッチコンポーネントのビューとスタイルを修正
コンポーネントのビューとスタイルを修正しスイッチを表示します。

`app/views/components/switch.js`
```jsx
<div class='components/switch'>
  <div
    class='switch__knob'
    style={`transform:rotate(${this.count * 90}deg)`}
    onclick={() => component.onUp()}
  />
</div>
```

`app/assets/styles/components/switch.scss`

```scss
.components\/switch {
  display: inline-block;
  margin: 32px;

  .switch__knob {
    width: 128px;
    height: 128px;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top: 3px solid #ff1493;
    box-shadow: 0 0 2px 1px #ccc;
    transition: transform 0.25s 0s ease;
    cursor: pointer;

    &:hover {
      background: #fdd;
    }
  }
};
```

# コントローラのビューを修正
コントローラのビューに作成したコンポーネントを埋め込みます。

`app/views/controllers/switches.js`

```jsx
const SwithComponent = require('../../components/switch_component');

module.exports = function($, controller, pipe, _yield) {
  return (
<div class='controllers/switches'>
  <SwithComponent />
  <SwithComponent />
  <SwithComponent />
  <SwithComponent />
  <SwithComponent />
</div>
  );
};
```

以上で完成です。早速ブラウザで動作確認してみましょう！

----
いかがでしたか？

本チュートリアルでは、コンポーネント作成の基礎ついて説明しました。

5回に渡ってのチュートリアルで、Yosamiを利用したアプリケーション実装の基礎をご紹介しました。

アプリケーションについてより深く理解を深めたい場合は、
その他のドキュメントや[Mithril](http://mithril-ja.js.org)のドキュメントをご覧ください。
