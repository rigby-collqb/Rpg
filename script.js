const textEl = document.getElementById("text");
const choicesEl = document.getElementById("choices");
const sanityEl = document.getElementById("sanity");
const inventoryEl = document.getElementById("inventory");
const bgSound = document.getElementById("bg-sound");
const jumpscare = document.getElementById("jumpscare");
const scareImg = document.getElementById("scare-img");
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
  const images = ["jump1.png", "jump2.png", "jump3.png"];
  const selected = images[Math.floor(Math.random() * images.length)];
  scareImg.src = selected;
  scream.currentTime = 0;
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
    sanityLoss: 10,
    choices: [
      { text: "Sair correndo", next: 2 },
      { text: "Encarar o espelho", next: 6 }
    ]
  },
  {
    text: "Uma sombra atravessa você, e você sente a sanidade se esvair.",
    sanityLoss: 20,
    choices: [
      { text: "Gritar", next: 7 },
      { text: "Ficar em silêncio", next: 5 }
    ]
  },
  {
    text: "Você encontra uma lanterna velha. Pode ser útil.",
    item: "Lanterna",
    choices: [
      { text: "Pegar a lanterna e continuar", next: 8 }
    ]
  },
  {
    text: "O espelho trinca mais uma vez e se estilhaça com um grito.",
    sanityLoss: 25,
    choices: [
      { text: "Fugir", next: 2 }
    ]
  },
  {
    text: "Seu grito ecoa, mas ninguém responde. Algo se aproxima...",
    sanityLoss: 20,
    choices: [
      { text: "Se esconder", next: 5 }
    ]
  },
  {
    text: "Com a lanterna, você vê marcas de unhas nas paredes e algo escrito com sangue: \"Não olhe para trás\"...",
    sanityLoss: 15,
    choices: [
      { text: "Olhar para trás", next: 6 },
      { text: "Correr em frente", next: 9 }
    ]
  },
  {
    text: "Uma porta iluminada aparece. Você está quase livre... ou não.",
    sanityLoss: 5,
    choices: [
      { text: "Abrir a porta", next: 10 }
    ]
  },
  {
    text: "Fim da demo. Obrigado por jogar 'Ecos da Mente'.",
    choices: []
  }
];

showScene(scenes[0]);
