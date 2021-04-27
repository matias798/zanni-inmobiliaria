module.exports = function(sequelize,DataTypes){
const categorias = sequelize.define("categorias", {
    id: {
        type: DataTypes.TINYINT(2),
        primaryKey: true,
        allowNull:true
    },
    hogar: {
        type: DataTypes.STRING(10),
        allowNull: true
    },

    oficina: {
        type: DataTypes.STRING(32),
        allowNull: true
    },

    departamento: {
        type: DataTypes.STRING(32),
        allowNull: true
        
    },

    created_at: {
        type: DataTypes.DATE
    },
    updated_at: {
        type: DataTypes.DATE
    },
    deleted_at: {
        type: DataTypes.DATE
    }
},{
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    "underscored": true
})

categorias.associate = function (models) {
    categorias.hasMany(models.propiedades, {
        as: "propiedades",
            foreignKey:"role_id"
    })
}

return categorias}