const { expect } = require("chai");
const { kelvinChecker } = require("../utils/KelvinChecker");
const { secondsToLocalTime } = require("../utils/SecondsToLocalTime");

describe("secondsToLocalTime", () => {
  it("returns the sunrise time in a readable format when passed a set of seconds", () => {
    const seconds = 1588997897;
    const actual = secondsToLocalTime(seconds);
    const expected = "05:18:17";
    expect(actual).to.eql(expected);
  });
  it("returns the sunset time in a readable format when passed a set of seconds", () => {
    const seconds = 1589054005;
    const actual = secondsToLocalTime(seconds);
    const expected = "20:53:25";
    expect(actual).to.eql(expected);
  });
});

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
