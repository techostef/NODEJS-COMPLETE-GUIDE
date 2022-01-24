interface IConfig {
  port: number,
  database: {
    host: string,
    port: number, 
    user: string, 
    password: string, 
    database: string
  }
}

const config: IConfig = {
  port: 3000,
  database: {
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "postgres",
    database: "node-complete"
  }
}

export default config;