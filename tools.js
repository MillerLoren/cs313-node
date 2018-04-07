module.exports = {
    genId : function (){
        var rnd = Math.floor(Math.random() * 10000000000) + 1;
        var stop = false;
        while(stop = false){
          db.one('SELECT user_id FROM users WHERE user_id=$1', rnd)
          .then(id=>{
            rnd = Math.floor(Math.random() * 10000000000) + 1;
            stop = false;
          })
          .catch(error=>{
            if(error.received = "0"){
              stop = true;
            }else{
              console.log(error);
              stop = true;
            }
          });
        }
        return rnd;
    }
};
