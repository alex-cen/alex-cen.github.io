/* 
© STEM Club 2020/2021
AY Jackson Secondary School
Alex Cen ('21)
*/

/* INITIATIONS */
console.log("%cSTEM CLUB 2020/2021", "color: blue; font-size: x-large;font-family:'Comic Sans MS'");
console.log("%cPlease play this game fairly. No using inspect element :)", "color: blue; ");
console.log("%cOur official site is at https://sites.google.com/tdsb.on.ca/ayjstem", "color: blue; ");
activate = true; /* Play button */
uncaught = true; /* GOOSE!! */
seconds = 0;
goose_moves = 0;
goose_ego = 100;
player_health  = 100;
goose_pets = 0;
movePlay();
goose_dec = false;
timer_on =true;
already_dec = false;

/*****
Audio Pain 
*******/
const audioContext = new (window.AudioContext || window.webkitAudioContext);
var audioElement = document.querySelector('audio');
const track = audioContext.createMediaElementSource(audioElement);
var gainNode = audioContext.createGain();
track.connect(gainNode);
gainNode.connect(audioContext.destination);
gainNode.gain.setValueAtTime(0.1,0);

/* Create Goose Sound */
honk = new Audio('audio/honk.mp3');
honk.volume = 0.1;

/****end of audio stuff****/

/* TIMER */
function clock() {
    if (seconds == 69){
        document.getElementById("clock").innerHTML = "69. nice.";
    }
    document.getElementById("clock").innerHTML = "You've taken "+ seconds +" seconds";
    if (timer_on) {
        seconds = seconds+1;
        setTimeout(clock,1000);
    }
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
    document.getElementById("dialog").innerHTML = "<div style ='text-align:left'> Goose: <p> A foolish attempt on my life. No one touches a gOOSE.</p>";
    
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
        goose_ego = goose_ego - 20;
        $('#goose_ego').animate({width: goose_ego+ '%'});
}

function wrongAns(){
    $('#error').show(600);
    player_health = player_health - 40;
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

/* Multiple Choice Logic for every question except q2 which is select-all*/

function advanceLevel(curr_lvl){
    $('#success').show(300);
    $('#error').hide(); 
    if(!already_dec){
        dec_GooseEgo();
        already_dec = true;  
        setTimeout(
            function(){
                $('#lvl'+curr_lvl).remove();
                $('#lvl'+(curr_lvl+1)).show(600);
            }, 3000);
        setTimeout(
            function(){
                    already_dec = false;
            },3500);
    }
}

$(document).ready(function(){
    $('input[type=radio]').change(function(){

        /* QUESTION 1*/
        if (this.name=='q1' && this.id=='o4') {advanceLevel(1);}

        /* QUESTION 3 */
        else if (this.name =='q3' && this.id=='o2'){advanceLevel(3);}

        /* QUESTION 4 */
        else if (this.name=='q4' && this.id=='o3'){advanceLevel(4);}

        /* QUESTION 5 */
        else if (this.name=='q5' && this.id=='o2') {
            advanceLevel(5);
            $('#player_health').remove(); 
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
    goose_dec = true;
    document.getElementById("sad_goose_dialog").innerHTML = "Goose: <p>i - i just wanted to play.</p>";
    
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

function finalQuest(){
    $('#sad_dialog').hide();
    $('#pet_goose').remove()
    $('#pet_le_goose').show(300);
    goose_dec = true;
    casualDecrement();
}


function casualDecrement(){
    if (goose_dec){
        setTimeout(
            function()
            {
                if (goose_ego >= 5 && goose_ego <= 100){
                    goose_ego = goose_ego - 1;
                    $('#goose_ego').animate({width: goose_ego+ '%'},0.5);
                }
                casualDecrement();
            },500);
        }
}

function petGoose(){
    goose_pets = goose_pets + 1;
    honk.play();
    document.getElementById("petCount").innerHTML = ''+ goose_pets; 
    if (goose_ego >= 100){
        goose_dec = false;
        finishScreen();
    }
    goose_ego = goose_ego + 2;
    $('#goose_ego').animate({width: goose_ego+ '%'},0.5);
    $('#goose').animate({width: '+=1%'},0.5);
}

/* Finish Screen */

function finishScreen(){
    timer_on = false;
    $('#pet_le_goose').remove();
    document.getElementById('sad_goose_dialog').innerHTML = "Goose: <p>t- thank you. you're a badguy, but not a <i> bad guy </i>.</p> ";
    $('#sad_dialog').show();
    gainNode.gain.linearRampToValueAtTime(0.01, audioContext.currentTime + 3);
    setTimeout(
        function()
        {
            document.getElementById("sad_goose_dialog").insertAdjacentHTML( 'beforeend', "<p>i know what you came here for.</p>" ); 
        },3000);
    audioElement.pause();
    setTimeout(
        function()
        {
            document.getElementById("sad_goose_dialog").insertAdjacentHTML( 'beforeend', "<p>the secret word is: <b>AY</b></p>" ); 
            $('#go_to_credits').show(600);
        },5000);

}

function credits(){
    document.getElementById("time_took").innerHTML = "It only took you " + seconds +"s.";
    document.getElementById("secret_key").innerHTML = "The secret key is <b>AY</b>";
    $('#lvl6').hide(300);
    $('#credits').show(300);
}