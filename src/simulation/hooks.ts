import { useEffect, useState, useRef } from 'react'
import { SimulationEngine } from './engine'
import { CPU, Cache, Memory } from './components'
import { NodeId, PortId } from './interfaces'

export function useSimulation() {
  const engineRef = useRef<SimulationEngine | undefined>(undefined)
  const [state, setState] = useState(() => ({
    time: 0,
    nodes: [] as any[],
    connections: [] as any[]
  }))

  if (!engineRef.current) {
    const engine = new SimulationEngine()

    // Config inicial
    const cpu = new CPU('CPU1', engine, [])
    const mem = new Memory('MEM', engine)

    engine.addNode(cpu)
    engine.addNode(mem)

    engineRef.current = engine
  }

  const engine = engineRef.current

  useEffect(() => {
    const unsubscribe = engine.onTick(() => {
      setState(engine.getState())
    })

    setState(engine.getState())
    return unsubscribe
  }, [engine])

  return {
    state,
    addCPU(id: NodeId, program: string[]) {
      const cpu = new CPU(id, engine, program)
      engine.addNode(cpu)
    },
    addCache(id: NodeId, latency = 1) {
      const cache = new Cache(id, engine, latency)
      engine.addNode(cache)
    },
    connect(a: PortId, b: PortId) {
      engine.connect(a, b)
    },
    start() {
      engine.start(500)
    },
    pause() {
      engine.pause()
    },
    step() {
      engine.step()
    },
    getNodeMetrics(id: NodeId) {
      const node = engine.getNode(id)
      return node ? node.getMetrics() : null
    },
    setCPUProgram(id: NodeId, program: string[]) {
      const node = engine.getNode(id)
      if (node && node.type === 'CPU') {
        (node as CPU).loadProgram(program)
      }
    }
  }
}

