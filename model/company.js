module.exports = (sequelize, DataTypes) => {

const CompanyModel = sequelize.define('Company', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    company_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    activity: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    adress_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    adress_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    postal_code: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    siret: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    },
    {
        timestamps: true,
        createdAt: false,
        updatedAt: false,
        freezeTableName: true,
        tableName: 'company'
    })
    return CompanyModel;
}