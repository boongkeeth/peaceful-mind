
document.addEventListener("DOMContentLoaded", function () {

  /* =========================================================
     DAILY MESSAGE
  ========================================================= */

  const dailyText = document.getElementById("dailyText");
  const changeDaily = document.getElementById("changeDaily");

  const dailyMessages = [
    "ไม่ต้องรีบ แค่หายใจช้า ๆ และอยู่กับปัจจุบัน",
    "วันนี้ไม่ต้องสมบูรณ์แบบ แค่ใจดีกับตัวเองก็พอ",
    "พักบ้างก็ได้ คุณไม่จำเป็นต้องเก่งตลอดเวลา",
    "สิ่งเล็ก ๆ ที่คุณทำวันนี้ก็มีความหมาย",
    "ค่อย ๆ ไปทีละก้าว ไม่ต้องเปรียบเทียบตัวเองกับใคร",
    "ขอให้วันนี้เป็นวันที่อ่อนโยนกับหัวใจของคุณ",
    "หายใจเข้าลึก ๆ แล้วปล่อยสิ่งที่หนักใจออกไป"
  ];

  if (changeDaily && dailyText) {

    changeDaily.addEventListener("click", function () {

      const current =
        dailyText.textContent;

      let newMessage;

      do {

        newMessage =
          dailyMessages[
            Math.floor(
              Math.random() *
              dailyMessages.length
            )
          ];

      } while (
        newMessage === current &&
        dailyMessages.length > 1
      );

      dailyText.textContent =
        newMessage;

    });

  }


  /* =========================================================
     TOAST
  ========================================================= */

  const toast =
    document.getElementById("toast");


  function showToast(message) {

    if (!toast) return;

    toast.textContent =
      message;

    toast.classList.add("show");

    clearTimeout(
      window.peacefulToastTimer
    );

    window.peacefulToastTimer =
      setTimeout(function () {

        toast.classList.remove("show");

      }, 2500);

  }


 /* =========================================================
   MEDITATION TIMER + BREATHING GUIDE
========================================================= */

const timer =
  document.getElementById("timer");

const timerStatus =
  document.getElementById("timerStatus");

const startTimer =
  document.getElementById("startTimer");

const resetTimer =
  document.getElementById("resetTimer");

const breathingCircle =
  document.getElementById("breathingCircle");

const breathingWord =
  document.getElementById("breathingWord");

const breathingGuide =
  document.getElementById("breathingGuide");

const timeButtons =
  document.querySelectorAll(".time-button");


let selectedMinutes = 5;

let remainingSeconds =
  selectedMinutes * 60;

let timerInterval = null;

let timerRunning = false;

let breathingInterval = null;

let breathingPhase = "in";


/* =========================================================
   TIMER
========================================================= */

function updateTimer() {

  if (!timer) return;

  const minutes =
    Math.floor(
      remainingSeconds / 60
    );

  const seconds =
    remainingSeconds % 60;

  timer.textContent =
    String(minutes).padStart(2, "0") +
    ":" +
    String(seconds).padStart(2, "0");

}


/* =========================================================
   BREATHING PHASE
========================================================= */

function setBreathingPhase(phase) {

  breathingPhase = phase;


  if (!breathingWord) {
    return;
  }


  if (phase === "in") {

    breathingWord.textContent =
      "หายใจเข้า";


    if (breathingGuide) {

      breathingGuide.textContent =
        "ค่อย ๆ หายใจเข้าอย่างช้า ๆ";

    }

  } else {

    breathingWord.textContent =
      "หายใจออก";


    if (breathingGuide) {

      breathingGuide.textContent =
        "ค่อย ๆ ผ่อนลมหายใจออก";

    }

  }

}


/* =========================================================
   START BREATHING
========================================================= */

function startBreathingGuide() {

  clearInterval(
    breathingInterval
  );


  setBreathingPhase(
    "in"
  );


  breathingInterval =
    setInterval(
      function () {

        setBreathingPhase(
          breathingPhase === "in"
            ? "out"
            : "in"
        );

      },
      4000
    );

}


/* =========================================================
   STOP BREATHING
========================================================= */

function stopBreathingGuide() {

  clearInterval(
    breathingInterval
  );

  breathingInterval = null;

}


/* =========================================================
   RESET BREATHING
========================================================= */

function resetBreathingGuide() {

  stopBreathingGuide();

  breathingPhase = "in";


  if (breathingWord) {

    breathingWord.textContent =
      "พร้อมเริ่ม";

  }


  if (breathingGuide) {

    breathingGuide.textContent =
      "เมื่อเริ่มแล้ว วงกลมจะค่อย ๆ ขยายและหด";

  }

}


/* =========================================================
   FINISH MEDITATION
========================================================= */

function finishMeditation() {

  clearInterval(
    timerInterval
  );

  timerInterval = null;

  timerRunning = false;


  stopBreathingGuide();


  if (startTimer) {

    startTimer.textContent =
      "เริ่มสมาธิ";

  }


  if (timerStatus) {

    timerStatus.textContent =
      "พักใจสักครู่นะ 🪷";

  }


  if (breathingCircle) {

    breathingCircle.classList.remove(
      "active"
    );

  }


  if (breathingWord) {

    breathingWord.textContent =
      "พักใจ";

  }


  if (breathingGuide) {

    breathingGuide.textContent =
      "คุณให้เวลากับตัวเองแล้ว 🌿";

  }


  showToast(
    "จบช่วงเวลาสมาธิแล้ว 🪷"
  );

}


/* =========================================================
   PAUSE
========================================================= */

function pauseMeditation() {

  clearInterval(
    timerInterval
  );

  timerInterval = null;

  timerRunning = false;


  stopBreathingGuide();


  if (startTimer) {

    startTimer.textContent =
      "เริ่มต่อ";

  }


  if (timerStatus) {

    timerStatus.textContent =
      "พักชั่วคราว";

  }


  if (breathingCircle) {

    breathingCircle.classList.remove(
      "active"
    );

  }


  if (breathingGuide) {

    breathingGuide.textContent =
      "เมื่อพร้อมแล้ว กดเริ่มต่อได้เลย";

  }

}


/* =========================================================
   SELECT TIME
========================================================= */

timeButtons.forEach(
  function (button) {

    button.addEventListener(
      "click",
      function () {

        if (timerRunning) {
          return;
        }


        timeButtons.forEach(
          function (item) {

            item.classList.remove(
              "active"
            );

          }
        );


        button.classList.add(
          "active"
        );


        selectedMinutes =
          Number(
            button.dataset.time
          );


        remainingSeconds =
          selectedMinutes * 60;


        resetBreathingGuide();

        updateTimer();


        if (timerStatus) {

          timerStatus.textContent =
            "นั่งให้สบาย แล้วค่อย ๆ หายใจ";

        }

      }
    );

  }
);


/* =========================================================
   START / PAUSE MEDITATION
========================================================= */

if (startTimer) {

  startTimer.addEventListener(
    "click",
    function () {


      /* -------------------------
         PAUSE
      ------------------------- */

      if (timerRunning) {

        pauseMeditation();

        return;

      }


      /* -------------------------
         START AGAIN
      ------------------------- */

      if (
        remainingSeconds <= 0
      ) {

        remainingSeconds =
          selectedMinutes * 60;

        updateTimer();

      }


      timerRunning = true;


      startTimer.textContent =
        "พักชั่วคราว";


      if (timerStatus) {

        timerStatus.textContent =
          "กำลังทำสมาธิ...";

      }


      if (breathingCircle) {

        breathingCircle.classList.add(
          "active"
        );

      }


      startBreathingGuide();


      timerInterval =
        setInterval(
          function () {

            remainingSeconds--;

            updateTimer();


            if (
              remainingSeconds <= 0
            ) {

              finishMeditation();

            }

          },
          1000
        );

    }
  );

}


/* =========================================================
   RESET MEDITATION
========================================================= */

if (resetTimer) {

  resetTimer.addEventListener(
    "click",
    function () {

      clearInterval(
        timerInterval
      );

      timerInterval = null;

      timerRunning = false;


      remainingSeconds =
        selectedMinutes * 60;


      if (startTimer) {

        startTimer.textContent =
          "เริ่มสมาธิ";

      }


      if (timerStatus) {

        timerStatus.textContent =
          "นั่งให้สบาย แล้วค่อย ๆ หายใจ";

      }


      if (breathingCircle) {

        breathingCircle.classList.remove(
          "active"
        );

      }


      resetBreathingGuide();

      updateTimer();

    }
  );

}
  /* =========================================================
   MALA COUNTER — 108 BEADS IN A CIRCLE
========================================================= */

const malaCount =
  document.getElementById("malaCount");

const malaString =
  document.getElementById("malaString");

const malaMessage =
  document.getElementById("malaMessage");

const addMala =
  document.getElementById("addMala");

const minusMala =
  document.getElementById("minusMala");

const resetMala =
  document.getElementById("resetMala");

let mala = 0;

const maxMala = 108;


/* =========================================================
   MALA SOUND
========================================================= */

let malaAudioContext = null;

function getMalaAudioContext() {

  if (malaAudioContext) {
    return malaAudioContext;
  }

  const AudioContext =
    window.AudioContext ||
    window.webkitAudioContext;

  if (!AudioContext) {
    return null;
  }

  malaAudioContext =
    new AudioContext();

  return malaAudioContext;
}


function playMalaSound() {

  try {

    const ctx =
      getMalaAudioContext();

    if (!ctx) {
      return;
    }

    if (ctx.state === "suspended") {
      ctx.resume();
    }

    const now =
      ctx.currentTime;

    const master =
      ctx.createGain();

    master.gain.setValueAtTime(
      0.0001,
      now
    );

    master.gain.exponentialRampToValueAtTime(
      0.15,
      now + 0.004
    );

    master.gain.exponentialRampToValueAtTime(
      0.0001,
      now + 0.32
    );


    const wood =
      ctx.createOscillator();

    const woodGain =
      ctx.createGain();

    wood.type = "triangle";

    wood.frequency.setValueAtTime(
      420,
      now
    );

    wood.frequency.exponentialRampToValueAtTime(
      150,
      now + 0.22
    );

    woodGain.gain.setValueAtTime(
      0.0001,
      now
    );

    woodGain.gain.exponentialRampToValueAtTime(
      0.10,
      now + 0.003
    );

    woodGain.gain.exponentialRampToValueAtTime(
      0.0001,
      now + 0.23
    );

    wood.connect(woodGain);
    woodGain.connect(master);


    const body =
      ctx.createOscillator();

    const bodyGain =
      ctx.createGain();

    body.type = "sine";

    body.frequency.setValueAtTime(
      210,
      now
    );

    body.frequency.exponentialRampToValueAtTime(
      95,
      now + 0.25
    );

    bodyGain.gain.setValueAtTime(
      0.0001,
      now
    );

    bodyGain.gain.exponentialRampToValueAtTime(
      0.055,
      now + 0.004
    );

    bodyGain.gain.exponentialRampToValueAtTime(
      0.0001,
      now + 0.25
    );

    body.connect(bodyGain);
    bodyGain.connect(master);


    const click =
      ctx.createOscillator();

    const clickGain =
      ctx.createGain();

    click.type = "triangle";

    click.frequency.setValueAtTime(
      720,
      now
    );

    click.frequency.exponentialRampToValueAtTime(
      260,
      now + 0.06
    );

    clickGain.gain.setValueAtTime(
      0.0001,
      now
    );

    clickGain.gain.exponentialRampToValueAtTime(
      0.07,
      now + 0.002
    );

    clickGain.gain.exponentialRampToValueAtTime(
      0.0001,
      now + 0.085
    );

    click.connect(clickGain);
    clickGain.connect(master);


    const filter =
      ctx.createBiquadFilter();

    filter.type = "lowpass";

    filter.frequency.setValueAtTime(
      2200,
      now
    );

    filter.Q.value = 0.45;

    master.connect(filter);

    filter.connect(
      ctx.destination
    );


    wood.start(now);
    body.start(now);
    click.start(now);

    wood.stop(
      now + 0.23
    );

    body.stop(
      now + 0.27
    );

    click.stop(
      now + 0.10
    );

  } catch (error) {

    console.log(
      "Mala sound unavailable",
      error
    );

  }

}


/* =========================================================
   CREATE 108 BEADS
   วางด้วย left / top โดยตรง
========================================================= */

function createMalaBeads() {

  if (!malaString) {
    console.warn(
      "malaString not found"
    );

    return;
  }


  malaString.innerHTML = "";


  /* ให้พื้นที่ลูกประคำเป็นพื้นที่อ้างอิง */

  malaString.style.position =
    "relative";

  malaString.style.width =
    "100%";

  malaString.style.height =
    "100%";


  for (
    let i = 1;
    i <= maxMala;
    i++
  ) {

    const bead =
      document.createElement("div");


    bead.className =
      "mala-bead";


    bead.dataset.number =
      String(i);


    /* มุมของแต่ละเม็ด */

    const angle =
      ((i - 1) / maxMala) *
      Math.PI * 2 -
      Math.PI / 2;


    /*
      ใช้เปอร์เซ็นต์
      เพื่อให้ responsive ทั้ง desktop / mobile
    */

    const radius = 46;


    const x =
      50 +
      Math.cos(angle) *
      radius;


    const y =
      50 +
      Math.sin(angle) *
      radius;


    bead.style.left =
      x + "%";


    bead.style.top =
      y + "%";


    bead.style.transform =
      "translate(-50%, -50%)";


    malaString.appendChild(
      bead
    );

  }

}


/* =========================================================
   UPDATE CIRCLE VISUAL
========================================================= */

function updateMalaVisual() {

  if (!malaString) {
    return;
  }


  const beads =
    malaString.querySelectorAll(
      ".mala-bead"
    );


  beads.forEach(
    function (bead, index) {

      const number =
        index + 1;


      bead.classList.remove(
        "current",
        "counted",
        "next",
        "just-counted"
      );


      /* เม็ดที่นับแล้ว */

      if (
        number < mala &&
        mala > 0
      ) {

        bead.classList.add(
          "counted"
        );

      }


      /* เม็ดปัจจุบัน */

      if (
        number === mala &&
        mala > 0
      ) {

        bead.classList.add(
          "current"
        );

        bead.classList.add(
          "just-counted"
        );

      }


      /* ตอนเริ่ม 0 */

      if (
        mala === 0 &&
        number <= 3
      ) {

        bead.classList.add(
          "next"
        );

      }


      /* เม็ดถัดไป */

      if (
        mala > 0 &&
        number > mala &&
        number <= mala + 3
      ) {

        bead.classList.add(
          "next"
        );

      }

    }
  );

}


/* =========================================================
   UPDATE NUMBER + MESSAGE
========================================================= */

function updateMala() {

  if (malaCount) {

    malaCount.textContent =
      String(mala);

  }


  if (malaMessage) {

    if (mala === 0) {

      malaMessage.textContent =
        "แตะตรงกลางเพื่อเริ่มนับลูกประคำ 🪷";

    } else if (
      mala < maxMala
    ) {

      malaMessage.textContent =
        "ค่อย ๆ นับไปทีละเม็ดนะ 🪷";

    } else {

      malaMessage.textContent =
        "ครบ 108 ลูกแล้ว 🙏✨";

    }

  }


  updateMalaVisual();

}


/* =========================================================
   ADD — CENTER STAR BUTTON
========================================================= */

function addOneMala() {

  if (
    mala >= maxMala
  ) {

    showToast(
      "ครบ 108 ลูกแล้ว 🙏✨"
    );

    return;
  }


  playMalaSound();


  mala++;


  updateMala();


  if (addMala) {

    addMala.classList.remove(
      "mala-tap"
    );

    void addMala.offsetWidth;

    addMala.classList.add(
      "mala-tap"
    );

  }


  if (
    mala === maxMala
  ) {

    setTimeout(
      function () {

        showToast(
          "ครบ 108 ลูกแล้ว 🙏✨"
        );

      },
      250
    );

  }

}


if (addMala) {

  addMala.addEventListener(
    "click",
    addOneMala
  );

}


/* =========================================================
   MINUS
========================================================= */

if (minusMala) {

  minusMala.addEventListener(
    "click",
    function () {

      if (mala <= 0) {
        return;
      }

      mala--;

      updateMala();

    }
  );

}


/* =========================================================
   RESET
========================================================= */

if (resetMala) {

  resetMala.addEventListener(
    "click",
    function () {

      mala = 0;

      updateMala();

      showToast(
        "เริ่มรอบลูกประคำใหม่แล้ว 🪷"
      );

    }
  );

}


/* =========================================================
   INITIALIZE MALA
========================================================= */

createMalaBeads();

updateMala();
  /* =========================================================
   CHANTING — NEW SYSTEM
========================================================= */

const chantModal =
  document.getElementById("chantModal");

const modalTitle =
  document.getElementById("modalTitle");

const modalContent =
  document.getElementById("modalContent");

const closeModal =
  document.getElementById("closeModal");

const modalBg =
  document.getElementById("chantModalBg");

const chantButtons =
  document.querySelectorAll(".read-chant");

const chantReadings =
  document.querySelectorAll(".chant-reading");


/* =========================================================
   CHANT TITLES
========================================================= */

const chantTitles = {

  "namo":
    "นะโม 3 จบ",

  "itipiso":
    "บทสวดอิติปิโสฯ",

  "pahung":
    "บทสวดพาหุงมหากา",

  "metta-all":
    "แผ่เมตตาให้สรรพสัตว์",

  "metta-self":
    "คาถาแผ่เมตตาตนเอง",

  "mahakaruniko":
    "บทสวดมหาการุณิโก",

  "before-bed":
    "บทสวดก่อนนอน"

};


/* =========================================================
   CLOSE CHANT MODAL
========================================================= */

function closeChantModal() {

  if (chantModal) {

    chantModal.classList.remove(
      "open"
    );

  }

  document.body.style.overflow = "";

}


/* =========================================================
   OPEN CHANT
========================================================= */

chantButtons.forEach(
  function (button) {

    button.addEventListener(
      "click",
      function () {

        if (!chantModal) {
          return;
        }


        const chantId =
          button.dataset.chant;


        if (!chantId) {
          return;
        }


        /* -----------------------------------------
           TITLE
        ----------------------------------------- */

        if (modalTitle) {

          modalTitle.textContent =
            chantTitles[chantId] ||
            "บทสวดมนต์";

        }


        /* -----------------------------------------
           HIDE ALL CHANTS
        ----------------------------------------- */

        chantReadings.forEach(
          function (reading) {

            reading.style.display =
              "none";

          }
        );


        /* -----------------------------------------
           SHOW SELECTED CHANT
        ----------------------------------------- */

        const selectedChant =
          document.querySelector(
            '.chant-reading[data-content="' +
            chantId +
            '"]'
          );


        if (selectedChant) {

          selectedChant.style.display =
            "flex";

        }


        /* -----------------------------------------
           OPEN MODAL
        ----------------------------------------- */

        chantModal.classList.add(
          "open"
        );

        document.body.style.overflow =
          "hidden";

      }
    );

  }
);


/* =========================================================
   CLOSE BUTTON
========================================================= */

if (closeModal) {

  closeModal.addEventListener(
    "click",
    closeChantModal
  );

}


/* =========================================================
   CLICK BACKGROUND TO CLOSE
========================================================= */

if (modalBg) {

  modalBg.addEventListener(
    "click",
    closeChantModal
  );

}


/* =========================================================
   ESC TO CLOSE
========================================================= */

document.addEventListener(
  "keydown",
  function (event) {

    if (
      event.key === "Escape" &&
      chantModal &&
      chantModal.classList.contains("open")
    ) {

      closeChantModal();

    }

  }
);


/* =========================================================
   HIDE ALL CHANTS AT START
========================================================= */

chantReadings.forEach(
  function (reading) {

    reading.style.display =
      "none";

  }
);
/* =========================================================
   RELAX — SOFT NATURAL SOUNDS
========================================================= */

const soundName =
  document.getElementById("soundName");

const soundImage =
  document.getElementById("soundImage");

const soundDescription =
  document.getElementById("soundDescription");

const playSound =
  document.getElementById("playSound");

const soundButtons =
  document.querySelectorAll(".sound-button");


/* =========================================================
   AUDIO SYSTEM
========================================================= */

let relaxAudioContext = null;

let relaxMaster = null;

let relaxSources = [];

let relaxPlaying = false;

let currentRelaxSound = "rain";


/* =========================================================
   GET AUDIO CONTEXT
========================================================= */

function getRelaxAudioContext() {

  if (relaxAudioContext) {
    return relaxAudioContext;
  }

  const AudioContext =
    window.AudioContext ||
    window.webkitAudioContext;

  if (!AudioContext) {
    return null;
  }

  relaxAudioContext =
    new AudioContext();

  relaxMaster =
    relaxAudioContext.createGain();

  relaxMaster.gain.value = 0;

  relaxMaster.connect(
    relaxAudioContext.destination
  );

  return relaxAudioContext;

}


/* =========================================================
   FADE IN
========================================================= */

function fadeRelaxIn() {

  if (!relaxMaster) {
    return;
  }

  const now =
    relaxAudioContext.currentTime;

  relaxMaster.gain.cancelScheduledValues(
    now
  );

  relaxMaster.gain.setValueAtTime(
    0,
    now
  );

  relaxMaster.gain.linearRampToValueAtTime(
    0.32,
    now + 1.5
  );

}


/* =========================================================
   FADE OUT
========================================================= */

function fadeRelaxOut(callback) {

  if (!relaxMaster) {

    if (callback) {
      callback();
    }

    return;

  }

  const now =
    relaxAudioContext.currentTime;

  relaxMaster.gain.cancelScheduledValues(
    now
  );

  relaxMaster.gain.setValueAtTime(
    relaxMaster.gain.value,
    now
  );

  relaxMaster.gain.linearRampToValueAtTime(
    0,
    now + 0.8
  );

  setTimeout(
    function () {

      if (callback) {
        callback();
      }

    },
    850
  );

}


/* =========================================================
   STOP ALL RELAX SOUNDS
========================================================= */

function stopRelaxSounds() {

  relaxSources.forEach(
    function (source) {

      try {

        source.stop();

      } catch (error) {

        /* already stopped */

      }

    }
  );

  relaxSources = [];

}


/* =========================================================
   🌧️ RAIN
   ฝนเบา ๆ แต่ได้ยินชัด
========================================================= */

function createRainSound(ctx) {

  const bufferSize =
    ctx.sampleRate * 2;

  const buffer =
    ctx.createBuffer(
      1,
      bufferSize,
      ctx.sampleRate
    );

  const data =
    buffer.getChannelData(0);


  for (
    let i = 0;
    i < bufferSize;
    i++
  ) {

    data[i] =
      Math.random() * 2 - 1;

  }


  const noise =
    ctx.createBufferSource();

  noise.buffer =
    buffer;

  noise.loop =
    true;


  const filter =
    ctx.createBiquadFilter();

  filter.type =
    "lowpass";

  filter.frequency.value =
    1900;

  filter.Q.value =
    0.15;


  const gain =
    ctx.createGain();

  /* เพิ่มเสียงฝนให้ได้ยินชัด */

  gain.gain.value =
    0.095;


  noise.connect(
    filter
  );

  filter.connect(
    gain
  );

  gain.connect(
    relaxMaster
  );

  noise.start();

  relaxSources.push(
    noise
  );

}


/* =========================================================
   🌿 FOREST
   ป่า + ลมเบา ๆ
========================================================= */

function createForestSound(ctx) {

  const bufferSize =
    ctx.sampleRate * 2;

  const buffer =
    ctx.createBuffer(
      1,
      bufferSize,
      ctx.sampleRate
    );

  const data =
    buffer.getChannelData(0);


  for (
    let i = 0;
    i < bufferSize;
    i++
  ) {

    data[i] =
      Math.random() * 2 - 1;

  }


  /* =====================================================
     FOREST
  ===================================================== */

  const forest =
    ctx.createBufferSource();

  forest.buffer =
    buffer;

  forest.loop =
    true;


  const forestFilter =
    ctx.createBiquadFilter();

  forestFilter.type =
    "lowpass";

  forestFilter.frequency.value =
    900;

  forestFilter.Q.value =
    0.5;


  const forestGain =
    ctx.createGain();

  forestGain.gain.value =
    0.10;


  forest.connect(
    forestFilter
  );

  forestFilter.connect(
    forestGain
  );

  forestGain.connect(
    relaxMaster
  );

  forest.start();

  relaxSources.push(
    forest
  );


  /* =====================================================
     GENTLE WIND
  ===================================================== */

  const wind =
    ctx.createBufferSource();

  wind.buffer =
    buffer;

  wind.loop =
    true;


  const windFilter =
    ctx.createBiquadFilter();

  windFilter.type =
    "bandpass";

  windFilter.frequency.value =
    500;

  windFilter.Q.value =
    0.4;


  const windGain =
    ctx.createGain();

  windGain.gain.value =
    0.055;


  wind.connect(
    windFilter
  );

  windFilter.connect(
    windGain
  );

  windGain.connect(
    relaxMaster
  );

  wind.start();

  relaxSources.push(
    wind
  );

}


/* =========================================================
   💧 WATER
   น้ำไหลเบา ๆ แต่ได้ยินชัด
========================================================= */

function createWaterSound(ctx) {

  const bufferSize =
    ctx.sampleRate * 2;

  const buffer =
    ctx.createBuffer(
      1,
      bufferSize,
      ctx.sampleRate
    );

  const data =
    buffer.getChannelData(0);


  for (
    let i = 0;
    i < bufferSize;
    i++
  ) {

    data[i] =
      Math.random() * 2 - 1;

  }


  const water =
    ctx.createBufferSource();

  water.buffer =
    buffer;

  water.loop =
    true;


  const filter =
    ctx.createBiquadFilter();

  filter.type =
    "lowpass";

  filter.frequency.value =
    1250;

  filter.Q.value =
    0.25;


  const gain =
    ctx.createGain();

  /* เพิ่มเสียงน้ำให้ใกล้เคียง Rain */

  gain.gain.value =
    0.085;


  water.connect(
    filter
  );

  filter.connect(
    gain
  );

  gain.connect(
    relaxMaster
  );

  water.start();

  relaxSources.push(
    water
  );

}


/* =========================================================
   🔔 BELLS
   ระฆังเบา ๆ
========================================================= */

function createBellSound(ctx) {

  function playBell() {

    if (!relaxPlaying) {
      return;
    }


    const now =
      ctx.currentTime;


    const frequencies = [
      520,
      780,
      1040
    ];


    frequencies.forEach(
      function (
        frequency,
        index
      ) {

        const oscillator =
          ctx.createOscillator();

        const gain =
          ctx.createGain();


        oscillator.type =
          "sine";


        oscillator.frequency.value =
          frequency;


        gain.gain.setValueAtTime(
          0.0001,
          now
        );


        gain.gain.exponentialRampToValueAtTime(
          0.16 / (index + 1),
          now + 0.03
        );


        gain.gain.exponentialRampToValueAtTime(
          0.0001,
          now + 4
        );


        oscillator.connect(
          gain
        );

        gain.connect(
          relaxMaster
        );


        oscillator.start(
          now
        );

        oscillator.stop(
          now + 4.1
        );

      }
    );


    setTimeout(
      playBell,
      5500
    );

  }


  playBell();

}


/* =========================================================
   🪷 GUANYIN — MP3 FROM GITHUB
   เล่นไฟล์เสียงโดยตรงในหน้าเว็บ ไม่เปิด YouTube
========================================================= */

const GUANYIN_AUDIO_URL =
  "https://github.com/peemaipompom-dotcom/peaceful-mind-audio01/raw/refs/heads/main/%E0%B8%94%E0%B8%99%E0%B8%95%E0%B8%A3%E0%B8%B5%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B9%80%E0%B8%A5%E0%B8%87%20%E0%B9%80%E0%B8%9E%E0%B8%A5%E0%B8%87%E0%B8%9E%E0%B8%A3%E0%B8%B0%E0%B9%82%E0%B8%9E%E0%B8%98%E0%B8%B4%E0%B8%AA%E0%B8%B1%E0%B8%95%E0%B8%A7%E0%B9%8C%E0%B8%81%E0%B8%A7%E0%B8%99%E0%B8%AD%E0%B8%B4%E0%B8%A1%20%E0%B8%9E%E0%B8%A3%E0%B8%B0%E0%B9%82%E0%B8%9E%E0%B8%98%E0%B8%B4%E0%B8%AA%E0%B8%B1%E0%B8%95%E0%B8%A7%E0%B9%8C%E0%B8%81%E0%B8%A7%E0%B8%99%E0%B8%AD%E0%B8%B4%E0%B8%A1%20%E0%B9%80%E0%B8%88%E0%B9%89%E0%B8%B2%E0%B9%81%E0%B8%A1%E0%B9%88%E0%B8%81%E0%B8%A7%E0%B8%99%E0%B8%AD%E0%B8%B4%E0%B8%A1%20%E0%B8%94%E0%B8%99%E0%B8%95%E0%B8%A3%E0%B8%B5%20%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B9%80%E0%B8%A5%E0%B8%87%20relaxingm.mp3";

const guanyinAudio =
  new Audio(GUANYIN_AUDIO_URL);

guanyinAudio.loop = true;
guanyinAudio.preload = "auto";
guanyinAudio.volume = 0.20;

guanyinAudio.addEventListener("error", function () {
  relaxPlaying = false;
  if (playSound) {
    playSound.textContent = "▶";
  }
  showToast("ไฟล์เพลง Guanyin โหลดไม่ได้ ลองตรวจสอบลิงก์ MP3 อีกครั้ง 🪷");
});

function playGuanyin() {

  if (!guanyinAudio) {
    return;
  }

  const playPromise =
    guanyinAudio.play();

  if (playPromise && typeof playPromise.catch === "function") {

    playPromise.catch(function () {

      relaxPlaying = false;

      if (playSound) {
        playSound.textContent = "▶";
      }

      showToast(
        "ไม่สามารถเล่นเพลง Guanyin ได้ ลองกด ▶ อีกครั้ง"
      );

    });

  }

}

function pauseGuanyin() {

  if (!guanyinAudio) {
    return;
  }

  guanyinAudio.pause();

}


/* =========================================================
   START RELAX SOUND
========================================================= */

function startRelaxSound() {

  /*
    Guanyin ใช้ไฟล์ MP3 โดยตรง
    ไม่ใช้ YouTube และไม่เปิดหน้าต่างใหม่
  */

  if (
    currentRelaxSound === "guanyin"
  ) {

    relaxPlaying =
      true;

    stopRelaxSounds();

    /*
      ปิดเสียงธรรมชาติของระบบ
    */

    if (relaxMaster) {

      const now =
        relaxAudioContext.currentTime;

      relaxMaster.gain.cancelScheduledValues(
        now
      );

      relaxMaster.gain.setValueAtTime(
        0,
        now
      );

    }

    playGuanyin();

    if (playSound) {

      playSound.textContent =
        "❚❚";

    }

    return;

  }


  /*
    ถ้าเปลี่ยนจาก Guanyin
    ให้หยุดเพลง MP3 ก่อน
  */

  pauseGuanyin();


  const ctx =
    getRelaxAudioContext();


  if (!ctx) {

    showToast(
      "เบราว์เซอร์นี้ไม่รองรับเสียง"
    );

    return;

  }


  if (
    ctx.state === "suspended"
  ) {

    ctx.resume();

  }


  /*
    สำคัญ:
    ตั้ง true ก่อนสร้างเสียง
    เพื่อให้ Bells เล่นได้
  */

  relaxPlaying =
    true;


  stopRelaxSounds();


  if (
    currentRelaxSound === "rain"
  ) {

    createRainSound(
      ctx
    );

  }


  if (
    currentRelaxSound === "forest"
  ) {

    createForestSound(
      ctx
    );

  }


  if (
    currentRelaxSound === "water"
  ) {

    createWaterSound(
      ctx
    );

  }


  if (
    currentRelaxSound === "bells"
  ) {

    createBellSound(
      ctx
    );

  }


  fadeRelaxIn();


  if (playSound) {

    playSound.textContent =
      "❚❚";

  }

}


/* =========================================================
   STOP RELAX SOUND
========================================================= */

function stopRelaxSound() {

  relaxPlaying =
    false;

  pauseGuanyin();


  if (
    relaxAudioContext &&
    relaxMaster
  ) {

    fadeRelaxOut(
      function () {

        stopRelaxSounds();

      }
    );

  } else {

    stopRelaxSounds();

  }


  if (playSound) {

    playSound.textContent =
      "▶";

  }

}


/* =========================================================
   SELECT SOUND
========================================================= */

soundButtons.forEach(
  function (button) {

    button.addEventListener(
      "click",
      function () {

        soundButtons.forEach(
          function (item) {

            item.classList.remove(
              "active"
            );

          }
        );


        button.classList.add(
          "active"
        );


        currentRelaxSound =
          button.dataset.sound ||
          "rain";


        const name =
          button.dataset.name ||
          "";


        const icon =
          button.dataset.icon ||
          "🎧";


        if (soundName) {

          soundName.textContent =
            name;

        }


        if (soundImage) {

          soundImage.textContent =
            icon;

        }


        if (soundDescription) {

          if (
            currentRelaxSound ===
            "guanyin"
          ) {

            soundDescription.textContent =
              "เพลงเจ้าแม่กวนอิมสำหรับช่วงเวลาที่อยากพักใจ 🪷";

          } else {

            soundDescription.textContent =
              "เสียงเบา ๆ สำหรับช่วงเวลาที่อยากพักใจ";

          }

        }


        /*
          ถ้ากำลังเล่นอยู่
          เปลี่ยนเสียงทันที
        */

        if (relaxPlaying) {

          startRelaxSound();

        }

      }
    );

  }
);


/* =========================================================
   PLAY / PAUSE
========================================================= */

if (playSound) {

  playSound.addEventListener(
    "click",
    function () {

      if (relaxPlaying) {

        stopRelaxSound();

      } else {

        startRelaxSound();

      }

    }
  );

}


/* =========================================================
   CLEAN UP
========================================================= */

window.addEventListener(
  "beforeunload",
  function () {

    pauseGuanyin();

    stopRelaxSounds();

    if (relaxAudioContext) {

      relaxAudioContext.close();

    }

  }
);


  /* =========================================================
     GOOD DEED
  ========================================================= */

  const deedModal =
    document.getElementById(
      "deedModal"
    );

  const closeDeed =
    document.getElementById(
      "closeDeed"
    );

  const deedModalBg =
    document.querySelector(
      ".deed-modal-bg"
    );

  const deedInput =
    document.getElementById(
      "deedInput"
    );

  const saveDeed =
    document.getElementById(
      "saveDeed"
    );

  const savedDeed =
    document.getElementById(
      "savedDeed"
    );

  const goodDeedButton =
    document.getElementById(
      "goodDeed"
    );


  function getTodayKey() {

    const date =
      new Date();


    const year =
      date.getFullYear();


    const month =
      String(
        date.getMonth() + 1
      ).padStart(
        2,
        "0"
      );


    const day =
      String(
        date.getDate()
      ).padStart(
        2,
        "0"
      );


    return (
      "peacefulGoodDeed_" +
      year +
      "-" +
      month +
      "-" +
      day
    );

  }


  function openGoodDeedModal() {

    if (!deedModal) {
      return;
    }


    const saved =
      localStorage.getItem(
        getTodayKey()
      ) || "";


    if (deedInput) {

      deedInput.value =
        saved;

    }


    if (savedDeed) {

      savedDeed.textContent =
        saved
          ? "วันนี้คุณบันทึกความดีไว้แล้ว 💗"
          : "";

    }


    deedModal.classList.add(
      "open"
    );


    document.body.style.overflow =
      "hidden";


    setTimeout(
      function () {

        if (deedInput) {

          deedInput.focus();

        }

      },
      100
    );

  }


  function closeGoodDeedModal() {

    if (deedModal) {

      deedModal.classList.remove(
        "open"
      );

    }


    document.body.style.overflow =
      "";

  }


  if (goodDeedButton) {

    goodDeedButton.addEventListener(
      "click",
      openGoodDeedModal
    );

  }


  const goodDeedMenu =
    document.querySelector(
      '.menu-card[href="#good-deed"]'
    );


  if (goodDeedMenu) {

    goodDeedMenu.addEventListener(
      "click",
      function (event) {

        event.preventDefault();

        openGoodDeedModal();

      }
    );

  }


  if (closeDeed) {

    closeDeed.addEventListener(
      "click",
      closeGoodDeedModal
    );

  }


  if (deedModalBg) {

    deedModalBg.addEventListener(
      "click",
      closeGoodDeedModal
    );

  }


  if (saveDeed) {

    saveDeed.addEventListener(
      "click",
      function () {

        if (!deedInput) {
          return;
        }


        const deed =
          deedInput.value.trim();


        if (!deed) {

          showToast(
            "ลองเขียนความดีของวันนี้ก่อนนะ 🪷"
          );


          deedInput.focus();


          return;

        }


        localStorage.setItem(
          getTodayKey(),
          deed
        );


        if (savedDeed) {

          savedDeed.textContent =
            "บันทึกความดีของวันนี้แล้ว 💗";

        }


        showToast(
          "บันทึกความดีของวันนี้แล้ว 💗"
        );

      }
    );

  }


  /* =========================================================
     WORLD GOOD DEEDS
  ========================================================= */

  const worldDeedModal =
    document.getElementById(
      "worldDeedModal"
    );

  const openWorldDeeds =
    document.getElementById(
      "openWorldDeeds"
    );

  const closeWorldDeeds =
    document.getElementById(
      "closeWorldDeeds"
    );

  const worldDeedOverlay =
    document.querySelector(
      ".world-deed-overlay"
    );

  const writeWorldDeed =
    document.getElementById(
      "writeWorldDeed"
    );


  function openWorldDeedModal() {

    if (!worldDeedModal) {
      return;
    }


    worldDeedModal.classList.add(
      "active"
    );


    document.body.style.overflow =
      "hidden";

  }


  function closeWorldDeedModal() {

    if (!worldDeedModal) {
      return;
    }


    worldDeedModal.classList.remove(
      "active"
    );


    document.body.style.overflow =
      "";

  }


  if (openWorldDeeds) {

    openWorldDeeds.addEventListener(
      "click",
      openWorldDeedModal
    );

  }


  if (closeWorldDeeds) {

    closeWorldDeeds.addEventListener(
      "click",
      closeWorldDeedModal
    );

  }


  if (worldDeedOverlay) {

    worldDeedOverlay.addEventListener(
      "click",
      closeWorldDeedModal
    );

  }


  if (writeWorldDeed) {

    writeWorldDeed.addEventListener(
      "click",
      function () {

        closeWorldDeedModal();


        setTimeout(
          function () {

            openGoodDeedModal();

          },
          150
        );

      }
    );

  }


  /* =========================================================
     ESC
  ========================================================= */

  document.addEventListener(
    "keydown",
    function (event) {

      if (
        event.key !== "Escape"
      ) {

        return;

      }


      closeChantModal();

      closeGoodDeedModal();

      closeWorldDeedModal();

    }
  );


  /* =========================================================
     MOBILE MENU
  ========================================================= */

  const mobileMenu =
    document.getElementById(
      "mobileMenu"
    );

  const nav =
    document.querySelector(
      ".nav"
    );


  if (
    mobileMenu &&
    nav
  ) {

    mobileMenu.addEventListener(
      "click",
      function () {

        nav.classList.toggle(
          "open"
        );

      }
    );


    nav.querySelectorAll(
      "a"
    ).forEach(
      function (link) {

        link.addEventListener(
          "click",
          function () {

            nav.classList.remove(
              "open"
            );

          }
        );

      }
    );

  }


  /* =========================================================
     INITIALIZE
  ========================================================= */

  updateTimer();

});