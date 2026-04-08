// --- JOGO 1: O DIA FUJÃO ---
let diaAtual = 1;

function adicionarDia() {
    diaAtual++;
    if (diaAtual > 31) diaAtual = 1;
    document.getElementById("diaDisplay").innerText = diaAtual;

    // Faz o botão pular para um lugar aleatório dentro da caixa
    let btn = document.getElementById("btnDia");
    let randomX = Math.floor(Math.random() * 150) - 75; // Esquerda ou Direita
    let randomY = Math.floor(Math.random() * 40) - 20;  // Cima ou Baixo
    
    btn.style.transform = `translate(${randomX}px, ${randomY}px)`;
}

// --- JOGO 2: A ROLETA DE MÊS ---
let meses = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];
let indiceMes = 0;
let roletaRodando = true;
let intervaloRoleta;

function iniciarRoleta() {
    intervaloRoleta = setInterval(() => {
        indiceMes = (indiceMes + 1) % 12;
        document.getElementById("mesDisplay").innerText = meses[indiceMes];
    }, 80); // 80 milissegundos (bem rápido!)
}

function travarDestravarMes() {
    let btn = document.getElementById("btnMes");
    if (roletaRodando) {
        clearInterval(intervaloRoleta); // Para a roleta
        btn.innerText = "DESTRAVAR MÊS";
        btn.style.color = "red";
    } else {
        iniciarRoleta(); // Volta a girar se o usuário errou
        btn.innerText = "TRAVAR MÊS";
        btn.style.color = "#00ff00";
    }
    roletaRodando = !roletaRodando;
}
iniciarRoleta(); // Começa girando quando a página abre

// --- JOGO 3: O TECLADO AMALDIÇOADO (ANO) ---
let anoAtual = "";

function gerarTeclado() {
    let teclado = document.getElementById("tecladoCaotico");
    teclado.innerHTML = ""; // Limpa o teclado

    // Cria um array de 0 a 9 e embaralha aleatoriamente
    let numeros = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5);

    numeros.forEach(num => {
        let btn = document.createElement("button");
        btn.innerText = num;
        btn.onclick = () => {
            if (anoAtual.length < 4) {
                anoAtual += num; // Adiciona o número digitado
                document.getElementById("anoDisplay").innerText = anoAtual;
                gerarTeclado(); // EMBARALHA TUDO DE NOVO A CADA CLIQUE!
            }
        };
        teclado.appendChild(btn);
    });
}
gerarTeclado(); // Cria o teclado pela primeira vez

function limparAno() {
    anoAtual = "";
    document.getElementById("anoDisplay").innerText = "____";
    gerarTeclado();
}

// --- ATIVIDADE 3: SALVAR NO INDEXEDDB ---
function salvarData() {
    // Validação básica
    if (anoAtual.length !== 4) {
        alert("Erro: Termine de digitar o ano com 4 dígitos antes de salvar!");
        return;
    }
    if (roletaRodando) {
        alert("Erro: Você precisa travar o mês antes de salvar!");
        return;
    }

    // Monta o objeto para o seu db.js
    let dataNascimento = {
        dia: diaAtual,
        mes: indiceMes + 1, // +1 porque o array começa no 0 (Janeiro = 1)
        ano: parseInt(anoAtual)
    };

    console.log("Tentando salvar no banco:", dataNascimento);

    // Chama a função do arquivo db.js criado na aula anterior
    if (typeof adicionar === "function") {
        adicionar(dataNascimento);
        alert(`Sucesso! Data ${dataNascimento.dia}/${dataNascimento.mes}/${dataNascimento.ano} enviada para o IndexedDB!`);
    } else {
        console.error("A função adicionar() do db.js não foi encontrada.");
        alert("Ops! O seu db.js não está conectado corretamente.");
    }
}