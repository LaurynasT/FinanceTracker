using Npgsql.PostgresTypes;

public interface ICategoryService
{
    Task<List<CategoryDTO>> GetCategories(CategoryType? type);
    Task DeleteCategory(int id);
    Task<CategoryDTO> CreateCategory(CreateCategory newCategory);
    Task<CategoryDTO> UpdateCategory(int id, UpdateCategory updateCategory);
    Task<CategoryDTO> GetCategoryById(int id);
}