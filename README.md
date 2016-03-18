Database
==

Create data store

    use authenticate-nodejs-prototype

Insert test data

    db.userInfo.insert({'username':'admin','password':'admin'});
    db.userInfo.insert({'username':'jay','password':'jay'});
    db.userInfo.insert({'username':'roy','password':'password'});

Deployment
==

    npm install
    npm start

Accessible via `localhost:3000`
