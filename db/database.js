const { Sequelize, DataTypes, model } = require('sequelize')
const istmtModel = require('../model/income-statement')
const employeesModel = require('../model/employees')
const companyModel = require('../model/company')

let sequelizeDb;

// connect to mysql
sequelizeDb = new Sequelize('money_manage', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    dialectOptions: {
      timezone: 'Etc/GMT-2',
    },
    logging: true
})




const Istmt = istmtModel(sequelizeDb, DataTypes)

const Employees = employeesModel(sequelizeDb, DataTypes)

const Company = companyModel(sequelizeDb, DataTypes)


const initDb = () => {
  
    return sequelizeDb.sync({force: true}).then(_ => {
        createElem()
       
      
      console.log('La base de donnée a bien été initialisée !')
    })
  }


try{
    sequelizeDb.authenticate();
    
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

const createElem = async() =>{
    const createIstmt = await Istmt.create({date_entry: '2021-10-19', amount: 25, info: 'Achat informatique', type: 'Achat'})
    const createIstmtnew = await Istmt.create({date_entry: '2021-10-11', amount: 150, info: 'Achat informatique', type: 'Achat'})
 

    const createEmployees = await Employees.create({civility: 'Mr', firstname: 'Florian', 
    lastname: 'Bracq', address: 'Boulevard jourdan',
    address_number: 106, postal_code: '75014',
    city: 'Paris', social_number: '192078451278',
    registration_number: '18542', qualification: 'Ap 2',
    gross_salary: 1530, occupation: 'Développeur',
    entry_date: '2021-10-11', paid_holidays: 30,
    paid_holidays_rest: 18

    })
    
    
    const createCompany = await Company.create({company_name: 'Florian\'S Company', activity: 'Web Agency',
    adress_name: 'rue des petits murs', adress_number: 58, postal_code: '75012', city: 'Paris', siret: '1515asgy95kc'})
    
    
    await createIstmt.save()
    await createIstmtnew.save()
    await createCompany.save()
    await createEmployees.save()
}
    
module.exports = { 
    initDb, Istmt, Employees, Company
}