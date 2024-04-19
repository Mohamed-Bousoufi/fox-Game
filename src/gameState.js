import { modFox, modSecen ,togglePoopBag,InnerModalChanger } from "./userInterface";
import { RAIN_CHANCE,SCENES,DAY_LENGHT,NIGHT_LENGHT,getHungry,getDie } from "./Constant";

const gameState = {
    current : "INIT",

    clock : 1,
    wakeTime : -1,
    sleepTime : -1,
    timeToGetHungry : -1,
    timeToDie : -1,
    timeToStartClb : -1,
    timeToEndClb : -1,
    poopTime : -1,
    scene : 0,

    tick(){
        this.clock++;
        // console.log("SLEEP : ",this.sleepTime);
        // console.log(this.clock);
        if(this.clock === this.wakeTime){
            this.wake();
        }
        else if(this.clock === this.sleepTime){
            this.sleeping();
        }
        else if (this.clock === this.timeToGetHungry){
            this.getHungry();
        }
        else if (this.clock === this.poopTime){
                        this.poop();
        }
        else if (this.clock === this.timeToStartClb) {
            this.startCelebrating();
        } 
        else if (this.clock === this.timeToEndClb) {
            this.endCelebrating();
        }
        else if(this.clock === this.timeToDie){
            this.Die();
        }

        return this.clock;
    },

    clearTimes(){
            this.wakeTime = -1;
            this.sleepTime = -1;
            this.timeToGetHungry = -1;
            this.timeToDie = -1;
            this.timeToStartClb = -1;
            this.timeToEndClb = -1;
            this.poopTime = -1;
    },
    startGame() {
        this.current = "HATCHING";
        this.wakeTime = this.clock + 6;
        modFox('egg');
        modSecen('day');
        InnerModalChanger();
    },

    wake() {
        console.log("AWOKEN");
        this.current = "AWAKE";
        this.wakeTime = -1;
        modFox("idling");
        this.scene = Math.random() > RAIN_CHANCE ?  0 : 1;
        modSecen(SCENES[this.scene]);
        this.sleepTime = this.clock + DAY_LENGHT;
        this.timeToGetHungry = getHungry(this.clock);
        this.determineFoxState();
    },

    feed(){
        if(this.current !== "HUNGRY")
        {
            return;
        }
        if (this.current === "HUNGRY")
        {
            this.timeToGetHungry = -1;
            this.timeToDie = -1;
            this.timeToStartClb = this.clock + 2;
            this.poopTime = this.clock + 4;
            modFox("eating");
        }
        return;
        
    },
    
    cleanUp(){
        if (this.current === "POOPING") {
            togglePoopBag(true);
            this.startCelebrating();
            this.timeToGetHungry = getHungry(this.clock);
            this.timeToDie = -1;
        }
    },
    poop(){
        this.current = "POOPING";
        this.poopTime = -1;
        this.timeToDie = getDie(this.clock);
        modFox("pooping");
    },
    
    sleeping(){
        togglePoopBag(false);
        this.current = "SLEEP";
        modFox('sleep');
        modSecen('night');
        this.clearTimes();
        this.wakeTime = this.clock + NIGHT_LENGHT;
    },
    
    getHungry(){
        if(this.current !== "SLEEP"){

            this.current = "HUNGRY";
            modFox('hungry');
            this.timeToDie = getDie(this.clock);
        }
    },
    
    Die(){
        this.clearTimes();
        modFox('dead');
        modSecen('dead');
        InnerModalChanger("The Fox Died :( </br> press the Middel Button To Start The Game");

        
    },
    startCelebrating() {
        this.current = "CELEBRATING";
        modFox("celebrate");
        this.timeToStartClb = -1;
        this.timeToEndClb = this.clock + 2;
    },
    
    endCelebrating() {
        this.timeToEndClb = -1;
        this.current = "IDLING";
        this.determineFoxState();
        togglePoopBag(false);
    },

    determineFoxState() {
    if (this.current === 'AWAKE' || this.current == 'IDLING') {
        if (SCENES[this.scene] === "rain")
        {
            modFox("rain");
        } else {
            modFox("idling");
        }
        modSecen(SCENES[this.scene]);
    }
    },
    changeWeather() {
        console.log("change weather :",this.scene);
        console.log("CURRENT :",this.current);
        this.scene = (this.scene + 1) % SCENES.length;
        this.determineFoxState(SCENES[this.scene]);
    },

    handleUserAction(icon){
        if(["HATCHING","AWAKE","FEEDING","CELEBRATING"].includes(this.current))
        {
            //Do nothing
        }
        if(this.current === "DEAD" || this.current === "INIT")
        {
            this.startGame();
            return;
        }
        switch (icon) {

            case "fish":
                this.feed();
                break;

            case "poop":
                    this.cleanUp();
                break;

            case "weather" :
                    this.changeWeather();
                break;

            default:
                    this.startGame();
                break;
        }
    },


};
gameState.handleUserAction = gameState.handleUserAction.bind(gameState);
window.gameState = gameState;
export default gameState;