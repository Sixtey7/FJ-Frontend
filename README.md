# FJ-Frontend

## About
Front end for a small 'Finance Journal' style application that will be used to track finances.  

Written as an experiment in playing with Vue.js

### Related Projects
The backend is written in Java and hosted in the repo: https://github.com/Sixtey7/FJ-Backend

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

## Docker
# Building
* docker build -t fj-frontend:latest .

# Running
* docker run --name fj-frontend -it -p 8082:8080 --rm fj-frontend:latest
