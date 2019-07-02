import msg from './msg'

export const resetInputStateAndData = (event) => {
    const { currentTarget: elem } = event;

    const input = elem.querySelector('input');
    const error = elem.querySelector('.error');

    error.innerHTML = '';
    input.innerHTML = '';

    elem.classList.remove('label--onError');
}

export const validate = (form) => {
    const {
        date,
        end_time,
        start_time,
        title
    } = form;

    let isValid = true;

    if (!title.value) {
        setError(title, msg.TITLE_ERROR);
        isValid = false;
    }

    if (!end_time.value) {
        setError(end_time, msg.END_TIME_ERROR);
        isValid = false;
    }

    if (!start_time.value) {
        setError(start_time, msg.START_TIME_ERROR);
        isValid = false;
    }

    if (!date.value && new Date() < new Date(date.value)) {
        setError(date, msg.DATE_ERROR);
        isValid = false;
    }

    return isValid;
}

const setError = (elem, errorMsg) => {
    const label = elem.closest('.label');
    const error = label.querySelector('.error');

    error.innerHTML = errorMsg;
    label.classList.add('label--onError');
}