const fetch = require('node-fetch');
const querystring = require("querystring");

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return  { statusCode: 405, body: "Method Not Allowed" };
  }

  const params = querystring.parse(event.body)
  console.log(params)
  const requestUrl = process.env.CMS_POST_URL;
  const dataResponse = await fetch(requestUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-WRITE-API-KEY": process.env.X_WRITE_API_KEY,
    },
    body: JSON.stringify({ content: params.content }),
  });
  const responceData = await dataResponse.json();

	return {
		statusCode: 200,
		body: JSON.stringify(responceData)
	};
}