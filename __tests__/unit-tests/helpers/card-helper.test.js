import { getCardValue } from "../../../src/helpers/card-helper";

describe("get card value", () => {
    it("should return zero when input invalid card", () => {
        expect(getCardValue(null)).toEqual(0);
    });

    it("show return zero when card greater than 8", () => {
        expect(getCardValue({ card: 9, type: 0 })).toEqual(0);
    });

    it("show return correct value when card less than 8", () => {
        expect(getCardValue({ card: 8, type: 0 })).toEqual(9);
    });
});
