// Lógica do botão "Novo horário"
//Procurar botão
document.querySelector("#add-time")

// Quando clicar no botão
.addEventListener('click', cloneField)

//Executar uma ação

function cloneField() {
    console.log("adicionar um novo horário")
    // Duplicar campos: quais campos?
    const newFieldContainer = document.querySelector('.schedule-item').cloneNode(true) //Node - refere-se a elementos HTML. O True pega todos os elementos dentro da DIV.

    // Colocar na página: onde? >> vai criar um novo filho na rama do fieldset Schedule-items

    const fields = newFieldContainer.querySelectorAll('input') // procura todas as tags INPUT e coloca na const "FIELDS"
        // Importante copiar resetado (com os campos limpos). Limpando os dados:
        fields.forEach(function(field) {
            // mostrando no console qual campo dos fields está sendo mostrado
            console.log(field)
            // limpa o campo
            field.value = ""
        })


    document.querySelector('#schedule-items').appendChild(newFieldContainer)
}
