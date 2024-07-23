const express = require('express');
const jwt = require('jsonwebtoken');
const {hashPassword, comparePassword} = require('../middleware/password');
const User = require('../models/userModel');
const Role = require('../models/roleModel');
const Permission = require('../models/permissionModel');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const user = await User.find();
        res.json(user)
    } catch (error) {
        res.status(500).json({message: err.message})
    }
})

router.post('/register', async (req, res) => {
    try {
        const {username, email, password} = req.body;

        //Check if name is entered
        if(!username){
            return res.json({error: 'Username is required'})
        }

        //Check if passowrd is entered
        if(!password){
            return res.json({error: 'Password is required'})
        }

        //Check if email already exists
        const exists = await User.findOne({email});
        if(exists){
            return res.json({
                error: 'Email is required'
            })
        }

        const hashedPassword = await hashPassword(password);

        //Creating the user
        const user = await User.create({username, email, password: hashedPassword});
        return res.json(user)
    } catch (error) {
        console.log(error);
    }
})

router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;

        //Check if the user exists
        const user = await User.findOne({email})
        if(!user){
            return res.json({error: 'No user found'})
        }

        //Check if password matches
        const match = await comparePassword(password, user.password)
        if(match){
            const permissionPromises = user.permissionId.map(async id => { 
                const permission = await Permission.findById(id); 
                return permission; }); 
                let permissions = await Promise.all(permissionPromises);
                // permissions = permissions.map(p=>p?.permissionstatus)
                const defaultRoute = permissions[0]?.defaultRoute
                permissions=permissions[0]?.permissionstatus.split(',')
                permissions=permissions.map(p=>p?.trim())
                console.log(permissions);

            jwt.sign({email: user.email, id: user._id, username: user.username, permissions: permissions, defaultRoute: defaultRoute}, process.env.JWT_SECRET, {}, (err, token) => {
                if (err) throw err;

                //console.log('token',token);
                 res.cookie('token', token).json({user: user, token: token})
            })
        }

        if(!match){
            res.json({error: 'Password fo not match'})
        }
    } catch (error) {
        res.json({error: 'Something went wrong'})
    }
})

router.post('/logout', (req, res) => {
    res.clearCookie('token', {path: '/logout'});
    res.status(200).json({message: 'Logged Out successfullt'})
})

router.post('/add-role', async (req, res) => {
    const { userId, roleId } = req.body;
  
    try {
      // Find the user by ID and add the new role ID to the roleId array
      await User.findByIdAndUpdate(
        userId,
        { $push: { roleId: roleId } },
        { new: true }
      );
  
      res.status(200).send({ message: 'Role added to user successfully' });
    } catch (error) {
      console.error('Error adding role to user:', error);
      res.status(500).send({ message: 'Failed to add role to user' });
    }
  });

  router.post('/add-permission', async (req, res) => {
    const { userId, permissionId } = req.body;
  
    try {
      // Find the user by ID and add the new role ID to the roleId array
      await User.findByIdAndUpdate(
        userId,
        { $push: { permissionId: permissionId } },
        { new: true }
      );
  console.log('===', userId, permissionId);
      res.status(200).send({ message: 'permission added to user successfully' });
    } catch (error) {
      console.error('Error adding permission to user:', error);
      res.status(500).send({ message: 'Failed to add permission to user' });
    }
  });

module.exports = router