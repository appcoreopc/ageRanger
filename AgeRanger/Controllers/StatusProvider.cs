using System.Collections.Generic;

namespace AgeRanger.Controllers
{
    public class HttpStatusMapper : IStatusProvider
    {
        private IDictionary<DataOperationStatus, int> _statusMapper;

        public static Dictionary<DataOperationStatus, int> HttpStatusList = new Dictionary<DataOperationStatus, int>()
        {
            { DataOperationStatus.DatabaseError, 501},
            { DataOperationStatus.RecordAddSuccess, 201},
            { DataOperationStatus.RecordAddDuplicate, 409},
            { DataOperationStatus.ValidationError, 422},
            { DataOperationStatus.NoRecordAdded, 200 }
        };
        
        public HttpStatusMapper(IDictionary<DataOperationStatus, int> statusMapper)
        {
            _statusMapper = statusMapper;
        }

        public int GetStatus(DataOperationStatus state)
        {
            int statusCode = -1;
            var result = _statusMapper.TryGetValue(state, out statusCode);
            return result == true ? statusCode : 500; 
        }
    }
}
