$(document).ready(function(){
    $(document).on("click", "#fazer-pedido", function(){
        var whatsappMessage= "*Pedido via Site*"+"\r\n\r\n"+"Pedido.......";

        whatsappMessage = window.encodeURIComponent(whatsappMessage);
        window.open('https://api.whatsapp.com/send?phone=+5517988219946&text='+whatsappMessage, '_blank');
    });
})