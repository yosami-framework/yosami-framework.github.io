---
layout: default
title: 'チュートリアル04 バリデーション - Yosami'
---

# チュートリアル04 バリデーション
Yosamiはとても簡単にバリデーションを定義することができます。

今回は[チュートリアル2](/ja/tutorials/02_counter)で作成したアプリケーションを修正して、
カウント数が5未満の場合はエラーを表示するようにしてみましょう！

今回のチュートリアルで作成した[コード](https://github.com/yosami-framework/yosami-tutorial/tree/master/04_validation)と[デモ(SPA)](https://yosami-framework.github.io/demoes/04_validation/)です。

## 下準備
まずは[チュートリアル2](/ja/tutorials/02_counter)に沿って、クリックでカウント数を増やすアプリケーションを作成してください！

## ビューモデルの修正
ビューモデルにバリデーションを定義しましょう！`app/view_models/controllers/counter.js`を次のように修正します。

```javascript
static definer() {
  name('counter');
  accessor('count');
  validates('count', {numerical: {min: 5}});
}
```

なお、すべての組み込みバリデータなどは[こちら](/ja/concepts/validation)のページをご覧ください。


## バリデーションの実行
カウントを増やす際にバリデーションを実行するように、`app/controllers/counter_controller.js`を修正しましょう！

### Mithrilのロード
バリデーションは非同期で実行されるため、バリデーション完了時に画面の明示的な再描画が必要です。
画面の再描画にはMithrilの`redraw`メソッドを呼び出す必要があるので`mithril`をロードします。

ファイルの先頭に次のコードを追加します。

```javascript
const m = require('mithril');
```

### onUp関数の修正
バリデーションが実行されるように`onUp`関数を修正しましょう！

```javascript
onUp() {
  this.vm.count++;
  this.vm.validateAll().then(m.redraw);
}
```

バリデーション完了時に`m.redraw`を呼び出して画面が再描画されるようにしています。

## バリデーション結果の埋め込み
バリデーションの結果が表示されるように`app/views/controllers/counter.js`を修正しましょう！

`<button>`タグのすぐ下に埋め込みます。

```jsx
<div class='controllers/counter'>
  <p>{this.count} clicks</p>
  <button onclick={() => controller.onUp()}>CLICK</button>
  <p>{controller.vm.errors.count ? controller.vm.errors.count.t : ''}</p>
</div>
```

エラーが存在する場合`t`メソッドで言語別のエラーを表示します。

## ロケールファイルの作成
`config/locales/en.yml`にエラーを定義します。

```en
en:
  track_model:
    errors:
      greater_than: 'must be greater than or equal to %{count}'
```

以上で完成です。早速ブラウザで動作確認してみましょう！

余裕があれば[チュートリアル3](/ja/tutorials/03_i18n)と組み合わせて他の言語でエラーメッセージが表示されるように実装してみてください！

----
いかがでしたか？

本チュートリアルでは、バリデーションの方法について説明しました。

次回はコンポーネントの作成について説明します。
