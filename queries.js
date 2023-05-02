const { response } = require('express')

const Pool = require('pg').Pool
const pool = new Pool ({
    user: 'first_db_pj9r_user',
    host: 'dpg-ch8jf8m7avj2dpvq4pag-a',
    database: 'api',
    password: 'juqk4HmaVaizkt3160CdEijimF1WCyhR',
    port: 5432,
})

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users', (error, results) => {
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}


const getUserById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM users WHERE id =$1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })

}

const createNewUser = (request, response) => {
    const {name, email} = request.body

    pool.query('INSERT INTO users (name,email) VALUES ($1, $2) RETURNING *', [name,email], (error,results) => {
        if(error){
            throw error
        }
        response.status(201).send(`User added with ID: ${results.rows[0].id}`)
    })
}

const updateUser = (request,response) => {
    const id = request.params.id
    const {name, email} = request.body
    pool.query('UPDATE users SET name = $1, email= $2 WHERE id = $3',[name,email,id])

    pool.query('SELECT * FROM users WHERE id=$1',[id], (error,results) => {
        if (error){
            throw error
        }
        response.status(200).json(results.rows)
    })
    }

const deleteUser = (request, response) => {
    const id = request.params.id

    pool.query('DELETE FROM users WHERE id = $1', [id], (error,results)=> {
        if (error){
            throw error
        }
        response.status(200).send(`User with id: ${id} was deleted`)
    })
}

module.exports = {
    getUsers,
    getUserById,
    createNewUser,
    updateUser,
    deleteUser,
}