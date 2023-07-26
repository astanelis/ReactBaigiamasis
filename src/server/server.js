const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

// Prisjungimas prie MongoDB bazes
mongoose
  .connect('mongodb://127.0.0.1:27017/my-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((err) => {
    console.log('Failed to connect to MongoDB', err)
  })

// Prisijungimo schema MongoDb bazei
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
})

//Admino modulis
const User = mongoose.model('User', userSchema)

// Prisijungimas asmens
app.post('/api/login', async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    })
    if (user) {
      res.json({ success: true })
    } else {
      res.json({ success: false })
    }
  } catch (err) {
    console.log('MongoDB retrieval error:', err)
    res.status(500).send('Error in logging in user')
  }
})

// Registracija asmens
app.post('/api/register', async (req, res) => {
  const user = new User({ email: req.body.email, password: req.body.password })
  try {
    const savedUser = await user.save()
    console.log('User registered successfully:', savedUser)
    res.json({ success: true })
  } catch (err) {
    console.log('MongoDB insertion error:', err)
    res.status(500).send('Error in registering user')
  }
})

// Asmens schema MongoDB bazei
const participantSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
})

// Asmens modulis
const Participant = mongoose.model('Participant', participantSchema)

// Asmenis API
app.get('/api/participants', async (req, res) => {
  try {
    const participants = await Participant.find()
    res.json(participants)
  } catch (err) {
    console.log('Error getting participants:', err)
    res.status(500).send('Error getting participants')
  }
})

// Pridejimas asmens
app.post('/api/participants', async (req, res) => {
  const participant = new Participant({
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
  })
  try {
    const savedParticipant = await participant.save()
    console.log('Participant registered successfully:', savedParticipant)
    res.json(savedParticipant)
  } catch (err) {
    console.log('Error creating participant:', err)
    res.status(500).send('Error creating participant')
  }
})

// Istrinimas asmens
app.delete('/api/participants/:id', async (req, res) => {
  try {
    await Participant.findByIdAndRemove(req.params.id)
    res.json({ success: true })
  } catch (err) {
    console.log('Error deleting participant:', err)
    res.status(500).send('Error deleting participant')
  }
})

// Atnaujinimas asmens
app.put('/api/participants/:id', async (req, res) => {
  try {
    const updatedParticipant = await Participant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    res.json(updatedParticipant)
  } catch (err) {
    console.log('Error updating participant:', err)
    res.status(500).send('Error updating participant')
  }
})

app.listen(3001, () => {
  console.log('Server is running on port 3001')
})
