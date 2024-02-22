export default(tickCallback) => {
  let timer
  let tick = 0

  const start = () => {
    timer = setInterval(() => {
      tick++
      if (tickCallback) {
        tickCallback(tick)
      }
    }, 1000)
  }

  const stop = () => {
    clearInterval(timer)
  }

  const getTick = () => {
    return tick
  }

  return {
    start,
    stop,
    getTick,
  }
}
