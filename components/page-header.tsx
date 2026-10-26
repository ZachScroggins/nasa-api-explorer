import { cn } from "@/lib/utils"

export function PageHeader({
  title,
  description,
  children,
  className,
}: {
  title: React.ReactNode
  description?: React.ReactNode
  children?: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 md:flex-row md:items-end md:justify-between",
        className
      )}
    >
      <div className="flex max-w-3xl flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight [font-stretch:115%] sm:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="text-pretty text-muted-foreground">{description}</p>
        )}
      </div>
      {children}
    </div>
  )
}
