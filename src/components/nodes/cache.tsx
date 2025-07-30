import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Handle, NodeProps, Position } from "@xyflow/react";
import { HardDrive, Settings } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "../ui/badge";
import { CacheConfig, CacheNodeConfigModal } from "./cache-config";
import { DeleteButton } from "./delete-button";

export function CacheNode({ data, id }: NodeProps) {
  const [settings, setSettings] = useState<boolean>(false);
  const [config, setConfig] = useState<CacheConfig>(data.config as CacheConfig);

  return (
    <Card className="w-80 shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <HardDrive className="w-4 h-4" />
            {data.label as string}
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSettings(!settings)}
              title="Edit"
            >
              <Settings className="w-3 h-3" />
              <CacheNodeConfigModal
                id={id}
                open={settings}
                onOpenChange={setSettings}
                config={config}
                setConfig={setConfig}
              />
            </Button>
            <DeleteButton id={id} />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
      <span className="text-xs text-muted-foreground">Access Time: {config.accessTime}ns</span>
        <div className="flex gap-1 flex-wrap">
          <Badge variant="secondary" className="text-xs">
            {config.size}
          </Badge>
          <Badge variant="secondary" className="text-xs">
            {config.associativity}
          </Badge>
          <Badge variant="secondary" className="text-xs">
            {config.evictionPolicy}
          </Badge>
        </div>
        <Handle type="target" position={Position.Left} />
        <Handle type="source" position={Position.Right} />
      </CardContent>
    </Card>
  );
}
