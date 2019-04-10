const Work = require('../models/work');


exports.getWorks = (req, res) => {

    Work.find({})
        .sort({ 'startDate': 1 })
        .exec((err, allWorks) => {
            if (err) {
                return res.status(422).send(err);
            }
            return res.json(allWorks);
        });
}

exports.getWorkById = (req, res) => {
    const workId = req.params.id;

    Work.findById(workId)
        .select('-__v')
        .exec((err, foundWork) => {
            if (err) {
                return res.status(422).send(err);
            }
            return res.json(foundWork);
        });
}

exports.saveWork = (req, res) => {
    const workData = req.body;
    const userId = req.user && req.user.sub;
    const work = new Work(workData);
    work.userId = userId;
    work.save((err, createdWork) => {
        if (err) {
            return res.status(422).send(err);
        }
        return res.json(createdWork);
    });
}

exports.updateWork = (req, res) => {
    const workId = req.params.id;
    const workData = req.body;

    Work.findById(workId, (err, foundWork) => {
        if (err) {
            return res.status(422).send(err);
        }
        foundWork.set(workData);
        foundWork.save((err, savedWork) => {
            if (err) {
                return res.status(422).send(err);
            }
            return res.json(foundWork);
        });
    })
}

exports.deleteWork = (req, res) => {
    const workId = req.params.id;

    Work.deleteOne({ _id: workId }, (err, deletedWork) => {
        if (err) {
            return res.status(422).send(err);
        }
        return res.json({ status: 'DELETED' });
    })
}