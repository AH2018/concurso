/**
 * Created by Tania on 23/06/2018.
 */

$(document).ready(function () {
  $(".loader").hide(); //< TODO revisar porque evita el spinner del inicio.  (carga de todos los eventos)

  $(".seeDetails").click(function () {
    window.location = "event_details.html";
  });

  $("#butJoin").click(function () {
    window.location = "event_progress.html";
  });

  $("#butEvidencias").click(function () {
    window.location = "event_evidence.html";
  });

  $(".profile").click(function () {
    window.location = "profile.html";
  });


});


function cargar_info_personal() {
  var settings = {
    url: "https://tqfmpfc0p8.execute-api.us-east-1.amazonaws.com/prod/uyh",
    type: "POST",
    dataType: "json",
    data: JSON.stringify({ method: "profile" }),
    success: function (data) {
      document.querySelector("span#name").innerHTML = data.profile.full_name;
      document.querySelector("span#score").innerHTML = data.profile.score;
    },
    error: function (data) {
      console.log(data);
    }
  };
  $.ajax(settings).done();
}

function cargar_eventos() {
  var settings = {
    url: "https://tqfmpfc0p8.execute-api.us-east-1.amazonaws.com/prod/uyh",
    type: "POST",
    dataType: "json",
    data: JSON.stringify({ method: "detail" }),
    success: function (data) {
      for (var i = 0; i < data.length; i++) {
        var main = $(".main").clone()
        main.find(".event-key").text(data[i].id);
        main.find(".event").text(data[i].title);
        main.removeClass('main');
        main.removeAttr('hidden');
        main.appendTo("#fill");
      }
      $(".seeDetails").on('click', function (event) {
        var event_id = $(event.target).parent().find('.event-key').text();
        window.location.href = "/pages/event_details.html?event_id=" + event_id;
      });
    },
    error: function (data) {
      console.log(data);
    }
  };
  $.ajax(settings).done();
  var spinner = document.querySelector('.loader');
  $(".loader").hide();
}
