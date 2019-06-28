"use strict";

//////////////////////////////////

let dpContainer = document.querySelector(".dp-container");
let yearSelect = document.querySelector(".yearSelect");
let monthSelect = document.querySelector(".monthSelect");
let getDateBtn = document.querySelector(".dateBtn");
let closeBtn = document.querySelector(".close");
let datePick = dpContainer.querySelectorAll(".date");

let valueYear = "";
let valueMonth = "";
let valueDay = "";
let dayLock;
let lastMonth;
let lastDay;
let canPickDate = false;
let leapYear = false;

///////////////////////////////////////
//////////////////////////////////////

getDateBtn.addEventListener("click", () => {
  generateYears();
  generateMonths();
  dpContainer.style.display = "grid";
});

closeBtn.addEventListener("click", () => {
  removeYears();
  dpContainer.style.display = "none";

  if (valueYear === "" || valueMonth === "" || valueDay === "") {
    return;
  } else {
    getDateBtn.value = `${valueYear} / ${valueMonth} / ${valueDay}`;
  }
  removeDays(lastMonth);

  reset();
  // console.log("Final date: ", valueYear, valueMonth, valueDay);
});

dpContainer.addEventListener("click", () => {});

yearSelect.addEventListener("click", () => {
  leapYear = false;
  valueYear = yearSelect.value;
  checkLeapYear(valueYear);
});

monthSelect.addEventListener("change", event => {
  console.log(event.target.value);
  if (dayLock) {
    removeDays(lastMonth);
  }
  generateDays(event.target.value);
  // if (!dayLock) {
  //   generateDays();
  // } else {
  //   removeDays();
  // }
  valueMonth = monthSelect.value;
  canPickDate = true;
});

console.log(datePick);
for (let i = 0; i < datePick.length; i++) {
  datePick[i].addEventListener("click", event => {
    if (datePick[i].classList.contains("selection")) {
      datePick[i].classList.remove("selection");
      valueDay = "No day";
    } else {
      datePick[i].classList.add("selection");
      datePick[i].classList.add("select-date");

      setTimeout(() => {
        datePick[i].classList.remove("select-date");
      }, 1000);
      valueDay = datePick[i].textContent;
      lastDay = datePick[i];
    }

    for (let i = 0; i < datePick.length; i++) {
      if (datePick[i] != lastDay) {
        datePick[i].classList.remove("selection");
      }
    }
  });
  console.log(lastDay);
}

/////////////////////////////////
///// FUNCTIONS /////////////////
/////////////////////////////////
function reset() {
  valueYear = "";
  valueMonth = "";
  valueDay = "";
  dayLock;
  lastMonth;
  canPickDate = false;
  leapYear = false;
}
function generateYears() {
  let tempY = new Date();
  let year = tempY.getFullYear();
  for (let i = year; i > 1900; i--) {
    let opt = document.createElement("option");
    opt.classList.add("tempYear");
    opt.innerHTML = i;
    yearSelect.appendChild(opt);
  }
  yearSelect.selectedIndex = "0";
}

function removeYears() {
  let tempY = new Date();
  let year = tempY.getFullYear();
  for (let i = 1900; i < year; i++) {
    let opt = document.querySelectorAll(".tempYear");
    for (let i = 0; i < opt.length; i++) {
      // console.log(opt[i]);
      yearSelect.removeChild(opt[i]);
    }
  }
}

function checkLeapYear(selYear) {
  if ((!(selYear % 4) && selYear % 100) || !(selYear % 400)) {
    leapYear = true;
  }
}

function generateMonths() {
  let month = [
    "January",
    "February",
    "Mars",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  for (let i = 0; i < month.length; i++) {
    let opt = document.createElement("option");
    opt.value = i + 1;
    opt.innerHTML = month[i];
    opt.setAttribute("class", "monthClick");

    monthSelect.appendChild(opt);
  }
  monthSelect.selectedIndex = "0";
}

function generateDays(valueMonth) {
  let monthKey;

  if (valueMonth == 2) {
    if (leapYear) {
      monthKey = 29;
    } else {
      monthKey = 28;
    }
  } else {
    if (valueMonth <= 7) {
      if (valueMonth % 2) {
        monthKey = 31;
      } else {
        monthKey = 30;
      }
    } else {
      if (valueMonth % 2) {
        monthKey = 30;
      } else {
        monthKey = 31;
      }
    }
  }
  for (let i = 1; i <= monthKey; i++) {
    let div = document.createElement("div");
    div.textContent = i;
    div.setAttribute("class", "day" + i);
    div.classList.add("dateNum");
    let slot = document.querySelector(".place" + i);
    slot.setAttribute("value", i);
    slot.appendChild(div);
  }
  lastMonth = monthKey;
  dayLock = true;
  console.log(monthKey);
}

function removeDays(monthKey) {
  for (let i = 1; i <= monthKey; i++) {
    let div = document.querySelector(".day" + i);
    let slot = document.querySelector(".place" + i);
    slot.classList.remove("selection");
    slot.removeAttribute("value", i);
    slot.removeChild(div);
  }
  dayLock = false;
}

// 1 January - 31 days
// 2 February - 28 days in a common year and 29 days in leap years
// 3 March - 31 days
// 4 April - 30 days
// 5 May - 31 days
// 6 June - 30 days
// 7 July - 31 days
// 8 August - 31 days
// 9 September - 30 days
// 10 October - 31 days
// 11 November - 30 days
// 12 December - 31 days