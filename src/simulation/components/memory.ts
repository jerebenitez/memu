import { SimulationEngine } from "../engine";
import { IComponent, IMemory, IMessage, PortId } from "../interfaces";

export class Memory implements IComponent, IMemory {
    id: string
    ports = ["in", "out"]
    private engine: SimulationEngine
    private storage = new Map<number, number>()
    
    constructor(id: string, engine: SimulationEngine) {
        this.id = id
        this.engine = engine
    }

    tick() {}

    handleMessage(msg: IMessage, port: PortId): void {}

    read(address: number): number {
        return 0
    }

    write(address: number, value: number): number {
        return 0
    }
}
