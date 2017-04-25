
namespace AgeRanger.Controllers
{
    public enum DataOperationStatus
    {
        Init,
        DatabaseError,
        RecordAddSuccess,
        NoRecordAdded,
        RecordAddDuplicate,
        ValidationError
    }
}
