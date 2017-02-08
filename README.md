# La demeure de L'arche

---

### En arrivant sur le serveur installer les modules suivant :
- [sudo] apt-get update && apt-get install -y mongodb && apt-get install -y nginx && apt-get install -y curl && apt-get install -y git
- [sudo] curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
- [sudo] apt-get install -y nodejs

- cd /home  && git clone https://github.com/Alastoroo/LaDemeureDeLArche
- cd LaDemeureDeLArche
- cd db

---

### Installation terminer, il faut maintenant intégrer les données de base, tapez les commandes suivante :
- mongoimport --db lademeuredelarche --collection alentours --file alentours.json
- mongoimport --db lademeuredelarche --collection chambres --file chambres.json
- mongoimport --db lademeuredelarche --collection demeureDescription --file demeure-des.json
- mongoimport --db lademeuredelarche --collection demeureEquipement --file demeure-equip.json
- mongoimport --db lademeuredelarche --collection demeureImage --file demeure-image.json
- mongoimport --db lademeuredelarche --collection homeDescription --file home-des.json
- mongoimport --db lademeuredelarche --collection homeImage --file home-image.json
- mongoimport --db lademeuredelarche --collection homePres --file home-pres.json
- mongoimport --db lademeuredelarche --collection users --file users.json

---

### Passons à la configuration de votre reverse proxy :

- Suivre les instructions sur le lien suivant : https://korben.info/configurer-nginx-reverse-proxy.html
- Dans la configuration du site-enabled   fichier default Voici les configurations : 
- server {
        listen   80;
        location / {
                proxy_pass         http://127.0.0.1:8080/;
        }


---

### Enfin ajoutons une ligne dans le rc.local
    /usr/bin/sudo -u www-data /usr/local/bin/node start /home/LaDemeureDeLArche/app.js

---








