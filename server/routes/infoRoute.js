const express = require('express');
const Info = require('../models/infoModel');

const router = express.Router();

router.get('/', async(req, res) => {
    try {
        const info = await Info.find();
        res.status(200).json(info)
    } catch (error) {
        res.status(500).json({message: 'Error in getting infos', error})
    }
})

router.post('/add-info', async (req, res) => {
    try {
        const {userId, roleId} = req.body;
        const info = new Info({userId, roleId});
        // console.log('info has been created', info);
        await info.save()
        res.status(201).json({message: 'Info has been added'})
    } catch (error) {
        res.status(500).json({message: 'Error in creating info', error})        
    }
})

router.patch('/update-info/:id', async (req, res) => {
    try {
        const info = await Info.findByIdAndUpdate(req.params.id,{...req?.body});
        return res.status(201).json({message: 'Updating info', info})
    } catch (error) {
        res.status(500).json({message: 'Error in updating info', error})
    }
})

router.delete('/delete-info/:id', async (req, res) => {
    try {
        const info = await Info.findByIdAndDelete(req.params.id);
        if(!info){
            return res.status(404).json({message: 'Deleting info', info})
        }
        res.json(info)
    } catch (error) {
        res.status(500).json({message: 'Error in deleting info', error})
    }
})

router.put('/put-info/:id', async (req, res) => {
    try {
        const info = await Info.findByIdAndUpdate(req.params.id,{...req?.body});
        if(!info){
            return res.status(404).json({message: 'Info not found'})
        }
        res.json(info)
    } catch (error) {
        res.status(500).json({message: 'Error in put request of info', error})
    }
})

module.exports = router;