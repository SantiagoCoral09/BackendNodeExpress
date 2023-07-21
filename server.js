import express from "express";
import router from "./Routes/routes.js";
import { sequelize } from "./Database/database.js";
import { Producto } from "./Models/productos.js";
import { Carrito } from "./Models/carritos.js";
import { ProductoCarrito } from "./Models/productos_carrito.js";
import { Compra } from "./Models/compras.js";
import cors from 'cors';
import fs from 'fs';

//Crear instancia de express
const app = express();
app.use(cors());
app.use(express.json());
app.use(router);
app.set('port', 3000);
//Test a la base de datos
const testDb = async () => {
    try {
        // await sequelize.authenticate();
        
        await sequelize.sync();
        console.log('Conexion realizada con exito');
        //  // Leer el archivo SQL con los datos de productos
        //  const sqlFilePath = 'Database/fruver_sac_pg.sql';
        //  const sqlScript = fs.readFileSync(sqlFilePath, 'utf8');
 
        //  // Ejecutar el script SQL para llenar los datos
        //  await sequelize.query(sqlScript);
 
        //  console.log('Datos insertados en la tabla "productos" desde el archivo SQL.');
 
        
        app.listen(app.get('port'), () => {
            console.log(`Servidor corriendo en http://localhost:${app.get('port')}`);

            /////////////
            
        });
    } catch (error) {
        console.error(`Error al realizar conexion::: ${error}`);
    }
};
testDb();



