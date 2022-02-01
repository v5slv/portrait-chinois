// Pour chaque analogie on va créer une fonction qui va créer une div en html (y en aura 7 en tout du coup)
data.forEach(function (f) {

    // Création de la div = 1 blocAna 
    var blocAna = document.createElement("div");

    // Ajout d'une classe et d'un id à la div, qui seront inscrits dans le tableau data en fonction de chaque analogie
    blocAna.className = f.class;
    blocAna.id = f.id;

    // Création du code html dans le blocAna
    blocAna.innerHTML =
        '<h2 class="sijetais">' + "Si j'étais " + '<span class="analogie">' + f.analogie + '</span>' + ", je serais..." + '</h2>' +
        '<div class="image-valeur-description">' +
        '<img src="images/' + f.image + '" alt="Illustration : ' + f.valeurAnalogie + '"></img>' +
        '<div class="noir"></div>' +
        '<div class="valeur-description">' +
        '<h1 class="valeur-ana">' + f.valeurAnalogie + '</h1>' +
        '<p class="description">' + f.description + '</p>' +
        '</div>' +
        '</div>'
    // Ajout des div dans le main
    document.querySelector("main").append(blocAna)
});

//Création de l'aperçu de la rubrique suggérée
var blocUser = document.createElement("div");
blocUser.className = "user-suggestion";
blocUser.id = "suggestion";
blocUser.innerHTML =
    '<h2 class="sijetais">' + "Si j'étais " + '<span id="analogieSuggeree"></span>' + ", je serais..." + '</h2>' +
    '<div class="image-valeur-description">' +
    '<img id="image" src="images/suggestion.png"></img>' +
    '<div class="valeur-description">' +
    '<h1 class="valeur-ana"><span id="valeurAnalogieSuggeree"></span></h1>' +
    '<p class="description"><span id="descAnalogieSuggeree"></span></p>' +
    '</div>' +
    '</div>'
// Ajout de la div dans le main après liste analogies de base
document.querySelector("main").append(blocUser)

// Formulaire
//Afficher le formulaire quand on appuye sur le bouton 
function openForm() {
    document.getElementById("myForm").style.display = "block";
}

//Cacher le formulaire lorsqu'on appuye sur le bouton
function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

//Détection du clic sur le bouton d'envoi du formulaire
document.querySelector("#envoi").addEventListener('click', function (e) {
    // Envoi des données à l'API à l'adresse ci-dessus
    var urlVisitee = "https://perso-etudiant.u-pem.fr/~gambette/portrait/api.php?format=json&login=gambette&courriel=" + document.querySelector("#courriel").value + "&message=Si j'étais ... " + document.querySelector("#analogie").value + " je serais ... " + document.querySelector("#valeurAnalogie").value + "...parce que..." + document.querySelector("#descAnalogie").value;
    //Réponse
    fetch(urlVisitee).then(function (response) {
        response.json().then(function (data) {
            if (data.status == "success") {
                document.querySelector("#messageApresEnvoi").innerHTML = "Votre message a bien été reçu";
            } else {
                document.querySelector("#messageApresEnvoi").innerHTML = "Problème : votre message n'a pas été reçu";
            }
        })
    })

})

//Ajout des textes suggérés par l'utilisateur via le formulaire dans l'aperçu de la rubrique
//Détection qu'une touche du clavier a été relâchée sur le champ analogie
document.querySelector("#analogie").addEventListener('keyup', function (e) {
    console.log("Champ analogie modifié");
    //Remplissage de l'analogie suggérée
    document.querySelector("#analogieSuggeree").innerHTML = document.querySelector("#analogie").value;
})

//Même chose pour la valeur de l'analogie
document.querySelector("#valeurAnalogie").addEventListener('keyup', function (e) {
    console.log("Champ valeurAnalogie modifié");
    document.querySelector("#valeurAnalogieSuggeree").innerHTML = document.querySelector(
        "#valeurAnalogie").value;
})

//Même chose pour la justification de l'analogie
document.querySelector("#descAnalogie").addEventListener('keyup', function (e) {
    console.log("Champ descAnalogie modifié");
    document.querySelector("#descAnalogieSuggeree").innerHTML = document.querySelector(
        "#descAnalogie").value;
})

//Détecter le clic sur "Mentions légales"
document.querySelector(".volet-invisible").addEventListener('click', function () {
    //Animer le volet pour le dérouler
    document.querySelector(".volet-invisible").animate([{
        "height": "15em"
    }], {
        "duration": 800
    })
    setTimeout(function f() {
        //Attribuer la classe volet-visible à la place de la classe volet-invisible
        document.querySelector(".volet-invisible").classList.replace("volet-invisible", "volet-visible")
    }, 800)
})

//Refermer le volet
document.querySelector(".volet").addEventListener('click', function () {
    document.querySelector(".volet-visible").animate([{
        "height": "4em"
    }], {
        "duration": 800
    })
    setTimeout(function f() {
        document.querySelector(".volet-visible").classList.replace("volet-visible", "volet-invisible")
    }, 800)
})