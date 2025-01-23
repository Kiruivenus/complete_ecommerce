import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import { addFeatureImage, getFeatureImages } from "@/store/common-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.commonFeature);

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  function handleUploadFeatureImage() {
    if (!uploadedImageUrl) {
      alert("Please upload an image before submitting.");
      return;
    }
    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImageUrl("");
        alert("Image uploaded successfully!");
      } else {
        alert("Failed to upload image. Please try again.");
      }
    });
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-semibold text-gray-800 mb-4">
        Admin Dashboard: Feature Images
      </h1>

      {/* Upload Section */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-medium text-gray-700 mb-2">Upload New Feature Image</h2>
        <ProductImageUpload
          imageFile={imageFile}
          setImageFile={setImageFile}
          uploadedImageUrl={uploadedImageUrl}
          setUploadedImageUrl={setUploadedImageUrl}
          setImageLoadingState={setImageLoadingState}
          imageLoadingState={imageLoadingState}
          isCustomStyling={true}
        />
        <Button
          onClick={handleUploadFeatureImage}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md"
          disabled={imageLoadingState}
        >
          {imageLoadingState ? "Uploading..." : "Upload"}
        </Button>
      </div>

      {/* Display Section */}
      <div className="mt-6">
        <h2 className="text-lg font-medium text-gray-700 mb-4">Uploaded Feature Images</h2>
        {featureImageList && featureImageList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureImageList.map((featureImgItem, index) => (
              <div key={index} className="relative group bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={featureImgItem.image}
                  alt={`Feature Image ${index}`}
                  className="w-full h-[200px] sm:h-[250px] lg:h-[300px] object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-white font-semibold">Feature Image {index + 1}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No feature images uploaded yet.</p>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
