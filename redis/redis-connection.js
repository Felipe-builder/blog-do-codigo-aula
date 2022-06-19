const redis = require('redis')

class RedisClient {
    constructor() {
      this.Client = null;
    }
  
    async create(host, port, prefix) {
        this.Client = redis.createClient({
            host: host,
            port: port,
            prefix: prefix
        });
        return this.Client;
    }
    
    async connect() {
    this.Client.on("error", (error) => {
        console.log(error);
    });
      await this.Client.connect();
    }
  }
  
module.exports = RedisClient;