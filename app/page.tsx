import { ModeToggle } from "@/components/ui/theme-toggle";

export default function Home() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="absolute top-0 right-0 p-4">
        <ModeToggle />
      </div>
      <div className="w-full max-w-sm text-center">
        <h1>Home page</h1>
      </div>
    </div>
  )
}