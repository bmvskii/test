import { EventView } from "../eventView/eventView";

export const createControlButtons = () => {
    const controlsButtons = document.createElement('div');
    controlsButtons.className = 'controls';

    const deleteButton = document.createElement('button');
    const updateButton = document.createElement('button');

    deleteButton.className = 'control-btn control-btn--delete';
    updateButton.className = 'control-btn control-btn--update';

    deleteButton.innerHTML = '<i class="icon-cancel-outline"></i>';
    updateButton.innerHTML = '<i class="icon-edit"></i>';

    controlsButtons.appendChild(updateButton);
    controlsButtons.appendChild(deleteButton);

    return controlsButtons;
}

export const getCurrentEventView = (views, date) => {
    let eventView = null;
    views.forEach(view => {
        if (compareDates(view.getTime(), date)) {
            eventView = view;
        }
    })
    return eventView;
}

const compareDates = (fd, sd) => {
    return fd.getDate() === sd.getDate() &&
        fd.getMonth() === sd.getMonth() &&
        fd.getYear() === sd.getYear();
}

export const getActiveEventView = (views) => views.filter(view => view.isActive);

export const activateViewClass = (eventView) => {
    eventView.classList.add('event-container--active');
}

export const deactivateViewClass = (eventView) => {
    eventView.classList.remove('event-container--active');
}

export const removeDateFromSelect = (select, date) => {
    
}