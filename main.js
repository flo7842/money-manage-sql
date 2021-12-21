const { app, BrowserWindow, ipcMain } = require('electron')
const { sequelize, DataTypes } = require('sequelize')

const path = require('path')
const ipc = ipcMain
const { shell } = require('electron')
const fs = require('fs')


const sequelizeDb = require('./db/database')
const {Istmt, Employees, Company} = require('./db/database')







sequelizeDb.initDb()
// Make window

function createWindow() {
    const win = new BrowserWindow({
        width: 1280,
        height: 720,
        minWidth: 1024,
        minHeight: 640,
        darkTheme: true,
        frame: true,
        icon: path.join(__dirname, './img/budget.ico'),
        webPreferences: {
            enableRemoteModule: true,
            nodeIntegration: true,
            contextIsolation: false,
            devTools: true,
            preload: path.join(__dirname, "preload.js")
        }
    })

    win.loadFile("index.html")
    win.webContents.openDevTools()

    // handler to close all windows
    // Top menu

    ipc.on('reduceApp', () => {
        win.minimize()
    })
    ipc.on('sizeApp', () => {
        if(win.isMaximized()){
            win.restore()
        }else{
            win.maximize()
        }
    })
    ipc.on('closeApp', () => {
        win.close()
    })
    ipc.on('reload', () => {
        win.reload()
    })
    ipc.on('exportPdf', () => {
        let date = new Date();
        let dateDay = date.getDay() + '_' + date.getMonth() + '_' + date.getFullYear() + '_' + date.getHours() + '_' + date.getMinutes() + '_' + date.getSeconds()
        let filePath = path.join(__dirname, `./export_pdf/export_${dateDay}.pdf`)
        // Options for export pdf
        let options = {
            marginsType: 1,
            pageSize: 'A4',
            printBackground: true,
            printSelectionOnly: false,
            landscape: false
        }
        // Make the export
        win.webContents.printToPDF(options).then(data => {
            fs.writeFile(filePath, data, function (err){
                if(err){
                    console.log(err)
                }else{
                    console.log('PDF was generated')
                    shell.openPath(filePath)
                }
            })
        })

    })

    // Allows to prevent an attacker from opening a new window
    app.on('web-contents-created', (event, contents) => {
        contents.setWindowOpenHandler(({ url }) => {

            if (isSafeForExternalOpen(url)) {
                setImmediate(() => {
                    shell.openExternal(url)
                })
            }

            return { action: 'deny' }
        })
    })

    // Adding new income / expense line
    ipc.on('addLineToDb', async (e, data) => {
        console.log('data dans le main new Istmt', data)
        // const newIStmt = IStmt.create({data})
        const newIStmt = await Istmt.create({date_entry: data.date_entry, amount: data.amount, info: data.info, type: data.type}).then(async data => {

            const IstmtSaved = await data.save()

            e.reply('new-task-created', JSON.stringify(IstmtSaved))
               
            win.reload()
           
            // console.log('newIStmtSaved',IstmtSaved)
        }).catch(err => {
            console.log('Error dans l\'ajout d\'une ligne', err)
        })
    })

    // Adding new employees
    ipc.on('addEmployeeToDb', async (e, data) => {
        
        //const newEmployees = new Employees(data)
        //const EmployeesSaved = await newEmployees.save()
        e.reply('new-employee-created', JSON.stringify(EmployeesSaved))
       
        win.reload()
     
    })

    ipc.on('get-tasks', async (e, args) => {

        const IstmtFind = await Istmt.findAll();

        e.reply('get-tasks', JSON.stringify(IstmtFind))
    })

    ipc.on('get-company', async (e, args) => {
        const companyFindModel = new Company()
        const CompanyFind = await companyFindModel.find()
        e.reply('get-company', JSON.stringify(CompanyFind))
    })
}



app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if(BrowserWindow.getAllWindows.length === 0){
            createWindow()
            

            
        }
    })
    var prefsWindow = new BrowserWindow({
        width: 400,
        height: 400,
        show: false
    })
    prefsWindow.loadURL('file://' + __dirname + '/livre.html')
    
    ipc.on('toggle-prefs', function(){
        if(prefsWindow.isVisible())
            prefsWindow.hide()
        else
            prefsWindow.show()
    })
   
})



app.on('window-all-closed', () => {
    if(process.platform !== 'darwin'){
        app.quit()
    }
})


