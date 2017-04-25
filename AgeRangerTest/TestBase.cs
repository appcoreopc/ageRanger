using NSubstitute;
using AgeRanger.DataProvider;
using AgeRanger.Model;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using AgeRanger;
using AgeRanger.Config;

namespace AgeRangerTest
{
    public class TestBase
    {
        protected IAgeRangeContext mockContext;

        protected static int HttpStatusOk = 200;

        protected static int HttpCreated = 201;

        protected AgeRangerDataProvider ageRangeDataProvider;

        protected IQueryable<Person> personList;

        protected IQueryable<AgeGroup> ageGroupList;

        protected static Person ShannonPerson = new Person { Id = 3, FirstName = "Shannon", LastName = "Dorathy", Age = 20 };

        protected static Person JohnathanPerson = new Person { Id = 3, FirstName = "Johnathan", LastName = "McCurdy", Age = 14 };

        protected static Person MarkPerson = new Person { Id = 3, FirstName = "Mark", LastName = "Lee", Age = 2 };

        protected static Person InvalidPerson = new Person { Id = 3, FirstName = "InvalidFirstname", LastName = "InvalidLastname" };

        protected static Person MarkHughes = new Person { Id = 3, FirstName = "Mark", LastName = "Hughes" };

        public const string TolderAgeGroupType = "Toddler";

        public const string ChildAgeGroupType = "Child";

        public const string TeenAgeGroupType = "Teenager";

        protected IOptions<AppModuleConfig> appConfigMock = Options.Create(new AppModuleConfig
        {
            Defaults = new Defaults
            {
                PageSize = 10
            }
        });

        
        protected void InitTestCase()
        {
            personList = new List<Person>
            {
                MarkPerson,
                JohnathanPerson,
                ShannonPerson
            }.AsQueryable();

            ageGroupList = new List<AgeGroup>
            {
                new AgeGroup { Id = 1, Description = TolderAgeGroupType, MinAge = 0, MaxAge = 2 },
                new AgeGroup { Id = 2, Description = ChildAgeGroupType, MinAge = 2, MaxAge = 14 },
                new AgeGroup { Id = 3, Description = TeenAgeGroupType, MinAge = 14, MaxAge = 20 },
            }.AsQueryable();

            var personSetMock = Substitute.For<DbSet<Person>, IQueryable<Person>>();
            ((IQueryable<Person>)personSetMock).Provider.Returns(personList.Provider);
            ((IQueryable<Person>)personSetMock).Expression.Returns(personList.Expression);
            ((IQueryable<Person>)personSetMock).ElementType.Returns(personList.ElementType);
            ((IQueryable<Person>)personSetMock).GetEnumerator().Returns(personList.GetEnumerator());

            var ageGroupSetMock = Substitute.For<DbSet<AgeGroup>, IQueryable<AgeGroup>>();
            ((IQueryable<AgeGroup>)ageGroupSetMock).Provider.Returns(ageGroupList.Provider);
            ((IQueryable<AgeGroup>)ageGroupSetMock).Expression.Returns(ageGroupList.Expression);
            ((IQueryable<AgeGroup>)ageGroupSetMock).ElementType.Returns(ageGroupList.ElementType);
            ((IQueryable<AgeGroup>)ageGroupSetMock).GetEnumerator().Returns(ageGroupList.GetEnumerator());

            mockContext = Substitute.For<IAgeRangeContext>();
            ageRangeDataProvider = new AgeRangerDataProvider(mockContext);

            mockContext.AgeGroup.Returns(ageGroupSetMock);
            mockContext.Person.Returns(personSetMock);

        }
    }
}
