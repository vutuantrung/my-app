const db = require('../database/db');
const idolService = require('../services/idol.service.database');

const testIdols = [
	{
		name: "Test Idol A",
		dob: "1990-01-01",
		measurements: "80-60-85",
		height: 160,
		country: "JP",
		cup: "C",
		movies_count: 0,
		note: "unit test",
		favorite: "yes",
		jp: "テスト",
		my_favorite: 1,
		created_time: Date.now(),
		updated_time: Date.now(),
		metadata: "{}"
	}
];

beforeAll(async () => {
	await idolService.createIdols(testIdols);
});

afterAll(done => {
	db.run(`DELETE FROM idol_profile WHERE name = ?`, ["Test Idol A"], done);
});

test("Search by name", async () => {
	const result = await idolService.searchIdolsByNames("Test Idol A");
	expect(result.data.length).toBeGreaterThan(0);
	expect(result.data[0].name).toBe("Test Idol A");
});

test("Search by favorite", async () => {
	const result = await idolService.searchIdolByFavorite("yes");
	expect(result.data.find(i => i.name === "Test Idol A")).toBeTruthy();
});

test("Search by note", async () => {
	const result = await idolService.searchIdolByNote("unit test");
	expect(result.data.find(i => i.name === "Test Idol A")).toBeTruthy();
});

test("Search by my_favorite", async () => {
	const result = await idolService.searchIdolByMyFavorite();
	expect(result.data.find(i => i.name === "Test Idol A")).toBeTruthy();
});

test("Update idol", async () => {
	const updated = { note: "updated note" };
	const res = await idolService.updateIdolByName("Test Idol A", new Map(Object.entries(updated)));
	expect(res).toBe(true);
});

test("Delete idol", async () => {
	const insertIdol = { ...testIdols[0], name: "Test Idol B" };
	await idolService.createIdols([insertIdol]);
	const toDelete = await idolService.searchIdolsByNames("Test Idol B");
	const id = toDelete.data[0].id;
	const res = await idolService.deleteIdolById(id);
	expect(res).toBe(true);
});
