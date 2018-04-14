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

### さっそく作ってみましょう！

下記コマンドを実行すると、コントローラに必要なファイルと設定が自動的に準備され、テストも自動的に生成されます。

```shell
$ npm run generate controller hello
```
