const express = require('express');
const router = express.Router();
const { insertWebpageData, getHtmlContent, insertTestData, readWebpageData, readFullTestData, readMostRecentTestData, readUrlFromId} = require('./controller');

router.post('/webpages', insertWebpageData);
router.get('/webpages', readWebpageData);
router.get('/webpages/:url_id', readUrlFromId);
router.get('/get-html', getHtmlContent);
router.post('/tests', insertTestData);
router.get('/tests/:url_id', readFullTestData);
router.get('/tests/:url_id/recent', readMostRecentTestData);

module.exports = router;
