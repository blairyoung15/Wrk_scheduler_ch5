
// current date in header 
$("#currentDay").text(moment().format('dddd MMMM Do YYYY'));

// array for tasks created
var tasks = [];


// save button clicked, saving value in task textarea to local storage 
$(".saveBtn").on("click", function () {
    // console.log(this)
    var taskText = $(this).siblings(".task").val();
    var taskTime = $(this).parent().attr("id");
    var dateOfTask = moment().format('dddd MMMM Do YYYY');

    tasks.push({task: taskText, time: taskTime, date: dateOfTask});

    localStorage.setItem("tasks", JSON.stringify(tasks));

});

function auditTime() {
    
    var currentTime = moment().hours();
  
    $(".row").each(function() {
    var time = parseInt($(this).attr("id").split("-")[1]);
  
    // apply new class if task is near/over due date
    if (moment().isAfter(time)) {
      $(this).addClass("past");
    } else if (Math.abs(moment().diff(time, "hours")) <= 1) {
      $(this).removeClass("past");  
      $(this).addClass("present");
    } else {
        $(this).removeClass("past");  
        $(this).removeClass("present");
        $(this).addClass("future");
    }

});
}

auditTime()

  setInterval(function() {
    $(".row .task").each(function() {
      auditTask($(this));
    });
  }, 1800000);
