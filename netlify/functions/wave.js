const axios = require('axios');

exports.handler = async (event) => {
    const { url } = JSON.parse(event.body);
    const response = await axios.get(
        `https://wave.webaim.org/api/request?key=${process.env.WAVE_API_KEY}&url=${url}`
    );
    return { statusCode: 200, body: JSON.stringify(response.data) };
};