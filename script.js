function generateQR(){

let text=document.getElementById("text").value;

if(text===""){
alert("Enter text first");
return;
}

let qr="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data="+encodeURIComponent(text);

document.getElementById("qr").src=qr;

// Save to Firebase
db.collection("qrcodes").add({
text:text,
created:new Date().toISOString()
})
.then(()=>{
loadHistory();
});

}

function loadHistory(){

let list=document.getElementById("history");

list.innerHTML="";

db.collection("qrcodes").get().then((snapshot)=>{

snapshot.forEach((doc)=>{

let data=doc.data();

let li=document.createElement("li");

li.textContent=data.text;

list.appendChild(li);

});

});

}

loadHistory();
function downloadQR() {

let img = document.getElementById("qr");

if (!img.src || img.src === "") {
alert("Generate QR first");
return;
}

fetch(img.src)
.then(response => response.blob())
.then(blob => {

let url = window.URL.createObjectURL(blob);

let a = document.createElement("a");
a.href = url;
a.download = "qrcode.png";

document.body.appendChild(a);
a.click();

document.body.removeChild(a);
window.URL.revokeObjectURL(url);

});

}
function changeType(){
  let type = document.getElementById("type").value;
  let inputs = document.getElementById("inputs");

  if(type === "text"){
    inputs.innerHTML = `<input id="data" placeholder="Enter text">`;
  }

  if(type === "wifi"){
    inputs.innerHTML = `
      <input id="ssid" placeholder="WiFi Name">
      <input id="pass" placeholder="Password">
    `;
  }

  if(type === "upi"){
    inputs.innerHTML = `
      <input id="upi" placeholder="UPI ID">
      <input id="name" placeholder="Name">
      <input id="amount" placeholder="Amount">
    `;
  }
}

changeType();
document.addEventListener("input", function(e){
  if(e.target.closest("#inputs")){
    generateQR();
  }
});
function setType(t){
  document.getElementById("type").value = t;
  changeType();
}
function shareQR() {
  const canvas = document.getElementById("qrCanvas");

  if (!canvas) {
    alert("QR not generated yet!");
    return;
  }

  canvas.toBlob(async (blob) => {
    const file = new File([blob], "qr.png", { type: "image/png" });

    if (navigator.share) {
      try {
        await navigator.share({
          title: "My QR Code",
          text: "Scan this QR",
          files: [file]
        });
      } catch (err) {
        alert("Sharing cancelled or not supported");
      }
    } else {
      alert("Sharing not supported in your browser");
    }
  });
}
