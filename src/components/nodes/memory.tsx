import { Handle, NodeProps, Position } from "@xyflow/react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { HardDrive, Settings } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { MemoryConfig, MemoryNodeConfigModal } from "./memory-config";
import { DeleteButton } from "./delete-button";

export function MemoryNode({ data, id }: NodeProps) {
  const [settings, setSettings] = useState<boolean>(false);
  const [config, setConfig] = useState<MemoryConfig>(data);

  return (
    <Card className="w-64 shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <HardDrive className="w-4 h-4" />
            {config.label}
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSettings(!settings)}
              title="Edit"
            >
              <Settings className="w-3 h-3" />
              <MemoryNodeConfigModal
                id={id}
                open={settings}
                onOpenChange={setSettings}
                config={config}
                setConfig={setConfig}
              />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="text-xs text-muted-foreground mb-2">
          Size: {config.size}
        </div>
        <div className="text-xs text-muted-foreground">
          Access Time: {config.accessTime}
        </div>
        <Handle type="target" position={Position.Left} />
      </CardContent>
    </Card>
  );
}
