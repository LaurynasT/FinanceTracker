using System.Runtime.CompilerServices;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Services
{
    public class UserService : IUserService
    {
        private readonly AppDbContext _context;

        public UserService(AppDbContext context)
        {
            _context = context;
        }
        public async Task<List<UserDTO>> GetUsers()
        {
            return await _context.Users
            .AsNoTracking()
            .OrderBy(u => u.Id)
            .Select(
                u => new UserDTO
                {
                    Id = u.Id,
                    Name = u.Name,
                    CreatedAt = u.CreatedAt,
                }
            )
            .ToListAsync();
        }

        public async Task DeleteUser(int id)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Id == id) ?? throw new Exception("User not found");
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
        }
        public async Task<UserDTO> CreateUser(CreateUser newUser)
        {
            if (newUser.Name is null)
                throw new Exception("Bad Request");

            UserModel user = new()
            {
                Name = newUser.Name,
                CreatedAt = DateTime.UtcNow,
                Balance = newUser.Balance,
            };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return new UserDTO
            {
                Id = user.Id,
                Name = user.Name,
                CreatedAt = user.CreatedAt
            };
        }

        public async Task<UserDTO> UpdateUser(UpdateUserDTO updateUser, int id)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Id == id) ?? throw new Exception("User not found");

            user.Name = updateUser.Name;
            

            await _context.SaveChangesAsync();
            return new UserDTO
            {
                Id = user.Id,
                Name = user.Name,
                CreatedAt = user.CreatedAt
            };
        }

        
    }


}