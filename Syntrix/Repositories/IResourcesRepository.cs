using Syntrix.Models;

namespace Syntrix.Repositories
{
    public interface IResourcesRepository
    {
        void AddResource(Resources resource);
        void DeleteResource(int id);
        List<Resources> GetResourcesByUserId(int userId);
        void UpdateResource(ResourcesEditView resource);
    }
}