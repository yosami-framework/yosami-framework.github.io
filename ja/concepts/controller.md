---
layout: default
title: 'コントローラ - Yosami'
---

# コントローラ
コントローラはルータからロードされるコンポーネントです。
コンポーネントを継承しているため、[コンポーネントの機能](/ja/concepts/component)は全て使えます。

# DSL
コントローラの定義を`definer`関数内にDSLで記述します。コンポーネントのDSLは全て使えます。ここではコントローラ特有のDSLについて説明します。

## \#before_action
コントローラのロード処理を記述します。

```javascript
static definer() {
  before_action('loadHoge');
}

loadHoge() {
  console.log('Call #loadHoge!')
}
```

コントローラーのデータがキャッシュからロードされた場合`before_action`は実行されないことに注意してください。


また、非同期なデータをロードする場合`Promise`のインスタンスを返してロード完了を通知するようにしてください。

```javascript
static definer() {
  before_action('loadHoge');
}

loadHoge() {
  return m.request('/hoge').then((result) => {
    this.vm.hoge = result;
  });
}
```

`Promise`を返すことでSSR時にすべてのリソースのロード完了を持ってからレスポンスを返すことができます。

## \#after_action
コントローラのロード処理完了後の処理を記述します。

```javascript
static definer() {
  after_action('checkHoge');
}

checkHoge() {
  console.log('Call #checkHoge!');
}
```

`before_action`と異なり、コントローラーのデータがキャッシュからロードされた場合でも毎回実行されます。


# ライフサイクルメソッド
コンポーネントライフサイクルメソッドは全て使えます。ここではコントローラ特有のライフサイクルメソッドについて説明します。

## \#onparamschanged
コントローラのパラメータが変更された時に呼び出されるフックです。

```javascript
onparamschanged(newValue, oldValue) {
  console.log(newValue, oldValue)  
}
```

例えば`/user?age=18`から`/user?age=19`に変化した場合、
newValueには`{age: 19}`oldValueには`{age: 18}`がセットされて呼び出されます。

# インスタンスメソッド
ウェブアプリケーションを作る上で便利なインスタンスメソッドが用意されています。

## \#url
表示中のページのURLを取得します。

```javascript
controller.url; // `http://localhost:3001/hoge?fuga=1`
```

## \#params
表示中のページのパラメーターを取得します

```javascript
controller.params; // {fuga: 1}
```

## \#raise(code, msg);
例外を発生させます。このメソッドで例外を発生させることでSSR時に適切なレスポンスを返すことができるようになります。

```javascript
controller.raise(404, 'Not Found');
```
