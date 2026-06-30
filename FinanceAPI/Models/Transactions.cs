
public class Transaction
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public DateTime Date { get; set;}

    public int UserId { get; set; }
    public UserModel? User { get; set; }
    public int CategoryId { get; set; }
    public Category Category {get; set;}

}