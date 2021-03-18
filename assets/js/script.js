// elements from DOM
var calContainer = $('.container');

// global variables 


//  arrays 

var timeBlockArr = JSON.parse(localStorage.getItem("hourBlock")) || [];

//localStorage.clear();

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
        hour: j,
        morning: true,
        meridian: "AM", 
        activityDescription: ""
    }

    // change morning to false if after 12
    if (i >= 12){

        timeObj.morning = false
        timeObj.meridian = "PM"
    }
    // append object to timeBlockArr
    timeBlockArr.push(timeObj);
}





timeBlockArr.forEach(function(item, index){
    
    var arrayObj = item

    var rowContainer = $('<div>');
    rowContainer.addClass('row');
    calContainer.append(rowContainer);

    var hourElm = $('<div>');
    hourElm.addClass('hour col-sm');

    hourElm.text(arrayObj.hour + arrayObj.meridian);

    var textElm = $('<textarea>');
    textElm.addClass('col-8 past');
    textElm.attr("data-index", index);
    

    var saveBtn = $('<button>');
    saveBtn.addClass('saveBtn col-sm far fa-save fa-3x');
    
    
    rowContainer.append(hourElm);
    rowContainer.append(textElm);
    rowContainer.append(saveBtn);

});

calContainer.on('click', ".saveBtn", saveEvent);


function saveEvent(){
    localStorage.clear();
    // select text box of row that button was clicked
    textAreaObj = $(this).siblings('textarea');
    // looks for the index of the selected option
    objIndex = textAreaObj.attr('data-index');
    
    var text = textAreaObj.val();

    timeBlockArr[objIndex].activityDescription = text;

    
    console.log(timeBlockArr[objIndex])
    // figure out how to update global state 

    // push to local storage

    //$(this).siblings.val();
   // console.log(textArea);
    
    localStorage.setItem("hourBlock", JSON.stringify(timeBlockArr));
    
   
    //console.log(timeBlockArr);
   //clear out array
   //rebuild it
    
};



// textArea = timeBlockArr.activityDescription; 







// localStorage.clear();
// var textArea = $('.past');
    





var calendarData = JSON.parse( localStorage.getItem("hourBlock"))


// create a separate function to update local storage 