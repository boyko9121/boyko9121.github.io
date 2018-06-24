var moment = require('moment');


var year = function(inpYear, inpMonth, inpDate) {
  var now = new Date().getYear();
  var input = new Date(inpYear, inpMonth, inpDate).getYear();

  var final = now - input;

  if (+new Date(inpYear, inpMonth, inpDate).getMonth() > +new Date().getMonth()) {
    final -= 1;
    console.log(test);
  } else if (+new Date().getMonth() == +new Date(inpYear, inpMonth, inpDate).getMonth()) {
    if (+new Date(inpYear, inpMonth, inpDate).getDate() > +new Date().getDate()) {
      final -= 1;
    }
  }
  console.log(final);
}


year(1990, 5, 7);





// var mom = function(inpYear, inpMonth, inpDate) {
//   inpMonth += 1;
//   if (inpMonth.toString().length == 1) {
//     inpMonth = "0" + inpMonth;
//   }
//   if (inpDate.toString().length == 1) {
//     inpDate = "0" + inpDate;
//   }
//
//   console.log("" + inpYear.toString() + "" + inpMonth.toString() + "" + inpDate.toString());
//   console.log(moment(inpYear + "" + inpMonth + "" + inpDate, "YYYYMMDD").fromNow());
// }
//
// mom(1990, 7, 7);
