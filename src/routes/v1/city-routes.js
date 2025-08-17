const express=require('express');

const {CityController}=require('../../controllers')



const router=express.Router()
// /api/v1/cities

router.post('/',CityController.createCity)
router.get('/',CityController.getCities)
router.get('/:id',CityController.getCity)
router.delete('/:id',CityController.deleteCity)
router.patch('/',CityController.updateCity)
module.exports=router