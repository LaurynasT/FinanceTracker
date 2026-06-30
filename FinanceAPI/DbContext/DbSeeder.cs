public static class DbSeeder
{
    public static void Seed(AppDbContext context)
    {
        if (!context.Categories.Any())
        {
            context.Categories.AddRange(
                new Category { Name = "Salary", Type = CategoryType.Income },
                new Category { Name = "Bonus", Type = CategoryType.Income },
                new Category { Name = "Gift", Type = CategoryType.Income },
                new Category { Name = "Other Income", Type = CategoryType.Income },

                new Category { Name = "Groceries", Type = CategoryType.Expense },
                new Category { Name = "Rent", Type = CategoryType.Expense },
                new Category { Name = "Transport", Type = CategoryType.Expense },
                new Category { Name = "Entertainment", Type = CategoryType.Expense },
                new Category { Name = "Utilities", Type = CategoryType.Expense },
                new Category { Name = "Other Expense", Type = CategoryType.Expense }
            );

            context.SaveChanges();
        }
        if (!context.Users.Any())
        {
            context.Users.Add(new UserModel
            {
                Name = "Test User",
                CreatedAt = DateTime.UtcNow
            });

            context.SaveChanges();
        }
        if (!context.Transactions.Any())
        {
            var user = context.Users.First();
            var salary = context.Categories.First(c => c.Name == "Salary");
            var groceries = context.Categories.First(c => c.Name == "Groceries");

            context.Transactions.AddRange(
                new Transaction
                {
                    Name = "Monthly paycheck",
                    Amount = 2000,
                    Date = DateTime.UtcNow,
                    UserId = user.Id,
                    CategoryId = salary.Id
                },
                new Transaction
                {
                    Name = "Weekly groceries",
                    Amount = 45.50m,
                    Date = DateTime.UtcNow,
                    UserId = user.Id,
                    CategoryId = groceries.Id
                }
            );

            context.SaveChanges();
        }
    }
}