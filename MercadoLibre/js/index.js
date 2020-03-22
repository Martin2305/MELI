// Carga de modulos necesarios y creación de nueva aplicacion.
var express 	= require("express"); 
var app 	= express();
var bodyParser 	= require('body-parser');
var request 	= require("request");
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
   extended: false
}));

app.use(bodyParser.json());

var globalVariable={
   x: 'sachin'
};

 
// Ejemplo: GET http://localhost:8080/users
// Consumimos datos Facke de la URL: https://jsonplaceholder.typicode.com/todos

app.get('/',function(req,res){
    res.sendfile("public/index.html");
});

app.get('/search',function(req,res){
   res.sendfile("public/2.html");
});

app.post('/search',function(req,res){
	
   var q = req.body.q; //Obtiene el texto ingresado en el campo de busqueda

  
   var url 	= `https://api.mercadolibre.com/sites/MLA/search?q=${q}&sort=id`
   console.log(url)
	request({
	    url: url,
	    json: true
	}, function (error, response, body) {
 
	    if (!error && response.statusCode === 200) {
            // Pintamos la respuesta JSON en navegador.

            var i = 0;
           while (i < 4) {
              var ubicacion = [body.results[0].address.state_name, body.results[1].address.state_name, body.results[2].address.state_name, body.results[3].address.state_name];
              var titulo = [body.results[0].title, body.results[1].title, body.results[2].title, body.results[3].title];
              var imagen = [body.results[0].thumbnail, body.results[1].thumbnail, body.results[2].thumbnail, body.results[3].thumbnail];
              var precio = [body.results[0].price, body.results[1].price, body.results[2].price, body.results[3].price];
              console.log(titulo[i])
              console.log(precio[i])
              console.log(imagen[i])
              console.log(ubicacion[i])
              i++;
            }
            res.sendfile("public/productos.html");
	    }
	})
});

/*app.get('/search', function(req, res) {
	
    const q = req.query.q;
  
   var url 	= `https://api.mercadolibre.com/sites/MLA/search?q=${q}`
   console.log(url)
	request({
	    url: url,
	    json: true
	}, function (error, response, body) {
 
	    if (!error && response.statusCode === 200) {
            // Pintamos la respuesta JSON en navegador.


            var titulo = body.results[0].title;
            var titulo2 = body.results[1].title;
            res.send(titulo + titulo2)
	    }
	})
});*/
 
//Ejemplo: GET http://localhost:8080/items/3
app.get('/users/:id', function(req, res) {
 
	var itemId = req.params.id;
 
	request({
	    url: url+itemId,
	    json: false
	}, function (error, response, body) {
 
	    if (!error && response.statusCode === 200) {
	    	// Pintamos la respuesta JSON en navegador.
	        res.send(body) 
	    }
	})
})
 
var server = app.listen(8888, function () {
    console.log('Server is running..'); 
});