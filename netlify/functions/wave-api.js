const axios = require('axios');

exports.handler = async (event) => {
    try {
        const { url } = JSON.parse(event.body);

        // WAVE API Call
        const waveResponse = await axios.get(
            `https://wave.webaim.org/api/request?key=${process.env.WAVE_API_KEY}&url=${url}`
        );

        // Lighthouse API Call
        const lighthouseResponse = await axios.get(
            `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&key=${process.env.LIGHTHOUSE_KEY}&category=ACCESSIBILITY`
        );

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
            body: JSON.stringify({ error: 'Scan failed' })
        };
    }
};