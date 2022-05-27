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
const getUsertype = (request, response) => {
    pool.query('SELECT ' +
        'description,id,name from public.User_type ORDER BY id ASC', (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })
}
const getUsertypeById = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('SELECT ' +
        'description,id,name from public.User_type WHERE id = $1', (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })
}
const createUsertype = (request, response) => {
    const { description, id, name } = request.body
    pool.query('INSERT INTO public.User_type' +
        '(description,id,name) ' +
        'VALUES ' +
        '($1,$2,$3)',
        [description, id, name],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(201).send(`User_type added with ID: ${result.insertId}`)
        })
}
const updateUsertype = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, email } = request.body
    pool.query(
        'UPDATE public.User_type SET ' +
        'description=$1,id=$2,name=$3' +
        ' where id=$1',
        [description, id, name],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User modified with ID: ${id}`)
        })
}
const deleteUsertype = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('DELETE FROM public.User_type WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User deleted with ID: ${id}`)
    })
}
module.exports = {
    getUsertype,
    getUsertypeById,
    createUsertype,
    updateUsertype,
    deleteUsertype,
}
