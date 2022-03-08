const calendar = document.getElementById("calendar");
const addEvent = document.getElementById("addEvent");
const showEvent = document.getElementById("showEvent");
const eventContent = document.getElementById("eventContent");

let monthNavigation = 0;
let clicked = null;

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

/**************************** Get calendar ************************ */

const loadCalendar = () => {
  const currentDate = new Date();

  addEvent.style.display = "none";
  if (monthNavigation !== 0) {
    currentDate.setMonth(new Date().getMonth() + monthNavigation);
  }

  const day = currentDate.getDate();
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const dateString = firstDayOfMonth.toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const paddingDays = days.indexOf(dateString.split(", ")[0]);

  document.getElementById(
    "month"
  ).innerText = `${currentDate.toLocaleDateString("en-us", {
    month: "long",
  })} ${year}`;

  calendar.innerHTML = "";

  for (let i = 1; i <= paddingDays + daysInMonth; i++) {
    const daySquare = document.createElement("div");

    daySquare.classList.add("day");

    const dayString = `${month + 1}/${i - paddingDays}/${year}`;

    // Fill in the boxes ( daySquare )
    if (i > paddingDays) {
      daySquare.innerText = i - paddingDays;
      if (i - paddingDays === day && monthNavigation === 0) {
        daySquare.id = "currentDay";
      }
      daySquare.addEventListener("click", () => openAddForm(dayString));
    } else {
      daySquare.classList.add("padding");
    }

    calendar.appendChild(daySquare);
  }
};

/********************* Add event form functions ******************** */

const openAddForm = (date) => {
  clicked = date;
  addEvent.style.display = "block";
};

const closeAddForm = () => {
  addEvent.style.display = "none";
  eventContent.value = "";
  clicked = null;
};

/**********************  Add new Event function ************************ */

const saveEvent = () => {
  if (eventContent.value === "") {
    alert("Please fill out this field");
  } else {
    const eventDiv = document.createElement("div");
    const deleteEl = document.createElement("button");
    const eventEl = document.createElement("span");
    deleteEl.innerText = "Delete";
    deleteEl.setAttribute("class", "delete");
    eventDiv.setAttribute("class", "eventDiv");
    eventEl.innerText = `${eventContent.value} - -  ${clicked}`;
    eventDiv.appendChild(eventEl);
    eventDiv.appendChild(deleteEl);
    eventDiv.classList.add("event");
    showEvent.appendChild(eventDiv);
    deleteEl.addEventListener("click", removeEvent);

    closeAddForm();
  }
};

/********************** Delete Event function ********************** */

const removeEvent = () => {
  const deleteBtns = document.getElementsByClassName("delete");
  for (let btnDelete of deleteBtns) {
    btnDelete.parentElement.addEventListener("click", () => {
      btnDelete.parentElement.remove();
    });
  }
};

/**************************   ************************* */

const initButtons = () => {
  document.getElementById("nextBtn").addEventListener("click", () => {
    monthNavigation++;
    loadCalendar();
  });

  document.getElementById("backBtn").addEventListener("click", () => {
    monthNavigation--;
    loadCalendar();
  });

  document.getElementById("saveButton").addEventListener("click", saveEvent);
  document
    .getElementById("cancelButton")
    .addEventListener("click", closeAddForm);
};

initButtons();
loadCalendar();
