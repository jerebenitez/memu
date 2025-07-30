import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type Node, NodeProps } from "@xyflow/react";
import { HardDrive, LucideIcon, Settings } from "lucide-react";
import {
  ComponentType,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "./delete-button";

type ConfigModalProps<T> = {
  id: string;
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  config: T;
  setConfig: Dispatch<SetStateAction<T>>;
};

export function NodeComponent<
  T extends Record<string, unknown> & { label: string },
  K extends string = string,
>({
  data,
  setData,
  id,
  ConfigModal,
  Icon,
  hasDelete,
  children,
}: NodeProps<Node<T, K>> & {
  ConfigModal?: ComponentType<ConfigModalProps<T>>;
  Icon: LucideIcon
  hasDelete?: boolean;
  data: T;
  setData: Dispatch<SetStateAction<T>>
} & PropsWithChildren) {
  const [settings, setSettings] = useState<boolean>(false);

  return (
    <Card className="w-80 shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Icon className="w-4 h-4" />
            {data.label || id}
          </div>
          <div className="flex gap-1">
            {ConfigModal && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSettings(!settings)}
                title="Edit"
              >
                <Settings className="w-3 h-3" />
                <ConfigModal
                  id={id}
                  open={settings}
                  onOpenChange={setSettings}
                  config={data}
                  setConfig={setData}
                />
              </Button>
            )}
            {hasDelete && <DeleteButton id={id} />}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">{children}</CardContent>
    </Card>
  );
}
