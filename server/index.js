const express = require("express");
const next = require("next");
const mongoose = require("mongoose");
const routes = require("../routes");
const bodyParser = require('body-parser');
// Services
const authService = require('./services/auth');

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler(app);
const config = require('./config');

const Book = require('./models/book');

const secretData = [
    {
        title: 'Secret 1',
        description: 'Plans how to build'
    },
    {
        title: 'Secret 2',
        description: 'Secret password'
    }
];

mongoose.connect(config.DB_URI, {useNewUrlParser: true}).then(() => {
    console.log('Database Connected');
}).catch(err => console.error(err));

// async () => (await mongoose.connect(config.DB_URI, { useNewUrlParser: true }))();

app
  .prepare()
  .then(() => {
    const server = express();

      server.use(bodyParser.json());
      
      server.post('/api/v1/books', (req, res) => {
          const bookData = req.body;

          const book = new Book(bookData);

          book.save((err, createdBook) => {
              if (err) {
                  return res.status(422).send(err);
              }
              return res.json(createdBook);
          });
      });

    server.get('/api/v1/secret', authService.checkJWT ,(req, res) => {
        return res.json(secretData);
    });

    server.get('/api/v1/onlysiteowner', authService.checkJWT, authService.checkRole('siteOwner'), (req, res) => {
        return res.json(secretData);
    });

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.use(function (err, req, res, next) {
        if (err.name === 'UnauthorizedError') {
            res
              .status(401)
                .send({ title: "Unauthorized", detail: "Unauthorized Access" });
        }
    })

    server.use(handle).listen(3000, (err) => {
        if (err) throw err
        console.log("> Ready on http://localhost:3000");
    })
})
.catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
});
