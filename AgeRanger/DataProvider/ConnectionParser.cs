using System.Text;

namespace AgeRanger.DataProvider
{
    public class ConnectionParser
    {
        private const string DataSourceSqlite = "Data Source=";

        public static string ParseConnectionString(string appPath, string datasource)
        {
            return new StringBuilder().Append(DataSourceSqlite).Append(appPath)
                .Append(System.IO.Path.DirectorySeparatorChar).Append(datasource).ToString();
        }
    }
}
