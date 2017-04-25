using Microsoft.VisualStudio.TestTools.UnitTesting;
using AgeRanger.Controllers;
using NSubstitute;
using AgeRanger.DataProvider;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using AgeRanger.Model;
using System.Collections.Generic;

namespace AgeRangerTest
{
    [TestClass]
    public class PersonControlllerTest : TestBase
    {
        [TestMethod]
        public void ControllerAddSuccess()
        {
            var context = Substitute.For<AgeRangerContext>();
            context.SaveChanges().Returns(1);

            var target = new PersonController(context, new
                HttpStatusMapper(HttpStatusMapper.HttpStatusList), appConfigMock);
            var statusResult = target.Add(ShannonPerson);

            var result = (StatusCodeResult)statusResult;
            Assert.IsTrue(result.StatusCode == HttpCreated);
        }

        [TestMethod]
        public void ControllerNoRecordAdded()
        {
            var context = Substitute.For<AgeRangerContext>();
            context.SaveChanges().Returns(0);

            var target = new PersonController(context, new
                HttpStatusMapper(HttpStatusMapper.HttpStatusList), appConfigMock);
            var statusResult = target.Add(ShannonPerson);

            var result = (StatusCodeResult)statusResult;
            Assert.IsTrue(result.StatusCode == HttpStatusOk);
        }

        [TestMethod]
        public void ControllerListOk()
        {
            var context = Substitute.For<ResultReturningFakeControllerContext>();

            var target = new PersonController(context, new
                HttpStatusMapper(HttpStatusMapper.HttpStatusList), appConfigMock);

            var statusResult = target.List(0);

            var result = ((JsonResult)statusResult).Value as IEnumerable<PersonListModel>;

            Assert.IsTrue(result.Count() > 0);
            Assert.IsTrue(result.Where(a => a.FirstName == MarkPerson.FirstName).FirstOrDefault().AgeGroup == TolderAgeGroupType);
            Assert.IsTrue(result.Where(a => a.FirstName == JohnathanPerson.FirstName).FirstOrDefault().AgeGroup == ChildAgeGroupType);
        }

        [TestMethod]
        public void ControllerList_NoResult()
        {
            var context = Substitute.For<NoResultReturningFakeControllerContext>();
            var target = new PersonController(context, new
                HttpStatusMapper(HttpStatusMapper.HttpStatusList), appConfigMock);

            var statusResult = target.List(0);
            var result = ((JsonResult)statusResult).Value as IEnumerable<PersonListModel>;
            Assert.IsTrue(result.Count() == 0);
        }

        [TestMethod]
        public void ControllerSearch_FirstName_WithResult()
        {
            var context = Substitute.For<ResultReturningFakeControllerContext>();
            var target = new PersonController(context, new
                HttpStatusMapper(HttpStatusMapper.HttpStatusList), appConfigMock);

            var statusResult = target.Search(context.ShannonPerson.FirstName, null);
            var result = ((JsonResult)statusResult).Value as IEnumerable<PersonListModel>;
            Assert.IsTrue(result.Count() > 0);
        }

        [TestMethod]
        public void ControllerSearch_FirstName_NoResult()
        {
            var context = Substitute.For<ResultReturningFakeControllerContext>();
            var target = new PersonController(context, new
                HttpStatusMapper(HttpStatusMapper.HttpStatusList), appConfigMock);

            var statusResult = target.Search(context.InvalidPerson.FirstName, null);
            var result = ((JsonResult)statusResult).Value as IEnumerable<PersonListModel>;
            Assert.IsTrue(result.Count() == 0);
        }

        [TestMethod]
        public void ControllerSearch_LastName_WithResult()
        {
            var context = Substitute.For<ResultReturningFakeControllerContext>();
            var target = new PersonController(context, new
                HttpStatusMapper(HttpStatusMapper.HttpStatusList), appConfigMock);

            var statusResult = target.Search(null, context.ShannonPerson.LastName);
            var result = ((JsonResult)statusResult).Value as IEnumerable<PersonListModel>;
            Assert.IsTrue(result.Count() > 0);
        }

        [TestMethod]
        public void ControllerSearch_LastName_NoResult()
        {
            var context = Substitute.For<ResultReturningFakeControllerContext>();
            var target = new PersonController(context, new
                HttpStatusMapper(HttpStatusMapper.HttpStatusList), appConfigMock);

            var statusResult = target.Search(null, context.InvalidPerson.LastName);
            var result = ((JsonResult)statusResult).Value as IEnumerable<PersonListModel>;
            Assert.IsTrue(result.Count() == 0);
        }

        [TestMethod]
        public void ControllerSearch_FirstName_LastName_WithResult()
        {
            var context = Substitute.For<ResultReturningFakeControllerContext>();
            var target = new PersonController(context, new
                HttpStatusMapper(HttpStatusMapper.HttpStatusList), appConfigMock);

            var statusResult = target.Search(context.ShannonPerson.FirstName, context.ShannonPerson.LastName);
            var result = ((JsonResult)statusResult).Value as IEnumerable<PersonListModel>;

            Assert.IsTrue(result.Count() > 0);

            Assert.AreEqual(context.ShannonPerson.FirstName, result.FirstOrDefault().FirstName);
            Assert.AreEqual(context.ShannonPerson.LastName, result.FirstOrDefault().LastName);
            Assert.AreEqual(context.ShannonPerson.Age, result.FirstOrDefault().Age);
            Assert.AreEqual(TestBase.TeenAgeGroupType, result.FirstOrDefault().AgeGroup);
        }

        [TestMethod]
        public void ControllerSearch_FirstName_LastName_NoResult()
        {
            var context = Substitute.For<ResultReturningFakeControllerContext>();
            var target = new PersonController(context, new
                HttpStatusMapper(HttpStatusMapper.HttpStatusList), appConfigMock);

            var statusResult = target.Search(context.InvalidPerson.FirstName, context.InvalidPerson.LastName);
            var result = ((JsonResult)statusResult).Value as IEnumerable<PersonListModel>;
            Assert.IsTrue(result.Count() == 0);
        }
    }
}


