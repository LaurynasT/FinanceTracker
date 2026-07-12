using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Services
{
    public class CategoryService : ICategoryService
    {
        private readonly AppDbContext _context;

        public CategoryService(AppDbContext context)
        {
            _context = context;
        }
        public async Task<List<CategoryDTO>> GetCategories([FromQuery] CategoryType? type)
        {
            var query = _context.Categories.AsQueryable();

            if (type.HasValue)
            {
                query = query.Where(c => c.Type == type);
            }

            return await query
            .AsNoTracking()
            .OrderBy(c => c.Id)
            .Select(c => new CategoryDTO
            {
                Id = c.Id,
                Name = c.Name,
                Type = c.Type,
            })
            .ToListAsync();
        }
        public async Task<CategoryDTO?> GetCategoryById(int id)
        {
            return await _context.Categories
                .AsNoTracking()
                .Where(c => c.Id == id)
                .Select(c => new CategoryDTO
                {
                    Id = c.Id,
                    Name = c.Name,
                    Type = c.Type,
                })
                .FirstOrDefaultAsync();
        }
        public async Task DeleteCategory(int id)
        {
            var category = await _context.Categories.SingleOrDefaultAsync(c => c.Id == id) ?? throw new Exception("Category not found");
            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();
        }

        public async Task<CategoryDTO> CreateCategory(CreateCategory newCategory)
        {

            if (string.IsNullOrWhiteSpace(newCategory.Name))
                throw new Exception("Name is required");

            var nameTaken = await _context.Categories
                .AnyAsync(c => c.Name == newCategory.Name);

            if (nameTaken)
                throw new Exception("A category with this name already exists");

            Category category = new()
            {
                Name = newCategory.Name,
                Type = newCategory.Type,
            };

            _context.Categories.Add(category);
            await _context.SaveChangesAsync();

            return new CategoryDTO
            {
                Id = category.Id,
                Name = category.Name,
                Type = category.Type,
            };
        }

        public async Task<CategoryDTO> UpdateCategory(int id, UpdateCategory updateCategory)
        {
            var category = await _context.Categories.SingleOrDefaultAsync(c => c.Id == id) ?? throw new Exception("Category not found");
            if (string.IsNullOrWhiteSpace(updateCategory.Name))
                throw new Exception("Name is required");

            var nameTaken = await _context.Categories
                .AnyAsync(c => c.Name == updateCategory.Name && c.Id != id);

            if (nameTaken)
                throw new Exception("A category with this name already exists");

            category.Name = updateCategory.Name;

            await _context.SaveChangesAsync();
            return new CategoryDTO
            {
                Id = category.Id,
                Name = category.Name,
                Type = category.Type,
            };
        }
    }


}