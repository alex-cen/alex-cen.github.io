/* 
© STEM Club 2020/2021
AY Jackson Secondary School
Code by: Alex Cen
*/

/* INITIATIONS */
activate = true; /* Play button */
uncaught = true; /* GOOSE!! */
honk = new Audio('honk.mp3');
honk.volume = 1.0;
seconds = 0;
goose_moves = 0;
goose_ego = 100;
player_health  = 100;
movePlay();

/* TIMER */
function clock() {
    if (seconds == 69){
        document.getElementById("clock").innerHTML = "69. nice.";
    }
    document.getElementById("clock").innerHTML = "You've taken "+ seconds +" seconds";
    seconds = seconds+1;
    setTimeout(clock,1000);
}

/* WELCOME STAGE */

/* Activates on "Play" button click, moves user to next lvl */
function initiate(){
    activate = false;
    clock();
    $(document).ready(function(){

        /* Hide existing things*/
        $("#play").remove();
        $("#welcome").hide(600);
        $("#welcome").remove();

        /* Call the goose chase stage */
        $('#goose_chase').show(600);
        $('#goose').show();
        goose();
    });
}

/* Moves play button */
function movePlay(){
    if (activate) {
        $(document).ready(function(){
            var num_left = Math.random()*80 +'%';
            var num_top = Math.random()*80 + '%';
            $('#play').animate({left: num_left});
            $('#play').animate({top: num_top});
            setTimeout(movePlay,300); /* Calls the next move */
        });
    }
}

/* GOOSE CHASE */

/*Moves goose around*/
function goose(){
    if (uncaught){
        $(document).ready(function(){
            var pos_left = Math.random()*80 + '%';
            var pos_top = Math.random()*80 + '%';
            honk.play();
            $('#goose').animate({left: pos_left},300);
            $('#goose').animate({top: pos_top},300);
        });
        goose_moves = goose_moves + 1;
        setTimeout(goose,500 + 50*goose_moves); 
        /* Gradually gets easier to catch goose. After 10 moves, the goose stays for 5 seconds.*/
    }
}

/* Runs if goose is caught, moves user to next lvl*/
function caughtGoose (){
    uncaught = false;
    $("#goose").remove();
    $("#goose_chase").remove();
    $("#intro_dialog").show(600); 
    introText(); 
}

/* INTRO DIALOG */
function introText(){
    document.getElementById("dialog").innerHTML = "<div style ='text-align:left'> Goose: A foolish attempt on my life. No one touches a gOOSE.";
    
    setTimeout(
        function()
        {
            document.getElementById("dialog").insertAdjacentHTML( 'beforeend', "<p style ='text-align:left'>I will make you pay for this. Answer my riddles, or you will face DEATH.</p>" ); 
        },1000);

    setTimeout(
        function()
        {
            document.getElementById("dialog").insertAdjacentHTML( 'beforeend', "<p  style ='text-align:left'>You mess with the honk, you get the <b>BONK</b>.</p></div>" ); 
        },2000);

    setTimeout(
        function()
        {
            $('#continue').show(600);
        },4000);
}

/* QUEST INITIATION */
function startQuest(){
    $('#intro_dialog').remove();
    $('#lvl1').show(600);
    $('#health_bars').show(600);
}

/* Health Balance*/
function dec_GooseEgo(){
    goose_ego = goose_ego - 10;
    $('#goose_ego').animate({width: goose_ego+ '%'});
}

function wrongAns(){
    $('#error').show(600);
    player_health = player_health - 20;
    $('#player_health').animate({width: player_health + '%'});
    if(player_health == 0){
        gameOver();
    }
}

function gameOver(){
    $('#game_over').show(600);
    $('#game_content').remove();
}

/* QUESTION 2 LOGIC */
function lvl2Check(){
    var count = 0;
    for (i=1; i <= 4; i++){
        if (document.getElementById('o'+i).checked){
            count = count +1;
        }
    }

    if (count == 4) {
        advanceLevel(2);
    } else {
        wrongAns();
    }
}

/* QUESTION 9 LOGIC */
function lvl9Check(){

    if (document.getElementById('o'+1).checked && document.getElementById('o'+3).checked && !(document.getElementById('o'+2).checked && document.getElementById('o'+4).checked)){
        advanceLevel(9);
    } else{
        wrongAns();
    }
}


/* Multiple Choice Logic for every question except q2 and 9, which are select-all*/

function advanceLevel(curr_lvl){
    $('#success').show(300);
    $('#error').hide(); 
    dec_GooseEgo();
    setTimeout(
        function(){
            $('#lvl'+curr_lvl).hide(300);
            $('#lvl'+curr_lvl).remove();
            $('#lvl'+(curr_lvl+1)).show(600);
        }, 3000)
}

$(document).ready(function(){
    $('input[type=radio]').change(function(){

        /* QUESTION 1*/
        if (this.name=='q1' && this.id=='o4') {advanceLevel(1);}

        /* QUESTION 3 */
        else if (this.name =='q3' && this.id=='o2'){advanceLevel(3);}

        /* QUESTION 4 */
        else if (this.name=='q4' && this.id=='o1'){advanceLevel(4);}

        /* QUESTION 5 */
        else if (this.name=='q5' && this.id=='o4') {advanceLevel(5);}

        /* QUESTION 6 */
        else if (this.name=='q6' && this.id=='o1') {advanceLevel(6);}
        
        /* QUESTION 7 */
        else if (this.name=='q7' && this.id=='o2') {advanceLevel(7);}

        /* QUESTION 8 */
        else if (this.name=='q8' && this.id=='o2') {advanceLevel(8);}

        /* QUESTION 10 */
        else if (this.name=='q10' && this.id=='o1') {
            advanceLevel(10);
            $('#health_bars').remove(); 
            sadGooseDialog();
        }

        /* Error message; corresponds to each question as we remove the last question's div*/
        else {
            wrongAns();
        }

    });
});


/* Sad Goose Revival */
function sadGooseDialog(){
    document.getElementById("sad_goose_dialog").innerHTML = "<p>Goose: i - i just wanted to play.</p>";
    
    setTimeout(
        function()
        {
            document.getElementById("sad_goose_dialog").insertAdjacentHTML( 'beforeend', "<p>why must you hurt me like this. my ego...</p>" ); 
        },4000);

    setTimeout(
        function()
        {
            document.getElementById("sad_goose_dialog").insertAdjacentHTML( 'beforeend', "<p>*sobs*</p>" ); 
        },5000);

    setTimeout(
        function()
        {
            $('#pet_goose').show(600);
        },6000);
}