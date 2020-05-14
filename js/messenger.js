$(document).ready(function () {
    let sabor = "";
    let carrinho = [];
    let meia1 = "";
    let meia2 = "";
    let inteira = "";
    let preco = 0;
    $(document).on("click", ".btnEscolheMeiaBroto", function () {
            if (meia1 == "") {
                meia1 = $(this).closest(".card-pizza").find(".sabor-pizza").text();
                bootbox.alert("Você adicionou " + meia1 + "(meia broto) ao carrinho");
                $(".btnEscolheInteiraBroto").slideUp();
                $(".div-grande").slideUp();
                preco += parseFloat($(this).attr("data-preco"));
            } else if (meia2 == "") {
                meia2 = $(this).closest(".card-pizza").find(".sabor-pizza").text();
                bootbox.alert("Você adicionou " + meia2 + "(meia broto) ao carrinho");
                preco += parseFloat($(this).attr("data-preco"));
                carrinho.push({
                    tipo: "Broto",
                    meia1: meia1,
                    meia2: meia2,
                    inteira: inteira,
                    preco: preco / 2
                })

                meia1 = "";
                meia2 = "";
                inteira = "";
                preco = 0;
                $(".btnEscolheInteiraBroto").slideDown();
                $(".div-grande").slideDown();
                console.log(carrinho);
            } else {
                alert("Ocorreu um erro, por favor escolha novamente.");
                location.reload();
            }
            // carrinho.push({});
        })
        .on("click", ".btnEscolheInteiraBroto", function () {
            inteira = $(this).closest(".card-pizza").find(".sabor-pizza").text();
            bootbox.alert("Você adicionou " + inteira + "(inteira broto) ao carrinho");
            preco += parseFloat($(this).attr("data-preco"));
            carrinho.push({
                tipo: "Broto",
                meia1: meia1,
                meia2: meia2,
                inteira: inteira,
                preco: preco
            })

            meia1 = "";
            meia2 = "";
            inteira = "";
            preco = 0;
            console.log(carrinho);
        })

        .on("click", ".btnEscolheMeiaGrande", function () {
            if (meia1 == "") {
                meia1 = $(this).closest(".card-pizza").find(".sabor-pizza").text();
                bootbox.alert("Você adicionou " + meia1 + "(meia grande) ao carrinho");
                $(".btnEscolheInteiraGrande").slideUp();
                $(".div-broto").slideUp();
                preco += parseFloat($(this).attr("data-preco"));
            } else if (meia2 == "") {
                meia2 = $(this).closest(".card-pizza").find(".sabor-pizza").text();
                bootbox.alert("Você adicionou " + meia2 + "(meia grande) ao carrinho");
                preco += parseFloat($(this).attr("data-preco"));
                carrinho.push({
                    tipo: "Grande",
                    meia1: meia1,
                    meia2: meia2,
                    inteira: inteira,
                    preco: preco / 2
                })

                meia1 = "";
                meia2 = "";
                inteira = "";
                preco = 0;
                $(".btnEscolheInteiraGrande").slideDown();
                $(".div-broto").slideDown();
                console.log(carrinho);
            } else {
                alert("Ocorreu um erro, por favor escolha novamente.");
                location.reload();
            }
        })
        .on("click", ".btnEscolheInteiraGrande", function () {
            inteira = $(this).closest(".card-pizza").find(".sabor-pizza").text();
            bootbox.alert("Você adicionou " + inteira + "(inteira grande) ao carrinho");
            preco += parseFloat($(this).attr("data-preco"));
            carrinho.push({
                tipo: "Grande",
                meia1: meia1,
                meia2: meia2,
                inteira: inteira,
                preco: preco
            })

            meia1 = "";
            meia2 = "";
            inteira = "";
            preco = 0;
            console.log(carrinho);
        })
        .on("click", ".btn-passo2", function () {
            $("#divSabores").slideUp();
            $("#divFinalizaPedido").slideDown();
            let total = 0;
            carrinho.forEach(function (element, index) {
                let nomeProduto = "";
                if (element.inteira == "") {
                    nomeProduto = element.meia1 + " e " + element.meia2
                } else {
                    nomeProduto = element.inteira
                }
                $("#ul-carrinho").append('<li class="list-group-item d-flex justify-content-between lh-condensed itens-carrinho">' +
                    '<div>' +
                    '<h6 class="my-0">' + nomeProduto + '</h6>' +
                    '<small class="text-muted">' + element.tipo + '</small>' +
                    '</div>' +
                    '<span class="text-muted">R$ ' + element.preco + '</span>' +
                    '</li>')
                total += element.preco;
            })

            $("#valor-total").html("R$ " + parseFloat(total))
        })
        .on("click", "#fazer-pedido", function () {
            $("#divFinalizaPedido").show();
            let nome = $("#nome_pedido").val();
            let telefone = $("#telefone_pedido").val();
            let endereco = $("#endereco_pedido").val();
            let pagamento = $('input[name="paymentMethod"]:checked').val();
            let troco = $("#troco_pedido").val();
            let bairro =  $("#bairro_pedido option:selected");
            carrinho.forEach(function (element, index) {
                if (element.inteira == "") {
                    sabor += element.meia1 + " e " + element.meia2 + "(" + element.tipo + ")" + "\n"
                } else {
                    sabor += element.inteira + "(" + element.tipo + ")" + "\n"
                }
            });

            var whatsappMessage = "*Pedido via Site*" + "\r\n\r\n" +
                "- Sabor(es): " + sabor + "\n" +
                "- Cliente: " + nome + "\n" +
                "- Telefone: " + telefone + "\n" +
                "- Endereço de entrega: " + endereco + "\n" +
                "- Bairro: " +  bairro.html() + "\n"
                "- Preço Entrega: R$" + bairro.val() + "\n"
                "- Pagamento: " + pagamento + "\n\n" +
                "- Total: " + $("#valor-total").html() + "\n" +
                "- Troco: " + troco;

            whatsappMessage = window.encodeURIComponent(whatsappMessage);
            window.open('https://api.whatsapp.com/send?phone=+5517991055329&text=' + whatsappMessage, '_blank');
        })
        .on("change", 'input[name="metodoEntrega"]', function () {
            if ($('input[name="metodoEntrega"]:checked').val() == "delivery") {
                $(".dados-delivery").slideDown()
                bootbox.alert("Selecione o bairro para saber o valor da entrega.")
            } else {
                $(".dados-delivery").slideUp()
            }
        })
        .on("change", "#bairro_pedido", function () {
            $(".frete-carrinho").remove();
            $(".itens-carrinho").remove();

            let total = 0;
            carrinho.forEach(function (element, index) {
                let nomeProduto = "";
                if (element.inteira == "") {
                    nomeProduto = element.meia1 + " e " + element.meia2
                } else {
                    nomeProduto = element.inteira
                }
                $("#ul-carrinho").append('<li class="list-group-item d-flex justify-content-between lh-condensed itens-carrinho">' +
                    '<div>' +
                    '<h6 class="my-0">' + nomeProduto + '</h6>' +
                    '<small class="text-muted">' + element.tipo + '</small>' +
                    '</div>' +
                    '<span class="text-muted">R$ ' + element.preco + '</span>' +
                    '</li>')
                total += element.preco;
            })

            $("#ul-carrinho").append('<li class="list-group-item d-flex justify-content-between lh-condensed frete-carrinho">' +
            '<div>' +
            '<h6 class="my-0">Entrega</h6>' +
            '</div>' +
            '<span class="text-muted">R$ ' + $(this).val() + '</span>' +
            '</li>')

            $("#valor-total").html("R$ " + parseFloat(total+parseFloat($(this).val())))
        });
})