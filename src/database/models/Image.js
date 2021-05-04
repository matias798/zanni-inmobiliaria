module.exports=function(sequelize,DataTypes){
    const images = sequelize.define("images", 
    
    {
        id: {
            type: DataTypes.STRING(64),
            autoIncrement:true, 
            primaryKey: true,
            allowNull:true
        },
        path: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
       

        propiedades_id: {
            type: DataTypes.STRING(45),
            allowNull: false
        },

    },{timestamps:false,
        "underscored": true}
    )


 return images

}