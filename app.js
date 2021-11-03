const inputColors = document.querySelectorAll('.input-color');
const inputRange = document.querySelector('.range-input');
const btns = document.querySelectorAll('button');
const bg = document.body;
const containerColors = document.querySelector('.container-colors');
const span = document.querySelector('.info');
const btnRandom = document.querySelector('.random');


//Démarrage

// On remplit les 2 inputs avec les 2 couleurs de base
let colorsValue = ['#BA5370', '#F4E2D8'];
let tilt = 45;//tilt = inclinaison
let index = 3;

inputColors[0].value = colorsValue[0];
inputColors[1].value = colorsValue[1];
inputColors[0].style.background = colorsValue[0]; //Background des inputs de la même couleur que la valeur choisie
inputColors[1].style.background = colorsValue[1];
bg.style.background = `linear-gradient(${tilt}deg, ${colorsValue})`; //bg.style.background = `linear-gradient(${tilt}deg, ${colorsValue[0]}, ${colorsValue[1]})`;


// CHANGER L'INCLINAISON
inputRange.addEventListener('input', (e) =>{
    tilt = e.target.value * 3.6; //3.6 car degrés, 0 à 360
    bg.style.background = `linear-gradient(${tilt}deg, ${colorsValue})`;
})


// AJOUT / SUPPRESSION COULEURS

btns.forEach(btn =>{
    btn.addEventListener('click', addDelete);
})

function addDelete(e){
    /*On les a déjà mais, on les reprend ici car on ajoute et enleve des elements, 
    donc on veut tous les inputs, pas juste ceux du début 
    On créer une nouvelle constante à chaque appel de la fonction */
    
    span.innerText = ''; // enlever "span.innerText = 'You need 2 colors to make a gradient';" si on re clic sur la fonction -> quand on supprime puis re-rajoute des inputs, ...
    const allInputs = document.querySelectorAll('.input-color');
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    //console.log(randomColor); // ex : 1e79c0

    if(e.target.className === 'plus'){ // si on clic sur btn "+"

        if(allInputs.length > 8){ 
            return; //8 inputs couleur max
        }

        const newColor = document.createElement('input');
        newColor.setAttribute('class', 'input-color');
        newColor.setAttribute('data-index', index);
        newColor.setAttribute('lax-length', 7);
        newColor.value = `#${randomColor.toUpperCase()}`;
        newColor.style.background = `#${randomColor}`;
        containerColors.appendChild(newColor);

        colorsValue.push(`#${randomColor.toUpperCase()}`); // nouvelles couleurs dans le tableau

        // Màj du fond
        bg.style.background = `linear-gradient(${tilt}deg, ${colorsValue})`;
        index++;
    }
    else if(e.target.className === "minus"){
        if(colorsValue.length === 2){
            span.innerText = 'You need 2 colors to make a gradient';
        } else {
            colorsValue.pop(); //Enlever la couleur du tableau
            allInputs[allInputs.length - 1].remove(); //Ne pas oublier de mettre à jour le DOM
            index --;
            bg.style.background = `linear-gradient(${tilt}deg, ${colorsValue})`; //màj du fond
        }
    }

    //Nouveaux inputs - màj
    allInputs.forEach(inp => {
        inp.addEventListener('input', majColors);
    });
} 



// MàJ COULEURS

//Inputs de base
inputColors.forEach(inp => {
    inp.addEventListener('input', majColors);
});

function majColors(e){

    let currentIndex = e.target.getAttribute('data-index');
    e.target.value = e.target.value.toUpperCase();
    colorsValue[currentIndex -1] = e.target.value.toUpperCase();
    e.target.style.background = colorsValue[currentIndex -1];
    bg.style.background = `linear-gradient(${tilt}deg, ${colorsValue})`;
}


// COULEURS ALEATOIRES

btnRandom.addEventListener('click', () => {

    const inputs = document.querySelectorAll('.input-color');
    for(i = 0; i < colorsValue.length; i++){
        colorsValue[i] = `#${Math.floor(Math.random()*16777215).toString(16)}`;//colorsValue[i] = chaque couleur qui passe dans la boucle for
        inputs[i].value = colorsValue[i].toUpperCase(); // le 1er input, sa valeur sera la valeur au hasard
        inputs[i].style.background = colorsValue[i].toUpperCase();
        bg.style.background = `linear-gradient(${tilt}deg, ${colorsValue})`;
    }
})


