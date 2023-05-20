using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Syntrix.Models;
using Syntrix.Repositories;
using BCrypt.Net;
using Microsoft.AspNetCore.Authorization;

namespace Syntrix.Controllers
{
    public class FilesController : Controller
    {
        private readonly IFilesRepository _filesRepository;

        public FilesController(IFilesRepository filesRepository)
        {
            _filesRepository = filesRepository;
        }


        [HttpGet("/GetFiles/{folderId}")]
        public IActionResult GetFoldersByUserId(int folderId)
        {
            if (folderId == null)
            {
                return BadRequest();
            }
            var file = _filesRepository.GetFilesByFolderId(folderId);
            if (file == null)
            {
                return NotFound($"{folderId} Not Found!");
            }
            return Ok(file);

        }


        [HttpPost("/AddFile")]
        public IActionResult AddFile(Files file)
        {
            _filesRepository.AddFile(file);
            return Created("", file);
        }


        [HttpPut("/EditFile/{id}")]
        public IActionResult UpdateFile(int id, FilesEditView file)
        {
            if (id != file.Id)
            {
                return BadRequest();
            }

            _filesRepository.UpdateFile(file);
            return NoContent();
        }


        [HttpDelete("DeleteFileById/{id}")]
        public IActionResult Delete(int id)
        {
            _filesRepository.DeleteFile(id);
            return NoContent();
        }
    }
}
