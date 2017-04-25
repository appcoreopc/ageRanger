using AgeRanger.Controllers;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;

namespace AgeRangerTest
{
    [TestClass]
    public class HttpStatusMapperTest
    {
        [TestMethod]
        public void HttpStatusMapper_ExpectedReturnCode()
        {
            var target = new HttpStatusMapper(HttpStatusMapper.HttpStatusList);

            var errorResult = target.GetStatus(DataOperationStatus.DatabaseError);
            Assert.IsTrue(errorResult == 501);

            var noRecordResult = target.GetStatus(DataOperationStatus.NoRecordAdded);
            Assert.IsTrue(noRecordResult == 200);

            var successRecordResult = target.GetStatus(DataOperationStatus.RecordAddSuccess);
            Assert.IsTrue(successRecordResult == 201);
        }

        [TestMethod]
        public void HttpStatusMapper_Http500Code()
        {
            var target = new HttpStatusMapper(HttpStatusMapper.HttpStatusList);
            var errorResult = target.GetStatus((DataOperationStatus) 100);
            Assert.IsTrue(errorResult == 500);

        }
    }
}

