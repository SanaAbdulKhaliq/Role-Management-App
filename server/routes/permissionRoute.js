const express = require('express');
const User = require('../models/userModel');
const Permission = require('../models/permissionModel');

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const permission = await Permission.find();
        res.status(201).json(permission);
    } catch (error) {
        res.status(500).json({message: 'Error getting permission', error})
    }
})

router.post('/add-permission', async (req, res) => {
    try {
        const {permissionstatus} = req.body;
        const permission = new Permission({permissionstatus})
        await permission.save();
        res.status(201).json({message: 'permission has added'})
    } catch (error) {
        res.status(500).json({message: 'Error adding permission', error})
    }
})

router.patch('/update-permission/:id', async (req, res) => {
    try {
        const permission = await Permission.findByIdAndUpdate(req.params.id,{...req?.body});
        return res.status(201).json({message: 'Permission update', permission}) 
    } catch (error) {
        res.status(500).json({message: 'Error in updating permission', error})
    }
})

router.delete('/delete-permission/:id', async (req, res) => {
    try {
        const permission = await Permission.findByIdAndDelete(req.params.id);
        if(!permission){
            return res.status(404).json({message: 'Permission not found'})
        }
        res.json(permission)
    } catch (error) {
        res.status(500).json({message: 'Error in deleting permission', error})
    }
})

router.put('/put-permission', async (req, res) => {
    try {
        const permission = await Permission.findByIdAndUpdate(req.params.id,{...req?.body});
        if(!permission){
            return res.status(404).json({message: 'Permission not found'})
        }
        res.json(permission)
    } catch (error) {
        res.status(500).json({messgae: 'Error in putting request of permssion', error})   
    }
})

module.exports = router