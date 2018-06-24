/**
 * Created by Tania on 23/06/2018.
 */

$(document).ready(function(){
    $(".loader").hide(); //< TODO revisar porque evita el spinner del inicio.  (carga de todos los eventos)

    $(".seeDetails").click(function (){
        window.location = "event_details.html";
    });

    $("#butJoin").click(function (){
        window.location = "event_progress.html";
    });

    $("#butEvidencias").click(function (){
        window.location = "event_evidence.html";
    });

    $(".profile").click(function (){
        window.location = "profile.html";
    });


});

function cargar_detalles(data){

}

function cargar_info_personal(){
    console.log("profile");
    $.post(
        " https://tqfmpfc0p8.execute-api.us-east-1.amazonaws.com/prod/uyh",
        function( data ) {
            //alert( "Data Loaded: " + data );
            console.log(data);
            $('#name').html(data.profile.name);
            $("#score").html(data.profile.score);

            var colors = ["","#04B431", "#0080FF","#8A0886","#AEB404","#DF7401"];
            var participation_global = document.getElementById('participation');
            var color = 1;
            for(var i = 0; i < data.events.length; i++) {
                var participation = document.createElement("div");
                participation.className = "col";
                participation.className += "col-sm-2";
                //participation.className += "color" + color;
                participation.setAttribute('style', 'background-color: #005cbf');
                if (color = 5) {
                    var colorName = 'color: '+colors[color];
                    color = 1;
                } else {
                    colorName = 'color: '+colors[color];
                    color += 1;
                }
                var group = document.createElement("h3");
                group.appendChild(document.createTextNode("*"));
                group.setAttribute('style', colorName);
                participation.appendChild(group);

                var p = document.createElement("p");
                var text = document.createTextNode(data.events[i].name);
                p.appendChild(text);
                p.setAttribute('style', 'color: #ffffff');
                participation.appendChild(p);
                participation_global.appendChild(participation);

            }
        }
    );
}

function cargar_eventos(){
    console.log("Cargar eventos");
    var event1 = {
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
                {code: 1, description: 'Actividad 2'},
                {code: 45, description: 'Actividad 3'},
                {code: 78, description: 'Actividad 4'}
            ]
        },
        channel: {
            astronomy: {
                sunrise: "5:43 am",
                sunset: "8:21 pm"
            },
            item: {
                condition: {
                    text: "Windy",
                    date: "Thu, 21 Jul 2016 09:00 PM EDT",
                    temp: 56,
                    code: 24
                },
                forecast: [
                    {code: 44, high: 86, low: 70},
                    {code: 44, high: 94, low: 73},
                    {code: 4, high: 95, low: 78},
                    {code: 24, high: 75, low: 89},
                    {code: 24, high: 89, low: 77},
                    {code: 44, high: 92, low: 79},
                    {code: 44, high: 89, low: 77}
                ]
            },
            atmosphere: {
                humidity: 56
            },
            wind: {
                speed: 25,
                direction: 195
            }
        }
    };
    var event2 = {
        key: '2459115',
        label: 'Nombre de la causa2',
        created: '2016-07-22T01:00:00Z',
        characteristics: {
            description: 'descripción del evento blah blah blah2',
            organizations:[
                'organización 1',
                'organización 2',
                'organización 3',
                'organización 4'
            ],
            participants: '169',
            activities: [
                {code: 44, description: 'Actividad 1'},
                {code: 1, description: 'Actividad 2'},
                {code: 45, description: 'Actividad 3'},
                {code: 78, description: 'Actividad 4'}
            ]
        },
        channel: {
            astronomy: {
                sunrise: "5:43 am",
                sunset: "8:21 pm"
            },
            item: {
                condition: {
                    text: "Windy",
                    date: "Thu, 21 Jul 2016 09:00 PM EDT",
                    temp: 56,
                    code: 24
                },
                forecast: [
                    {code: 44, high: 86, low: 70},
                    {code: 44, high: 94, low: 73},
                    {code: 4, high: 95, low: 78},
                    {code: 24, high: 75, low: 89},
                    {code: 24, high: 89, low: 77},
                    {code: 44, high: 92, low: 79},
                    {code: 44, high: 89, low: 77}
                ]
            },
            atmosphere: {
                humidity: 56
            },
            wind: {
                speed: 25,
                direction: 195
            }
        }
    };
    var event_list = {
        "0": event1,
        "2": event2
    };

    var main = document.querySelector('main');
    for(var i = 0; i< event_list.length; i++){
        var card = document.createElement("div");
        card.className = "card weather-forecast";
        var event = document.createElement("div");
        card.className = "event";
        var title = document.createTextNode(event_list[i].title);      // Create a text node
        event.appendChild(title);
        card.appendChild(event);
        document.getElementById('main').appendChild(card);

    }
    var spinner = document.querySelector('.loader');
    $(".loader").hide();
    //container.removeAttribute('hidden');
}
