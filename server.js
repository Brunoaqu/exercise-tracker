const express = require('express');
const router = express.Router();
const app = express();
const cors = require('cors');
const User = require('./models/User.Model');
const Exercise = require('./models/Exercise.Model');

require('dotenv').config();
require('./config/DB.Config')();


app.use(cors());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.get('/', (req, res) => { res.sendFile(__dirname + '/views/index.html') });


app.use('/api', router);
router.post('/users', async(req, res, next) => {
    try {
        const user = new User(req.body);
        const result = await user.save();
        res.json(result);
    } catch (error) {
        next(error);
    }
});
router.post('/users/:_id/exercises', async(req, res, next) => {
    try {
        if (isNaN(new Date(req.body.date))) {
            req.body.date = new Date();
        }

        const exercise = new Exercise(Object.assign({ _user_id: req.params._id }, req.body));
        const user = await User.findById(req.params._id, '-_id');
        const result = await exercise.save();

        res.json({
            username: user.username,
            description: result.description,
            duration: result.duration,
            date: (result.date).toDateString(),
            _id: req.params._id
        });
    } catch (error) {
        next(error);
    }
});
router.get('/users', async(req, res, next) => {
    try {
        const user = await User.find();
        res.json(user);
    } catch (error) {
        next(error);
    }
});
router.get('/users/:_id/logs', async(req, res, next) => {
    try {
        if (isNaN(new Date(req.query.from))) {
            req.query.from = 0;
        }
        if (isNaN(new Date(req.query.to))) {
            req.query.to = 2147472000000;
        }

        const user = await User.findById(req.params._id, '-_id');
        const exercise = await Exercise.find({ _user_id: req.params._id }, '-_id').sort('date').where('date').gte(new Date(req.query.from)).lte(new Date(req.query.to)).limit(req.query.limit);
        const exerciseCount = Object.keys(exercise).length;
        res.json({
            username: user.username,
            count: exerciseCount,
            _id: req.params._id,
            log: exercise.map(x => ({
                description: x.description,
                duration: x.duration,
                date: (x.date).toDateString()
            }))
        });
    } catch (error) {
        next(error);
    }
});


const listener = app.listen(process.env.PORT || 5000, () => {
    console.log('Your app is listening on port http://localhost:' + listener.address().port);
});