const express = require('express');
const app = express()


app.set('view engine','ejs');
app.set('port',5000)

let bodyParser= require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
let Cliente = require('./Cliente.js');

app.use('/public',express.static('public'));

app.use('/createCliente',(req,res)=>{
	console.log(req.body);
	let servicio='';
	if(req.body.manicure==='on'){
		servicio='manicure';
	}else{
		servicio='cortes';
	}
	let newCliente = new Cliente({
			nombre:req.body.nombre,
			telefono:req.body.telefono,
			servicio:servicio,
		});
	console.log(''+newCliente)

	newCliente.save((err)=>{
		if(err){
			res.type('html').status(500);
			res.send('Error: '+err);
		}else{
			res.type('html').status(200);
			res.write('<h3>Cliente creado</h3>');
			res.write('<p>');
			res.write(req.body.nombre);
			res.write('<p>');
			res.write("<a href='/'>volver atras</a>");
			res.end();
		}
		
	});


});
app.use('/hola',(req,res)=>{
	res.send("hola mundo cruel");
})
app.use('/api',(req,res)=>{
	Cliente.find({},(err,clientes)=>{
		if(err){
			res.type('html').status(500);
			res.send('Error: '+err);
		}else{
			res.json(clientes);
		}
	});
});

app.use('/',(req,res)=>{

	
	res.status(200).redirect('/public/index.html');
});

app.listen(app.get('port'),()=>{
	console.log('Listening on port '+app.get('port'))
	let hora = new Date().getHours();
	console.log(hora);
	if(hora >= 21){
		console.log('esta es la hora '+hora)
		Cliente.remove({},function(err){
			if(err){
				console.log("Error: "+err);
			}else{
				console.log('success');
			}
		})
	}
});
