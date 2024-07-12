const fastify = require('fastify')({logger: true});
const cors = require('@fastify/cors');
const DefaultS3Client = require('./lib/defaultS3client')
const Consumer = require('./task-queue-management/consumer/consumer')
const multipart = require('fastify-multipart');
const {sequelize} = require('./config/db');

fastify.register(multipart);
fastify.register(cors);

DefaultS3Client.init ({
    region: 'ap-south-1',
    profile: 'default'
})

fastify.register(require('./routes/excelRoute'), {prefix: '/api'});

fastify.get("/",async (req, res)=>{
    res.send("Welcome")
})

fastify.listen({ port: 4500 },async () => {
    try {
        await sequelize.authenticate()
        Consumer.listenConsumer()
        console.log("Connection successfull");
    } catch (error) {
        fastify.log.error(error)
    }
    console.log("port running at 3000");
})
