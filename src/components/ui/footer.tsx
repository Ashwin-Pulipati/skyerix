import { Github, Linkedin } from "lucide-react"
import Link from "next/link"
import { TooltipContent, TooltipProvider, TooltipTrigger, Tooltip } from "./tooltip";


const Footer = () => {
  return (
    <footer className="flex flex-col md:flex-row space-y-4 md:space-y-0 justify-between items-center px-4 py-3 bg-background/95 border-t border-border">
      <Link href="/">
        <h1 className="font-display text-2xl font-bold text-gradient">
          SKYERIS
        </h1>
      </Link>

      <span className="text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} Made with 💕 by Ashwin Pulipati
      </span>

      <TooltipProvider delayDuration={150}>
        <div className="flex items-center gap-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="https://github.com/Ashwin-Pulipati/skyeris"
                className="bg-primary text-background rounded-full p-2 hover:bg-primary/90 transition-colors"
              >
                <Github size={20} />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Ashwins GitHub</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="https://www.linkedin.com/in/ashwinpulipati/"
                className="bg-primary text-background rounded-full p-2 hover:bg-primary/90 transition-colors"
              >
                <Linkedin size={20} />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Ashwins LinkedIn</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </footer>
  );
}

export default Footer