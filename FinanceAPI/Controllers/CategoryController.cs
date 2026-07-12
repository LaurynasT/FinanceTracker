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
        public async Task<IActionResult> GetCategories([FromQuery] CategoryType? type)
        {
            var categories = await _categoryService.GetCategories(type);
            return Ok(categories);
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateCategory([FromForm] CreateCategory newCategory)
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
        public async Task<IActionResult> UpdateCategory(int id, [FromForm] UpdateCategory updateCategory)
        {
            try{
            var categories = await _categoryService.UpdateCategory(id, updateCategory);
            return NoContent();
            } catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCategoryById(int id)
        {
            var categories = await _categoryService.GetCategoryById(id);
            return Ok(categories);
        }

    }
}