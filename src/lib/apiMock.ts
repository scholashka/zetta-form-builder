type AnyRecord = Record<string, any>;

type MockHandler = (input: AnyRecord) => Promise<AnyRecord>;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const handlers: Record<string, MockHandler> = {
    // Mock userProfile: accepts firstName and lastName, returns fullName and email
    async userProfile({ firstName, lastName }) {
        await sleep(300);
        if (!firstName || !lastName) return {};

        const fullName = `${firstName} ${lastName}`;
        const email =
            `${firstName}.${lastName}`
                .toLowerCase()
                .replace(/[^a-z0-9.]/g, "") + "@example.com";
        return {
            fullName,
            email,
        };
    },

    // Mock addressLookup: accepts zip and country, returns street, city, and region
    async addressLookup({ zip, country }) {
        await sleep(350);
        if (!zip || !country) return {};
        if (country === "Bulgaria" && zip === "9000") {
            return {
                street: "Varna Str 123",
                city: "Varna",
                region: "Bulgaria",
            };
        }
        if (country === "Japan" && zip === "12345") {
            return {
                street: "JPN St 456",
                city: "Tokyo",
                region: "Tokyo Prefecture",
            };
        }
        // Default fake address
        return {
            street: "456 Unknown St",
            city: "Unknown City",
            region: "Unknown Region",
        };
    },
};

export async function callMockApi(
    name: string,
    input: AnyRecord
): Promise<AnyRecord> {
    const fn = handlers[name];
    if (!fn) return {};
    return fn(input);
}
