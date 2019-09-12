const prod = process.env.NODE_ENV === 'production';

module.exports = {
    'process.env.BASE_URL': prod ? 'http://www.sheinbinn.me' : 'http://localhost:3000',
    'process.env.NAMESPACE': 'http://www.sheinbinn.me',
    'process.env.CLIENT_ID': 'khOcfpG6b7atU1yCa5x0gzJWK7FvHcUr'
}