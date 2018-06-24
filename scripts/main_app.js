/**
 * Created by Tania on 23/06/2018.
 */

(function() {
    'use strict';
    var app = {
        isLoading: true,
        visibleCards: {},
        selectedCities: [],
        spinner: document.querySelector('.loader'),
        cardTemplate: document.querySelector('.cardTemplate'),
        container: document.querySelector('.main'),
        addDialog: document.querySelector('.dialog-container')//,
        //daysOfWeek: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    };


    /*****************************************************************************
     *
     * Methods to update/refresh the UI
     *
     ****************************************************************************/

        // Updates a weather card with the latest weather forecast. If the card
        // doesn't already exist, it's cloned from the template.
    app.updateEventCard = function(data) {
        var dataLastUpdated = new Date(data.created);

        // Datos a empplear en la tarjeta
        var event_description = data.characteristics.description;
        var organizations = data.characteristics.organizations;
        var participants = data.characteristics.participants;

        var card = app.visibleCards[data.key];
        if (!card) {
            card = app.cardTemplate.cloneNode(true);
            card.classList.remove('cardTemplate');
            card.querySelector('.event').textContent = data.label; //< Nombre del evento
            card.removeAttribute('hidden');
            app.container.appendChild(card);
            app.visibleCards[data.key] = card;
        }

        // Verifies the data provide is newer than what's already visible
        // on the card, if it's not bail, if it is, continue and update the
        // time saved in the card
        var cardLastUpdatedElem = card.querySelector('.card-last-updated');
        var cardLastUpdated = cardLastUpdatedElem.textContent;
        if (cardLastUpdated) {
            cardLastUpdated = new Date(cardLastUpdated);
            // Bail if the card has more recent data then the data
            if (dataLastUpdated.getTime() < cardLastUpdated.getTime()) {
                return;
            }
        }
        cardLastUpdatedElem.textContent = data.created;

        card.querySelector('.description').textContent = event_description;

        var activities = card.querySelectorAll('.future .oneday');
        var today = new Date();
        today = today.getDay();
        for (var i = 0; i < 3; i++) { //TODO obtener el número de actividades
            var activity = data.channel.item.activities[i];
            if (activity) {
                //TODO crear el div por cada actividad
                var divActivity = document.createElement("div");
                var textActivity = document.createTextNode(activity.description);
                divActivity.appendChild(textActivity);
                document.getElementsByClassName("activities").appendChild(divActivity);
            }
        }
        if (app.isLoading) {
            app.spinner.setAttribute('hidden', true);
            app.container.removeAttribute('hidden');
            app.isLoading = false;
        }
    };

    /*
    Evento inicial: Es el primer evento que se realizará
     */
    var initialEvent = {
        key: '2459115',
        label: 'Nombre de la causa',
        created: '2016-07-22T01:00:00Z',
        characteristics: {
            description: 'descripción del evento blah blah blah',
            organizations:[
                'organización 1',
                'organización 2',
                'organización 3',
                'organización 4'
            ],
            participants: '169',
            activities: [
                {code: 44, description: 'Actividad 1'},
                {code: 1, description: 'Actividad 1'},
                {code: 45, description: 'Actividad 1'},
                {code: 78, description: 'Actividad 1'}
            ]
        }
    };

    //-------- Inicialización
    app.updateEventCard(initialEvent);
})();
