const express = require('express')
const router = express.Router();
const { readFile } = require('fs').promises;
router.get("/", async (req, res) => {
    //get 4 words, with their pos and def and send back to the other page
    //send those back and render quiz.ejs
    let chosenWords = await getWords();

    res.render('quiz', { chosenWords: chosenWords })
});

router.post("/", async (req, res) => {
    let chosenWords = await getWords()

    console.log(req.body);

    // refresh new chosen words

    // render the quiz again
    res.render('quiz', { chosenWords: chosenWords })
    // Need to add the stuff here to render quiz
});


let getWords = async () => {


    //baed on that, pick 4 words that match
    let randomPart = getRandomPart();
    let allWords = await readFile('resources/allwords.txt', 'utf8');
    let wordArray = allWords.split('\n');
    shuffle(wordArray);

    let choices = []
    while (choices.length < 5) {
        // The issue is here because line is not returning anything
        let line = wordArray.pop();
        let tokens = line.split('\t');
        let part = tokens[1];
        let def = tokens[2];
        if (part === randomPart) {
            choices.push(line);
        }
    }
    return choices;
}
let getRandomPart = () => {
    let parts = ['noun', 'verb', 'adjective']
    //get a random number between 0-1, and multiply by the size. flooring it makes between 0-2, instead of 0-2.999
    let randomIndex = Math.floor(Math.random() * parts.length);
    let randomPart = parts[randomIndex];
    return randomPart;

}

let shuffle = (array) => {
    //fisher Yates algorithm
    for (let i = array.length; i > 0; i--) {
        let randomNumber = Math.floor(Math.random() * (i + 1));
        [array[i], array[randomNumber]] = [array[randomNumber], array[i]];
    }

}
module.exports = router;