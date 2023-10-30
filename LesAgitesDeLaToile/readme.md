# README Projet Site : Les agités de la toile :  

##  Navbar : 
![enter image description here](https://i.postimg.cc/k5YJT1hx/navbar.png)

J'ai utilisé la navbar intégré dans le framework BootStrap pour avoir le menu Burger 
le `ms-auto` me permets juste de repousser toutes la barre ( accueil - galerie - nous contacter ) à droite


## Footer 
![enter image description here](https://i.postimg.cc/65QKyJ6t/footerhtml.png)
![enter image description here](https://i.postimg.cc/9FwxxJJy/footerstylecss.png)

![enter image description here](https://i.postimg.cc/HxjKTH4h/footershowlive.png)
 
 --> Cette fois ci, je n'utilise pas BS , donc j'utilise seulement les flex , en ajoutant du padding, une taille de texte, 
 la couleur en background (d'une variable enregistrée sur ma fiche de style) et j'aligne le texte 


## Index

![enter image description here](https://i.postimg.cc/RC2cs93Z/indexmiddle.png)
--> pour l'index , j'utilise une div avec l'image et le paragraphe composé du texte. Je flex le tout pour ensuite
le centrer au milieu.  Je fais juste en sorte que la phrase d'accroche à la fin soit en gras.

## Galerie

![enter image description here](https://i.postimg.cc/QMZ4R1HV/galerie-middle.png)

--> Pour la page Galerie , j'ajoute le texte `"les films préférés des adhérents "` seulement pour les formats tablettes et ordi' comme sur la maquette avec `<div  class="d-none d-md-block text-center mb-5">`. le `d-none` va cacher le texte par défaut et le `d-md-block` va le montrer à partir du format tablette (md)

--> `<div  class="col-12 mb-5 col-sm-6 col-md-6 col-lg-6 col-xl-4 ">`
Avec bootstrap, pour chaque images, je fais en sorte qu'il y est le bon nombre de colonnes selon les différents formats d'écran afin de respecter les demandes de la maquette.

--> J'ajoute également en `hover` un `grayscale` qui aura pour but de griser l'affiche quand l'utilisateur sera sur l'image en question. 

## Nous contacter

![enter image des'cription here](https://i.postimg.cc/TYpWXsDH/formulaire.png)

(ici en format mobile , le footer est en dessous mais ne se voit pas sur le screen)

--> Pour le formulaire , l'utilisation de flex + bootstrap qui va aligner les éléments en mobile et qui va mettre le container message sur la droite en tablette/ordi. J'ajoute un radio en dessous que j'ai `transform: translateY(-60px);` lors du passage en format tablette pour pouvoir correctement le positionner par rapport à ce qui était demandé sur la maquette.

## Pages films :

![enter image description here](https://i.postimg.cc/2SHWRfHJ/gladiator.png)

--> Pour les pages du films , j'ai utilisé le flex appliqué avec BS : 

    <div  class="d-flex flex-column-reverse flex-md-row align-items-center gap-3"> 

--> je mets  flex-column-reverse pour refaire passer l'image au dessus car elle se mettait tout le temps en dessous .
A partir du format md, le flex est en row pour que la réal , la distribution et l'image se placent correctement l'un à côté de l'autre et je finis par aligner le tout en ajoutant aussi un petit gap.
    

