const express = require('express');
const path    = require('path');

const startServer = (options) => {
    const {port, public_path = 'public' } = options
    
    
    //Un midleware configura contenido estatico

     const app = express();

    //Para usar midlewares se usa la palabra use(propio de express)
    app.use(express.static(public_path))//Contenido estatico disponible se encuentra en public

    app.use((req, res) => {
        const indexPath = path.join(__dirname, '../../', public_path, 'index.html');
        res.send(indexPath);
        console.log(indexPath);
    })
    app.listen(port,()=>{
        console.log(`Escuchando en el puerto ${port}`);
        
    })
} 

module.exports = {
    startServer
}