using System.ComponentModel.DataAnnotations;

public class UpdateUserDTO
{
    [Required]
    [StringLength(50, MinimumLength = 1)]
    public string Name { get; set; } = string.Empty;

}