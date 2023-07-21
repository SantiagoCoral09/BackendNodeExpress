// const {Router}=require('express'); //Para crear una instancia de un manejador de rutas
import { Router } from 'express';
// const {getProductos, postProductos, putProductos, deleteProductos}=require('../Controllers/controller');
import {
    getProductos,
    getProductosByCategoria,
    getProducto,
    postProductos,
    putProductos,
    deleteProductos,
    getAllCarritos,
    getCarrito,
    getCarritoById,
    postCarrito,
    putCarrito,
    deleteCarrito,
    getAllProductosAllCarritos,
    getAllProductosCarrito,
    getProductoCarrito,
    getProductoCarritoProduct,
    postProductoCarrito,
    putProductoCarrito,
    deleteAllProductosCarrito,
    deleteProductoCarrito,
    getAllCompras,
    getComprasByCorreo,
    getComprasById,
    postCompra,
    putCompra,
    deleteCompra
} from '../Controllers/controller.js';

const router = Router();

//Definir rutas
router.get("/", (req, res) => {
    res.send("GET Pagina Principal Express");
});
router.get("/productos", getProductos);
router.get("/productos_cat/:categoria", getProductosByCategoria);
router.get("/productos/:idProducto", getProducto);
router.post("/productos", postProductos);
router.put("/productos/:idProducto", putProductos);
router.delete("/productos/:idProducto", deleteProductos);//Recibe como parametro un idProducto

router.get("/carritos", getAllCarritos);
router.get("/carritoUser/:idUsuario", getCarrito);
router.get("/carritoId/:idCarrito", getCarritoById);
router.post("/carrito", postCarrito);
router.put("/carrito/:idCarrito", putCarrito);
router.delete("/carrito/:idCarrito", deleteCarrito);

router.get("/all_productos_carritos", getAllProductosAllCarritos);//Solo si es necesario
router.get("/all_productos_carrito/:idCarrito", getAllProductosCarrito);
router.get("/producto_carrito/:idProductoCarrito", getProductoCarrito);
router.get("/producto_carritoProduct/:ProductoId", getProductoCarritoProduct);

router.post("/productos_carrito/:idCarrito", postProductoCarrito);////Verificar...***
router.put("/producto_carrito/:idProductoCarrito", putProductoCarrito);
router.delete("/all_productos_carrito/:idCarrito", deleteAllProductosCarrito);
router.delete("/producto_carrito/:idProductoCarrito", deleteProductoCarrito);

router.get("/compras", getAllCompras);
router.get("/comprasCorreo/:correo", getComprasByCorreo);
router.get("/comprasId/:idCompra", getComprasById);
router.post("/compras", postCompra);
router.put("/compras/:idCompra", putCompra);
router.delete("/compras/:idCompra", deleteCompra);

// module.exports=router;
export default router;