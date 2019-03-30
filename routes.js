const routes = require('next-routes');

module.exports = routes()
    .add('portfolioNew', '/portfolios/new')
    .add('portfolio', '/portfolio/:id')
    .add('portfolioEdit', '/portfolios/:id/edit')
    .add('userWorks', '/works/dashboard')
    .add('worksEditor', '/works/new')
    .add('worksDetail', '/works/:slug')
    .add('worksEditorUpdate', '/works/:id/edit')