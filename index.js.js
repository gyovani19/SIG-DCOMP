//Gyovani Yuri Souza Santos - Sistemas de Informação

const histPessoa = (ano,codigo,ch,freq,nota) => {

    const hist = document.getElementById("tbPessoas")
    const qtdLinhas = hist.rows.length
    const linha = hist.insertRow(qtdLinhas)

    const colunaAno = linha.insertCell(0)
    const colunaCodigo = linha.insertCell(1)
    const colunaCH = linha.insertCell(2)
    const colunaFreq = linha.insertCell(3)
    const colunaNota = linha.insertCell(4)

    colunaAno.innerHTML = ano
    colunaCodigo.innerHTML = codigo
    colunaCH.innerHTML = ch
    colunaFreq.innerHTML = freq
    colunaNota.innerHTML = nota

}

const myForm = document.getElementById("myForm");

myForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const disciplina = {
        Nota: parseFloat(document.getElementById('nota').value),
        Periodo: document.getElementById('ano').value,
        Codigo: document.getElementById('cd').value,
        Frequencia: parseFloat(document.getElementById('freq').value),
        CargaHoraria:  parseFloat(document.getElementById('ch').value)
    }

    myForm.reset()

    ftempo(disciplina.Periodo)
    fmediach(disciplina.CargaHoraria)
    fdesvio(disciplina.Nota)
    faprovados(disciplina.Nota, disciplina.Codigo, disciplina.Frequencia)
    fdepartamento( disciplina.Codigo, disciplina.Nota)
    flistar(disciplina.Codigo, disciplina.Nota, disciplina.Periodo, disciplina.Frequencia, disciplina.CargaHoraria)
})

const disciplinasaprovadas = []
const disciplinasreprovadas = []
const listanotas = []
const listaperiodos = []
const listafrequencia = []
const listach = []
const listacodigos = []

const flistar = (codigo, nota, periodo, frequencia, cargahoraria) => {
    document.getElementById('tcod').innerHTML = codigo
    document.getElementById('tnota').innerHTML = nota
    document.getElementById('tperiodo').innerHTML = periodo
    document.getElementById('tfreq').innerHTML = `${frequencia}%`
    document.getElementById('tch').innerHTML = `${cargahoraria} horas.`
}

const ftempo = (periodo) => {

    if (listaperiodos.indexOf(periodo) == -1) {
        listaperiodos.push(periodo)

    } else return

    document.getElementById('resulttempo').innerHTML = `${listaperiodos.length} período(s)`

}


const fmediach = (cargahoraria) => {
    listach.push(cargahoraria)
    listareduzida = listach.reduce((acc, x) => acc + x, 0)
    const mediach = listareduzida / listach.length

    if (Number.isInteger(mediach)) {
        document.getElementById('resultmedia').innerHTML = `Média da carga horária é de ${mediach} horas.`
    } else {
        document.getElementById('resultmedia').innerHTML = `Média da carga horária é de ${mediach.toFixed(2)} horas.`
    }

    document.getElementById('chtotal').innerHTML = `${listareduzida} horas.`

}


const fdesvio = (nota) => {
    listanotas.push(nota)
    const listnotared = listanotas.reduce((acc, x) => acc + x)

    const media = listnotared / listanotas.length

    const step1 = listanotas.map((x) => x - media)

    const step2 = step1.map((x) => x**2)

    const somastep2 = step2.reduce((acc, x) => acc + x,0)

    const dividir = somastep2 / (listanotas.length)

    const result = Math.sqrt(dividir)

    if (result == 0) {
        document.getElementById('resultdesvio').innerHTML = `O desvio padrão da média geral é 0`
    } else if (Number.isInteger(result)) {
        document.getElementById('resultdesvio').innerHTML = `O desvio padrão da média geral é ${result}`
    } else {
        document.getElementById('resultdesvio').innerHTML = `O desvio padrão da média geral é  aproximadamente ${result.toFixed(2)}`
    }

}


const faprovados = (nota, codigo, frequencia) => {

    if (nota >= 5 && frequencia >= 75 ) {
        disciplinasaprovadas.push(codigo)

    } else {
        if(disciplinasreprovadas.indexOf(codigo) == -1) {

            disciplinasreprovadas.push(codigo)

        }
    }

    if (disciplinasaprovadas.length == 0) {

        document.getElementById('aprovadas').innerHTML = "Não foi aprovado em nenhuma disciplina até o momento."

    } else {
        document.getElementById('aprovadas').innerHTML = disciplinasaprovadas.map((x) => x)

    }


    if (disciplinasreprovadas.length == 0) {

        document.getElementById('reprovadas').innerHTML = "Não foi reprovado em nenhuma disciplina até o momento."
    } else {
        document.getElementById('reprovadas').innerHTML = disciplinasreprovadas.map((x) => x)
    }

}

const notasdep = []

const fdepartamento = (codigo, nota) => {
    const firststep = codigo.split('')
    const numeros = ['0','1','2','3','4','5','6','7','8','9']

    const filter = (x) => numeros.indexOf(x) == -1

    const listfiltrada = firststep.filter(filter)

    const listjoin = listfiltrada.join('')

    notasdep.push({
        Nome: listjoin,
        Nota: nota
    })


    const filtrodep = notasdep.filter((x) => x.Nome == listjoin)
    const redfiltro = filtrodep.reduce((acc, x) => acc + x.Nota, 0)
    const arrayparagraph = document.getElementById('depart').textContent.split(' ')
    if (arrayparagraph.indexOf(`${listjoin}:`) == -1) {
        document.getElementById('depart').innerHTML += `<p id='${listjoin}'> Média de ${listjoin}: é ${(redfiltro / filtrodep.length).toFixed(2)} </p>`
    } else {
        document.getElementById(`${listjoin}`).innerHTML = `Média de ${listjoin}: é ${(redfiltro / filtrodep.length).toFixed(2)}`
    }
}
