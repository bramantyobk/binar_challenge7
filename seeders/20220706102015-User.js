"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			"Users",
			[
				{
					username: "admin",
					password:
						"$2b$10$efrQvjybZl1qdIJCsQTvC.ev7OUA62/RoYhEPJvrKSdW6eN8gxyCe",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					username: "bramantyo",
					password:
						"$2b$10$dseHSBiUOdZmED1f2.0gqeYK55yHLgR4XvvwfL5X1/aHNNYxoE5qO",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					username: "bayu",
					password:
						"$2b$10$/RFdDH8OQvdzKxYbJQJU7.Q9SZB8bbvsM6PgB./fOa.pH7NCOZZ5W",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					username: "kusumo",
					password:
						"$2b$10$FxY1CEL2AnJSQY52SoHP7upRIP.4n7cEAI98AhPR0IjvtCs04MxU2",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete("Users", null, {});
	},
};
