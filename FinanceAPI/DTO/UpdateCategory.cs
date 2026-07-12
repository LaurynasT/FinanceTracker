using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;


public class UpdateCategory
{
    [Required]
    [StringLength(50, MinimumLength = 1)]
    public string Name { get; set; } = string.Empty;
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public CategoryType Type { get; set; }
}