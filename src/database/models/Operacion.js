module.exports=function(sequelize,DataTypes){ 
     const operacion = sequelize.define("operacion", 
    
         {

            id: {
                type: DataTypes.SMALLINT(5),
                autoIncrement:true, 
                primaryKey: true
            },
            
            venta : {
                type: DataTypes.STRING(45),
                allowNull: true
            },


            alquiler : {
                type: DataTypes.STRING(45),
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
            },
        },{
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            "underscored": true
        })

        

        operacion.associate = function (models) {
            operacion.hasMany(models.propiedades, {
                as: "propiedades",
                    foreignKey:"rolee_id"
            })
        }

        
    
    return operacion;
}