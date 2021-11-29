var currentDay = moment().format('dddd, MMMM Do');
var currentHour = parseInt(moment().format('HH'));

$("#currentDay").text(currentDay);

//set colors to correspond what is due, past due, and upcoming
function updateColors(){
    $(".description").each(function(index) {
        var hour = index + 9;
        if(hour < currentHour){
            $(this).css("background-color", "#d3d3d3");
        }

        else if (hour == currentHour){
            $(this).css("background-color", "#ff6961");
        }

        else {
            $(this).css("background-color", "#77dd77");
        }
    });
}
// update colors once and then every minute + day
updateColors();
setInterval(function () {
    currentDay = moment().format('dddd, MMMM Do');
    $("#currentDay").text(currentDay);
    currentHour = parseInt(moment().format('HH'));
    updateColors();
}, (1000 * 60));