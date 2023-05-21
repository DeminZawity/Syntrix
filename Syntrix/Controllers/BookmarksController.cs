using Microsoft.AspNetCore.Mvc;
using Syntrix.Models;
using Syntrix.Repositories;

namespace Syntrix.Controllers
{
    public class BookmarksController : Controller
    {
        private readonly IBookmarksRepository _bookmarksRepository;

        public BookmarksController(IBookmarksRepository bookmarksRepository)
        {
            _bookmarksRepository = bookmarksRepository;
        }



        [HttpGet("/GetBookmarks/{userId}")]
        public IActionResult GetBookmarksByUserId(int userId)
        {
            if (userId == null)
            {
                return BadRequest();
            }
            var bookmark = _bookmarksRepository.GetBookmarksByUserId(userId);
            if (bookmark == null)
            {
                return NotFound($"{userId} Not Found!");
            }
            return Ok(bookmark);

        }



        [HttpPost("/AddBookmark")]
        public IActionResult AddBookmark(Bookmarks bookmark)
        {
            _bookmarksRepository.AddBookmark(bookmark);
            return Created("", bookmark);
        }



        [HttpDelete("DeleteBookmarkById/{id}")]
        public IActionResult Delete(int id)
        {
            _bookmarksRepository.DeleteBookmark(id);
            return NoContent();
        }


    }
}
