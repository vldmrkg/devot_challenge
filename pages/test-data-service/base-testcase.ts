interface BaseInput { }
interface BaseOutput { }

interface BaseTestCase<I extends BaseInput, O extends BaseOutput> {
  testName: string;
  input: I;
  expectedOutput: O;
  // Optional field to support variations
  variations?: Array<Partial<BaseTestCase<I, O>>>;
}

// eslint-disable-next-line
interface BaseTestVariations<I extends BaseInput, O extends BaseOutput> {
  testName: string;
  input: I;
  expectedOutput: O;
  // Optional field to support variations
  variations: Array<Partial<BaseTestCase<I, O>>>;
}