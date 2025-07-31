"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Node, NodeProps } from "@xyflow/react"
import { type LucideIcon, Settings } from "lucide-react"
import {
  type ComponentType,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
  useState,
  memo,
  useCallback,
} from "react"
import { DeleteButton } from "./delete-button"
import type { JSX } from "react/jsx-runtime" // Import JSX to fix the undeclared variable error

type ConfigModalProps<T> = {
  id: string
  open: boolean
  onOpenChange: Dispatch<SetStateAction<boolean>>
  config: T
  setConfig: Dispatch<SetStateAction<T>>
}

type NodeData = Record<string, unknown> & {
  label: string
}

interface NodeComponentProps<T extends NodeData, K extends string = string>
  extends NodeProps<Node<T, K>>,
    PropsWithChildren {
  ConfigModal?: ComponentType<ConfigModalProps<T>>
  Icon: LucideIcon
  hasDelete?: boolean
  data: T
  setData: Dispatch<SetStateAction<T>>
  className?: string
}

function NodeComponentInner<T extends NodeData, K extends string = string>({
  data,
  setData,
  id,
  ConfigModal,
  Icon,
  hasDelete = false,
  children,
  className,
}: NodeComponentProps<T, K>) {
  const [isConfigOpen, setIsConfigOpen] = useState(false)

  const handleConfigToggle = useCallback(() => {
    setIsConfigOpen((prev) => !prev)
  }, [])

  const displayLabel = data.label || id

  return (
    <>
      <Card className={`w-80 shadow-lg ${className || ""}`}>
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Icon className="w-4 h-4" aria-hidden="true" />
              <span title={displayLabel}>{displayLabel}</span>
            </div>

            <div className="flex gap-1" role="group" aria-label="Node actions">
              {ConfigModal && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleConfigToggle}
                  aria-label={`Configure ${displayLabel}`}
                  title="Configure node"
                >
                  <Settings className="w-3 h-3" />
                </Button>
              )}

              {hasDelete && <DeleteButton id={id} aria-label={`Delete ${displayLabel}`} />}
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-0">{children}</CardContent>
      </Card>

      {ConfigModal && (
        <ConfigModal id={id} open={isConfigOpen} onOpenChange={setIsConfigOpen} config={data} setConfig={setData} />
      )}
    </>
  )
}

// Memoize the component for better performance
export const NodeComponent = memo(NodeComponentInner) as <T extends NodeData, K extends string = string>(
  props: NodeComponentProps<T, K>,
) => JSX.Element
