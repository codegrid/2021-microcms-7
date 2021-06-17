const fetch = require('node-fetch')
exports.handler = async (event, context) => {
  const requestUrl = process.env.CMS_POST_URL;
  const dataResponse = await fetch(requestUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-WRITE-API-KEY": process.env.X_WRITE_API_KEY,
    },
    body: JSON.stringify({ body: "hello from netlify functions" }),
  });
  const data = await dataResponse.json();

	return {
		statusCode: 200,
		body: data
	};
}