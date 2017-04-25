using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AgeRanger.Config
{
    public class AppConstants
    {
        public const string DataConnectionConfiguration = "Data:DefaultConnection:Database";
        public const string AppSettingsJson = "appsettings.json";
        public const string AppConfigurationLoggingSection = "Logging";


        public const string CorsOriginHost = "http://localhost:3000";
        public const string CorsPolicyName = "DevCorsPolicy";
    }
}
