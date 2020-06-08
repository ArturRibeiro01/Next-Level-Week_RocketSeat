
// PUXA OS DADOS DA API DO IBGE E PREENCHE OS ESTADOS AUTOMATICAMENTE.
function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")
    
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => {


        for( state of states ) {

            ufSelect.innerHTML +=  `<option value="${state.id}">${state.nome}</option>`
        }      
    })
}


// CHAMA A FUNÇÃO 
populateUFs()


// BUSCA OS DADOS DAS CIDADES DA API DO IBGE 
function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufvalue = event.target.value
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufvalue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true
    
    fetch(url)
    .then( res => res.json() )
    .then( cities => {
       

        for( city of cities ) {
            citySelect.innerHTML +=  `<option value="${city.nome}">${city.nome}</option>`
        }      
        citySelect.disabled = false
    })
}
document.querySelector("select[name=uf]")
document.addEventListener("change", getCities)



// EDIÇÃO DOS ITENS DE COLETA

const itensToCollect = document.querySelectorAll(".itens-grid li")

for ( const item of itensToCollect){
    item.addEventListener("click", handleSelecteditem)
}

const collectedItems = document.querySelector ("input[name=itens]")


let selectedItens = []


function handleSelecteditem (event){ 
    const itemLi = event.target

    // Adicionar o remover uma classe com JS
    itemLi.classList.toggle("selected")

    const itenId = itemLi.dataset.id

    // console.log('ITEM ID:', itenId)

    // Verificar se tem itens selecionados e selecionar caso houver

    const alreadySelected = selectedItens.findIndex ( item => {
        const itemFound = item == itenId
        return itemFound
    })


    // Se já estiver selecionado 

    if(alreadySelected >= 0) {
        
        // tirar da seleçao
        const filteredItems = selectedItens.filter( item => {
            const itemIsDiferent = item != itenId
            return itemIsDiferent
        })

        selectedItens = filteredItems
    } else {
        // Se não tiver selecionado, adicione a seleção 
        selectedItens.push(itenId)

        console.log(selectedItens)
 
    }


    // console.log('selectedItens', selectedItens)

    // Atualizar com os itens selecionados.
    collectedItems.value = selectedItens
}