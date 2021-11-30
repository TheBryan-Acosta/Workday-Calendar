/*----------------------------------------------------------------------*/
// create variables for the current hour and day
// set the text in the element that has the id of currentDay to the current day
/*----------------------------------------------------------------------*/
var currentDay = moment().format('dddd, MMMM Do');
var currentHour = parseInt(moment().format('HH'));
var userDescriptions = Array(9).fill('');

$("#currentDay").text(currentDay);

/*----------------------------------------------------------------------*/
// parse stringified localStorage to usable data
// if returns falsy just fill it with '' 
// then iterate through all descriptions and fill text with their
// matching index from local storage
/*----------------------------------------------------------------------*/
loadDescriptions();
function loadDescriptions(){
  userDescriptions = JSON.parse(localStorage.getItem("userDescriptions"));
  
  if(!userDescriptions){
      userDescriptions = Array(9).fill('');
  }
  
  $(".description").each(function(index){
    $(this).find('p').text(userDescriptions[index]);
  });
}
/*----------------------------------------------------------------------*/
// set colors to correspond what is due, past due, and upcoming.
// while im iterating through all the time blocks im going to give them an Id of their index
// am and pm dont exist mathimatically use so use military time
// to compare real time vs the set intervals I started the index at 9 iterating up
/*----------------------------------------------------------------------*/
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

        $(this).attr('id', index);
    });
}
/*----------------------------------------------------------------------*/
// set a Interval function to run every minute
// update colors once and then every minute
// update the current day each minute
/*----------------------------------------------------------------------*/
updateColors();
setInterval(function () {
    currentDay = moment().format('dddd, MMMM Do');
    $("#currentDay").text(currentDay);
    currentHour = parseInt(moment().format('HH'));
    updateColors();
}, (1000 * 60));
/*----------------------------------------------------------------------*/
// editing tasks.
// select the existing text, create a text input form with said text, replace.
// traverse to the parent of the parent to the p tag to get the current timeBlock
// find the lock icon in the timeblock, then switch the class to unlocked
/*----------------------------------------------------------------------*/
$(".description").on("click", "p", function() {
    var text = $(this).text().trim();
    var timeblock = $(this).parent().parent();

    var icon = $(timeblock).find('.bi', 'bi-lock');
    $(icon).attr('class', 'bi bi-unlock');

    var textInput = $("<textarea>").addClass("form-control").val(text);
    $(this).replaceWith(textInput);

});
/*----------------------------------------------------------------------*/
// grab the existing text, create a p tag with said text, replace.
// on save button click, traverse the icon through the parent and change class to locked
// get the id and text of description
// override the description at the index of the localStorage array. set and stringify
/*----------------------------------------------------------------------*/
$(".time-block").on("click", ".saveBtn", function(){
    var timeblock = $(this).parent();
    var descriptionText = $(timeblock).find(".form-control").val();
    var taskP = $("<p>").text(descriptionText);
    var Descpid = $(timeblock).find(".description").attr('id');
    var icon = $(timeblock).find('.bi', 'bi-unlock');

    $(icon).attr('class', 'bi bi-lock');
  // replace textarea with new content
    $(timeblock).find(".form-control").replaceWith(taskP);

    userDescriptions[Descpid] = descriptionText;
    localStorage.setItem("userDescriptions", JSON.stringify(userDescriptions));
});
/*----------------------------------------------------------------------*/
