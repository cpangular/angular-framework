
export class BreakpointUtil {

  public static eq(cmpResult: number): boolean {
    return cmpResult === 0;
  }

  public static not(cmpResult: number): boolean {
    return cmpResult !== 0;
  }

  public static lt(cmpResult: number): boolean {
    return cmpResult === -1;
  }

  public static ltEq(cmpResult: number): boolean {
    return cmpResult !== 1;
  }

  public static gt(cmpResult: number): boolean {
    return cmpResult === 1;
  }

  public static gtEq(cmpResult: number): boolean {
    return cmpResult !== -1;
  }

}
