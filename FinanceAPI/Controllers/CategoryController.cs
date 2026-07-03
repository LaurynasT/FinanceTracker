using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Controllers
{
    [ApiController]
    [Route("api/category")]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpGet]
        public async Task<IActionResult> GetCategories()
        {
            var categories = await _categoryService.GetCategories();
            return Ok(categories);
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateCategory(CreateCategory newCategory)
        {
            try{
            var categories = await _categoryService.CreateCategory(newCategory);
            return Ok(categories);
            } catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCategory(int id, [FromBody]CreateCategory updateCategory)
        {
            try{
            var categories = await _categoryService.UpdateCategory(id, updateCategory);
            return NoContent();
            } catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}