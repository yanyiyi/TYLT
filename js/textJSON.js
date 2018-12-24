 $(document).ready(function () {
     $(function () {
         var aLatitude = [];
         var aLongtitude = [];
         var dataAmount = 0;
         console.log("w");
         $.getJSON('https://spreadsheets.google.com/feeds/list/1RMtRyWF_2L6pRJNztr7TIgNMikpJtV13dPCtLWdu38g/1/public/values?alt=json', function (dataLog) {
                 console.log("gJson");
                 dataAmount = dataLog.feed.entry.length;
                 console.log(dataAmount);
                 for (var i = 0; i < dataAmount; i++) {
                     aLatitude[i] = dataLog.feed.entry[i].gsx$lati.$t;
                     aLongtitude[i] = dataLog.feed.entry[i].gsx$longi.$t;
                     $('#ext').append("<br>" + aLatitude[i] + "," + aLongtitude[i]);
                 } //end for
             } //end function data
         ); //end get JSON
     }); //end function
 });
