// Add any general utility functions here
export const formatPrice = (price) => {
  return new Intl.NumberFormat('ar-SA', { style: 'currency', currency: 'SAR' }).format(price);
};

export const getImageUrl = (path) => {
    // Implement logic to get full image URL from storage path if needed
    return path; // For now, assuming path is already a full URL or relative path handled by Firebase storage logic
}
