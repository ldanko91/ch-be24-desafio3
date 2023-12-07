import express from "express";
import ProductManager from "./ProductManager.js";

const app = express()
const PORT = 8080
const manager1 = new ProductManager()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/products', async (req,res)=>{
    let {limit} = req.query
    
    if (limit){
        const productos = await manager1.getProducts();
        const limitProds = productos.slice(0,(limit))
        res.send(limitProds)     
    }else{
    const productos = await manager1.getProducts();
    res.send(productos)
    }
})

app.get('/products/:pid', async (req,res)=>{
    const pId = parseInt(req.params.pid)
    const producto = await manager1.getProductById(pId);
    res.send(producto)
})

app.listen(PORT,()=>console.log(`Servidor conectado al puerto: ${PORT}`))
