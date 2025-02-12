const token = Telegram.WebView.initParams.tgWebAppData

await fetch("https://zenegg-api.production.cryptokitties.dapperlabs.com/egg/api/den/claim-tao", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "content-type": "application/json",
    "sec-ch-ua": "\"Microsoft Edge\";v=\"129\", \"Not=A?Brand\";v=\"8\", \"Chromium\";v=\"129\", \"Microsoft Edge WebView2\";v=\"129\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "x-id-token": token
  },
  "referrer": "https://zenegg-app.production.cryptokitties.dapperlabs.com/",
  "body": null,
  "method": "POST",
  "mode": "cors",
  "credentials": "omit"
})
.then(r => r.json())
.then(data => console.log('Claim thành công:',data.claim.zen_claimed,' ZEN'))
