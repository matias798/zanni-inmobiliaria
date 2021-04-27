module.exports = function(sequelize,DataTypes){
const categorias = sequelize.define("categorias", {
    id_tipo_propiedad: {
        type: DataTypes.TINYINT(2),
        primaryKey: true,
        allowNull:true
    },
    nombre: {
        type: DataTypes.STRING(10),
        allowNull: true
    }
},{timestamps:false,
    "underscored": true

})

categorias.associate = function (models) {
    categorias.hasMany(models.propiedades, {
        as: "propiedades",
            foreignKey:"role_id"
    })
}

return categorias}