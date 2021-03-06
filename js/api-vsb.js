// je récupère la div pour le résultat de circulation de la voie sur berge
const result = document.querySelector("#result");
const circle = document.querySelector(".circle");

// je fais appel à l'api
fetch('https://data.metromobilite.fr/api/dyn/trr/json?codes=N0_GRE_COR_01')
.then(res => {
   // si je récupère bien un retour api
    if(res.ok){
        // je le résultat transforme en json
        res.json().then(data =>{
            // j'inverse le tableau pour avoir la valeur la plus récente en cellule [0]
            let table = data["N0_GRE_COR_01"].reverse()
            
            function statutVsb(){

                            // je récupère le statut de la voie sur berge
                            let idVsb = table[0].nsv_id;

                            let statut ;
                            let colorVoiture;
                            if(idVsb == 0){
                                statut = 'INFORMATION NON DISPONIBLE';
                            }else if(idVsb == 1){
                                statut = 'OUVERTE';
                                colorVoiture = '#72FF32';
                            }else if(idVsb == 2){
                                statut = 'RALENTI';
                                colorVoiture = '#F8E862';
                            }else if(idVsb == 3){
                                statut = 'EMBOUTEILLAGE';
                                colorVoiture = '#FFCC32';
                            }else if(idVsb == 4){
                                statut = 'FERMÉ';
                                colorVoiture = '#E81123';
                            }else{
                                statut = 'INFORMATION NON DISPONIBLE';
                            }
                            tab = [statut, colorVoiture];
                            return tab;
                            
                        }
                        // je récupère le time de l'api
                        let time = table[0].time;
                        // je le converti en date
                        let dateVsb = new Date(time);
                        //je récupère l'heure de l'api 
                        let heureVsb = dateVsb.getHours();
                        // pour les minutes attention aux unités, il n’y a pas de zéro devant je vais donc le rajouter pour l'affichage
                        //  je convertis le nombre en string pour pouvoir compter
                        let minutesVsb = dateVsb.getMinutes().toString();
                        // si c'est égal à 1 je rajouterai zéro devant ce chiffre
                        if(minutesVsb.length == 1){
                            minutesVsb = 0 + minutesVsb;
                        }

                        result.innerHTML += "<p class=\"statut\">" + statutVsb()[0] + "</p>" +
                        "<i class=\"fas fa-car-alt voiture\"></i>"
                        + "<p class=\"heureVsb\">Mise à jour : "+ heureVsb +"h"+ minutesVsb+"</p>";
                      // je change la couleur de la voiture en fonction du résultat
                        document.querySelector(".voiture").style.color = statutVsb()[1];


                        // mettre une alerte si le temps de l'api est supérieur et égal a 3h
                        function alerteHeure(){
                            //  je récupère ma div alerte
                            const warrning = document.querySelector("#alerte");

                            // je récupère le timestamp actuel
                            let timestampNow = Date.now();

                            // j'enlève 3h au timestamp
                            let time3 = timestampNow - 10800000;
                            // si le time de l'api est supérieur à l'heure actuelle -3H j'envoie l'alerte
                            if(time3 > time){
                                warrning.style.display = "block";
                                warrning.innerHTML = 'Attention les données ne sont plus mises à jour depuis au moins 3h !';
                            }
                            
                        }
                        alerteHeure();

                        }); 
                    
                }else {
                    alert('Problème API');
                }

})