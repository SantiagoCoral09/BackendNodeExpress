import { DataTypes } from 'sequelize';
import { sequelize } from '../Database/database.js';

//Relacionar la variable Producto con la tabla productos de la BD
const Carrito = sequelize.define('carritos', {
  // Model attributes are defined here. Los atributos de la tabla
  idCarrito: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    
  },
  idUsuario: {
    type: DataTypes.STRING,
    allowNull: false
  },
  valor_total: {
    type: DataTypes.DECIMAL(10,2)
  },
  fechaCreacion: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
  },
},
{
  timestamps: false,
});



export{
    Carrito
}