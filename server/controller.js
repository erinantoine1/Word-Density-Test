const axios = require('axios');
const cheerio = require('cheerio');
const connection = require('../database/index.js');

const insertWebpageData = (req, res) => {
  const { webpage_url, notes } = req.body;
  const query = 'INSERT INTO webpages (webpage_url, notes) VALUES (?, ?)';
  const values = [webpage_url, notes];
  connection.query(query, values, (error, result) => {
    if (error) {
      console.error('Error inserting URL:', error);
      return res.status(500).json({ error: 'Error inserting URL' });
    }
    const insertedId = result.insertId;
    console.log('URL inserted successfully');
    res.status(200).json({ message: 'URL inserted successfully', insertedId });
  });
};

const readWebpageData = (req, res) => {
  const query = `SELECT * FROM webpages ORDER BY date_added DESC;`;
  connection.query(query, (error, result) => {
    if (error) {
      console.error('Error retrieving test data:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      if (result.length === 0) {
        res.status(404).json({ message: 'No data found' });
      } else {
        console.log('All test data retrieved successfully:', result);
        res.status(200).json(result);
      }
    }
  });
};

const getHtmlContent = async (req, res) => {
  const url = req.query.url;
  try {
    const response = await axios.get(url);
    const htmlContent = response.data;
    const $ = cheerio.load(htmlContent);
    const textContent = $('body').text();

    res.send(textContent);
  } catch (error) {
    console.error('Error fetching HTML:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const insertTestData = (req, res) => {
  const { url_id, word_density_list } = req.body;
  const query = 'INSERT INTO tests (url_id, word_density_list) VALUES (?, ?)';
  const values = [url_id, word_density_list];
  connection.query(query, values, (error, result) => {
    if (error) {
      console.error('Error inserting data into tests table:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      console.log('Data inserted into tests table:', result);
      res.status(201).json({ message: 'Data inserted successfully' });
    }
  });
};

const readFullTestData = (req, res) => {
  const urlId = req.params.url_id;
  const query = `SELECT * FROM tests WHERE url_id = ? ORDER BY date_of_test DESC`;
  connection.query(query, [urlId], (error, result) => {
    if (error) {
      console.error('Error retrieving full test data:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      if (result.length === 0) {
        res.status(404).json({ message: 'No data found' });
      } else {
        console.log('Full test data retrieved successfully:', result);
        res.status(200).json(result);
      }
    }
  });
};

const readMostRecentTestData = (req, res) => {
  const urlId = req.params.url_id;
  const query = `SELECT * FROM tests WHERE url_id = ? ORDER BY date_of_test DESC LIMIT 1`;
  connection.query(query, [urlId], (error, result) => {
    if (error) {
      console.error('Error retrieving most recent test data:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      if (result.length === 0) {
        res.status(404).json({ message: 'No data found' });
      } else {
        console.log('Most recent test data retrieved successfully:', result);
        res.status(200).json(result);
      }
    }
  });
};

const readUrlFromId = (req, res) => {
  const urlId = req.params.url_id;
  const query = `SELECT webpage_url FROM webpages WHERE id = ?`;
  connection.query(query, [urlId], (error, result) => {
    if (error) {
      console.error('Error retrieving most recent test data:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      if (result.length === 0) {
        res.status(404).json({ message: 'No data found' });
      } else {
        console.log('url retrieved successfully:', result);
        res.status(200).json(result);
      }
    }
  });
}

module.exports = { insertWebpageData, getHtmlContent, insertTestData, readWebpageData, readFullTestData, readMostRecentTestData, readUrlFromId };
