public interface ITransactionService
{
    Task<List<TransactionDTO>> GetTransactions(int userId);
    Task<decimal> GetCurrentBalanceAsync(int id);

    Task DeleteTransaction(int id);
    Task<TransactionDTO> CreateTransaction(CreateTransaction newTransaction);
    Task<TransactionDTO> UpdateTransaction(UpdateTransaction updateTransaction, int id);
    
}