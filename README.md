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
6. redirect the server traffic to the web application: 
    ```sh
    $ sudo vi /etc/nginx/nginx.conf
    ```
    add this inside the server block:
    ```
    location / {
            proxy_pass http://localhost:3000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    ```
    ```sh
    $ sudo service nginx start
    ```
    1. If SELinux is being used, tell it to allow httpd traffic: `sudo setsebool -P httpd_can_network_connect 1`
        
8. navigate to the public IP address and the frontend should be visible 
9. verify that it's connected to the backend at port 8000 by clicking on the dropdown and seeing if it breaks
