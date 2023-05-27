using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Syntrix.Models;
using Syntrix.Repositories;
using BCrypt.Net;
using Microsoft.AspNetCore.Authorization;
using Azure;

namespace Syntrix.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TagsController : Controller
    {
        private readonly ITagsRepository _tagsRepository;

        public TagsController(ITagsRepository tagsRepository)
        {
            _tagsRepository = tagsRepository;
        }


        [HttpGet("/GetTags/{userId}")]
        public IActionResult GetTagsByUserId(int userId)
        {
            if (userId == null)
            {
                return BadRequest();
            }
            var tag = _tagsRepository.GetTagsByUserId(userId);
            if (tag == null)
            {
                return NotFound($"{userId} Not Found!");
            }
            return Ok(tag);

        }



        [HttpPost("/AddTag")]
        public IActionResult AddFolder(Tags tag)
        {
            _tagsRepository.AddTag(tag);
            return Created("", tag);
        }



        [HttpPost("/EditTag/{id}")]
        public IActionResult UpdateTag(int id, TagsEditView tag)
        {
            if (id != tag.Id)
            {
                return BadRequest();
            }

            _tagsRepository.UpdateTag(tag);
            return Ok(tag);
        }



        [HttpPost("DeleteTagById/{id}")]
        public IActionResult Delete(int id)
        {
            _tagsRepository.DeleteTag(id);
            return Ok(id);
        }


    }
}
