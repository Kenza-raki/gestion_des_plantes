# Gestion des Plantes/Parcelles
## Description
#### Objectif du Projet
Le projet a pour objectif de fournir une solution complète de gestion agricole, facilitant la tâche des agriculteurs dans le suivi et la gestion de leurs fermes. En mettant l'accent sur la gestion des parcelles, plantations et types de plantes, l'application vise à offrir une interface conviviale pour améliorer l'efficacité des activités agricoles.
#### Optimisation de l'Organisation des Activités Agricoles
En fournissant un suivi détaillé des parcelles, plantations et types de plantes, l'application vise à optimiser l'organisation des activités agricoles. Cela permet aux agriculteurs de prendre des décisions éclairées basées sur des données précises et actuelles.
#### Avantages Attendus pour les Utilisateurs
Gestion efficace de l'espace agricole.
Suivi précis des cycles de plantation.
Prise de décisions basée sur des données actualisées.
Amélioration globale de l'efficacité des activités agricoles.
## Fonctionnalités

### Gestion des Fermes
- Ajout, modification et suppression de fermes.
- Visualisation des détails de chaque ferme.

### Gestion des Parcelles
- Création, édition et suppression de parcelles.
- Suivi de l'emplacement et de la superficie de chaque parcelle.

### Gestion des Plantations
- Enregistrement, mise à jour et suppression de plantations.
- Suivi des informations sur le type de sol, la date de plantation, etc.

### Gestion des Types de Plantes
- Ajout, modification et suppression de types de plantes.
- Attribution de types de plantes à des plantations spécifiques.
## Technologies Utilisées
### Backend
- [JHipster](https://www.jhipster.tech/): Framework pour développer rapidement des applications Spring Boot + Angular/React/Vue.
- [Spring Boot](https://spring.io/projects/spring-boot): Framework Java pour la création d'applications Java basées sur des standards modernes.
- [Spring Data JPA](https://spring.io/projects/spring-data-jpa): Accès aux données à partir de Java.

### Frontend
- [React](https://reactjs.org/): Bibliothèque JavaScript pour la construction d'interfaces utilisateur.
### Conteneurs et Images Docker
- [DOcker]: Plateforme de conteneurisation pour le déploiement portable des applications.
- [DOcker Compose]: Outil pour définir et exécuter des applications Docker multi-conteneurs.
### Tests
- [SonarQube](https://www.sonarqube.org/): Plateforme d'inspection continue de la qualité du code.
## Video démonstratif


https://github.com/Kenza-raki/gestion_des_plantes/assets/116951093/7e19c26f-7192-4388-86b2-faa597bffa19


## Docker Desktop
<img width="960" alt="image" src="https://github.com/Kenza-raki/gestion_des_plantes/assets/116951093/4c3df6bd-1105-4381-bf43-4fd7421e9f71">

### Prerequisites
Make sure you have the following tools installed on your local machine:

- Docker Desktop: [Download and Install Docker](https://www.docker.com/products/docker-desktop)

### Running the Project with Docker

Follow these steps to run the project using Docker Desktop:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-repository.git
2. Build the Docker image:
   ```bash
   docker build -t appferme-latest .
3. Run the Docker container:
   ```bash
   docker run -p 8080:8080 -d appferme-latest
This will start the application in detached mode, and it will be accessible at http://localhost:8080.
4. Access the application:
Open your web browser and go to http://localhost:8080 to view the application.
