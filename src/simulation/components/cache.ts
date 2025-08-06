import { SimulationEngine } from "../engine";
import { IComponent, IMemory, IMessage, PortId } from "../interfaces";

export class Cache implements IComponent, IMemory {
  id: string;
  ports = ["left", "right"];
  type = "CACHE";
  private engine: SimulationEngine;
  private storage = new Map<number, number>();
  private metrics = { hits: 0, misses: 0, memAccess: 0 };
  private latency: number;
  private pending: { msg: IMessage; port: string; remaining: number }[] = [];

  constructor(id: string, engine: SimulationEngine, latency = 1) {
    this.id = id;
    this.engine = engine;
    this.latency = latency;
  }

  tick() {
    for (const p of this.pending) {
      p.remaining--;
    }

    const ready = this.pending.filter((p) => p.remaining <= 0);
    this.pending = this.pending.filter((p) => p.remaining > 0);

    for (const { msg, port } of ready) {
      this.process(msg, port);
    }
  }

  handleMessage(msg: IMessage, port: PortId): void {
    this.pending.push({ msg, port, remaining: this.latency });
  }

  private process(msg: IMessage, port: PortId) {
    switch (msg.type) {
      case "READ":
        const data = this.read(msg.payload.address);

        if (!data) {
          this.engine.sendMessage(`${this.id}:right`, msg);
        } else {
          this.engine.sendMessage(`${this.id}:${port}`, {
            type: "RESPONSE",
            payload: { address: msg.payload.address, value: data },
            source: msg.source,
          });
        }
        return;
      case "WRITE":
        const oldValue = this.write(msg.payload.address, msg.payload.value);

        if (!oldValue) {
          this.engine.sendMessage(`${this.id}:right`, msg);
        } else {
          this.engine.sendMessage(`${this.id}:${port}`, {
            type: "RESPONSE",
            payload: { address: msg.payload.address, value: data },
            source: msg.source,
          });
        }
        return;
      case "RESPONSE":
        this.storage.set(msg.payload.address, msg.payload.value);
        this.engine.sendMessage(`${this.id}:left`, msg);
      default:
        return;
    }
  }

  read(address: number): number | undefined {
    if (this.storage.has(address)) {
      this.metrics.hits++;
    } else {
      this.metrics.misses++;
    }

    return this.storage.get(address);
  }

  write(address: number, value: number): number | undefined {
    const oldValue = this.storage.get(address); // If not present, oldValue = undefined

    if (this.storage.has(address)) {
      this.metrics.hits++;
      this.storage.set(address, value);
    } else {
      this.metrics.misses++;
    }

    return oldValue;
  }

  getMetrics(): Record<string, number> {
    return this.metrics;
  }

  getInternalState(): unknown {
    return {
      totalSize: this.storage.size,
      pending: this.pending.length,
    };
  }
}
