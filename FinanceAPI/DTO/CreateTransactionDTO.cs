
using System.ComponentModel.DataAnnotations;

public class CreateTransaction
{ 
    [Required]
    [StringLength(50, MinimumLength = 1)]
    public string Name { get; set; } = string.Empty;
    [Required]
    [StringLength(50, MinimumLength = 1)]
    public string Description { get; set; } = string.Empty;
    [Required]
    [Range(0, (double)decimal.MaxValue)]
    public decimal Amount { get; set; }
    
    public DateTime Date { get; set;}

    public int UserId { get; set; }
    [Required]
    public int CategoryId { get; set; }
    

}