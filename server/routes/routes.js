const express = require('express');
const router = express.Router();

const connection = require('../connection');

//Rutas de niveles

router.get('/niveles', async(req, res) => {
    try{
        const query = "SELECT nivel_id, nivel, descripcion FROM mydb.niveles;"
        const niveles = await connection.query(query)
        res.json(niveles)
    }catch(error){
        return res.json({
            error:error
        })
    }
}) 


//Rutas de Categorias

router.get('/categorias', async(req,res) => {
    try{
        const query = "SELECT categoria_id, nombre, descripcion FROM mydb.categorias"
        const categorias = await connection.query(query)
        res.json(categorias)
    }catch(error){
        return res.json({
            error:error
        })
    }
})

router.post('/categorias_borrar', async(req,res) => {
    try{
        const cate_id = req.body.id;
        const query = "DELETE FROM mydb.categorias WHERE categoria_id = ?";
        await connection.query(query, [cate_id]);
        res.json(ok)
    } catch(error)
    {
        return res.json({
            error:error
        }) 
    }
})

router.post('/categorias_editar', async(req,res) => {
    try{
        const body = req.body;
        const query = "UPDATE mydb.categorias SET nombre = ?, descripcion = ? WHERE categoria_id = ?";
        await connection.query(query, [body.nombre, body.descripcion, body.id]);
        // console.log(data)
        res.json(ok)
    } catch(error)
    {
        return res.json({
            error:error
        }) 
    }
})


router.post('/categorias_agregar', async(req,res) => {
    try{
        const body = req.body;
        const query = "INSERT INTO categorias(nombre, descripcion) VALUES (?, ?);";
        await connection.query(query, [body.nombre, body.descripcion, body.id]);
        // console.log(data)
        res.json(ok)
    } catch(error)
    {
        return res.json({
            error:error
        }) 
    }
})

//Rutas de productos

router.get('/productos', async(req,res) => {
    try{
        const query = "SELECT productos.producto_id, productos.nombre, productos.descripcion, p_venta, p_compra, DATE_FORMAT(fecha, '%Y-%m-%d') as fecha, cantidad, activo FROM mydb.productos"
        const productos = await connection.query(query)
        res.json(productos)
    }catch(error){
        return res.json({
            error:error
        })
    }
})

router.post('/productos_borrar', async(req,res) => {
    try{
        const producto_id = req.body.id;
        const query = "DELETE FROM mydb.productos WHERE producto_id = ?";
        await connection.query(query, [producto_id]);
        res.json(ok)
    } catch(error)
    {
        return res.json({
            error:error
        }) 
    }
})


router.post('/productos_editar', async(req,res) => {
    try{
        const body = req.body;
        console.log(body);
        const query = "UPDATE mydb.productos SET nombre = ?, descripcion = ?, p_venta = ?, p_compra = ?, fecha = ?, cantidad =?, activo = ? WHERE producto_id = ?";
        await connection.query(query, [body.nombre, body.descripcion, body.p_venta, body.p_compra, body.fecha, body.cantidad, body.activo, body.id]);
        res.json(ok)
    } catch(error)
    {
        return res.json({
            error:error
        }) 
    }
})

router.post('/productos_agregar', async(req,res) => {
    try{
        const body = req.body;
        const query = "INSERT INTO productos(nombre, descripcion, p_venta, p_compra, cantidad, activo) VALUES (?, ?, ?, ?, ?, ?);";
        await connection.query(query, [body.nombre, body.descripcion, body.p_venta, body.p_compra,  body.cantidad, body.activo, body.id]);
        // console.log(data)
        res.json(ok)
    } catch(error)
    {
        return res.json({
            error:error
        }) 
    }
})


//Rutas de usuarios


router.get('/usuarios', async(req,res) => {
    try{
        const query = "SELECT usuario_id, usuario, password, niveles.nivel AS nivel, usuarios.nivel_id FROM mydb.usuarios INNER JOIN mydb.niveles ON usuarios.nivel_id = niveles.nivel_id";
        const usuarios = await connection.query(query)
        res.json(usuarios)
    }catch(error){
        return res.json({
            error:error
        })
    }
})

router.get('/usuarios_inicio', async(req,res) => {
    try{
        const query = "SELECT  usuario,FROM mydb.usuarios";
        const usuarios = await connection.query(query)
        res.json(usuarios)
    }catch(error){
        return res.json({
            error:error
        })
    }
})

