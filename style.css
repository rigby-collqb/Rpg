const textEl = document.getElementById("text");
const choicesEl = document.getElementById("choices");
const sanityEl = document.getElementById("sanity");
const inventoryEl = document.getElementById("inventory");
const bgSound = document.getElementById("bg-sound");
const jumpscare = document.getElementById("jumpscare");
const scream = document.getElementById("scream");

let sanity = 100;
let inventory = [];

function updateStatus() {
  sanityEl.textContent = `Sanidade: ${sanity}%`;
  inventoryEl.textContent = `Inventário: ${inventory.join(", ") || "Nenhum"}`;
}

function typeText(text, callback, i = 0) {
  if (i < text.length) {
    textEl.innerHTML += text.charAt(i);
    setTimeout(() => typeText(text, callback, i + 1), 40);
  } else {
    callback();
  }
}

function triggerJumpscare() {
  scream.play();
  jumpscare.style.display = "flex";
  setTimeout(() => {
    jumpscare.style.display = "none";
  }, 1500);
}

function showScene(scene) {
  textEl.innerHTML = "";
  choicesEl.innerHTML = "";

  if (scene.sanityLoss) {
    sanity = Math.max(0, sanity - scene.sanityLoss);
    if (sanity <= 30 && Math.random() < 0.3) {
      triggerJumpscare();
    }
  }

  if (scene.item && !inventory.includes(scene.item)) {
    inventory.push(scene.item);
  }

  updateStatus();
  typeText(scene.text, () => {
    if (scene.choices) {
      scene.choices.forEach(choice => {
        const btn = document.createElement("button");
        btn.textContent = choice.text;
        btn.onclick = () => showScene(scenes[choice.next]);
        choicesEl.appendChild(btn);
      });
    }
  });
}

const scenes = [
  {
    text: "Você acorda em um quarto frio. Um espelho quebrado reflete olhos que não são seus.",
    choices: [
      { text: "Levantar e olhar mais de perto", next: 1 },
      { text: "Ignorar e sair pela porta", next: 2 }
    ]
  },
  {
    text: "Ao se aproximar do espelho, uma figura se move atrás de você.",
    sanityLoss: 15,
    choices: [
      { text: "Virar rápido", next: 3 },
      { text: "Fugir imediatamente", next: 2 }
    ]
  },
  {
    text: "O corredor está escuro. Sussurros ecoam do fim do corredor.",
    sanityLoss: 10,
    choices: [
      { text: "Seguir os sussurros", next: 4 },
      { text: "Entrar na primeira porta à direita", next: 5 }
    ]
  },
  {
    text: "Nada está atrás. Mas agora o espelho mostra algo de pé no corredor.",
    sanityLoss: 20,
    choices: [
      { text: "Fechar os olhos", next: 2 }
    ]
  },
  {
    text: "Os sussurros gritam. Você sente algo entrar na sua mente.",
    sanityLoss: 25,
    choices: [
      { text: "Resistir", next: 6 },
      { text: "Aceitar a presença", next: 7 }
    ]
  },
  {
    text: "Uma sala com velas. Um diário aberto diz: 'A criatura espelha sua culpa'.",
    item: "Diário",
    choices: [
      { text: "Ler o diário", next: 8 },
      { text: "Levar e sair", next: 2 }
    ]
  },
  {
    text: "Você vence o controle mental, mas perde memórias no processo.",
    sanityLoss: 15,
    choices: [
      { text: "Voltar ao espelho", next: 3 }
    ]
  },
  {
    text: "A presença toma sua mente. Você não é mais você. (Final Ruim)"
  },
  {
    text: "O diário revela seu passado sombrio. Mas também como sair.",
    choices: [
      { text: "Seguir as instruções", next: 9 }
    ]
  },
  {
    text: "Você encontra uma saída escondida e escapa. Mas a criatura... segue atrás. (Final Neutro)"
  },
  {
    text: "Você se esconde em um armário. A porta range sozinha e uma respiração pesada se aproxima.",
    sanityLoss: 10,
    choices: [
      { text: "Segurar a respiração", next: 11 },
      { text: "Abrir a porta e enfrentar", next: 12 }
    ]
  },
  {
    text: "Você segura o fôlego até quase desmaiar. A presença passa... por agora.",
    choices: [
      { text: "Sair devagar", next: 13 }
    ]
  },
  {
    text: "Você abre a porta e encara algo sem rosto. Ele grita dentro da sua mente.",
    sanityLoss: 30,
    choices: [
      { text: "Cair de joelhos", next: 7 },
      { text: "Gritar de volta", next: 14 }
    ]
  },
  {
    text: "Você volta ao corredor. Um rádio quebrado transmite uma voz que chama seu nome.",
    sanityLoss: 5,
    choices: [
      { text: "Responder", next: 15 },
      { text: "Destruir o rádio", next: 16 }
    ]
  },
  {
    text: "Seu grito ecoa e a entidade hesita. Você aproveita e corre.",
    sanityLoss: 5,
    choices: [
      { text: "Seguir por onde veio", next: 3 },
      { text: "Buscar uma nova sala", next: 5 }
    ]
  },
  {
    text: "A voz diz: 'Você está próximo'. Algo rasteja pelo teto.",
    sanityLoss: 20,
    choices: [
      { text: "Olhar para cima", next: 17 },
      { text: "Ignorar e fugir", next: 2 }
    ]
  },
  {
    text: "Você destrói o rádio. Um grito agudo preenche o ambiente. Algo foi libertado.",
    sanityLoss: 15,
    choices: [
      { text: "Se esconder", next: 10 },
      { text: "Buscar o diário", next: 5 }
    ]
  },
  {
    text: "Acima de você, olhos brilhantes observam. Eles piscam em sincronia com seu coração.",
    sanityLoss: 25,
    choices: [
      { text: "Ficar parado", next: 7 },
      { text: "Correr", next: 2 }
    ]
  }
];

showScene(scenes[0]);
