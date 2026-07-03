public interface ITransactionService
{
    Task<List<TransactionDTO>> GetTransactions(int userId);
    Task<decimal> GetCurrentBalanceAsync(int id);

    Task DeleteTransaction(int id);
    Task<Transaction> CreateTransaction(CreateTransaction newTransaction);
    Task<Transaction> UpdateTransaction(CreateTransaction updateTransaction, int id);
    
}