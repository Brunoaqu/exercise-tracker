# [Exercise Tracker](https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/exercise-tracker)

An API that for tracking exercises, project made to achieve a freecodecamp certification at the course: Back End Development and APIs

---
# Pre-requisites
- Install [Yarn](https://yarnpkg.com/) version 1.22.18 or higher

# Getting started
- Clone the repository
```
$  git clone  https://github.com/Brunoaqu/exercise-tracker
```
- Install dependencies
```
$  cd exercise-tracker
$  yarn install
```
- Build and run the project
```
$  yarn start
```
  Navigate to `http://localhost:5000`

- API Document endpoints

  create user Endpoint POST : http://localhost:5000/api/users

  get users   Endpoint GET  : http://localhost:5000/api/users

  create exercise Endpoint  POST : http://localhost:5000/api/users/:_id/exercises

  generate log of exercises GET  : http://localhost:5000/api/users/:_id/logs?`[from][&to][&limit]`