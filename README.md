# Hospital-Suggestion-List
based on disease and painlevel hospital lists are suggested

Steps:

1. Download repo and go to project folder
2. npm init
3. npm install nodemon
4. Run ```nodemon server.js```
5. Go to browser and enter http://localhost:7000

Steps using docker: 

1. cd to sql service folder: ```docker build -t test-mysql . ```
2. ```docker run -d \```
```--publish 6603:3306 \```
```--volume=/Users/afrida/Documents/Course/paloit/sqlservice/data:/var/lib/mysql \```
```--name=testmysqlservice test-mysql```
3. ```mysql -u root -p -h localhost -P 6603 -D patientschem```
4. Now, for nodejs docker, in terminal type ```cd ..``` to comeback on project directory
5. ``` docker build -t test-nodejs .```
6. ```docker run  -d \```
```--publish 7000:7000 \```
```-e MYSQL_USER='root' \```
```-e MYSQL_PASSWORD='password' \```
```-e MYSQL_DATABASE='patientschem' \```
```-e MYSQL_HOST='172.17.0.2' \```
```--link testmysqlservice:db \```
```--name=test-nodejs-service test-nodejs```
3. From host machine terminal type command: ```curl localhost:7000```
4. Will show port listening on 7000 

