import {
    initializeApp
} from 'firebase/app';
import {
    getDatabase,
    ref,
    onValue,
    query,
    orderByChild,
    orderByKey
} from 'firebase/database';

import {
    getFirebaseConfig
} from './firebase-config';


import { scoreCard } from './score-card';



//Elements
const switchCheckbox = document.getElementById("switchCheckbox");
const scores = document.getElementById("scores");
const positions = document.getElementById("positions");
const postionsTable = document.getElementById("postionsTable");
const scoresContainerEven = document.getElementById("scores-container-even");
const scoresContainerOdd = document.getElementById("scores-container-odd");

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
    getScores();
    getTeams();
}

//SCORES
function getScores() {
    const db = getDatabase();
    //Order not working?
    const dbRef = query(ref(db, 'scores'), orderByChild('date'));
    onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        updateScores(data);
    });
}

function updateScores(info){
    
    if (info) {
        scoresContainerEven.innerHTML="";
        scoresContainerOdd.innerHTML="";
        Object.keys(info).forEach((k, index)=>{
            console.log(k, index);
            console.log("Objeto", info[k]);
            if(index%2===0){
                //console.log("even");
                const score = new scoreCard(info[k]);
                scoresContainerEven.appendChild(score.render());
                
            }else{
                //console.log("odd");
                const score = new scoreCard(info[k]);
                scoresContainerOdd.appendChild(score.render());
               
            }
        });
        
    }
}


// POSITION TABLE
function getTeams() {
    const db = getDatabase();
    const dbRef = ref(db, 'teams');
    onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        updateTable(data);
        sortTeams();
        updatePositions();
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

function sortTeams(){
    //adapted from https://www.w3schools.com/howto/howto_js_sort_table.asp
    let rows, switching, i, x, y, shouldSwitch;
    
    switching = true;
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // Start by saying: no switching is done:
      switching = false;
      rows = postionsTable.rows;
      /* Loop through all table rows (except the
      first, which contains table headers): */
      for (i = 1; i < (rows.length - 1); i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Get the two elements you want to compare,
        one from current row and one from the next: */
        x = rows[i].getElementsByTagName("TD")[5];
        y = rows[i + 1].getElementsByTagName("TD")[5];
        // Check if the two rows should switch place:
        if (+x.innerHTML < +y.innerHTML) {
            shouldSwitch = true;
            break;
          }
      }
      if (shouldSwitch) {
       
        if (+x.innerHTML === +y.innerHTML) {
            x = rows[i].getElementsByTagName("TD")[9];
            y = rows[i + 1].getElementsByTagName("TD")[9];
            if (+x.innerHTML > +y.innerHTML) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
            }
        }else{
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
      }
    }
}

function updatePositions(){
    let rows, i, x;

    rows = postionsTable.rows;

    for (i = 1; i < rows.length; i++) {
        x = rows[i].getElementsByTagName("TD")[0];
        x.innerHTML=i;
    }


}

//Hide and show 
function showView() {
    if (showPositions === false) {
        positions.style.display = "none";
        scores.style.display = "block";
        scores.style.width = "75%";
        scores.style.display= "flex";
        scores.style.flexDirection= "row";
        

        
    } else {
        scores.style.display = "none";
        positions.style.display = "block";
        positions.style.width = "75%";
    }
}

switchCheckbox.addEventListener('click', switchView);
getScores();
showView();
