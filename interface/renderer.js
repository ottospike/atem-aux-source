const { contextBridge, ipcRenderer } = require("electron");

const addButton = document
  .getElementById("addButton")
  .addEventListener("click", () => {
    createElement();
  });

const createElement = () => {
  let contentToAdd = document.querySelector("#idBank");
  let bankInput = document.createElement("div");
  let keyInput = document.createElement("input");
  let atem_targetInput = document.createElement("input");

  let bankNumber = contentToAdd.childElementCount;

  bankInput.innerHTML = `${bankNumber}.`;

  keyInput.classList.add("bankInput", "keyInput");
  keyInput.id = `bank${bankNumber}_key`;
  keyInput.setAttribute("oninput", "handleKeyInput(this)");

  atem_targetInput.classList.add("bankInput", "atemInput");
  atem_targetInput.id = `bank${bankNumber}_target`;

  document.getElementById('idBank').appendChild(bankInput);
  document.getElementById('idKey').appendChild(keyInput);
  document.getElementById('idAtem').appendChild(atem_targetInput);
};

const handleKeyInput = (arg) => {
  const keySet = new Set(); //KINDA SLOW
  document.querySelectorAll(".keyInput").forEach((input) => {
    let cleanInput = input.value.replace(/\s/g, "");
    cleanInput != "" ? keySet.add(cleanInput.toUpperCase()) : "";
  });
  ipcRenderer.send("keyRegister", Array.from(keySet));
  // ipcRenderer.on('replyKeyRegister', (event, response) =>console.log(response))
};

ipcRenderer.invoke('session:save', 'mydata');
