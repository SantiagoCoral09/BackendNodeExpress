import { Carrito } from "../Models/carritos.js";
import { Compra } from "../Models/compras.js";
import { Producto } from "../Models/productos.js";
import { ProductoCarrito } from "../Models/productos_carrito.js";

/// P R O D U C T O S

const getProductos = async (req, res) => {//Todos los productos disponibles
    try {
        const productos = await Producto.findAll();
        res.status(200).json(productos);
    } catch (error) {
        console.error(error);
        res.status(400).json({ mensaje: error });
    }
};
const getProductosByCategoria = async (req, res) => {
    try {
        const { categoria } = req.params; // Obtener la categoría desde los parámetros de la solicitud
        const productos = await Producto.findAll({
            where: {
                categoria: categoria // Filtrar por la categoría especificada
            }
        });
        res.status(200).json(productos);
    } catch (error) {
        console.error(error);
        res.status(400).json({ mensaje: error });
    }
};

const getProducto = async (req, res) => {//Buscar un producto por su id
    const { idProducto } = req.params;
    try {
        const producto = await Producto.findByPk(idProducto);
        res.status(200).json([producto]);
    } catch (error) {
        console.error(error);
        res.status(400).json({ mensaje: error });
    }
};
const postProductos = async (req, res) => {//Agregar producto
    const { nombre, precio, cantidad_producto, descripcion, categoria, imagen } = req.body;
    try {
        const newProducto = await Producto.create({
            nombre: nombre, precio: precio, cantidad_producto: cantidad_producto, descripcion: descripcion, categoria: categoria, imagen: imagen
        });
        res.status(200).json(newProducto);
    } catch (error) {
        console.error(error);
        res.status(400).json({ mensaje: error });
    }
}
const putProductos = async (req, res) => {//Actualizar un producto con su id
    const { idProducto } = req.params;
    const { nombre, precio, cantidad_producto, descripcion, categoria, imagen } = req.body;
    try {
        const oldProducto = await Producto.findByPk(idProducto);
        oldProducto.nombre = nombre;
        oldProducto.precio = precio;
        oldProducto.cantidad_producto = cantidad_producto;
        oldProducto.descripcion = descripcion;
        oldProducto.categoria = categoria;
        oldProducto.imagen = imagen;

        const modProducto = await oldProducto.save();

        // await Producto.update({nombre:nombre,detalle:detalle}, {
        //     where: {
        //       idProducto: idProducto
        //     }
        //   });
        res.status(200).json(modProducto);
    } catch (error) {
        console.error(error);
        res.status(400).json({ mensaje: error });
    }
};
const deleteProductos = async (req, res) => {//Eliminar un producto por su id
    const { idProducto } = req.params;
    try {
        const respuesta = await Producto.destroy({ where: { idProducto: idProducto } });
        res.status(200).json({
            body: {
                mensaje: `Registro con id  ${idProducto} Eliminado Satisfactoriamente`
            }
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ mensaje: `No se pudo eliminar. ${error}` });
    }
};

//C A R R I T O
const getAllCarritos = async (req, res) => {///Obtener todos los carritos
    try {
        const carrito = await Carrito.findAll();
        res.status(200).json(carrito);
    } catch (error) {
        // console.error(error);
        res.status(400).json({ mensaje: error });
    }
};
const getCarrito = async (req, res) => {///Obtener el carrito de un usuario por su idusuario
    const { idUsuario } = req.params;
    try {
        const carrito = await Carrito.findAll({
            where: { idUsuario: idUsuario }
        });
        res.status(200).json(carrito);
    } catch (error) {
        console.error(error);
        res.status(400).json({ mensaje: error });
    }
};
const getCarritoById = async (req, res) => {///Obtener el carrito de un usuario por su idCarrito
    const { idCarrito } = req.params;
    try {
        const carrito = await Carrito.findAll({
            where: { idCarrito: idCarrito }
        });
        res.status(200).json(carrito);
    } catch (error) {
        console.error(error);
        res.status(400).json({ mensaje: error });
    }
};

const postCarrito = async (req, res) => {//Agregar un carrito
    const { idUsuario, valor_total } = req.body;
    try {
        const newCarrito = await Carrito.create({ idUsuario: idUsuario, valor_total: valor_total });
        res.status(200).json(newCarrito);
    } catch (error) {
        console.error(error);
        res.status(400).json({ mensaje: error });
    }
};

