const axios = require('axios');

exports.handler = async (event) => {
    const { url } = JSON.parse(event.body);
    const response = await axios.get(
        `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&key=${process.env.LIGHTHOUSE_KEY}&category=ACCESSIBILITY`
    );
    return { statusCode: 200, body: JSON.stringify(response.data) };
};