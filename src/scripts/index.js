import { EventDetails, EventView } from './eventView/eventView';
import { getCurrentEventView, getActiveEventView, activateViewClass } from './helpers';
import { validate, resetInputStateAndData } from './validation'

require('normalize.css/normalize.css');
require('../styles/index.sass');

document.addEventListener("DOMContentLoaded", () => {
    let eventViews = [];
    const form = document.getElementById('creational_form'),
        title = document.querySelector('[for="title"]'),
        end_time = document.querySelector('[for="end_time"]'),
        start_time = document.querySelector('[for="start_time"]'),
        date = document.querySelector('[for="date"]'),
        select = document.querySelector('.events__select');

    form.addEventListener('click', event => {
        const { target: element, currentTarget: form } = event;

        if (element.classList.contains('button')) {
            event.preventDefault();

            // Execute form validation
            if (validate(form)) {

                //Destructuring an form values
                const {
                    date: { value: eventDate },
                    end_time: { value: eventEndTime },
                    start_time: { value: eventStartTime },
                    title: { value: eventTitle }
                } = form;


                // Create an event
                const eventDetails = new EventDetails();
                eventDetails.create({
                    title: eventTitle,
                    end_time: eventEndTime,
                    start_time: eventStartTime
                });

                // Check existing events containers
                // If there is an appropriated container, then put
                // new event to it, in other way
                // Create new one
                let eventView = getCurrentEventView(eventViews, new Date(eventDate));
                if (!eventView) {
                    eventView = new EventView();
                    eventView.create(eventDate);
                    eventViews.push(eventView);
                }

                //Set an event and add container to DOM
                eventView.addEvent(eventDetails);
                eventView.dropToDOM();

                //If it is the first container then makes it active
                if (eventViews.length === 1) {
                    eventView.isActive = true;
                    activateViewClass(eventView.ref);
                }

                end_time.focus();
                start_time.focus();
            }
        }
    });


    //Detect click by checking events on 'events' element
    document.querySelector('.events').addEventListener('click', (e) => {
        e.preventDefault();
        const element = e.target;

        if (element.closest('.control-btn--delete')) {
            const event = element.closest('.event');
            const eventView = element.closest('.event-container');
            const eventsWrapper = eventView.querySelector('.event-container__wrapper');
            const eventViewsWrapper = element.closest('.events');

            event.remove();

            if (!eventsWrapper.childElementCount) {

                // Get all inactive container
                eventViews = eventViews.filter(view => view.isActive === false);

                if (eventViews.length > 0) {
                    const activeElementTitle = eventView.querySelector('.event-container__title');
                    const lastElementIndex = eventViews.length - 1;

                    eventViews[lastElementIndex].isActive = true;
                    eventViews[lastElementIndex].ref.classList.add('event-container--active');

                    //Update values in select
                    Array
                        .from(select.children)
                        .forEach(option => {
                            if (option.value === activeElementTitle.innerHTML) {
                                option.remove();
                            }
                        });

                }

                // Finally remove the container
                eventView.remove();
            }

            // If there are no containers in the wrapper, toggle it to the empty state 
            if (!eventViewsWrapper.querySelector('.event-container')) {
                eventViewsWrapper.classList.add('events--empty');
            }
        }
    });

    //Set event listeners on focus state in inputs
    title.addEventListener('focus', resetInputStateAndData, true)
    end_time.addEventListener('focus', resetInputStateAndData, true)
    date.addEventListener('focus', resetInputStateAndData, true)
    start_time.addEventListener('focus', resetInputStateAndData, true)

    // Change events container
    // by making current container inactive and vice versa with selected one
    select.addEventListener('change', event => {
        const selectedDate = event.target.selectedOptions[0].value;

        const activeView = getActiveEventView(eventViews)[0];
        activeView.isActive = false;
        activeView.ref.classList.remove('event-container--active');

        const currentView = eventViews.filter(view => view.getFormattedDate() === selectedDate)[0];
        currentView.isActive = true;
        currentView.ref.classList.add('event-container--active');
    });
});
