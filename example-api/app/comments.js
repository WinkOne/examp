const express = require('express');
const router = express.Router();
const routerCategories = (connection) => {

    router.get('/', async (req, res) => {
        const comments = await connection.query('SELECT * FROM `comments`');
        res.send(comments)
    });

    router.get('/:id', async (req, res) => {
        const comments = await connection.query('SELECT * FROM `comments` WHERE `id` = ?', req.params.id);
        const commentElement = comments[0];
        if (!commentElement){
            return   res.status(404).send({message:'not a found'})
        }
        res.send(comments)
    });


    router.post('/', async (req, res) => {
        console.log(req.body);
        const comments = req.body;
        if (req.body.author === ''){
            comments.author = 'Anonymous'
        }
        if (!comments.coment) {
            return res.status(404).send({message: 'Error'})
        } else {
            const item = await connection.query('INSERT INTO `comments` (`news_id`, `author`, `coment`)' +
                'VALUES (?,?,?)', [comments.newsId, comments.author, comments.coment]);
            res.send({id: item.insertId})
        }


    });
    router.delete('/:id', async (req, res) => {
        try {
            await connection.query('DELETE FROM `comments` WHERE `id` = ?', req.params.id);
            res.send({message:'delete'})
        }catch (e) {
            res.send({message: e})
        }
    });
    return router
};
module.exports = routerCategories;