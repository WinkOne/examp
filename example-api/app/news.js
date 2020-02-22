const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require('path');
const config = require('../config');
const nanoid = require("nanoid");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath)
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname))
    }
});

const upload = multer({storage});
const routerItems =  (connection) => {

    router.get('/', async (req, res) => {
        const news = await connection.query('SELECT * FROM `news`');
        res.send(news)
    });

    router.get('/:id', async (req, res) => {
        const oneNews = await connection.query('SELECT * FROM `news` WHERE `id` = ?', req.params.id);
        const newsElement = oneNews[0];
        if (!newsElement){
            return   res.status(404).send({message:'not a found'})
        }
        res.send(oneNews)
    });


    router.post('/', upload.single('image'), async (req, res) => {
        console.log(req.body);
        const news = req.body;
        if (req.file) {
            news.image = req.file.filename
        }

        if (!news.title) {
            return res.status(404).send({message: 'Error'})
        } else {
            const item = await connection.query('INSERT INTO `news` (`title`,`text`,`image`)'+
                'VALUES (?,?,?)',
                [news.title, news.text, news.image]);
            res.send({id:item.insertId})
        }

    });
    router.delete('/:id', async (req, res) => {
        await connection.query('DELETE FROM `news` WHERE `id` = ?', req.params.id);
        res.send({message:'delete'})
    });
    return router
};
module.exports = routerItems;