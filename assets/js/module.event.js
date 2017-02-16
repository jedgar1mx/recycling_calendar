(function(){
  var events = [];
  var emergencyObjArr = [
    {
      'serviceType'     : 'recycling',
      'normalDay'       : "2017-02-26T00:00:00.000Z",
      "rescheduledDay"  : "2017-02-27T00:00:00.000Z",
      "reason"          : "Karl will be out of town.",
      'note'            : 'For complains, please contact Karl.'
    },
    {
      'serviceType'     : 'all',
      'normalDay'       : "2017-02-15T00:00:00.000Z",
      "rescheduledDay"  : "2017-02-16T00:00:00.000Z",
      "reason"          : "Karl has Valentine plans.",
      'note'            : 'Happy Valentines from Karl.'
    }
  ];
  var dummyObj = {
    "trash": {
      "dayOfWeek": "monday",
      "schedule": "weekly",
      "AorB": null,
      "startDate": null,
      "endDate": null
    },
    "recycling": {
      "dayOfWeek": "tuesday",
      "schedule": "biweekly",
      "AorB": "a",
      "startDate": null,
      "endDate": null
    },
    "bulk": {
      "dayOfWeek": "thursday",
      "schedule": "biweekly",
      "AorB": "a",
      "startDate": null,
      "endDate": null
    },
    "yardWaste": {
      "dayOfWeek": "thursday",
      "schedule": "biweekly",
      "AorB": "a",
      "startDate": "2017-04-06T00:00:00.000Z",
      "endDate": "2017-12-08T00:00:00.000Z"
    }
  };
  function getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(+d);
    d.setHours(0,0,0);
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setDate(d.getDate() + 4 - (d.getDay()||7));
    // Get first day of year
    var yearStart = new Date(d.getFullYear(),0,1);
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    // Return array of year and week number
    return [d.getFullYear(), weekNo];
  }

  function weeksInYear(year) {
    var month = 11, day = 31, week;

    // Find week that 31 Dec is in. If is first week, reduce date until
    // get previous week.
    do {
      d = new Date(year, month, day--);
      week = getWeekNumber(d)[1];
    } while (week == 1);

    return week;
  }
  var addEventToList = function addeEventToList(year,weaks,eventType,eventInfo) {
    // Add garbage pickup day every week
    for (var i = 1; i < weeks; i++) {
      let title = eventType + ' pick up';
      let eventObj = {
        title : title,
        start : ''
      };
      switch (eventType) {
        case 'Garbage':
            eventObj.rendering = 'background';
              eventObj.start = moment().year(year).week(i).day(dummyObj.trash.dayOfWeek).format("YYYY-MM-DD");
          break;

        case 'Recycle':
            eventObj.color = '#068A24';
              eventObj.start = moment().year(year).week(i).day(dummyObj.recycling.dayOfWeek).format("YYYY-MM-DD");
          break;

        case 'Yard waste':
            eventObj.color = '#DF5800';
              eventObj.start = moment().year(year).week(i).day(dummyObj.yardWaste.dayOfWeek).format("YYYY-MM-DD");
          break;

        case 'Bulk':
            eventObj.color = '#114BC7';
              eventObj.start = moment().year(year).week(i).day(dummyObj.bulk.dayOfWeek).format("YYYY-MM-DD");
          break;
        default:

      }
      console.log(eventObj);
      if(eventInfo.schedule === 'weekly'){
        events.push(eventObj);
      }else{
        if(eventInfo.startDate !== null){
          if(moment(eventObj.start).isBetween(eventInfo.startDate, eventInfo.endDate)){
            if(eventInfo.AorB === 'a'){
              ((i % 2) !== 0) ? events.push(eventObj): 0;
            }else{
              ((i % 2) === 0) ? events.push(eventObj): 0;
            }
          }
        }else{
          if(eventInfo.AorB === 'a'){
            ((i % 2) !== 0) ? events.push(eventObj): 0;
          }else{
            ((i % 2) === 0) ? events.push(eventObj): 0;
          }
        }
      }
    }
    console.log(events);
  };
  var year = moment().year();
  var weeks = weeksInYear(year) + 1;

  addEventToList(year,weeks,'Garbage',dummyObj.trash);
  addEventToList((year-1),weeks,'Garbage',dummyObj.trash);
  addEventToList((year+1),weeks,'Garbage',dummyObj.trash);
  addEventToList(year,weeks,'Recycle',dummyObj.recycling);
  addEventToList((year-1),weeks,'Recycle',dummyObj.recycling);
  addEventToList((year+1),weeks,'Recycle',dummyObj.recycling);
  addEventToList(year,weeks,'Bulk',dummyObj.bulk);
  addEventToList((year-1),weeks,'Bulk',dummyObj.bulk);
  addEventToList((year+1),weeks,'Bulk',dummyObj.bulk);
  addEventToList(year,weeks,'Yard waste',dummyObj.yardWaste);
  addEventToList((year-1),weeks,'Yard waste',dummyObj.yardWaste);
  addEventToList((year+1),weeks,'Yard waste',dummyObj.yardWaste);

  var today = moment().format();
  var loadEmergencyEventInfo = function loadEmergencyEventInfo(emergencyObjArr) {
    let tempHtml = '<h3>NOTICE</h3><article id="close-emergency-modal-btn"><img src="assets/img/error.png" alt="close"></img></article>';
    emergencyObjArr.forEach(function(item){
      tempHtml += '<p><strong>Normal Date:</strong> ' + moment(item.normalDay).format("dddd, MMMM Do YYYY") + '</p><p><strong>Reschedule Date:</strong> ' + moment(item.rescheduledDay).format("dddd, MMMM Do YYYY") + '</p><p>' + item.serviceType + ' services will be delay due to ' + item.reason + ' ' + item.note + '</p>';
    });
    document.querySelector('.emergency-container').innerHTML = tempHtml;
    document.getElementById('emergency-modal').className = 'active';
    document.getElementById('close-emergency-modal-btn').addEventListener('click', closeDisplayEmergencyEvent);
  };
  var displayEmergencyEvent = function displayEmergencyEvent(emergencyObjArr) {
    if(emergencyObjArr.length){
      loadEmergencyEventInfo(emergencyObjArr);
    }
  };
  var closeDisplayEmergencyEvent = function closeDisplayEmergencyEvent() {
    document.getElementById('emergency-modal').className = '';
  };
  $(document).ready(function() {
    function jsonCallback(json){
      console.log(json);
    }

    $.ajax({
      type: 'GET',
      url: "http://10.194.74.214/api/waste_schedule/changes/?format=json",
      dataType: "jsonp",
      success: function(response){
        console.log(response);
      }

    });
    var test = $.getScript("http://10.194.74.214/api/waste_schedule/changes/?format=json");
    console.log(test);
    displayEmergencyEvent(emergencyObjArr);
    $('#calendar').fullCalendar({
      header: {
        left: 'prev,next',
        center: 'title',
        right: 'month'
      },
      defaultDate: today,
      navLinks: false, // can click day/week names to navigate views
      // businessHours: true, // display business hours
      editable: true,
      events: events
    });

  });
})(window);
