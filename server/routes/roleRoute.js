const express = require('express');
const Role = require('../models/roleModel');

const router = express.Router()

router.get('/', async (req ,res) => {
    try {
        const roles = await Role.find();
        res.status(201).json(roles)
    } catch (error) {
        res.status(500).json({message: 'Error Getting roles', error})
    }
})

router.post('/create-role', async (req, res) => {
    try {
        const {rolename, permissionId} = req.body;

        const role = new Role({rolename, permissionId})
        console.log('create role', role);
        await role.save();
        res.status(201).json({message: 'Role has added'})
    } catch (error) {
        res.status(500).json({message: 'Error adding role', error})
    }
})

router.patch('/update-role/:id', async (req, res) => {
    try {
        const role = await Role.findByIdAndUpdate(req.params.id,{...req?.body});
        if(!role){
            return res.status(404).json({message: 'Role not found'})
        }
        console.log('error in patch request');
        return res.status(201).json({messgae: 'Role has been updated', role})
    } catch (error) {
        res.status(500).json({messgae: 'error in updating role', error})
    }
})

router.delete('/delete-role/:id', async (req, res) => {
    try {
        const role = await Role.findByIdAndDelete(req.params.id);
        if(!role){
            return res.status(404).json({messgae: 'Role not found'})
        }
        res.json(role)
    } catch (error) {
        res.status(500).json({messgae: error.message})
    }
})

router.put('/put-role/:id', async (req, res) => {
    try {
        const role = await Role.findByIdAndUpdate(req.params.id,{...req?.body});
        if(!role){
            return res.status(404).json({message: 'Role not found'})
        }
        res.json(role)
    } catch (error) {
        res.status(500).json({messgae: 'Error in out request', error})
    }
})



module.exports = router