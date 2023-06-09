require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json())
const finalcostMath = require('./finalcostMath')
const data = require('./data')

app.get("/hello", (req, res) => {
  res.status(200).json({msg: "hello world"})
})

app.get('/status', (req, res) => {
  res.status(200).json({ port: process.env.PORT, env:process.env.DEV_ENV})
})

app.get('/error', (req, res) => {
  res.status(400).json({ msg: "error 404" , msg2:"there a error in the application" })
})

app.get('/email-list', (req, res) => {
  const agents = data.agents;
  const email = agents.map(a => a.email)
  res.send(email)
})




app.get('/region-avg', (req, res) =>{
  // agents is all agents
  const agents = data.agents;
  //regionSelected is our query paramter for region
  const regionSelected = req.query.region;
  //agentsByRegion is the agents whose region matches our query parameter
  const agentsByRegion = agents.filter(a => a.region == regionSelected)

  // if no agents found in region we send back message
  if (agentsByRegion.length == 0){
    return res.status(400).send('No agents found in this region')
  }

  // find avg rating
  //using a for each loop to get sum of selected region ratings

  let ratingSum = 0

  agentsByRegion.forEach(a => {

    ratingSum = ratingSum + Number(a.rating)
  })

  const ratingAvg = (ratingSum / agentsByRegion.length).toFixed(2)
  

  //find average fees
  let feesSum = 0

  agentsByRegion.forEach(a => {

    feesSum = feesSum + Number(a.fee)
  })

  const feesAvg = feesSum / agentsByRegion.length

  res.json({ratingAvg, feesAvg})
})
app.get('/calc-residential', finalcostMath.resfinalcost)

// app.get('/calc-residential', (req, res) =>{
//   const numAptsSelected = req.query.numApts
//   let numFloorsSelected = req.query.numFloors
//   const tierSelected = req.query.tier
  
//   // do all the checks before any calculations
//   if (! ['standard', 'premium', 'excelium'].includes(tierSelected)){
//     return res.status(400).send('please select valid tier standard premium or excelium')
//   }
  
//   if (numAptsSelected == 0){
//     return res.status(400).send('Apartment Number most be greater than 0')
//   }

//   if (numFloorsSelected == 0){
//     return res.status(400).send('Floor Number most be greater than 0')
//   }

//   if (isNaN(numFloorsSelected)){
//     return res.status(400).send('Must be a Number')
//   } 
  
//   if (isNaN(numAptsSelected)){
//     return res.status(400).send('Must be a Number')
//   } 
  
  
  
//   // price selection
//   if (tierSelected === 'standard') {
//     unitPrice = 8000
//     installationFees = 0.1
//   }
//   else if (tierSelected === 'premium') {
//     unitPrice = 12000
//     installationFees= 0.15
//   }
//   else if (tierSelected === 'excelium') {
//     unitPrice = 15000
//     installationFees = 0.2
//   }
//   // final cost
  
//   // const elevatorsRequired = Math.ceil(numAptsSelected / numFloorsSelected / 6)*Math.ceil(numFloorsSelected / 20)
  
//   // let totalElevatorPrice = (elevatorsRequired * unitPrice)
//   // let installationCost = (totalElevatorPrice * installationFees)
//   // finalCostEstimate = totalElevatorPrice + installationCost
 


  



//   res.json({elevatorsRequired ,unitPrice, numAptsSelected,tierSelected})
// })





const port = process.env.PORT
app.listen(port, () => {
  console.log(` server listening on port ${port} `)
})