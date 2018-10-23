// Botão hamburguer menu mobile
$('.mobile_btn').click(function(){
  $(this).toggleClass('active');
  $('.mobile_menu').toggleClass('active');
});



// Menu mobile - dropdown 
$(function() {
  var MenuMobile = function(el, multiple) {
    this.el = el || {};
    this.multiple = multiple || false;

    // Variables privadas
    var links = this.el.find('.link');
    // Evento
    links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown)
  }

  MenuMobile.prototype.dropdown = function(e) {
    var $el = e.data.el;
      $this = $(this),
      $next = $this.next();

    $next.slideToggle();
    $this.parent().toggleClass('open');

    if (!e.data.multiple) {
      $el.find('.submenu').not($next).slideUp().parent().removeClass('open');
    };
  } 

  var MenuMobile = new MenuMobile($('#mobile_menu'), false);
});







$(".rslider").responsiveSlides({
  auto: true,             // Boolean: Animate automatically, true or false
  speed: 500,            // Integer: Speed of the transition, in milliseconds
  timeout: 4000,          // Integer: Time between slide transitions, in milliseconds
  pager: true,           // Boolean: Show pager, true or false
});


// Formulario

$('.formphp').on('submit', function() {
  var emailContato = "prograd@prograd.ufrgs.br"; // <----- Escreva aqui o e-mail que vai receber as mensagens vindas do site

  var that = $(this),
      url = that.attr('action'),
      type = that.attr('method'),
      data = {};
  
  that.find('[name]').each(function(index, value) {
    var that = $(this),
        name = that.attr('name'),
        value = that.val();
        
    data[name] = value;
  });
  
  $.ajax({
    url: url,
    type: type,
    data: data,
    success: function(response) {
    
      if( $('[name="leaveblank"]').val().length != 0 ) {
        $('.formphp').html("<div id='form-erro'></div>");
        $('#form-erro').html("<span>Falha no envio!</span><p>Você pode tentar novamente, ou enviar direto para o e-mail " + emailContato + " </p>")
        .hide()
        .fadeIn(1500, function() {
        $('#form-erro');
        });
      } else {
      
        $('.formphp').html("<div id='form-send'></div>");
        $('#form-send').html("<span>Mensagem enviada!</span><p>Em breve eu entramos em contato com você. Abraços.</p>")
        .hide()
        .fadeIn(1500, function() {
        $('#form-send');
        });
      };
    },
    error: function(response) {
      $('.formphp').html("<div id='form-erro'></div>");
      $('#form-erro').html("<span>Falha no envio!</span><p>Você pode tentar novamente, ou enviar direto para o e-mail " + emailContato + " </p>")
      .hide()
      .fadeIn(1500, function() {
      $('#form-erro');  
    });
    }
  });
  
  return false;
});