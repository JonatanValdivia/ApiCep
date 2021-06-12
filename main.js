//Consumo de API
'use strict'
const $ = (element) => document.querySelector(element);
//Primeiro pegamos o campo cep
const limparDados = endereco =>{
  $('#cidade').value = '';
  $('#bairro').value = '';
  $('#endereco').value = '';
  $('#estado').value = '';

}

const mostrarDados = endereco =>{
  $('#cidade').value = endereco.localidade;
  $('#bairro').value = endereco.bairro;
  $('#endereco').value = endereco.logradouro
  $('#estado').value = endereco.uf

} 

const eNumero = (cep) => /^[0-9]+$/.test(cep)

const cepValido = (cep) => cep.length == 8 && eNumero(cep);

const exibirMensagemCepIncorreto = () =>{
  $('#endereco').value = 'CEP incorreto!';
}

const exibirMensagemCepNaoEncontrado = () =>{
  $('#endereco').value = 'CEP não encontrado';
}

const pesquisarCep = async() =>{
  const cep = $('#cep').value
  const url = `https://viacep.com.br/ws/${cep}/json/`;
  /*fetch(url).then(response => response.json().then(data => mostrarDados(data)));*/
  if(cepValido(cep)){
    const dados = await fetch(url)
    const endereco = await dados.json();
    if(endereco.hasOwnProperty('erro')){
      limparDados();
      exibirMensagemCepNaoEncontrado();
    }else{
      mostrarDados(endereco);
    }   
  }else{
    limparDados();
    exibirMensagemCepIncorreto();
  } 
}

const limparInputs = () =>{
  const inputs = Array.from(document.querySelectorAll('input'))
  inputs.forEach(input => {
    input.value = "";
  });
}

const getBD = () => JSON.parse(localStorage.getItem("Cliente")) ?? [];

const valoresInputs = () =>{
  const bd = getBD();
  const valuesInputs = {
    cidade: $('#cidade').value,
    bairro: $('#bairro').value,
    endereco: $('#endereco').value,
    estado: $('#estado').value,
    cep: $('#cep').value,
    nome: $('#nome').value,
    email: $('#email').value,
    numero: $('#numero').value
  }
  bd.push(valuesInputs);
  localStorage.setItem('Cliente', JSON.stringify(bd))
}

$('#cep').addEventListener('focusout', pesquisarCep);
$('#btnSalvar').addEventListener('click', ()=>{
    valoresInputs();
    limparInputs();
});
