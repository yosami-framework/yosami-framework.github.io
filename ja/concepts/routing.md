---
layout: default
title: 'ルーティング - Yosami'
---

# ルーティング
Yosamiのルーターは[Mithril](http://mithril-ja.js.org)のルータをベースに、
RailsのようなDSLでルートを定義できる仕組みになっています。

ルートは`config/routes.js`に定義します。

# ルートの定義
`/`を`app/controllers/wellcome_controller`に割り当て、`root`と言う名前を割り当てます

```javascript
get('/', {to: 'wellcome', as: 'root'});
```

ここで割り当てた名前は`.getPath`メソッドでパスを取得する際に使用します。

```javascript
TrackRouter.getPath('root'); // => `/`
```

# パラメータの割当
Yosamiはパラメータに動的なセグメントを使用可能です。
次の例では、`/users/2525`というルートを解決すると、`app/controllers/users/show_controller`をロードして`id`というパラメータに`2525`という値がセットします。

```javascript
get('/users/:id', {to: 'users/show', as: 'user'});
```

動的セグメントは`.getPath`メソッドで値を埋めて取得することが可能です。

```javascript
TrackRouter.getPath('user', {id: 888}); // => `/users/888`
```

# 名前空間
例えば次の例ように共通のプレフィックスがルートに含まれる場合

```javascript
get('/users',     {to: 'users/index', as: 'users'});
get('/users/:id', {to: 'users/show',  as: 'user'});
```

`namespace`を使用してまとめることが可能です。

```javascript
namespace('/users', () => {
  get('/users',     {to: 'users/index', as: 'users'});
  get('/users/:id', {to: 'users/show',  as: 'user'});
});
```

# 動的セグメントの制限
`constraints`オプションを使用すると、動的セグメントのURLフォーマットを特定の形式に制限することができます。

```javascript
get('/users/:id', {to: 'users/show', as: 'user', constraints: {id: /^\d$/}});
```
