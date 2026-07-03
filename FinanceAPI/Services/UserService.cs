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
        public async Task<List<UserModel>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task DeleteUser(int id)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Id == id) ?? throw new Exception("User not found");
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
        }
        public async Task<UserModel> CreateUser(CreateUser newUser)
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
            return user;
        }

        public async Task<UserModel> UpdateUser(CreateUser updateUser, int id)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Id == id) ?? throw new Exception("User not found");

            user.Name = updateUser.Name;
            user.Balance = updateUser.Balance;

            await _context.SaveChangesAsync();
            return user;
        }

        
    }


}