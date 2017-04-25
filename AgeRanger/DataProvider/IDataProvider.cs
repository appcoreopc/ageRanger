using AgeRanger.Controllers;
using AgeRanger.Model;
using System.Collections.Generic;

namespace AgeRanger.DataProvider
{
    public interface IDataProvider
    {
        DataOperationStatus AddPerson(Person person);

        IEnumerable<PersonListModel> List(int offset, int pageSize);

        IEnumerable<PersonListModel> Search(string firstname, string lastname);
    }
}
