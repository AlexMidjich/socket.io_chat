$(function(){

let socket = io.connect();
let input = document.querySelector('#namesubmit');  //Stores the
var userName = "";                                  //Where the users username is stored
var questions = [                                   //Array of questions the bot can answer
                'hur lång är ölandsbron?',
                'vad heter sveriges huvudstad?',
                'vilket djur är skogens konung?',
                'hur många årstider finns det?',
                'vad heter nästa star wars film?',
                'hur mycket är klockan?',
                'vem är du?'
              ];
var question = questions[Math.floor(Math.random() * questions.length)];   //Generate a random question for the bot
var currentdate = new Date();
var tid = currentdate.getHours() + ':' + currentdate.getMinutes();
/*
socket.on('message', (message)=>{
  console.log(message);
});
socket.on('clientmessage', 'Hello from client');
*/
  //userName = prompt('Fyll i ett användarnamn');

  input.addEventListener('click', function(){                           //Event to store the username
    //console.log('Klickeventet fungerar');
    userName = document.getElementById('user').value;
    document.querySelector('#overlay').remove();
    document.querySelector('#messageinput').style.opacity = 1;
    document.querySelector('#messagesubmit').style.opacity = 1;
    this.remove();
    event.preventDefault();
    return false;
      });

  $('#chatform').submit(function(){                                   //Stores the value from the chat input form
    socket.emit('chat message', $('#messageinput').val());
    $('#messageinput').val('');
    return false;
  });
  socket.on('chat message', function(message){                        //Writes out the users input
    $('#messages').append($('<li>').text(userName + ': ' + message));

    if( message.toLowerCase() === 'hej'){                             // A series of if statments for the chatbot
      $('#messages').append($('<li>').text('Bot: ' + 'Hej ' + userName));
    } else if( message.toLowerCase() === 'vem är du?'){
      $('#messages').append($('<li>').text('Bot: ' + 'Jag är en förprogrammerad chatbot som endast kan svara på förutbestämda frågor'));
    } else if( message.toLowerCase() === 'vilket djur är skogens konung?'){
      $('#messages').append($('<li>').text('Bot: ' + 'Svar, älgen är det som är skogens konung'));
    } else if(message.toLowerCase() === 'hur mycket är klockan?') {
        $('#messages').append($('<li>').text('Bot: ' + 'Klockan är ' + tid));
    } else if(message.toLowerCase() === 'hur lång är ölandsbron?') {
        $('#messages').append($('<li>').text('Bot: ' + 'Ölandsbron är 6 072 meter lång och sträcker sig mellan Kalmar och Öland'));
    } else if(message.toLowerCase() === 'vad heter sveriges huvudstad?') {
        $('#messages').append($('<li>').text('Bot: ' + 'Svar: Sveriges huvudstad är Stockholm'));
    } else if(message.toLowerCase() === 'hur många årstider finns det?') {
        $('#messages').append($('<li>').text('Bot: ' + 'Det finns fyra årstider Sommar, höst, vinter och vår'));
    } else if(message.toLowerCase() === 'vad heter nästa star wars film?') {
        $('#messages').append($('<li>').text('Bot: ' + 'Nästa Star Wars film kommer heta "The Last Jedi"'));
    } else {
      $('#messages').append($('<li>').text('Bot: Jag förstår inte... testa att fråga något annat, t ex ' + '"' + question + '"' + ' Glöm inte att avsluta frågan med ett ?'));
      question = questions[Math.floor(Math.random() * questions.length)];
      }
  });
});
