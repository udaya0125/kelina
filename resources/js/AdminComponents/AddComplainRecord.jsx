import React, { useEffect, useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import { MdClose } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const imgurl = import.meta.env.VITE_IMAGE_PATH;

const SERVICE_TYPES = [
    "Installation",
    "AMC/Maintenance",
    "On-call Repair",
    "Survey",
];

const WORK_STATUSES = ["Pending", "In Progress", "Completed"];

// Date -> "YYYY-MM-DD" (local time, no timezone shift)
const formatDate = (date) => {
    if (!date) return "";
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
};

// "YYYY-MM-DD..." -> Date (local time)
const parseDate = (value) => {
    if (!value) return null;
    const [y, m, d] = String(value).slice(0, 10).split("-").map(Number);
    if (!y || !m || !d) return null;
    return new Date(y, m - 1, d);
};

const emptyItem = () => ({
    item: "",
    quantity: "",
    rate: "",
    amount: "",
    remarks: "",
});

const emptyForm = () => ({
    client_name: "",
    address: "",
    primary_contact_person: "",
    phone_number: "",
    service_type: "",
    image: null,
    technician_name: "",
    note: "",
    complain_date: new Date(),
    fixed_date: null,
    work_status: "",
    items: [emptyItem()],
});

const AddComplainRecord = ({
    showForm,
    setShowForm,
    editingComplainRecord,
    setEditingComplainRecord,
    onCreate,
    onUpdate,
    products = [],
}) => {
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const [complainForm, setComplainForm] = useState(emptyForm());

    // Unique, non-empty product names for the Item suggestions
    const productNameOptions = useMemo(() => {
        const names = (products || [])
            .map((p) => String(p?.product_name || "").trim())
            .filter(Boolean);
        return [...new Set(names)];
    }, [products]);

    // Populate / reset the form
    useEffect(() => {
        setErrors({});
        if (editingComplainRecord) {
            const r = editingComplainRecord;
            setComplainForm({
                client_name: r.client_name ?? "",
                address: r.address ?? "",
                primary_contact_person: r.primary_contact_person ?? "",
                phone_number: r.phone_number ?? "",
                service_type: r.service_type ?? "",
                image: null,
                technician_name: r.technician_name ?? "",
                note: r.note ?? "",
                complain_date: parseDate(r.complain_date),
                fixed_date: parseDate(r.fixed_date),
                work_status: r.work_status ?? "",
                items:
                    r.items && r.items.length > 0
                        ? r.items.map((i) => ({
                              item: i.item ?? "",
                              quantity: i.quantity ?? "",
                              rate: i.rate ?? "",
                              amount: i.amount ?? "",
                              remarks: i.remarks ?? "",
                          }))
                        : [emptyItem()],
            });
        } else {
            setComplainForm(emptyForm());
        }
    }, [editingComplainRecord, showForm]);

    const closeForm = () => {
        setShowForm(false);
        setEditingComplainRecord(null);
        setErrors({});
    };

    // Handle change for normal inputs and file
    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setComplainForm((prev) => ({
            ...prev,
            [name]: type === "file" ? files[0] || null : value,
        }));
    };

    // Handle change for an item row
    const handleItemChange = (index, field, value) => {
        setComplainForm((prev) => {
            const items = prev.items.map((row, i) => {
                if (i !== index) return row;
                const updated = { ...row, [field]: value };

                // Auto calculate amount from quantity x rate
                if (field === "quantity" || field === "rate") {
                    const qty = parseFloat(field === "quantity" ? value : row.quantity);
                    const rate = parseFloat(field === "rate" ? value : row.rate);
                    updated.amount =
                        !isNaN(qty) && !isNaN(rate) ? (qty * rate).toFixed(2) : "";
                }
                return updated;
            });
            return { ...prev, items };
        });
    };

    const addItemRow = () => {
        setComplainForm((prev) => ({
            ...prev,
            items: [...prev.items, emptyItem()],
        }));
    };

    const removeItemRow = (index) => {
        setComplainForm((prev) => {
            const items = prev.items.filter((_, i) => i !== index);
            return { ...prev, items: items.length ? items : [emptyItem()] };
        });
    };

    // Build FormData (items must be appended as items[0][field])
    const buildFormData = () => {
        const formData = new FormData();

        Object.entries(complainForm).forEach(([key, value]) => {
            if (key === "items" || key === "image") return;

            if (key === "complain_date" || key === "fixed_date") {
                const formatted = formatDate(value);
                if (formatted) formData.append(key, formatted);
                return;
            }

            if (value !== null && value !== "") {
                formData.append(key, value);
            }
        });

        if (complainForm.image instanceof File) {
            formData.append("image", complainForm.image);
        }

        complainForm.items
            .filter((row) => Object.values(row).some((v) => v !== "" && v !== null))
            .forEach((row, index) => {
                Object.entries(row).forEach(([field, value]) => {
                    formData.append(`items[${index}][${field}]`, value ?? "");
                });
            });

        return formData;
    };

    // Handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        const formData = buildFormData();

        try {
            setSubmitting(true);

            if (editingComplainRecord) {
                await onUpdate(formData, editingComplainRecord.id);
            } else {
                await onCreate(formData);
            }

            setComplainForm(emptyForm());
            closeForm();
        } catch (error) {
            console.log("Error saving data", error);
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors || {});
            }
        } finally {
            setSubmitting(false);
        }
    };

    if (!showForm) return null;

    // Shared styles (every field uses the same label + control spacing)
    const fieldClass = "flex flex-col gap-1 min-w-0";
    const labelTextClass = "text-sm font-medium";
    const controlClass =
        "w-full min-w-0 border-2 p-1.5 bg-base-100 text-base-content";
    const inputClass = controlClass;
    const selectClass = controlClass;
    const dateClass = controlClass;
    const textareaClass = `${controlClass} resize-y`;

    const errorText = (key) =>
        errors[key] ? (
            <p className="text-xs text-red-500">{errors[key][0]}</p>
        ) : null;

    // Keep old records with a different service type visible in the dropdown
    const serviceTypeOptions =
        complainForm.service_type &&
        !SERVICE_TYPES.includes(complainForm.service_type)
            ? [...SERVICE_TYPES, complainForm.service_type]
            : SERVICE_TYPES;

    return (
        <div className="w-full h-full fixed top-0 left-0 bg-black/10 flex justify-center items-center backdrop-blur-sm z-[200] p-2 sm:p-4">
            <div className="w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto p-4 sm:p-6 bg-base-100 rounded-md relative text-base-content">
                <h2 className="text-lg sm:text-xl font-bold mb-4 pr-8">
                    {editingComplainRecord
                        ? "Edit Complain Record"
                        : "Add New Complain Record"}
                </h2>
                <button
                    type="button"
                    onClick={closeForm}
                    className="absolute top-3 right-3 p-1"
                    aria-label="Close"
                >
                    <MdClose className="text-lg" />
                </button>

                <form
                    onSubmit={handleSubmit}
                    className="mx-auto rounded-sm flex flex-col gap-3"
                >
                    {/* Main details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <label className={fieldClass}>
                            <span className={labelTextClass}>
                                Client Name<span className="text-red-500">*</span>
                            </span>
                            <input
                                className={inputClass}
                                name="client_name"
                                placeholder="Enter client name"
                                value={complainForm.client_name}
                                onChange={handleChange}
                                required
                            />
                            {errorText("client_name")}
                        </label>

                        <label className={fieldClass}>
                            <span className={labelTextClass}>Address <span className="text-red-500">*</span></span>
                            <input
                                className={inputClass}
                                name="address"
                                placeholder="Enter address"
                                value={complainForm.address}
                                onChange={handleChange}
                            />
                            {errorText("address")}
                        </label>

                        <label className={fieldClass}>
                            <span className={labelTextClass}>Primary Contact Person</span>
                            <input
                                className={inputClass}
                                name="primary_contact_person"
                                placeholder="Enter contact person"
                                value={complainForm.primary_contact_person}
                                onChange={handleChange}
                            />
                            {errorText("primary_contact_person")}
                        </label>

                        <label className={fieldClass}>
                            <span className={labelTextClass}>Phone Number<span className="text-red-500">*</span></span>
                            <input
                                className={inputClass}
                                name="phone_number"
                                placeholder="Enter phone number"
                                value={complainForm.phone_number}
                                onChange={handleChange}
                            />
                            {errorText("phone_number")}
                        </label>

                        <label className={fieldClass}>
                            <span className={labelTextClass}>Service Type <span className="text-red-500">*</span></span>
                            <select
                                className={selectClass}
                                name="service_type"
                                value={complainForm.service_type}
                                onChange={handleChange}
                            >
                                <option value="" disabled>
                                    Select service type
                                </option>
                                {serviceTypeOptions.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                            {errorText("service_type")}
                        </label>

                        <label className={fieldClass}>
                            <span className={labelTextClass}>Technician Name</span>
                            <input
                                className={inputClass}
                                name="technician_name"
                                placeholder="Enter technician name"
                                value={complainForm.technician_name}
                                onChange={handleChange}
                            />
                            {errorText("technician_name")}
                        </label>

                        <label className={fieldClass}>
                            <span className={labelTextClass}>Complain Date</span>
                            <DatePicker
                                className={dateClass}
                                wrapperClassName="w-full"
                                selected={complainForm.complain_date}
                                name="complain_date"
                                placeholderText="Select complain date"
                                dateFormat="yyyy-MM-dd"
                                onChange={(date) =>
                                    setComplainForm((prev) => ({
                                        ...prev,
                                        complain_date: date,
                                    }))
                                }
                            />
                            {errorText("complain_date")}
                        </label>

                        <label className={fieldClass}>
                            <span className={labelTextClass}>Fixed Date</span>
                            <DatePicker
                                className={dateClass}
                                wrapperClassName="w-full"
                                selected={complainForm.fixed_date}
                                name="fixed_date"
                                dateFormat="yyyy-MM-dd"
                                placeholderText="Select fixed date"
                                isClearable
                                onChange={(date) =>
                                    setComplainForm((prev) => ({
                                        ...prev,
                                        fixed_date: date,
                                    }))
                                }
                            />
                            {errorText("fixed_date")}
                        </label>

                        <label className={fieldClass}>
                            <span className={labelTextClass}>Work Status<span className="text-red-500">*</span></span>
                            <select
                                className={selectClass}
                                name="work_status"
                                value={complainForm.work_status}
                                onChange={handleChange}
                            >
                                <option value="" disabled>
                                    Select work status 
                                </option>
                                {WORK_STATUSES.map((status) => (
                                    <option key={status} value={status}>
                                        {status}
                                    </option>
                                ))}
                            </select>
                            {errorText("work_status")}
                        </label>

                        <label className={fieldClass}>
                            <span className={labelTextClass}>Image / PDF</span>
                            <input
                                type="file"
                                className={inputClass}
                                name="image"
                                accept="image/*,application/pdf"
                                onChange={handleChange}
                            />
                            {editingComplainRecord?.image && !complainForm.image && (
                                <a
                                    href={`${imgurl}/${editingComplainRecord.image}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-xs text-saitblue underline inline-block"
                                >
                                    View current file
                                </a>
                            )}
                            {errorText("image")}
                        </label>
                    </div>

                    <label className={fieldClass}>
                        <span className={labelTextClass}>Note</span>
                        <textarea
                            className={textareaClass}
                            name="note"
                            placeholder="Add any notes about this complain"
                            rows={3}
                            value={complainForm.note}
                            onChange={handleChange}
                        />
                        {errorText("note")}
                    </label>

                    {/* Items Used */}
                    <div className="mt-2 flex flex-col gap-3">
                        <div className="flex items-center justify-between gap-2">
                            <p className="font-semibold">Items Used</p>
                            <button
                                type="button"
                                onClick={addItemRow}
                                className="flex items-center gap-1 text-sm py-1.5 px-3 rounded-sm border-2 border-saitblue bg-saitblue text-white whitespace-nowrap"
                            >
                                <FaPlus /> Add Item
                            </button>
                        </div>

                        {/* Product name suggestions shared by every Item input */}
                        <datalist id="complain-product-names">
                            {productNameOptions.map((name) => (
                                <option key={name} value={name} />
                            ))}
                        </datalist>

                        <div className="flex flex-col gap-3">
                            {complainForm.items.map((row, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col gap-3 p-3 border-2 border-accent rounded-sm"
                                >
                                    {/* Card header: item number + remove */}
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-semibold">
                                            Item {index + 1}
                                        </p>
                                        <button
                                            type="button"
                                            onClick={() => removeItemRow(index)}
                                            className="p-1"
                                            title="Remove item"
                                            aria-label={`Remove item ${index + 1}`}
                                        >
                                            <MdDelete className="text-lg text-red-500" />
                                        </button>
                                    </div>

                                    {/* Item: pick a product or type your own, and edit either */}
                                    <label className={fieldClass}>
                                        <span className={labelTextClass}>Item</span>
                                        <input
                                            type="text"
                                            list="complain-product-names"
                                            autoComplete="off"
                                            className={inputClass}
                                            placeholder="Select a product or type the item used"
                                            value={row.item}
                                            onChange={(e) =>
                                                handleItemChange(index, "item", e.target.value)
                                            }
                                        />
                                        {errorText(`items.${index}.item`)}
                                    </label>

                                    {/* Qty / Rate / Amount / Remarks */}
                                    <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                                        <label className={fieldClass}>
                                            <span className={labelTextClass}>Qty</span>
                                            <input
                                                type="number"
                                                min="0"
                                                step="any"
                                                className={inputClass}
                                                value={row.quantity}
                                                placeholder="0"
                                                onChange={(e) =>
                                                    handleItemChange(index, "quantity", e.target.value)
                                                }
                                            />
                                            {errorText(`items.${index}.quantity`)}
                                        </label>

                                        <label className={fieldClass}>
                                            <span className={labelTextClass}>Rate</span>
                                            <input
                                                type="number"
                                                min="0"
                                                step="any"
                                                className={inputClass}
                                                value={row.rate}
                                                placeholder="0.00"
                                                onChange={(e) =>
                                                    handleItemChange(index, "rate", e.target.value)
                                                }
                                            />
                                            {errorText(`items.${index}.rate`)}
                                        </label>

                                        <label className={fieldClass}>
                                            <span className={labelTextClass}>Amount</span>
                                            <input
                                                type="number"
                                                min="0"
                                                step="any"
                                                className={inputClass}
                                                value={row.amount}
                                                placeholder="0.00"
                                                onChange={(e) =>
                                                    handleItemChange(index, "amount", e.target.value)
                                                }
                                            />
                                            {errorText(`items.${index}.amount`)}
                                        </label>

                                        <label className={`${fieldClass} col-span-3 md:col-span-1`}>
                                            <span className={labelTextClass}>Remarks</span>
                                            <input
                                                className={inputClass}
                                                value={row.remarks}
                                                placeholder="Optional"
                                                onChange={(e) =>
                                                    handleItemChange(index, "remarks", e.target.value)
                                                }
                                            />
                                            {errorText(`items.${index}.remarks`)}
                                        </label>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="bg-tertiary text-white w-full p-2 mt-2 rounded-sm disabled:opacity-60"
                    >
                        {submitting
                            ? "Saving..."
                            : editingComplainRecord
                              ? "Update"
                              : "Add"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddComplainRecord;