const textEl = document.getElementById("text");
const choicesEl = document.getElementById("choices");
const sanityEl = document.getElementById("sanity");
const inventoryEl = document.getElementById("inventory");
const bgSound = document.getElementById("bg-sound");
const jumpscare = document.getElementById("jumpscare");
const scream = document.getElementById("scream");
const typingSound = document.getElementById("typing-sound");
const credits = document.getElementById("credits");
const creditLine = document.getElementById("credit-line");
const endSound = document.getElementById("end-sound");

let sanity = 100;
let inventory = [];

function updateStatus() {
  sanityEl.textContent = `Sanidade: ${sanity}%`;
  inventoryEl.textContent = `Inventário: ${inventory.join(", ") || "Nenhum"}`;
}

function typeText(text, callback, i = 0) {
  if (i === 0) {
    typingSound.currentTime = 0;
    typingSound.loop = true;
    typingSound.play().catch(() => {});
  }

  if (i < text.length) {
    textEl.innerHTML += text.charAt(i);
    setTimeout(() => typeText(text, callback, i + 1), 40);
  } else {
    typingSound.pause();
    typingSound.currentTime = 0;
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
    } else if (scene.end) {
      setTimeout(mostrarCreditos, 1500);
    }
  });
}

function mostrarCreditos() {
  document.getElementById("game").style.display = "none";
  credits.classList.remove("hidden");
  bgSound.pause();
  endSound.play();

  const linhas = [
    "Créditos Finais",
    "Produção: Allvesz",
    "História: Um pacto com o desconhecido",
    "Trilha Sonora: Ecos da Mente OST",
    "Obrigado por sobreviver... ou não.",
    "BY ALLVESZ",
    "Continua..."
  ];

  let index = 0;
  function exibirLinha() {
    if (index < linhas.length) {
      creditLine.textContent = linhas[index];
      creditLine.style.opacity = 1;
      setTimeout(() => {
        creditLine.style.opacity = 0;
        index++;
        setTimeout(exibirLinha, 1200);
      }, 3500);
    }
  }

  setTimeout(exibirLinha, 1000);
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
    text: "A presença toma sua mente. Você não é mais você. (Final Ruim)",
    end: true
  },
  {
    text: "O diário revela seu passado sombrio. Mas também como sair.",
    choices: [
      { text: "Seguir as instruções", next: 9 }
    ]
  },
  {
    text: "Você encontra uma saída escondida e escapa. Mas a criatura... segue atrás. (Final Neutro)",
    end: true
  }
];

showScene(scenes[0]);
