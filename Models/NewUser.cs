using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace server.Models
{
    [Index(nameof(Email), IsUnique = true)]
    public class NewUser
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Name is required")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid Email Format")]


        public string Email { get; set; }

        [Required]
        public string PasswordHash { get; set; }

        public decimal InitialBalance { get; set; } = 0;
        public int NumberOfGroups { get; set; } = 0;
        public bool HasSetup { get; set; } = false;
    }
}
