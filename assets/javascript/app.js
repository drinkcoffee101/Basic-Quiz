



$(document).ready(function(){

    let rightAnswer = 0;
    let wrongAnswer = 0;
    let answers = ["charmander", "clefairy", "geodude", "jigglypuff","krabby","mankey","metapod", "mewtwo","pidgey","pikachu"];
    let guesses = [];


    $("#enter").click(function () { 

            guesses.push($("input[name='name']:checked").val());
            guesses.push($("input[name='name2']:checked").val());
            guesses.push($("input[name='name3']:checked").val());
            guesses.push($("input[name='name4']:checked").val());
            guesses.push($("input[name='name5']:checked").val());
            guesses.push($("input[name='name6']:checked").val());
            guesses.push($("input[name='name7']:checked").val());
            guesses.push($("input[name='name8']:checked").val());
            guesses.push($("input[name='name9']:checked").val());
            guesses.push($("input[name='name10']:checked").val());

            guesses.forEach(e => {
                if (answers.indexOf(e) != -1){
                    rightAnswer++;
                }
                else{
                    wrongAnswer++;
                }
                
            });

            console.log(rightAnswer);

            


        });

});