const putCarrito = async (req, res) => {//Actualizar el valor total de un carrito
    const { idCarrito } = req.params;
    const { valor_total } = req.body;
    try {
        await Carrito.update({ valor_total: valor_total }, {
            where: {
                idCarrito: idCarrito
            }
        });
        res.status(200).json({ idCarrito: idCarrito, valor_total: valor_total });
    } catch (error) {
        console.error(error);
        res.status(400).json({ mensaje: error });
    }
};
const deleteCarrito = async (req, res) => {//Eliminar un carrito por su idCarrito
    const { idCarrito } = req.params;
    try {
        const respuesta = await Carrito.destroy({ where: { idCarrito: idCarrito } });
        res.status(200).json({
            body: {
                mensaje: `Registro con id  ${idCarrito} Eliminado Satisfactoriamente`
            }
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ mensaje: `No se pudo eliminar. ${error}` });
    }
};

/// P R O D U C T O S   D E   U N   C A R R I T O 

const getAllProductosAllCarritos = async (req, res) => {//Todos los productos de la tabla productos carrito
    try {
        const productos_carrito = await ProductoCarrito.findAll();
        res.status(200).json(productos_carrito);
    } catch (error) {
        console.error(error);
        res.status(400).json({ mensaje: error });
    }
};

const getAllProductosCarrito = async (req, res) => {//Todos los productos de un carrito por su idCarrito
    const { idCarrito } = req.params;
    try {
        const productos_carrito = await ProductoCarrito.findAll({
            where: { CarritoId: idCarrito },
            include: {
                model: Producto, // Nombre del modelo de Producto
                attributes: ['nombre', 'precio', 'cantidad_producto', 'descripcion', 'categoria', 'imagen'], // Incluye los atributos del Producto
            },
        });
        res.status(200).json(productos_carrito);
    } catch (error) {
        console.error(error);
        res.status(400).json({ mensaje: error });
    }
};
const getProductoCarrito = async (req, res) => {//Un solo producto de un carrito por su idProductoCarrito
    const { idProductoCarrito } = req.params;
    try {
        const producto_carrito = await ProductoCarrito.findOne({
            where: { idProductoCarrito: idProductoCarrito }
        });
        res.status(200).json(producto_carrito);
    } catch (error) {
        console.error(error);
        res.status(400).json({ mensaje: error });
    }
};

const getProductoCarritoProduct = async (req, res) => {//Un solo producto de un carrito por su idProducto
    const { ProductoId } = req.params;
    try {
        const producto = await ProductoCarrito.findOne({
            where: { ProductoId: ProductoId }
        });
        res.status(200).json(producto);
    } catch (error) {
        console.error(error);
        res.status(400).json({ mensaje: error });
    }
};
const postProductoCarrito = async (req, res) => {//Agregar un producto al carrito
    const { idCarrito } = req.params; //Se puede en body?
    const { ProductoId, cantidad, valor_parcial } = req.body;
    try {
        const newProductoCarrito = await ProductoCarrito.create({ CarritoId: idCarrito, ProductoId: ProductoId, cantidad: cantidad, valor_parcial: valor_parcial });
        res.status(200).json(newProductoCarrito);
    } catch (error) {
        console.error(error);
        res.status(400).json({ mensaje: error });
    }
}
const putProductoCarrito = async (req, res) => {//Actualizar un producto de un carrito si cambia la cantidad
    const { idProductoCarrito } = req.params;
    const { CarritoId, ProductoId, cantidad, valor_parcial } = req.body;
    try {
        const oldProductoCarrito = await ProductoCarrito.findByPk(idProductoCarrito);
        oldProductoCarrito.CarritoId = CarritoId;
        oldProductoCarrito.ProductoId = ProductoId;
        oldProductoCarrito.cantidad = cantidad;
        oldProductoCarrito.valor_parcial = valor_parcial;

        const modProductoCarrito = await oldProductoCarrito.save();

        // await Producto.update({nombre:nombre,detalle:detalle}, {
        //     where: {
        //       idProducto: idProducto
        //     }
        //   });
        res.status(200).json(modProductoCarrito);
    } catch (error) {
        console.error(error);
        res.status(400).json({ mensaje: error });
    }
};

const deleteAllProductosCarrito = async (req, res) => {//Eliminar todos los productos del carrito
    const { idCarrito } = req.params;
    try {
        const respuesta = await ProductoCarrito.destroy({ where: { CarritoId: idCarrito } });
        res.status(200).json({
            body: {
                mensaje: `Registros con id  ${idCarrito} Eliminado Satisfactoriamente`
            }
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ mensaje: `No se pudo eliminar. ${error}` });
    }
};

const deleteProductoCarrito = async (req, res) => {//Eliminar un producto del carrito
    const { idProductoCarrito } = req.params;
    try {
        const respuesta = await ProductoCarrito.destroy({ where: { idProductoCarrito: idProductoCarrito } });
        res.status(200).json({
            body: {
                mensaje: `Registro con id  ${idProductoCarrito} Eliminado Satisfactoriamente`
            }
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ mensaje: `No se pudo eliminar. ${error}` });
    }
};


