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
const getRequestrecyclablematerial = (request, response) => {
    pool.query('SELECT ' +
        'id,id_recyclable_material,id_request from public.Request_recyclable_material ORDER BY id ASC', (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })
}
const getRequestrecyclablematerialById = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('SELECT ' +
        'id,id_recyclable_material,id_request from public.Request_recyclable_material WHERE id = $1', (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })
}
const createRequestrecyclablematerial = (request, response) => {
    const { id, id_recyclable_material, id_request } = request.body
    pool.query('INSERT INTO public.Request_recyclable_material' +
        '(id,id_recyclable_material,id_request) ' +
        'VALUES ' +
        '($1,$2,$3)',
        [id, id_recyclable_material, id_request],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(201).send(`Request_recyclable_material added with ID: ${result.insertId}`)
        })
}
const updateRequestrecyclablematerial = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, email } = request.body
    pool.query(
        'UPDATE public.Request_recyclable_material SET ' +
        'id=$1,id_recyclable_material=$2,id_request=$3' +
        ' where id=$1',
        [id, id_recyclable_material, id_request],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User modified with ID: ${id}`)
        })
}
const deleteRequestrecyclablematerial = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('DELETE FROM public.Request_recyclable_material WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User deleted with ID: ${id}`)
    })
}
module.exports = {
    getRequestrecyclablematerial,
    getRequestrecyclablematerialById,
    createRequestrecyclablematerial,
    updateRequestrecyclablematerial,
    deleteRequestrecyclablematerial,
}
