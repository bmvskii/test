import { createControlButtons } from "../helpers";

export class EventView {
    constructor() {
        this.date = null;
        this.ref = null;
        this.events = [];
        this.isActive = false;
    }

    create(date) {
        const container = document.createElement('div');
        container.className = 'event-container';

        const containerTitle = document.createElement('h2');
        containerTitle.className = 'event-container__title';

        const wrapper = document.createElement('div');
        wrapper.className = 'event-container__wrapper';

        this.ref = container;
        this.date = new Date(date);

        containerTitle.innerHTML = this.getFormattedDate();

        container.appendChild(containerTitle);
        container.appendChild(wrapper);
    }

    dropToDOM() {
        const eventsContainer = document.querySelector('.events'),
            select = document.querySelector('.events__select');
            
        eventsContainer.appendChild(this.ref);
        eventsContainer.classList.remove('events--empty');

        const isAlreadyInList = Array
            .from(select.children)
            .some(option => option.value === this.getFormattedDate());

        if (!isAlreadyInList) {
            const option = document.createElement('option');
            const date = this.getFormattedDate();
            option.value = option.innerHTML = this.getFormattedDate();
            select.appendChild(option);
        }
    }

    getTime() {
        return this.date;
    }

    addEvent(eventDetails) {
        this.ref
            .querySelector('.event-container__wrapper')
            .appendChild(eventDetails.ref);

        this.events.push(eventDetails);
    }

    getState() {
        return this.isActive;
    }

    getFormattedDate() {
        return `${this.date.getDate()}.${this.date.getMonth() + 1}.${this.date.getFullYear()}`;
    }
}

export class EventDetails {
    constructor() {
        this.ref = null;
        this.title = null;
        this.end_time = null;
        this.start_time = null;
    }

    create(props) {
        const { title, end_time, start_time } = props;

        this.title = title;
        this.end_time = end_time;
        this.start_time = start_time;

        const event = document.createElement('div');
        const leftContainer = document.createElement('div');
        const rightContainer = document.createElement('div');

        const eventTitle = document.createElement('span');
        const endTime = document.createElement('span');
        const startTime = document.createElement('span');

        const buttonsBlock = createControlButtons();

        event.className = 'event';

        eventTitle.className = 'event__title';
        eventTitle.innerHTML = this.title;

        endTime.className = 'event__end-time';
        endTime.innerHTML = this.end_time;

        startTime.className = 'event__start-time';
        startTime.innerHTML = this.start_time;

        leftContainer.className = 'event__left-side';
        rightContainer.className = 'event__right-side';

        leftContainer.appendChild(eventTitle);

        rightContainer.appendChild(startTime);
        rightContainer.appendChild(endTime);
        rightContainer.appendChild(buttonsBlock);

        event.appendChild(leftContainer);
        event.appendChild(rightContainer);

        this.ref = event;
        return event;
    }
}
