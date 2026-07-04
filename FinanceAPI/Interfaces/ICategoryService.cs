using Npgsql.PostgresTypes;

public interface ICategoryService
{
    Task<List<Category>> GetCategories(CategoryType? type);
    Task DeleteCategory(int id);
    Task<Category> CreateCategory(CreateCategory newCategory);
    Task<Category> UpdateCategory(int id, CreateCategory newCategory);
}