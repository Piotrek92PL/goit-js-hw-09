import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate <= new Date()) {
      window.alert('Please choose a date in the future');
      return;
    }

    startButton.disabled = false;
  },
};

const startButton = document.querySelector('[data-start]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

let countdownIntervalId = null;

function startCountdown() {
  const endDate = flatpickr.parseDate(datetimePicker.value);
  const now = new Date();
  const remainingTime = endDate - now;

  if (remainingTime <= 0) {
    stopCountdown();
    return;
  }

  updateCountdown(remainingTime);
  countdownIntervalId = setInterval(() => {
    const remainingTime = endDate - new Date();

    if (remainingTime <= 0) {
      stopCountdown();
      return;
    }

    updateCountdown(remainingTime);
  }, 1000);

  startButton.disabled = true;
}

function stopCountdown() {
  clearInterval(countdownIntervalId);
  countdownIntervalId = null;
  startButton.disabled = false;
}

function updateCountdown(remainingTime) {
  const { days, hours, minutes, seconds } = convertMs(remainingTime);

  daysValue.textContent = addLeadingZero(days);
  hoursValue.textContent = addLeadingZero(hours);
  minutesValue.textContent = addLeadingZero(minutes);
  secondsValue.textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

const datetimePicker = document.querySelector('#datetime-picker');
flatpickr(datetimePicker, options);

startButton.addEventListener('click', startCountdown);
