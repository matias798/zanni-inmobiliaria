module.exports=function(sequelize,DataTypes){
    const images = sequelize.define("images", 
    
    {
        idimages: {
            type: DataTypes.STRING(64),
            autoIncrement:true, 
            primaryKey: true
        },
        path: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
       
    })

    images.associate = function (models) {

    images.belongsTo(models.propiedades,{
        as:"propiedades",
        })
    }

 return images

}