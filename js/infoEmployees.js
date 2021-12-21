const {Employees} = require('./db/database')
const { Op } = require("sequelize");


$(() => {


    let date = new Date();
    let month = [ "01","02","03","04","05","06","07","08","09","10","11","12"];
    let minDate = date.getFullYear() + "-" + month[date.getMonth()] + "-01"; 
    let maxDate = date.getFullYear() + "-" + month[date.getMonth()] + "-31"; 
  
    
  
    const countEmplId = document.getElementById("countEmplId");
    const countWmId = document.getElementById("countWmId");
    const countCmId = document.getElementById("countCmId");
    const countDevId = document.getElementById("countDevId");
    const wageBillTotal = document.getElementById("wageBillTotal");
    

    let countWM = 0
    let countDev = 0
    let countCm = 0
    let wageBill = 0

    const retrieveQualification = (occupation, htmlElement, icon) => {
        Employees.findAndCountAll({where: { occupation: occupation }}).then((count) => {

            //console.log("WebMaster", count)
            htmlElement.innerHTML = count.count + ` <i class="fas ${icon} ml-2"></i>`
           
        }).catch(err => {
            console.log("Error " + occupation, err)
        })
    }
    
    /**
     * Allows you to retrieve the total account of the company's employees
     */
    Employees.findAndCountAll().then((count) => {
        
        console.log("Total des employées", count)
        countEmplId.innerHTML = count.count + ' <i class="fas fa-male"></i>'

    }).catch(err => {
        console.log("Total des employées erreur", err)
    })

    /**
     * Allows you to retrieve the total account of the WebMaster employees
     */
    retrieveQualification('WebMaster', countWmId, 'fa-desktop');
    

    /**
     * Allows you to retrieve the total account of the Developer employees
     */
    retrieveQualification('Développeur', countDevId, 'fa-laptop-code');
    

    /**
     * Allows you to retrieve the total account of the commercial employees
     */
    retrieveQualification('Commercial', countCmId, 'fa-handshake');
    
    /**
     * Allows you to retrieve the salary of the employees
     */
    Employees.findAll().then((docs) => {
  
        docs.forEach(el => {
          if(parseInt(el.gross_salary) > 0){
            wageBill += parseInt(el.gross_salary)
            wageBillTotal.innerHTML = wageBill + ' <i class="fa fa-euro-sign"></i>'
          }
        })
       
    })

    // IStmt.find({$and: [{ date: { $gte: minDate } }, { date: { $lte: maxDate }}], amount: { $gte: 0 }}).exec(function (err, docs) {
    //   if(err){
    //     console.log("Error", err)
    //   }
    //   let count = docs.length
    //   incomeMonthNb.innerHTML = count
    //   console.log("Le count",count)
    // });
    // IStmt.find({$and: [{ date: { $gte: minDate } }, { date: { $lte: maxDate }}], amount: { $lte: 0 }}).exec(function (err, docs) {
    //   if(err){
    //     console.log("Error", err)
    //   }
    //   let count = docs.length
    //   expenseMonthNb.innerHTML = count
     
    // });
    
  });
  