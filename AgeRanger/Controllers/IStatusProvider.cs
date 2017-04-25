namespace AgeRanger.Controllers
{
    public interface IStatusProvider
    {
        int GetStatus(DataOperationStatus state);
    }
}