const router = require('express').Router();
const { Comment, User } = require('../../models');

router.get('/', (req, res) => {
    Comment.findAll()
      .then(dbCommentData => res.json(dbCommentData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res) => {

    // { "comment_text": "Reply", "to": 1 }

    if (req.session) {
        Comment.create({
            comment_text: req.body.comment_text,
            user_id: req.session.user_id,
            to: req.body.to
        })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    }
});

module.exports = router;