import { SimulationEngine } from "../engine";
import { IComponent, IMessage } from "../interfaces";

export class CPU implements IComponent {
  id: string;
  ports = ["out"];
  private engine: SimulationEngine;
  private program: string[];
  private pc = 0;
  private busy = false;
  private registers = new Array(32);
  private exception: { message: string } | null = null;

  constructor(id: string, engine: SimulationEngine, program?: string[]) {
    this.id = id;
    this.engine = engine;
    this.program = program ?? [];
    this.registers.fill(0);
  }

  loadProgram(program?: string[]) {
    this.program = program ?? [];
  }

  reset() {
    this.pc = 0;
    this.registers.fill(0);
  }

  tick() {
    if (this.busy || this.exception) return;

    if (this.pc < this.program.length) {
      const instr = this.program[this.pc++];

      const op = this.parse(instr);

      switch (op.type) {
        case "lw":
          this.engine.sendMessage(`${this.id}:out`, {
            type: "LOAD",
            payload: { address: op.address, value: this.registers[op.src + op.offset] },
            source: this.id,
          });
          this.busy = true;
          return;
        case "li":
          this.registers[op.address] = op.value;
          return;
        case "si":
          this.engine.sendMessage(`${this.id}:out`, {
            type: "STORE",
            payload: { address: op.address, value: op.value },
            source: this.id,
          });
          this.busy = true;
          return;
        case "sw":
          this.engine.sendMessage(`${this.id}:out`, {
            type: "STORE",
            payload: { address: op.address, value: this.registers[op.src + op.offset] },
            source: this.id,
          });
          this.busy = true;
          return;
        default:
          return;
      }
    }
  }

  handleMessage(msg: IMessage) {
    if (msg.source !== this.id) return;
    switch (msg.type) {
      case "RESPONSE":
        this.busy = false;
        this.registers[msg.payload.address] = msg.payload.value;
    }
  }

  parse(
    line: string,
  ):
    | { type: "nop" | "exc" }
    | { type: "lw" | "sw"; address: number; offset: number; src: number }
    | { type: "li" | "si"; address: number; value: number } {
    const wordRegex = /([sl]w)\s\$(\d{1,2}),\s*(\d+)+\(\$(\d{1,2})\)/;
    const immediateRegex = /([sl]i)\s\$(\d{1,2}),\s*(\d+);/

    const isValidReg = (register: number) =>
      register > 0 && register < this.registers.length;

    let results = Array.from(line.matchAll(wordRegex))[0];

    if (results) {
      if (
        !isValidReg(parseInt(results[1])) ||
        !isValidReg(parseInt(results[3]))
      ) {
        this.exception = { message: "InvalidRegister" };
        return { type: "exc" };
      }
      return {
        type: results[0] as "lw" | "sw",
        address: parseInt(results[1]),
        offset: parseInt(results[2]),
        src: parseInt(results[3]),
      };
    }

    results = Array.from(line.matchAll(immediateRegex))[0];
    if (results) {
      if (!isValidReg(parseInt(results[1]))) {
        this.exception = { message: "InvalidRegister" };
        return { type: "exc" };
      }
      return {
        type: results[0] as "li" | "si",
        address: parseInt(results[1]),
        value: parseInt(results[3]),
      };
    }

    return { type: "nop" };
  }
}
