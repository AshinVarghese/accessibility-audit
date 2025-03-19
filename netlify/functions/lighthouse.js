const axios = require('axios');

exports.handler = async (event) => {
    try {
        const { url } = JSON.parse(event.body);
        console.log('Starting Lighthouse scan for:', url);
        const startTime = Date.now();
        const response = await axios.get(
            `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&key=${process.env.LIGHTHOUSE_KEY}&category=ACCESSIBILITY&strategy=mobile`,
            { timeout: 7000 }
          );
        console.log(`Scan completed in ${(Date.now() - startTime) / 1000} seconds`);

        return {
            statusCode: 200,
            body: JSON.stringify({
              score: response.data.lighthouseResult.categories.accessibility.score * 100,
              contrastIssues: response.data.lighthouseResult.audits['color-contrast'].details.items
            })
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