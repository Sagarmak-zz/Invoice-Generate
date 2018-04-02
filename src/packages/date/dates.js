export default {
  //functions

  calculate() {
    let d = new Date();
    let localTime = d.getTime();
    let localOffset = d.getTimezoneOffset() * 60000;
    let utc = localTime + localOffset;
    let offset = 5.5;
    let bombay = utc + (3600000*offset);
    let currentTimeIndia = new Date(bombay);
    let currentFullYear = currentTimeIndia.getFullYear(); //2018
    let currentShortYear = currentFullYear.toString().substr(2,2); // 18
    let currentMonth = currentTimeIndia.getMonth()+1;  //0-11 months so (plus 1)

    return {
      currentFullYear: currentFullYear,
      currentShortYear: currentShortYear,
      currentMonth: currentMonth
    }
  },

  getCurrentYear() {
    let dateCalculations = this.calculate();
    return dateCalculations;
  },

  calculateCurrentFiscalYear() {
    let dateCalculations = this.calculate();
    let currentFiscalYear;
    //
    if(dateCalculations.currentMonth <= 3) {
      let previousYear = dateCalculations.currentFullYear - 1;
      currentFiscalYear = previousYear + "-" + dateCalculations.currentShortYear;
    }
    else {
      let nextYear = +dateCalculations.currentShortYear + 1;
      currentFiscalYear = dateCalculations.currentFullYear + "-" + nextYear;
    }

    return currentFiscalYear;

  }
}
