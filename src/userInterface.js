export const modFox = function modFox(state){
    document.querySelector('.fox').className = `fox fox-${state}`;
}

export const modSecen = function modSecen(state){
    document.querySelector('.game').className = `game ${state}`;
};

export const togglePoopBag = function  togglePoopBag(show){
    document.querySelector('.poop-bag').classList.toggle("hidden",!show);
};

export const InnerModalChanger = function InnerModalChanger(text = ""){
    const modal = document.querySelector('.modal-inner');
    modal.innerHTML=`${text}`;
};