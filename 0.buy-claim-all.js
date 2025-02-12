///// INPUT /////
const buy_cat = 'crossbreed' // page - pages_gang - footballer - crossbreed - halloween - band - bands_mascot - wild_west - kaiju - cosmic
const total = 1 // INPUT số lượt mua trứng
const quantity = 1 // INPUT số lượng mỗi lần mua trứng


///// MAIN /////
const token = Telegram.WebView.initParams.tgWebAppData,

	fetchRequest = async (cat, quantity) => await fetch("https://zenegg-api.production.cryptokitties.dapperlabs.com/egg/api/den/buy-fancy-egg", {
		headers: {
			accept: "*/*",
			"content-type": "application/json",
			"x-id-token": token
		},
		body: JSON.stringify({
			cat_category: cat,
			quantity: quantity
		}),
		method: "POST",
		mode: "cors",
		credentials: "omit"
	}), 

	claimEgg = async () => await fetch("https://zenegg-api.production.cryptokitties.dapperlabs.com/egg/api/den/claim-tao", {
		headers: {
			accept: "*/*",
			"content-type": "application/json",
			"x-id-token": token
		},
		method: "POST",
		mode: "cors"
	})

.then(r => r.json())
.then(data => data.claim.zen_claimed),
delay = t => new Promise(resolve => setTimeout(resolve, t * 1000));

for (let i = 0; i < total; i++) {
	await fetchRequest(buy_cat,quantity);
	const randomDelay = Math.floor(Math.random() * (25 - 15 + 1)) + 15;
	console.log(`Mua trứng "${buy_cat}" thành công `);
	console.log(`Chờ ${randomDelay} giây mới xoa trứng tiếp`);
	await delay(randomDelay);

	const zenClaimed = await claimEgg();
	const rdDelay = Math.floor(Math.random() * (10 - 5 + 1)) + 5;
	console.log(`Xoa trứng thành công: +${zenClaimed} ZEN`);
	console.log(`Đã xoa: ${i + 1}/${total} lần trứng.`);
	console.log(`Chờ ${rdDelay} giây để tiếp tục mua trứng `);
	console.log("------------------------------------------------------");
	await delay(rdDelay);
}
console.log("DONE ALL");