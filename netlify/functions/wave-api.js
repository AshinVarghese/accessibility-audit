const axios = require('axios');

// Timeout for individual API calls (4 seconds each)
const API_TIMEOUT = 4000;

exports.handler = async (event) => {
    try {
        const { url } = JSON.parse(event.body);

        // Run API calls in parallel
        const [waveResponse, lighthouseResponse] = await Promise.all([
            axios.get(`https://wave.webaim.org/api/request?key=${process.env.WAVE_API_KEY}&url=${url}`, {
                timeout: API_TIMEOUT
            }),
            axios.get(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&key=${process.env.LIGHTHOUSE_KEY}&category=ACCESSIBILITY`, {
                timeout: API_TIMEOUT
            })
        ]);

        return {
            statusCode: 200,
            body: JSON.stringify({
                wave: waveResponse.data,
                lighthouse: lighthouseResponse.data
            })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: 'Scan failed',
                message: error.message
            })
        };
    }
};