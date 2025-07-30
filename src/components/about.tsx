import { PropsWithChildren } from "react"
import { Github, Mail, Cpu } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"

export default function AboutDialog({ children }: PropsWithChildren) {

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Cpu className="h-5 w-5" />
            Cache Simulator
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">
              This Cache Simulator was designed to help
              students understand cache memory behavior, hit/miss ratios, and different cache replacement policies
              through interactive simulations.
            </p>
          </div>

          <Separator />

          <div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Name</span>
                <Button variant="ghost" className="text-sm font-medium">
                    <span className="mr-1">🇦🇷</span>
                    Jeremías Benítez
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Email</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-sm font-medium"
                  onClick={() => window.open("mailto:jerebntz@gmail.com")}
                >
                  <Mail className="h-3 w-3 mr-1" />
                  jerebntz@gmail.com
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">GitHub</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-sm font-medium"
                  onClick={() => window.open("https://github.com/jerebenitez", "_blank")}
                >
                  <Github className="h-3 w-3 mr-1" />
                  jerebenitez
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
