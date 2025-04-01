/**
 * Service class for managing test data.
 * 
 * This class stores an array of test cases and provides a method to retrieve
 * a specific test case by its name. If the requested test case is not found,
 * an error is thrown.
 * 
 * @template I - The type of test input extending BaseInput.
 * @template O - The type of test output extending BaseOutput.
 */

export class TestDataService {
  private testData: BaseTestCase<BaseInput, BaseOutput>[];

  constructor(testData: BaseTestCase<BaseInput, BaseOutput>[]) {
    this.testData = testData;
  };

  getTestData<I extends BaseInput, O extends BaseOutput>(testName: string): BaseTestCase<I, O> {
    const testCase = this.testData.find(test => test.testName === testName);
    if (!testCase) {
      throw new Error(`Test data not found for test: ${testName}`);
    }
    return testCase as BaseTestCase<I, O>;
  };

  
};