module.exports = function(sequelize,DataTypes){
const propiedades = sequelize.define("propiedades", {
    idpropiedad: {
        type: DataTypes.BIGINT(200),
        autoIncrement:true, 
        primaryKey: true
    },
    titulo: {
        type: DataTypes.STRING(65),
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING(255)
    },

    habitaciones: {
        type: DataTypes.TINYINT(3)
    },
    baños: {
        type: DataTypes.TINYINT(3)
    },


    dormitorios: {
        type: DataTypes.TINYINT(3)
    },



    direccion: {
        type: DataTypes.STRING(65)
    },

    precio: {
        type: DataTypes.DOUBLE(8,2),
        allowNull: false
    },
    imagen_principal: {
        type: DataTypes.STRING(64),
        allowNullcategorias: false
    },
},{
    timestamps: false,
    "underscored": true,
    paranoid: true,
})

propiedades.associate = function (models) {

    propiedades.belongsTo(models.categorias,{
as:"categorias",
foreignKey:"role_id"

    })



    propiedades.belongsTo(models.operaciones,{
    as:"operaciones",
    foreignKey:"rolee_id"
    
        })


        propiedades.hasMany(models.images, {
            as: "images", 
        })


}



return propiedades}