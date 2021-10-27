export interface StatementDTO {
  id: string
  amount: string
  description: string
  type: 'deposit' | 'withdraw'
  category: string
  updated_at: string
}
