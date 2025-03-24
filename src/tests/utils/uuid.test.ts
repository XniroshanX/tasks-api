import { generateUuid } from "../../utils/crypto";
import { randomUUID } from "crypto";

jest.mock("crypto", () => ({
  randomUUID: jest.fn(),
}));

describe("generateUuid", () => {
  it("should generate a UUID using crypto.randomUUID", () => {
    const mockUuid = "123e4567-e89b-12d3-a456-426614174000";
    (randomUUID as jest.Mock).mockReturnValue(mockUuid);

    const result = generateUuid();

    expect(randomUUID).toHaveBeenCalledTimes(1);
    expect(result).toBe(mockUuid);
  });
});
