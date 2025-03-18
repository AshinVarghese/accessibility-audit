const axios = require('axios');

exports.handler = async (event) => {
    try {
        const { url } = JSON.parse(event.body);
        const response = await axios.get(`https://wave.webaim.org/api/request?key=FcH1n7gT5129&url=${url}`);

        return {
            statusCode: 200,
            body: JSON.stringify(response.data)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to scan website' })
        };
    }
};