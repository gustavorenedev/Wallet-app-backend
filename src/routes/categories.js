const express = require("express");
const router = express.Router();
const db = require("../db");

const findOne = (id) => {
    return (query = {
        name: "fetch-category",
        text: "SELECT * FROM categories WHERE id = $1",
        values: [Number(id)],
    });
};

// Create query get all categories
router.get("/", (req, res) => {
    try {
        db.query("SELECT * FROM categories ORDER BY name ASC", (error, response) => {
            if (error) {
                return res.status(500).json(error);
            }

            return res.status(200).json(response.rows);
        });
    } catch (error) {
        return res.status(500).json(error);
    }
});

// Create query post categories
router.post("/", (req, res) => {
    try {
        const { name } = req.body;

        // Validation
        if (name.length < 3) {
            return res
                .status(400)
                .json({ error: "Name should have more than 3 characters" });
        }

        const text = "INSERT INTO categories(name) VALUES($1) RETURNING *";
        const values = [name];

        db.query(text, values, (error, response) => {
            if (error) {
                return res.status(500).json(error);
            }
            return res.status(200).json(response.rows);
        });

        return res.status(200);
    } catch (error) {
        return res.status(500).json(error);
    }
});

// created route to delete categories
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // if id to null returns an error
        if (!id) {
            return res.status(400).json({ error: "Param id is mandatory." });
        }

        const query = findOne(id);
        const category = await db.query(query);

        if (!category.rows[0]) {
            return res.status(404).json({ error: "Category not found" });
        }

        const text = "DELETE FROM categories WHERE id=$1 RETURNING *";
        const values = [Number(id)];
        const deleteResponse = await db.query(text, values);

        if (!deleteResponse.rows[0]) {
            return res.status(400).json({ error: "Category not deleted" });
        }

        return res.status(200).json(deleteResponse.rows[0]);
    } catch (error) {
        return res.status(500).json(error);
    }
});

router.put("/:id", async (req, res) => {
    try {
        // get the id
        const { id } = req.params;
        const { name } = req.body;

        // check if exists
        if (!id) {
            return res.status(400).json({ error: "Param id is mandatory." });
        }

        if (name.length < 3) {
            return res
                .status(400).json({ error: "Name should have more than 3 characters" });
        }
        // take the query
        const query = findOne(id);
        const category = await db.query(query);

        // check if exists
        if (!category.rows[0]) {
            return res.status(404).json({ error: "Category not found" });
        }

        const text = "UPDATE categories SET name = $1 WHERE id=$2 RETURNING *";
        const values = [name, Number(id)];
        const updateResponse = await db.query(text, values);

        if (!updateResponse.rows[0]) {
            return res.status(400).json({ error: "Category not updated" });
        }

        return res.status(200).json(updateResponse.rows[0]);
    } catch (error) {
        return res.status(500).json(error);
    }
});

module.exports = router;
