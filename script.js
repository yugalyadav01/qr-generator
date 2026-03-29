// ---------- GENERATE QR ----------
function generateQR() {
  let text = document.getElementById("text").value;
  if(!text) return;

  // Generate QR code (using your existing QR library)
  // Example if you use QRCode.js
  let qrDiv = document.getElementById("qrcode");
  qrDiv.innerHTML = ""; // Clear old QR
  new QRCode(qrDiv, {
    text: text,
    width: 200,
    height: 200,
  });

  // Save to history only when QR is generated
  saveHistory(text);
}

// ---------- SAVE HISTORY ----------
function saveHistory(text){
  if(!text) return;

  let old = JSON.parse(localStorage.getItem("qrHistory")) || [];

  // Prevent duplicates
  if(!old.includes(text)){
    old.unshift(text);
  }

  localStorage.setItem("qrHistory", JSON.stringify(old));
  renderHistory();
}

// ---------- RENDER HISTORY ----------
function renderHistory(){
  let historyDiv = document.getElementById("history");
  historyDiv.innerHTML = "";

  let data = JSON.parse(localStorage.getItem("qrHistory")) || [];

  if(data.length === 0){
    historyDiv.innerHTML = "<div style='color:gray;font-size:12px;'>No QR history yet</div>";
    return;
  }

  data.forEach((item, index)=>{
    let div = document.createElement("div");
    div.style.display = "flex";
    div.style.justifyContent = "space-between";
    div.style.alignItems = "center";
    div.style.cursor = "pointer";
    div.style.marginBottom = "5px";

    // QR text
    let span = document.createElement("span");
    span.innerText = item;
    span.onclick = ()=>{
      document.getElementById("text").value = item;
      generateQR();
    };

    // Delete individual button
    let delBtn = document.createElement("button");
    delBtn.innerText = "🗑️";
    delBtn.style.background="transparent";
    delBtn.style.color="red";
    delBtn.style.border="none";
    delBtn.style.cursor="pointer";
    delBtn.onclick = (e)=>{
      e.stopPropagation(); // Prevent triggering QR regenerate
      data.splice(index,1);
      localStorage.setItem("qrHistory", JSON.stringify(data));
      renderHistory();
    };

    div.appendChild(span);
    div.appendChild(delBtn);
    historyDiv.appendChild(div);
  });
}

// ---------- CLEAR ALL HISTORY ----------
function clearHistory(){
  if(confirm("Are you sure you want to delete all QR history?")){
    localStorage.removeItem("qrHistory");
    renderHistory();
    alert("History cleared!");
  }
}

// ---------- INITIALIZE ----------
window.onload = ()=>{
  renderHistory();

  // Attach click event to generate button
  let generateBtn = document.getElementById("generateBtn");
  if(generateBtn){
    generateBtn.addEventListener("click", generateQR);
  }

  // Attach click event to clear history button (if exists)
  let clearBtn = document.getElementById("clearHistoryBtn");
  if(clearBtn){
    clearBtn.addEventListener("click", clearHistory);
  }
};function setType(value){
  document.getElementById("type").value = value;
  changeType();
}