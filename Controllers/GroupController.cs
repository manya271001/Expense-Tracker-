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
            // Validate the request model
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                // Find the creator of the group
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
                    Discription = model.Discription,
                    Members = new List<UserGroup>()
                };

                // Optimize by fetching all members in one query
                var members = await _context.NewUsers
                                            .Where(u => model.MemberIds.Contains(u.Id))
                                            .ToListAsync();

                // Check if all member ids are valid
                foreach (var member in members)
                {
                    group.Members.Add(new UserGroup { UserId = member.Id, Group = group });
                }

                // If there are any invalid member ids
                if (members.Count != model.MemberIds.Count)
                {
                    return BadRequest(new { message = "Some member(s) not found" });
                }

                // Add group to the context
                _context.Groups.Add(group);
                await _context.SaveChangesAsync();

                // Return success response with the group data
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
                        group.Discription,
                        group.CreatedAt,
                        Members = group.Members.Select(m => new { m.UserId })
                    }
                });
            }
            catch (Exception ex)
            {
                // Log the error (you can add logging here)
                return StatusCode(500, new { message = "An error occurred while creating the group.", error = ex.Message });
            }
        }
    }
}