// C O M P R A S

const getAllCompras = async (req, res) => {
    try {
        const compras = await Compra.findAll({
            include: {
                model: Carrito, // Especifica el modelo Carrito
                attributes: ['idCarrito', 'valor_total', 'idUsuario', 'fechaCreacion'] // Especifica los atributos que deseas incluir
            }
        });
        res.status(200).json(compras);
    } catch (error) {
        console.error(error);
        res.status(400).json({ mensaje: error });
    }
};


// const getComprasByCorreo = async (req, res) => {
//     const { correo } = req.params;
//     try {
//         const compras = await Compra.findAll({
//             include: {
//                 model: Carrito,
//                 attributes: ['idCarrito', 'valor_total', 'idUsuario', 'fechaCreacion'],
//             },
//             where: {
//                 correo: correo, // Condición de filtro para el correo
//             },
//         });
//         res.status(200).json(compras);
//     } catch (error) {
//         console.error(error);
//         res.status(400).json({ mensaje: error });
//     }
// };
const getComprasByCorreo = async (req, res) => {
    const { correo } = req.params;
    try {
        const compras = await Compra.findAll({
            include: {
                model: Carrito,
                attributes: ['valor_total'],
                include: {
                    model: ProductoCarrito,
                    attributes: ['cantidad', 'valor_parcial'],
                    include: {
                        model: Producto,
                        attributes: ['idProducto', 'nombre', 'precio', 'cantidad_producto', 'descripcion', 'categoria', 'imagen'],
                    },
                },
            },
            where: {
                correo: correo, // Condición de filtro para el correo
            },
        });

        res.status(200).json(compras);
    } catch (error) {
        console.error(error);
        res.status(400).json({ mensaje: error });
    }
};


// const getComprasById = async (req, res) => {//Todas las compras registradas con un idCompra
//     const { idCompra } = req.params;
//     try {
//         const compras = await Compra.findAll({
//             where: { idCompra: idCompra },
//             include: {
//                 model: Carrito, // Nombre del modelo de Producto
//                 attributes: ['idCarrito','idUsuario','valor_total','fechaCreacion'], // Incluye los atributos del Producto

//             },
//         });
//         res.status(200).json(compras);
//     } catch (error) {
//         console.error(error);
//         res.status(400).json({ mensaje: error });
//     }
// };
const getComprasById = async (req, res) => {
    const { idCompra } = req.params;
    try {
        const compras = await Compra.findAll({
            include: {
                model: Carrito,
                attributes: ['valor_total'],
                include: {
                    model: ProductoCarrito,
                    attributes: ['cantidad', 'valor_parcial'],
                    include: {
                        model: Producto,
                        attributes: ['idProducto', 'nombre', 'precio', 'cantidad_producto', 'descripcion', 'categoria', 'imagen'],
                    },
                },
            },
            where: {
                idCompra: idCompra,
            },
        });

        res.status(200).json(compras);
    } catch (error) {
        console.error(error);
        res.status(400).json({ mensaje: error });
    }
};


const postCompra = async (req, res) => {//Agregar una compra
    const { idCarritoCompra, nombres, correo, direccion, metodo_pago } = req.body;
    try {
        const newCompra = await Compra.create({ idCarritoCompra: idCarritoCompra, nombres: nombres, correo: correo, direccion: direccion, metodo_pago: metodo_pago });
        res.status(200).json(newCompra);
    } catch (error) {
        console.error(error);
        res.status(400).json({ mensaje: error });
    }
};

const putCompra = async (req, res) => {//Actualizar una compra
    const { idCompra } = req.params;
    const { idCarritoCompra, nombres, correo, direccion, metodo_pago } = req.body;
    try {
        await Compra.update({ idCarritoCompra: idCarritoCompra, nombres: nombres, correo: correo, direccion: direccion, metodo_pago: metodo_pago }, {
            where: {
                idCompra: idCompra
            }
        });
        res.status(200).json(idCompra);
    } catch (error) {
        console.error(error);
        res.status(400).json({ mensaje: error });
    }
};
const deleteCompra = async (req, res) => {//Eliminar una compra por su idCompra
    const { idCompra } = req.params;
    try {
        const respuesta = await Compra.destroy({ where: { idCompra: idCompra } });
        res.status(200).json({
            body: {
                mensaje: `Registro con id  ${idCompra} Eliminado Satisfactoriamente`
            }
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ mensaje: `No se pudo eliminar. ${error}` });
    }
};

export {
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
};