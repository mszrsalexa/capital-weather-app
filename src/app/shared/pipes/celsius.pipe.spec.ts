import { CelsiusPipe } from './celsius.pipe';

describe('CelsiusPipe', () => {
  let pipe: CelsiusPipe;

  beforeEach(() => {
    pipe = new CelsiusPipe();
  });

  it('create an instance', () => {
    const pipe = new CelsiusPipe();
    expect(pipe).toBeTruthy();
  });

  it('should transform a number to a rounded string with the degree symbol', () => {
    const result = pipe.transform(25.5);
    expect(result).toBe('26°');
  });

  it('should transform a string to a rounded string with the degree symbol', () => {
    const result = pipe.transform('15.8');
    expect(result).toBe('16°');
  });

  it('should handle undefined input', () => {
    const result = pipe.transform(undefined);
    expect(result).toBe('');
  });

  it('should handle non-numeric input', () => {
    const result = pipe.transform('abc');
    expect(result).toBe('abc°');
  });
});
