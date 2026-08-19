const pool = require("../config/db");

// Get contact details
const getContactDetails = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM contact_details ORDER BY id ASC LIMIT 1"
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Contact details not found"
            });
        }

        res.status(200).json({
            success: true,
            data: result.rows[0]
        });

    } catch (error) {
        console.error("Get contact details error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch contact details"
        });
    }
};


// Update contact details
const updateContactDetails = async (req, res) => {
    try {
        const {
            office_address,
            phone,
            email,
            whatsapp,
            office_timings,
            facebook,
            instagram,
            twitter,
            youtube
        } = req.body;

        console.log("//////////////////////", req.body);

        const result = await pool.query(
            `UPDATE contact_details
             SET
                office_address = $1,
                phone = $2,
                email = $3,
                whatsapp = $4,
                office_timings = $5,
                facebook = $6,
                instagram = $7,
                twitter = $8,
                youtube = $9,
                updated_at = CURRENT_TIMESTAMP
             WHERE id = (
                SELECT id
                FROM contact_details
                ORDER BY id ASC
                LIMIT 1
             )
             RETURNING *`,
            [
                office_address,
                phone,
                email,
                whatsapp,
                office_timings,
                facebook,
                instagram,
                twitter,
                youtube
            ]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Contact details not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Contact details updated successfully",
            data: result.rows[0]
        });

    } catch (error) {
        console.error("Update contact details error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to update contact details"
        });
    }
};


module.exports = {
    getContactDetails,
    updateContactDetails
};