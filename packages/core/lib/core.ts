export default class Core implements ITempo {
  private interval!: number | null
  private tick!: number
  private epoch!: number
  private _milliseconds: number
  private _seconds: number
  private _minutes: number
  private _hours: number

  constructor(private offset = 0) {
    this.offset = offset
    this.interval = null
    this.tick = 0
    this.epoch = 0
    this._milliseconds = 0
    this._seconds = 0
    this._minutes = 0
    this._hours = 0
  }

  public get milliseconds(): number {
    return this._milliseconds
  }

  public get seconds(): number {
    return this._seconds
  }

  public get minutes(): number {
    return this._minutes
  }

  public get hours(): number {
    return this._hours
  }

  public start(): void {
    if (this.interval) return

    this.epoch = Date.now()

    this.interval = setInterval(this.tickTock.bind(this), 10)
  }

  public stop(): void {
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = null

      this.epoch = 0
    }
  }

  public reset(): void {
    this.epoch = Date.now()
    this.tick = 0
    this._milliseconds = 0
    this._seconds = 0
    this._minutes = 0
    this._hours = 0
  }

  private tickTock() {
    this.tick = this.offset - (Date.now() - this.epoch)

    this._milliseconds = Math.trunc((this.tick % 1000) * 0.1)
    this._seconds = Math.trunc(this.tick / 1000) % 60
    this._minutes = Math.trunc((this.tick / 1000) / 60) % 60
    this._hours = Math.trunc(this.tick / 1000) / 3600

    if (this.tick <= 0) {
      this.stop()
      this.reset()
    }
  }
}
