module.exports = function (sequelize, DataTypes) {
    const admin = sequelize.define("admin",

        {
            idadmin: {
                type: DataTypes.STRING(11),
                primaryKey: true,
                


            },
            celular: {
                type: DataTypes.STRING(65),
                allowNull: true
            },


            contraseña: {
                type: DataTypes.STRING(100),
                allowNull: false
            },

            email: {
                type: DataTypes.STRING(75),
                allowNull: true
            },
            direccion: {
                type: DataTypes.STRING(64),
                allowNull: true
            },

            matricula: {
                type: DataTypes.STRING(20),
                allowNull: true
            },
            
            avatar: {
                type: DataTypes.STRING(64),
                allowNull: true
            },


           
        },{
            timestamps:false,
            "underscored": true
        })

    return admin

}