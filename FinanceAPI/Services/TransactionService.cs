using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Services
{
    public class TransactionService : ITransactionService
    {
        private readonly AppDbContext _context;

        public TransactionService(AppDbContext context)
        {
            _context = context;
        }
        public async Task<List<TransactionDTO>> GetTransactions(int userId)
        {
            var userExists = await _context.Users.AnyAsync(u => u.Id == userId);

            if (!userExists)
            {
                throw new Exception("User not found");
            }

            var transactions = await _context.Transactions
            .AsNoTracking()
                .Where(t => t.UserId == userId)
                 .OrderBy(t => t.Date)
                 .Select(t => new TransactionDTO
                 {
                     Id = t.Id,
                     Name = t.Name,
                     Description = t.Description,
                     Amount = t.Amount,
                     Date = t.Date,
                     Category = new CategoryDTO
                     {
                         Id = t.Category.Id,
                         Name = t.Category.Name,
                         Type = t.Category.Type
                     }
                 })
                    .ToListAsync();

            if (transactions.Count == 0)
            {
                throw new Exception("User has no transactions");
            }

            return transactions;
        }

        public async Task DeleteTransaction(int id)
        {
            var transaction = await _context.Transactions.SingleOrDefaultAsync(t => t.Id == id) ?? throw new Exception("Transaction not found");
            _context.Transactions.Remove(transaction);
            await _context.SaveChangesAsync();
        }

        public async Task<TransactionDTO> CreateTransaction(CreateTransaction newTransaction)
        {
            if (string.IsNullOrWhiteSpace(newTransaction.Name))
                throw new Exception("Name is required");

            if (newTransaction.Amount <= 0)
                throw new Exception("Transaction ammount must be greater than 0");

            var category = await _context.Categories.FindAsync(newTransaction.CategoryId)
                ?? throw new Exception("Category not found");

            var userExists = await _context.Users.AnyAsync(u => u.Id == newTransaction.UserId);
            if (!userExists)
                throw new Exception("User not found");

            if (category.Type == CategoryType.Expense)
            {
                var currentBalance = await GetCurrentBalanceAsync(newTransaction.UserId);
                if (currentBalance < newTransaction.Amount)
                    throw new Exception("Not enough balance for this transaction");
            }

            Transaction transaction = new()
            {
                Name = newTransaction.Name,
                Amount = newTransaction.Amount,
                Date = DateTime.UtcNow,
                Description = newTransaction.Description,
                UserId = newTransaction.UserId,
                CategoryId = newTransaction.CategoryId

            };
            _context.Transactions.Add(transaction);
            await _context.SaveChangesAsync();
            return new TransactionDTO
            {
                Id = transaction.Id,
                Name = transaction.Name,
                Amount = transaction.Amount,
                Date = transaction.Date,
                Description = transaction.Description,
                Category = new CategoryDTO
                {
                    Id = category.Id,
                    Name = category.Name,
                    Type = category.Type
                }
            };
        }
        public async Task<decimal> GetCurrentBalanceAsync(int userId)
        {
            var user = await _context.Users.FindAsync(userId);

            var transactionsTotal = await _context.Transactions
                .Include(t => t.Category)
                .Where(t => t.UserId == userId)
                .SumAsync(t => t.Category.Type == CategoryType.Income
                    ? t.Amount
                    : -t.Amount);

            return user!.Balance + transactionsTotal;
        }

        public async Task<TransactionDTO> UpdateTransaction(UpdateTransaction updateTransaction, int id)
        {
            if (updateTransaction.Amount <= 0)
                throw new Exception("Transaction amount must be greater than 0");

            var transaction = await _context.Transactions
                .Include(t => t.Category)
                .SingleOrDefaultAsync(t => t.Id == id)
                ?? throw new Exception("Transaction not found");

            var category = await _context.Categories
                .FindAsync(updateTransaction.CategoryId)
                ?? throw new Exception("Category not found");

            if (category.Type == CategoryType.Expense)
            {
                var currentBalance = await GetCurrentBalanceAsync(transaction.UserId);

                var balanceWithoutOldTransaction =
                    transaction.Category.Type == CategoryType.Expense
                        ? currentBalance + transaction.Amount
                        : currentBalance - transaction.Amount;

                if (balanceWithoutOldTransaction < updateTransaction.Amount)
                    throw new Exception("Not enough balance");
            }

            transaction.Name = updateTransaction.Name;
            transaction.Amount = updateTransaction.Amount;
            transaction.Description = updateTransaction.Description;
            transaction.CategoryId = updateTransaction.CategoryId;

            await _context.SaveChangesAsync();

            return new TransactionDTO
            {
                Id = transaction.Id,
                Name = transaction.Name,
                Amount = transaction.Amount,
                Description = transaction.Description,
                Date = transaction.Date,
                Category = new CategoryDTO
                {
                    Id = category.Id,
                    Name = category.Name,
                    Type = category.Type
                }
            };
        }

    }


}