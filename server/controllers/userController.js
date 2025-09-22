const apiError = require('../error/apiErrors')
const bcrypt = require('bcrypt')
const {User, UserInfo} = require('../models')
const jwt = require('jsonwebtoken')
const path = require("path")
const uuid = require('uuid')
const fs = require("fs");

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'})
}

function hasExtension(fileName) {
    if (typeof fileName !== 'string' || !fileName.includes('.')) {
        throw new Error('Invalid file name');
    }
    return fileName.split('.')[1];
}

class UserController {
    async updateByUserId(req, res, next) {
        let { id, email, address, phone, userName, description } = req.body;
        const user = await User.findOne({
            where: { id },
            include: [{ model: UserInfo, as: 'userInfo' }]
        });

        if (!user) {
            return next(apiError.badRequest('No user found with this ID'));

        }
        // обновляем инфу
        await user.userInfo.update({ email, address, phone, name:userName, description });
        if (req.files) {
            const { avatar } = req.files;

            const filePath = path.resolve(__dirname, '..', 'static', avatar.name);
            await avatar.mv(filePath);
            await user.userInfo.update({ avatarFile: avatar.name });

        }
        res.status(200).json(user);
    }

    async getByUserId(req, res, next) {
        const id = req.params.id;
        try {
            const userInfo = await User.findOne({
                where: {id},
                include: [{model: UserInfo,as: 'userInfo'}]
            })
            if (!userInfo) {
                return next(apiError.badRequest('No user found with this ID'))
            }
            res.status(200).json(userInfo);
        } catch (error) {
            return next(apiError.badRequest('Error  user:', error))

        }
    }

    async deleteByUserId(req, res, next) {
        const userId = req.params.id;
        try {
            const result = await User.destroy({
                where: {
                    id: userId
                }
            });

            if (result === 0) {
                return res.status(401).json({message: 'No user found with this ID'})
            }
            return res.status(200).json({message: 'User is deleted'})
        } catch (error) {
            return next(apiError.badRequest('Error deleting user:', error))

        }
    }

    async resetPassword(req, res, next) {
        const {email, password} = req.body
        if (!email || !password) {
            return next(apiError.badRequest('No correct email or password'))
        }
        const user = await User.findOne({where: {email}})

        if (!user) {
            return next(apiError.badRequest('User with this email is not found'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        await user.update({password: hashPassword})

        const token = generateJwt(user.id, user.email, user.role)

        return res.json({token})
    }

    async registration(req, res, next) {
        const {email, password} = req.body
        if (!email || !password) {
            return next(apiError.badRequest('No correct email or password'))
        }
        const candidate = await UserInfo.findOne({where: {email}})
        if (candidate !== null) {
            return next(apiError.badRequest('User with this email is already exist'))
        }

        const countUser = await User.count()
        const hashPassword = await bcrypt.hash(password, 5)
        let user = await User.create({email, password: hashPassword})
        if (!countUser) {
            user = await user.update({email, password: hashPassword, role: 'SUPERADMIN'})

        }
        await UserInfo.create({userId: user.id, email});
        const token = generateJwt(user.id, user.email, user.role)

        return res.json({token})
    }


    async login(req, res, next) {
        const {email, password} = req.body
        console.log(req.body)
        const userInfo = await UserInfo.findOne({where: {email}})
        if (!userInfo) {
            return next(apiError.badRequest('No userInfo found'))
        }
        const user = await User.findOne({where: {id: userInfo.userId}})
        if (!user) {
            return next(apiError.badRequest('No user found'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)

        if (!comparePassword) {
            next(apiError.badRequest('No correct password'))
        }

        const token = generateJwt(user.id, userInfo.email, user.role)
        return res.status(200).json({token})
    }

    async checkPassword(req, res, next) {
        let {password, email} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(apiError.badRequest('No user found'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            next(apiError.badRequest('No correct password'))
        }
        const token = generateJwt(user.id, user.email, user.role)

        return res.status(200).json({token})
    }

    async auth(req, res, next) {
        let {token} = req.body
        const secret = process.env.SECRET_KEY;
        try {
            jwt.verify(token, secret)
            token = generateJwt(req.user.id, req.user.email, req.user.role)
            return res.status(200).json({token})
        } catch (err) {
            return next(apiError.badRequest('No valid token'))
        }

    }

    async getAllUsers(req, res, next) {
        let {page, limit} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        const users = await User.findAndCountAll({
            include: [{model: UserInfo}],
            limit,
            offset
        })
        return res.status(200).json(users)
    }

    async create(req, res, next) {
        let {email, role, password, description} = req.body

        if (!email || !password) {
            return next(apiError.badRequest('No correct email or password'))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(apiError.badRequest('User with this email is already exist'))
        }
        let fileName;
        if (req.files) {
            const {avatarFile} = req.files;
            const filePath = path.resolve(__dirname, '..', 'static', avatarFile.name);
            if (fs.existsSync(filePath)) {
                await avatarFile.mv(filePath);
            }
            fileName = avatarFile.name
        }

        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, password: hashPassword, role})
        await UserInfo.create({userId: user.id, description, avatarFile: fileName});


        res.status(200).json(user);
    }
}

module.exports = new UserController()