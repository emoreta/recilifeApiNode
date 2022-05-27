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
const getRecyclablematerial = (request, response) => {
    pool.query('SELECT ' +
        'active,description,id,name from public.Recyclable_material ORDER BY id ASC', (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })
}
const getRecyclablematerialById = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('SELECT ' +
        'active,description,id,name from public.Recyclable_material WHERE id = $1', (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })
}
const createRecyclablematerial = (request, response) => {
    const { active, description, id, name } = request.body
    pool.query('INSERT INTO public.Recyclable_material' +
        '(active,description,id,name) ' +
        'VALUES ' +
        '($1,$2,$3,$4)',
        [active, description, id, name],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(201).send(`Recyclable_material added with ID: ${result.insertId}`)
        })
}
const updateRecyclablematerial = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, email } = request.body
    pool.query(
        'UPDATE public.Recyclable_material SET ' +
        'active=$1,description=$2,id=$3,name=$4' +
        ' where id=$1',
        [active, description, id, name],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User modified with ID: ${id}`)
        })
}
const deleteRecyclablematerial = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('DELETE FROM public.Recyclable_material WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User deleted with ID: ${id}`)
    })
}
module.exports = {
    getRecyclablematerial,
    getRecyclablematerialById,
    createRecyclablematerial,
    updateRecyclablematerial,
    deleteRecyclablematerial,
}
