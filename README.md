Database
==

Create data store

    use authenticate-nodejs-prototype

Insert test data

    db.userInfo.insert({'username':'admin','password':'$2a$10$EH5uVni2G1C/CJ4iA735xOXCgQI0C3TADLacQZepA4pbsmMKRyWrC'});
    db.userInfo.insert({'username':'jay','password':'$2a$10$xwzOp9B4Q18qx5vAQAr.wuXMlBWpRHE2ZTIAj3Gp7WlsgQT1cSFk.'});
    db.userInfo.insert({'username':'roy','password':'$2a$10$jQqeJOdJiSem2qKfW47CMu0SEJok4nTKJ60mycdpcyQtvB4jY2ETS'});

    Username: admin   Password: admin
    Username: jay     Password: test
    Username: roy     Password: password

Deployment
==

    npm install
    npm start

Accessible via `localhost:3000`

![Screenshot](http://i.imgur.com/5qENBla.png)
