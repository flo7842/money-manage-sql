module.exports = (sequelize, DataTypes) => {

const EmployeesMo = sequelize.define('Employees', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    civility: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address_number: {
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
    social_number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    registration_number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    qualification: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    gross_salary: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    occupation: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    entry_date: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    paid_holidays: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    paid_holidays_rest: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    },
    {
        timestamps: true,
        createdAt: false,
        updatedAt: false,
        freezeTableName: true,
        tableName: 'employee'
    })
    return EmployeesMo;
}