const SerpApi = require('google-search-results-nodejs');
const search = new SerpApi.GoogleSearch('Your Private Key');
search.json(
    {
        q: 'Coffee',
        location: 'Austin, TX',
    },
    (result) => {
        console.log(result);
    }
);
