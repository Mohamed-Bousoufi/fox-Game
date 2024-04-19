import gameState from "./gameState";
import { TIC_RATE } from "./Constant";
import initButton from "./Buttons"



function init(){
    let timeTotic = Date.now();
    initButton(gameState.handleUserAction);

    function nextFrameanimation(){
        let timeFrame = Date.now();
        if(timeTotic <= timeFrame)
        {
           gameState.tick();
            timeTotic = Date.now() + TIC_RATE;
        }
        requestAnimationFrame(nextFrameanimation);
    }
    requestAnimationFrame(nextFrameanimation);
}

init();