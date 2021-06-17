const fetch = require('node-fetch');

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
};
exports.handler = async (event, context) => {

  if (event.httpMethod !== "POST") {
    return  { statusCode: 405, body: "Method Not Allowed" };
  }
  const requestBody = JSON.parse(event.body)

  console.log(requestBody)
  const requestUrl = process.env.CMS_POST_URL;
  const dataResponse = await fetch(requestUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-WRITE-API-KEY": process.env.X_WRITE_API_KEY,
    },
    body: JSON.stringify({ content: requestBody.content }),
  });
  const responceData = await dataResponse.json();

	return {
		statusCode: 200,
		body: JSON.stringify(responceData),
    headers
	};
}