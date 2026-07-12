using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Controllers
{
    [ApiController]
    [Route("api/transactions")]
    public class TransactionController : ControllerBase
    {
        private readonly ITransactionService _transactionService;

        public TransactionController(ITransactionService transactionService)
        {
            _transactionService = transactionService;
        }



        [HttpGet("{userId}")]
        public async Task<IActionResult> GetTransactions(int userId)
        {
            try
            {
                var result = await _transactionService.GetTransactions(userId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                if (ex.Message == "User not found")
                    return NotFound(ex.Message);

                if (ex.Message == "User has no transactions")
                    return NotFound(ex.Message);

                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("{id}/balance")]
        public async Task<IActionResult> GetCurrentBalanceAsync(int id)
        {
            var result = await _transactionService.GetCurrentBalanceAsync(id);
            return Ok(result);
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateTransaction( [FromForm] CreateTransaction newTransaction)
        {
            try
            {
                var created = await _transactionService.CreateTransaction(newTransaction);
                return Ok(created);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            try
            {
                await _transactionService.DeleteTransaction(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

         [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTransaction( int id, [FromForm] UpdateTransaction updateTransaction)
        { 
            try{
            await _transactionService.UpdateTransaction(updateTransaction, id);
            return NoContent();
            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


    }
}