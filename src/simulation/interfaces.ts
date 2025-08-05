export type NodeId = string
// Port format:
// "nodeId:portName"
// e.g. -> "CPU1:right"
export type PortId = string

export interface IMessage {
    type: string
    payload: { address: number, value?: number }
    source: NodeId
}

export interface IComponent {
    id: NodeId
    ports: PortId[]
    tick(): void
    handleMessage(msg: IMessage, port: PortId): void
}

export interface IMemory {
    read(arg0: number): number
    write(arg0: number, arg1: number): number
}
