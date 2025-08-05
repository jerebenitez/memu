import { IComponent, IMessage, NodeId, PortId } from "./interfaces";

export class SimulationEngine {
    private nodes = new Map<NodeId, IComponent>()
    private connections = new Map<PortId, PortId>()
    private messageQueue: { msg: IMessage, target: PortId }[] = []
    private time = 0

    addNode(node: IComponent) {
        this.nodes.set(node.id, node)
    }

    removeNode(nodeId: NodeId) {
        this.nodes.delete(nodeId)

        // Clean up connections
        for (const [source, target] of this.connections) {
            if (source === nodeId || target === nodeId)
                this.connections.delete(source)
        }
    }

    connect(source: PortId, target: PortId) {
        this.connections.set(source, target)
        this.connections.set(target, source)
    }

    disconnect(a: PortId, b: PortId) {
        this.connections.delete(a)
        this.connections.delete(b)
    }

    sendMessage(from: PortId, msg: IMessage) {
        const target = this.connections.get(from)

        if (target)
            this.messageQueue.push({ msg, target })
    }

    tick() {
        this.time++
        const queue = [...this.messageQueue]
        this.messageQueue = []

        for (const { msg, target } of queue) {
            const [nodeId, portName] = target.split(":")
            const node = this.nodes.get(nodeId)
            if (node) node.handleMessage(msg, portName)
        }

        for (const node of this.nodes.values())
            node.tick()
    }

    getState() {
        return {
            time: this.time,
            nodes: Array.from(this.nodes.values()).map(n => n.id),
            connections: Array.from(this.connections.entries())
        }
    }
}
