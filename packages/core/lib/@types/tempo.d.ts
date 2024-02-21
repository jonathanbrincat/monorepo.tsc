declare interface ITempo {
  // JB: typescript does not support private members in the interface
  start: () => void
  stop: () => void
  reset: () => void
}
