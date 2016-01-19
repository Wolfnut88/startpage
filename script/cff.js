function initCFF() {
  cffT = $('.terminal-term.cff #cff').terminal({
    "travel": {
      "connections" :function(fromLocation, toLocation, date, time) {

        var term = this;

        if(date==undefined) date = cffDate();
        if(time==undefined) time = cffTime();

        $.get("http://transport.opendata.ch/v1/connections?from="+fromLocation+"&to="+toLocation+"&date="+date+"&time="+time,
        function(data) {
          createCFFdata(data);
        });
      }
    },
    "main": function() {
          showTab("main");
          mainT.focus(true);
      },
    "sc": function() {
          if($(".terminal#sc").length == 0) {
              addTab("sc", "SC");
              initSoundcloud();
          }
          showTab("sc");
          scT.focus(true);
      },
    "cff": function() {
          if($(".terminal#cff").length == 0) {
              addTab("cff", "CFF");
              initCFF();
          }
          showTab("cff");
          cffT.focus(true);
      }
  }, {
          greetings: 'Welcome to CFF ' + username,
          name: 'cff',
          height: 0,
          prompt: 'CFF > '
      });
}
function createCFFdata(data) {
  var element = "";
  element += ''+
  '<div class="informations cff">'+
    '<div class="travels">'+
      '<p class="title">CFF informations</p>';

      // $(data.connections).each(function(index, object) {
        element += ''+
        '<div class="travel">'+
            '<div class="sections">';

          $(data.connections[0].sections).each(function(index, section) {
            if(section.journey.category == "") section.journey.category = "&nbsp;";
            if(section.departure.platform == "") section.departure.platform = "&nbsp;";
            if(section.arrival.platform == "") section.arrival.platform = "&nbsp;";
            element+= ''+
            '<div class="section">'+
              '<p class="title">Section '+index+'</p>'+
                '<div class="time">'+
                  '<div class="departure-time">'+
                    '<p>'+convertDate(section.departure.departure)+'</p>'+
                  '</div>'+
                  '<div class="arrival-time">'+
                    '<p>'+convertDate(section.arrival.arrival)+'</p>'+
                  '</div>'+
                  '</div>'+
                  '<div class="journey">'+
                    // '<div class="duration-journey">'+
                    //   '<p>'+section.duration+'</p>'+
                    // '</div>'+
                  '<div class="train-journey">'+
                      '<p>'+section.journey.category+'</p>'+
                  '</div>'+
                  '</div>'+
                  '<div class="platform">'+
                    '<p>'+section.departure.platform+'</p>'+
                    '<p>'+section.arrival.platform+'</p>'+
                  '</div>'+
                  '<div class="location">'+
                    '<p>'+section.departure.location.name+'</p>'+
                    '<p>'+section.arrival.location.name+'</p>'+
                  '</div>'+
            '</div>'
          })

        element += ''+
          '</div>'+
        '</div>';
      // });

  element+= ''+
      '</div>'+
    '</div>'+
  '</div>';

  $("#informations-board").prepend(element);
}
function convertDate(date) {
  var ddate = new Date(date);
  var h = ddate.getHours();
  var m = ddate.getMinutes();

  if(h<10)
    h='0'+h;
  if(m<10)
    m='0'+m;

  return h+":"+m;
}
function cffDate() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();

  if(dd<10)
      dd='0'+dd
  if(mm<10)
      mm='0'+mm

  return yyyy+"-"+mm+"-"+dd;
}
function cffTime() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();

  if(m<10)
    m='0'+m

  return h+":"+m;
}
