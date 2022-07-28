const SUBZERO_HP = 2500;
const SUBZERO_MANA = 250;
const SUBZERO_DAMAGE = 200;
const SUBZERO_ARMOR = 10;

const SCORPION_HP = 5000;
const SCORPION_MANA = 0;
const SCORPION_DAMAGE = 100;
const SCORPION_ARMOR = 5;

class Hero {
    constructor(name, hp, mana, damage, armor) {
        this.name = name;
        this.hp = hp;
        this.mana = mana;
        this.damage = damage;
        this.armor = armor
    }

    set receiveDamage(damage) {
        const res = this.hp - (damage - this.armor);
        this.hp = res < 0 ? 0 : res;
    }
}

class Subzero extends Hero {
    constructor(name, element) {
        super(name, SUBZERO_HP, SUBZERO_MANA, SUBZERO_DAMAGE, SUBZERO_ARMOR)
        this.element = element;
    }

    resetStats() {
        this.hp = SUBZERO_HP;
        this.mana = SUBZERO_MANA;
        this.damage = SUBZERO_DAMAGE;
        this.armor = SUBZERO_ARMOR;
    }
}

class Scorpion extends Hero {
    constructor(name, element) {
        super(name, SCORPION_HP, SCORPION_MANA, SCORPION_DAMAGE, SCORPION_ARMOR)
        this.element = element;
    }

    resetStats() {
        this.hp = SCORPION_HP;
        this.mana = SCORPION_MANA;
        this.damage = SCORPION_DAMAGE;
        this.armor = SCORPION_ARMOR;
    }
}


const subzero = new Subzero('Subzero', 'Ice');
const scorpion = new Scorpion('Scorpion', 'Fire');

const subzeroKeys = Object.keys(subzero);
const scorpionKeys = Object.keys(scorpion);

function displaySubzero() {
    let htmlBlock = '';
    subzeroKeys.forEach((key) => {
        if (key === 'name') {
            htmlBlock += <div><b>${subzero[key]}</b></div>;
        } else {
            htmlBlock += <div>${key}: ${subzero[key]}</div>;
        }
    })
    return htmlBlock;
}

function displayScorpion() {
    let htmlBlock = '';
    scorpionKeys.forEach((key) => {
        if (key === 'name') {
            htmlBlock += <div><b>${scorpion[key]}</b></div>;
        } else {
            htmlBlock += <div>${key}: ${scorpion[key]}</div>;
        }
    })
    return htmlBlock;
}


function updateStats() {
    document.getElementById('sb-stats').innerHTML = displaySubzero();
    document.getElementById('sr-stats').innerHTML = displayScorpion();

    if (subzero.hp <= 0) {
        alert('Scorpion Won!');
        subzero.resetStats();
        scorpion.resetStats();
        updateStats();
    } else if (scorpion.hp <= 0) {
        alert('Subzero Won!')
        subzero.resetStats();
        scorpion.resetStats();
        updateStats();
    }
}
updateStats();


const scorpionAttack = (Math.floor(Math.random() * ((SCORPION_DAMAGE+51) - (SCORPION_DAMAGE-50)) + (SCORPION_DAMAGE-50)));

function skill1() {
    scorpion.receiveDamage = (Math.floor(Math.random() * ((SUBZERO_DAMAGE+51) - (SUBZERO_DAMAGE-50)) + (SUBZERO_DAMAGE-50))) ;
    subzero.receiveDamage = scorpionAttack;
    updateStats();
}

function skill2() {
    if(subzero.mana >= 50) {
        const a = (Math.floor(Math.random() * (601  - 400) + 400));
        scorpion.receiveDamage = a;
        subzero.receiveDamage = scorpionAttack;
        subzero.mana -= 50;
    } else {
        subzero.receiveDamage = scorpionAttack;
    }
    updateStats();
}

let a = 1;
function skill3() {
    if(a < 3 && subzero.mana >= 50 && subzero.hp < SUBZERO_HP){
        subzero.hp += (SUBZERO_HP * 30 / 100);
        subzero.mana -= 50;
        subzero.receiveDamage = scorpionAttack;
        a += 1;
    }
    updateStats();
}

let b = true;
function skill4() {
    if(b === true){
        subzero.receiveDamage = scorpionAttack;
        scorpion.hp -= (scorpion.hp / 2);
        b = false;
    }
    updateStats();
}