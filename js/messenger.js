$(document).ready(function () {
    let sabor = "";
    let carrinho = [];
    let meia1 = "";
    let meia2 = "";
    let inteira = "";
    let preco = 0;
    let precoPromocao = 0;
    let promocao = false;

    $(document)
        .on("click", ".btnEscolheMeiaBroto", function () {
            if (meia1 == "") {
                meia1 = $(this)
                    .closest(".card-pizza")
                    .find(".sabor-pizza")
                    .text();
                bootbox.alert(
                    "Você adicionou " + meia1 + "(meia broto) ao carrinho"
                );
                $(".btnEscolheInteiraBroto").slideUp();
                $(".div-grande").slideUp();
                $(".divAdicionais").slideUp();
                preco += parseFloat($(this).attr("data-preco"));
            } else if (meia2 == "") {
                meia2 = $(this)
                    .closest(".card-pizza")
                    .find(".sabor-pizza")
                    .text();
                bootbox.alert(
                    "Você adicionou " + meia2 + "(meia broto) ao carrinho"
                );
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
                $(".divAdicionais").slideDown();
                console.log(carrinho);
            } else {
                alert("Ocorreu um erro, por favor escolha novamente.");
                location.reload();
            }
            // carrinho.push({});
        })
        .on("click", ".btnEscolheInteiraBroto", function () {
            inteira = $(this)
                .closest(".card-pizza")
                .find(".sabor-pizza")
                .text();
            bootbox.alert(
                "Você adicionou " + inteira + "(inteira broto) ao carrinho"
            );
            preco += parseFloat($(this).attr("data-preco"));
            carrinho.push(
                {tipo: "Broto", meia1: meia1, meia2: meia2, inteira: inteira, preco: preco}
            )

            meia1 = "";
            meia2 = "";
            inteira = "";
            preco = 0;
            console.log(carrinho);
        })
        .on("click", ".btnEscolhe", function () {
            inteira = $(this)
                .closest(".card-pizza")
                .find(".sabor-pizza")
                .text();
            bootbox.alert("Você adicionou " + inteira + " ao carrinho");
            preco += parseFloat($(this).attr("data-preco"));
            carrinho.push(
                {tipo: "-", meia1: meia1, meia2: meia2, inteira: inteira, preco: preco}
            )

            meia1 = "";
            meia2 = "";
            inteira = "";
            preco = 0;
            console.log(carrinho);
        })
        .on("click", ".btnEscolheMeiaGrande", function () {
            if (meia1 == "") {
                if ($(this).hasClass("tagPromocao")) {
                    promocao = true;
                    precoPromocao = parseFloat($(this).attr("data-preco_promocao"))
                }
                meia1 = $(this)
                    .closest(".card-pizza")
                    .find(".sabor-pizza")
                    .text();
                bootbox.alert(
                    "Você adicionou " + meia1 + "(meia grande) ao carrinho"
                );
                $(".btnEscolheInteiraGrande").slideUp();
                $(".div-broto").slideUp();
                $(".divAdicionais").slideUp();
                preco += parseFloat($(this).attr("data-preco"));
            } else if (meia2 == "") {
                if ($(this).hasClass("tagPromocao") && promocao) {
                    precoPromocao += parseFloat($(this).attr("data-preco_promocao"))
                    preco = precoPromocao
                } else {
                    preco += parseFloat($(this).attr("data-preco"));
                }

                meia2 = $(this)
                    .closest(".card-pizza")
                    .find(".sabor-pizza")
                    .text();
                bootbox.alert(
                    "Você adicionou " + meia2 + "(meia grande) ao carrinho"
                );

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
                promocao = false;
                precoPromocao = 0;
                $(".btnEscolheInteiraGrande").slideDown();
                $(".div-broto").slideDown();
                $(".divAdicionais").slideDown();
                console.log(carrinho);
            } else {
                alert("Ocorreu um erro, por favor escolha novamente.");
                location.reload();
            }
        })
        .on("click", ".btnEscolheInteiraGrande", function () {
            inteira = $(this)
                .closest(".card-pizza")
                .find(".sabor-pizza")
                .text();
            bootbox.alert(
                "Você adicionou " + inteira + "(inteira grande) ao carrinho"
            );
            preco += parseFloat($(this).attr("data-preco"));
            carrinho.push(
                {tipo: "Grande", meia1: meia1, meia2: meia2, inteira: inteira, preco: preco}
            )

            meia1 = "";
            meia2 = "";
            inteira = "";
            preco = 0;
            console.log(carrinho);
        })
        .on("click", ".btn-passo2", function () {
            if (carrinho.length == 0) {
                bootbox.alert("Seu carrinho está vazio, por favor escolha um produto");
                return false;
            }
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
                $("#ul-carrinho").append(
                    '<li class="list-group-item d-flex justify-content-between lh-condensed itens-c' +
                    'arrinho"><div><h6 class="my-0">' + nomeProduto + '</h6><small class="text-mute' +
                    'd">' + element.tipo + '</small></div><span class="text-muted">R$ ' +
                    element.preco + '</span></li>'
                )
                total += element.preco;
            })

            $("#valor-total").html("R$ " + parseFloat(total))
        })
        .on("click", "#fazer-pedido", function () {
            if (!validator()) 
                return false;
            
            $("#divFinalizaPedido").show();
            let nome = $("#nome_pedido").val();
            let telefone = $("#telefone_pedido").val();
            let endereco = $('input[name="metodoEntrega"]:checked').val() + "\n" + $(
                "#endereco_pedido"
            ).val();
            let pagamento = $('input[name="paymentMethod"]:checked').val();
            let troco = $("#troco_pedido").val();
            let bairro = $("#bairro_pedido option:selected").text();
            let valorFrete = $("#bairro_pedido option:selected").val();
            let obs = $("#observacoes").val();

            carrinho.forEach(function (element, index) {
                if (element.inteira == "") {
                    sabor += "01 " + element.meia1 + " e " + element.meia2 + "(" + element.tipo + ")\n"
                } else {
                    sabor += "01 " + element.inteira + "(" + element.tipo + ")\n"
                }
            });

            var whatsappMessage = "*Pedido via Site*\r\n\r\n- Sabor(es): " + sabor + "\n- C" +
                    "liente: " + nome + "\n- Telefone: " + telefone + "\n- Entrega: " +
                    endereco + "\n- Bairro: " + bairro + "\n- Preço Entrega: R$" +
                    valorFrete + "\n- Pagamento: " + pagamento + "\r\n\r\n- Total: " + $(
                "#valor-total"
            ).text() + "\n- Troco: " + troco + "\n- **Observações: " + obs;

            whatsappMessage = window.encodeURIComponent(whatsappMessage);
            window.open(
                'https://api.whatsapp.com/send?phone=+5517991259723&text=' + whatsappMessage,
                '_blank'
            );
        })
        .on("change", 'input[name="metodoEntrega"]', function () {
            if ($('input[name="metodoEntrega"]:checked').val() == "delivery") {
                $(".dados-delivery").slideDown()
                bootbox.alert("Selecione o bairro para saber o valor da entrega.")
            } else {
                $(".dados-delivery").slideUp()
            }
        })
        .on("change", 'input[name="paymentMethod"]', function () {
            if ($('input[name="paymentMethod"]:checked').val() == "dinheiro") {
                $(".troco-pedido").slideDown()
            } else {
                $(".troco-pedido").slideUp()
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
                $("#ul-carrinho").append(
                    '<li class="list-group-item d-flex justify-content-between lh-condensed itens-c' +
                    'arrinho"><div><h6 class="my-0">' + nomeProduto + '</h6><small class="text-mute' +
                    'd">' + element.tipo + '</small></div><span class="text-muted">R$ ' +
                    element.preco + '</span></li>'
                )
                total += element.preco;
            })

            $("#ul-carrinho").append(
                '<li class="list-group-item d-flex justify-content-between lh-condensed frete-c' +
                'arrinho"><div><h6 class="my-0">Entrega</h6></div><span class="text-muted">R$ ' +
                $(this).val() + '</span></li>'
            )

            $("#valor-total").html("R$ " + parseFloat(total + parseFloat($(this).val())))
        });

    let validator = () => {
        if ($("#nome_pedido").val() == "") {
            bootbox.alert("Por favor, informe seu nome!");
            return false;
        } else if ($("#telefone_pedido").val() == "") {
            bootbox.alert("Por favor, informe seu telefone!");
            return false;
        } else if ($("#endereco_pedido").is(":visible") && $("#endereco_pedido").val() == "") {
            bootbox.alert("Por favor, informe seu endereço corretamente!");
            return false;
        }

        return true;
    }
})