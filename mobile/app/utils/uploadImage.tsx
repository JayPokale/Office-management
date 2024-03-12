const uploadImage = async (image: string) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", process.env.UPLOAD_PRESET!);
  formData.append("cloud_name", process.env.CLOUDNAME!);

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDNAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();
    return data.secure_url;
  } catch {
    return "";
  }
};

export default uploadImage;
