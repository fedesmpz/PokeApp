const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id:{
      type: DataTypes.INTEGER,
      autoIncremental: true,
      allowNull: false,
      primaryKey: true,
      unique: true,
      defaultValue: sequelize.literal("nextval('start_id')"),
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/25.png"
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0      
    },
    attack: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    defense:{
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    speed:{
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    height:{
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    weight:{
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    }
  }, { timestamps: false });
};