router.post('/usuarios_borrar', async(req,res) => {
    try{
        const cate_id = req.body.id;
        const query = "DELETE FROM mydb.usuarios WHERE usuario_id = ?";
        await connection.query(query, [cate_id]);
        res.json(ok)
    } catch(error)
    {
        return res.json({
            error:error
        }) 
    }
})


router.post('/usuarios_editar', async(req,res) => {
    try{
        const body = req.body;
        const query = "UPDATE mydb.usuarios SET nivel_id = ?, password = ?, usuario = ? WHERE usuario_id = ?";
        await connection.query(query, [body.nivel_id, body.password, body.usuario, body.id]);
        res.json(ok)
    } catch(error)
    {
        return res.json({
            error:error
        }) 
    }
})

router.post('/usuarios_agregar', async(req,res) => {
    try{
        const body = req.body;
        const query = "INSERT INTO usuarios(nivel_id, password, usuario) VALUES (?, ?, ?);";
        await connection.query(query, [body.nivel_id, body.password, body.usuario, body.id]);
        // console.log(data)
        res.json(ok)
    } catch(error)
    {
        return res.json({
            error:error
        }) 
    }
})

//Rutas de ProdCat

router.get('/prodcat', async(req,res) => {
    try{
        const query = "SELECT productos.nombre, GROUP_CONCAT(categorias.nombre SEPARATOR ' / ') as cat FROM mydb.prodcat INNER JOIN productos ON prodcat.producto_id = productos.producto_id INNER JOIN mydb.categorias ON prodcat.categoria_id = categorias.categoria_id GROUP BY prodcat.producto_id;";
        const prodcat = await connection.query(query)
        res.json(prodcat)
    }catch(error){
        return res.json({
            error:error
        })
    }
})

// Rutas de Compras 

router.get('/compras', async(req,res) => {
    try{
        const query = "SELECT compra_id, nombre, usuario, DATE_FORMAT(compras.fecha, '%Y-%m-%d') as fecha, compras.cantidad, proveedor FROM mydb.compras INNER JOIN mydb.productos ON compras.producto_id = productos.producto_id INNER JOIN mydb.usuarios ON compras.usuario_id = usuarios.usuario_id"
        const compras = await connection.query(query)
        res.json(compras)
    }catch(error){
        return res.json({
            error:error
        })
    }
})

router.get('/compras_productos', async(req,res) => {
    try{
        const query = "SELECT producto_id, nombre FROM mydb.productos"
        const compras_productos = await connection.query(query)
        res.json(compras_productos)
    }catch(error){
        return res.json({
            error:error
        })
    }
})

router.get('/compras_usuarios', async(req,res) => {
    try{
        const query = "SELECT usuario_id, usuario FROM mydb.usuarios"
        const compras_productos = await connection.query(query)
        res.json(compras_productos)
    }catch(error){
        return res.json({
            error:error
        })
    }
})

router.post('/compras_borrar', async(req,res) => {
    try{
        const cate_id = req.body.id;
        const query = "DELETE FROM mydb.compras WHERE compras_id = ?";
        await connection.query(query, [compra_id]);
        res.json(ok)
    } catch(error)
    {
        return res.json({
            error:error
        }) 
    }
})

router.post('/compras_editar', async(req,res) => {
    try{
        const body = req.body;
        const query = "UPDATE mydb.compras SET producto_id = ?, usuario_id = ?, fecha = ?, cantidad = ?, proveedor = ?, WHERE compra_id = ?";
        await connection.query(query, [body.producto_id, body.usuario_id, body.fecha, body.cantidad, body.proveedor, body.id]);
        // console.log(data)
        res.json(ok)
    } catch(error)
    {
        return res.json({
            error:error
        }) 
    }
})


router.post('/compras_agregar', async(req,res) => {
    try{
        const body = req.body;
        const query = "INSERT INTO compras(producto_id, usuario_id, cantidad, proveedor) VALUES (?, ?, ?, ?);";
        await connection.query(query, [body.producto, body.usuario, body.cantidad, body.proveedor]);
        res.json(ok)
    } catch(error)
    {
        return res.json({
            error:error
        }) 
    }
})

module.exports = router;