import { getDatabase, ref, set, onValue, push } from 'firebase/database';


export class scoreCard{
    constructor(score){
        this.score = score;
    }

    render(){
       

        let scoreCard = document.createElement("div");
        scoreCard.className="score-card";

        let scoresContainer = document.createElement("div");
        scoresContainer.className="scoresContainer";

        let infoContainer = document.createElement("div");
        infoContainer.className="infoContainer";

        let homeContainer = document.createElement("div");
        homeContainer.className="homeContainer";

        let awayContainer = document.createElement("div");
        awayContainer.className="awayContainer";

        let homeImg=document.createElement("img");
        let homeTeam=document.createElement("p");
        homeTeam.className="homeTeam";
        homeImg.src="../public/img/"+this.score.homeTeam+".png";
        homeImg.height=60 ;
        homeImg.width= 60;
        homeTeam.innerHTML = this.score.homeTeam.toUpperCase()+": "+ this.score.homeTeamScore;;


        let awayImg=document.createElement("img");
        let awayTeam=document.createElement("p");
        awayTeam.className="awayTeam";
        awayImg.src="../public/img/"+this.score.awayTeam+".png";
        awayImg.height=60 ;
        awayImg.width= 60;
        awayTeam.innerHTML =this.score.awayTeam.toUpperCase()+": "+ this.score.awayTeamScore;

       
        let date=document.createElement("p");
        date.className="date";
        date.innerHTML= this.score.date;
       
        scoreCard.appendChild(scoresContainer);
        scoreCard.appendChild(infoContainer);
        scoresContainer.appendChild(homeContainer);
        scoresContainer.appendChild(awayContainer);
        homeContainer.appendChild(homeImg);
        homeContainer.appendChild(homeTeam);
        awayContainer.appendChild(awayImg);
        awayContainer.appendChild(awayTeam);
        infoContainer.appendChild(date);

        return scoreCard;
    }

    

}