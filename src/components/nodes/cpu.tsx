import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Handle, type NodeProps, Position } from "@xyflow/react";
import { Cpu, Pencil, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export function CPUNode({ data }: NodeProps) {
    const [name, setName] = useState<string>(data.label)
    const [editing, setEditing] = useState<boolean>(false)

    const onEdit = () => {
        setEditing(!editing)
    }

    return (
    <Card className="w-56 shadow-lg">
      <CardHeader className="pb-2">
      <CardTitle className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4" />
            {!editing ? name : <Input value={name} onClick={e => e.stopPropagation()} onChange={e => setName(e.target.value)} />}
          </div>
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" onClick={onEdit} title="Edit">
                {!editing ? <Pencil className="w-3 h-3" /> : <Save className="w-3 h-3" />}
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-col gap-3">
            <Button variant="outline" size="sm" className="text-xs h-6">Edit code</Button>
            <div className="text-xs text-muted-foreground">Processor Core</div>
        </div>
        <Handle type="source" position={Position.Right} />
      </CardContent>
    </Card>)
}
