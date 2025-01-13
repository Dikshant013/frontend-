import { useState } from "react";
import PropTypes from "prop-types";
import "./popup.css";

const NewOrderPopup = ({ onClose, onCreate }) => {
    const [formData, setFormData] = useState({
        customer_name: "",
        customer_email: "",
        status: "Pending",
        line_items: "",
        tax_rate: 0,
        total_before_tax: 0,
        tax_amount: 0,
        total_after_tax: 0,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let parsedLineItems;
        try {
            parsedLineItems = JSON.parse(formData.line_items || "[]");
        } catch (err) {
            alert("Invalid JSON format in line items. Please fix it and try again.");
            return;
        }

        const preparedData = {
            ...formData,
            line_items: parsedLineItems,
            tax_rate: parseFloat(formData.tax_rate),
            total_before_tax: parseFloat(formData.total_before_tax),
            tax_amount: parseFloat(formData.tax_amount),
            total_after_tax: parseFloat(formData.total_after_tax),
        };

        if (
            isNaN(preparedData.tax_rate) ||
            isNaN(preparedData.total_before_tax) ||
            isNaN(preparedData.tax_amount) ||
            isNaN(preparedData.total_after_tax)
        ) {
            alert("Please enter valid numeric values for tax and totals.");
            return;
        }

        onCreate(preparedData);

        setFormData({
            customer_name: "",
            customer_email: "",
            status: "Pending",
            line_items: "",
            tax_rate: 0,
            total_before_tax: 0,
            tax_amount: 0,
            total_after_tax: 0,
        });
    };

    return (
        <div className="popup">
            <div className="popup-content">
                <h2>Create New Order</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Customer Name:
                        <input
                            type="text"
                            name="customer_name"
                            value={formData.customer_name}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Customer Email:
                        <input
                            type="email"
                            name="customer_email"
                            value={formData.customer_email}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Status:
                        <select name="status" value={formData.status} onChange={handleChange}>
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </label>
                    <label>
                        Line Items (JSON Format):
                        <textarea
                            name="line_items"
                            value={formData.line_items}
                            onChange={handleChange}
                            placeholder='e.g., [{"item": "Product A", "total_price": 100}]'
                        />
                    </label>
                    <label>
                        Tax Rate:
                        <input
                            type="number"
                            name="tax_rate"
                            value={formData.tax_rate}
                            onChange={handleChange}
                            step="0.01"
                            required
                        />
                    </label>
                    <label>
                        Total Before Tax:
                        <input
                            type="number"
                            name="total_before_tax"
                            value={formData.total_before_tax}
                            onChange={handleChange}
                            step="0.01"
                            required
                        />
                    </label>
                    <label>
                        Tax Amount:
                        <input
                            type="number"
                            name="tax_amount"
                            value={formData.tax_amount}
                            onChange={handleChange}
                            step="0.01"
                            required
                        />
                    </label>
                    <label>
                        Total After Tax:
                        <input
                            type="number"
                            name="total_after_tax"
                            value={formData.total_after_tax}
                            onChange={handleChange}
                            step="0.01"
                            required
                        />
                    </label>
                    <button type="submit">Create Order</button>
                    <button type="button" onClick={onClose}>
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

NewOrderPopup.propTypes = {
    onClose: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired,
};

export default NewOrderPopup;
