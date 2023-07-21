import { DataTypes } from 'sequelize';
import { sequelize } from '../Database/database.js';

//Relacionar la variable Producto con la tabla productos de la BD
const Producto = sequelize.define('productos', {
  // Model attributes are defined here. Los atributos de la tabla
  idProducto: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING
  },
  precio:{
    type: DataTypes.DECIMAL(10,2)
  },
  cantidad_producto:{
    type: DataTypes.INTEGER
  },
  descripcion: {
    type: DataTypes.STRING
  },
  categoria: {
    type: DataTypes.STRING
  },
  imagen: {
    type: DataTypes.STRING
  },
},
{
  timestamps: false,
});

export{
    Producto
}