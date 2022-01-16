# StuyHacksXI-Project: Book It!
Project for StuyHacks XI hackathon, held on January 15-16, 2022

### What is Book It!?
Book It! is an app that encourages engagement with books by providing a platform for communities to come together and share their reading progress.

### Running It
This project requires the following:
+ yarn (and npm) along with the latest version of node.js
+ python version 3.8 or later (other versions may work, but have not been tested) and Flask

To run the API:
+ `cd api`
+ `python3 main.py` (you do not need to manually run `setup.py`
  + this will run the API on localhost port 8888 (`127.0.0.1:8888`). If that port is unavailable on your computer, you will need to change it in `main.py` and anywhere in the client that makes api calls.

To run the client:
+ `cd client`
+ `yarn` or `yarn install` (`npm i`) will install the necessary node modules. You only need to do this the first time you run the project.
+ `yarn start` (`npm run start`) runs the client on localhost
