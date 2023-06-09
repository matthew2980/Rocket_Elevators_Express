require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json())

 const resfinalcost = (req, res) =>{
    const numAptsSelected = req.query.numApts
    let numFloorsSelected = req.query.numFloors
    const tierSelected = req.query.tier
    
    // do all the checks before any calculations
    if (! ['standard', 'premium', 'excelium'].includes(tierSelected)){
      return res.status(400).send('please select valid tier standard premium or excelium')
    }
    
    if (numAptsSelected == 0){
      return res.status(400).send('Apartment Number most be greater than 0')
    }
  
    if (numFloorsSelected == 0){
      return res.status(400).send('Floor Number most be greater than 0')
    }
  
    if (isNaN(numFloorsSelected)){
      return res.status(400).send('Must be a Number')
    } 
    
    if (isNaN(numAptsSelected)){
      return res.status(400).send('Must be a Number')
    } 
    
    
    
    // price selection
    if (tierSelected === 'standard') {
      unitPrice = 8000
      installationFees = 0.1
    }
    else if (tierSelected === 'premium') {
      unitPrice = 12000
      installationFees= 0.15
    }
    else if (tierSelected === 'excelium') {
      unitPrice = 15000
      installationFees = 0.2
    }
    // final cost
    
    const elevatorsRequired = Math.ceil(numAptsSelected / numFloorsSelected / 6)*Math.ceil(numFloorsSelected / 20)
    
    let totalElevatorPrice = (elevatorsRequired * unitPrice)
    let installationCost = (totalElevatorPrice * installationFees)
    finalCostEstimate = totalElevatorPrice + installationCost
   
  
  
    
  
  
  
    res.json({elevatorsRequired ,unitPrice, numAptsSelected,tierSelected})
  }
  module.exports = {
    resfinalcost
  }