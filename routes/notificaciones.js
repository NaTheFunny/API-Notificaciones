const express = require('express');
const router = express.Router();
const db = require('../db'); 

router.get('/:usuario_id', async (req, res) => {
    const { usuario_id } = req.params;
    const sql = 'SELECT * FROM notificaciones WHERE usuario_id = ?';
    
    try {
        const result = await db.executeSql(sql, [usuario_id]);
        res.json(result.rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/', async (req, res) => {
    const { usuario_id, mensaje, tipo } = req.body;
    const sql = 'INSERT INTO notificaciones (usuario_id, mensaje, tipo) VALUES (?, ?, ?)';
    
    try {
        const result = await db.executeSql(sql, [usuario_id, mensaje, tipo]);
        res.status(201).json({ id: result.insertId });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const sql = 'UPDATE notificaciones SET leido = ? WHERE id = ?';
    
    try {
        await db.executeSql(sql, [true, id]);
        res.status(200).send('Notificación actualizada');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
