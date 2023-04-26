# linguists-client
![Linguists Project Conceptual View](https://user-images.githubusercontent.com/86444777/219822992-974e45b1-fb9a-4600-90f9-78c37d9c9c89.png)

## Developer Setup
1. clone the repo
2. install the JavaScript runtime environment Node.js 
3. ensure npm, the Javascript package manager, was installed alongside Node
4. run "npm install" in the root folder to install the project dependencies
5. head over to the backend at https://github.com/SethCram/Linguists-NLP-to-SQL/blob/main/README.md#setup and follow the setup steps
6. run "npm start" in the root folder to get the frontend up and running

## Deployment Instructions (on Ubuntu Linux)
1. clone the repository `git clone https://github.com/SethCram/linguists-client.git`
2. install Node.js, npm, nginx, and pm2
    1. on Ubuntu-based distributions
        ```sh
        $ sudo apt install nodejs
        $ sudo apt install npm 
        $ sudo apt install nginx
        $ sudo npm i -g pm2 
        ```
    2. on RHEL-based distributions
        ```sh
        $ sudo yum install nodejs nginx
        $ sudo npm i -g pm2 
        ```
3. install the project dependencies
    ```sh
    $ cd linguists-client
    $ npm install
    ```
5. create a production build `npm run build` (need to be in the root of the repo)
6. setup nginx as a reverse proxy service `sudo service nginx start`
8. navigate to http://localhost:3000/ if the website didn't already launch
9. verify that it's connected to the backend at port 8000 by clicking on the dropdown and seeing if it breaks
