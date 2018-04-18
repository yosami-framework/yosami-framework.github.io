---
layout: default
title: 'バリデーション - Yosami'
---

# バリデーション
Yosamiのモデルにはバリデーションの仕組みが存在し、標準で便利なバリデータが組み込まれています。

バリデーションを使用したアプリケーションの例は[チュートリアル4](/ja/tutorials/04_validation)をご覧ください。

# TrackModel
TrackModelを継承したクラスはバリデーションの仕組みも継承されます。

```javascript
const TrackModel = require('track-model');

class User < TrackModel
  static definer() {
    name('user');
    accessor('name');
    validates('name', {length: {max: 5}});
  }
end
```

## インスタンスメソッド

### \#validate
指定した属性に対してバリデーションを非同期に実行します。
戻り地は`Promise`です。

```javascript
user.validate('name').then((result) => {
  console.log(result)
});
```

### \#validateAll
すべての属性に対してバリデーションを非同期に実行します。
戻り地は`Promise`です。

```javascript
user.validateAll.then((result) => {
  console.log(result)
});
```

### errors
バリデーションエラーを取得します。
バリデーション実行後、エラーが存在する場合に`Error`オブジェクトがセットされます。

```javascript
user.errors.name   // => Error
user.errors.name.t // => 言語ごとのメッセージを取得
```

# 組み込みバリデーター
Yosamiに組み込まれているバリデータ一覧です。

## PresenceValidator
値が存在することを検証するバリデータです。
nullやundefined、空文字列がバリデーションエラーとなります。

```javascript
validates('hoge', {presence: true});
```

## LengthValidator
文字の長さを検証するバリデーターです。

```javascript
validates('hoge', {length: options});
```

### options

| オプション       | 概要           |
| :------------- | :------------- |
| min            | 最小文字数       |
| max            | 最大文字数       |

### 例

```javascript
validates('hoge', {length: {min: 10}});
```

## NumericalValidator
数値を検証するバリデーターです。

```javascript
validates('hoge', {numerical: options});
```

### options

| オプション       | 概要         |
| :------------- | :---------- |
| min            | 最小値       |
| max            | 最大値       |

### 例

```javascript
validates('hoge', {numerical: {min: 10}});
```


## FunctionValidator
オリジナルのバリデーションを定義できるバリデーターです。

```javascript
validates('hoge', {function: options});
```

### options

| オプション       | 概要            |
| :------------- | :-------------- |
| validate       | バリデーション関数 |

### 例

```javascript
const Error = require('track-model/validators/error');
const checkHoge = function(value, resolve, reject) {
  if (value != 'hoge') {
    reject(new Error('is_not_hoge'));
  } else {
    resolve();
  }
};
```

```javascript
validates('hoge', {function: {validate: checkHoge}})
```

## FormatValidator
正規表現を利用して値を検証するバリデーターです。

```javascript
validates('hoge', {format: options});
```

### options

| オプション       | 概要    |
| :------------- | :------ |
| regex          | 正規表現 |

### 例

```javascript
validates('hoge', {format: {regex: /.+@.+/}}});
```
