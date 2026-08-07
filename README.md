# bridge-ai-tokyo

**https://bridge-ai-tokyo.com/** — BridgeAI のサイト。製品の入口と、全製品共通のプライバシーポリシー。

素の HTML だけ。ビルドも依存関係もない。ファイルを直せば、push した数分後に反映される。

```
index.html     … トップページ(製品一覧)
privacy.html   … プライバシーポリシー(App Store に登録する URL はこれ)
CNAME          … 独自ドメイン。消さないこと
```

## なぜ製品と別のリポジトリなのか

GitHub Pages には **1リポジトリ 1GB** の上限がある。TOEIC 問題集だけで 290MB
(音声 4,252 本で 142MB)使っているので、製品を同じリポジトリに足していくと
3 個目で頭を打つ。

そこで **製品1つ = リポジトリ1つ = サブドメイン1つ** に分けている。

| | |
|---|---|
| `bridge-ai-tokyo.com` | このリポジトリ(ハブ)。軽いまま保つ |
| `toeic.bridge-ai-tokyo.com` | [toeic_test](https://github.com/KazuhiroHashi/toeic_test) |

ハブが軽いので、**プライバシーポリシーの URL が動かない。**App Store には
`https://bridge-ai-tokyo.com/privacy.html` を登録するため、ここが安定していることが重要。

## 製品を追加する手順

1. 製品のリポジトリを作り、直下に `CNAME`(中身は `<名前>.bridge-ai-tokyo.com`)を置く
2. Cloudflare の DNS に CNAME レコードを1つ足す
   (Name=`<名前>` / Target=`kazuhirohashi.github.io` / **Proxy status は DNS only**)
3. 製品リポジトリの Settings → Pages で Custom domain を設定し、Enforce HTTPS
4. このリポジトリの `index.html` の `<section id="products">` に
   `<article class="card">` を1つ足す

**Proxy status を Proxied(オレンジの雲)にしないこと。** GitHub が証明書を
発行できず、サイトが開かなくなる。

## プライバシーポリシーの二重管理について

iOS アプリはオフラインで完結する必要があるため、`toeic_test` 側にも
`privacy.html` を同梱している。**内容を変えるときは両方直すこと。**

- 公開用(App Store に登録):このリポジトリの `privacy.html`
- アプリ同梱用(オフラインで開く):`toeic_test/privacy.html`
