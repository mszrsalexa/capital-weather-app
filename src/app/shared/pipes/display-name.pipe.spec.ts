import { DisplayNamePipe } from './display-name.pipe';

describe('DisplayNamePipe', () => {
  let pipe: DisplayNamePipe;

  beforeEach(() => {
    pipe = new DisplayNamePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform value to display name', () => {
    const value = 'capitals_title';
    const transformedValue = pipe.transform(value);
    expect(transformedValue).toEqual('Capitals');
  });

  it('should return original value if display name is not found', () => {
    const value = 'test';
    const transformedValue = pipe.transform(value);
    expect(transformedValue).toEqual(value);
  });
});
