using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Syntrix.Models;
using Syntrix.Repositories;
using BCrypt.Net;
using Microsoft.AspNetCore.Authorization;

namespace Syntrix.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileTagsController : Controller
    {
        private readonly IFileTagsRepository _fileTagsRepository;

        public FileTagsController(IFileTagsRepository fileTagsRepository)
        {
            _fileTagsRepository = fileTagsRepository;
        }



        [HttpGet("/GetFileTags/{fileId}")]
        public IActionResult GetFoldersByUserId(int fileId)
        {
            if (fileId == null)
            {
                return BadRequest();
            }
            var fileTag = _fileTagsRepository.GetFileTagsByFileId(fileId);
            if (fileTag == null)
            {
                return NotFound($"{fileId} Not Found!");
            }
            return Ok(fileTag);

        }



        [HttpPost("/AddFileTag")]
        public IActionResult AddFileTags(FileTags fileTag)
        {
            _fileTagsRepository.AddFileTag(fileTag);
            return Created("", fileTag);
        }



        [HttpDelete("DeleteFileTagById/{id}")]
        public IActionResult Delete(int id)
        {
            _fileTagsRepository.DeleteFileTag(id);
            return NoContent();
        }


    }
}
