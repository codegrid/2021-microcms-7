const fetch = require("node-fetch");

const headers = {
  "Access-Control-Allow-Origin": "*", //デプロイ後のサイトURLを指定する
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST",
};
exports.handler = async (event, context) => {
  // POST以外は許可しない
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  // お問い合わせ内容をjsonで取得
  const requestBody = JSON.parse(event.body);

  const requestUrl = process.env.CMS_POST_URL;
  const dataResponse = await fetch(requestUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-WRITE-API-KEY": process.env.X_WRITE_API_KEY,
    },
    // お問い合わせ内容をmicroCMSにPOST
    body: JSON.stringify({ content: requestBody.content }),
  });

  // 結果を返す
  const responseData = await dataResponse.json();
  return {
    statusCode: 200,
    body: JSON.stringify(responseData),
    headers,
  };
};
