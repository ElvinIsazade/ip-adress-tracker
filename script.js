const ip_adress=document.querySelector(".ip_adress");
const ip_location=document.querySelector(".location");
const utc=document.querySelector(".utc");
const isp=document.querySelector(".isp");
const form =document.querySelector("form");
const input =document.querySelector("#ip-search");
const info =document.querySelector(".ip_info");
var map = L.map('map').setView([40.4178355, 49.8028767], 13);

L.tileLayer("https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=u1jL4sXRX0D88qSxUpzs",{
    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
}).addTo(map);
var marker = L.marker([40.4178355, 49.8028767]).addTo(map);



form.addEventListener("submit", (e)=>{
    e.preventDefault();
    if(input.value.trim()==""){
        alert("please enter an ip adress");
    }
    else{
        info.style.opacity="1";
        
        getIp()
        
        // fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_NZBOXx7OgQTUPThBuSM10cIpxptKi&ipAddress=${input.value}`)
        // .then(result => result.json())
        // .then(data=>{
        //     console.log(data);
        //     ip_adress.innerHTML=data.ip;
        //     ip_location.innerHTML=`${data.location.city} ${data.location.country} ${data.location.postalCode}`;
        //     utc.innerHTML=`${data.location.timezone}`;
        //     isp.innerHTML=`${data.isp}`;
        //     map.setView([data.location.lat,data.location.lng]);
        //     L.marker([data.location.lat, data.location.lng]).addTo(map);
        // })
        // .catch(err=> alert("Something went wrong"));
    }
});
async function getIp(){
    try{
        const api= await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_NZBOXx7OgQTUPThBuSM10cIpxptKi&ipAddress=${input.value}`)
        const data = await api.json();
        console.log(api);
        if(!api.ok){
            throw Error("Something went wrong");
        }
        ip_adress.innerHTML=data.ip;
        ip_location.innerHTML=`${data.location.city} ${data.location.country} ${data.location.postalCode}`;
        utc.innerHTML=`${data.location.timezone}`;
        isp.innerHTML=`${data.isp}`;
        map.setView([data.location.lat,data.location.lng]);
        L.marker([data.location.lat, data.location.lng]).addTo(map);
    }
    catch (err){
        alert(err);
    }
}

