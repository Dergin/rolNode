//Se carga la libreria de express
var express = require('express');
//Se crea la app llamando al metodo xpress
var app = express();
//Se llama al http pasandole el xpress para que lo ejecute
var server = require('http').Server(app);
//Llamamos a socket.io pasandole el server para que escuche
var io = require('socket.io')(server);
const PORT = process.env.PORT || 5001;

//Usamos el midelware para carjar los html de la pagina de cliente que seras estativos
app.use(express.static('client'));
//Ejemplo de hola mundo
//Se añade a la url a donde accederiamos
//Se genera una funcion de callback que ejecuta el ola mundo y lo pinta por pantalla
//Ña funcion tiene de entrada el rquest y el responde
app.get('/holaMundo',function( req, res){
	//res.status(200).send('ruta hola mundo');
	res.render('holaMundo.html');
});
var usuarios=[{
	usuario : "servidor",
	id: "null"
}];
//Array de mensages
var messages=[{
	id:1,
	text: 'Bienvenido al chat de Core. Alias No juguemos con los juguetes de papa',
	nickname: 'Servidor'
	}];
//Lanzamos el evento connection a los clientes
io.on('connection',function(socket){
	var address = socket.handshake.address;
	console.log("El nodo IP"+address+" se ha conectado");
	usuarios.push({usuario : "prueba",id : client.id});
	//Se envia al clietne los menszages
	socket.emit('messages',messages);
	// evento recivir mensaje
	socket.on('add-message',function (data){
		messages.push(data);
		// emite mensaje a todo el mundo conetado
		if (data.nickname == "susurro"){
			usuarios.push({usuario : data.nickname,id :client.id});

		}
		io.sockets.emit('messages',messages);
	});
	socket.on('susurro',function (data){
		messages.push(data);
		// emite mensaje a todo el mundo conetado
		var id = usuarios.find(susurro).id
		io.clients[id].send('messages',messages)
		//io.sockets.emit('messages',messages);
	});
	socket.on('add-usuario',function (data){
		messages.push({
			usuario : "data",
			ip: address
		});
		// emite mensaje a todo el mundo conetado
		//io.sockets.emit('messages',messages);
	});
	socket.on('throw-iniciative',function (data){
		var thow = d20()
		messages.push({id:1,
			text: thow,
			nickname: 'Servidor'
			});
		// emite mensaje a todo el mundo conetado
		io.sockets.emit('messages',messages);
	
	});

})
// se inicia el servidor en el puerto que quieras ( ete ejemplo el el 6677 pero suele ser el 8080)
// Se le añade una funcion de callback para ver que en servidor esta encendido
server.listen(PORT,function(){
	console.log("Servidor esta funcionando en "+PORT)
});

function d20(){
	return throwDice(20);
}

function throwDice(dice){
	return  Math.round(Math.random() * (dice - 1) + 1);
}
function susurro(id){
	return id.nombre === "susurro"
}