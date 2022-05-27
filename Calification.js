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
const getCalification = (request, response) => {
    pool.query('SELECT ' +
        'active,created,id,name,punctuation from public.Calification ORDER BY id ASC', (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })
}
const getCalificationById = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('SELECT ' +
        'active,created,id,name,punctuation from public.Calification WHERE id = $1', (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })
}
const createCalification = (request, response) => {
    const { active, created, id, name, punctuation } = request.body
    pool.query('INSERT INTO public.Calification' +
        '(active,created,id,name,punctuation) ' +
        'VALUES ' +
        '($1,$2,$3,$4,$5)',
        [active, created, id, name, punctuation],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(201).send(`Calification added with ID: ${result.insertId}`)
        })
}
const updateCalification = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, email } = request.body
    pool.query(
        'UPDATE public.Calification SET ' +
        'active=$1,created=$2,id=$3,name=$4,punctuation=$5' +
        ' where id=$1',
        [active, created, id, name, punctuation],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User modified with ID: ${id}`)
        })
}
const deleteCalification = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('DELETE FROM public.Calification WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User deleted with ID: ${id}`)
    })
}
module.exports = {
    getCalification,
    getCalificationById,
    createCalification,
    updateCalification,
    deleteCalification,
}
