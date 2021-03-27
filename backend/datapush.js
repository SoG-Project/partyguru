//For pushing this data into the database
import axios from 'axios';


const partypack ={
    products:[
{    "name":"Fortnite",
    "image":"/images/p2.jpeg",
"price":150,
"guruid":["605f83e71a24316b543c6fcb","605f83e71a24316b543c6fca","605f83e71a24316b543c6fc7"],
"description":"play fortnite",
"scheduleitems":["PVP","PVE","birthdaycheer"]},

{"name":"Minecraft",
    "image":"/images/p1.jpeg",
"price":150,
"guruid":["605f83e71a24316b543c6fcb","605f83e71a24316b543c6fca","605f83e71a24316b543c6fc8"],
"description":"play minecraft",
"scheduleitems":["PVP","MOD1","MOD2","birthdaycheer"]},

{"name":"Dwarf Fortress",
    "image":"/images/p3.jpeg",
"price":150,
"guruid":["605f83e71a24316b543c6fc9","605f83e71a24316b543c6fc8","605f83e71a24316b543c6fc7"],
"description":"Play dorf fortress",
"scheduleitems":["PVP","PVE","birthdaycheer"]},

{ "name":"Quake 3",
    "image":"/images/p4.jpeg",
"price":150,
"guruid":["605f83e71a24316b543c6fc9","605f83e71a24316b543c6fc8"],
"description":"play quake 3",
"scheduleitems":["PVP","PVE","birthdaycheer"]},
    ]
}

const gurus={
    gurus:[
        
        {"name":"Tarmo",
            "nick":"Tarppizz",
            "email":"tarppizzy@gmail.com",
            "partyreservations":[1],
            "video":"https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            "image":"https://images.pexels.com/photos/2269872/pexels-photo-2269872.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
            "availability":[],
            "bio":"Tarppi is a cool guy"  
        },

        {
            "name":"Diplo Ahlström",
            "nick":"hcdude98",
            "email":"dipdip@dipdip.com",
            "partyreservations":[2],
            "video":"https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            "image":"https://upload.wikimedia.org/wikipedia/en/thumb/a/a6/Pok%C3%A9mon_Pikachu_art.png/220px-Pok%C3%A9mon_Pikachu_art.png",
            "availability":[],
            "bio":"Diplo is my name, fucking up motherfuckers is my game!"  
        },

        {
            "name":"Longo Dongo",
            "nick":"Longa Vonga",
            "email":"zong@vong.com",
            "partyreservations":[1,2,3],
            "video":"https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            "image":"https://upload.wikimedia.org/wikipedia/en/thumb/a/a6/Pok%C3%A9mon_Pikachu_art.png/220px-Pok%C3%A9mon_Pikachu_art.png",
            "availability":[],
            "bio":"Game on!"  
        },
        {
            "name":"Sbirgle",
            "nick":"gamergirl12",
            "email":"sbirgel@dirgle.com",
            "partyreservations":[3],
            "video":"https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            "image":"https://www.rd.com/wp-content/uploads/2019/09/GettyImages-621924830.jpg",
            "availability":[],
            "bio":"Game off!!"  
        },
		
		{
            "name":"Son Goku",
            "nick":"OrangeAnimeMan",
            "email":"oranssianimemies@gmail.com",
            "partyreservations":[1],
            "video":"https://www.youtube.com/watch?v=SiMHTK15Pik",
            "image": "https://theflaneur88.weebly.com/uploads/4/5/4/2/45422931/3171005_orig.jpg",
            "availability":[],
            "bio":"Welcome to the School of Goku!"  
        },
    ]
}

const attendees={
    attendees:[
        {
            "partyid":"605f8bcd8dfd970aa770584a",
            "attendees":[
                {"name":"tommi erkkilä",
                "email":"erkkilan.tomppa@gmail.com",
                "attends":true,
                "discord":true,
                "game":true},
                {"name":"Simo Small-Dip",
                "email":"jonne@web.com",
                "attends":false,
                "discord":true,
                "game":true}
            ]
        },
        {
            "partyid":"605f8bcd8dfd970aa770584b",
            "attendees":[
                {"name":"Juhani Saksikäsi",
                "email":"juhani@johnnydepp.zx",
                "attends":true,
                "discord":true,
                "game":true},
                {"name":"pirpuli tomahawk",
                "email":"lasersight@gmail.com",
                "attends":false,
                "discord":true,
                "game":true}
            ]
            
        },
    ]
}

const partyinfo={
    parties:[
        {
            "packageid":"605f8a595b54c3088fc44d12",
            "guruid":"605f83e71a24316b543c6fc7",
            "datetime":"2021-04-23T18:25:43.511Z",
            "duration":2,
            "email":"siiiiimppa@diudau.com",
            "phone":"+358403683295",
            "num_attendees":9,
            "schedule":["PVP"],
            "likes":["guns","explosions","adventure"],
            "description":"Tervetuloa mun fortnitepartyyn!"
            
        },
        {
            "packageid":"605f8a595b54c3088fc44d13",
            "guruid":"605f83e71a24316b543c6fc8",
            "datetime":"2021-05-23T18:25:43.511Z",
            "duration":2.5,
            "email":"trumpetti_pena@avaruus.org",
            "phone":"+358403385926",
            "num_attendees":8,
            "schedule":["MOD1","Birthday cheer","MOD2"],
            "likes":["smashing dwarves","killing dwarves","dwarf explosion"],
            "description":"Tervetuloa mun minecraftpartyyn!"
            
        },
    ]
}

//gurus
/*
for(var i=0;i<gurus.gurus.length;i++){
 axios.post('http://localhost:5001/api/gurus',gurus.gurus[i]).then(response=>{
     console.log(response)
 })   
}
*/

//packages
/*
for(var i=0;i<partypack.products.length;i++){
    axios.post('http://localhost:5001/api/packages',partypack.products[i]).then(response=>{
        console.log(response)
    })
    .catch(error => {console.log(error.message);});
}*/

//Parties
/*
for(var i=0; i<partyinfo.parties.length;i++){
    axios.post('http://localhost:5001/api/parties',partyinfo.parties[i]).then(response=>{
        console.log(response);
    })
    .catch(error => {console.log(error.message);});
}
*/

//Attendees
/*
for(var i=0;i<attendees.attendees.length;i++){
    axios.post('http://localhost:5001/api/attendees',attendees.attendees[i]).then(response=>{
        console.log(response);
    })
    .catch(error => {console.log(error.message);});
}
*/