var eventModule = (function(){
  function setInitialProperties(garbageDay, recycleDay, eventList){
    this.garbageDay = garbageDay;
    this.recycleDay = recycleDay;
    this.recycleDayType = recycleDayType;
  }
  function createEventList(calendar){
    let year = moment().startOf('year');
    console.log(year);
  }
  var calendarEventList = {
    garbageDay      : '',
    recycleDay      : '',
    recycleDayType  : '',
    eventList       : '',
    startEventList : function (garbageDay, recycleDay, eventList) {
      setInitialProperties(garbageDay, recycleDay, eventList);
      createEventList(this);
    }
  };
  return calendarEventList;
}(window));
