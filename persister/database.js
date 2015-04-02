var mongoose = require('mongoose');

// @ TODO remove for production level.
//mongoose.set('debug', true);

var db = function() {
  var initFlag = false;
  return {

    config: function(addr, dbname, opts, callback) {
      if( !initFlag ){
        var connectUrl = 'mongodb://' + (addr ? addr : 'localhost:27017') + '/' + (dbname ? dbname : 'sbadmin');
        mongoose.connect(connectUrl, (opts ? opts : {}));
        //mongoose.createConnection(connectUrl, (opts ? opts : {}));

        var db = mongoose.connection;

        db.on('error', function(err) {
          // Connection Error
          console.log('Mongodb error encountered [' + err + ']');

          if (callback) {
            callback('ERR-MONGODB', 'mongodb - '+err.message);
          }
        });

        db.once('open', function() {
          initFlag = true;
          if (callback) callback(null);
        });
      } else {
        if (callback) callback(null);
      }
    }
  };
};

module.exports = db();