import React from "react";
import { MdClose } from "react-icons/md";
import { FaFilePdf } from "react-icons/fa";
import { BsFileEarmarkPdfFill } from "react-icons/bs";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const imgurl = import.meta.env.VITE_IMAGE_PATH;

const isPdf = (path) => /\.pdf$/i.test(path || "");

// Shows a "Label: value" row only when the value exists
const Field = ({ label, value }) => {
    if (value === null || value === undefined || value === "") return null;
    return (
        <div className="flex gap-2 py-1 border-b border-accent">
            <p className="font-semibold min-w-[170px]">{label}:</p>
            <p className="break-words">{value}</p>
        </div>
    );
};

// "2026-09-30T05:12:00.000000Z" -> "YYYY-MM-DD" (local time)
const formatCreatedDate = (value) => {
    if (!value) return "";
    const date = new Date(value);
    if (isNaN(date.getTime())) return String(value).slice(0, 10);
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
};

const ComplainRecordPopup = ({ showPopup, setShowPopup, record }) => {
    if (!showPopup || !record) return null;

    // Only rows that have some data
    const items = (record.items ?? []).filter((row) =>
        [row.item, row.quantity, row.rate, row.amount, row.remarks].some(
            (v) => v !== null && v !== undefined && v !== "",
        ),
    );

    const hasRemarks = items.some((row) => row.remarks);

    const total = items.reduce(
        (sum, row) => sum + (parseFloat(row.amount) || 0),
        0,
    );

    const closePopup = () => setShowPopup(false);

    const fileUrl = record.image ? `${imgurl}/${record.image}` : "";

    // ---------- PDF export (image / attached PDF is NOT included) ----------
    const handlePdfExport = () => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        const margin = 14;

        // Title
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text("CLIENT SERVICE & FIELD WORK RECORD", pageWidth / 2, 16, {
            align: "center",
        });

        // Only rows that have a value (same as <Field />)
        const toRows = (fields) =>
            fields.filter(
                ([, value]) => value !== null && value !== undefined && value !== "",
            );

        const fieldTableOptions = {
            theme: "plain",
            styles: {
                fontSize: 10,
                cellPadding: 1.5,
                lineColor: [200, 200, 200],
                lineWidth: { bottom: 0.1 },
            },
            columnStyles: {
                0: { fontStyle: "bold", cellWidth: 55 },
                1: { cellWidth: "auto" },
            },
            margin: { left: margin, right: margin },
        };

        // 1. Date + client details
        autoTable(doc, {
            ...fieldTableOptions,
            startY: 24,
            body: toRows([
                ["Date:", formatCreatedDate(record.created_at)],
                ["Client / Business Name:", record.client_name],
                ["Site Location / Address:", record.address],
                ["Primary Contact Person:", record.primary_contact_person],
                ["Phone / Contact No:", record.phone_number],
                ["Contract / Service Type:", record.service_type],
            ]),
        });

        let y = doc.lastAutoTable.finalY + 8;

        // 2. Material & Equipment table
        if (items.length > 0) {
            doc.setFontSize(11);
            doc.setFont("helvetica", "bold");
            doc.text("Material & Equipment Delivered / Installed", margin, y);

            const head = ["S.N", "Items", "Quantity", "Rate", "Amount"];
            if (hasRemarks) head.push("Remarks");

            const body = items.map((row, index) => {
                const cells = [
                    index + 1,
                    row.item || "-",
                    row.quantity ?? "-",
                    row.rate ?? "-",
                    row.amount ?? "-",
                ];
                if (hasRemarks) cells.push(row.remarks || "-");
                return cells;
            });

            if (total > 0) {
                const totalRow = [
                    {
                        content: "Total",
                        colSpan: 4,
                        styles: { halign: "right", fontStyle: "bold" },
                    },
                    {
                        content: total.toFixed(2),
                        styles: { halign: "center", fontStyle: "bold" },
                    },
                ];
                if (hasRemarks) totalRow.push("");
                body.push(totalRow);
            }

            autoTable(doc, {
                startY: y + 3,
                head: [head],
                body,
                theme: "grid",
                styles: { fontSize: 9, cellPadding: 1.5 },
                headStyles: {
                    fillColor: [229, 231, 235],
                    textColor: 60,
                    halign: "center",
                },
                columnStyles: {
                    0: { halign: "center", cellWidth: 14 },
                    2: { halign: "center" },
                    3: { halign: "center" },
                    4: { halign: "center" },
                },
                margin: { left: margin, right: margin },
            });

            y = doc.lastAutoTable.finalY + 8;
        }

        // 3. Work status + technician
        autoTable(doc, {
            ...fieldTableOptions,
            startY: y,
            body: toRows([
                ["Work Status:", record.work_status],
                ["Technician Name:", record.technician_name],
            ]),
        });
        y = doc.lastAutoTable.finalY + 6;

        // 4. Note (one-cell table so it wraps and paginates automatically)
        if (record.note) {
            autoTable(doc, {
                startY: y,
                head: [["Note"]],
                body: [[record.note]],
                theme: "grid",
                styles: { fontSize: 10, cellPadding: 2 },
                headStyles: {
                    fillColor: [229, 231, 235],
                    textColor: 60,
                    halign: "left",
                },
                margin: { left: margin, right: margin },
            });
            y = doc.lastAutoTable.finalY + 6;
        }

        // 5. Complain / Fixed dates
        autoTable(doc, {
            ...fieldTableOptions,
            startY: y,
            body: toRows([
                ["Complain Date:", record.complain_date?.slice(0, 10)],
                ["Fixed Date:", record.fixed_date?.slice(0, 10)],
            ]),
        });

        const safeName = (record.client_name || "record").replace(
            /[^a-z0-9]+/gi,
            "_",
        );
        doc.save(`complain_${safeName}_${formatCreatedDate(record.created_at)}.pdf`);
    };

    return (
        <div className="w-full h-full fixed top-0 left-0 bg-black/10 flex justify-center items-center backdrop-blur-sm z-[200] p-4">
            <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 bg-base-100 text-base-content rounded-md relative">
                <button
                    type="button"
                    onClick={closePopup}
                    className="absolute top-3 right-3"
                >
                    <MdClose className="text-lg" />
                </button>

                <h2 className="text-lg font-bold text-center mb-4 uppercase">
                    Client Service &amp; Field Work Record
                </h2>

                {/* Date (created date) and client details */}
                <div className="flex flex-col">
                    <Field label="Date" value={formatCreatedDate(record.created_at)} />
                    <Field label="Client / Business Name" value={record.client_name} />
                    <Field label="Site Location / Address" value={record.address} />
                    <Field
                        label="Primary Contact Person"
                        value={record.primary_contact_person}
                    />
                    <Field label="Phone / Contact No" value={record.phone_number} />
                    <Field label="Contract / Service Type" value={record.service_type} />
                </div>

                {/* Material & Equipment */}
                {items.length > 0 && (
                    <div className="mt-4">
                        <p className="font-semibold mb-1">
                            Material &amp; Equipment Delivered / Installed
                        </p>
                        <div className="overflow-x-auto">
                            <table className="w-full border-2 border-accent text-sm">
                                <thead>
                                    <tr className="bg-accent text-base-content/80">
                                        <td className="p-2 border border-accent text-center font-medium">
                                            S.N
                                        </td>
                                        <td className="p-2 border border-accent text-center font-medium">
                                            Items
                                        </td>
                                        <td className="p-2 border border-accent text-center font-medium">
                                            Quantity
                                        </td>
                                        <td className="p-2 border border-accent text-center font-medium">
                                            Rate
                                        </td>
                                        <td className="p-2 border border-accent text-center font-medium">
                                            Amount
                                        </td>
                                        {hasRemarks && (
                                            <td className="p-2 border border-accent text-center font-medium">
                                                Remarks
                                            </td>
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((row, index) => (
                                        <tr key={row.id ?? index}>
                                            <td className="p-1.5 border border-accent text-center">
                                                {index + 1}
                                            </td>
                                            <td className="p-1.5 border border-accent">
                                                {row.item || "-"}
                                            </td>
                                            <td className="p-1.5 border border-accent text-center">
                                                {row.quantity ?? "-"}
                                            </td>
                                            <td className="p-1.5 border border-accent text-center">
                                                {row.rate ?? "-"}
                                            </td>
                                            <td className="p-1.5 border border-accent text-center">
                                                {row.amount ?? "-"}
                                            </td>
                                            {hasRemarks && (
                                                <td className="p-1.5 border border-accent">
                                                    {row.remarks || "-"}
                                                </td>
                                            )}
                                        </tr>
                                    ))}
                                    {total > 0 && (
                                        <tr className="font-semibold">
                                            <td
                                                colSpan={4}
                                                className="p-1.5 border border-accent text-right"
                                            >
                                                Total
                                            </td>
                                            <td className="p-1.5 border border-accent text-center">
                                                {total.toFixed(2)}
                                            </td>
                                            {hasRemarks && (
                                                <td className="p-1.5 border border-accent"></td>
                                            )}
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Work status, technician, note, dates */}
                <div className="flex flex-col mt-4">
                    <Field label="Work Status" value={record.work_status} />
                    <Field label="Technician Name" value={record.technician_name} />
                </div>

                {record.note && (
                    <div className="mt-3">
                        <p className="font-semibold mb-1">Note</p>
                        <div className="border-2 border-accent rounded-sm p-2 whitespace-pre-wrap break-words">
                            {record.note}
                        </div>
                    </div>
                )}

                <div className="flex flex-col mt-3">
                    <Field label="Complain Date" value={record.complain_date?.slice(0, 10)} />
                    <Field label="Fixed Date" value={record.fixed_date?.slice(0, 10)} />
                </div>

                {/* Image / PDF */}
                {record.image && (
                    <div className="mt-4">
                        <p className="font-semibold mb-1">
                            {isPdf(record.image) ? "PDF" : "Image"}
                        </p>

                        {isPdf(record.image) ? (
                            <div className="flex flex-col gap-2">
                                <iframe
                                    src={fileUrl}
                                    title="Complain PDF"
                                    className="w-full h-96 border-2 border-accent rounded"
                                />
                                <a
                                    href={fileUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-2 text-saitblue underline text-sm"
                                >
                                    <FaFilePdf className="text-red-500" />
                                    Open PDF in new tab
                                </a>
                            </div>
                        ) : (
                            <a href={fileUrl} target="_blank" rel="noreferrer">
                                <img
                                    src={fileUrl}
                                    alt="complain"
                                    className="max-h-64 object-contain rounded border-2 border-accent"
                                />
                            </a>
                        )}
                    </div>
                )}

                {/* Sticky action bar: always visible at the bottom while scrolling */}
                <div className="sticky -bottom-6 -mx-6 -mb-6 mt-5 px-6 py-3 bg-base-100 border-t-2 border-accent flex flex-col sm:flex-row gap-2">
                    <button
                        type="button"
                        onClick={handlePdfExport}
                        className="flex-1 flex items-center justify-center gap-2 bg-tertiary text-white font-semibold p-2 rounded-sm hover:opacity-90"
                    >
                        <BsFileEarmarkPdfFill className="text-xl" />
                        Download PDF
                    </button>
                    <button
                        type="button"
                        onClick={closePopup}
                        className="flex-1 border-2 border-accent text-base-content font-medium p-2 rounded-sm hover:bg-accent"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ComplainRecordPopup;
