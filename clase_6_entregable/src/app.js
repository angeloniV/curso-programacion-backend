const express = require('express')
const fs = require('fs')
const fileName = "../product_manager.json"
const products = fs.readFileSync(fileName, "utf-8")
const parsedProducts = JSON.parse(products)

const app = express()

app.get('/products', (req, res) => {
    const limit = req.query.limit

    if (limit) {
        res.send(parsedProducts.slice(0, limit))
    } else {
        res.send(parsedProducts)
    }
})
app.get('/products/:pid', (req, res) => {
    const productID = req.params.pid

    const product = parsedProducts.find(product => product.id == productID)

    if (!product) res.send(`No se han encontrado productos`)
    else res.send(product)
})

app.listen(8080, () => console.log('Server is running ...'))
