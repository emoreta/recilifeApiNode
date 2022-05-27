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
const getTemplateemail = (request, response) => {
    pool.query('SELECT ' +
        'active,description,id,name,template from public.Template_email ORDER BY id ASC', (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })
}
const getTemplateemailById = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('SELECT ' +
        'active,description,id,name,template from public.Template_email WHERE id = $1', (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })
}
const createTemplateemail = (request, response) => {
    const { active, description, id, name, template } = request.body
    pool.query('INSERT INTO public.Template_email' +
        '(active,description,id,name,template) ' +
        'VALUES ' +
        '($1,$2,$3,$4,$5)',
        [active, description, id, name, template],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(201).send(`Template_email added with ID: ${result.insertId}`)
        })
}
const updateTemplateemail = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, email } = request.body
    pool.query(
        'UPDATE public.Template_email SET ' +
        'active=$1,description=$2,id=$3,name=$4,template=$5' +
        ' where id=$1',
        [active, description, id, name, template],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User modified with ID: ${id}`)
        })
}
const deleteTemplateemail = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('DELETE FROM public.Template_email WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User deleted with ID: ${id}`)
    })
}
module.exports = {
    getTemplateemail,
    getTemplateemailById,
    createTemplateemail,
    updateTemplateemail,
    deleteTemplateemail,
}
