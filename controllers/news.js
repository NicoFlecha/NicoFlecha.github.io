require('dotenv').config();
const axios = require('axios');

const baseUrl = 'https://newsapi.org';
const currentVersion = '/v2';
const everythingEndpoint = '/everything';

const News = axios.create({
    baseURL: `${baseUrl}${currentVersion}`,
    headers: {Authorization: process.env.NEWS_API_KEY}
});

News.getByTopic = (request, response) => {
    News.get(everythingEndpoint, {
        params: {
            q: request.params.topic,
            language: 'es',
            pageSize: '20'
        }
    })
    .then(res => {
        response.json(res.data);
    })
    .catch(err => {
        const error = {
            status: 'error',
            message: 'ocurrio un error inesperado'
        }
        response.json(error);
        console.log(err);
    });
}

module.exports = News;