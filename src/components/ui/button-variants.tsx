import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // HelpConnect Custom Variants
        hero: "bg-gradient-primary text-primary-foreground hover:opacity-90 glow-primary hover:glow-secondary transition-all duration-300",
        "hero-outline": "border-2 border-primary/50 bg-transparent text-primary hover:bg-primary hover:text-primary-foreground glow-primary transition-all duration-300",
        gradient: "bg-gradient-secondary text-secondary-foreground hover:opacity-90 glow-secondary transition-all duration-300",
        card: "bg-card-gradient text-card-foreground hover:bg-muted/20 elegant-shadow transition-all duration-300",
        floating: "bg-card text-card-foreground hover:bg-muted/20 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-14 rounded-lg px-12 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);