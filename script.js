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