import { createContext, PropsWithChildren, useContext } from "react";
import { useSimulation } from "./hooks";

const SimulationContext = createContext<ReturnType<typeof useSimulation> | null>(null)

export function SimulationProvider({ children }: PropsWithChildren) {
    const simulation = useSimulation()

    return (
        <SimulationContext.Provider value={simulation}>
            {children}
        </SimulationContext.Provider>
    )
}

export function useSimulationContext() {
    const ctx = useContext(SimulationContext)

    if (!ctx) throw new Error("useSimulationContext must be used inside SimulationProvider")

    return ctx
}
