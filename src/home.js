import {
    initializeApp
} from 'firebase/app';
import {
    getDatabase,
    ref,
    set,
    onValue,
    push
} from 'firebase/database';

import {
    getFirebaseConfig
} from './firebase-config';

//Elements
const switchCheckbox = document.getElementById("switchCheckbox");
const scores = document.getElementById("scores");
const positions = document.getElementById("positions");
const postionsTable = document.getElementById("postionsTable");

// Inicializar firebase
const firebaseAppConfig = getFirebaseConfig();
const firebaseApp = initializeApp(firebaseAppConfig);

//variables
let showPositions = false;


const switchView = (e, event) => {
    if (switchCheckbox.checked) {
        showPositions = true;
    } else {
        showPositions = false;
    }
    showView();
    getTeams();
}

function getTeams() {
    const db = getDatabase();
    const dbRef = ref(db, 'teams');
    onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        updateTable(data);
    });
}

function updateTable(info) {

    if (info) {
        postionsTable.innerHTML = "";
        let tableHead = document.createElement("tr");
        let pos = document.createElement("th");
        pos.innerHTML = "POS";
        let equipo = document.createElement("th");
        equipo.className="teamNameHead";
        equipo.innerHTML = "Equipo";
        let pj = document.createElement("th");
        pj.innerHTML = "PJ";
        let pg = document.createElement("th");
        pg.innerHTML = "PG";
        let pp = document.createElement("th");
        pp.innerHTML = "PP";
        let pts = document.createElement("th");
        pts.innerHTML = "PTS";
        let ptfav = document.createElement("th");
        ptfav.innerHTML = "PF";
        let ptcon = document.createElement("th");
        ptcon.innerHTML = "PC";
        let ppp = document.createElement("th");
        ppp.innerHTML = "%";
        let dif = document.createElement("th");
        dif.innerHTML = "DIF";
        let racha = document.createElement("th");
        racha.innerHTML = "RACHA";

        postionsTable.appendChild(tableHead);
        tableHead.appendChild(pos);
        tableHead.appendChild(equipo);
        tableHead.appendChild(pj);
        tableHead.appendChild(pg);
        tableHead.appendChild(pp);
        tableHead.appendChild(pts);
        tableHead.appendChild(ptfav);
        tableHead.appendChild(ptcon);
        tableHead.appendChild(ppp);
        tableHead.appendChild(dif);
        tableHead.appendChild(racha);

        Object.keys(info).forEach((k, index) => {
            /*console.log(k, index);
            console.log("Objeto", info[k]);*/
            let teamRow = document.createElement("tr");
            let pos = document.createElement("td");
            pos.innerHTML = 0;
            let equipo = document.createElement("td");
            equipo.className="equipoData";
            let img = document.createElement("img");
            let teamName=document.createElement("p");
            teamName.className="teamName";
            img.src="../public/img/"+info[k].teamNameShort+".png";
            img.height=60 ;
            img.width= 60;
            teamName.innerHTML = info[k].teamName;
            let pj = document.createElement("td");
            pj.innerHTML = info[k].playedGames;
            let pg = document.createElement("td");
            pg.innerHTML = info[k].gamesWon;
            let pp = document.createElement("td");
            pp.innerHTML = info[k].gamesLost;
            let pts = document.createElement("td");
            pts.innerHTML = info[k].tablePoints;
            let ptfav = document.createElement("td");
            ptfav.innerHTML = info[k].pointsScored;
            let ptcon = document.createElement("td");
            ptcon.innerHTML = info[k].pointsConceded;
            let ppp = document.createElement("td");
            ppp.innerHTML = info[k].pointsPerGame;
            let dif = document.createElement("td");
            dif.innerHTML = info[k].pointsDifference;
            let racha = document.createElement("td");
            racha.innerHTML = info[k].streak;

            postionsTable.appendChild(teamRow);
            teamRow.appendChild(pos);
            teamRow.appendChild(equipo);
            equipo.appendChild(img);
            equipo.appendChild(teamName);
            teamRow.appendChild(pj);
            teamRow.appendChild(pg);
            teamRow.appendChild(pp);
            teamRow.appendChild(pts);
            teamRow.appendChild(ptfav);
            teamRow.appendChild(ptcon);
            teamRow.appendChild(ppp);
            teamRow.appendChild(dif);
            teamRow.appendChild(racha);


            /* const post = new postCard(info[k]);
            
             feed.appendChild(post.render());*/
        });

    } else {
        postionsTable.innerHTML = "Loading teams...";
    }
}


//Hide and show 
function showView() {
    if (showPositions === false) {
        positions.style.display = "none";
        scores.style.display = "block";
    } else {
        scores.style.display = "none";
        positions.style.display = "block";
        positions.style.width = "75%";
    }
}



switchCheckbox.addEventListener('click', switchView);

showView();
