import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";function AddressCard({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
  selectedId,
}) {
  const { address, city, pincode, phone, notes } = addressInfo || {};

  return (
    <Card
      onClick={
        setCurrentSelectedAddress
          ? () => setCurrentSelectedAddress(addressInfo)
          : null
      }
      className={`cursor-pointer transition-all duration-300 ease-in-out transform hover:shadow-md rounded-lg p-4 border ${
        selectedId?._id === addressInfo?._id
          ? "border-orange-500"
          : "border-gray-300"
      }`}
    >
      <CardContent className="flex items-start justify-between">
        {/* Left Section: Radio button and details */}
        <div className="flex items-start space-x-3">
          {/* Radio button */}
          <input
            type="radio"
            checked={selectedId?._id === addressInfo?._id}
            onChange={() => setCurrentSelectedAddress?.(addressInfo)}
            className="h-5 w-5 text-orange-500 focus:ring-orange-500"
            aria-label="Select address"
          />

          {/* Address Details */}
          <div>
           
            <p className="text-sm text-gray-600">{address || "Address not available"}</p>
            <p className="text-sm text-gray-600">{pincode || "Postal code not available"}</p>
            <p className="text-sm text-gray-600">{city || "City not available"}</p>
            <p className="text-sm text-gray-600">{phone || "Phone not available"}</p>
            <p className="text-sm text-gray-600">{notes || "P not available"}</p>

            {/* Default Address Tag */}
            {selectedId?._id === addressInfo?._id && (
              <p className="mt-2 inline-block px-3 py-1 text-xs font-medium text-white bg-gray-800 rounded-full">
                DEFAULT ADDRESS
              </p>
            )}
          </div>
        </div>

        {/* Edit and Delete Icons */}
        <div className="flex space-x-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleEditAddress(addressInfo);
            }}
            className="text-orange-500 hover:text-orange-600"
            aria-label="Edit address"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-2.036a2.5 2.5 0 113.536 3.536L7.5 20.5H4v-3.5L16.732 5.732z"
              />
            </svg>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteAddress(addressInfo);
            }}
            className="text-red-500 hover:text-red-600"
            aria-label="Delete address"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-1 12a2 2 0 01-2 2H8a2 2 0 01-2-2L5 7m5-4h4m-4 0a2 2 0 00-2 2m6-2a2 2 0 012 2m-8 4h8m-8 4h8m-8 4h8"
              />
            </svg>
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

export default AddressCard;