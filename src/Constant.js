export const TIC_RATE = 1000;
export const ICONS = ['fish','poop','weather'];
export const RAIN_CHANCE = 0.2;
export const SCENES = ["day","rain"];
export const DAY_LENGHT = 30;
export const NIGHT_LENGHT = 10;

export const getHungry = clock => Math.floor(Math.random() * 3) +  5 +  clock;


export const getDie = clock => Math.floor(Math.random() * 20) + 5 + clock;
