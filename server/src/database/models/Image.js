module.exports=function(sequelize,DataTypes){
    const Image = sequelize.define("images", 
    
    {
        id: {
            type: DataTypes.BIGINT(20),
            autoIncrement:true, 
            primaryKey: true
        },
        path: {
            type: DataTypes.STRING(64),
            allowNull: false
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


 
 return Image

}