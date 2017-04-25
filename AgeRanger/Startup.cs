using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using AgeRanger.DataProvider;
using AgeRanger.Controllers;
using AgeRanger.Config;

namespace AgeRanger
{
    public class Startup
    {
        private IHostingEnvironment _env;

        public IConfigurationRoot Configuration { get; }

        public Startup(IHostingEnvironment env)
        {
            _env = env;

            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile(AppConstants.AppSettingsJson, optional: false, reloadOnChange: true)
                .AddJsonFile($"{AppConstants.AppSettingsJson}.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            services.AddMvc();

            services.AddOptions();

            services.Configure<AppModuleConfig>(Configuration);

            var datasource = Configuration[AppConstants.DataConnectionConfiguration];
            var connection = ConnectionParser.ParseConnectionString(_env.ContentRootPath, datasource);

            services.AddEntityFrameworkSqlite().AddDbContext<AgeRangerContext>(options => options.UseSqlite(connection));

            services.AddSingleton(new HttpStatusMapper(
                HttpStatusMapper.HttpStatusList));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            _env = env;

            loggerFactory.AddConsole(Configuration.GetSection(AppConstants.AppConfigurationLoggingSection));
            loggerFactory.AddDebug();

            app.UseMvc();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "api/{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
