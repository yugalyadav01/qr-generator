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
      document.getElementById("type").value = "text";
      changeType();
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
  changeType();
  renderHistory();
};
