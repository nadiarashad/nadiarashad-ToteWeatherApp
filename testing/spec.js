const { expect } = require("chai");
const { kelvinChecker } = require("../utils/WeatherChecker");

describe("kelvinChecker", () => {
  it("rounds the number to the nearest whole number", () => {
    const tempToCheck = 29.3;
    const actual = kelvinChecker(tempToCheck);
    const expected = 29;
    expect(actual).to.eql(expected);
  });

  it("returns the temperature when passed anything below 49", () => {
    const tempToCheck = 49;
    const actual = kelvinChecker(tempToCheck);
    const expected = 49;
    expect(actual).to.eql(expected);
  });
  it("returns a kelvin temperature converted to celsius ", () => {
    const tempToCheck = 293;
    const actual = kelvinChecker(tempToCheck);
    const expected = 20;
    expect(actual).to.eql(expected);
  });
});
