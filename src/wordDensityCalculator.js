const cheerio = require('cheerio');

const commonWords = ([
  'i', 'me', 'my', 'we', 'us', 'our', 'ours', 'you', 'your', 'yours',
  'he', 'him', 'his', 'she', 'her', 'hers', 'it', 'its', 'they', 'them', 'their', 'theirs',
  'what', 'which', 'who', 'whom', 'this', 'that', 'these', 'those', 'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
  'have', 'has', 'had', 'having', 'do', 'does', 'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if', 'or', 'because', 'as',
  'until', 'while', 'of', 'at', 'by', 'for', 'with', 'about', 'between', 'into', 'through', 'during', 'before', 'after',
  'above', 'below', 'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off', 'over', 'under', 'again', 'further', 'then', 'once',
  'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such',
  'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will', 'just', 'don', 'should', 'now',
  'id', 'footer', 'com', 'https', 'en', 'fieldtype', 'true', 'false', 'www', 'png', 'jpg', 'api', 'html', 'head', 'body', 'div', 'span',
  'p', 'a', 'img', 'br', 'hr', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'table', 'tr', 'th', 'td', 'form', 'input', 'button', 'select', 'option', 'textarea', 'label', 'iframe',
  'javascript', 'js', 'html', 'css', 'php', 'python', 'java', 'c', 'cplusplus', 'sql', 'ruby', 'perl', 'swift', 'go', 'typescript',
  'react', 'vue', 'angular', 'jquery', 'nodejs', 'express', 'rails', 'django', 'laravel',
  'function', 'variable', 'class', 'method', 'property', 'object', 'array', 'element', 'attribute', 'event', 'callback', 'query', 'selector',
  'stylesheet', 'syntax', 'error', 'debug', 'console', 'log', 'import', 'export',
  'html', 'css', 'js', 'php', 'py', 'java', 'cpp', 'sql', 'rb', 'perl', 'swift', 'go', 'ts',
  'web', 'website', 'webpage', 'url', 'http', 'https', 'www', 'domain', 'server', 'client', 'browser', 'ajax', 'api',
  'img', 'btn', 'src', 'alt', 'href', 'url', 'div', 'js', 'css', 'html', 'id', 'class',
  'nbsp', 'lt', 'gt', 'amp', 'quot', 'apos', 'modals', 'get', 'like', 'var', 'googletag', 'window', 'icon', 'cmd', 'return', 'env', 'require', 'interoprequiredefault', 'void', 'formatenvvars', 'length', 'default', 'arguments', 'typeof', 'feedback',
  'px', 'navigation', 'primary', 'zlogonav', 'sticky', 'nav', 'margin', 'width', 'zflyout', 'logo', 'border', 'height', 'top', 'font', 'color', 'container', 'script', 'solid'
]);

function calculateWordDensity(htmlContent) {
  const $ = cheerio.load(htmlContent);

  $('body *').contents().filter(function() {
    return this.type === 'text';
  }).each(function() {
    $(this).replaceWith(' ');
  });

  const textContent = $('body').text();
  const words = textContent.split(/<[^>]+>|[^a-zA-Z]+/g);
  const wordCount = {};

  words.forEach((word) => {
    word = word.trim().toLowerCase();

    if (!commonWords.includes(word) && word.length > 1) {
      wordCount[word] = (wordCount[word] || 0) + 1;
    }
  });

  const sortedWords = Object.keys(wordCount).sort((a, b) => {
    const densityA = (wordCount[a] / words.length) * 100;
    const densityB = (wordCount[b] / words.length) * 100;
    return densityB - densityA;
  });

  const top20Words = sortedWords.slice(0, 20);

  return top20Words;
}

module.exports = { calculateWordDensity };


