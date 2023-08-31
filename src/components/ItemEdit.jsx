import { useParams } from "react-router-dom";
import GoBack from "./GoBack";
import { useState } from "react";
import PropTypes from "prop-types";

const ItemEdit = ({ data }) => {

  const { id } = useParams(); // Get the invoice ID from URL parameters

  // Find the corresponding invoice data
  const invoice = data.find(item => item.id === id);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { status, createdAt, paymentDue, clientName, clientAddress, clientEmail, items, total, senderAddress } = invoice;

  const handleDelete = () => {
    console.log("Invoice deleted");
    setShowDeleteModal(false); // Close the modal after deletion
  };
  return (
    <div className="mb-20 mt-6 w-full pl-10 pr-10 md:p-0 md:mt-20 md:w-3/6">
      <GoBack />
      <div className="flex flex-col gap-8">
        {/* edit, delete button */}
        <div className="mt-8 flex h-auto items-center justify-between rounded-md bg-border-dark p-4">
          <div className="flex w-full items-center justify-between md:justify-start md:gap-1">
            <div>
              <p className="px-4 py-2 text-sm font-normal text-dark">Status</p>
            </div>

            <div className="flex items-center gap-1 rounded bg-pending bg-opacity-20 px-4 py-2 font-semibold text-pending">
              <div className={`h-3 w-3 rounded-full bg-pending`}></div>
              <p>{status}</p>
            </div>
          </div>

          {/* if its on mobile i dont want to show this part */}
          <div className="hidden w-full items-center justify-end space-x-2 md:flex">
            <button
              type="button"
              className="rounded bg-secondary px-4 py-2 text-sm font-semibold text-white hover:bg-secondary-hover"
            >
              Edit
            </button>
            <button
              type="button"
              className="rounded bg-delete px-4 py-2 text-sm font-semibold text-white hover:bg-delete-hover"
              onClick={() => setShowDeleteModal(true)}>
              Delete
            </button>
             {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <DeleteConfirmationModal
          onClose={() => setShowDeleteModal(false)}
          onDelete={handleDelete}
        />
      )}
            <button
              type="button"
              className="rounded bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primaryHover"
            >
              Mark as Paid
            </button>
          </div>
        </div>

        {/* the second container */}
        <div className="flex h-auto flex-col gap-8 rounded-md bg-border-dark p-4">
          {/* the info details */}
          <div className="flex w-full justify-between">
            <div className="flex flex-col gap-1">
              <p className="font-bold text-title-dark">
                <span className="text-primary">#</span>{id}
              </p>
              <p className="text-sm text-dark" style={{ fontSize: "0.7rem" }}>
                Re-branding
              </p>
            </div>

            <div
              className="text-right text-sm text-dark"
              style={{ fontSize: "0.65rem" }}
            >
              <p>{senderAddress.street}</p>
              <p>{senderAddress.city} </p>
              <p>{senderAddress.postCode}</p>
              <p>{senderAddress.country}</p>
            </div>
          </div>

          {/* name, invoice date etc */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-0 items-center md:items-start justify-between">
            <div className="flex flex-row md:w-auto w-full md:flex-col justify-between">
              <div className="flex flex-col gap-1">
                <p className="text-sm text-dark" style={{ fontSize: ".7rem" }}>
                  Invoice Date
                </p>
                <p
                  className="text text-base font-bold text-title-dark"
                  style={{ fontSize: ".9rem" }}
                >
                  {createdAt}
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <p className="text-sm text-dark" style={{ fontSize: ".7rem" }}>
                  Payment Due
                </p>
                <p
                  className="text text-base font-bold text-title-dark"
                  style={{ fontSize: ".9rem" }}
                >
                  {paymentDue}
                </p>
              </div>
            </div>

            <div
              className="flex flex-col items-start gap-0.5 text-left text-sm text-dark "
              style={{ fontSize: "0.7rem" }}
            >
              <p>Bill To</p>
              <p
                className="text text-base font-bold text-title-dark"
                style={{ fontSize: ".9rem" }}
              >
                {clientName}
              </p>
              <p>{clientAddress.street}</p>
              <p>{clientAddress.city}</p>
              <p>{clientAddress.postCode}</p>
              <p>{clientAddress.country}</p>
            </div>

            <div
              className="flex flex-col items-start gap-0.5 text-left text-sm text-dark "
              style={{ fontSize: "0.7rem" }}
            >
              <p>Sent to</p>
              <p
                className="text text-base font-bold text-title-dark"
                style={{ fontSize: ".9rem" }}
              >
               {clientEmail}
              </p>
            </div>
          </div>

          {/* bottom table containing pice and amount */}
          <div className="rounded-md">
            <table className="w-full rounded-t-md bg-secondary-hover">
              <thead>
                <tr
                  className="text-sm font-extralight text-dark"
                  style={{ fontSize: ".7rem" }}
                >
                  <th className="p-4 text-left">Item Name</th>
                  <th className="p-4 text-center">QTY.</th>
                  <th className="p-4 text-right">Price</th>
                  <th className="p-4 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
  {items.map((item) => (
    <tr className="bg-row-bg text-sm font-semibold text-title-dark" key={item.name}>
      <td className="p-4">{item.name}</td>
      <td className="p-4 text-center">{item.quantity}</td>
      <td className="p-4 text-right">&#163;{item.price}</td>
      <td className="p-4 text-right">&#163;{item.total}</td>
    </tr>
  ))}
</tbody>
            </table>
            <div className="flex items-center justify-between rounded-b-md bg-black p-6">
              <p className="text-dark">Amount Due</p>
              <p className="text-2xl font-semibold text-dark">&#163;{total}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemEdit;


// delete modal function
function DeleteConfirmationModal({ onClose, onDelete }) {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-opacity-50 bg-black">
      <div className="bg-border-dark p-6 rounded-lg w-80">
        <h2 className="text-xl font-semibold mb-4 text-title-dark">Confirm Deletion</h2>
        <p className="mb-4 text-dark text-sm">
          Are you sure you want to delete this invoice? This action cannot be
          undone.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 rounded-md text-dark bg-secondary hover:bg-secondary-hover"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white"
            onClick={onDelete}
          >
            Delete
          </button>
          
        </div>
      </div>
    </div>
  );
}

DeleteConfirmationModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

ItemEdit.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      status: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      paymentDue: PropTypes.string.isRequired,
      clientName: PropTypes.string.isRequired,
      senderAddress: PropTypes.shape({
        street: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        postCode: PropTypes.string.isRequired,
        country: PropTypes.string.isRequired,
      }).isRequired,
      clientAddress: PropTypes.shape({
        street: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        postCode: PropTypes.string.isRequired,
        country: PropTypes.string.isRequired,
      }).isRequired,
      clientEmail: PropTypes.string.isRequired,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          quantity: PropTypes.number.isRequired,
          price: PropTypes.number.isRequired,
          total: PropTypes.number.isRequired,
        })
      ).isRequired,
      total: PropTypes.number.isRequired,
    })
  ).isRequired,
};
