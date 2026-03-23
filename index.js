const express = require("express")
const app = express()

app.use(express.json())


const tasks = []



// ----- GET ----- //
app.get("/tasks", (req, res) => {

    if (tasks.length === 0) { // Caso a lista esteja vazia
        return res.status(200).json("A lista de tarefas está vazia. Crie alguma tarefa, os requisitos são: título, descrição e status.")
    }

    return res.json(tasks)

})

// Id //
app.get("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id)

    const task = tasks.find(a => a.id == id)

    if (task) {
        return res.json(task)
    } else {
        res.status(404).json("Tarefa não encontrada")
    }
})



// ----- POST ----- //
app.post("/tasks", (req, res) => {
    const tituloCliente = req.body.titulo
    const descCliente = req.body.descricao
    const statusCliente = req.body.status

    // Validação Geral
    if (!tituloCliente || !descCliente || !statusCliente) {
        return res.status(400).json({ erro: "Título, descrição e status (PENDENTE, EM_ANDAMENTO, CONCLUIDO) são obrigatórios." })
    }

    // Validação título
    if (tituloCliente.length <= 1) {
        return res.status(400).json({ erro: "É necessário que o título seja maior que 1 caractere"})
    }
    
    // Validação dos status
    const statusValidos = ["PENDENTE", "EM_ANDAMENTO", "CONCLUIDO"]

    if (!statusValidos.includes(statusCliente)) {
        return res.status(400).json({ erro: "Status inválido"})
    }

    const novaTask = {
        id: tasks.length + 1,
        titulo: tituloCliente,
        descricao: descCliente,
        status: statusCliente
    }

    tasks.push(novaTask)
    res.status(201).send()
})




// ----- PUT ----- //
app.put("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const {titulo, descricao, status} = req.body

    // Validação geral
    if (!titulo || !descricao || !status) {
        return res.status(400).json("Título, descrição e status (PENDENTE, EM_ANDAMENTO, CONCLUIDO) são obrigatórios.")
    }

    // Validação título
    if (titulo.length <= 1) {
        return res.status(400).json({ erro: "É necessário que o título seja maior que 1 caractere"})
    }

    // Validação dos status
    const statusValidos = ["PENDENTE", "EM_ANDAMENTO", "CONCLUIDO"]

    if (!statusValidos.includes(status)) {
        return res.status(400).json({ erro: "Status inválido"})
    }

    // Validação id
    const idTask = tasks.findIndex( a => a.id == id)

    if(idTask === -1) {
        return res.status(404).json("Tarefa não encontrada")
    }

    // Validação de conclusão
    if(tasks[idTask].status === "CONCLUIDO") {
        return res.status(400).json({erro: "Tarefas concluídas não podem ser alteradas"})
    }

    tasks[idTask].titulo = titulo
    tasks[idTask].descricao = descricao
    tasks[idTask].status = status

    return res.json(tasks[idTask])
})



// ----- DELETE ----- //
app.delete("/tasks/:id", (req,res) => {
    const id = parseInt(req.params.id)
    const index = tasks.findIndex(a => a.id === id)

    if(index == -1){
        return res.status(404).json("Tarefa não encontrada")
    }

    const taskRemovida = tasks.splice(index, 1)
    return res.status(200).json("Tarefa removida")
})



app.listen(3000, () => {
    console.log("Servidor rodando em https://localhost:3000")
})