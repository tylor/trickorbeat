// Stop from scrolling and hide browser chrome.
document.ontouchmove = function(e){ e.preventDefault(); }
document.body.onload = setTimeout(function() { window.scrollTo(0, 1) }, 100);

var lifeForceTom;
var lifeForceCalypso;
var yourTurn = false;

attachSwipe();

/** Start the game **/
$('#go').click(function(){
  document.body.onload = setTimeout(function() { window.scrollTo(0, 1) }, 100);
  $('#title-card').hide();
  $('#go').hide();
  $('#lifeforce').show();
  init();
});

function end() {
  $('#title-card').html('Tom-Boy survives until another encounter.');
  $('#title-card').show();
  $('#go').show();
  $('#lifeforce').hide();
  yourTurn = false;
}

function init() {
  lifeForceTom = 100;
  lifeForceCalypso = 100;
  $('#tom .alive').css('width', lifeForceTom + '%');
  $('#calypso .alive').css('width', lifeForceCalypso + '%');
  $('#calypso-craig').css('-webkit-transform', 'scaleY(1)');
  $('#tom').addClass('active');
  $('#calypso').removeClass('active');
  yourTurn = true;
}

function attachSwipe() {
  $('#stage').swipeLeft(function(){
    if (yourTurn) {
      $('#tom-boy').css('-webkit-transform', 'scaleX(-1)');
      hurtCalypso();
    }
  });

  $('#stage').swipeRight(function(){
    if (yourTurn) {
      $('#tom-boy').css('-webkit-transform', 'scaleX(1)');
      hurtCalypso();
    }
  });

  $('#stage').swipeUp(function(){
    if (yourTurn) {
      $('#tom-boy').css('-webkit-transform', 'rotate(-90deg)');
      hurtCalypso();
    }
  });

  $('#stage').swipeDown(function(){
    if (yourTurn) {
      $('#tom-boy').css('-webkit-transform', 'rotate(90deg)');
      hurtCalypso();
    }
  });
}

function hurtCalypso() {
  $('#tom').removeClass('active');
  $('#calypso').addClass('active');
  lifeForceCalypso = lifeForceCalypso - 25;
  $('#calypso .alive').css('width', lifeForceCalypso + '%');
  if (lifeForceCalypso <= 0) {
    $('#calypso-craig').css('-webkit-transform', 'scaleY(-1)');
    end();
  }
  else {
    yourTurn = false;
    setTimeout(hurtTom, 2000);
  }
}

function hurtTom() {
  $('#tom').addClass('active');
  $('#calypso').removeClass('active');
  // Generate damage.
  lifeForceTom = lifeForceTom - 20;
  // $('#calypso-craig').css('-webkit-transform', 'rotate(90deg)');
  $('#tom .alive').css('width', lifeForceTom + '%');
  yourTurn = true;
}

function toggleTurn() {
  $('#tom').toggleClass('active');
  $('#calypso').toggleClass('active');
  yourTurn = !yourTurn;
}