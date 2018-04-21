---
layout: default
title: 'コンポーネント - Yosami'
---

# コンポーネント
コンポーネントはビューの部品をカプセル化することで、構造化しやすくしたり、再利用性を高めるための仕組みです。

Yosamiのコンポーネントは[Mithrilのコンポーネント](http://mithril-ja.js.org/components.html)から
ビューとビューモデルを別ファイルに分離し、いくつかの便利な機能を追加したものです。

# DSL
コンポーネントの定義を`definer`関数内にDSLで記述します。


## \#name
コンポーネントの名前を定義します。`npm run generate component`でコンポーネントを生成した場合、
自動的に値がセットされるため通常変更する必要はありません。

```javascript
static definer() {
  name('hoge');
}
```

## \#view
コンポーネントがレンダリングするビューを定義します。未定義の場合は名前に応じたビューが自動的にロードされます。

```javascript
static definer() {
  views('hoges/fuga'); // `app/views/components/hoges/fuga.js`をロード
}
```

また、複数のビューを重ねて使用することもできます。

```javascript
static definer() {
  views('hoges/outer'); // `app/views/components/hoges/outer.js`をロード
  views('hoges/inner'); // `app/views/components/hoges/inner.js`をロード
}
```

`inner`のレンダリング結果は`outer`の`_yield`引数にセットされます。

## \#event
global(window)に対してイベントをバインドします。

```javascript
static definer() {
  event('scroll', 'onScroll');
}

onScroll(e) {
  console.log(e);
}
```

`event`DSLで設定したイベントは、コンポーネント破棄時に自動的にアンバインドされます。

# ライフサイクルメソッド
[Mithrilのライフサイクルメソッド](http://mithril-ja.js.org/lifecycle-methods.html)に加え、
`onattrschanged`メソッドが追加されれています。

Mithrilのライフサイクルメソッドを使用するときは、`super`で基底クラスの実装を必ず呼び出してください。

```javascript
oninit(...args) {
  super.oninit(...args)
  console.log('ONINIT')  
}
```

## onattrschanged
コンポーネントの属性が変更された時に呼び出されるフックです。

```javascript
onattrschanged(newValue, oldValue) {
  console.log(newValue, oldValue)  
}
```

例えば`<UserComponent age='18'/>`から`<UserComponent age='19'/>`に変化した場合、
newValueには`{age: 19}`oldValueには`{age: 18}`がセットされて呼び出されます。

# インスタンスメソッド
ウェブアプリケーションを作る上で便利なインスタンスメソッドが用意されています。

## \#attrs
コンポーネントのアトリビュートを取得します。

例えば次のようなコンポーネントが存在するとき

```jsx
<EngineComponent type='13B' exhasut_volume='1308' />
```

`#attrs` の結果はこのようになります。

```javascript
component.attrs; // {type: '13B', exhasut_volume: '1308'}
```

## \#i18n
I18クラスのインスタンスを取得します。
詳しい使い方に関しては[チュートリアル3](/ja/tutorials/03_i18n)をご覧ください。

```javascript
component.i18n('hoge') // 'ほげ'
```

## \#vm
ビューモデルのインスタンスを取得します。

```javascript
component.vm
```

## \#vnode
コンポーネントのVnodeを取得します。

```javascript
component.vnode
```
