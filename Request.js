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
const getRequest = (request, response) => {
    pool.query('SELECT ' +
        'amount,calification,commentary,created,distance,id,id_state,id_state_recycler,id_user_recycler,id_user_request,updated from public.Request ORDER BY id ASC', (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })
}

const getRequestInformationProcess = (request, response) => {
    pool.query('SELECT ' +
        'r.amount,r.calification,r.commentary,r.created,r.distance,r.id,r.id_state,st.name as stateUser,r.id_state_recycler,str.name as stateRecycler,r.id_user_recycler,r.id_user_request,' +
        'r.updated,userC.name || userC.last_name as nameCliente,userR.name || userR.last_name as nameRecycler ' +
        'from public.Request r ' +
        'inner join public.user as userC on userC.id=r.id_user_request ' +
        'left join public.user as userR on userR.id=id_user_recycler ' +
        'inner join public.state as st on st.id=r.id_state ' +
        'left join public.state as str on str.id=r.id_state_recycler ' +
        'ORDER BY r.id desc', (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })
}

const getRequestInformationProcessEmail = (request, response) => {
    const { email } = request.body
    pool.query('SELECT ' +
        'r.amount,r.calification,r.commentary,r.created,r.distance,r.id,r.id_state,st.name as stateUser,r.id_state_recycler,str.name as stateRecycler,r.id_user_recycler,r.id_user_request,' +
        'r.updated,userC.name,userC.last_name,userR.name,userR.last_name ' +
        'from public.Request r ' +
        'inner join public.user as userC on userC.id=r.id_user_request ' +
        'left join public.user as userR on userR.id=id_user_recycler ' +
        'inner join public.state as st on st.id=r.id_state ' +
        'left join public.state as str on str.id=r.id_state_recycler where userC.email=$1' +
        'ORDER BY id ASC',[email], (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })
}

const getInformationUserLocation = (request, response) => {
    const { id } = request.body
    pool.query('select ul.id,ul.id_user,ut.name ,ul.id_location,ul.active,lu.latitude,lu.longitude,lu.description,lu.reference,lu.active from  '+
	'public.user_location ul '+
	'left join public.location_user as lu on lu.id=ul.id_location '+
	'inner join public.user as u on u.id=ul.id_user '+
	'inner join public.user_type as ut on ut.id=u.id_user_type '+
	'where ul.id_user=$1 '+
	'order by 1 desc '+
	'limit 1',[id], (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })
}



const getRequestById = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('SELECT ' +
        'amount,calification,commentary,created,distance,id,id_state,id_state_recycler,id_user_recycler,id_user_request,updated from public.Request WHERE id = $1', (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })
}
const createRequest = (request, response) => {
    const { amount, calification, commentary, created, distance, id_state, id_user_request } = request.body
    pool.query('INSERT INTO public.Request' +
        '(amount,calification,commentary,created,distance,id_state,id_user_request) ' +
        'VALUES ' +
        '($1,$2,$3,$4,$5,$6,$7) RETURNING id',
        [amount, calification, commentary, created, distance, id_state, id_user_request],
        (error, result) => {
            if (error) {
                throw error
            }
            response.status(201).send(result.rows[0])
        })
}
const updateRequest = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, email } = request.body
    pool.query(
        'UPDATE public.Request SET ' +
        'amount=$1,calification=$2,commentary=$3,created=$4,distance=$5,id=$6,id_state=$7,id_state_recycler=$8,id_user_recycler=$9,id_user_request=$10,updated=$11' +
        ' where id=$1 ',
        [amount, calification, commentary, created, distance, id, id_state, id_state_recycler, id_user_recycler, id_user_request, updated],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User modified with ID: ${id}`)
        })
}

const updateRequestUser = (request, response) => {
    const { id,id_state, id_user_recycler,updated } = request.body
    pool.query(
        'UPDATE public.Request SET '+
        'id_state=$2,id_user_recycler=$3,updated=$4 '+
        'where id=$1 RETURNING *', 
        [id,id_state, id_user_recycler,updated],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(results.rows)
        })
}
const deleteRequest = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('DELETE FROM public.Request WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User deleted with ID: ${id}`)
    })
}
module.exports = {
    getRequest,
    getRequestInformationProcess,
    getRequestInformationProcessEmail,
    getInformationUserLocation,
    getRequestById,
    createRequest,
    updateRequest,
    updateRequestUser,
    deleteRequest,
}
