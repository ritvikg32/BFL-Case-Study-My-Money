interface TransactionEventListener{
    onContactSavedSuccess: (code: number, msg: string) => void
    onContactSaveFailed: (code: number, msg: string) => void
}