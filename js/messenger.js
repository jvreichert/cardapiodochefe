$(document).ready(function(){
    let sabor = "";
    $(document).on("click", ".btnEscolhePizza", function(){
      sabor = $(this).closest(".card-pizza").find(".sabor-pizza").text();
      alert(sabor);
      $("#divSabores").slideUp();
      $("#divFinalizaPedido").slideDown();
    }).on("click", "#fazer-pedido", function(){
        $("#divFinalizaPedido").show();
        let nome = $("#nome_pedido").val();
        let telefone = $("#telefone_pedido").val();
        let endereco = $("#endereco_pedido").val();
        let pagamento = $('input[name="paymentMethod"]:checked').val();
        let troco = $("#troco_pedido").val();

        var whatsappMessage= "*Pedido via Site*"+"\r\n\r\n"
        +"Sabor: "+ sabor
        +"Cliente: "+ nome
        +"Telefone: "+ telefone
        +"Endereço de entrega: "+ endereco
        +"Pagamento: "+ pagamento
        +"Troco: "+ troco;

        whatsappMessage = window.encodeURIComponent(whatsappMessage);
        window.open('https://api.whatsapp.com/send?phone=+5517988219946&text='+whatsappMessage, '_blank');
    });
})