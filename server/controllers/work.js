const Work = require('../models/work');

exports.createWork = (req, res) => {
    const workData = req.body;
    const userId = req.user && req.user.sub;
    const work = new Work(workData);
    work.userId = userId;
    console.log(workData, userId, work);
    work.save((err, createdWork) => {
        if (err) {
            return res.status(422).send(err);
        }
        return res.json(createdWork);
    });
};

exports.getWorkById = (req, res) => {
    const workId = req.params.id;

    Work.findById(workId)
    .select("-__v")
    .exec((err, foundWork) => {
        if (err) {
        return res.status(422).send(err);
        }
        return res.json(foundWork);
    });
};

// exports.getWorks = (req, res) => {
//     Work.find({})
//         .sort({ 'createdAt': 1 })
//         .exec((err, allWorks) => {
//             if (err) {
//                 return res.status(422).send(err);
//             }
//             return res.json(allWorks);
//         });
// }

// exports.updatePortfolio = (req, res) => {
//     const portfolioId = req.params.id;
//     const portfolioData = req.body;

//     Portfolio.findById(portfolioId, (err, foundPortfolio) => {
//         if (err) {
//             return res.status(422).send(err);
//         }
//         foundPortfolio.set(portfolioData);
//         foundPortfolio.save((err, savedPortfolio) => {
//             if (err) {
//                 return res.status(422).send(err);
//             }
//             return res.json(foundPortfolio);
//         });
//     })
// }

// exports.deletePortfolio = (req, res) => {
//     const portfolioId = req.params.id;

//     Portfolio.deleteOne({ _id: portfolioId }, (err, deletedPortfolio) => {
//         if (err) {
//             return res.status(422).send(err);
//         }
//         return res.json({ status: 'DELETED' });
//     })
// }