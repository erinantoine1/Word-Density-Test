import axios from 'axios';
import { calculateWordDensity } from './wordDensityCalculator';

export const runTest = (webpageUrl, urlId, setParsedText, updateTestReportCallback) => {
  if (!webpageUrl) {
    return;
  }

  axios
    .get(`/get-html?url=${encodeURIComponent(webpageUrl)}`)
    .then((response) => {
      const fetchedHtml = response.data;
      setParsedText(fetchedHtml);
      const wordDensityData = calculateWordDensity(fetchedHtml);

      const newTestData = {
        url_id: urlId,
        word_density_list: JSON.stringify(wordDensityData),
      };

      axios
        .post('/tests', newTestData)
        .then(() => {
          axios
            .get(`tests/${urlId}/recent`)
            .then((response) => {
              if (updateTestReportCallback) {
                updateTestReportCallback(response.data);
              }
            })
            .catch((error) => {
              console.error('Error fetching most recent history:', error);
            });
        })
        .catch((error) => {
          console.error('Error posting word density data:', error);
        });
    })
    .catch((error) => {
      console.error('Error fetching HTML:', error);
    });
};