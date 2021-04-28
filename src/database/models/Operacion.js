module.exports=function(sequelize,DataTypes){ 
     const operaciones = sequelize.define("operaciones", 
    
         {

            idoperacion: {
                type: DataTypes.SMALLINT(5),
                autoIncrement:true, 
                primaryKey: true
            },

            name : {
                type: DataTypes.STRING(15),
                allowNull: true
            }
        },{
            timestamps:false,
            "underscored": true
        })

        

        operaciones.associate = function (models) {
            operaciones.hasMany(models.propiedades, {
                as: "propiedades",
                    foreignKey:"rolee_id"
            })
        }

        
    
    return operaciones;
}