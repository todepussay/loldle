let input = document.getElementById('input');

let data;

let iteration = 0;

let ban_sexe = []
let ban_role = []
let ban_espece = []
let ban_ressource = []
let ban_region = []

let good_sexe = ""
let good_role = []
let good_role_temp = []
let good_espece = []
let good_espece_temp = []
let good_ressource = ""
let good_type = []
let good_region = []
let good_release = 0
let release_max = 0
let release_min = 0


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

    let champ = document.createElement('h2');
    champ.innerHTML = perso.name;
    div.appendChild(champ);

    let box_sexe = document.createElement('div');
    box_sexe.classList.add('box');
    box_sexe.classList.add('good');
    box_sexe.onclick = function() {
        changeBoxTrueFalse(box_sexe);
    };
    box_sexe.innerHTML = perso.sexe;

    div.appendChild(box_sexe);

    let box_role = document.createElement('div');
    box_role.classList.add('box');
    box_role.classList.add('good');
    box_role.onclick = function() {
        changeBox(box_role);
    };
    box_role.innerHTML = perso.role;

    div.appendChild(box_role);

    let box_espece = document.createElement('div');
    box_espece.classList.add('box');
    box_espece.classList.add('good');
    box_espece.onclick = function() {
        changeBox(box_espece);
    };
    box_espece.innerHTML = perso.espece;

    div.appendChild(box_espece);

    let box_ressource = document.createElement('div');
    box_ressource.classList.add('box');
    box_ressource.classList.add('good');
    box_ressource.onclick = function() {
        changeBoxTrueFalse(box_ressource);
    };
    box_ressource.innerHTML = perso.ressource;

    div.appendChild(box_ressource);

    let box_type = document.createElement('div');
    box_type.classList.add('box');
    box_type.classList.add('good');
    box_type.onclick = function() {
        changeBox(box_type);
    };
    box_type.innerHTML = perso.type;

    div.appendChild(box_type);

    let box_region = document.createElement('div');
    box_region.classList.add('box');
    box_region.classList.add('good');
    box_region.onclick = function() {
        changeBox(box_region);
    };
    box_region.innerHTML = perso.region;

    div.appendChild(box_region);

    let box_release = document.createElement('div');
    box_release.classList.add('box');
    
    let span = document.createElement('span');
    span.innerHTML = perso.release;
    box_release.appendChild(span);

    let operator = document.createElement('span');
    operator.classList.add('egale');
    operator.innerHTML = '=';
    operator.onclick = function() {
        changeRelease(operator);
    };
    box_release.appendChild(operator);

    div.appendChild(box_release);

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

    let sexe = propo.childNodes[1];

    if(good_sexe == ""){
        if(sexe.classList.contains('good')) {
            good_sexe = sexe.innerHTML;
        } else {
            ban_sexe.push(sexe.innerHTML);
        }
    }

    let role = propo.childNodes[2];

    if(good_role.length === 0){
        let role_temp = role.innerHTML.split(',');
        
        if(role.classList.contains('good')) {
            good_role = role_temp;
        } else {
            if(role.classList.contains('maybe')) {
                if (role_temp.length === 1){
                    good_role_temp = role_temp;
                }
            } else {
                ban_role = role_temp;
            }
        }
    }

    let espece = propo.childNodes[3];

    if(good_espece.length === 0){
        let espece_temp = espece.innerHTML.split(',');
        
        if(espece.classList.contains('good')) {
            good_espece = espece_temp;
        } else {
            if(espece.classList.contains('maybe')) {
                if (espece_temp.length === 1){
                    good_espece_temp = espece_temp;
                }
            } else {
                ban_espece = espece_temp;
            }
        }
    }

    let ressource = propo.childNodes[4];

    if(good_ressource == ""){
        if(ressource.classList.contains('good')) {
            good_ressource = ressource.innerHTML;
        } else {
            ban_ressource.push(ressource.innerHTML);
        }
    }

    let type = propo.childNodes[5];
    let type_possible = ['Mêlée', 'À distance']
    
    if(good_type.length === 0){
        let type_temp = type.innerHTML.split(',');

        if(type.classList.contains('good')) {
            good_type = type_temp;
        } else {
            if(type.classList.contains('maybe')) {
                if (type_temp.length === 1){
                    good_type = type_possible;
                }
            } else {
                good_type = type_possible.filter(function(e) { return this.indexOf(e) < 0; }, type_temp);
            }
        }
    }

    let region = propo.childNodes[6];

    if(good_region.length === 0){
        let region_temp = region.innerHTML.split(',');

        if(region.classList.contains('good')) {
            good_region = region_temp;
        } else {
            if(region.classList.contains('maybe')) {
                if (region_temp.length === 1){
                    good_region = region_temp;
                }
            } else {
                ban_region = region_temp;
            }
        }
    }

    let release_date = propo.childNodes[7].firstChild.innerHTML;
    let release_operator = propo.childNodes[7].lastChild.innerHTML;

    if(good_release == 0){
        if (release_operator == '=') {
            good_release = release_date;
        } else {
            if (release_operator == '/\\') {
                release_min = release_date;
            } else {
                release_max = release_date;
            }
        }
    }

    let result = [];

    data.forEach((champ) => {
        let sexe_ok = true;

        if (good_sexe == ""){
            if (ban_sexe.includes(champ['sexe'])) {
                sexe_ok = false;
            }
        } else {
            if (champ['sexe'] != good_sexe) {
                sexe_ok = false;
            }
        }

        if(sexe_ok){
            
            let role_ok = true;

            if (good_role.length === 0){
                if(ban_role.length > 0){
                    ban_role.forEach((role) => {
                        if(champ['role'].includes(role)){
                            role_ok = false;
                        }
                    })
                } else {
                    if (good_role_temp.length != 0) {
                        if(!champ['role'].includes(good_role_temp[0])){
                            role_ok = false;
                        }
                    }
                }
            } else {
                if(champ['role'].length !== good_role.length){
                    role_ok = false;
                }
                
                const listeTriee1 = champ['role'].slice().sort();
                const listeTriee2 = good_role.slice().sort();

                for (let i = 0; i < listeTriee1.length; i++) {
                    if (listeTriee1[i] !== listeTriee2[i]) {
                        role_ok = false;
                    }
                }
            }

            if(role_ok){
                
                let espece_ok = true;

                if (good_espece.length === 0){
                    if(ban_espece.length > 0){
                        ban_espece.forEach((espece) => {
                            if(champ['espece'].includes(espece)){
                                espece_ok = false;
                            }
                        })
                    } else {
                        if (good_espece_temp.length != 0) {
                            if(!champ['espece'].includes(good_espece_temp[0])){
                                espece_ok = false;
                            }
                        }
                    }
                } else {
                    if(champ['espece'].length !== good_espece.length){
                        espece_ok = false;
                    }
                    
                    const listeTriee1 = champ['espece'].slice().sort();
                    const listeTriee2 = good_espece.slice().sort();

                    for (let i = 0; i < listeTriee1.length; i++) {
                        if (listeTriee1[i] !== listeTriee2[i]) {
                            espece_ok = false;
                        }
                    }
                }

                if(espece_ok){
                    
                    let ressource_ok = true;

                    if (good_ressource == ""){
                        if (ban_ressource.includes(champ['ressource'])) {
                            ressource_ok = false;
                        }
                    } else {
                        if (champ['ressource'] != good_ressource) {
                            ressource_ok = false;
                        }
                    }

                    if(ressource_ok){
                    
                        let type_ok = true;

                        if(good_type === 0){

                            if(champ['type'].length > 1){
                                type_ok = false;
                            }
                            
                        } else {
                            if(champ['type'].length !== good_type.length){
                                type_ok = false;
                            }
                            
                            const listeTriee1 = champ['type'].slice().sort();
                            const listeTriee2 = good_type.slice().sort();

                            for (let i = 0; i < listeTriee1.length; i++) {
                                if (listeTriee1[i] !== listeTriee2[i]) {
                                    type_ok = false;
                                }
                            }
                        }
                        
                        if(type_ok){

                            let region_ok = true;

                            if (good_region.length === 0){
                                if(ban_region.length > 0){
                                    ban_region.forEach((region) => {
                                        if(champ['region'].includes(region)){
                                            region_ok = false;
                                        }
                                    })
                                }
                            } else {
                                if(champ['region'].length !== good_region.length){
                                    region_ok = false;
                                }
                                
                                const listeTriee1 = champ['region'].slice().sort();
                                const listeTriee2 = good_region.slice().sort();

                                for (let i = 0; i < listeTriee1.length; i++) {
                                    if (listeTriee1[i] !== listeTriee2[i]) {
                                        region_ok = false;
                                    }
                                }
                            }

                            if(region_ok){

                                let release_ok = true;

                                if (good_release == 0){
                                    if (release_max != 0) {
                                        if(champ['release'] >= release_max){
                                            release_ok = false;
                                        }
                                    }
                                    if (release_min != 0) {
                                        if(champ['release'] <= release_min){
                                            release_ok = false;
                                        }
                                    }
                                } else {
                                    if(champ['release'] != good_release){
                                        release_ok = false;
                                    }
                                }

                                if(release_ok){
                                    
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

    let champ = liste[0];
    let score = 0;

    for(let i = 0; i < liste.length; i++) {
        let score_temp = 0;

        score_temp += liste[i].role.length;
        score_temp += liste[i].espece.length;
        score_temp += liste[i].region.length;

        if (score_temp > score) {
            score = score_temp;
            champ = liste[i];
        }
    }

    return champ;
}

function changeBoxTrueFalse(box){
    if(box.classList.contains('good')) {
        box.classList.remove('good');
        box.classList.add('bad');
    } else {
        box.classList.remove('bad');
        box.classList.add('good');
    }
}

function changeBox(box){
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

function changeRelease(operator){
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
        "name": "Aatrox",
        "sexe": "Masculin",
        "role": [
            "Haut"
        ],
        "espece": [
            "Darkin"
        ],
        "ressource": "Sans mana",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Runeterra",
            "Shurima"
        ],
        "release": 2013
    },
    {
        "name": "Ahri",
        "sexe": "Feminin",
        "role": [
            "Milieu"
        ],
        "espece": [
            "Vastaya"
        ],
        "ressource": "Mana",
        "type": [
            "À distance"
        ],
        "region": [
            "Ionia"
        ],
        "release": 2011
    },
    {
        "name": "Akali",
        "sexe": "Feminin",
        "role": [
            "Milieu",
            "Haut"
        ],
        "espece": [
            "Humain"
        ],
        "ressource": "Énergie",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Ionia"
        ],
        "release": 2010
    },
    {
        "name": "Akshan",
        "sexe": "Masculin",
        "role": [
            "Milieu",
            "Haut"
        ],
        "espece": [
            "Humain"
        ],
        "ressource": "Mana",
        "type": [
            "À distance"
        ],
        "region": [
            "Shurima"
        ],
        "release": 2021
    },
    {
        "name": "Alistar",
        "sexe": "Masculin",
        "role": [
            "Support"
        ],
        "espece": [
            "Minotaure"
        ],
        "ressource": "Mana",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Runeterra"
        ],
        "release": 2009
    },
    {
        "name": "Amumu",
        "sexe": "Masculin",
        "role": [
            "Jungle",
            "Support"
        ],
        "espece": [
            "Mort-vivant",
            "Yordle"
        ],
        "ressource": "Mana",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Shurima"
        ],
        "release": 2009
    },
    {
        "name": "Anivia",
        "sexe": "Feminin",
        "role": [
            "Milieu"
        ],
        "espece": [
            "Dieu",
            "Esprit"
        ],
        "ressource": "Mana",
        "type": [
            "À distance"
        ],
        "region": [
            "Freljord"
        ],
        "release": 2009
    },
    {
        "name": "Annie",
        "sexe": "Feminin",
        "role": [
            "Milieu",
            "Support"
        ],
        "espece": [
            "Humain",
            "Né magique"
        ],
        "ressource": "Mana",
        "type": [
            "À distance"
        ],
        "region": [
            "Noxus",
            "Runeterra"
        ],
        "release": 2009
    },
    {
        "name": "Aphelios",
        "sexe": "Masculin",
        "role": [
            "Bas"
        ],
        "espece": [
            "Humain",
            "Spiritualiste"
        ],
        "ressource": "Mana",
        "type": [
            "À distance"
        ],
        "region": [
            "Targon"
        ],
        "release": 2019
    },
    {
        "name": "Ashe",
        "sexe": "Feminin",
        "role": [
            "Bas",
            "Support"
        ],
        "espece": [
            "Humain",
            "Né de glace"
        ],
        "ressource": "Mana",
        "type": [
            "À distance"
        ],
        "region": [
            "Freljord"
        ],
        "release": 2009
    },
    {
        "name": "Aurelion Sol",
        "sexe": "Masculin",
        "role": [
            "Milieu"
        ],
        "espece": [
            "Céleste",
            "Dragon"
        ],
        "ressource": "Mana",
        "type": [
            "À distance"
        ],
        "region": [
            "Runeterra",
            "Targon"
        ],
        "release": 2016
    },
    {
        "name": "Azir",
        "sexe": "Masculin",
        "role": [
            "Milieu"
        ],
        "espece": [
            "Dieu",
            "Guerrier"
        ],
        "ressource": "Mana",
        "type": [
            "À distance"
        ],
        "region": [
            "Shurima"
        ],
        "release": 2014
    },
    {
        "name": "Xin Zhao",
        "sexe": "Masculin",
        "role": [
            "Jungle"
        ],
        "espece": [
            "Humain"
        ],
        "ressource": "Mana",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Demacia",
            "Ionia",
            "Noxus"
        ],
        "release": 2010
    },
    {
        "name": "Zac",
        "sexe": "Masculin",
        "role": [
            "Jungle"
        ],
        "espece": [
            "Golem"
        ],
        "ressource": "Coûts de santé",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Zaun"
        ],
        "release": 2013
    },
    {
        "name": "Zed",
        "sexe": "Masculin",
        "role": [
            "Milieu"
        ],
        "espece": [
            "Humain",
            "Altéré Magiquement"
        ],
        "ressource": "Énergie",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Ionia"
        ],
        "release": 2012
    },
    {
        "name": "Zeri",
        "sexe": "Feminin",
        "role": [
            "Bas"
        ],
        "espece": [
            "Humain",
            "Né magique"
        ],
        "ressource": "Mana",
        "type": [
            "À distance"
        ],
        "region": [
            "Zaun"
        ],
        "release": 2022
    },
    {
        "name": "Ziggs",
        "sexe": "Masculin",
        "role": [
            "Bas",
            "Milieu"
        ],
        "espece": [
            "Yordle"
        ],
        "ressource": "Mana",
        "type": [
            "À distance"
        ],
        "region": [
            "Zaun"
        ],
        "release": 2012
    },
    {
        "name": "Zilean",
        "sexe": "Masculin",
        "role": [
            "Support"
        ],
        "espece": [
            "Humain",
            "Né magique"
        ],
        "ressource": "Mana",
        "type": [
            "À distance"
        ],
        "region": [
            "Icathia",
            "Runeterra",
            "Shurima"
        ],
        "release": 2009
    },
    {
        "name": "Zoé",
        "sexe": "Feminin",
        "role": [
            "Milieu"
        ],
        "espece": [
            "Hôte",
            "Humain"
        ],
        "ressource": "Mana",
        "type": [
            "À distance"
        ],
        "region": [
            "Targon"
        ],
        "release": 2017
    },
    {
        "name": "Zyra",
        "sexe": "Feminin",
        "role": [
            "Support"
        ],
        "espece": [
            "Inconnu"
        ],
        "ressource": "Mana",
        "type": [
            "À distance"
        ],
        "region": [
            "Ixtal"
        ],
        "release": 2012
    },
    {
        "name": "Ekko",
        "sexe": "Masculin",
        "role": [
            "Jungle",
            "Milieu"
        ],
        "espece": [
            "Humain"
        ],
        "ressource": "Mana",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Zaun"
        ],
        "release": 2015
    },
    {
        "name": "Elise",
        "sexe": "Feminin",
        "role": [
            "Jungle"
        ],
        "espece": [
            "Humain",
            "Altéré Magiquement"
        ],
        "ressource": "Mana",
        "type": [
            "Mêlée",
            "À distance"
        ],
        "region": [
            "Noxus",
            "Îles Obscures"
        ],
        "release": 2012
    },
    {
        "name": "Evelynn",
        "sexe": "Feminin",
        "role": [
            "Jungle"
        ],
        "espece": [
            "Démon",
            "Esprit"
        ],
        "ressource": "Mana",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Runeterra"
        ],
        "release": 2009
    },
    {
        "name": "Ezreal",
        "sexe": "Masculin",
        "role": [
            "Bas"
        ],
        "espece": [
            "Humain",
            "Né magique"
        ],
        "ressource": "Mana",
        "type": [
            "À distance"
        ],
        "region": [
            "Piltover"
        ],
        "release": 2010
    },
    {
        "name": "Nunu et Willump",
        "sexe": "Masculin",
        "role": [
            "Jungle"
        ],
        "espece": [
            "Humain",
            "Yeti"
        ],
        "ressource": "Mana",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Freljord"
        ],
        "release": 2009
    },
    {
        "name": "Rakan",
        "sexe": "Masculin",
        "role": [
            "Support"
        ],
        "espece": [
            "Vastaya"
        ],
        "ressource": "Mana",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Ionia"
        ],
        "release": 2017
    },
    {
        "name": "Rammus",
        "sexe": "Masculin",
        "role": [
            "Jungle"
        ],
        "espece": [
            "Dieu-Guerrier"
        ],
        "ressource": "Mana",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Shurima"
        ],
        "release": 2009
    },
    {
        "name": "Rek'Sai",
        "sexe": "Feminin",
        "role": [
            "Jungle"
        ],
        "espece": [
            "Être du néant"
        ],
        "ressource": "Rage",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Shurima",
            "Le Néant"
        ],
        "release": 2014
    },
    {
        "name": "Rell",
        "sexe": "Feminin",
        "role": [
            "Support"
        ],
        "espece": [
            "Humain",
            "Altéré Magiquement",
            "Né magique"
        ],
        "ressource": "Mana",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Noxus"
        ],
        "release": 2020
    },
    {
        "name": "Renata Glasc",
        "sexe": "Feminin",
        "role": [
            "Support"
        ],
        "espece": [
            "Altéré Chimiquement",
            "Humain"
        ],
        "ressource": "Mana",
        "type": [
            "À distance"
        ],
        "region": [
            "Zaun"
        ],
        "release": 2022
    },
    {
        "name": "Renekton",
        "sexe": "Masculin",
        "role": [
            "Haut"
        ],
        "espece": [
            "Dieu-Guerrier"
        ],
        "ressource": "Furie",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Shurima"
        ],
        "release": 2011
    },
    {
        "name": "Rengar",
        "sexe": "Masculin",
        "role": [
            "Jungle",
            "Haut"
        ],
        "espece": [
            "Vastaya"
        ],
        "ressource": "Férocité",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Ixtal",
            "Shurima"
        ],
        "release": 2012
    },
    {
        "name": "Riven",
        "sexe": "Feminin",
        "role": [
            "Haut"
        ],
        "espece": [
            "Humain"
        ],
        "ressource": "Sans Mana",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Ionia",
            "Noxus"
        ],
        "release": 2011
    },
    {
        "name": "Rumble",
        "sexe": "Masculin",
        "role": [
            "Milieu",
            "Haut"
        ],
        "espece": [
            "Yordle"
        ],
        "ressource": "Vapeur",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Bandle"
        ],
        "release": 2011
    },
    {
        "name": "Ryze",
        "sexe": "Masculin",
        "role": [
            "Milieu",
            "Haut"
        ],
        "espece": [
            "Humain",
            "Altéré Magiquement"
        ],
        "ressource": "Mana",
        "type": [
            "À distance"
        ],
        "region": [
            "Runeterra"
        ],
        "release": 2009
    },
    {
        "name": "Tahm Kench",
        "sexe": "Masculin",
        "role": [
            "Support",
            "Haut"
        ],
        "espece": [
            "Démon",
            "Esprit"
        ],
        "ressource": "Mana",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Bilgewater",
            "Runeterra"
        ],
        "release": 2015
    },
    {
        "name": "Taliyah",
        "sexe": "Feminin",
        "role": [
            "Jungle",
            "Milieu"
        ],
        "espece": [
            "Humain",
            "Né magique"
        ],
        "ressource": "Mana",
        "type": [
            "À distance"
        ],
        "region": [
            "Shurima"
        ],
        "release": 2016
    },
    {
        "name": "Talon",
        "sexe": "Masculin",
        "role": [
            "Jungle",
            "Milieu"
        ],
        "espece": [
            "Humain"
        ],
        "ressource": "Mana",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Noxus"
        ],
        "release": 2011
    },
    {
        "name": "Taric",
        "sexe": "Masculin",
        "role": [
            "Support"
        ],
        "espece": [
            "Hôte",
            "Humain"
        ],
        "ressource": "Mana",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Demacia",
            "Targon"
        ],
        "release": 2009
    },
    {
        "name": "Teemo",
        "sexe": "Masculin",
        "role": [
            "Haut"
        ],
        "espece": [
            "Yordle"
        ],
        "ressource": "Mana",
        "type": [
            "À distance"
        ],
        "region": [
            "Bandle"
        ],
        "release": 2009
    },
    {
        "name": "Thresh",
        "sexe": "Masculin",
        "role": [
            "Support"
        ],
        "espece": [
            "Mort-vivant"
        ],
        "ressource": "Mana",
        "type": [
            "À distance"
        ],
        "region": [
            "Îles Obscures"
        ],
        "release": 2013
    },
    {
        "name": "Tristana",
        "sexe": "Feminin",
        "role": [
            "Bas"
        ],
        "espece": [
            "Yordle"
        ],
        "ressource": "Mana",
        "type": [
            "À distance"
        ],
        "region": [
            "Bandle"
        ],
        "release": 2009
    },
    {
        "name": "Trundle",
        "sexe": "Masculin",
        "role": [
            "Jungle",
            "Haut"
        ],
        "espece": [
            "Né de glace",
            "Troll"
        ],
        "ressource": "Mana",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Freljord"
        ],
        "release": 2010
    },
    {
        "name": "Tryndamere",
        "sexe": "Masculin",
        "role": [
            "Haut"
        ],
        "espece": [
            "Humain",
            "Altéré Magiquement"
        ],
        "ressource": "Furie",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Freljord"
        ],
        "release": 2009
    },
    {
        "name": "Twisted Fate",
        "sexe": "Masculin",
        "role": [
            "Milieu"
        ],
        "espece": [
            "Humain",
            "Né magique"
        ],
        "ressource": "Mana",
        "type": [
            "À distance"
        ],
        "region": [
            "Bilgewater"
        ],
        "release": 2009
    },
    {
        "name": "Twitch",
        "sexe": "Masculin",
        "role": [
            "Bas"
        ],
        "espece": [
            "Altéré Chimiquement",
            "Rat"
        ],
        "ressource": "Mana",
        "type": [
            "À distance"
        ],
        "region": [
            "Zaun"
        ],
        "release": 2009
    },
    {
        "name": "Maître Yi",
        "sexe": "Masculin",
        "role": [
            "Jungle"
        ],
        "espece": [
            "Humain",
            "Spiritualiste"
        ],
        "ressource": "Mana",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Ionia"
        ],
        "release": 2009
    },
    {
        "name": "Yasuo",
        "sexe": "Masculin",
        "role": [
            "Milieu"
        ],
        "espece": [
            "Humain",
            "Né magique"
        ],
        "ressource": "Vent",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Ionia"
        ],
        "release": 2013
    },
    {
        "name": "Yone",
        "sexe": "Masculin",
        "role": [
            "Milieu",
            "Haut"
        ],
        "espece": [
            "Humain",
            "Altéré Magiquement"
        ],
        "ressource": "Sans Mana",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Ionia"
        ],
        "release": 2020
    },
    {
        "name": "Yorick",
        "sexe": "Masculin",
        "role": [
            "Haut"
        ],
        "espece": [
            "Humain",
            "Altéré Magiquement"
        ],
        "ressource": "Mana",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Îles Obscures"
        ],
        "release": 2011
    },
    {
        "name": "Yuumi",
        "sexe": "Feminin",
        "role": [
            "Support"
        ],
        "espece": [
            "Chat",
            "Altéré Magiquement"
        ],
        "ressource": "Mana",
        "type": [
            "À distance"
        ],
        "region": [
            "Bandle"
        ],
        "release": 2019
    },
    {
        "name": "Udyr",
        "sexe": "Masculin",
        "role": [
            "Jungle",
            "Haut"
        ],
        "espece": [
            "Humain",
            "Spiritualiste"
        ],
        "ressource": "Mana",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Freljord",
            "Ionia"
        ],
        "release": 2009
    },
    {
        "name": "Urgot",
        "sexe": "Masculin",
        "role": [
            "Haut"
        ],
        "espece": [
            "Altéré Chimiquement",
            "Cyborg",
            "Humain"
        ],
        "ressource": "Mana",
        "type": [
            "À distance"
        ],
        "region": [
            "Noxus",
            "Zaun"
        ],
        "release": 2010
    },
    {
        "name": "Illaoi",
        "sexe": "Feminin",
        "role": [
            "Haut"
        ],
        "espece": [
            "Humain",
            "Spiritualiste"
        ],
        "ressource": "Mana",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Bilgewater"
        ],
        "release": 2015
    },
    {
        "name": "Irelia",
        "sexe": "Feminin",
        "role": [
            "Milieu",
            "Haut"
        ],
        "espece": [
            "Humain",
            "Spiritualiste"
        ],
        "ressource": "Mana",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Ionia"
        ],
        "release": 2010
    },
    {
        "name": "Ivern",
        "sexe": "Masculin",
        "role": [
            "Jungle"
        ],
        "espece": [
            "Humain",
            "Altéré Magiquement"
        ],
        "ressource": "Mana",
        "type": [
            "À distance"
        ],
        "region": [
            "Freljord",
            "Ionia"
        ],
        "release": 2016
    },
    {
        "name": "Jarvan IV",
        "sexe": "Masculin",
        "role": [
            "Jungle"
        ],
        "espece": [
            "Humain"
        ],
        "ressource": "Mana",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Demacia"
        ],
        "release": 2011
    },
    {
        "name": "Olaf",
        "sexe": "Masculin",
        "role": [
            "Jungle",
            "Haut"
        ],
        "espece": [
            "Humain",
            "Né de glace"
        ],
        "ressource": "Mana",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Freljord"
        ],
        "release": 2010
    },
    {
        "name": "Orianna",
        "sexe": "Feminin",
        "role": [
            "Milieu"
        ],
        "espece": [
            "Golem"
        ],
        "ressource": "Mana",
        "type": [
            "À distance"
        ],
        "region": [
            "Piltover"
        ],
        "release": 2011
    },
    {
        "name": "Ornn",
        "sexe": "Masculin",
        "role": [
            "Haut"
        ],
        "espece": [
            "Dieu",
            "Esprit"
        ],
        "ressource": "Mana",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Freljord"
        ],
        "release": 2017
    },
    {
        "name": "Pantheon",
        "sexe": "Masculin",
        "role": [
            "Milieu",
            "Support",
            "Haut"
        ],
        "espece": [
            "Hôte",
            "Humain"
        ],
        "ressource": "Mana",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Targon"
        ],
        "release": 2010
    },
    {
        "name": "Poppy",
        "sexe": "Feminin",
        "role": [
            "Jungle",
            "Haut"
        ],
        "espece": [
            "Yordle"
        ],
        "ressource": "Mana",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Demacia"
        ],
        "release": 2010
    },
    {
        "name": "Pyke",
        "sexe": "Masculin",
        "role": [
            "Support"
        ],
        "espece": [
            "Revenant"
        ],
        "ressource": "Mana",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Bilgewater"
        ],
        "release": 2018
    },
    {
        "name": "Qiyana",
        "sexe": "Feminin",
        "role": [
            "Milieu"
        ],
        "espece": [
            "Humain",
            "Né magique"
        ],
        "ressource": "Mana",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Ixtal"
        ],
        "release": 2019
    },
    {
        "name": "Quinn",
        "sexe": "Feminin",
        "role": [
            "Haut"
        ],
        "espece": [
            "Humain"
        ],
        "ressource": "Mana",
        "type": [
            "À distance"
        ],
        "region": [
            "Demacia"
        ],
        "release": 2013
    },
    {
        "name": "Lee Sin",
        "sexe": "Masculin",
        "role": [
            "Jungle"
        ],
        "espece": [
            "Humain",
            "Spiritualiste"
        ],
        "ressource": "Énergie",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Ionia"
        ],
        "release": 2011
    },
    {
        "name": "Samira",
        "sexe": "Feminin",
        "role": [
            "Bas"
        ],
        "espece": [
            "Humain"
        ],
        "ressource": "Mana",
        "type": [
            "À distance"
        ],
        "region": [
            "Noxus",
            "Shurima"
        ],
        "release": 2020
    },
    {
        "name": "Sejuani",
        "sexe": "Feminin",
        "role": [
            "Jungle"
        ],
        "espece": [
            "Humain",
            "Né de glace"
        ],
        "ressource": "Mana",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Freljord"
        ],
        "release": 2012
    },
    {
        "name": "Senna",
        "sexe": "Feminin",
        "role": [
            "Support"
        ],
        "espece": [
            "Humain",
            "Mort-vivant"
        ],
        "ressource": "Mana",
        "type": [
            "À distance"
        ],
        "region": [
            "Îles Obscures"
        ],
        "release": 2019
    },
    {
        "name": "Séraphine",
        "sexe": "Feminin",
        "role": [
            "Support"
        ],
        "espece": [
            "Humain",
            "Né magique"
        ],
        "ressource": "Mana",
        "type": [
            "À distance"
        ],
        "region": [
            "Piltover",
            "Zaun"
        ],
        "release": 2020
    },
    {
        "name": "Sett",
        "sexe": "Masculin",
        "role": [
            "Haut"
        ],
        "espece": [
            "Humain",
            "Vastaya"
        ],
        "ressource": "Agressivité",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Ionia"
        ],
        "release": 2020
    },
    {
        "name": "Shaco",
        "sexe": "Masculin",
        "role": [
            "Jungle"
        ],
        "espece": [
            "Esprit"
        ],
        "ressource": "Mana",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Runeterra"
        ],
        "release": 2009
    },
    {
        "name": "Shen",
        "sexe": "Masculin",
        "role": [
            "Haut"
        ],
        "espece": [
            "Humain",
            "Spiritualiste"
        ],
        "ressource": "Énergie",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Ionia"
        ],
        "release": 2010
    },
    {
        "name": "Shyvana",
        "sexe": "Feminin",
        "role": [
            "Jungle"
        ],
        "espece": [
            "Dragon",
            "Altéré Magiquement"
        ],
        "ressource": "Furie",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Demacia"
        ],
        "release": 2011
    },
    {
        "name": "Singed",
        "sexe": "Masculin",
        "role": [
            "Haut"
        ],
        "espece": [
            "Altéré Chimiquement",
            "Humain"
        ],
        "ressource": "Mana",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Piltover",
            "Zaun"
        ],
        "release": 2009
    },
    {
        "name": "Sion",
        "sexe": "Masculin",
        "role": [
            "Haut"
        ],
        "espece": [
            "Revenant"
        ],
        "ressource": "Mana",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Noxus"
        ],
        "release": 2009
    },
    {
        "name": "Sivir",
        "sexe": "Feminin",
        "role": [
            "Bas"
        ],
        "espece": [
            "Humain"
        ],
        "ressource": "Mana",
        "type": [
            "À distance"
        ],
        "region": [
            "Shurima"
        ],
        "release": 2009
    },
    {
        "name": "Skarner",
        "sexe": "Masculin",
        "role": [
            "Jungle"
        ],
        "espece": [
            "Brackern"
        ],
        "ressource": "Mana",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Shurima"
        ],
        "release": 2011
    },
    {
        "name": "Sona",
        "sexe": "Feminin",
        "role": [
            "Support"
        ],
        "espece": [
            "Humain",
            "Né magique"
        ],
        "ressource": "Mana",
        "type": [
            "À distance"
        ],
        "region": [
            "Demacia",
            "Ionia"
        ],
        "release": 2010
    },
    {
        "name": "Soraka",
        "sexe": "Feminin",
        "role": [
            "Support"
        ],
        "espece": [
            "Céleste"
        ],
        "ressource": "Mana",
        "type": [
            "À distance"
        ],
        "region": [
            "Ionia",
            "Targon"
        ],
        "release": 2009
    },
    {
        "name": "Swain",
        "sexe": "Masculin",
        "role": [
            "Milieu",
            "Support"
        ],
        "espece": [
            "Humain",
            "Altéré Magiquement"
        ],
        "ressource": "Mana",
        "type": [
            "À distance"
        ],
        "region": [
            "Noxus"
        ],
        "release": 2010
    },
    {
        "name": "Sylas",
        "sexe": "Masculin",
        "role": [
            "Milieu"
        ],
        "espece": [
            "Humain",
            "Né magique"
        ],
        "ressource": "Mana",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Demacia",
            "Freljord"
        ],
        "release": 2019
    },
    {
        "name": "Syndra",
        "sexe": "Feminin",
        "role": [
            "Milieu"
        ],
        "espece": [
            "Humain",
            "Né magique"
        ],
        "ressource": "Mana",
        "type": [
            "À distance"
        ],
        "region": [
            "Ionia"
        ],
        "release": 2012
    },
    {
        "name": "Darius",
        "sexe": "Masculin",
        "role": [
            "Haut"
        ],
        "espece": [
            "Humain"
        ],
        "ressource": "Mana",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Noxus"
        ],
        "release": 2012
    },
    {
        "name": "Diana",
        "sexe": "Feminin",
        "role": [
            "Jungle",
            "Milieu"
        ],
        "espece": [
            "Hôte",
            "Humain"
        ],
        "ressource": "Mana",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Targon"
        ],
        "release": 2012
    },
    {
        "name": "Dr. Mundo",
        "sexe": "Masculin",
        "role": [
            "Haut"
        ],
        "espece": [
            "Altéré Chimiquement",
            "Humain"
        ],
        "ressource": "Coûts de santé",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Zaun"
        ],
        "release": 2009
    },
    {
        "name": "Draven",
        "sexe": "Masculin",
        "role": [
            "Bas"
        ],
        "espece": [
            "Humain"
        ],
        "ressource": "Mana",
        "type": [
            "À distance"
        ],
        "region": [
            "Noxus"
        ],
        "release": 2012
    },
    {
        "name": "Fiddlesticks",
        "sexe": "Autre",
        "role": [
            "Jungle"
        ],
        "espece": [
            "Démon",
            "Esprit"
        ],
        "ressource": "Mana",
        "type": [
            "À distance"
        ],
        "region": [
            "Runeterra"
        ],
        "release": 2009
    },
    {
        "name": "Fiora",
        "sexe": "Feminin",
        "role": [
            "Haut"
        ],
        "espece": [
            "Humain"
        ],
        "ressource": "Mana",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Demacia"
        ],
        "release": 2012
    },
    {
        "name": "Fizz",
        "sexe": "Masculin",
        "role": [
            "Milieu"
        ],
        "espece": [
            "Yordle"
        ],
        "ressource": "Mana",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Bilgewater"
        ],
        "release": 2011
    },
    {
        "name": "Miss Fortune",
        "sexe": "Feminin",
        "role": [
            "Bas"
        ],
        "espece": [
            "Humain"
        ],
        "ressource": "Mana",
        "type": [
            "À distance"
        ],
        "region": [
            "Bilgewater"
        ],
        "release": 2010
    },
    {
        "name": "Galio",
        "sexe": "Masculin",
        "role": [
            "Milieu",
            "Support"
        ],
        "espece": [
            "Golem"
        ],
        "ressource": "Mana",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Demacia"
        ],
        "release": 2010
    },
    {
        "name": "Gangplank",
        "sexe": "Masculin",
        "role": [
            "Haut"
        ],
        "espece": [
            "Humain"
        ],
        "ressource": "Mana",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Bilgewater"
        ],
        "release": 2009
    },
    {
        "name": "Garen",
        "sexe": "Masculin",
        "role": [
            "Haut"
        ],
        "espece": [
            "Humain"
        ],
        "ressource": "Sans Mana",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Demacia"
        ],
        "release": 2010
    },
    {
        "name": "Gnar",
        "sexe": "Masculin",
        "role": [
            "Haut"
        ],
        "espece": [
            "Yordle"
        ],
        "ressource": "Rage",
        "type": [
            "Mêlée",
            "À distance"
        ],
        "region": [
            "Freljord"
        ],
        "release": 2014
    },
    {
        "name": "Gragas",
        "sexe": "Masculin",
        "role": [
            "Jungle",
            "Haut"
        ],
        "espece": [
            "Humain"
        ],
        "ressource": "Mana",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Freljord"
        ],
        "release": 2010
    },
    {
        "name": "Graves",
        "sexe": "Masculin",
        "role": [
            "Jungle"
        ],
        "espece": [
            "Humain"
        ],
        "ressource": "Mana",
        "type": [
            "À distance"
        ],
        "region": [
            "Bilgewater"
        ],
        "release": 2011
    },
    {
        "name": "Gwen",
        "sexe": "Feminin",
        "role": [
            "Haut"
        ],
        "espece": [
            "Humain",
            "Altéré Magiquement"
        ],
        "ressource": "Mana",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Camavor",
            "Îles Obscures"
        ],
        "release": 2021
    },
    {
        "name": "Hecarim",
        "sexe": "Masculin",
        "role": [
            "Jungle"
        ],
        "espece": [
            "Mort-vivant"
        ],
        "ressource": "Mana",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Camavor",
            "Îles Obscures"
        ],
        "release": 2012
    },
    {
        "name": "Heimerdinger",
        "sexe": "Masculin",
        "role": [
            "Milieu",
            "Support"
        ],
        "espece": [
            "Yordle"
        ],
        "ressource": "Mana",
        "type": [
            "À distance"
        ],
        "region": [
            "Piltover"
        ],
        "release": 2009
    },
    {
        "name": "Janna",
        "sexe": "Feminin",
        "role": [
            "Support"
        ],
        "espece": [
            "Dieu",
            "Esprit"
        ],
        "ressource": "Mana",
        "type": [
            "À distance"
        ],
        "region": [
            "Shurima",
            "Zaun"
        ],
        "release": 2009
    },
    {
        "name": "Jax",
        "sexe": "Masculin",
        "role": [
            "Jungle",
            "Haut"
        ],
        "espece": [
            "Inconnu"
        ],
        "ressource": "Mana",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Icathia",
            "Runeterra",
            "Shurima"
        ],
        "release": 2009
    },
    {
        "name": "Jayce",
        "sexe": "Masculin",
        "role": [
            "Milieu",
            "Haut"
        ],
        "espece": [
            "Humain"
        ],
        "ressource": "Mana",
        "type": [
            "Mêlée",
            "À distance"
        ],
        "region": [
            "Piltover"
        ],
        "release": 2012
    },
    {
        "name": "Jhin",
        "sexe": "Masculin",
        "role": [
            "Bas"
        ],
        "espece": [
            "Humain",
            "Spiritualiste"
        ],
        "ressource": "Mana",
        "type": [
            "À distance"
        ],
        "region": [
            "Ionia"
        ],
        "release": 2016
    },
    {
        "name": "Jinx",
        "sexe": "Feminin",
        "role": [
            "Bas"
        ],
        "espece": [
            "Altéré Chimiquement",
            "Humain"
        ],
        "ressource": "Mana",
        "type": [
            "À distance"
        ],
        "region": [
            "Zaun"
        ],
        "release": 2013
    },
    {
        "name": "K'Santé",
        "sexe": "Masculin",
        "role": [
            "Haut"
        ],
        "espece": [
            "Humain"
        ],
        "ressource": "Mana",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Shurima"
        ],
        "release": 2022
    },
    {
        "name": "Kai'Sa",
        "sexe": "Feminin",
        "role": [
            "Bas"
        ],
        "espece": [
            "Humain",
            "Être du néant"
        ],
        "ressource": "Mana",
        "type": [
            "À distance"
        ],
        "region": [
            "Shurima",
            "Le Néant"
        ],
        "release": 2018
    },
    {
        "name": "Kalista",
        "sexe": "Feminin",
        "role": [
            "Bas"
        ],
        "espece": [
            "Mort-vivant"
        ],
        "ressource": "Mana",
        "type": [
            "À distance"
        ],
        "region": [
            "Camavor",
            "Îles Obscures"
        ],
        "release": 2014
    },
    {
        "name": "Karma",
        "sexe": "Feminin",
        "role": [
            "Support"
        ],
        "espece": [
            "Humain",
            "Spiritualiste"
        ],
        "ressource": "Mana",
        "type": [
            "À distance"
        ],
        "region": [
            "Ionia"
        ],
        "release": 2011
    },
    {
        "name": "Karthus",
        "sexe": "Masculin",
        "role": [
            "Jungle"
        ],
        "espece": [
            "Mort-vivant"
        ],
        "ressource": "Mana",
        "type": [
            "À distance"
        ],
        "region": [
            "Noxus",
            "Îles Obscures"
        ],
        "release": 2009
    },
    {
        "name": "Kassadin",
        "sexe": "Masculin",
        "role": [
            "Milieu"
        ],
        "espece": [
            "Humain",
            "Être du néant"
        ],
        "ressource": "Mana",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Shurima",
            "Le Néant"
        ],
        "release": 2009
    },
    {
        "name": "Katarina",
        "sexe": "Feminin",
        "role": [
            "Milieu"
        ],
        "espece": [
            "Humain"
        ],
        "ressource": "Sans Mana",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Noxus"
        ],
        "release": 2009
    },
    {
        "name": "Kayle",
        "sexe": "Feminin",
        "role": [
            "Haut"
        ],
        "espece": [
            "Hôte",
            "Humain",
            "Altéré Magiquement"
        ],
        "ressource": "Mana",
        "type": [
            "Mêlée",
            "À distance"
        ],
        "region": [
            "Demacia",
            "Targon"
        ],
        "release": 2009
    },
    {
        "name": "Kayn",
        "sexe": "Masculin",
        "role": [
            "Jungle"
        ],
        "espece": [
            "Darkin",
            "Humain",
            "Altéré Magiquement"
        ],
        "ressource": "Mana",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Ionia",
            "Noxus",
            "Runeterra",
            "Shurima"
        ],
        "release": 2017
    },
    {
        "name": "Kennen",
        "sexe": "Masculin",
        "role": [
            "Haut"
        ],
        "espece": [
            "Yordle"
        ],
        "ressource": "Énergie",
        "type": [
            "À distance"
        ],
        "region": [
            "Ionia"
        ],
        "release": 2010
    },
    {
        "name": "Kha'Zix",
        "sexe": "Masculin",
        "role": [
            "Jungle"
        ],
        "espece": [
            "Être du néant"
        ],
        "ressource": "Mana",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Le Néant"
        ],
        "release": 2012
    },
    {
        "name": "Kindred",
        "sexe": "Autre",
        "role": [
            "Jungle"
        ],
        "espece": [
            "Dieu",
            "Esprit"
        ],
        "ressource": "Mana",
        "type": [
            "À distance"
        ],
        "region": [
            "Runeterra"
        ],
        "release": 2015
    },
    {
        "name": "Kled",
        "sexe": "Masculin",
        "role": [
            "Haut"
        ],
        "espece": [
            "Yordle"
        ],
        "ressource": "Courage",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Noxus"
        ],
        "release": 2016
    },
    {
        "name": "Kog'Maw",
        "sexe": "Masculin",
        "role": [
            "Bas"
        ],
        "espece": [
            "Être du néant"
        ],
        "ressource": "Mana",
        "type": [
            "À distance"
        ],
        "region": [
            "Le Néant"
        ],
        "release": 2010
    },
    {
        "name": "LeBlanc",
        "sexe": "Feminin",
        "role": [
            "Milieu"
        ],
        "espece": [
            "Humain",
            "Altéré Magiquement"
        ],
        "ressource": "Mana",
        "type": [
            "À distance"
        ],
        "region": [
            "Noxus"
        ],
        "release": 2010
    },
    {
        "name": "Leona",
        "sexe": "Feminin",
        "role": [
            "Support"
        ],
        "espece": [
            "Hôte",
            "Humain"
        ],
        "ressource": "Mana",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Targon"
        ],
        "release": 2011
    },
    {
        "name": "Lillia",
        "sexe": "Feminin",
        "role": [
            "Jungle",
            "Haut"
        ],
        "espece": [
            "Esprit"
        ],
        "ressource": "Mana",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Ionia"
        ],
        "release": 2020
    },
    {
        "name": "Lissandra",
        "sexe": "Feminin",
        "role": [
            "Milieu"
        ],
        "espece": [
            "Humain",
            "Né de glace"
        ],
        "ressource": "Mana",
        "type": [
            "À distance"
        ],
        "region": [
            "Freljord"
        ],
        "release": 2013
    },
    {
        "name": "Lucian",
        "sexe": "Masculin",
        "role": [
            "Bas"
        ],
        "espece": [
            "Humain"
        ],
        "ressource": "Mana",
        "type": [
            "À distance"
        ],
        "region": [
            "Demacia",
            "Îles Obscures"
        ],
        "release": 2013
    },
    {
        "name": "Lulu",
        "sexe": "Feminin",
        "role": [
            "Support"
        ],
        "espece": [
            "Yordle"
        ],
        "ressource": "Mana",
        "type": [
            "À distance"
        ],
        "region": [
            "Bandle"
        ],
        "release": 2012
    },
    {
        "name": "Lux",
        "sexe": "Feminin",
        "role": [
            "Milieu",
            "Support"
        ],
        "espece": [
            "Humain",
            "Né magique"
        ],
        "ressource": "Mana",
        "type": [
            "À distance"
        ],
        "region": [
            "Demacia"
        ],
        "release": 2010
    },
    {
        "name": "Malphite",
        "sexe": "Masculin",
        "role": [
            "Haut"
        ],
        "espece": [
            "Golem"
        ],
        "ressource": "Mana",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Ixtal",
            "Shurima"
        ],
        "release": 2009
    },
    {
        "name": "Malzahar",
        "sexe": "Masculin",
        "role": [
            "Milieu"
        ],
        "espece": [
            "Humain",
            "Être du néant"
        ],
        "ressource": "Mana",
        "type": [
            "À distance"
        ],
        "region": [
            "Shurima",
            "Le Néant"
        ],
        "release": 2010
    },
    {
        "name": "Maokai",
        "sexe": "Masculin",
        "role": [
            "Jungle",
            "Support"
        ],
        "espece": [
            "Esprit"
        ],
        "ressource": "Mana",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Îles Obscures"
        ],
        "release": 2011
    },
    {
        "name": "Milio",
        "sexe": "Masculin",
        "role": [
            "Support"
        ],
        "espece": [
            "Humain",
            "Né magique"
        ],
        "ressource": "Mana",
        "type": [
            "À distance"
        ],
        "region": [
            "Ixtal"
        ],
        "release": 2023
    },
    {
        "name": "Mordekaiser",
        "sexe": "Masculin",
        "role": [
            "Haut"
        ],
        "espece": [
            "Revenant"
        ],
        "ressource": "Bouclier",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Noxus"
        ],
        "release": 2010
    },
    {
        "name": "Morgana",
        "sexe": "Feminin",
        "role": [
            "Support"
        ],
        "espece": [
            "Hôte",
            "Humain",
            "Altéré Magiquement"
        ],
        "ressource": "Mana",
        "type": [
            "À distance"
        ],
        "region": [
            "Demacia",
            "Targon"
        ],
        "release": 2009
    },
    {
        "name": "Warwick",
        "sexe": "Masculin",
        "role": [
            "Jungle",
            "Haut"
        ],
        "espece": [
            "Altéré Chimiquement",
            "Cyborg",
            "Humain"
        ],
        "ressource": "Mana",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Zaun"
        ],
        "release": 2009
    },
    {
        "name": "Wukong",
        "sexe": "Masculin",
        "role": [
            "Jungle",
            "Haut"
        ],
        "espece": [
            "Vastaya"
        ],
        "ressource": "Mana",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Ionia"
        ],
        "release": 2011
    },
    {
        "name": "Xayah",
        "sexe": "Feminin",
        "role": [
            "Bas"
        ],
        "espece": [
            "Vastaya"
        ],
        "ressource": "Mana",
        "type": [
            "À distance"
        ],
        "region": [
            "Ionia"
        ],
        "release": 2017
    },
    {
        "name": "Xerath",
        "sexe": "Masculin",
        "role": [
            "Milieu",
            "Support"
        ],
        "espece": [
            "Milieu"
        ],
        "ressource": "Mana",
        "type": [
            "À distance"
        ],
        "region": [
            "Shurima"
        ],
        "release": 2011
    },
    {
        "name": "Caitlyn",
        "sexe": "Feminin",
        "role": [
            "Bas"
        ],
        "espece": [
            "Humain"
        ],
        "ressource": "Mana",
        "type": [
            "À distance"
        ],
        "region": [
            "Piltover"
        ],
        "release": 2011
    },
    {
        "name": "Camille",
        "sexe": "Feminin",
        "role": [
            "Haut"
        ],
        "espece": [
            "Cyborg",
            "Humain"
        ],
        "ressource": "Mana",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Piltover"
        ],
        "release": 2016
    },
    {
        "name": "Cassiopeia",
        "sexe": "Feminin",
        "role": [
            "Milieu"
        ],
        "espece": [
            "Humain",
            "Altéré Magiquement"
        ],
        "ressource": "Mana",
        "type": [
            "À distance"
        ],
        "region": [
            "Noxus",
            "Shurima"
        ],
        "release": 2010
    },
    {
        "name": "Cho'Gath",
        "sexe": "Masculin",
        "role": [
            "Haut"
        ],
        "espece": [
            "Être du néant"
        ],
        "ressource": "Mana",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Le Néant"
        ],
        "release": 2009
    },
    {
        "name": "Corki",
        "sexe": "Masculin",
        "role": [
            "Milieu"
        ],
        "espece": [
            "Yordle"
        ],
        "ressource": "Mana",
        "type": [
            "À distance"
        ],
        "region": [
            "Bandle",
            "Piltover"
        ],
        "release": 2009
    },
    {
        "name": "Varus",
        "sexe": "Masculin",
        "role": [
            "Bas",
            "Milieu"
        ],
        "espece": [
            "Darkin",
            "Humain"
        ],
        "ressource": "Mana",
        "type": [
            "À distance"
        ],
        "region": [
            "Ionia",
            "Runeterra",
            "Shurima"
        ],
        "release": 2012
    },
    {
        "name": "Vayne",
        "sexe": "Feminin",
        "role": [
            "Bas",
            "Haut"
        ],
        "espece": [
            "Humain"
        ],
        "ressource": "Mana",
        "type": [
            "À distance"
        ],
        "region": [
            "Demacia"
        ],
        "release": 2011
    },
    {
        "name": "Veigar",
        "sexe": "Masculin",
        "role": [
            "Milieu"
        ],
        "espece": [
            "Yordle"
        ],
        "ressource": "Mana",
        "type": [
            "À distance"
        ],
        "region": [
            "Bandle",
            "Runeterra"
        ],
        "release": 2009
    },
    {
        "name": "Vel'Koz",
        "sexe": "Masculin",
        "role": [
            "Milieu",
            "Support"
        ],
        "espece": [
            "Être du néant"
        ],
        "ressource": "Mana",
        "type": [
            "À distance"
        ],
        "region": [
            "Le Néant"
        ],
        "release": 2014
    },
    {
        "name": "Vex",
        "sexe": "Feminin",
        "role": [
            "Milieu"
        ],
        "espece": [
            "Yordle"
        ],
        "ressource": "Mana",
        "type": [
            "À distance"
        ],
        "region": [
            "Bandle",
            "Îles Obscures"
        ],
        "release": 2021
    },
    {
        "name": "Vi",
        "sexe": "Feminin",
        "role": [
            "Jungle"
        ],
        "espece": [
            "Humain"
        ],
        "ressource": "Mana",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Piltover",
            "Zaun"
        ],
        "release": 2012
    },
    {
        "name": "Viego",
        "sexe": "Masculin",
        "role": [
            "Jungle"
        ],
        "espece": [
            "Mort-vivant"
        ],
        "ressource": "Sans Mana",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Camavor",
            "Îles Obscures"
        ],
        "release": 2021
    },
    {
        "name": "Viktor",
        "sexe": "Masculin",
        "role": [
            "Milieu"
        ],
        "espece": [
            "Cyborg",
            "Humain"
        ],
        "ressource": "Mana",
        "type": [
            "À distance"
        ],
        "region": [
            "Piltover",
            "Zaun"
        ],
        "release": 2011
    },
    {
        "name": "Vladimir",
        "sexe": "Masculin",
        "role": [
            "Milieu"
        ],
        "espece": [
            "Humain",
            "Altéré Magiquement"
        ],
        "ressource": "Soif de sang",
        "type": [
            "À distance"
        ],
        "region": [
            "Camavor",
            "Noxus",
            "Îles Obscures"
        ],
        "release": 2010
    },
    {
        "name": "Volibear",
        "sexe": "Masculin",
        "role": [
            "Jungle",
            "Haut"
        ],
        "espece": [
            "Dieu",
            "Esprit"
        ],
        "ressource": "Mana",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Freljord"
        ],
        "release": 2011
    },
    {
        "name": "Bard",
        "sexe": "Masculin",
        "role": [
            "Support"
        ],
        "espece": [
            "Céleste"
        ],
        "ressource": "Mana",
        "type": [
            "À distance"
        ],
        "region": [
            "Runeterra"
        ],
        "release": 2015
    },
    {
        "name": "Bel'Veth",
        "sexe": "Feminin",
        "role": [
            "Jungle"
        ],
        "espece": [
            "Jungle"
        ],
        "ressource": "Sans Mana",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Le Néant"
        ],
        "release": 2022
    },
    {
        "name": "Blitzcrank",
        "sexe": "Autre",
        "role": [
            "Support"
        ],
        "espece": [
            "Golem"
        ],
        "ressource": "Mana",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Zaun"
        ],
        "release": 2009
    },
    {
        "name": "Brand",
        "sexe": "Masculin",
        "role": [
            "Support"
        ],
        "espece": [
            "Humain",
            "Altéré Magiquement"
        ],
        "ressource": "Mana",
        "type": [
            "À distance"
        ],
        "region": [
            "Freljord",
            "Runeterra"
        ],
        "release": 2011
    },
    {
        "name": "Braum",
        "sexe": "Masculin",
        "role": [
            "Support"
        ],
        "espece": [
            "Humain",
            "Né de glace"
        ],
        "ressource": "Mana",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Freljord"
        ],
        "release": 2014
    },
    {
        "name": "Naafiri",
        "sexe": "Feminin",
        "role": [
            "Milieu"
        ],
        "espece": [
            "Darkin",
            "Chien"
        ],
        "ressource": "Mana",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Shurima"
        ],
        "release": 2023
    },
    {
        "name": "Nami",
        "sexe": "Feminin",
        "role": [
            "Support"
        ],
        "espece": [
            "Vastaya"
        ],
        "ressource": "Mana",
        "type": [
            "À distance"
        ],
        "region": [
            "Runeterra"
        ],
        "release": 2012
    },
    {
        "name": "Nasus",
        "sexe": "Masculin",
        "role": [
            "Haut"
        ],
        "espece": [
            "Dieu-Guerrier"
        ],
        "ressource": "Mana",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Shurima"
        ],
        "release": 2009
    },
    {
        "name": "Nautilus",
        "sexe": "Masculin",
        "role": [
            "Support"
        ],
        "espece": [
            "Revenant"
        ],
        "ressource": "Mana",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Bilgewater"
        ],
        "release": 2012
    },
    {
        "name": "Neeko",
        "sexe": "Feminin",
        "role": [
            "Milieu",
            "Support"
        ],
        "espece": [
            "Vastaya"
        ],
        "ressource": "Mana",
        "type": [
            "À distance"
        ],
        "region": [
            "Ixtal"
        ],
        "release": 2018
    },
    {
        "name": "Nidalee",
        "sexe": "Feminin",
        "role": [
            "Jungle"
        ],
        "espece": [
            "Humain",
            "Spiritualiste"
        ],
        "ressource": "Mana",
        "type": [
            "Mêlée",
            "À distance"
        ],
        "region": [
            "Ixtal"
        ],
        "release": 2009
    },
    {
        "name": "Nilah",
        "sexe": "Feminin",
        "role": [
            "Bas"
        ],
        "espece": [
            "Humain",
            "Altéré Magiquement"
        ],
        "ressource": "Mana",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Bilgewater"
        ],
        "release": 2022
    },
    {
        "name": "Nocturne",
        "sexe": "Masculin",
        "role": [
            "Jungle"
        ],
        "espece": [
            "Démon",
            "Esprit"
        ],
        "ressource": "Mana",
        "type": [
            "Mêlée"
        ],
        "region": [
            "Runeterra"
        ],
        "release": 2011
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