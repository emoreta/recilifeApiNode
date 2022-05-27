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
const getState = (request, response) => {
    pool.query('SELECT ' +
        'active,description,field,id,name from public.State ORDER BY id ASC', (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })
}
const getStateById = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('SELECT ' +
        'active,description,field,id,name from public.State WHERE id = $1', (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })
}
const createState = (request, response) => {
    const { active, description, field, id, name } = request.body
    pool.query('INSERT INTO public.State' +
        '(active,description,field,id,name) ' +
        'VALUES ' +
        '($1,$2,$3,$4,$5)',
        [active, description, field, id, name],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(201).send(`State added with ID: ${result.insertId}`)
        })
}
const updateState = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, email } = request.body
    pool.query(
        'UPDATE public.State SET ' +
        'active=$1,description=$2,field=$3,id=$4,name=$5' +
        ' where id=$1',
        [active, description, field, id, name],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User modified with ID: ${id}`)
        })
}
const deleteState = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('DELETE FROM public.State WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User deleted with ID: ${id}`)
    })
}
module.exports = {
    getState,
    getStateById,
    createState,
    updateState,
    deleteState,
}
