import express from 'express'
import categoryController from 'libs/controllers/category.controller'


const router = express.Router()

router.get('/',categoryController.getCategory)
router.post('/',categoryController.addCategory)

export default router