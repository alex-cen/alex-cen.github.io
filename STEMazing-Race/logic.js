/* 
© STEM Club 2020
AY Jackson Secondary School
Code by: Alex Cen
*/

/* WELCOME STAGE */
activate = true;
timer = 300;
setInterval(check,timer);

function stage1(){
    activate = false;
    timer = 1000000;
    console.log('Play clicked');
    $(document).ready(function(){
        $("#welcome").hide(600);
        $("#lvl2").show(600);
    });
}

function check(){
    if (activate) {
        movePlay();    
    }
}

function movePlay(){
if (activate){
        $(document).ready(function(){
            var num_left = 200*Math.random()-100;
            var num_top = 200*Math.random()-100;
            $("#play").animate({left: '+='+num_left});
            $("#play").animate({top: '+='+num_top});
        });
    }
}

/* STAGE 2 */