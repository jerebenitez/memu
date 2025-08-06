export type NodeId = string
// Port format:
// "nodeId:portName"
// e.g. -> "CPU1:right"
export type PortId = string

export interface IMessage {
    type: string
    payload: unknown
    source: NodeId
}

export interface IComponent {
    id: NodeId
    ports: PortId[]
    type: string
    tick(): void
    handleMessage(msg: IMessage, port: PortId): void
    getMetrics(): Record<string, number>
    getInternalState(): unknown
}

export interface IMemory {
    read(arg0: number): number | undefined
    write(arg0: number, arg1: number): number | undefined
}

type Node = {
    id: string,
    type: string,
    metrics: Record<string, number>
    internal: unknown
}

export interface IEngineState {
    time: number
    nodes: Node[]
    connections: [string, string][]
}

export interface ISimulationEngineAPI {
    addNode(node: IComponent): void
    removeNode(id: string): IComponent | undefined
    connect(sourcePort: string, targetPort: string): void
    disconnect(portA: string, portB: string): void
    tick(): void
    start(intervalMs: number): void
    pause(): void
    step(): void
    getState(): IEngineState
}
