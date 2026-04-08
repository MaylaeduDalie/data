// Cria ou abre o banco de dados chamado "CaosDB" (Versão 1)
const request = indexedDB.open("CaosDB", 1);
let db;

// Executado na primeira vez que o banco é criado ou se a versão mudar
request.onupgradeneeded = function(event) {
    db = event.target.result;
    
    // Cria a "tabela" (Object Store) chamada 'datas'
    // autoIncrement: true cria um ID automático para cada registro salvo
    if (!db.objectStoreNames.contains("datas")) {
        db.createObjectStore("datas", { keyPath: "id", autoIncrement: true });
        console.log("Object Store 'datas' criado com sucesso!");
    }
};

// Executado quando o banco abre com sucesso
request.onsuccess = function(event) {
    db = event.target.result;
    console.log("Conectado ao IndexedDB com sucesso!");
};

// Tratamento de erro geral
request.onerror = function(event) {
    console.error("Erro ao abrir o IndexedDB:", event.target.errorCode);
};

// --- FUNÇÃO PARA ADICIONAR DADOS (Chamada pelo controller.js) ---
function adicionar(data) {
    if (!db) {
        console.error("Erro: Banco de dados ainda não carregou.");
        return;
    }

    // Cria uma transação com permissão de leitura e escrita
    const transaction = db.transaction(["datas"], "readwrite");
    const objectStore = transaction.objectStore("datas");

    // Adiciona o objeto passado pelo controller.js
    const addRequest = objectStore.add(data);

    addRequest.onsuccess = function() {
        console.log("✅ Data salva no IndexedDB com sucesso:", data);
    };

    addRequest.onerror = function(event) {
        console.error("❌ Erro ao salvar os dados:", event.target.error);
    };
}