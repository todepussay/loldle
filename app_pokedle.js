let input = document.getElementById('input');

let data;

let iteration = 0;

let good_type1 = "";
let good_type2 = "";
let good_habitat = "";
let good_couleur = [];
let good_couleur_partial = [];
let good_evolution = 0;
let good_hauteur = 0;
let good_poids = 0;

let ban_type1 = [];
let ban_type2 = [];
let ban_habitat = [];
let ban_couleur = [];

let evolution_min = 0;
let evolution_max = 0;

let hauteur_min = 0;
let hauteur_max = 0;

let poids_min = 0;
let poids_max = 0;


input.addEventListener('keyup', function(e) {
    document.getElementById('result').innerHTML = '';
    let search = e.target.value.toLowerCase();
    search = search.charAt(0).toUpperCase() + search.slice(1);

    let result = [];
    
    for(let i = 0; i < data.length; i++) {
        if(data[i].name.includes(search)) {
            result.push(data[i]);
        }
    }

    if (search != '') {
        for(let i = 0; i < result.length; i++) {
            let button = document.createElement('button');
            button.innerHTML = result[i].name;
            button.classList.add('btn');
            button.onclick = function() {
                proposition(result[i]);
            };

            document.getElementById('result').appendChild(button);
                
        }

    }

    
});

function proposition(perso) {

    data = data.filter(element => element !== perso);

    if (iteration == 0) {
        document.getElementById('input').remove();
        document.getElementById('result').innerHTML = '';
    }

    let div = document.createElement('div');
    div.classList.add('proposition');
    div.id = 'proposition' + iteration;

    let poke = document.createElement('h2');
    poke.innerHTML = perso.name;
    div.appendChild(poke);

    let box_type1 = document.createElement('div');
    box_type1.classList.add('box');
    box_type1.classList.add('good');
    box_type1.onclick = function() {
        changeBox(box_type1)
    };
    box_type1.innerHTML = perso.type1;

    div.appendChild(box_type1);

    let box_type2 = document.createElement('div');
    box_type2.classList.add('box');
    box_type2.classList.add('good');
    box_type2.onclick = function() {
        changeBox(box_type2)
    };
    box_type2.innerHTML = perso.type2;

    div.appendChild(box_type2);

    let box_habitat = document.createElement('div');
    box_habitat.classList.add('box');
    box_habitat.classList.add('good');
    box_habitat.onclick = function() {
        changeBox(box_habitat)
    };
    box_habitat.innerHTML = perso.habitat;

    div.appendChild(box_habitat);

    let box_couleur = document.createElement('div');
    box_couleur.classList.add('box');
    box_couleur.classList.add('good');
    box_couleur.onclick = function() {
        changeBoxCouleur(box_couleur)
    };
    box_couleur.innerHTML = perso.couleur;

    div.appendChild(box_couleur);

    let box_evolution = document.createElement('div');
    box_evolution.classList.add('box');
    
    let span = document.createElement('span');
    span.innerHTML = perso.evolution;
    box_evolution.appendChild(span);

    let operator = document.createElement('span');
    operator.classList.add('egale');
    operator.innerHTML = '=';
    operator.onclick = function() {
        changeBoxNombre(operator);
    };
    box_evolution.appendChild(operator);

    div.appendChild(box_evolution);

    let box_hauteur = document.createElement('div');
    box_hauteur.classList.add('box');
    
    let span2 = document.createElement('span');
    span2.innerHTML = perso.hauteur;
    box_hauteur.appendChild(span2);

    let operator2 = document.createElement('span');
    operator2.classList.add('egale');
    operator2.innerHTML = '=';
    operator2.onclick = function() {
        changeBoxNombre(operator2);
    };
    box_hauteur.appendChild(operator2);

    div.appendChild(box_hauteur);

    let box_poids = document.createElement('div');
    box_poids.classList.add('box');
    
    let span3 = document.createElement('span');
    span3.innerHTML = perso.poids;
    box_poids.appendChild(span3);

    let operator3 = document.createElement('span');
    operator3.classList.add('egale');
    operator3.innerHTML = '=';
    operator3.onclick = function() {
        changeBoxNombre(operator3);
    };
    box_poids.appendChild(operator3);

    div.appendChild(box_poids);

    let generate = document.createElement('button');
    generate.innerHTML = "Générer";
    generate.classList.add('btn');
    generate.onclick = function() {
        generateProposition();
    };

    div.appendChild(generate);

    let game = document.getElementById('game');
    game.insertBefore(div, game.firstChild);

    iteration++;

    
}

