const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!!');
});

app.get('/report/:deviceId', (req, res) => {
	// TODO: Write timestamp + deviceId to MySQL database
	mysql  = require('mysql');
	var connection = mysql.createConnection({     
	  host     : '127.0.0.1',       
	  user     : 'root',              
	  password : 'hhpPfkuF3ApfdD7z',       
	  port: '3306',                   
	  database: 'my_project' 
	});
	connection.connect();
	var sql = 'insert into t_geofencing_report(id, deviceId, create_time) values (0, ?, ?)';
	var sqlParam = [req.params.deviceId, parseInt(new Date().getTime()/1000)];
    console.log(`Report home: ${req.params.deviceId}`);
    connection.query(sql, sqlParam, function (err, result) {
    	res.send(result);
        if(err){
        	console.log('[INSERT ERROR] - ',err.message);
        	return;
        }
	});
	connection.end();
    res.sendStatus(201);
});

app.listen(port, () => console.log(`Service starts on port ${port}!`));
