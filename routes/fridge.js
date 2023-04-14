let express = require('express');
let router = express.Router();
const fs = require('fs');

const foodDataFile = './data/foodData.json';


router.get('/', (req, res) => {
    fs.readFile(foodDataFile, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('There was a problem reading the file')
            return
        }
        res.json(JSON.parse(data));
        // res.send('your on the fridge')
    })
})

// POST a new FOOD
router.post('/', (req, res) => {
    fs.readFile(foodDataFile, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('There was a problem reading the file.');
            return;
        }

        const newFOODArray = JSON.parse(data); // converts json to javascript here (to use javascript methods)

        //create a new food with the data from the request
        const newFOODItem = {
            food_Name: req.body.food_Name,
            weight: req.body.weight,
            price: req.body.price,
            quantity: req.body.quantity,
            expiration_date: req.body.expiration_date

        };
        newFOODArray.push(newFOODItem);
        //replace the contents of foodDataFile json with the new array
        fs.writeFile(foodDataFile, JSON.stringify(newFOODArray), err => {
            if (err) {
                console.error(err);
                res.status(500).send('There was a problem writing to this file')
            }
            res.json(newFOODItem) // converts javascript to json here (to return to file)
        })
    })
});


// PATCH an Existing FOOD

router.patch('/:food_Name', function (req, res, next) {
    fs.readFile(foodDataFile, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('There was a problem reading the file')
            return
        }
        res.json(JSON.parse(data));
    })
})

// Remove an Existing FOOD

fs.readFile(foodDataFile, 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        res.status(500).send('There was a problem reading the file.');
        return;
    }
})
module.exports = router;