function generateProposition(){
    let propo = document.getElementById('proposition' + (iteration - 1));

    propo.lastChild.remove();

    for(let i = 0; i < propo.childNodes.length; i++) {
        if(propo.childNodes[i].classList.contains('box')) {
            propo.childNodes[i].onclick = function(){return null;};
        }
    }

    let type1 = propo.childNodes[1];

    if(good_type1 == ""){
        if(type1.classList.contains('good')) {
            good_type1 = type1.innerHTML;
        } else {
            ban_type1.push(type1.innerHTML);
        }
    }

    let type2 = propo.childNodes[2];

    if(good_type2 == ""){
        if(type2.classList.contains('good')) {
            good_type2 = type2.innerHTML;
        } else {
            ban_type2.push(type2.innerHTML);
        }
    }

    let habitat = propo.childNodes[3];

    if(good_habitat == ""){
        if(habitat.classList.contains('good')) {
            good_habitat = habitat.innerHTML;
        } else {
            ban_habitat.push(habitat.innerHTML);
        }
    }

    let couleur = propo.childNodes[4];

    if(good_couleur.length == 0){
        if(couleur.classList.contains("good")){
            good_couleur.push(couleur.innerHTML.split(','));
        } else {
            if(couleur.classList.contains("bad")){
                ban_couleur.push(couleur.innerHTML.split(','));
            }
        }
    }

    let evolution = propo.childNodes[5].firstChild.innerHTML;
    let evolution_operator = propo.childNodes[5].lastChild.innerHTML;

    if(good_evolution == 0){
        if (evolution_operator == '=') {
            good_evolution = evolution;
        } else {
            if (evolution_operator == '/\\') {
                evolution_min = evolution;
            } else {
                evolution_max = evolution;
            }
        }
    }

    let hauteur = propo.childNodes[6].firstChild.innerHTML;
    let hauteur_operator = propo.childNodes[6].lastChild.innerHTML;

    if(good_hauteur == 0){
        if (hauteur_operator == '=') {
            good_hauteur = hauteur;
        } else {
            if (hauteur_operator == '/\\') {
                hauteur_min = hauteur;
            } else {
                hauteur_max = hauteur;
            }
        }
    }

    let poids = propo.childNodes[7].firstChild.innerHTML;
    let poids_operator = propo.childNodes[7].lastChild.innerHTML;

    if(good_poids == 0){
        if (poids_operator == '=') {
            good_poids = poids;
        } else {
            if (poids_operator == '/\\') {
                poids_min = poids;
            } else {
                poids_max = poids;
            }
        }
    }

    let result = [];

    data.forEach((champ) => {
        let type1_ok = true;

        if (good_type1 == ""){
            if (ban_type1.includes(champ['type1'])) {
                type1_ok = false;
            }
        } else {
            if (champ['type1'] != good_type1) {
                type1_ok = false;
            }
        }

        if(type1_ok){
            
            let type2_ok = true;

            if (good_type2 == ""){
                if (ban_type2.includes(champ['type2'])) {
                    type2_ok = false;
                }
            } else {
                if (champ['type2'] != good_type2) {
                    type2_ok = false;
                }
            }

            if(type2_ok){
                
                let habitat_ok = true;

                if (good_habitat == ""){
                    if (ban_habitat.includes(champ['habitat'])) {
                        habitat_ok = false;
                    }
                } else {
                    if (champ['habitat'] != good_habitat) {
                        habitat_ok = false;
                    }
                }

                if(habitat_ok){
                    
                    let couleur_ok = true;

                    if (good_couleur.length == 0){
                        if (ban_couleur.length > 0) {
                            for(let i = 0; i < ban_couleur.length; i++) {
                                let couleur_champ = champ['couleur'].slice().sort();
                                let couleur_ban = ban_couleur[i].slice().sort();
                                
                                for(let i = 0; i < couleur_ban.length; i++) {
                                    if (couleur_champ.includes(couleur_ban[i])) {
                                        couleur_ok = false;
                                    }
                                }
                            }
                        }
                    } else {
                        if (champ['couleur'].length != good_couleur.length) {
                            couleur_ok = false;
                        }
                        
                        const listeTriee1 = champ['couleur'].slice().sort();
                        const listeTriee2 = good_couleur.slice().sort();

                        for (let i = 0; i < listeTriee1.length; i++) {
                            if (listeTriee1[i] != listeTriee2[i]) {
                                couleur_ok = false;
                            }
                        }
                    } 

                    if(couleur_ok){

                        let evolution_ok = true;

                        if (good_evolution != 0){
                            if (champ['evolution'] != good_evolution) {
                                evolution_ok = false;
                            }
                        } else {
                            if (evolution_min != 0) {
                                if(champ['evolution'] <= evolution_min){
                                    evolution_ok = false;
                                }
                            }
                            if (evolution_max != 0) {
                                if(champ['evolution'] >= evolution_max){
                                    evolution_ok = false;
                                }
                            }
                        }

                        if(evolution_ok){

                            let hauteur_ok = true;

                            if (good_hauteur != 0){
                                if (champ['hauteur'] != good_hauteur) {
                                    hauteur_ok = false;
                                }
                            } else {
                                if (hauteur_min != 0) {
                                    if(champ['hauteur'] <= hauteur_min){
                                        hauteur_ok = false;
                                    }
                                }
                                if (hauteur_max != 0) {
                                    if(champ['hauteur'] >= hauteur_max){
                                        hauteur_ok = false;
                                    }
                                }
                            }

                            if(hauteur_ok){

                                let poids_ok = true;

                                if (good_poids != 0){
                                    if (champ['poids'] != good_poids) {
                                        poids_ok = false;
                                    }
                                } else {
                                    if (poids_min != 0) {
                                        if(champ['poids'] <= poids_min){
                                            poids_ok = false;
                                        }
                                    }
                                    if (poids_max != 0) {
                                        if(champ['poids'] >= poids_max){
                                            poids_ok = false;
                                        }
                                    }
                                }

                                if(poids_ok){
                                    result.push(champ);
                                }

                            }
                        }
                    }
                }

            }

        }
    })

    data = result;

    let recommandation = bestChamp(data);

    for(let i = 0; i < data.length; i++) {

        let button = document.createElement('button');
        button.innerHTML = data[i].name;
        button.classList.add('btn');
        button.onclick = function() {
            proposition(data[i]);
            document.getElementById('result').innerHTML = '';
        };

        if(data[i] == recommandation){
            button.classList.add('recommandation');
        }

        document.getElementById('result').appendChild(button);

    }
}

function bestChamp(liste){
    return liste[Math.floor(Math.random() * liste.length)];
}

function changeBox(box){
    if(box.classList.contains('good')) {
        box.classList.remove('good');
        box.classList.add('bad');
    } else {
        box.classList.remove('bad');
        box.classList.add('good');
    }
}

function changeBoxCouleur(box){
    if(box.classList.contains('good')) {
        box.classList.remove('good');
        box.classList.add('maybe');
    } else {
        if(box.classList.contains('maybe')) {
            box.classList.remove('maybe');
            box.classList.add('bad');
        } else {
            box.classList.remove('bad');
            box.classList.add('good');
        }
    }
}

function changeBoxNombre(operator){
    if(operator.innerHTML == '=') {
        operator.innerHTML = '/\\';
    } else {
        if(operator.innerHTML == '/\\') {
            operator.innerHTML = '\\/';
        } else {
            operator.innerHTML = '=';
        }
    }
}

function reset(){
    window.location.reload();
}

