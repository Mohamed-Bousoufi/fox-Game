
import {ICONS} from './Constant';

// ICONS = require('./Constant');



    const toggleButton = (icon,show) => 
    document.querySelector(`.${ICONS[icon]}-icon`).classList.toggle('highlighted',show);

        
        
    export default function initButton(UserHandlerAction){
        let selcetedIcon = 0;

        function highLightButton(event){
            if(event.target.classList.contains('left-btn'))
            {
                toggleButton(selcetedIcon,false);
                selcetedIcon =  (selcetedIcon +  2) % ICONS.length;
                toggleButton(selcetedIcon,true);
            }else if(event.target.classList.contains('right-btn')){
                toggleButton(selcetedIcon,false);
                selcetedIcon = (selcetedIcon + 1) % ICONS.length;
                toggleButton(selcetedIcon,true);
            }
            else {

                    UserHandlerAction(ICONS[selcetedIcon]);
            }
        }
        document.querySelector(".buttons").addEventListener("click",highLightButton);
    }

