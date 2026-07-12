public interface IUserService
{
    Task<List<UserDTO>> GetUsers();
    Task DeleteUser(int id);
    Task<UserDTO> CreateUser(CreateUser newUser);
    Task<UserDTO> UpdateUser(UpdateUserDTO updateUser, int id);
}