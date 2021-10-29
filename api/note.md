# albums
/api/albums
http://henrypt.vicp.cc/api/albums
[GET]
{
  "code": 200,
  "data": [
    {
      "localization": "cn",
      "name": "喜乐",
      "releaseDate": "2019-03-10T00:00:00",
      "status": 0,
      "id": 3625237192470692000
    }
  ],
  "message": "",
  "createdOn": "2019-08-16T12:43:43.2161935+08:00"
}





# token
/api/token?grantType=client_credential&deviceID=11111&secretKey=22222
http://henrypt.vicp.cc/api/token?grantType=client_credential&deviceID=11111&secretKey=22222
[GET]
{
  "code": 200,
  "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiMTExMTEiLCJqdGkiOiIyMDc0MDNkMjMyNjE5ODU4YjhiZjU0YmE3MDg2YzFiZSIsIm5iZiI6MTU2NTkzMDY2MiwiZXhwIjoxNTY2Nzk0NjYyLCJpc3MiOiJodHRwOi8vd3d3LmNhYmlubmV0Lm5ldCIsImF1ZCI6Imh0dHA6Ly93d3cuY2FiaW5uZXQubmV0In0.qRrDHhEueU0Nablb52-YPmafuuwUlCmSs_uQfAWV9yw",
  "message": "",
  "createdOn": "2019-08-16T12:44:22.5354424+08:00"
}

# categories
/api/categories?lang=cn
http://henrypt.vicp.cc/api/categories?lang=cn
[GET]
{
  "code": "200:Successful, 400:Business Fault, 500:Server Error",
  "data": {},
  "message": "string",
  "createdOn": "2019-08-16T04:46:05.540Z"
}

# getters (Vuex)
使用VUEX中的getter把state.js数据计算筛选
getter.js
  menuClass1: (state) => (pid) => {
    //return state.categories.filter(c => c.parentID===0)
    return state.categories.find(c => c.parentID === pid)
  }

  menuClass2: state => (pid) => {
    return state.categories.find(c => c.parentID === pid)
  }

computed: {
  menuClass1: function(){
    return this.$store.getters.menuClass1(0)
  }
}

# json-server
1. install
  : npm i -g json-server
2. config & run
  data.json: your mock json file

  : json-server --watch src/mock/data.json

3. use json-server
  http://localhost:3000/  list all json objects
  http://localhost:3000/token?clientID=test123&secret=123456  list token info [ ?xxx is condition for query]

4. you case use PostMan sofware to test you json interface
  i just can test read & delete json data, but add & update i cannot use.
  
  