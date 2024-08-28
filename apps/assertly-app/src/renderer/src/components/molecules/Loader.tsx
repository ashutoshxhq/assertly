const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-zinc-200 dark:bg-zinc-950 custom-drag-region">
      <div className="flex flex-row gap-2">
        <div className="w-4 h-4 rounded-full bg-zinc-400 dark:bg-zinc-600 animate-bounce"></div>
        <div className="w-4 h-4 rounded-full bg-zinc-400 dark:bg-zinc-600 animate-bounce [animation-delay:-.3s]"></div>
        <div className="w-4 h-4 rounded-full bg-zinc-400 dark:bg-zinc-600 animate-bounce [animation-delay:-.5s]"></div>
      </div>
    </div>
  )
}

export default Loader
