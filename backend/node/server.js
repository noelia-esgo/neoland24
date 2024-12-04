const http = require('http')
const server = http.createServer((req, res)=>{
    console.log(req)
    res.statusCode= 200
    res.setHeader('Content-type', 'Aplication-json')
    res.end('HOLI ESTE ES MI PRIMER SERVER CON NODE')
})
const PORT = 3000
server.listen(PORT, ()=>{
    console.log('Este servidor funciona correctamente')
})