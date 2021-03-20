// elements from DOM
var calContainer = $('.container');
var currentDayElm = $('#currentDay');
// global variables 
var today = moment();
var timeNow = moment().format('HH')
var meridianNow = moment().format('a')
//  arrays 

var timeBlockArr = JSON.parse(localStorage.getItem("hourBlock")) || [];



// console.log(timeNow);



currentDayElm.text("Today is: " + today.format('MMM Do, YYYY')+ " The time is: " + today.format('h:mm a'));

// checks the length of the array to see if data is currently being stored
if (timeBlockArr.length == 0){
// create object array for each hour
for ( i = 9; i < 18; i++){

    // looks at loop and converts the i variable from military time to standard
    if ( i >= 13 ){ 
    //sets i to j to store in object  
    var j =  i - 12

    // if i is less then 12 it stores normal state of i in to j to store in object  
    } else {
        j = i;
    }
    
    // object to push to array timeBlockArry
    var timeObj = 
    
    {
        milTime: i,
        hour: j,
        morning: true,
        meridian: "AM", 
        activityDescription: ''
    }

    // change morning to false if after 12
    if (i >= 12){

        timeObj.morning = false
        timeObj.meridian = "PM"
    }
    // append object to timeBlockArr
    timeBlockArr.push(timeObj);
}
}



timeBlockArr.forEach(function(item, index){
    
    var arrayObj = item

    var rowContainer = $('<div>');
    rowContainer.addClass('row hourCont');
    calContainer.append(rowContainer);

    var hourElm = $('<div>');
    hourElm.addClass('hour col-2');

    hourElm.text(arrayObj.hour + arrayObj.meridian);

    var textElm = $('<textarea>');
    textElm.addClass('col-8');
    textElm.attr("data-index", index);
    textElm.text(arrayObj.activityDescription);
    

    var saveBtn = $('<button><i class="far fa-save"></i>');
    saveBtn.addClass('saveBtn col-2');
    
    setHourClass(textElm, index);
    
    rowContainer.append(hourElm);
    rowContainer.append(textElm);
    rowContainer.append(saveBtn);

});


function setHourClass(textElm, index){

    if (timeBlockArr[index].milTime == timeNow){
        textElm.addClass('present');

    } else if (timeBlockArr[index].milTime < timeNow){
        textElm.addClass('past');
    } else {
    // if (timeBlockArr[indx].hour > timeNow ){
        textElm.addClass('future');
    }
    console.log(timeBlockArr[index])
}




calContainer.on('click', ".saveBtn", saveEvent);


function saveEvent(){
    // clears the local storage before pushing array - this prevents the array from appending itself 
    localStorage.clear();

    // select text box of row that button was clicked
    var textAreaObj = $(this).siblings('textarea');
    // looks for the index of the selected option
    var objIndex = textAreaObj.attr('data-index');
    // takes the text area input value and stores it into the variable text
    var text = textAreaObj.val();
    // looks at the source object array, takes the index from the object clicked and sets the activity description key value to the text input
    timeBlockArr[objIndex].activityDescription = text;
    // pushes object array into local storage in a JSON String
    localStorage.setItem("hourBlock", JSON.stringify(timeBlockArr));
    
};










// localStorage.clear();

