import { CompositionRoot } from "../composition/compositionRoot";
import { UserCommandBuilder } from "@dddforum/shared/tests/support/builders/userCommandBuilder";

describe("database", () => {
  const compositionRoot = CompositionRoot.createCompositionRoot("test");
  const db = compositionRoot.getDBConnection();

  it("can connect", async () => {
    await db.connect();
  });

  it("can write", async () => {
    const connection = db.getConnection();
    const createCommand = new UserCommandBuilder().withAllRandomDetails().build();
    const data = await connection.user.create({
      data: {
        ...createCommand,
        password: "123",
      },
    });

    expect(data).toBeDefined();
    expect(data.email).toEqual(createCommand.email);
  });
});
