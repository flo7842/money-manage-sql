const { Employees } = require('./db/database')


$(()=> {

    

    
    

    const exportPdf = document.getElementById('exportPdf')
    exportPdf.addEventListener('click', () => {
        ipc.send('exportPdf')
    })
   

    loadTablesLines()
});

loadTablesLines = async function () {
    
    
    

        
   
    
    // This will update `doc` age to `59`, even though the doc changed.
    
    
    
    // fetch content of db between two dates
    Employees.findAll().then(async (docs) => {
        


    

        let registerTable = document.getElementById('registerTable')
        let tableRows = registerTable.querySelectorAll('thead > tr')
       
       
        // Remove all lines in table
        await tableRows.forEach((el, i) => {
            if(i > 0){
                el.parentNode.removeChild(el)
               
            }
        })

        


        if(docs.length !== 0){
            let emptyRow = document.getElementById('emptyRow')
            emptyRow.innerHTML = ""
            docs.forEach((el, i) => {


                // Create line
                let row = registerTable.insertRow(1)
    
                // Create cell
                let cell1 = row.insertCell(0)
                let cell2 = row.insertCell(1)
                let cell3 = row.insertCell(2)
                let cell4 = row.insertCell(3)
                let cell5 = row.insertCell(4)
             
                
                // Inject content
                cell1.innerHTML = el.firstname
                cell2.innerHTML = el.lastname
                cell3.innerHTML = el.gross_salary + ' €'
                cell4.innerHTML = el.occupation
                
                cell5.innerHTML = '<button id="' + el.id + '" class="btn btn-warning btn-edit btn-action ml-2" data-toggle="modal" data-target="#editEmployeeModal"><i class="fa fa-edit"></i></button><button data-id="' + el.id + '" class="btn btn-danger btn-action ml-2"><i class="fa fa-trash"></i></button>'

                cell2.style.fontWeight = 'bold'
                cell3.setAttribute('class','updateSalary');
                cell4.style.color = cell4.innerHTML != 'Non définis' ? '' : '#b7b9cc'
                exportPdf.style.display = "block"
                
                exportPdf.addEventListener('mouseenter', () => {
                    exportPdf.classList.add('btn-warning')
                })
                exportPdf.addEventListener('mouseleave', () => {
                    exportPdf.classList.remove('btn-warning')
                })

                let btnEdit = document.getElementById(el.id)
                let btnEditEmployee = document.getElementById('btnEditEmployee')
                let editFirstName = document.getElementById('editFirstName')
                let editLastName = document.getElementById('editLastName')
                let editaddressLabel = document.getElementById('editaddressLabel')
                let editAddressNumber = document.getElementById('editAddressNumber')
                let editPostalCode = document.getElementById('editPostalCode')
                let editCity = document.getElementById('editCity')
                let editSocialNumber = document.getElementById('editSocialNumber')
                let editRegistrationNumber = document.getElementById('editRegistrationNumber')
                
                btnEdit.addEventListener('click', async () => {
                    
                    let doc = await Employees.findOne({ id: el.id })
                    
                    editLastName.value = doc.lastname
                    editFirstName.value = doc.firstname
                    editaddressLabel.value = doc.address
                    editAddressNumber.value = doc.address_number 
                    editPostalCode.value = doc.postal_code
                    editCity.value = doc.city
                    editSocialNumber.value = doc.social_number
                    editRegistrationNumber.value = doc.registration_number 
                    
                })
                
                btnEditEmployee.addEventListener('click', async () => {
                    await Employees.findOne({ id: el.id }).then((elem) => {
                        elem.update({
                            firstname: editFirstName.value, 
                            lastname: editLastName.value.toUpperCase(),
                            address: editaddressLabel.value,
                            address_number: editAddressNumber.value,
                            postal_code: editPostalCode.value,
                            city: editCity.value,
                            social_number: editSocialNumber.value,
                            registration_number: editRegistrationNumber.value
                        })
                    });
                    $('#editEmployeeModal').modal('hide');
                    window.location.reload()
                })

                let btnRemove = document.querySelector('[data-id="'+ el.id +'"]')
                
                btnRemove.addEventListener('click', async () => {
                    if(confirm('êtes vous sur de vouloir supprimer cette ligne ?')){
    
                        
                        await Employees.remove({ id: el.id }, {}, function (err, numRemoved) {
                            if(err != null){
                                console.log(err)
                            }
                            
                            row.remove()
                           
                          });
                    }else{
                        
                    }
                })
    
            })
        }else{
            emptyRow.innerHTML = "Aucun salarié enregistré"
            exportPdf.style.display = "none"
        }
        // Construct table with data

    
    
   

    
    })

    
//     let updateSalaryBtn = document.querySelectorAll('.toto')
                
//     updateSalaryBtn.forEach((elem, i) => {
        
//         elem.addEventListener('click', () => {
//             Employees.updateOne({}, { $set: {salary: 1000}}).then(data => console.log(data)).catch(err => console.log(err))
//             console.log(elem)
//             el.innerHTML = "toto"
//     })
// })



    Employees.count().then((count) => {
        //console.log("this is count", count)
    })


}