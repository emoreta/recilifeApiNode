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
const getSchedule = (request, response) => {
    pool.query('SELECT ' +
        'active,description,end_schedule,id,id_day,id_user,start_schedule from public.Schedule ORDER BY id ASC', (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })
}
const getScheduleById = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('SELECT ' +
        'active,description,end_schedule,id,id_day,id_user,start_schedule from public.Schedule WHERE id = $1', (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })
}
const createSchedule = (request, response) => {
    const { active, description, end_schedule, id, id_day, id_user, start_schedule } = request.body
    pool.query('INSERT INTO public.Schedule' +
        '(active,description,end_schedule,id,id_day,id_user,start_schedule) ' +
        'VALUES ' +
        '($1,$2,$3,$4,$5,$6,$7)',
        [active, description, end_schedule, id, id_day, id_user, start_schedule],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(201).send(`Schedule added with ID: ${result.insertId}`)
        })
}
const updateSchedule = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, email } = request.body
    pool.query(
        'UPDATE public.Schedule SET ' +
        'active=$1,description=$2,end_schedule=$3,id=$4,id_day=$5,id_user=$6,start_schedule=$7' +
        ' where id=$1',
        [active, description, end_schedule, id, id_day, id_user, start_schedule],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User modified with ID: ${id}`)
        })
}
const deleteSchedule = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('DELETE FROM public.Schedule WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User deleted with ID: ${id}`)
    })
}
module.exports = {
    getSchedule,
    getScheduleById,
    createSchedule,
    updateSchedule,
    deleteSchedule,
}
