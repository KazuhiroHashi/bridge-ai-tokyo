# bridge-ai-tokyo

**https://bridge-ai-tokyo.com/** — Bridge AI のサイト。製品の入口、サポート、
全製品共通のプライバシーポリシー。

素の HTML だけ。ビルドも依存関係もない。ファイルを直せば、push した数分後に反映される。

```
index.html     … トップページ(製品一覧・運営者情報)
support.html   … サポート(App Store Connect の「サポートURL」に登録する)
privacy.html   … プライバシーポリシー(App Store Connect の「プライバシーポリシーURL」に登録する)
CNAME          … 独自ドメイン。消さないこと
```

## 屋号の表記は『Bridge AI』(半角スペースあり)

開業届・D-U-N-S・Apple の登録名がすべてこの表記。**1文字でも違えてはいけない。**

D&B と Apple の審査は、申請された事業者名とサイト上の表記を機械的に照合する。
人間が見れば同じでも `BridgeAI` と `Bridge AI` は別文字列で、照合が取れないと
差し戻しになり、2〜4週間の想定が伸びる。

`index.html` の「運営者情報」に正式表記を置いてあるのはこのため。消さないこと。

## なぜ製品と別のリポジトリなのか

GitHub Pages には **1リポジトリ 1GB** の上限がある。TOEIC 問題集だけで 290MB
(音声 4,252 本で 142MB)使っているので、製品を同じリポジトリに足していくと
3 個目で頭を打つ。

そこで **製品1つ = リポジトリ1つ = サブドメイン1つ** に分けている。

| | |
|---|---|
| `bridge-ai-tokyo.com` | このリポジトリ(ハブ)。軽いまま保つ |
| `toeic.bridge-ai-tokyo.com` | [toeic_test](https://github.com/KazuhiroHashi/toeic_test) |

ハブが軽いので、**プライバシーポリシーとサポートの URL が動かない。**
App Store にはこの2つの URL を登録するため、ここが安定していることが重要。

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
