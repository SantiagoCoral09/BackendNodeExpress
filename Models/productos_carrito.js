import { DataTypes } from 'sequelize';
import { sequelize } from '../Database/database.js';
import { Carrito } from './carritos.js';
import { Producto } from './productos.js';

//Relacionar la variable Producto con la tabla productos de la BD
const ProductoCarrito = sequelize.define('productos_carritos', {
  // Model attributes are defined here. Los atributos de la tabla
  idProductoCarrito: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  CarritoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Carrito,
      key: 'idCarrito'
    }
  },
  ProductoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    // foreignKey: 'idProducto',
    references: {
      model: Producto,
      key: 'idProducto'
    }
  },
  cantidad: {
    type: DataTypes.INTEGER
    // allowNull defaults to true
  },
  valor_parcial: {
    type: DataTypes.DECIMAL(10, 2)
    // allowNull defaults to true
  }
},
  {
    timestamps: false,
  });

// Asociaciones adicionales en el modelo ProductoCarrito
ProductoCarrito.belongsTo(Carrito, { foreignKey: 'CarritoId' });
ProductoCarrito.belongsTo(Producto, { foreignKey: 'ProductoId' });

Carrito.hasMany(ProductoCarrito, { foreignKey: 'CarritoId' });//carrito
Producto.hasMany(ProductoCarrito, { foreignKey: 'ProductoId' });//producto

export {
  ProductoCarrito
}