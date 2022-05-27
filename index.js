const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const userApi = require('./User')
const userTypeApi = require('./Usertype')
const calificationApi = require('./Calification')
const dayApi = require('./Day')
const locationUserApi = require('./Locationuser')
const recycableMaterialApi = require('./Recyclablematerial')
const requestApi = require('./Request')
const requestrecyclablematerialApi = require('./Requestrecyclablematerial')
const scheduleApi = require('./Schedule')
const sessiontypeApi = require('./Sessiontype')
const stateApi = require('./State')
const templateemailApi = require('./Templateemail')
const userlocationApi = require('./Userlocation')
const userscheduleApi = require('./Userschedule')

const port = 3001
const cors = require('cors');

app.use(cors({
    origin: '*'
}));

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})
//usuarios
app.get('/api/users', userApi.getUser)
app.post('/api/login', userApi.login)
app.post('/api/loginWeb', userApi.loginWeb)
app.get('/api/usersById/:id', userApi.getUserById)
app.post('/api/usersByEmail', userApi.getUserByEmail)
app.post('/api/users', userApi.createUser)
app.post('/api/usersUpdate', userApi.updateUser)
app.delete('/api/usersDelete/:id', userApi.deleteUser)

app.get('/api/Usertype', userTypeApi.getUsertype)
app.get('/api/Usertype/:id', userTypeApi.getUsertypeById)
app.post('/api/Usertype', userTypeApi.createUsertype)
app.put('/api/Usertype/:id', userTypeApi.updateUsertype)
app.delete('/api/Usertype/:id', userTypeApi.deleteUsertype)

app.get('/api/Calification', calificationApi.getCalification)
app.get('/api/Calification/:id', calificationApi.getCalificationById)
app.post('/api/Calification', calificationApi.createCalification)
app.put('/api/Calification/:id', calificationApi.updateCalification)
app.delete('/api/Calification/:id', calificationApi.deleteCalification)

app.get('/api/Day', dayApi.getDay)
app.get('/api/Day/:id', dayApi.getDayById)
app.post('/api/Day', dayApi.createDay)
app.put('/api/Day/:id', dayApi.updateDay)
app.delete('/api/Day/:id', dayApi.deleteDay)

app.get('/api/Locationuser', locationUserApi.getLocationuser)
app.get('/api/Locationuser/:id', locationUserApi.getLocationuserById)
app.post('/api/createLocationuser', locationUserApi.createLocationuser)
app.put('/api/Locationuser/:id', locationUserApi.updateLocationuser)
app.delete('/api/Locationuser/:id', locationUserApi.deleteLocationuser)

app.get('/api/Recyclablematerial', recycableMaterialApi.getRecyclablematerial)
app.get('/api/Recyclablematerial/:id', recycableMaterialApi.getRecyclablematerialById)
app.post('/api/Recyclablematerial', recycableMaterialApi.createRecyclablematerial)
app.put('/api/Recyclablematerial/:id', recycableMaterialApi.updateRecyclablematerial)
app.delete('/api/Recyclablematerial/:id', recycableMaterialApi.deleteRecyclablematerial)

/*app.get('/api/Recyclablematerial', recycableMaterialApi.getRecyclablematerial)
app.get('/api/Recyclablematerial/:id', recycableMaterialApi.getRecyclablematerialById)
app.post('/api/Recyclablematerial', recycableMaterialApi.createRecyclablematerial)
app.put('/api/Recyclablematerial/:id', recycableMaterialApi.updateRecyclablematerial)
app.delete('/api/Recyclablematerial/:id', recycableMaterialApi.deleteRecyclablematerial)*/

