import { humanFileSize } from "@/lib/utils";
import { SimulationEngine } from "../engine";
import { IComponent, IMessage, PortId } from "../interfaces";
import { randomInt } from "mathjs";

export class Memory implements IComponent {
  id: string;
  ports = ["left"];
  type = "MEMORY";
  private engine: SimulationEngine;
  private storage = new Map<number, number>();
  private size: number;
  private latency: number;
  private metrics = { hits: 0 };
  private pending: { msg: IMessage; port: string; remaining: number }[] = [];

  constructor(
    id: string,
    engine: SimulationEngine,
    latency = 1,
    size = 4294967296,
  ) {
    this.id = id;
    this.engine = engine;
    this.size = size;
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

  private process(msg: IMessage, port: string) {
    if (msg.type === "READ") {
      const addr = msg.payload.address;

      if (addr < this.size) {
        if (!this.storage.get(addr)) this.storage.set(addr, randomInt(256));

        this.engine.sendMessage(`${this.id}:${port}`, {
          type: "RESPONSE",
          payload: { address: addr, value: this.storage.get(addr) },
          source: msg.source,
        });
      } else {
        this.engine.sendMessage(`${this.id}:${port}`, {
          type: "RESPONSE",
          payload: { address: addr, exception: { msg: "Invalid address" } },
          source: msg.source,
        });
      }
    } else if (msg.type === "WRITE") {
      const addr = msg.payload.address;

      if (addr < this.size) {
        this.storage.set(addr, msg.payload.value);

        this.engine.sendMessage(`${this.id}:${port}`, {
          type: "RESPONSE",
          payload: { address: addr, value: this.storage.get(addr) },
          source: msg.source,
        });
      } else {
        this.engine.sendMessage(`${this.id}:${port}`, {
          type: "RESPONSE",
          payload: { address: addr, exception: { msg: "Invalid address" } },
          source: msg.source,
        });
      }
    }
  }

  getMetrics(): Record<string, number> {
    return this.metrics;
  }

  getInternalState(): unknown {
    return {
      latency: this.latency,
      contents: this.storage,
      size: humanFileSize(this.size),
    };
  }
}
