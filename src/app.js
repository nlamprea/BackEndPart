var express = require('express');
var mysql = require('mysql');
 
// metodos de express
var app = express();

//usar json en postman
app.use(express.json());

//parametros de conexion
var conexion = mysql.createConnection({
    host:'localhost',
    user:'nlamprea',
    password:'123456',
    database:'backenda'
});

conexion.connect(function(error){
    if(error){
        throw error;
    }else{
        console.log('Conexion correcta');
    }
});

app.get('/', function(req, res){
    res.send('INICIO');
});


//Mostar todo en la BD
app.get('/api/prueba1', (req,res)=>{
    conexion.query('SELECT * FROM prueba1', (error,filas)=>{
        if(error){
            throw error;
        }else{
            res.send(filas);
        }
    })
});

//Mostar una cosa de la BD
app.get('/api/prueba1/:id', (req,res)=>{
    conexion.query('SELECT * FROM prueba1 WHERE id = ?',[req.params.id], (error,fila)=>{
        if(error){
            throw error;
        }else{
            res.send(fila);
            //para un campoo espacifico
            //res.send(fila[0].motive);
        }
    })
});

app.post('/api/prueba1',(req,res)=>{
    let data = {student_id:req.body.student_id, motive:req.body.motive, request_text:req.body.request_text};
    // ? = data
    let sql = 'INSERT INTO prueba1 SET ?';
    conexion.query(sql, data, function(error,results){
        if(error){
            throw error;
        }else{
            res.send(results);
        }
    });
});

//EDITAR 
app.put('/api/prueba1/:id',(req,res)=>{
    let id = req.params.id;
    let student_id = req.body.student_id;
    let motive = req.body.motive; 
    let request_text= req.body.request_text;
    let sql= 'UPDATE prueba1 SET student_id = ?, motive = ?, request_text = ? WHERE id = ?';

    conexion.query(sql, [student_id, motive, request_text, id], function(error,results){
        if(error){
            throw error;
        }else{
            res.send(results);
        }
    });
});

//ELIMINAR
app.delete('/api/prueba1/:id',(req,res)=>{
    conexion.query('DELETE FROM prueba1 WHERE id = ?',[req.params.id],function(error, filas){
        if(error){
            throw error;
        }else{
            res.send(filas);
        }
    })
});
//process.env.PUERTO || 
const puerto = 3000;

app.listen(puerto, function(){
    console.log('Conexion server: '+ puerto);
});