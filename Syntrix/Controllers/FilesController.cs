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


        [HttpGet("/GetFile/{fileId}")]
        public IActionResult GetFileById(int fileId)
        {
            if (fileId == null)
            {
                return BadRequest();
            }
            var file = _filesRepository.GetFileById(fileId);
            if (file == null)
            {
                return NotFound($"{fileId} Not Found!");
            }
            return Ok(file);

        }


        [HttpGet("GetAllPublicFiles")]
        public IActionResult GetAll()
        {
            return Ok(_filesRepository.GetAllPublicFiles());
        }


        [HttpGet("SearchPublicFilesByName/{name}")]
        public IActionResult SearchPublicFilesByName(string name)
        {
            if (name == null)
            {
                return BadRequest();
            }
            var file = _filesRepository.SearchPublicFilesByName(name);
            if (file == null)
            {
                return NotFound($"{name} Not Found!");
            }
            return Ok(file);

        }


        [HttpPost("/AddFile")]
        public IActionResult AddFile(Files file)
        {
            _filesRepository.AddFile(file);
            return Created("", file);
        }


        [HttpPost("/EditFile/{id}")]
        public IActionResult UpdateFile(int id, FilesEditView file)
        {
            if (id != file.Id)
            {
                return Ok(file);
            }

            _filesRepository.UpdateFile(file);
            return Ok(file.Id);
        }


        [HttpPost("DeleteFileById/{id}")]
        public IActionResult Delete(int id)
        {
            _filesRepository.DeleteFile(id);
            return Ok(id);
        }
    }
}
