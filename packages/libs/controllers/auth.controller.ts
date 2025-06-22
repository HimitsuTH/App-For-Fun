import { NextFunction, Request, Response } from 'express'

const localRegister = async (req: Request, res: Response, next:NextFunction) => {
    console.log('test---->')
    res.send('This is the bullshit')
}

export default {
    localRegister,
}