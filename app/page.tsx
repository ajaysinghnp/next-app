import { ModeToggle } from "@/components/ui/theme-toggle";

export default function Page() {
  return (
    <div className="flex flex-1 items-center justify-between">
      <h1>Home Page</h1>
      <ModeToggle />
    </div>
  )
}
