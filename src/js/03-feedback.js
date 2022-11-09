import throttle from 'lodash.throttle';

const feedbackFormEl = document.querySelector('.feedback-form');
const userData = {};

const fillFeedbackFormFields = () => {
    let feedbackFormDataFromLS;
    try {
        feedbackFormDataFromLS = JSON.parse(localStorage.getItem('feedback-form-state'));

        if (feedbackFormDataFromLS === null) {
            return;
        }
    } catch (err) {
        console.log(err);
    }

    for (const prop in feedbackFormDataFromLS) {
        if (feedbackFormDataFromLS.hasOwnProperty(prop)) {
            feedbackFormEl.elements[prop].value = feedbackFormDataFromLS[prop];
        }
    }
}

fillFeedbackFormFields();

const onFormFieldInput = event => {
    const { target } = event;

    const inputName = target.name;
    const inputValue = target.value;

    userData[inputName] = inputValue;

    localStorage.setItem('feedback-form-state', JSON.stringify(userData));
}

const feedbackFormSubmit = event => {
    event.preventDefault();

    if (event.target.email.value === '' || event.target.message.value === '') {
        return alert('Всі поля повинні бути заповнені!');
    }

    localStorage.removeItem('feedback-form-state');
    feedbackFormEl.reset();

    console.log(userData);
}

feedbackFormEl.addEventListener('input', throttle(onFormFieldInput, 500));
feedbackFormEl.addEventListener('submit', feedbackFormSubmit);