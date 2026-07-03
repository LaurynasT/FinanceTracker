using System.Text.Json.Serialization;


public class CreateCategory
{

    public string Name { get; set; } = string.Empty;
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public CategoryType Type { get; set; }
}