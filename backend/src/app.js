const express = require('express');

const app = express()

app.use(express.json())


const notes = []

app.post("/notes",(req, res) => {
    notes.push(req.body)

    res.status(201).json({
        message: "note created successfully"
    })

})


app.get("/notes",(req, res) => {
    res.status(200).json({
        message:"notes fetched successfully",
        notes: notes
    })
})

app.delete("/notes/:index",(req, res) => {
    const index = parseInt(req.params.index, 10)

    if (Number.isNaN(index) || index < 0 || index >= notes.length) {
        return res.status(404).json({
            message: "note not found"
        })
    }

    notes.splice(index, 1)

    res.status(200).json({
        message: "note deleted successfully"
    })

})

app.patch("/notes/:index",(req, res) => {
    const index = parseInt(req.params.index, 10)
    const descrition = req.body.descrition

    if (Number.isNaN(index) || index < 0 || index >= notes.length) {
        return res.status(404).json({
            message: "note not found"
        })
    }

    notes[index].descrition = descrition

    res.status(200).json({
        message:"note updated successfully"
    })

})

module.exports = app