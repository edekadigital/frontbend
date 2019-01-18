export interface IConfigTestCase {
  data: any;
  expectError?: boolean;
  expectResult?: any;
}

export interface IConfigTest {
  name: string;
  testCases: IConfigTestCase[];
}
