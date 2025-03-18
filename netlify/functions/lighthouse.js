const axios = require('axios');

exports.handler = async (event) => {
    try {
        const { url } = JSON.parse(event.body);
        console.log('Starting Lighthouse scan for:', url);
        const startTime = Date.now();
        const response = await axios.get(
            `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&key=${process.env.LIGHTHOUSE_KEY}&category=ACCESSIBILITY`,
            { timeout: 8000 } // 8-second timeout
        );
        console.log(`Scan completed in ${(Date.now() - startTime) / 1000} seconds`);

        return {
            statusCode: 200,
            body: JSON.stringify(response.data)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: 'Lighthouse scan failed',
                message: error.message
            })
        };
    }
};