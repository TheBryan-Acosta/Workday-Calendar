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

//enable editing tasks
$(".description").on("click", "p", function() {
  // get current text of p element
  var text = $(this).text().trim();

  // replace p element with a new textarea
  var textInput = $("<textarea>").addClass("form-control").val(text);
  $(this).replaceWith(textInput);

});

$(".time-block").on("click", ".saveBtn", function(){
    var timeblock = $(this).parent();
    var description = $(timeblock).find(".form-control").val();

    
    var taskP = $("<p>")
    .text(description);

  // replace textarea with new content
  $(timeblock).find(".form-control").replaceWith(taskP);
    
});
