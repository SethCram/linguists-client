# linguists-client
![Linguists Project Conceptual View](https://user-images.githubusercontent.com/86444777/219822992-974e45b1-fb9a-4600-90f9-78c37d9c9c89.png)

## Developer Setup
1. clone the repo
2. install the JavaScript runtime environment Node.js 
3. ensure npm, the Javascript package manager, was installed alongside Node
4. run "npm install" in the root folder to install the project dependencies
5. head over to the backend at https://github.com/SethCram/Linguists-NLP-to-SQL/blob/main/README.md#setup and follow the setup steps
6. run "npm start" in the root folder to get the frontend up and running

## Deployment Instructions (on Linux)
1. first, setup the backend: [backend deployment instructions](https://github.com/SethCram/Linguists-NLP-to-SQL#deployment-instructions)
2. install setup software Node.js and npm
    1. on Ubuntu-based distributions
        ```sh
        sudo apt install -y nodejs
        sudo apt install -y npm
        ```
    2. on RHEL-based distributions
        ```sh
        sudo yum install -y nodejs
        ```
3. clone the repository `git clone https://github.com/SethCram/linguists-client.git`
4. install pm2 globally for process management and the project dependencies 
    ```sh
    sudo npm i -gy pm2
    cd linguists-client
    npm install
    ```
5. try running the frontend `sudo npm start`
   1. if an issue is encountered, try installing nvm and updating to the right node.js version:
        ```sh
        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
        command -v nvm
        ```
        If "command -v nvm" doesn't output "nvm", logout and relogin, and then:
        ```sh
        nvm install 16.17.1
        ```
6. run the web app indefinitely and verify
    ```sh
    pm2 start --name linguists-client-dashboard npm -- start
    pm2 logs 
    ```
7. redirect the server traffic to the web application
    ```sh
   sudo vi /etc/nginx/nginx.conf
    ```
    add this inside the "server" block:
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
    verify the syntax of the config file is okay and start nginx using it
    ```sh
    sudo nginx -t
    sudo service nginx restart
    ```
        
8. navigate to the public IP address using http (e.g. http://[publicIPAddress]) and the frontend should be visible or use curl to verify `curl http://[publicIPAddress]` 
9. verify that it's connected to the backend at port 8000 by clicking on the dropdown and seeing if it breaks
