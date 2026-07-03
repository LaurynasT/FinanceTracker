using System.ComponentModel.DataAnnotations;

public class CreateUser
{
    [Required]
    public string Name { get; set; } = string.Empty;
    [Required]
    [Range(0, (double)decimal.MaxValue)]
    public decimal Balance { get; set; }
    

}