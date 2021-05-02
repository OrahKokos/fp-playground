import { APP_NAME } from "@app/some-app";
import { someFn } from "@utils/some-util";

describe('Checking', () => {
  it("Should execute", () => {
    expect(someFn(APP_NAME)).toBe(APP_NAME)
  })
})