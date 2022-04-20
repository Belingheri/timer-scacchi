document.querySelectorAll(".gicatore-input").forEach((el) => {
  el.onkeyup = (event) => {
    const id = `label_${event.target.id}`;
    document.getElementById(id).textContent = el.value || "Giocatore";
  };
});

document.querySelectorAll(".player").forEach((el) => {
  el.onclick = () => {
    if (startBtn.disabled) {
      invertiTimerGiocatore();
    }
  };
});

const startBtn = document.getElementById("startBtn");
const pausaBtn = document.getElementById("pausaBtn");
const invertiColoreBtn = document.getElementById("invertiColoreBtn");
const attTimer = document.getElementById("attTimer");

attTimer.value = 10;
attTimer.onchange = verificaTimer;

function verificaTimer() {
  let val = Number.parseInt(attTimer.value);
  if (!val || val < 1) {
    alert("Numero non ammesso");
    val = 10;
    attTimer.value = val;
  }

  for (let i = 0; i < 2; i++) {
    document.getElementById(`min${i}`).textContent = val
      .toString()
      .padStart(2, "0");
    document.getElementById(`sec${i}`).textContent = "00";
  }

  timers.forEach((e) => {
    e.minuti = Number.parseInt(attTimer.value);
    e.secondi = 0;
  });
}

let indiceAttuale = 0;
const timers = [
  { minuti: 10, secondi: 0 },
  { minuti: 10, secondi: 0 },
];
let timex;
let prossimaEsecTimer = 0;

startBtn.onclick = strBtn;

function strBtn() {
  attTimer.readonly = true;
  attTimer.disabled = true;
  startBtn.disabled = true;
  prossimaEsecTimer = 0;
  startTimer();
  startBtn.onclick = () => {};
}

pausaBtn.onclick = () => {
  clearTimeout(timex);
  startBtn.onclick = strBtn;
  startBtn.disabled = false;
};

resetBtn.onclick = () => {
  pausaBtn.click();
  verificaTimer();
  attTimer.readonly = false;
  attTimer.disabled = false;
};

function invertiTimerGiocatore() {
  clearTimeout(timex);
  indiceAttuale = (indiceAttuale + 1) % 2;
  prossimaEsecTimer = 0;
  startTimer();
}

invertiColoreBtn.onclick = invertiColori;

function invertiColori() {
  if (!startBtn.disabled) {
    document.querySelectorAll(".player").forEach((el) => {
      el.classList.toggle("text-light");
      el.classList.toggle("bg-dark");
    });
  }
}

function startTimer() {
  timex = setTimeout(function () {
    if (timers[indiceAttuale].secondi === 0) {
      if (timers[indiceAttuale].minuti === 0) {
        alert("Fine gioco");
        clearTimeout(timex);
        return;
      }

      timers[indiceAttuale].secondi = 59;
      timers[indiceAttuale].minuti--;
    } else {
      timers[indiceAttuale].secondi--;
    }
    document.getElementById(`min${indiceAttuale}`).textContent = timers[
      indiceAttuale
    ].minuti
      .toString()
      .padStart(2, "0");
    document.getElementById(`sec${indiceAttuale}`).textContent = timers[
      indiceAttuale
    ].secondi
      .toString()
      .padStart(2, "0");

    prossimaEsecTimer = 1000;
    startTimer();
  }, prossimaEsecTimer);
}
