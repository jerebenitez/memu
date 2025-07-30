import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Handle, type NodeProps, Position } from "@xyflow/react";
import { Cpu, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "./delete-button";
import { useState } from "react";
import { CPUNodeConfigModal } from "./cpu-config";

export function CPUNode({ data, id }: NodeProps) {
  const [settings, setSettings] = useState<boolean>(false);
  const [label, setLabel] = useState<string>(data.label as string);

  return (
    <Card className="w-60 shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4" />
            {label}
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSettings(!settings)}
              title="Edit"
            >
              <Settings className="w-3 h-3" />
              <CPUNodeConfigModal
                id={id}
                open={settings}
                onOpenChange={setSettings}
                label={label}
                setLabel={setLabel}
              />
            </Button>
            <DeleteButton id={id as string} />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-col gap-3">
          <Button variant="outline" size="sm" className="text-xs h-6">
            Edit code
          </Button>
          <div className="text-xs text-muted-foreground">Processor Core</div>
        </div>
        <Handle type="source" position={Position.Right} />
      </CardContent>
    </Card>
  );
}
