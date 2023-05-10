import { ValueObject } from "./value-object";

describe("ValueObject", () => {
  describe("when creating a value object", () => {
    it("throws an error if violating the immutability principle", () => {
      class Name extends ValueObject<{ firstName: string; lastName: string }> {
        constructor(props: { firstName: string; lastName: string }) {
          super(props);
        }
      }

      const name = new Name({ firstName: "John", lastName: "Doe" }) as any;

      expect(() => {
        name.props.firstName = "Jane";
      }).toThrowError();
    });
  });

  describe("when comparing two value objects", () => {
    it("returns true if they are equal", () => {
      class Name extends ValueObject<{ firstName: string; lastName: string }> {
        constructor(props: { firstName: string; lastName: string }) {
          super(props);
        }
      }

      const name1 = new Name({ firstName: "John", lastName: "Doe" });
      const name2 = new Name({ firstName: "John", lastName: "Doe" });

      expect(name1.equals(name2)).toBe(true);
    });
  });
});
