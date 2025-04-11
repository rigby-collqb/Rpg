const textEl = document.getElementById("text");
const choicesEl = document.getElementById("choices");
const sanityEl = document.getElementById("sanity");
const inventoryEl = document.getElementById("inventory");
const bgSound = document.getElementById("bg-sound");

let sanity = 100;
let inventory = [];
let currentScene = 0;

const scenes = [
  {
    text: "Você acorda em um quarto escuro. A luz falha. Um som de respiração ecoa.",
    choices: [
      { text: "Levantar e explorar", next: 1 },
      { text: "Ficar deitado e ouvir", next: 2 }
    ]
  },
  {
    text: "Você tateia até a porta. Está entreaberta. Um cheiro de mofo e sangue vem de fora.",
    choices: [
      { text: "Abrir a porta", next: 3 },
      { text: "Procurar algo útil no quarto", next: 4 }
    ]
  },
  {
    text: "A respiração se aproxima. Você sente uma presença. Sua sanidade diminui.",
    sanityLoss: 10,
    choices: [
      { text: "Gritar por ajuda", next: 5 },
      { text: "Fechar os olhos", next: 6 }
    ]
  },
  {
    text: "O corredor é longo. As luzes piscam. Você ouve sussurros...",
    sanityLoss: 5,
    choices: [
      { text: "Seguir os sussurros", next: 7 },
      { text: "Voltar pro quarto", next: 4 }
    ]
  },
  {
    text: "Você encontra uma lanterna quebrada. Talvez funcione...",
    item: "Lanterna",
    choices: [
      { text: "Levar a lanterna", next: 3 },
      { text: "Deixar e sair", next: 3 }
    ]
  },
  {
    text: "Nada responde. Mas agora a respiração está dentro da sua mente.",
    sanityLoss: 15,
    choices: [
      { text: "Levantar e correr", next: 3 }
    ]
  },
  {
    text: "Você desmaia. Quando acorda, algo mudou...",
    sanityLoss: 20,
    choices: [
      { text: "Explorar", next: 3 }
    ]
  },
  {
    text: "Os sussurros dizem seu nome. Você não se lembra quem é.",
    sanityLoss: 10,
    choices: [
      { text: "Perguntar quem sou", next: 8 },
      { text: "Fingir que sabe", next: 9 }
    ]
  },
  {
    text: "\"Sou você\" diz a voz. Você sente sua sanidade ruir.",
    sanityLoss: 20,
    choices: [
      { text: "Correr", next: 10 }
    ]
  },
  {
    text: "Você anda como se tudo estivesse normal... Mas nada está.",
    choices: [
      { text: "Olhar no espelho", next: 11 }
    ]
  },
  {
    text: "Corredores sem fim. Portas que levam ao mesmo lugar.",
    sanityLoss: 10,
    choices: [
      { text: "Parar de correr", next: 12 }
    ]
  },
  {
    text: "Você não tem reflexo. Algo tomou seu lugar.",
    sanityLoss: 25,
    choices: [
      { text: "Aceitar", next: 13 },
      { text: "Rejeitar", next: 14 }
    ]
  },
  {
    text: "Você senta. Escuro. Silêncio. Está sozinho, pra sempre. (Final: Neutro)"
  },
  {
    text: "Você se funde com a presença. Agora ela é você. (Final: Ruim)"
  },
  {
    text: "Você recusa a loucura. Lembra de quem é. Escapa. (Final: Bom)"
  }
];

function startGame() {
  bgSound.play();
  showScene(0);
}

function showScene(index) {
  const scene = scenes[index];
  currentScene = index;
  textEl.innerHTML = "";
  choicesEl.innerHTML = "";
  if (scene.sanityLoss) sanity = Math.max(0, sanity - scene.sanityLoss);
  if (scene.item && !inventory.includes(scene.item)) inventory.push(scene.item);
  sanityEl.textContent = `Sanidade: ${sanity}%`;
  inventoryEl.textContent = `Inventário: ${inventory.join(", ") || "Nenhum"}`;

  typeText(scene.text, () => {
    if (scene.choices) {
      scene.choices.forEach(choice => {
        const btn = document.createElement("button");
        btn.textContent = choice.text;
        btn.onclick = () => showScene(choice.next);
        choicesEl.appendChild(btn);
      });
    }
  });
}

function typeText(text, callback, i = 0) {
  if (i < text.length) {
    textEl.innerHTML += text.charAt(i);
    setTimeout(() => typeText(text, callback, i + 1), 40);
  } else {
    callback();
  }
}

startGame();
