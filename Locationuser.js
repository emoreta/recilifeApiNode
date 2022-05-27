const Pool = require('pg').Pool
const pool = new Pool({
    user:'edison',
    host:'ec2-54-144-113-184.compute-1.amazonaws.com',
    database: 'recilife',
    password: '12345',
   dialect: 'postgres',
      dialectOptions: {
          ssl: true
        }
    
  })
const getLocationuser = (request, response) => {
    pool.query('SELECT ' +
        'active,created,description,id,latitude,longitude,reference from public.Location_user ORDER BY id ASC', (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })
}
const getLocationuserById = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('SELECT ' +
        'active,created,description,id,latitude,longitude,reference from public.Location_user WHERE id = $1', (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })
}
const createLocationuser = (request, response) => {
    const { active, created, description, latitude, longitude, reference } = request.body
    pool.query('INSERT INTO public.Location_user' +
        '(active,created,description,latitude,longitude,reference) ' +
        'VALUES ' +
        '($1,$2,$3,$4,$5,$6) returning *',
        [active, created, description, latitude, longitude, reference],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(201).send(results.rows)
        })
}
const updateLocationuser = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, email } = request.body
    pool.query(
        'UPDATE public.Location_user SET ' +
        'active=$1,created=$2,description=$3,id=$4,latitude=$5,longitude=$6,reference=$7' +
        ' where id=$1',
        [active, created, description, id, latitude, longitude, reference],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User modified with ID: ${id}`)
        })
}
const deleteLocationuser = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('DELETE FROM public.Location_user WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User deleted with ID: ${id}`)
    })
}
module.exports = {
    getLocationuser,
    getLocationuserById,
    createLocationuser,
    updateLocationuser,
    deleteLocationuser,
}
