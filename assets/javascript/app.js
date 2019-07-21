



$(document).ready(function(){


/*=============================================
=            Variables            =
=============================================*/

    //track number of correct/incorrect answers
    let rightAnswer = 0;
    let wrongAnswer = 0;

    //array of the 10 possible answers 
    let answers = ["charmander", "clefairy", "geodude", "jigglypuff","krabby","mankey","metapod", "mewtwo","pidgey","pikachu"];
    
    //array of the img sources which will be used when creating the cards dynamically 
    let pokeImages = ["assets/images/charmander.jpg","assets/images/clefairy.jpg","assets/images/geodude.jpg","assets/images/jigglypuff.jpg","assets/images/krabby.jpg","assets/images/mankey.jpg","assets/images/metapod.jpg","assets/images/mewtwo.jpg","assets/images/pidgey.jpg","assets/images/pikachu.jpg"];

    //using this array to generate wrong answers 
    //removed the correct answers 
    let pokemon = ["Bulbasaur","Ivysaur","Venusaur","Charmeleon","Charizard","Squirtle","Wartortle","Blastoise","Caterpie","Butterfree","Weedle","Kakuna","Beedrill","Pidgeotto","Pidgeot","Rattata","Raticate","Spearow","Fearow","Ekans","Arbok","Raichu","Sandshrew","Sandslash","Nidoran","Nidorina","Nidoqueen","Nidoran","Nidorino","Nidoking","Clefable","Vulpix","Ninetales","Wigglytuff","Zubat","Golbat","Oddish","Gloom","Vileplume","Paras","Parasect","Venonat","Venomoth","Diglett","Dugtrio","Meowth","Persian","Psyduck","Golduck","Mankey","Primeape","Growlithe","Arcanine","Poliwag","Poliwhirl","Poliwrath","Abra","Kadabra","Alakazam","Machop","Machoke","Machamp","Bellsprout","Weepinbell","Victreebel","Tentacool","Tentacruel","Graveler","Golem","Ponyta","Rapidash","Slowpoke","Slowbro","Magnemite","Magneton","Farfetch'd","Doduo","Dodrio","Seel","Dewgong","Grimer","Muk","Shellder","Cloyster","Gastly","Haunter","Gengar","Onix","Drowzee","Hypno","Kingler","Voltorb","Electrode","Exeggcute","Exeggutor","Cubone","Marowak","Hitmonlee","Hitmonchan","Lickitung","Koffing","Weezing","Rhyhorn","Rhydon","Chansey","Tangela","Kangaskhan","Horsea","Seadra","Goldeen","Seaking","Staryu","Starmie","MrMime","Scyther","Jynx","Electabuzz","Magmar","Pinsir","Tauros","Magikarp","Gyarados","Lapras","Ditto","Eevee","Vaporeon","Jolteon","Flareon","Porygon","Omanyte","Omastar","Kabuto","Kabutops","Aerodactyl","Snorlax","Articuno","Zapdos","Moltres","Dratini","Dragonair","Dragonite","Mew"];

let pokemonUncapped = [];
//lowercasing the names
for (let i = 0; i < pokemon.length; i++){
    pokemonUncapped.push(pokemon[i].toLowerCase());
};

//using this to iterate throuh the pokeImages array
//will increment when user has submitted an answer 
//max 10
let questionNumber = 0;

//used to increment in order through the answers array when creating the values for the radio buttons
let answerNumber = 0;

//will be drwan from for the radio button values
let chooseFrom = [];


/*=============================================
=            Functions            =
=============================================*/

//pulled from => https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
//will shuffle the chooseFrom array so the answer isn't always 1st
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

//generate an array of 3 random wrong answers and the right one
function radioAnswers(){

        chooseFrom.push(answers[answerNumber]);
        //randomly choose 3 wrong guesses
        for (let i = 0; i < 3; i++) {
            let randomNumber = Math.floor(Math.random()*pokemonUncapped.length);
            chooseFrom.push(pokemonUncapped[randomNumber]);   
        }
        //shuffle the array
        shuffle(chooseFrom);
        //choose the next answer when called again 
        // answerNumber++;
  };

//this function creates a new card with a an image and set of new possible answers from the pokeImages and pokemonUncapped arrays
function createCard() {
    //clear the quiz area
    $("#quizArea").empty();
    //building the card from the outside in so div1, div2....div(x)
    let div1 = $('<div>');
    div1.addClass("card mx-auto");
    div1.css("width", "18rem");

    //get image of the pokemon based on the question number and set it to an image tag
    let image = $('<img>');;
    image.attr({src: pokeImages[questionNumber], alt: answers[answerNumber]});
    image.addClass("card-img-top");
    
    let div2 = $('<div>')
    div2.addClass("card-body");

    $("#quizArea").append(div1);
    $(div1).append(image);
    $(div1).append(div2);

    //create the radio divs fpr the 
    for (let i = 0; i < 4; i++) {
        let value = "pokeName"+(i+1);

        let radioDiv = $('<div>');
        radioDiv.addClass('custom-control custom-radio');
        $(div2).append(radioDiv);  

        let input = $('<input>');
        input.attr({type: "radio",id: value,name: "name",value: chooseFrom[i]});
        input.addClass('custom-control-input');

        let label = $('<label>');
        label.addClass("custom-control-label");
        label.attr("for", value);
        label.text(chooseFrom[i]);

        $(radioDiv).append(input);
        $(radioDiv).append(label);
    }   
        //increment values
        questionNumber++;
        answerNumber++;
        //generate a new set of answers
        chooseFrom = [];
        radioAnswers();   
}

//display number of correct answers
function endGameDisplay() {
    $('#quizArea').empty();

    //create new header tag 
    let correctScore = $('<h2>');
    correctScore.addClass("mx-auto");
    
    //update text of the header tag
    correctScore.text("You had " + rightAnswer + " correct answers!!!");

    $('#quizArea').append(correctScore);

    //change the text of the button to say try again 
    $('button').text("Try Again");
}

/*=============================================
=            Game initialization            =
=============================================*/

//generate array of answers;
radioAnswers();
//generate the 1st card
createCard();


/*=============================================
=            Submit button functionality      =
=============================================*/
    
    $("#enter").click(function () { 
        
        if(questionNumber < 10){
            //store the user guess 
            let userGuess = $('input[name="name"]:checked').val();
            //check if the user guess is in the answers array
            if(answers.indexOf(userGuess) != -1){
                rightAnswer++;
            }
            else{
                wrongAnswer++;
            }
            createCard();
            console.log(questionNumber);
        }
        else if(questionNumber === 10){
            //clear the display
            //dislay number of correct
            endGameDisplay();
            questionNumber++;
        }
        else{
            questionNumber = 0;
            answerNumber = 0;
            radioAnswers();
            createCard();

            $('button').text("Next Question");
        }
    });
});