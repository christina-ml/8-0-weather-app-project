let url = "https://wttr.in/";
let city = "Detroit";
let format= "?format=j1";

fetch(`${url}${city}${format}`)
    .then((res)=>{
        return res.json();
    }).then((data)=>{
        console.log(data);

    }).catch((err)=>{
        console.log(err);
    })