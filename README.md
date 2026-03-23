# Lista de Tarefas API

API simples feita com **Node.js** e **Express** para gerenciar uma **lista de tarefas**

## Objetivo

Desenvolver uma API REST para gerenciamento de tarefas, aplicando conceitos de CRUD, validações e boas práticas de back-end.

## Tecnologias

* Node.js
* Express
* JavaScript

## Dependências

```bash
npm init -y
npm i express
```

Execução do servidor:

```bash
node index.js
```

Servidor em:

```
http://localhost:3000
```

---

# Rotas da API

## Tarefas

| Método | Rota               | Descrição                  |
| ------ | ------------------ | ---------------------------|
| GET    | /tasks             | Lista todas as tarefas     |
| GET    | /tasks/:id         | Retorna uma tarefa pelo ID |
| POST   | /tasks             | Cria uma nova tarefa       |
| PUT    | /tasks/:id         | Atualiza uma tarefa pelo ID|
| DELETE |/tasks/:id          | Remove uma tarefa pelo ID  |

Exemplo de body da tarefa:

```json
 {
    "id": 1,
    "titulo": "Arrumar escritório da empresa",
    "descricao": "Necessário organizar os papéis do escritório da empresa, separando em ordem alfabética de A a Z e por lista de prioridades.",
    "status": "EM_ANDAMENTO"
    }
```

---

**Validações:**
- Os campos **titulo, descricao e status** são obrigatórios
- O status deve ser: PENDENTE, EM_ANDAMENTO ou CONCLUIDO
- Tarefas com status **CONCLUIDO** não podem ser alteradas
---

Projeto desenvolvido para estudos no **SENAI**.
