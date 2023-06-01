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
    public class ResourcesController : Controller
    {
        private readonly IResourcesRepository _resourcesRepository;

        public ResourcesController(IResourcesRepository resourcesRepository)
        {
            _resourcesRepository = resourcesRepository;
        }



        [HttpGet("/GetResources/{userId}")]
        public IActionResult GetResourcesByUserId(int userId)
        {
            if (userId == null)
            {
                return BadRequest();
            }
            var resource = _resourcesRepository.GetResourcesByUserId(userId);
            if (resource == null)
            {
                return NotFound($"{userId} Not Found!");
            }
            return Ok(resource);

        }


        [HttpGet("/GetResource/{resourceId}")]
        public IActionResult GetResourceById(int resourceId)
        {
            if (resourceId == null)
            {
                return BadRequest();
            }
            var resource = _resourcesRepository.GetResourceById(resourceId);
            if (resource == null)
            {
                return NotFound($"{resourceId} Not Found!");
            }
            return Ok(resource);

        }


        [HttpPost("/AddResource")]
        public IActionResult AddResource(Resources resource)
        {
            _resourcesRepository.AddResource(resource);
            return Created("", resource);
        }



        [HttpPost("/EditResource/{id}")]
        public IActionResult UpdateResource(int id, ResourcesEditView resource)
        {
            if (id != resource.Id)
            {
                return BadRequest();
            }

            _resourcesRepository.UpdateResource(resource);
            return Ok(resource);
        }



        [HttpPost("DeleteResourceById/{id}")]
        public IActionResult Delete(int id)
        {
            _resourcesRepository.DeleteResource(id);
            return Ok(id);
        }



    }
}