app.get('/api/Request', requestApi.getRequest)
app.get('/api/RequestInformationProcess',requestApi.getRequestInformationProcess)
app.post('/api/RequestInformationProcessEmail',requestApi.getRequestInformationProcessEmail)
app.post('/api/InformationUserLocation',requestApi.getInformationUserLocation)
app.get('/api/Request/:id', requestApi.getRequestById)
app.post('/api/createRequest', requestApi.createRequest)
app.put('/api/Request/:id', requestApi.updateRequest)
app.post('/api/updateRequestUser', requestApi.updateRequestUser)
app.delete('/api/Request/:id', requestApi.deleteRequest)

app.get('/api/Requestrecyclablematerial', requestrecyclablematerialApi.getRequestrecyclablematerial)
app.get('/api/Requestrecyclablematerial/:id', requestrecyclablematerialApi.getRequestrecyclablematerialById)
app.post('/api/Requestrecyclablematerial', requestrecyclablematerialApi.createRequestrecyclablematerial)
app.put('/api/Requestrecyclablematerial/:id', requestrecyclablematerialApi.updateRequestrecyclablematerial)
app.delete('/api/Requestrecyclablematerial/:id', requestrecyclablematerialApi.deleteRequestrecyclablematerial)

/*app.get('/api/Requestrecyclablematerial', requestrecyclablematerialApi.getRequestrecyclablematerial)
app.get('/api/Requestrecyclablematerial/:id', requestrecyclablematerialApi.getRequestrecyclablematerialById)
app.post('/api/Requestrecyclablematerial', requestrecyclablematerialApi.createRequestrecyclablematerial)
app.put('/api/Requestrecyclablematerial/:id', requestrecyclablematerialApi.updateRequestrecyclablematerial)
app.delete('/api/Requestrecyclablematerial/:id', requestrecyclablematerialApi.deleteRequestrecyclablematerial)*/

app.get('/api/Schedule', scheduleApi.getSchedule)
app.get('/api/Schedule/:id', scheduleApi.getScheduleById)
app.post('/api/Schedule', scheduleApi.createSchedule)
app.put('/api/Schedule/:id', scheduleApi.updateSchedule)
app.delete('/api/Schedule/:id', scheduleApi.deleteSchedule)

app.get('/api/Sessiontype', sessiontypeApi.getSessiontype)
app.get('/api/Sessiontype/:id', sessiontypeApi.getSessiontypeById)
app.post('/api/Sessiontype', sessiontypeApi.createSessiontype)
app.put('/api/Sessiontype/:id', sessiontypeApi.updateSessiontype)
app.delete('/api/Sessiontype/:id', sessiontypeApi.deleteSessiontype)

app.get('/api/State', stateApi.getState)
app.get('/api/State/:id', stateApi.getStateById)
app.post('/api/State', stateApi.createState)
app.put('/api/State/:id', stateApi.updateState)
app.delete('/api/State/:id', stateApi.deleteState)

app.get('/api/Templateemail', templateemailApi.getTemplateemail)
app.get('/api/Templateemail/:id', templateemailApi.getTemplateemailById)
app.post('/api/Templateemail', templateemailApi.createTemplateemail)
app.put('/api/Templateemail/:id', templateemailApi.updateTemplateemail)
app.delete('/api/Templateemail/:id', templateemailApi.deleteTemplateemail)

app.get('/api/Userlocation', userlocationApi.getUserlocation)
app.get('/api/Userlocation/:id', userlocationApi.getUserlocationById)
app.post('/api/Userlocation', userlocationApi.createUserlocation)
app.put('/api/Userlocation/:id', userlocationApi.updateUserlocation)
app.delete('/api/Userlocation/:id', userlocationApi.deleteUserlocation)

app.get('/api/Userschedule', userscheduleApi.getUserschedule)
app.get('/api/Userschedule/:id', userscheduleApi.getUserscheduleById)
app.post('/api/Userschedule', userscheduleApi.createUserschedule)
app.put('/api/Userschedule/:id', userscheduleApi.updateUserschedule)
app.delete('/api/Userschedule/:id', userscheduleApi.deleteUserschedule)



app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})