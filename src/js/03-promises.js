import Notiflix from 'notiflix';

window.addEventListener('DOMContentLoaded', () => {
  function createPromise(position, delay) {
    return new Promise((resolve, reject) => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        setTimeout(() => {
          resolve({ position, delay });
        }, delay);
      } else {
        setTimeout(() => {
          reject({ position, delay });
        }, delay);
      }
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const firstDelay = parseInt(form.elements.delay.value);
    const step = parseInt(form.elements.step.value);
    const amount = parseInt(form.elements.amount.value);

    for (let i = 1; i <= amount; i++) {
      const delay = firstDelay + (i - 1) * step;
      createPromise(i, delay)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms`
          );
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${delay}ms`
          );
        });
    }
  }

  const form = document.querySelector('.form');
  form.addEventListener('submit', handleSubmit);
});
