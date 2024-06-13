// 连接websocket
const webSocket1 = new WebSocket('ws://localhost:8082/webSocket/task')
const webSocket2 = new WebSocket('ws://localhost:8082/webSocket/map')

export { webSocket1, webSocket2 } 