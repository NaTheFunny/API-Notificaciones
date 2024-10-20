const express = require('express');
const router = express.Router();
const { executeSql } = require('../db'); 

router.get('/api/notificaciones/:usuarioId', async (req, res) => {
    const { usuarioId } = req.params; 
    const sql = 'SELECT * FROM notificaciones WHERE usuario_id = ?';
    
    try {
        const result = await executeSql(sql, [usuarioId]); 
        res.json(result); 
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/api/notificaciones/', async (req, res) => {
    const { usuario_id, mensaje, tipo } = req.body;
    const sql = 'INSERT INTO notificaciones (usuario_id, mensaje, tipo) VALUES (?, ?, ?)';
    
    try {
        const result = await executeSql(sql, [usuario_id, mensaje, tipo]);
        res.status(201).json({ id: result.lastID }); 
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.put('/api/notificaciones/:id', async (req, res) => {
    const { id } = req.params;
    const sql = 'UPDATE notificaciones SET leido = ? WHERE id = ?';
    
    try {
        await executeSql(sql, [true, id]);
        res.status(200).send('Notificación actualizada');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
