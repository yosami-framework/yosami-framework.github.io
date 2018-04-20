---
layout: default
title: 'プロジェクト構造 - Yosami'
---

# プロジェクト構造
プロジェクト構造もRuby on Railsの影響を強く受けており、
Railsに慣れ親しんだディベロッパーであれば直感で理解できるものとなっています。

```
root/
  ├ app/
  │  └ assets/
  │  └ components/
  │  └ controllers/
  │  └ view_models/
  │  └ views/
  ├ bin/
  ├ config/
  │  └ initializers/
  │  └ locales/
  ├ public/
  └ tests/
```

## app ディレクトリ
`app`ディレクトリはアプリケーションコードを配置します。

### app/assets ディレクトリ
`app/assets`ディレクトリは画像やスタイルシートなど、プログラムコード以外のアプリケーション構成用を配置します。

### app/components ディレクトリ
`app/components`ディレクトリはコンポーネントファイルを配置します。

### app/controllers ディレクトリ
`app/controllers`ディレクトリはコントローラファイルを配置します。

### app/view_models ディレクトリ
`app/view_models`ディレクトリはビューモデルファイルを配置します。

### app/views ディレクトリ
`app/views`ディレクトリはビューファイルを配置します。

## bin ディレクトリ
`bin`ディレクトリは実行可能ファイルを配置します。

## config ディレクトリ
`config`ディレクトリはルートやアプリケーションの設定ファイルを配置します。

### config/initializers ディレクトリ
`config/initializers`ディレクトリはアプリケーション初期化用のスクリプトを配置します。

### config/locales ディレクトリ
`config/locales`ディレクトリは国際化(I18n)で使用する言語定義ファイルを配置します。

## public ディレクトリ
`public`ディレクトリは静的に配信されるファイルを配置します。`npm run build` でアプリケーションを実行するとコンパイルされたコードはこのディレクトリに配置されます。(Rails同様、このディレクトリはnginxなどで直接配信されます。)

## tests ディレクトリ
`tests`ディレクトリはテストコードを配置します。
