import Products from "./Products/Products"
import Client from "./client/Client"
import Server from "./express/Server"

const Productos= Products.createView()

const clientView = Client.createView()

const server = new Server(Productos, clientView)
server.start()