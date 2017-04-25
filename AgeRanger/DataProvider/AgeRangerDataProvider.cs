using AgeRanger.Model;
using System.Collections.Generic;
using System.Linq;
using AgeRanger.Controllers;
using System;
using System.Linq.Expressions;

namespace AgeRanger.DataProvider
{
    public sealed class AgeRangerDataProvider : IDataProvider
    {
        private IAgeRangeContext _ctx;
        private IQueryable<AgeGroup> _ageGroup;
        
        public AgeRangerDataProvider(IAgeRangeContext ctx)
        {
            _ctx = ctx;
        }

        public DataOperationStatus AddPerson(Person person)
        {
            var addPeronResult = DataOperationStatus.Init;

            if (person == null)
                return DataOperationStatus.ValidationError;
            try
            {
                _ctx.Person.Add(person);
                var saveResult = _ctx.SaveChanges();
                addPeronResult = saveResult > 0 ? DataOperationStatus.RecordAddSuccess : DataOperationStatus.NoRecordAdded;
            }
            catch (Exception e)
            {
                var message = e.Message;
                addPeronResult = DataOperationStatus.DatabaseError;
            }
            return addPeronResult;
        }

        public IEnumerable<PersonListModel> List(int offset, int pageSize)
        {
            PreLoadAgeGroup();

            var result = _ctx.Person.Select(p => new PersonListModel
            {
                Age = p.Age,
                FirstName = p.FirstName,
                LastName = p.LastName,
                AgeGroup = _ageGroup.Where(age => p.Age >= age.MinAge && p.Age <= age.MaxAge).Select(x => x.Description).FirstOrDefault()
            });

            return result.Skip(offset).Take(pageSize);
        }

        public IEnumerable<PersonListModel> Search(string firstname, string lastname)
        {
            PreLoadAgeGroup();

            var result = _ctx.Person.Where(SearchBy(firstname, lastname)).Select(p => new PersonListModel
            {
                Age = p.Age,
                FirstName = p.FirstName,
                LastName = p.LastName,
                AgeGroup = _ageGroup.Where(age => p.Age >= age.MinAge && p.Age <= age.MaxAge).Select(x => x.Description).FirstOrDefault()
            });

            return result?.ToList().Take(10);
        }

        private static Expression<Func<Person, bool>> SearchBy(string firstname, string lastname)
        {   

            Expression<Func<Person, bool>> myExpression = null;

            if (!string.IsNullOrEmpty(firstname) && !string.IsNullOrEmpty(lastname))
                myExpression = (p) =>
                string.Equals(p.FirstName, firstname, StringComparison.OrdinalIgnoreCase) &&
                string.Equals(p.LastName, lastname, StringComparison.OrdinalIgnoreCase);

            else if (!string.IsNullOrEmpty(firstname))
                myExpression = (p) => string.Equals(p.FirstName, firstname, StringComparison.OrdinalIgnoreCase);

            else if (!string.IsNullOrEmpty(lastname))
                myExpression = (p) => string.Equals(p.LastName, lastname, StringComparison.OrdinalIgnoreCase);

            else
                myExpression = (p) => true;

            return myExpression;
        }

        private void PreLoadAgeGroup()
        {
            if (_ageGroup == null)
            {
                _ageGroup = _ctx.AgeGroup.GroupBy(r => r.Id).Select(
                 group => new AgeGroup
                 {
                     Id = group.Key,
                     MinAge = group.Min(t => t.MinAge),
                     MaxAge = group.Max(t => t.MaxAge == null ? int.MaxValue: t.MaxAge),
                     Description = group.Select(t => t.Description).FirstOrDefault()
                 });
            }
        }
    }
}
