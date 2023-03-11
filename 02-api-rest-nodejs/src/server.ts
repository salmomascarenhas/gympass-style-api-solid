import fastify from 'fastify'

const app = fastify()

app.get('/', () => {
    console.log('Hello World!')
})

app.listen({
    port: 3333,

}).then(() => {
    console.log('HTTP Server Running!')
})