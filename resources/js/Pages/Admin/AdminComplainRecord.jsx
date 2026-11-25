import React, { useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";
import AdminPageWrapper from "@/AdminComponents/AdminPageWrapper";
import { usePage } from "@inertiajs/react";
import { AdminDataContext } from "@/AdminContext/AdminContext";
import { FaPlus, FaFilePdf } from "react-icons/fa";
import { MdDelete, MdEdit, MdVisibility } from "react-icons/md";
import AddComplainRecord from "@/AdminComponents/AddComplainRecord";
import ComplainRecordPopup from "./ComplainRecordPopup";

const SERVICE_TYPES = [
    "Installation",
    "AMC/Maintenance",
    "On-call Repair",
    "Survey",
];

const WORK_STATUSES = ["Pending", "In Progress", "Completed"];

const STATUS_BADGE_CLASSES = {
    Pending: "bg-yellow-100 text-yellow-800",
    "In Progress": "bg-blue-100 text-blue-800",
    Completed: "bg-green-100 text-green-800",
};

const isPdf = (path) => /\.pdf$/i.test(path || "");

// Date -> "YYYY-MM-DD" (local time)
const formatDate = (date) => {
    if (!date) return "";
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
};

const AdminComplainRecord = () => {
    const { url } = usePage();
    const { toggleSidebar } = useContext(AdminDataContext);
    const imgurl = import.meta.env.VITE_IMAGE_PATH;

    const [showForm, setShowForm] = useState(false);
    const [allComplainRecords, setAllComplainRecords] = useState([]);
    const [reloadTrigger, setReloadTrigger] = useState(false);
    const [editingComplainRecord, setEditingComplainRecord] = useState(null);

    const [viewingComplainRecord, setViewingComplainRecord] = useState(null);
    const [showViewPopup, setShowViewPopup] = useState(false);

    const [deletionItemId, setDeletionItemId] = useState(null);
    const [showDeletionDialog, setShowDeletionDialog] = useState(false);

    // Inline status editing
    const [statusEditingId, setStatusEditingId] = useState(null);
    const [statusUpdatingId, setStatusUpdatingId] = useState(null);

    // Filters
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [serviceFilter, setServiceFilter] = useState("");
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);

    // Products (used for the Items Used suggestions)
    const [productsData, setProductsData] = useState([]);

    // Fetch complain records
    useEffect(() => {
        const fetchComplainRecords = async () => {
            try {
                const response = await axios.get(route("ourcomplain.index"));
                setAllComplainRecords(response.data.data ?? []);
            } catch (error) {
                console.log("Error fetching data", error);
            }
        };

        fetchComplainRecords();
    }, [reloadTrigger]);

    // Fetch products once
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(route("adminproduct.index"));
                const list = Array.isArray(response.data)
                    ? response.data
                    : (response.data?.data ?? []);
                setProductsData(list);
            } catch (error) {
                console.log("Error fetching products", error);
            }
        };

        fetchProducts();
    }, []);

    // Create
    const handleCreate = async (formData) => {
        try {
            const response = await axios.post(
                route("ourcomplain.store"),
                formData,
                { headers: { "Content-Type": "multipart/form-data" } },
            );
            toast.success("Complain Record Added");
            setReloadTrigger((prev) => !prev);
            return response.data;
        } catch (error) {
            toast.error("Error Adding Complain Record");
            console.log("Error creating complain record", error);
            throw error;
        }
    };

    // Update
    const handleUpdate = async (formData, id) => {
        try {
            formData.append("_method", "PUT");
            const response = await axios.post(
                route("ourcomplain.update", { id }),
                formData,
                { headers: { "Content-Type": "multipart/form-data" } },
            );
            toast.success("Complain Record Updated");
            setReloadTrigger((prev) => !prev);
            return response.data;
        } catch (error) {
            toast.error("Error Updating Complain Record");
            console.log("Error updating complain record", error);
            throw error;
        }
    };

    // Inline status change (from the table)
    const handleStatusChange = async (item, newStatus) => {
        setStatusEditingId(null);

        if (!newStatus || newStatus === item.work_status) return;

        const previousStatus = item.work_status;

        // Optimistic update
        setAllComplainRecords((prev) =>
            prev.map((r) =>
                r.id === item.id ? { ...r, work_status: newStatus } : r,
            ),
        );
        setStatusUpdatingId(item.id);

        try {
            await axios.patch(route("ourcomplain.status", { id: item.id }), {
                work_status: newStatus,
            });
            toast.success(`Status changed to ${newStatus}`);
        } catch (error) {
            // Revert on failure
            setAllComplainRecords((prev) =>
                prev.map((r) =>
                    r.id === item.id ? { ...r, work_status: previousStatus } : r,
                ),
            );
            toast.error("Error Updating Status");
            console.log("Error updating status", error);
        } finally {
            setStatusUpdatingId(null);
        }
    };

    // Delete
    const handleDeletion = async () => {
        if (deletionItemId) {
            try {
                await axios.delete(
                    route("ourcomplain.destroy", { id: deletionItemId }),
                );
                setDeletionItemId(null);
                setShowDeletionDialog(false);
                toast.success("Complain Record Deleted");
                setReloadTrigger((prev) => !prev);
            } catch (error) {
                toast.error("Error Deleting Complain Record");
                console.log("Error", error);
            }
        } else {
            console.log("Nothing selected to delete");
        }
    };

    // View
    const handleView = (complainRecord) => {
        setViewingComplainRecord(complainRecord);
        setShowViewPopup(true);
    };

    // Edit
    const handleEdit = (complainRecord) => {
        setEditingComplainRecord(complainRecord);
        setShowForm(true);
    };

    // Add new
    const handleAddNew = () => {
        setEditingComplainRecord(null);
        setShowForm(true);
    };

    const getItemsTotal = (items = []) =>
        items
            .reduce((sum, i) => sum + (parseFloat(i.amount) || 0), 0)
            .toFixed(2);

    // Apply filters
    const filteredRecords = useMemo(() => {
        const term = search.trim().toLowerCase();
        const from = formatDate(fromDate);
        const to = formatDate(toDate);

        return allComplainRecords.filter((item) => {
            if (term) {
                const haystack = [
                    item.client_name,
                    item.address,
                    item.primary_contact_person,
                    item.phone_number,
                    item.service_type,
                    item.technician_name,
                    item.work_status,
                    item.note,
                ]
                    .filter(Boolean)
                    .join(" ")
                    .toLowerCase();
                if (!haystack.includes(term)) return false;
            }

            if (statusFilter && item.work_status !== statusFilter) return false;
            if (serviceFilter && item.service_type !== serviceFilter)
                return false;

            const recordDate = item.complain_date?.slice(0, 10) || "";
            if (from && (!recordDate || recordDate < from)) return false;
            if (to && (!recordDate || recordDate > to)) return false;

            return true;
        });
    }, [
        allComplainRecords,
        search,
        statusFilter,
        serviceFilter,
        fromDate,
        toDate,
    ]);

    const hasActiveFilters =
        search || statusFilter || serviceFilter || fromDate || toDate;

    const clearFilters = () => {
        setSearch("");
        setStatusFilter("");
        setServiceFilter("");
        setFromDate(null);
        setToDate(null);
    };

    return (
        <AdminPageWrapper pageLocation={url}>
            <div className="w-full min-h-screen flex flex-col relative">
                <div
                    className={`min-h-screen w-full ml-auto flex justify-start items-start py-16 overflow-x-auto flex-col relative ${toggleSidebar ? "w-[96%]" : "sm:w-[70%] lg:w-[85%]"} transition-all duration-300`}
                >
                    <div className="w-[90%] mx-auto flex flex-col">
                        <button
                            className="flex items-center gap-2 py-3 px-3 font-semibold rounded-b-full ml-auto mb-4 border-2 border-saitblue bg-saitblue text-white tooltip tooltip-bottom"
                            data-tip="Add New Complain"
                            onClick={handleAddNew}
                        >
                            <FaPlus />
                        </button>

                        <AddComplainRecord
                            showForm={showForm}
                            setShowForm={setShowForm}
                            editingComplainRecord={editingComplainRecord}
                            setEditingComplainRecord={setEditingComplainRecord}
                            onCreate={handleCreate}
                            onUpdate={handleUpdate}
                            products={productsData}
                        />

                        <ComplainRecordPopup
                            showPopup={showViewPopup}
                            setShowPopup={setShowViewPopup}
                            record={viewingComplainRecord}
                        />
                    </div>

                    {/* Filters */}
                    <div className="w-[90%] mx-auto bg-base-100 text-base-content p-2 rounded-md flex flex-wrap items-end gap-2">
                        {/* Search */}
                        <label className="flex-1 min-w-[200px]">
                            <p className="text-sm">Search</p>
                            <input
                                className="p-1.5 w-full border-2 bg-base-100 text-base-content"
                                placeholder="Client, address, phone, technician..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </label>

                        {/* Status + Service Type */}
                        <div className="flex gap-2 w-full sm:w-auto">
                            <label className="flex-1 min-w-0 sm:flex-none sm:min-w-[150px]">
                                <p className="text-sm">Status</p>
                                <select
                                    className="w-full border-2 p-1.5 bg-base-100 text-base-content"
                                    value={statusFilter}
                                    onChange={(e) =>
                                        setStatusFilter(e.target.value)
                                    }
                                >
                                    <option value="">All</option>
                                    {WORK_STATUSES.map((status) => (
                                        <option key={status} value={status}>
                                            {status}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <label className="flex-1 min-w-0 sm:flex-none sm:min-w-[170px]">
                                <p className="text-sm">Service Type</p>
                                <select
                                    className="w-full border-2 p-1.5 bg-base-100 text-base-content"
                                    value={serviceFilter}
                                    onChange={(e) =>
                                        setServiceFilter(e.target.value)
                                    }
                                >
                                    <option value="">All</option>
                                    {SERVICE_TYPES.map((type) => (
                                        <option key={type} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>

                        {/* From Date + To Date */}
                        <div className="flex gap-2 w-full sm:w-auto">
                            <label className="flex-1 min-w-0 sm:flex-none">
                                <p className="text-sm">From Date</p>
                                <DatePicker
                                    wrapperClassName="w-full"
                                    className="border-2 p-1.5 bg-base-100 text-base-content w-full sm:w-[140px]"
                                    selected={fromDate}
                                    onChange={(date) => setFromDate(date)}
                                    selectsStart
                                    startDate={fromDate}
                                    endDate={toDate}
                                    dateFormat="yyyy-MM-dd"
                                    placeholderText="From"
                                    isClearable
                                />
                            </label>

                            <label className="flex-1 min-w-0 sm:flex-none">
                                <p className="text-sm">To Date</p>
                                <DatePicker
                                    wrapperClassName="w-full"
                                    className="border-2 p-1.5 bg-base-100 text-base-content w-full sm:w-[140px]"
                                    selected={toDate}
                                    onChange={(date) => setToDate(date)}
                                    selectsEnd
                                    startDate={fromDate}
                                    endDate={toDate}
                                    minDate={fromDate}
                                    dateFormat="yyyy-MM-dd"
                                    placeholderText="To"
                                    isClearable
                                />
                            </label>
                        </div>

                        {hasActiveFilters && (
                            <button
                                type="button"
                                onClick={clearFilters}
                                className="bg-gray-400 py-1.5 px-3 rounded-sm"
                            >
                                Clear
                            </button>
                        )}
                    </div>

                    <div className="w-[90%] mx-auto bg-base-100 text-base-content p-2 mt-4 rounded-md h-[550px] overflow-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-accent text-base-content/80">
                                    <td className="p-2 text-center font-medium">
                                        Client
                                    </td>
                                    <td className="p-2 text-center font-medium">
                                        Contact Person
                                    </td>
                                    <td className="p-2 text-center font-medium">
                                        Phone
                                    </td>
                                    <td className="p-2 text-center font-medium">
                                        Service Type
                                    </td>
                                    <td className="p-2 text-center font-medium">
                                        Technician
                                    </td>
                                    <td className="p-2 text-center font-medium">
                                        Complain Date
                                    </td>
                                    <td className="p-2 text-center font-medium">
                                        Fixed Date
                                    </td>
                                    <td className="p-2 text-center font-medium">
                                        Status
                                    </td>
                                    <td className="p-2 text-center font-medium">
                                        Actions
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredRecords.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={9}
                                            className="text-center p-4 text-sm"
                                        >
                                            No complain records found.
                                        </td>
                                    </tr>
                                )}

                                {filteredRecords.map((item) => (
                                    <tr key={item.id} className="text-sm">
                                        <td className="text-center p-1.5">
                                            {item.client_name || "-"}
                                        </td>
                                        <td className="text-center">
                                            {item.primary_contact_person || "-"}
                                        </td>
                                        <td className="text-center">
                                            {item.phone_number || "-"}
                                        </td>
                                        <td className="text-center">
                                            {item.service_type || "-"}
                                        </td>
                                        <td className="text-center">
                                            {item.technician_name || "-"}
                                        </td>
                                        <td className="text-center">
                                            {item.complain_date?.slice(0, 10) ||
                                                "-"}
                                        </td>
                                        <td className="text-center">
                                            {item.fixed_date?.slice(0, 10) ||
                                                "-"}
                                        </td>

                                        {/* Inline editable status */}
                                        <td className="text-center">
                                            {statusEditingId === item.id ? (
                                                <select
                                                    autoFocus
                                                    className="border-2 p-1 bg-base-100 text-base-content text-sm rounded-sm"
                                                    value={item.work_status || ""}
                                                    onChange={(e) =>
                                                        handleStatusChange(
                                                            item,
                                                            e.target.value,
                                                        )
                                                    }
                                                    onBlur={() =>
                                                        setStatusEditingId(null)
                                                    }
                                                >
                                                    {!item.work_status && (
                                                        <option value="" disabled>
                                                            Select
                                                        </option>
                                                    )}
                                                    {WORK_STATUSES.map(
                                                        (status) => (
                                                            <option
                                                                key={status}
                                                                value={status}
                                                            >
                                                                {status}
                                                            </option>
                                                        ),
                                                    )}
                                                </select>
                                            ) : (
                                                <button
                                                    type="button"
                                                    disabled={
                                                        statusUpdatingId ===
                                                        item.id
                                                    }
                                                    onClick={() =>
                                                        setStatusEditingId(
                                                            item.id,
                                                        )
                                                    }
                                                    title="Click to change status"
                                                    className={`px-2 py-0.5 rounded-full text-xs font-medium cursor-pointer hover:opacity-80 transition disabled:opacity-50 disabled:cursor-wait ${STATUS_BADGE_CLASSES[item.work_status] || "bg-gray-100 text-gray-800"}`}
                                                >
                                                    {item.work_status || "-"}
                                                </button>
                                            )}
                                        </td>

                                        <td className="flex items-center gap-2 p-1.5 justify-center">
                                            <button
                                                onClick={() => handleView(item)}
                                            >
                                                <MdVisibility className="text-lg" />
                                            </button>
                                            <button
                                                onClick={() => handleEdit(item)}
                                            >
                                                <MdEdit className="text-lg" />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setDeletionItemId(item.id);
                                                    setShowDeletionDialog(true);
                                                }}
                                            >
                                                <MdDelete className="text-lg text-red-500" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div
                        className={`fixed w-full h-full bg-black/10 top-0 left-0 flex justify-center items-center backdrop-blur-sm ${showDeletionDialog ? "scale-100" : "scale-0"} z-[200]`}
                    >
                        <div className="bg-base-100 text-base-content border-2 border-accent p-6 w-full max-w-[300px] rounded-md">
                            <p className="text-lg font-semibold text-center">
                                Confirm Delete?
                            </p>
                            <div className="flex gap-2 mt-6 w-full">
                                <button
                                    className="bg-gray-400 py-1 w-[50%] rounded-md ml-auto hover:scale-90 transition duration-300"
                                    onClick={() => setShowDeletionDialog(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="text-base-content bg-tertiary py-1 w-[50%] rounded-md hover:scale-90 transition duration-300"
                                    onClick={handleDeletion}
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminPageWrapper>
    );
};

export default AdminComplainRecord;
