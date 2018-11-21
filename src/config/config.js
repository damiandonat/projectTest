/*
* Info
serverApi: {
  local: 'localhost'
}
*/

const serverApi = {
  /*
  * Here you can put more hosts
  */
  localhost: 'localhost'
}

const configObj = {
    port: 9000,
    serverApi: serverApi.localhost
};

module.exports = configObj;
