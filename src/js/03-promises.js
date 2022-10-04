import { Notify } from 'notiflix/build/notiflix-notify-aio';
const NOTIFY_TIMEOUT = 5000;

const promisesFormRef = document.querySelector('.form');

promisesFormRef.addEventListener('submit', onPromisesFormSubmit);

function createPromise(delay, position) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve(`Fulfilled promice ${position + 1} in ${delay} ms`);
      } else {
        // Reject
        reject(`Rejected promice ${position + 1} in ${delay} ms`);
      }
    }, delay);
  })
    .then(value =>
      Notify.success(value, {
        timeout: NOTIFY_TIMEOUT,
      })
    )
    .catch(error =>
      Notify.failure(error, {
        timeout: NOTIFY_TIMEOUT,
      })
    );
}

function createPromisesArray({ delay, step, amount }) {
  const delaysArray = Array.from(
    { length: amount },
    (_, i) => delay + i * step
  );
  const promises = delaysArray.map(createPromise);
}

function onPromisesFormSubmit(evt) {
  evt.preventDefault();
  const formData = new FormData(evt.currentTarget);
  const formDataObj = {};
  formData.forEach((value, key) => {
    formDataObj[key] = Number(value);
  });
  createPromisesArray(formDataObj);
}
