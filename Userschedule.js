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
const getUserschedule = (request, response) => {
    pool.query('SELECT ' +
        'id,id_schedule,id_user from public.User_schedule ORDER BY id ASC', (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })
}
const getUserscheduleById = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('SELECT ' +
        'id,id_schedule,id_user from public.User_schedule WHERE id = $1', (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })
}
const createUserschedule = (request, response) => {
    const { id, id_schedule, id_user } = request.body
    pool.query('INSERT INTO public.User_schedule' +
        '(id,id_schedule,id_user) ' +
        'VALUES ' +
        '($1,$2,$3)',
        [id, id_schedule, id_user],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(201).send(`User_schedule added with ID: ${result.insertId}`)
        })
}
const updateUserschedule = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, email } = request.body
    pool.query(
        'UPDATE public.User_schedule SET ' +
        'id=$1,id_schedule=$2,id_user=$3' +
        ' where id=$1',
        [id, id_schedule, id_user],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User modified with ID: ${id}`)
        })
}
const deleteUserschedule = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('DELETE FROM public.User_schedule WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User deleted with ID: ${id}`)
    })
}
module.exports = {
    getUserschedule,
    getUserscheduleById,
    createUserschedule,
    updateUserschedule,
    deleteUserschedule,
}
