const token = Telegram.WebView.initParams.tgWebAppData;

// Hàm mua trứng
async function buyEgg() {
  try {
    const response = await fetch("https://zenegg-api.production.cryptokitties.dapperlabs.com/egg/api/den/buy-fancy-egg", {
      headers: {
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
      referrer: "https://zenegg-app.production.cryptokitties.dapperlabs.com/",
      body: JSON.stringify({
        cat_category: "band",
        quantity: 1
      }),
      method: "POST",
      mode: "cors",
      credentials: "omit",
    });

    const data = await response.json();
    console.log('Dữ liệu trả về:', data);

    // Kiểm tra phản hồi từ máy chủ
    if (data && data.zen_den && data.zen_den.can_claim_tao === true) {
      console.log('Mua Trứng BAND Thành Công, Sẵn sàng Claim TAO.');
      
      // Chờ 15 giây rồi thực hiện Claim TAO
      console.log('Chờ 15 giây để Claim TAO...');
      await new Promise(resolve => setTimeout(resolve, 15000)); // Chờ 15 giây
      await claimTao(); // Gọi hàm claimTao
    } else {
      console.log('Không thể Claim TAO ngay bây giờ. Đợi và thử lại.');
      console.log('----------------------------------------------------------------');
    }

  } catch (error) {
    console.error('Có lỗi xảy ra khi mua trứng:', error);
    console.log('Chờ 10 giây để thử lại...');
    console.log('----------------------------------------------------------------');
    await new Promise(resolve => setTimeout(resolve, 10000)); // Chờ 10 giây
    buyEgg(); // Thử lại hàm buyEgg
  }
}

// Hàm Claim TAO
async function claimTao() {
  try {
    const response = await fetch("https://zenegg-api.production.cryptokitties.dapperlabs.com/egg/api/den/claim-tao", {
      headers: {
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
      referrer: "https://zenegg-app.production.cryptokitties.dapperlabs.com/",
      body: null,
      method: "POST",
      mode: "cors",
      credentials: "omit"
    });

    const data = await response.json();
    console.log('Claim Thành Công:', data.claim.zen_claimed, 'ZEN');

    // Chờ 10 giây trước khi chạy lại hàm buyEgg
    console.log('Chờ 10 giây để tiếp tục mua trứng...');
    console.log('----------------------------------------------------------------');
    await new Promise(resolve => setTimeout(resolve, 10000)); // Chờ 10 giây
    buyEgg(); // Gọi lại hàm buyEgg

  } catch (error) {
    console.error('Có lỗi xảy ra khi Claim TAO:', error);
    console.log('----------------------------------------------------------------');
  }
}

// Gọi hàm mua trứng ban đầu
buyEgg();
