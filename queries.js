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
const getUsers = (request, response) => {
  pool.query('SELECT * FROM dbo.user ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
const login = (request, response) => {
  const { email, password, userType } = request.body
  //console.log(request.body);

  pool.query("select count(*)as cc from dbo.\"user\" where email=$1 and password=$2 and  id_user_type=$3 ", [email, password, userType], (error, results) => {
    console.log(results.rows[0].cc)
    if (error) {
      throw error
    }
    //response.status(201).send(`Login state: ${results.rows[0].cc}`)
    response.status(201).send({ state: results.rows[0].cc })
  })
}


const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createUser = (request, response) => {
  const { name, email } = request.body

  pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${result.insertId}`)
  })
}

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email } = request.body

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getUsers,
  login,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}
