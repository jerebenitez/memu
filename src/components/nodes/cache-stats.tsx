import { Progress } from "../ui/progress";

export type CacheStats = {
  hits: number;
  misses: number;
  totalAccesses: number;
  hitRate: number;
  missRate: number;
  averageAccessTime: number;
};

export function CacheStats({ stats }: { stats: CacheStats }) {
  return (
    <div className="bg-muted/50 p-3 rounded-lg space-y-3">
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div>
          <div className="text-muted-foreground">Hit Rate</div>
          <div className="font-mono font-bold text-green-600">
            {stats.hitRate.toFixed(1)}%
          </div>
          <Progress value={stats.hitRate} className="h-1 mt-1" />
        </div>
        <div>
          <div className="text-muted-foreground">Miss Rate</div>
          <div className="font-mono font-bold text-red-600">
            {stats.missRate.toFixed(1)}%
          </div>
          <Progress value={stats.missRate} className="h-1 mt-1" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-xs">
        <div>
          <div className="text-muted-foreground">Hits</div>
          <div className="font-mono font-bold text-green-600">{stats.hits}</div>
        </div>
        <div>
          <div className="text-muted-foreground">Misses</div>
          <div className="font-mono font-bold text-red-600">{stats.misses}</div>
        </div>
        <div>
          <div className="text-muted-foreground">Total</div>
          <div className="font-mono font-bold">{stats.totalAccesses}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs">
        <div>
          <div className="text-muted-foreground">Avg Access Time</div>
          <div className="font-mono font-bold">
            {stats.averageAccessTime.toFixed(2)}ns
          </div>
        </div>
      </div>
    </div>
  );
}
