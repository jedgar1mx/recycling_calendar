(function(){
  var startCalendarServices = function startCalendarServices() {
    startCalendar();
  };
  var addresSearch = document.getElementById('address-search');
  console.log(addresSearch);
  if(addresSearch !== null){
    addresSearch.addEventListener('keydown', function (e) {
      console.log(e);
      startCalendarServices();
    });
  }
  document.getElementById('search-btn').addEventListener('click', startCalendarServices);
})(window);
