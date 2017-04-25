using NSubstitute;
using AgeRanger.DataProvider;
using System.Linq;
using AgeRanger.Model;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace AgeRangerTest
{
    public class NoResultReturningFakeControllerContext : AgeRangerContext, IAgeRangeContext
    {

        DbSet<AgeGroup> ageGroupSetMock;

        DbSet<Person> personSetMock;

        public NoResultReturningFakeControllerContext()
        {
            var personList = new List<Person>
            {
            }.AsQueryable();

            var ageGroupList = new List<AgeGroup>
            {
                new AgeGroup { Id = 1, Description = "Toddler", MinAge = 0, MaxAge = 2 },
                new AgeGroup { Id = 2, Description = "Child", MinAge = 2, MaxAge = 14 },
                new AgeGroup { Id = 3, Description = "Teenager", MinAge = 14, MaxAge = 20 },
            }.AsQueryable();

            personSetMock = Substitute.For<DbSet<Person>, IQueryable<Person>>();
            ((IQueryable<Person>)personSetMock).Provider.Returns(personList.Provider);
            ((IQueryable<Person>)personSetMock).Expression.Returns(personList.Expression);
            ((IQueryable<Person>)personSetMock).ElementType.Returns(personList.ElementType);
            ((IQueryable<Person>)personSetMock).GetEnumerator().Returns(personList.GetEnumerator());

            ageGroupSetMock = Substitute.For<DbSet<AgeGroup>, IQueryable<AgeGroup>>();
            ((IQueryable<AgeGroup>)ageGroupSetMock).Provider.Returns(ageGroupList.Provider);
            ((IQueryable<AgeGroup>)ageGroupSetMock).Expression.Returns(ageGroupList.Expression);
            ((IQueryable<AgeGroup>)ageGroupSetMock).ElementType.Returns(ageGroupList.ElementType);
            ((IQueryable<AgeGroup>)ageGroupSetMock).GetEnumerator().Returns(ageGroupList.GetEnumerator());

        }

        public DbSet<Person> Person
        {
            get
            {
                return personSetMock;
            }
        }

        public DbSet<AgeGroup> AgeGroup
        {
            get
            {
                return ageGroupSetMock;
            }
        }
    }
}


