const Nodegeocoder = require('node-geocoder');

const options = {
    provider: process.env.GEOCODER_PROVIDER,
    httpAdapter: 'https',
    apiKey: process.env.GEOCODER_PROVIDER_API_KEY,
    formatter: null
};

const geoCode = Nodegeocoder(options);

module.exports = geoCode;
