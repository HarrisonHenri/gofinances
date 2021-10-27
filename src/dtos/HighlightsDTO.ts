export interface HighlightsDTO {
  deposits: {
    amount: string
    lastTransaction: string
  }
  withdraws: {
    amount: string
    lastTransaction: string
  }
  balance: {
    amount: string
    lastTransaction: string
  }
}
