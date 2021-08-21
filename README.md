# Hackthe6ix

Bing bong hello friends


## API
API for image upload requires `config.js` in the same directory as `index.js` with Cockroach DB credentials.  

API is deployed on a GCP ec2-medium instance, serving a Node Express API using NGINX and pm2.  

### config.js format
`config.js` should be formatted as follows:
```
var config = {
  dialect: "",
  username: "",
  password: "",
  host: "",
  port: 0,
  database: "",
};

module.exports = config;
```

### instructions:
1. create config.js as specified
2. create file /backend/certs/root.crt, populate with contents generated in cockroach db initialization process
3. within `/backend`, run `npm install`
4. additionally, install `pm2` and `nginx` globally with `npm`
5. Follow [this guide](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-20-04) for NGIX and pm2 setup