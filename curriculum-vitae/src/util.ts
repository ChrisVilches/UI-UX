export const sleep = async (ms: number): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, ms))
}

export class Cache<T> {
  private data: T | null = null

  private latestTimestamp = 0

  constructor (private readonly obtainData: () => Promise<T>, private readonly validTimeMs: number) {
  }

  isExpired (): boolean {
    if (this.data === null) {
      return true
    }

    return Number(new Date()) - this.latestTimestamp > this.validTimeMs
  }

  put (data: T): void {
    this.data = data
    this.latestTimestamp = Number(new Date())
  }

  getOrNull (): T | null {
    if (this.isExpired()) {
      return null
    }

    return this.data
  }

  async get (): Promise<{ data: T, fromCache: boolean }> {
    let fromCache = true

    if (this.isExpired()) {
      this.put(await this.obtainData())
      fromCache = false
    }

    if (this.data === null) {
      throw new Error('Data is null even after fetching it')
    }

    return { data: this.data, fromCache }
  }
}
