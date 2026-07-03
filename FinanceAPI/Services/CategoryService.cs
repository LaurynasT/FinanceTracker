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
        public async Task<List<Category>> GetCategories()
        {
            return await _context.Categories.ToListAsync();
        }

        public async Task DeleteCategory(int id)
        {
            var category = await _context.Categories.SingleOrDefaultAsync(c => c.Id == id) ?? throw new Exception("Category not found");
            _context.Categories.Remove(category);
            _context.SaveChanges();
        }

        public async Task<Category> CreateCategory(CreateCategory newCategory)
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

            return category;
        }

        public async Task<Category> UpdateCategory(int id, CreateCategory updateCategory)
        {
            var category = await _context.Categories.SingleOrDefaultAsync(u => u.Id == id) ?? throw new Exception("Category not found");
             if (string.IsNullOrWhiteSpace(updateCategory.Name))
                throw new Exception("Name is required");

            var nameTaken = await _context.Categories
                .AnyAsync(c => c.Name == updateCategory.Name);

            if (nameTaken)
                throw new Exception("A category with this name already exists");

            category.Name = updateCategory.Name;

            await _context.SaveChangesAsync();
            return category;
        }
    }


}