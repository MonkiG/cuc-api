# Cuc API
An open source API for the [Centro Universitario de la Costa](http://www.cuc.udg.mx/) that show the subjects an proffesors.
This project is in its initial stage. Currently, it provides endpoints for subjects and professors, but more features and improvements are planned for the future.

## Requirements:

- [Node.js](https://nodejs.org/) 
- [Docker](https://www.docker.com/get-started) (optional)

## Installation
### 1.- Clonar el repositorio
```bash
git clone https://github.com/MonkiG/cuc-api.git
cd cuc-api
```
### 2.- Install the node dependencies
```bash
npm install
```
### 3.- Configuración de variables de entorno

Make a `.env` file following the `.env.example` file

### 4.- Run the project scripts

- Seed the database tables 
```bash
npm run seed
```
- Run the project in dev mode 
```bash
npm run dev
```
- Run the scrape given a scrape name or all the scrapers
```bash
npm run scrape (arg)
```
- Run the tests
```bash
npm run test
```
- Run the project (whitout docker)
```bash
npm run start
```

### 5.- Execute the project with docker
```bash
docker-compose up
```

### 6.- API
You can see all the endpoints in the `/api` path

## Contribute
You can contribute to this project:
1. Fork the repository
2. Make a new branch
```bash
git checkout -b nueva-funcionalidad
```
3. Make your changes and commit it
```bash
git commit -am 'Agrega nueva funcionalidad'
```
4. Push to the branch
```bash
git push origin nueva-funcionalidad
```
5. Make a Pull Request