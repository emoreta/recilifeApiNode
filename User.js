const Pool = require('pg').Pool
const pool = new Pool({
    user: 'edison',
    host: 'ec2-54-144-113-184.compute-1.amazonaws.com',
    database: 'recilife',
    password: '12345',
    dialect: 'postgres',
    dialectOptions: {
        ssl: true
    }

})
const getUser = (request, response) => {
    pool.query('SELECT ' +
        'active,bussines_name,calification,created,email,field1,field2,id,id_session_type,id_user_type,identification_ruc,image,last_name,mobile_number,name,password,telephone,token,updated,user_id from public.User ORDER BY id ASC', (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })
}
const login = (request, response) => {
    const { email, password, userType } = request.body
    //console.log(request.body);

    pool.query("select count(*)as cc from public.\"user\" where email=$1 and password=$2 and  id_user_type=$3 ", [email, password, userType], (error, results) => {
        console.log(results.rows[0].cc)
        if (error) {
            throw error
        }
        //response.status(201).send(`Login state: ${results.rows[0].cc}`)
        response.status(201).send({ state: results.rows[0].cc })
    })
}
const loginWeb = (request, response) => {
    const { email, password, userType } = request.body
    //console.log(request.body);

    pool.query("select id,name,last_name,email from public.\"user\" where email=$1 and password=$2 and  id_user_type=$3 ", [email, password, userType], (error, results) => {
        console.log(results.rows[0])
        if (error) {
            throw error
        }
        //response.status(201).send(`Login state: ${results.rows[0].cc}`)
        response.status(201).send({ state: results.rows[0] })
    })
}
const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
    console.log(id);
    pool.query('SELECT ' +
        'active,bussines_name,calification,created,email,field1,field2,id,id_session_type,id_user_type,identification_ruc,image,last_name,mobile_number,name,password,telephone,token,updated,user_id from public.User WHERE id = $1', (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })
}

const getUserByEmail = (request, response) => {
    const { email } = request.body
    console.log(email);
    pool.query('SELECT ' +
        'active,bussines_name,calification,created,email,field1,field2,id,id_session_type,id_user_type,identification_ruc,image,last_name,mobile_number,name,password,telephone,token,updated,user_id from public.User WHERE email = $1',
        [email],
        (error, results) => {
            if (error) {
                //throw error
            }
            if (results.rowCount == 0) {
                response.status(200).json({ "id": "0", "message": "no existe" })
            }
            else {
                response.status(200).json({ "id": "1", "message": results.rows })
            }
        })
}
const createUser = (request, response) => {


    const { email,active, bussines_name, calification, created , field1, field2, id_session_type, id_user_type, identification_ruc, image, last_name, mobile_number, name, password, telephone, token, updated, user_id } = request.body
    console.log(email);
    pool.query('SELECT ' +
        'active,bussines_name,calification,created,email,field1,field2,id,id_session_type,id_user_type,identification_ruc,image,last_name,mobile_number,name,password,telephone,token,updated,user_id from public.User WHERE email = $1',
        [email],
        (error, results) => {
            if (error) {
                //throw error
            }
            if (results.rowCount == 0) {
                //response.status(200).json({"id":"0","message":"no existe"}) 
                pool.query('INSERT INTO public.User' +
                    '(active,bussines_name,calification,created,email,field1,field2,id_session_type,id_user_type,identification_ruc,image,last_name,mobile_number,name,password,telephone,token,updated,user_id) ' +
                    'VALUES ' +
                    '($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19)',
                    [active, bussines_name, calification, created, email, field1, field2, id_session_type, id_user_type, identification_ruc, image, last_name, mobile_number, name, password, telephone, token, updated, user_id],
                    (error, results) => {
                        if (error) {
                            //throw error
                            response.status(201).send({ state: 0 })//no inserto
                        }
                        response.status(201).send({ state: 1 })//se inserto
                    })
            }
            else {
                response.status(200).json({ state: 0,message:"usuario ya existe" })
            }
        })


    //const { active, bussines_name, calification, created, email, field1, field2, id_session_type, id_user_type, identification_ruc, image, last_name, mobile_number, name, password, telephone, token, updated, user_id } = request.body




}
const updateUser = (request, response) => {
    const ids = parseInt(request.params)
    console.log("ids", request.params.id)

    const { active, bussines_name, calification, created, email, field1, field2, id, id_session_type, id_user_type, identification_ruc, image, last_name, mobile_number, name, password, telephone, token, updated, user_id } = request.body
    console.log("updateUser", id)
    pool.query(
        'UPDATE public.User SET ' +
        'active=$1,bussines_name=$2,calification=$3,created=$4,email=$5,field1=$6,field2=$7,id=$8,id_session_type=$9,id_user_type=$10,identification_ruc=$11,image=$12,last_name=$13,mobile_number=$14,name=$15,password=$16,telephone=$17,token=$18,updated=$19,user_id=$20' +
        ' where id=$8',
        [active, bussines_name, calification, created, email, field1, field2, id, id_session_type, id_user_type, identification_ruc, image, last_name, mobile_number, name, password, telephone, token, updated, user_id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send({ "state": id, "message": "user modified" })
        })
}
const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('DELETE FROM public.User WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User deleted with ID: ${id}`)
    })
}
module.exports = {
    getUser,
    login,
    loginWeb,
    getUserById,
    getUserByEmail,
    createUser,
    updateUser,
    deleteUser,
}
