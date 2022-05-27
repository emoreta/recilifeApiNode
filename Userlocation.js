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
const getUserlocation = (request, response) => {
    pool.query('SELECT ' +
        'active,id,id_location,id_user from public.User_location ORDER BY id ASC', (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })
}
const getUserlocationById = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('SELECT ' +
        'active,id,id_location,id_user from public.User_location WHERE id = $1', (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })
}
const createUserlocation = (request, response) => {
    const { active, id, id_location, id_user } = request.body
    pool.query('INSERT INTO public.User_location' +
        '(active,id,id_location,id_user) ' +
        'VALUES ' +
        '($1,$2,$3,$4)',
        [active, id, id_location, id_user],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(201).send(`User_location added with ID: ${result.insertId}`)
        })
}
const updateUserlocation = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, email } = request.body
    pool.query(
        'UPDATE public.User_location SET ' +
        'active=$1,id=$2,id_location=$3,id_user=$4' +
        ' where id=$1',
        [active, id, id_location, id_user],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User modified with ID: ${id}`)
        })
}
const deleteUserlocation = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('DELETE FROM public.User_location WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User deleted with ID: ${id}`)
    })
}
module.exports = {
    getUserlocation,
    getUserlocationById,
    createUserlocation,
    updateUserlocation,
    deleteUserlocation,
}
