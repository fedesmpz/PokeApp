const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('type', {
      id:{
        type: DataTypes.INTEGER,
        autoIncremental: true,
        allowNull: false,
        primaryKey: true,
        unique: true,
        defaultValue: sequelize.literal("nextval('start_id_type')")
    },
    name: {
      type: DataTypes.ENUM(
        "normal",
        "fighting",
        "flying",
        "poison",
        "ground",
        "rock",
        "bug",
        "ghost",
        "steel",
        "fire",
        "water",
        "grass",
        "electric",
        "psychic",
        "ice",
        "dragon",
        "dark",
        "fairy",
        "unknown",
        "shadow"
      ),
      allowNull: false,
      unique: true
    }
  }, { timestamps: false })
}