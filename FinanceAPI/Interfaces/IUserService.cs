public interface IUserService
{
    Task<List<UserModel>> GetUsers();
    Task DeleteUser(int id);
    Task<UserModel> CreateUser(CreateUser newUser);
    Task<UserModel> UpdateUser(CreateUser updateUser, int id);
}