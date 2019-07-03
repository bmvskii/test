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

    if (!chechTimeOnLimits(end_time.value, '9:00', '18: 00')) {
        setError(end_time, msg.TIME_LIMITS_ERROR);
        isValid = false;
    }

    if (!chechTimeOnLimits(start_time.value, '9:00', '18: 00')) {
        setError(start_time, msg.TIME_LIMITS_ERROR);
        isValid = false;
    }

    if (compareTime(start_time.value, end_time.value) === 1) {
        setError(start_time, msg.UNAPPROPRIATED_TIME);
        setError(end_time, msg.UNAPPROPRIATED_TIME);
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

    if (!label.classList.contains('label--onError')) {
        error.innerHTML = errorMsg;
        label.classList.add('label--onError');
    }
}

const chechTimeOnLimits = (date, minLimit, maxLimit) => {
    const passedDateHours = +date.split(':')[0];
    const passedDateMinutes = +date.split(':')[1];

    const minLimitHours = +minLimit.split(':')[0];
    const minLimitMinutes = +minLimit.split(':')[1];

    const maxLimitHours = +maxLimit.split(':')[0];
    const maxLimitMinutes = +maxLimit.split(':')[1];

    return (passedDateHours >= minLimitHours
        || (passedDateHours === minLimitHours && passedDateMinutes >= minLimitMinutes))
        && (passedDateHours < maxLimitHours
            || (passedDateHours === maxLimitHours && passedDateMinutes <= maxLimitMinutes));
}

const compareTime = (ft, st) => {
    const ftH = +ft.split(':')[0];
    const ftM = +ft.split(':')[1];
    const stH = +st.split(':')[0];
    const stM = +st.split(':')[1];

    if (ftH > stH || (ftH === stH && ftM > stM)) {
        return 1;
    } else if (ftH === stH && stM === ftM) {
        return 0;
    } else {
        return -1;
    }
}