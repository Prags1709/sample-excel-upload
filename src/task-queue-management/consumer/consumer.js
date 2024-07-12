const { Bullclient } = require('../client/client')
const {User} = require("../../sequelize/models");


class Consumer {

    static async listenConsumer() {
        try {
            const queue = await Bullclient.createClient('create-user-detail');
            queue.connection.process(async (job) => {
                const userJobData = job.data;
                //DB entry
                for(let {name, age, salary, phone_number} of userJobData){
                    const exists = await User.findUserData({name, age, salary, phone_number})
                    if(!exists){
                        await User.createUser({name, age, salary, phone_number});
                    }
                }
            })

            queue.connection.on('completed',async (job, result) => {
                console.log(`Job ${job.id} completed with result ${job.data}`);
            })

            queue.connection.on('failed', (job)=>{
                console.log(`Job ${job.id} failed`);
            })
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Consumer;