data = [
    {
        "name": "Aspicot",
        "type1": "Insecte",
        "type2": "Poison",
        "habitat": "Forêt",
        "couleur": [
            "Marron"
        ],
        "evolution": 1,
        "hauteur": 0.30,
        "poids": 3.2
    },
    {
        "name": "Abo",
        "type1": "Poison",
        "type2": "Aucun",
        "habitat": "Champs",
        "couleur": [
            "Violet"
        ],
        "evolution": 1,
        "hauteur": 2,
        "poids": 6.9
    },
    {
        "name": "Arbok",
        "type1": "Poison",
        "type2": "Aucun",
        "habitat": "Champs",
        "couleur": [
            "Violet"
        ],
        "evolution": 2,
        "hauteur": 3.5,
        "poids": 65
    },
    {
        "name": "Aéromite",
        "type1": "Insecte",
        "type2": "Poison",
        "habitat": "Forêt",
        "couleur": [
            "Violet"
        ],
        "evolution": 2,
        "hauteur": 1.5,
        "poids": 12.5
    },
    {
        "name": "Akwakwak",
        "type1": "Eau",
        "type2": "Aucun",
        "habitat": "Marécages",
        "couleur": [
            "Bleu"
        ],
        "evolution": 2,
        "hauteur": 1.7,
        "poids": 76.6
    },
    {
        "name": "Arcanin",
        "type1": "Feu",
        "type2": "Aucun",
        "habitat": "Champs",
        "couleur": [
            "Orange",
            "Jaune"
        ],
        "evolution": 2,
        "hauteur": 1.9,
        "poids": 155
    },
    {
        "name": "Abra",
        "type1": "Psy",
        "type2": "Aucun",
        "habitat": "Urbain",
        "couleur": [
            "Jaune"
        ],
        "evolution": 1,
        "hauteur": 0.9,
        "poids": 19.5
    },
    {
        "name": "Alakazam",
        "type1": "Psy",
        "type2": "Aucun",
        "habitat": "Urbain",
        "couleur": [
            "Jaune"
        ],
        "evolution": 3,
        "hauteur": 1.5,
        "poids": 48
    },
    {
        "name": "Aquali",
        "type1": "Eau",
        "type2": "Aucun",
        "habitat": "Urbain",
        "couleur": [
            "Bleu"
        ],
        "evolution": 2,
        "hauteur": 1,
        "poids": 29
    },
    {
        "name": "Amonita",
        "type1": "Roche",
        "type2": "Eau",
        "habitat": "Mer",
        "couleur": [
            "Bleu",
            "Blanc"
        ],
        "evolution": 1,
        "hauteur": 0.4,
        "poids": 7.5
    },
    {
        "name": "Amonistar",
        "type1": "Roche",
        "type2": "Eau",
        "habitat": "Mer",
        "couleur": [
            "Bleu",
            "Blanc"
        ],
        "evolution": 2,
        "hauteur": 1,
        "poids": 35
    },
    {
        "name": "Artikodin",
        "type1": "Glace",
        "type2": "Vol",
        "habitat": "Rare",
        "couleur": [
            "Bleu"
        ],
        "evolution": 1,
        "hauteur": 1.7,
        "poids": 55.4
    },
    {
        "name": "Empiflor",
        "type1": "Plante",
        "type2": "Poison",
        "habitat": "Forêt",
        "couleur": [
            "Vert",
            "Jaune"
        ],
        "evolution": 3,
        "hauteur": 1.7,
        "poids": 15.5
    },
    {
        "name": "Ectoplasma",
        "type1": "Spectre",
        "type2": "Poison",
        "habitat": "Grotte",
        "couleur": [
            "Violet"
        ],
        "evolution": 3,
        "hauteur": 1.5,
        "poids": 40.5
    },
    {
        "name": "Électrode",
        "type1": "Electrik",
        "type2": "Aucun",
        "habitat": "Urbain",
        "couleur": [
            "Rouge",
            "Blanc"
        ],
        "evolution": 2,
        "hauteur": 1.2,
        "poids": 66.6
    },
    {
        "name": "Excelangue",
        "type1": "Normal",
        "type2": "Aucun",
        "habitat": "Champs",
        "couleur": [
            "Rose"
        ],
        "evolution": 1,
        "hauteur": 1.2,
        "poids": 65.5
    },
    {
        "name": "Élektek",
        "type1": "Electrik",
        "type2": "Aucun",
        "habitat": "Champs",
        "couleur": [
            "Noir",
            "Jaune"
        ],
        "evolution": 1,
        "hauteur": 1.1,
        "poids": 30
    },
    {
        "name": "Évoli",
        "type1": "Normal",
        "type2": "Aucun",
        "habitat": "Urbain",
        "couleur": [
            "Marron"
        ],
        "evolution": 1,
        "hauteur": 0.3,
        "poids": 6.5
    },
    {
        "name": "Électhor",
        "type1": "Electrik",
        "type2": "Vol",
        "habitat": "Rare",
        "couleur": [
            "Jaune"
        ],
        "evolution": 1,
        "hauteur": 1.6,
        "poids": 52.6
    },
    {
        "name": "Reptincel",
        "type1": "Feu",
        "type2": "Aucun",
        "habitat": "Montagne",
        "couleur": [
            "Rouge"
        ],
        "evolution": 2,
        "hauteur": 1.1,
        "poids": 19
    },
    {
        "name": "Roucool",
        "type1": "Normal",
        "type2": "Vol",
        "habitat": "Forêt",
        "couleur": [
            "Marron",
            "Jaune"
        ],
        "evolution": 1,
        "hauteur": 0.3,
        "poids": 1.8
    },
    {
        "name": "Roucoups",
        "type1": "Normal",
        "type2": "Vol",
        "habitat": "Forêt",
        "couleur": [
            "Marron",
            "Jaune"
        ],
        "evolution": 2,
        "hauteur": 1.1,
        "poids": 30 
    },
    {
        "name": "Roucarnage",
        "type1": "Normal",
        "type2": "Vol",
        "habitat": "Forêt",
        "couleur": [
            "Marron",
            "Jaune"
        ],
        "evolution": 3,
        "hauteur": 1.5,
        "poids": 39.5
    },
    {
        "name": "Rattata",
        "type1": "Normal",
        "type2": "Aucun",
        "habitat": "Champs",
        "couleur": [
            "Violet"
        ],
        "evolution": 1,
        "hauteur": 0.3,
        "poids": 3.5
    },
    {
        "name": "Rattatac",
        "type1": "Normal",
        "type2": "Aucun",
        "habitat": "Champs",
        "couleur": [
            "Marron"
        ],
        "evolution": 2,
        "hauteur": 0.7,
        "poids": 18.5
    },
    {
        "name": "Rapasdepic",
        "type1": "Normal",
        "type2": "Vol",
        "habitat": "Milieux hostiles",
        "couleur": [
            "Marron"
        ],
        "evolution": 2,
        "hauteur": 1.2,
        "poids": 38
    },
    {
        "name": "Raichu",
        "type1": "Electrik",
        "type2": "Aucun",
        "habitat": "Forêt",
        "couleur": [
            "Jaune"
        ],
        "evolution": 2,
        "hauteur": 0.8,
        "poids": 30
    },
    {
        "name": "Rondoudou",
        "type1": "Normal",
        "type2": "Fée",
        "habitat": "Champs",
        "couleur": [
            "Rose"
        ],
        "evolution": 1,
        "hauteur": 0.5,
        "poids": 5.5
    },
    {
        "name": "Rafflesia",
        "type1": "Plante",
        "type2": "Poison",
        "habitat": "Champs",
        "couleur": [
            "Bleu",
            "Rouge"
        ],
        "evolution": 3,
        "hauteur": 1.2,
        "poids": 18.6
    },
    {
        "name": "Racaillou",
        "type1": "Roche",
        "type2": "Sol",
        "habitat": "Montagne",
        "couleur": [
            "Gris"
        ],
        "evolution": 1,
        "hauteur": 0.4,
        "poids": 20
    },
    {
        "name": "Ramoloss",
        "type1": "Eau",
        "type2": "Psy",
        "habitat": "Marécages",
        "couleur": [
            "Rose"
        ],
        "evolution": 1,
        "hauteur": 1.2,
        "poids": 36
    },
    {
        "name": "Rhinocorne",
        "type1": "Sol",
        "type2": "Roche",
        "habitat": "Milieux hostiles",
        "couleur": [
            "Gris"
        ],
        "evolution": 1,
        "hauteur": 1,
        "poids": 115
    },
    {
        "name": "Rhinoféros",
        "type1": "Sol",
        "type2": "Roche",
        "habitat": "Milieux hostiles",
        "couleur": [
            "Gris"
        ],
        "evolution": 2,
        "hauteur": 1.9,
        "poids": 120
    },
    {
        "name": "Ronflex",
        "type1": "Normal",
        "type2": "Aucun",
        "habitat": "Montagne",
        "couleur": [
            "Bleu",
            "Blanc"
        ],
        "evolution": 1,
        "hauteur": 2.1,
        "poids": 460
    },
    {
        "name": "Tortank",
        "type1": "Eau",
        "type2": "Aucun",
        "habitat": "Marécages",
        "couleur": [
            "Bleu"
        ],
        "evolution": 3,
        "hauteur": 1.6,
        "poids": 85.5
    },
    {
        "name": "Taupiqueur",
        "type1": "Sol",
        "type2": "Aucun",
        "habitat": "Grotte",
        "couleur": [
            "Marron"
        ],
        "evolution": 1,
        "hauteur": 0.2,
        "poids": 0.8
    },
    {
        "name": "Triopikeur",
        "type1": "Sol",
        "type2": "Aucun",
        "habitat": "Grotte",
        "couleur": [
            "Marron"
        ],
        "evolution": 2,
        "hauteur": 0.7,
        "poids": 33.3
    },
    {
        "name": "Têtarte",
        "type1": "Eau",
        "type2": "Aucun",
        "habitat": "Marécages",
        "couleur": [
            "Bleu",
            "Blanc"
        ],
        "evolution": 2,
        "hauteur": 1,
        "poids": 20
    },
    {
        "name": "Tartard",
        "type1": "Eau",
        "type2": "Combat",
        "habitat": "Marécages",
        "couleur": [
            "Bleu",
            "Blanc"
        ],
        "evolution": 3,
        "hauteur": 1.3,
        "poids": 54
    },
    {
        "name": "Tentacool",
        "type1": "Eau",
        "type2": "Poison",
        "habitat": "Mer",
        "couleur": [
            "Bleu",
            "Rouge"
        ],
        "evolution": 1,
        "hauteur": 0.9,
        "poids": 45.5
    },
    {
        "name": "Tentacruel",
        "type1": "Eau",
        "type2": "Poison",
        "habitat": "Mer",
        "couleur": [
            "Bleu",
            "Rouge"
        ],
        "evolution": 2,
        "hauteur": 1.6,
        "poids": 55
    },
    {
        "name": "Tadmorv",
        "type1": "Poison",
        "type2": "Aucun",
        "habitat": "Urbain",
        "couleur": [
            "Violet"
        ],
        "evolution": 1,
        "hauteur": 0.9,
        "poids": 30
    },
    {
        "name": "Tygnon",
        "type1": "Combat",
        "type2": "Aucun",
        "habitat": "Urbain",
        "couleur": [
            "Marron"
        ],
        "evolution": 2,
        "hauteur": 1.4,
        "poids": 50.2
    },
    {
        "name": "Tauros",
        "type1": "Normal",
        "type2": "Aucun",
        "habitat": "Champs",
        "couleur": [
            "Marron"
        ],
        "evolution": 1,
        "hauteur": 1.4,
        "poids": 88.4
    },
    {
        "name": "Insécateur",
        "type1": "Insecte",
        "type2": "Vol",
        "habitat": "Champs",
        "couleur": [
            "Vert"
        ],
        "evolution": 1,
        "hauteur": 1.5,
        "poids": 56
    },
    {
        "name": "Ortide",
        "type1": "Plante",
        "type2": "Poison",
        "habitat": "Champs",
        "couleur": [
            "Bleu",
            "Orange"
        ],
        "evolution": 2,
        "hauteur": 0.8,
        "poids": 8.6
    },
    {
        "name": "Otaria",
        "type1": "Eau",
        "type2": "Aucun",
        "habitat": "Mer",
        "couleur": [
            "Blanc"
        ],
        "evolution": 1,
        "hauteur": 1.1,
        "poids": 90
    },
    {
        "name": "Onix",
        "type1": "Roche",
        "type2": "Sol",
        "habitat": "Grotte",
        "couleur": [
            "Gris"
        ],
        "evolution": 1,
        "hauteur": 8.8,
        "poids": 210
    },
    {
        "name": "Osselait",
        "type1": "Sol",
        "type2": "Aucun",
        "habitat": "Montagne",
        "couleur": [
            "Marron"
        ],
        "evolution": 1,
        "hauteur": 0.4,
        "poids": 6.5
    },
    {
        "name": "Ossatueur",
        "type1": "Sol",
        "type2": "Aucun",
        "habitat": "Montagne",
        "couleur": [
            "Marron"
        ],
        "evolution": 2,
        "hauteur": 1,
        "poids": 45
    },
    {
        "name": "Papilusion",
        "type1": "Insecte",
        "type2": "Vol",
        "habitat": "Forêt",
        "couleur": [
            "Violet",
            "Blanc"
        ],
        "evolution": 3,
        "hauteur": 1.1,
        "poids": 32
    },
    {
        "name": "Piafabec",
        "type1": "Normal",
        "type2": "Vol",
        "habitat": "Milieux hostiles",
        "couleur": [
            "Marron"
        ],
        "evolution": 1,
        "hauteur": 0.3,
        "poids": 2
    },
    {
        "name": "Pikachu",
        "type1": "Electrik",
        "type2": "Aucun",
        "habitat": "Forêt",
        "couleur": [
            "Jaune"
        ],
        "evolution": 1,
        "hauteur": 0.4,
        "poids": 6
    },
    {
        "name": "Paras",
        "type1": "Insecte",
        "type2": "Plante",
        "habitat": "Forêt",
        "couleur": [
            "Orange"
        ],
        "evolution": 1,
        "hauteur": 0.3,
        "poids": 5.4
    },
    {
        "name": "Parasect",
        "type1": "Insecte",
        "type2": "Plante",
        "habitat": "Forêt",
        "couleur": [
            "Orange",
            "Rouge"
        ],
        "evolution": 2,
        "hauteur": 1,
        "poids": 29.5
    },
    {
        "name": "Persian",
        "type1": "Normal",
        "type2": "Aucun",
        "habitat": "Urbain",
        "couleur": [
            "Jaune"
        ],
        "evolution": 2,
        "hauteur": 1,
        "poids": 32
    },
    {
        "name": "Psykokwak",
        "type1": "Eau",
        "type2": "Aucun",
        "habitat": "Marécages",
        "couleur": [
            "Jaune"
        ],
        "evolution": 1,
        "hauteur": 0.8,
        "poids": 19.6
    },
    {
        "name": "Ptitard",
        "type1": "Eau",
        "type2": "Aucun",
        "habitat": "Marécages",
        "couleur": [
            "Bleu",
            "Blanc"
        ],
        "evolution": 1,
        "hauteur": 0.6,
        "poids": 12.4
    },
    {
        "name": "Ponyta",
        "type1": "Feu",
        "type2": "Aucun",
        "habitat": "Champs",
        "couleur": [
            "Orange",
            "Jaune"
        ],
        "evolution": 1,
        "hauteur": 1,
        "poids": 30
    },
    {
        "name": "Poissirène",
        "type1": "Eau",
        "type2": "Aucun",
        "habitat": "Marécages",
        "couleur": [
            "Rouge",
            "Blanc"
        ],
        "evolution": 1,
        "hauteur": 0.6,
        "poids": 15
    },
    {
        "name": "Poissoroy",
        "type1": "Eau",
        "type2": "Aucun",
        "habitat": "Marécages",
        "couleur": [
            "Rouge",
            "Blanc"
        ],
        "evolution": 2,
        "hauteur": 1.3,
        "poids": 39
    },
    {
        "name": "Pyroli",
        "type1": "Feu",
        "type2": "Aucun",
        "habitat": "Urbain",
        "couleur": [
            "Orange"
        ],
        "evolution": 2,
        "hauteur": 0.9,
        "poids": 25
    },
    {
        "name": "Porygon",
        "type1": "Normal",
        "type2": "Aucun",
        "habitat": "Urbain",
        "couleur": [
            "Bleu",
            "Rose"
        ],
        "evolution": 1,
        "hauteur": 0.8,
        "poids": 36.5
    },
    {
        "name": "Ptéra",
        "type1": "Roche",
        "type2": "Vol",
        "habitat": "Montagne",
        "couleur": [
            "Gris",
            "Violet"
        ],
        "evolution": 1,
        "hauteur": 1.8,
        "poids": 59
    },
    {
        "name": "Salamèche",
        "type1": "Feu",
        "type2": "Aucun",
        "habitat": "Montagne",
        "couleur": [
            "Orange"
        ],
        "evolution": 1,
        "hauteur": 0.6,
        "poids": 8.5
    },
    {
        "name": "Sabelette",
        "type1": "Sol",
        "type2": "Aucun",
        "habitat": "Milieux hostiles",
        "couleur": [
            "Jaune"
        ],
        "evolution": 1,
        "hauteur": 0.6,
        "poids": 12
    },
    {
        "name": "Sablaireau",
        "type1": "Sol",
        "type2": "Aucun",
        "habitat": "Milieux hostiles",
        "couleur": [
            "Jaune"
        ],
        "evolution": 2,
        "hauteur": 1,
        "poids": 29.5
    },
    {
        "name": "Spectrum",
        "type1": "Spectre",
        "type2": "Poison",
        "habitat": "Grotte",
        "couleur": [
            "Violet"
        ],
        "evolution": 2,
        "hauteur": 1.6,
        "poids": 0.1
    },
    {
        "name": "Soporifik",
        "type1": "Psy",
        "type2": "Aucun",
        "habitat": "Champs",
        "couleur": [
            "Marron",
            "Jaune"
        ],
        "evolution": 1,
        "hauteur": 1,
        "poids": 32.4
    },
    {
        "name": "Smogo",
        "type1": "Poison",
        "type2": "Aucun",
        "habitat": "Urbain",
        "couleur": [
            "Violet"
        ],
        "evolution": 1,
        "hauteur": 0.6,
        "poids": 1
    },
    {
        "name": "Smogogo",
        "type1": "Poison",
        "type2": "Aucun",
        "habitat": "Urbain",
        "couleur": [
            "Violet"
        ],
        "evolution": 2,
        "hauteur": 1.2,
        "poids": 9.5
    },
    {
        "name": "Saquedeneu",
        "type1": "Plante",
        "type2": "Aucun",
        "habitat": "Champs",
        "couleur": [
            "Bleu"
        ],
        "evolution": 1,
        "hauteur": 1,
        "poids": 35
    },
    {
        "name": "Stari",
        "type1": "Eau",
        "type2": "Aucun",
        "habitat": "Mer",
        "couleur": [
            "Marron",
            "Jaune"
        ],
        "evolution": 1,
        "hauteur": 0.8,
        "poids": 34.5
    },
    {
        "name": "Staross",
        "type1": "Eau",
        "type2": "Aucun",
        "habitat": "Mer",
        "couleur": [
            "Violet"
        ],
        "evolution": 2,
        "hauteur": 1.1,
        "poids": 80
    },
    {
        "name": "Scarabrute",
        "type1": "Insecte",
        "type2": "Aucun",
        "habitat": "Forêt",
        "couleur": [
            "Marron"
        ],
        "evolution": 1,
        "hauteur": 1.5,
        "poids": 55
    },
    {
        "name": "Sulfura",
        "type1": "Feu",
        "type2": "Vol",
        "habitat": "Rare",
        "couleur": [
            "Jaune"
        ],
        "evolution": 1,
        "hauteur": 2,
        "poids": 60
    },
    {
        "name": "Dracaufeu",
        "type1": "Feu",
        "type2": "Vol",
        "habitat": "Montagne",
        "couleur": [
            "Orange"
        ],
        "evolution": 3,
        "hauteur": 1.7,
        "poids": 90.5
    },
    {
        "name": "Dardargnan",
        "type1": "Insecte",
        "type2": "Poison",
        "habitat": "Forêt",
        "couleur": [
            "Noir",
            "Jaune"
        ],
        "evolution": 3,
        "hauteur": 1,
        "poids": 29.5
    },
    {
        "name": "Doduo",
        "type1": "Normal",
        "type2": "Vol",
        "habitat": "Champs",
        "couleur": [
            "Marron"
        ],
        "evolution": 1,
        "hauteur": 1.4,
        "poids": 39.2
    },
    {
        "name": "Dodrio",
        "type1": "Normal",
        "type2": "Vol",
        "habitat": "Champs",
        "couleur": [
            "Marron"
        ],
        "evolution": 2,
        "hauteur": 1.8,
        "poids": 85.2
    },
    {
        "name": "Draco",
        "type1": "Dragon",
        "type2": "Aucun",
        "habitat": "Marécages",
        "couleur": [
            "Bleu"
        ],
        "evolution": 2,
        "hauteur": 4,
        "poids": 16.5
    },
    {
        "name": "Dracolosse",
        "type1": "Dragon",
        "type2": "Vol",
        "habitat": "Marécages",
        "couleur": [
            "Orange"
        ],
        "evolution": 3,
        "hauteur": 2.2,
        "poids": 210
    },
    {
        "name": "Florizarre",
        "type1": "Plante",
        "type2": "Poison",
        "habitat": "Champs",
        "couleur": [
            "Vert"
        ],
        "evolution": 3,
        "hauteur": 2,
        "poids": 100
    },
    {
        "name": "Feunard",
        "type1": "Feu",
        "type2": "Aucun",
        "habitat": "Champs",
        "couleur": [
            "Jaune"
        ],
        "evolution": 2,
        "hauteur": 1.1,
        "poids": 19.9
    },
    {
        "name": "Férosinge",
        "type1": "Combat",
        "type2": "Aucun",
        "habitat": "Montagne",
        "couleur": [
            "Marron",
            "Blanc"
        ],
        "evolution": 1,
        "hauteur": 0.5,
        "poids": 28
    },
    {
        "name": "Flagadoss",
        "type1": "Eau",
        "type2": "Psy",
        "habitat": "Marécages",
        "couleur": [
            "Rose"
        ],
        "evolution": 2,
        "hauteur": 1.6,
        "poids": 78.5
    },
    {
        "name": "Fantominus",
        "type1": "Spectre",
        "type2": "Poison",
        "habitat": "Grotte",
        "couleur": [
            "Noir",
            "Violet"
        ],
        "evolution": 1,
        "hauteur": 1.3,
        "poids": 100
    },
    {
        "name": "Goupix",
        "type1": "Feu",
        "type2": "Aucun",
        "habitat": "Champs",
        "couleur": [
            "Marron",
            "Orange"
        ],
        "evolution": 1,
        "hauteur": 0.6,
        "poids": 9.9
    },
    {
        "name": "Grodoudou",
        "type1": "Normal",
        "type2": "Fée",
        "habitat": "Champs",
        "couleur": [
            "Rose"
        ],
        "evolution": 2,
        "hauteur": 1,
        "poids": 12
    },
    {
        "name": "Gravalanch",
        "type1": "Roche",
        "type2": "Sol",
        "habitat": "Montagne",
        "couleur": [
            "Gris"
        ],
        "evolution": 2,
        "hauteur": 1,
        "poids": 105
    },
    {
        "name": "Grolem",
        "type1": "Roche",
        "type2": "Sol",
        "habitat": "Montagne",
        "couleur": [
            "Gris"
        ],
        "evolution": 3,
        "hauteur": 1.4,
        "poids": 300
    },
    {
        "name": "Galopa",
        "type1": "Feu",
        "type2": "Aucun",
        "habitat": "Champs",
        "couleur": [
            "Orange",
            "Jaune"
        ],
        "evolution": 2,
        "hauteur": 1.7,
        "poids": 95
    },
    {
        "name": "Grotadmorv",
        "type1": "Poison",
        "type2": "Aucun",
        "habitat": "Urbain",
        "couleur": [
            "Violet"
        ],
        "evolution": 2,
        "hauteur": 1.2,
        "poids": 30
    },
    {
        "name": "Herbizarre",
        "type1": "Plante",
        "type2": "Poison",
        "habitat": "Champs",
        "couleur": [
            "Vert"
        ],
        "evolution": 2,
        "hauteur": 1,
        "poids": 13
    },
    {
        "name": "Hypotrempe",
        "type1": "Eau",
        "type2": "Aucun",
        "habitat": "Mer",
        "couleur": [
            "Bleu"
        ],
        "evolution": 1,
        "hauteur": 0.4,
        "poids": 8
    },
    {
        "name": "Hypocéan",
        "type1": "Eau",
        "type2": "Aucun",
        "habitat": "Mer",
        "couleur": [
            "Bleu"
        ],
        "evolution": 2,
        "hauteur": 1.2,
        "poids": 25
    },
    {
        "name": "Kadabra",
        "type1": "Psy",
        "type2": "Aucun",
        "habitat": "Urbain",
        "couleur": [
            "Jaune"
        ],
        "evolution": 2,
        "hauteur": 1.3,
        "poids": 56.5
    },
    {
        "name": "Kokiyas",
        "type1": "Eau",
        "type2": "Aucun",
        "habitat": "Mer",
        "couleur": [
            "Noir",
            "Violet"
        ],
        "evolution": 1,
        "hauteur": 0.3,
        "poids": 4
    },
    {
        "name": "Krabby",
        "type1": "Eau",
        "type2": "Aucun",
        "habitat": "Marécages",
        "couleur": [
            "Orange",
            "Blanc"
        ],
        "evolution": 1,
        "hauteur": 0.4,
        "poids": 6.5
    },
    {
        "name": "Krabboss",
        "type1": "Eau",
        "type2": "Aucun",
        "habitat": "Marécages",
        "couleur": [
            "Orange",
            "Blanc"
        ],
        "evolution": 2,
        "hauteur": 1.3,
        "poids": 60
    },
    {
        "name": "Kicklee",
        "type1": "Combat",
        "type2": "Aucun",
        "habitat": "Urbain",
        "couleur": [
            "Marron"
        ],
        "evolution": 2,
        "hauteur": 1.5,
        "poids": 49.8
    },
    {
        "name": "Kangourex",
        "type1": "Normal",
        "type2": "Aucun",
        "habitat": "Champs",
        "couleur": [
            "Marron"
        ],
        "evolution": 1,
        "hauteur": 2.2,
        "poids": 80
    },
    {
        "name": "Kabuto",
        "type1": "Roche",
        "type2": "Eau",
        "habitat": "Mer",
        "couleur": [
            "Noir",
            "Marron"
        ],
        "evolution": 1,
        "hauteur": 0.5,
        "poids": 11.5
    },
    {
        "name": "Kabutops",
        "type1": "Roche",
        "type2": "Eau",
        "habitat": "Mer",
        "couleur": [
            "Marron"
        ],
        "evolution": 2,
        "hauteur": 1.3,
        "poids": 40.5
    },
    {
        "name": "Lamantine",
        "type1": "Eau",
        "type2": "Glace",
        "habitat": "Mer",
        "couleur": [
            "Blanc"
        ],
        "evolution": 2,
        "hauteur": 1.7,
        "poids": 120
    },
    {
        "name": "Leveinard",
        "type1": "Normal",
        "type2": "Aucun",
        "habitat": "Urbain",
        "couleur": [
            "Rose"
        ],
        "evolution": 1,
        "hauteur": 1.1,
        "poids": 34.6
    },
    {
        "name": "Lippoutou",
        "type1": "Glace",
        "type2": "Psy",
        "habitat": "Urbain",
        "couleur": [
            "Violet",
            "Rouge"
        ],
        "evolution": 1,
        "hauteur": 1.4,
        "poids": 40.6
    },
    {
        "name": "Léviator",
        "type1": "Eau",
        "type2": "Vol",
        "habitat": "Marécages",
        "couleur": [
            "Bleu"
        ],
        "evolution": 2,
        "hauteur": 6.5,
        "poids": 235
    },
    {
        "name": "Lokhlass",
        "type1": "Eau",
        "type2": "Glace",
        "habitat": "Mer",
        "couleur": [
            "Bleu"
        ],
        "evolution": 1,
        "hauteur": 2.5,
        "poids": 220
    },
    {
        "name": "Mélofée",
        "type1": "Feu",
        "type2": "Aucun",
        "habitat": "Montagne",
        "couleur": [
            "Rose"
        ],
        "evolution": 1,
        "hauteur": 0.6,
        "poids": 7.5
    },
    {
        "name": "Mélodelfe",
        "type1": "Feu",
        "type2": "Aucun",
        "habitat": "Montagne",
        "couleur": [
            "Rose"
        ],
        "evolution": 2,
        "hauteur": 1.3,
        "poids": 40
    },
    {
        "name": "Mystherbe",
        "type1": "Plante",
        "type2": "Poison",
        "habitat": "Champs",
        "couleur": [
            "Bleu",
            "Vert"
        ],
        "evolution": 1,
        "hauteur": 0.5,
        "poids": 5.4
    },
    {
        "name": "Mimitoss",
        "type1": "Insecte",
        "type2": "Poison",
        "habitat": "Forêt",
        "couleur": [
            "Violet"
        ],
        "evolution": 1,
        "hauteur": 1,
        "poids": 30
    },
    {
        "name": "Miaouss",
        "type1": "Normal",
        "type2": "Aucun",
        "habitat": "Urbain",
        "couleur": [
            "Jaune"
        ],
        "evolution": 1,
        "hauteur": 0.4,
        "poids": 4.2
    },
    {
        "name": "Machoc",
        "type1": "Combat",
        "type2": "Aucun",
        "habitat": "Montagne",
        "couleur": [
            "Gris"
        ],
        "evolution": 1,
        "hauteur": 0.8,
        "poids": 19.5
    },
    {
        "name": "Machopeur",
        "type1": "Combat",
        "type2": "Aucun",
        "habitat": "Montagne",
        "couleur": [
            "Violet"
        ],
        "evolution": 2,
        "hauteur": 1.5,
        "poids": 70.5
    },
    {
        "name": "Mackogneur",
        "type1": "Combat",
        "type2": "Aucun",
        "habitat": "Montagne",
        "couleur": [
            "Gris"
        ],
        "evolution": 3,
        "hauteur": 1.6,
        "poids": 130
    },
    {
        "name": "Magnéti",
        "type1": "Electrik",
        "type2": "Acier",
        "habitat": "Milieux hostiles",
        "couleur": [
            "Gris"
        ],
        "evolution": 1,
        "hauteur": 0.3,
        "poids": 6
    },
    {
        "name": "Magnéton",
        "type1": "Electrik",
        "type2": "Acier",
        "habitat": "Milieux hostiles",
        "couleur": [
            "Gris"
        ],
        "evolution": 2,
        "hauteur": 1,
        "poids": 60
    },
    {
        "name": "M. Mime",
        "type1": "Psy",
        "type2": "Fée",
        "habitat": "Urbain",
        "couleur": [
            "Rose",
            "Blanc"
        ],
        "evolution": 1,
        "hauteur": 1.3,
        "poids": 54.5
    },
    {
        "name": "Magmar",
        "type1": "Feu",
        "type2": "Aucun",
        "habitat": "Montagne",
        "couleur": [
            "Rouge",
            "Jaune"
        ],
        "evolution": 1,
        "hauteur": 1.3,
        "poids": 44.5
    },
    {
        "name": "Magicarpe",
        "type1": "Eau",
        "type2": "Aucun",
        "habitat": "Marécages",
        "couleur": [
            "Rouge"
        ],
        "evolution": 1,
        "hauteur": 0.9,
        "poids": 10
    },
    {
        "name": "Minidraco",
        "type1": "Dragon",
        "type2": "Aucun",
        "habitat": "Marécages",
        "couleur": [
            "Bleu"
        ],
        "evolution": 1,
        "hauteur": 1.8,
        "poids": 3.3
    },
    {
        "name": "Mewtwo",
        "type1": "Psy",
        "type2": "Aucun",
        "habitat": "Rare",
        "couleur": [
            "Gris",
            "Violet"
        ],
        "evolution": 1,
        "hauteur": 2,
        "poids": 122
    },
    {
        "name": "Mew",
        "type1": "Psy",
        "type2": "Aucun",
        "habitat": "Rare",
        "couleur": [
            "Rose"
        ],
        "evolution": 1,
        "hauteur": 0.4,
        "poids": 4
    },
    {
        "name": "Carapuce",
        "type1": "Eau",
        "type2": "Aucun",
        "habitat": "Marécages",
        "couleur": [
            "Bleu"
        ],
        "evolution": 1,
        "hauteur": 0.5,
        "poids": 9
    },
    {
        "name": "Carabaffe",
        "type1": "Eau",
        "type2": "Aucun",
        "habitat": "Marécages",
        "couleur": [
            "Bleu"
        ],
        "evolution": 2,
        "hauteur": 1,
        "poids": 22.5
    },
    {
        "name": "Chenipan",
        "type1": "Insecte",
        "type2": "Aucun",
        "habitat": "Forêt",
        "couleur": [
            "Vert"
        ],
        "evolution": 1,
        "hauteur": 0.3,
        "poids": 2.9
    },
    {
        "name": "Chrysacier",
        "type1": "Insecte",
        "type2": "Aucun",
        "habitat": "Forêt",
        "couleur": [
            "Vert"
        ],
        "evolution": 2,
        "hauteur": 0.7,
        "poids": 9.9
    },
    {
        "name": "Coconfort",
        "type1": "Insecte",
        "type2": "Poison",
        "habitat": "Forêt",
        "couleur": [
            "Jaune"
        ],
        "evolution": 2,
        "hauteur": 0.6,
        "poids": 10
    },
    {
        "name": "Colossinge",
        "type1": "Combat",
        "type2": "Aucun",
        "habitat": "Montagne",
        "couleur": [
            "Marron",
            "Blanc"
        ],
        "evolution": 2,
        "hauteur": 1,
        "poids": 32
    },
    {
        "name": "Caninos",
        "type1": "Feu",
        "type2": "Aucun",
        "habitat": "Champs",
        "couleur": [
            "Orange",
            "Jaune"
        ],
        "evolution": 1,
        "hauteur": 0.7,
        "poids": 19
    },
    {
        "name": "Chétiflor",
        "type1": "Plante",
        "type2": "Poison",
        "habitat": "Forêt",
        "couleur": [
            "Vert",
            "Jaune"
        ],
        "evolution": 1,
        "hauteur": 0.7,
        "poids": 4
    },
    {
        "name": "Canarticho",
        "type1": "Normal",
        "type2": "Vol",
        "habitat": "Champs",
        "couleur": [
            "Marron"
        ],
        "evolution": 1,
        "hauteur": 0.8,
        "poids": 15
    },
    {
        "name": "Crustabri",
        "type1": "Eau",
        "type2": "Glace",
        "habitat": "Mer",
        "couleur": [
            "Violet"
        ],
        "evolution": 2,
        "hauteur": 1.5,
        "poids": 132.5
    },
    {
        "name": "Voltorbe",
        "type1": "Electrik",
        "type2": "Aucun",
        "habitat": "Urbain",
        "couleur": [
            "Rouge",
            "Blanc"
        ],
        "evolution": 1,
        "hauteur": 0.5,
        "poids": 10.4
    },
    {
        "name": "Voltali",
        "type1": "Electrik",
        "type2": "Aucun",
        "habitat": "Urbain",
        "couleur": [
            "Jaune"
        ],
        "evolution": 2,
        "hauteur": 0.8,
        "poids": 24.5
    },
    {
        "name": "Bulbizarre",
        "type1": "Plante",
        "type2": "Poison",
        "habitat": "Champs",
        "couleur": [
            "Vert"
        ],
        "evolution": 1,
        "hauteur": 0.7,
        "poids": 6.9
    },
    {
        "name": "Boustiflor",
        "type1": "Plante",
        "type2": "Poison",
        "habitat": "Forêt",
        "couleur": [
            "Vert",
            "Jaune"
        ],
        "evolution": 2,
        "hauteur": 1,
        "poids": 6.4
    },
    {
        "name": "Nidoran♀",
        "type1": "Poison",
        "type2": "Aucun",
        "habitat": "Champs",
        "couleur": [
            "Bleu"
        ],
        "evolution": 1,
        "hauteur": 0.4,
        "poids": 7
    },
    {
        "name": "Nidorina",
        "type1": "Poison",
        "type2": "Aucun",
        "habitat": "Champs",
        "couleur": [
            "Bleu"
        ],
        "evolution": 2,
        "hauteur": 0.8,
        "poids": 20
    },
    {
        "name": "Nidoqueen",
        "type1": "Poison",
        "type2": "Sol",
        "habitat": "Champs",
        "couleur": [
            "Bleu"
        ],
        "evolution": 3,
        "hauteur": 1.3,
        "poids": 60
    },
    {
        "name": "Nidoran♂",
        "type1": "Poison",
        "type2": "Aucun",
        "habitat": "Champs",
        "couleur": [
            "Violet"
        ],
        "evolution": 1,
        "hauteur": 0.5,
        "poids": 9
    },
    {
        "name": "Nidorino",
        "type1": "Poison",
        "type2": "Aucun",
        "habitat": "Champs",
        "couleur": [
            "Violet"
        ],
        "evolution": 2,
        "hauteur": 0.9,
        "poids": 19.5
    },
    {
        "name": "Nidoking",
        "type1": "Poison",
        "type2": "Sol",
        "habitat": "Champs",
        "couleur": [
            "Violet"
        ],
        "evolution": 3,
        "hauteur": 1.4,
        "poids": 62
    },
    {
        "name": "Nosferapti",
        "type1": "Poison",
        "type2": "Vol",
        "habitat": "Grotte",
        "couleur": [
            "Bleu",
            "Violet"
        ],
        "evolution": 1,
        "hauteur": 0.8,
        "poids": 7.5
    },
    {
        "name": "Nosferalto",
        "type1": "Poison",
        "type2": "Vol",
        "habitat": "Grotte",
        "couleur": [
            "Bleu",
            "Violet"
        ],
        "evolution": 2,
        "hauteur": 1.6,
        "poids": 55
    },
    {
        "name": "Noeunoeuf",
        "type1": "Plante",
        "type2": "Psy",
        "habitat": "Forêt",
        "couleur": [
            "Rose"
        ],
        "evolution": 1,
        "hauteur": 0.4,
        "poids": 2.5
    },
    {
        "name": "Noadkoko",
        "type1": "Plante",
        "type2": "Psy",
        "habitat": "Forêt",
        "couleur": [
            "Marron",
            "Jaune"
        ],
        "evolution": 2,
        "hauteur": 2,
        "poids": 120
    },
    {
        "name": "Hypnomade",
        "type1": "Psy",
        "type2": "Aucun",
        "habitat": "Champs",
        "couleur": [
            "Jaune"
        ],
        "evolution": 2,
        "hauteur": 1.6,
        "poids": 75.6
    }
]

let best = bestChamp(data);

let button = document.createElement('button');
button.innerHTML = best.name;
button.classList.add('btn');
button.classList.add('recommandation');
button.onclick = function() {
    proposition(best);
};

document.getElementById('result').appendChild(button);