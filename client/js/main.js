//Para un servidor local se pone la io
var socket = io.connect('http://192.168.1.2:6677',{'forceNew':true});
//Recivimos messages del cliente
socket.on('messages',function(data){
	console.log(data);
	render(data);
});
function render(data){
	//Se almacena los datos
	var html = data.map(function(message,index){
		var classpropio = "";
		if($("#nombreUsuario").val()==message.nickname){
			classpropio="propio"
		}
		//Devuelve la estructura a lo duro
		return(`<div class="mensajeWrapper ${classpropio}">
					<div class="propietario">
					${message.nickname}
					</div>
					<div class="mensaje">
					${message.text}
					</div>
			</div>
		`);
	});
	
	// Se pinta el dato
	var div_mensajes=$('.chatCuerpo');
	div_mensajes.html(html);
	div_mensajes.scrollTop = div_mensajes.scrollHeight;
}
function addMessage(){
	var message = {
		nickname: $("#nombreUsuario").val(),
		text: $(".textNuevoMensaje").val(),
		ip: "cliente"
	};
	socket.emit('add-message',message);
}

//funciones de windows
$("document").ready(function(){
	$(".btnEnviar").click(function(){
		addMessage();
	})
})