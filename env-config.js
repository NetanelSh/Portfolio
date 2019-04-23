const prod = process.env.NODE_ENV === 'production';

module.exports = {
    'process.env.BASE_URL': prod ? 'https://netanelsheinbin.herokuapp.com/' : 'http://localhost:3000',
    'process.env.NAMESPACE': 'https://netanelsheinbin.herokuapp.com/',
    'process.env.CLIENT_ID': 'khOcfpG6b7atU1yCa5x0gzJWK7FvHcUr'
}