﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Syntrix.Models;
using Syntrix.Repositories;
using BCrypt.Net;
using Microsoft.AspNetCore.Authorization;

namespace Syntrix.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FoldersController : Controller
    {
        private readonly IFoldersRepository _foldersRepository;

        public FoldersController(IFoldersRepository foldersRepository)
        {
            _foldersRepository = foldersRepository;
        }


        [HttpGet("/GetFolders/{userId}")]
        public IActionResult GetFoldersByUserId(int userId)
        {
            if (userId == null)
            {
                return BadRequest();
            }
            var folder = _foldersRepository.GetFoldersByUserId(userId);
            if (folder == null)
            {
                return NotFound($"{userId} Not Found!");
            }
            return Ok(folder);

        }


        [HttpGet("/GetBookmarkedFolders/{userId}")]
        public IActionResult GetFoldersByUserIdThatAreBookmarked(int userId)
        {
            if (userId == null)
            {
                return BadRequest();
            }
            var folder = _foldersRepository.GetFoldersByUserIdThatAreBookmarked(userId);
            if (folder == null)
            {
                return NotFound($"{userId} Not Found!");
            }
            return Ok(folder);

        }


        [HttpPost("/AddFolder")]
        public IActionResult AddFolder(FolderAdd folder)
        {
            _foldersRepository.AddFolder(folder);
            return Created("", folder);
        }



        [HttpPost("/EditFolder/{id}")]
        public IActionResult UpdateFolder(int id, FoldersEditView folder)
        {
            if (id != folder.Id)
            {
                return BadRequest();
            }

            _foldersRepository.UpdateFolder(folder);
            return Ok(folder);
        }



        [HttpPost("DeleteFolderById/{id}")]
        public IActionResult Delete(int id)
        {
            _foldersRepository.DeleteFolder(id);
            return Ok(id);
        }


    }
}
