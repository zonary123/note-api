const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
const path = require('path')

app.use(cors())
app.use(express.json())

let notes = [
  {
    id: 1,
    note: 'One note'
  },
  {
    id: 2,
    note: 'Second note'
  },
  {
    id: 3,
    note: 'Third note'
  },
  {
    id: 4,
    note: 'Fourth note'
  }
]

console.log(path.join(__dirname, 'public'))

// * SEND HELLO WORLD

app.get('/', (req, res) =>
  res.send('Hello World!')
// res.sendFile(path.join(__dirname, 'index.html'))
)

// * API notes

app.get('/api/notes', (req, res) =>
  res.send(notes)
)

// ! GET NOTE BY ID

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  const note = notes.find(note => note.id === id)
  console.log({ note })
  !note ? res.status(404).send(`Not find note with ID: ${id}`) : res.send(note)
})

// ! DELETE NOTE BY ID

app.delete('/api/notes/:id', (req, res) => {
  const id = req.params.id
  notes = notes.filter(note => note.id === id)
  res.status(204).end()
})

// ! CREATE NOTE BY ID

app.post('/api/notes', (req, res) => {
  const note = req.body

  if (!note.note) {
    res.status(400).json({ error: 'Faltan parametros' })
  }

  const ids = notes.map(note => note.id)
  const id = Math.max(...ids)

  const newNote = {
    id: id + 1,
    note: note.note
  }

  notes = notes.concat(newNote)

  res.json(newNote)
})

// * ERROR 404

app.use((req, res) => {
  res.sendStatus(404).json({ error: 'Not found' })
})

// * SERVER LISTEN

app.listen(port, () => {
  console.log(`\nEl servidor esta corriendo en el puerto: ${port}`)
})
