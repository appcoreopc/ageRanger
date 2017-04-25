using Microsoft.VisualStudio.TestTools.UnitTesting;
using NSubstitute;
using AgeRanger.DataProvider;
using AgeRanger.Model;
using AgeRanger.Controllers;
using System.Linq;

namespace AgeRangerTest
{
    [TestClass]
    public class AgeRangerDataProviderTest : TestBase
    {        
        [TestInitializeAttribute]
        public void TestCaseInit()
        {
            InitTestCase();
        }

        [TestMethod]
        public void AddPersonNull()
        {
            var result = ageRangeDataProvider.AddPerson(null);
            Assert.AreEqual(result, DataOperationStatus.ValidationError);
            mockContext.DidNotReceive().SaveChanges();
        }

        [TestMethod]
        public void AddPersonSuccessful()
        {
            mockContext.SaveChanges().Returns(1);

            ageRangeDataProvider = new AgeRangerDataProvider(mockContext);
            var result = ageRangeDataProvider.AddPerson(MarkHughes);

            Assert.AreEqual(result, DataOperationStatus.RecordAddSuccess);
        }

        [TestMethod]
        public void AddPersonFailed()
        {
            mockContext.SaveChanges().Returns(0);
            ageRangeDataProvider = new AgeRangerDataProvider(mockContext);
            var result = ageRangeDataProvider.AddPerson(InvalidPerson);
            Assert.AreEqual(result, DataOperationStatus.NoRecordAdded);
        }

        [TestMethod]
        public void ListPerson()
        {
            var result = ageRangeDataProvider.List(0, 10);
            Assert.IsTrue(result.Count() > 0);
            Assert.IsTrue(result.Where(a => a.FirstName == MarkPerson.FirstName).FirstOrDefault().AgeGroup == TolderAgeGroupType);
            Assert.IsTrue(result.Where(a => a.FirstName == JohnathanPerson.FirstName).FirstOrDefault().AgeGroup == ChildAgeGroupType);
        }

        [TestMethod]
        public void SearchByFirstname()
        {
            var result = ageRangeDataProvider.Search(ShannonPerson.FirstName, null);
            Assert.IsTrue(result.Count() > 0);
            Assert.AreEqual(result.FirstOrDefault().FirstName, ShannonPerson.FirstName);
            Assert.AreEqual(result.FirstOrDefault().LastName, ShannonPerson.LastName);

        }

        [TestMethod]
        public void SearchByLastname()
        {
            var result = ageRangeDataProvider.Search(null, JohnathanPerson.LastName);
            Assert.IsTrue(result.Count() > 0);
            Assert.AreEqual(result.FirstOrDefault().FirstName, JohnathanPerson.FirstName);
            Assert.AreEqual(result.FirstOrDefault().LastName, JohnathanPerson.LastName);
        }

        [TestMethod]
        public void SearchByNullReturnsAll()
        {
            var result = ageRangeDataProvider.Search(null, null);
            Assert.IsTrue(result.Count() == 3);
        }
    }
}
