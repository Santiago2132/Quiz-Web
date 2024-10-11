import Products from "./Products/Products"
import Server from "./express/Server"

const Productos= Products.createView()


const server = new Server(Productos)
server.start()