import { app_config } from '@/config/app'

const CopyRight = () => {
  return (
    <div className="absolute bottom-0 p-4 text-zinc-400 dark:text-slate-500">
      &copy; {(new Date).getFullYear()} {app_config.app_name}. All rights reserved.
    </div>
  )
}

export default CopyRight