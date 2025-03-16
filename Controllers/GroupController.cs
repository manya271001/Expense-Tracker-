using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using System;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace server.Controllers
{
    [Route("api/group")]
    [ApiController]
    public class GroupController : ControllerBase
    {
        private readonly FullStackDbContext _context;

        public GroupController(FullStackDbContext context)
        {
            _context = context;
        }

        // Endpoint to create a new group
        [HttpPost("createGroup")]
        public async Task<IActionResult> CreateGroup([FromBody] CreateGroupModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var user = await _context.NewUsers.FindAsync(model.CreatedBy);
                if (user == null)
                    return BadRequest(new { message = "User not found" });

                // Create a new group
                var group = new server.Models.Group
                {
                    Name = model.Name,
                    CreatedBy = model.CreatedBy,
                    MaxMembers = model.MaxMembers,
                    TotalBalance = model.TotalBalance,
                    IsActive = model.IsActive,
                    Description = model.Description,
                    Members = new List<UserGroup>()
                };

                // Fetch all valid members from DB
                var members = await _context.NewUsers
                                            .Where(u => model.MemberIds.Contains(u.Id))
                                            .ToListAsync();

                // Ensure no duplicate UserGroup entries
                var existingUserGroupIds = new HashSet<int>();

                foreach (var member in members)
                {
                    if (!existingUserGroupIds.Contains(member.Id))
                    {
                        group.Members.Add(new UserGroup { UserId = member.Id, Group = group });
                        existingUserGroupIds.Add(member.Id);
                    }
                }

                // Ensure creator is added only once
                if (!existingUserGroupIds.Contains(model.CreatedBy))
                {
                    group.Members.Add(new UserGroup { UserId = model.CreatedBy, Group = group });
                }

                // Check if all members were found
                if (members.Count != model.MemberIds.Count)
                {
                    return BadRequest(new { message = "Some member(s) not found" });
                }

                _context.Groups.Add(group);
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    message = "Group created successfully!",
                    group = new
                    {
                        group.Id,
                        group.Name,
                        group.CreatedBy,
                        group.MaxMembers,
                        group.TotalBalance,
                        group.IsActive,
                        group.Description,
                        group.CreatedAt,
                        Members = group.Members.Select(m => new { m.UserId })
                    }
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while creating the group.", error = ex.Message });
            }
        }

        // Endpoint to get user groups
        [HttpGet("userGroups/{userId}")]
        public async Task<IActionResult> GetUserGroups(int userId)
        {
            var userGroups = await _context.UserGroups
                .Where(ug => ug.UserId == userId)
                .Select(ug => ug.GroupId)
                .Distinct()
                .ToListAsync();

            Console.WriteLine($"User {userId} is in {userGroups.Count} groups."); 
            return Ok(new { numberOfGroups = userGroups.Count });
        }

    }
}
