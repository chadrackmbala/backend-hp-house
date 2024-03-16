const router = require("express").Router();
const initialData = require("../assets/initial-data.json");

// GET ALL TWEETS

router.get("/", (req, res) => {
    const tweets = initialData.tweets.reverse()
    res.send(tweets);
});

// GET TWEET BY HANDLE USER

router.get("/:handle/tweets", (req, res) => {
    const handle = req.params.handle;
    const tweets = initialData.tweets
    const users = initialData.users
    const foundUser = users.find(user => user.handle === handle);
    const authorId = foundUser.id;
    const foundTweet = tweets.find(tweet => tweet.author === authorId);

    if (foundTweet) {
        res.status(200).json(foundTweet)
    } else {
        res.status(404).send("Tweets Not Found");
    }
});

// GET TWEET BY HANDLE USER WHERE MEDIA EXIST

router.get("/:handle/media", (req, res) => {
    const handle = req.params.handle;
    const tweets = initialData.tweets
    const users = initialData.users
    const foundUser = users.find(user => user.handle === handle);
    const authorId = foundUser.id;
    const foundTweet = tweets.find(tweet => tweet.author === authorId);
    console.log(foundTweet);

    if (foundTweet && foundTweet.media && foundTweet.media.length > 0) {
        res.status(200).json(foundTweet);
    } else {
        res.status(404).send("Media Not Found");
    }
});

// GET USER BY USERNAME

router.get("/:handle", (req, res) => {
    const handle = req.params.handle;
    const users = initialData.users;
    const foundUser = users.find(user => user.handle === handle);

    if (foundUser) {
        res.status(200).json(foundUser);
    } else {
        res.status(404).send("User Not Found");
    }
});


// POST TWEET

router.post("/tweets", (req, res) => {

    const tweets = initialData.tweets;
    console.log({ reqBody: req.body });
    const id = tweets.length + 1;
    const { author, media, retweetCount, favoriteCount, repliesCount, text, createdAt } = req.body;
    const newTweet = {
        id,
        author,
        media,
        retweetCount,
        favoriteCount,
        repliesCount,
        text,
        createdAt,
    }
    console.log(newTweet);
    tweets.push(newTweet)
    res.status(201).json({
        tweet: {
            id: id,
            author: author,
            media: media,
            retweetCount: retweetCount,
            favoriteCount: favoriteCount,
            repliesCount: repliesCount,
            text: text,
            createdAt: createdAt,
        },
        tweets: tweets
    })
    console.log(newTweet);
    // console.log({ reqBody: req.body });
    console.log("post reussi !");
});

module.exports = router;