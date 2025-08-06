import {
  IComponent,
  IMessage,
  ISimulationEngineAPI,
  NodeId,
  PortId,
} from "./interfaces";

export class SimulationEngine implements ISimulationEngineAPI {
  private nodes = new Map<NodeId, IComponent>();
  private connections = new Map<PortId, PortId>();
  private messageQueue: { msg: IMessage; target: PortId }[] = [];
  private time = 0;
  private timer: NodeJS.Timeout | null = null;
  private listeners: (() => void)[] = [];

  addNode(node: IComponent) {
    this.nodes.set(node.id, node);
    this.emit()
  }

  removeNode(nodeId: NodeId) {
    const node = this.nodes.get(nodeId);
    this.nodes.delete(nodeId);

    // Clean up connections
    for (const [source, target] of this.connections) {
      if (source === nodeId || target === nodeId)
        this.connections.delete(source);
    }

    this.emit()
    return node;
  }

  connect(source: PortId, target: PortId) {
    // SimulationEngine does not care about connection policies,
    // that's a responsibility of each node
    this.connections.set(source, target);
    this.connections.set(target, source);

    this.emit()
  }

  disconnect(a: PortId, b: PortId) {
    this.connections.delete(a);
    this.connections.delete(b);

    this.emit()
  }

  sendMessage(from: PortId, msg: IMessage) {
    const target = this.connections.get(from);

    if (target) this.messageQueue.push({ msg, target });
  }

  tick() {
    this.time++;
    const queue = [...this.messageQueue];
    this.messageQueue = [];

    for (const { msg, target } of queue) {
      const [nodeId, portName] = target.split(":");
      const node = this.nodes.get(nodeId);
      if (node) node.handleMessage(msg, portName);
    }

    for (const node of this.nodes.values()) node.tick();

    this.emit()
  }

  start(intervalMs = 500) {
    if (this.timer) return;
    this.timer = setInterval(() => this.tick(), intervalMs);
  }

  pause() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  step() {
    this.tick();
  }

  onTick(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private emit() {
    for (const l of this.listeners) l();
  }

  getState() {
    return {
      time: this.time,
      nodes: Array.from(this.nodes.values()).map((n) => ({
        id: n.id,
        type: n.type,
        metrics: n.getMetrics(),
        internal: n.getInternalState(),
      })),
      connections: Array.from(this.connections.entries()),
    };
  }

  getNode(id: NodeId) {
    return this.nodes.get(id);
  }
}
