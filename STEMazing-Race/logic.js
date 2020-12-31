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

/* TIMER */
function clock() {
    document.getElementById("clock").innerHTML = "You've taken "+ seconds +" seconds";
    seconds = seconds+1;
    setTimeout(clock,1000);
    console.log(seconds);
}

/* WELCOME STAGE */
timer = 300;
setInterval(
    function(){
         if (activate) {
             movePlay();
        }    
    }
    ,timer);

function stage1(){
    activate = false;
    timer = 10000;
    console.log('Play clicked');
    clock();
    $(document).ready(function(){
        $("#play").remove();
        $("#welcome").hide(600);
        $("#lvl2").show(600);  
    });
}

function movePlay(){
    $(document).ready(function(){
        var num_left = Math.random()*80 +'%';
        var num_top = Math.random()*80 + '%';
        $('#play').animate({left: num_left});
        $('#play').animate({top: num_top});
    });
}

/* STAGE 2 */
$(document).ready(function(){
    $('input[type=radio][name=q1]').change(function(){
        if (this.id=='o4') {
            $('#success').show(300);
            $('#error').hide();
            setTimeout(
                function()
                {
                    $('#lvl2').hide(600);
                    $('#lvl3').show(600);
                    $('#goose').show();
                    setInterval(goose,300);
                },500);
        } else {
            $('#error').show(600);
        }
    });
});

/* STAGE 3 */
function goose(){
    if (uncaught){
        $(document).ready(function(){
            var pos_left = Math.random()*80 + '%';
            var pos_top = Math.random()*80 + '%';
            honk.play();
            $('#goose').animate({left: pos_left});
            $('#goose').animate({top: pos_top});
        });
    }
}

function caughtGoose (){
    uncaught = false;
    console.log('caught!');
    $("#goose").remove();
}