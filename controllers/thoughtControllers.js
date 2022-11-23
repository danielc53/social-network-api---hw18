const { Thought, User } = require('../models');

module.exports = {
    getThought(req, res) {
        Thought.find()
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $addToSet: { thoughts: thought._id } },
                    { new: true }
                );
            })
            .then((user) =>
                !user
                    ? res
                        .status(404)
                        .json({ message: 'Thought created, but found no user with that ID' })
                    : res.json({ message: 'Created the thought successfully.' })
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    addReaction(req, res) {
        return Thought.findOneAndUpdate({ _id: req.params.thoughtId }, {
            $addToSet: {
                reactions: {
                    reactionType: req.body.reactionType,
                    userId: req.body.userId
                }
            }
        },
            { new: true }
        ).then((thought) => {
            res.send({ message: 'Reaction added successfully' })
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    }
};