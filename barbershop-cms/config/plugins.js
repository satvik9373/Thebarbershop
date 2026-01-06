module.exports = ({ env }) => {
  // Require Cloudinary credentials - fail if missing
  const cloudName = env("CLOUDINARY_NAME");
  const apiKey = env("CLOUDINARY_KEY");
  const apiSecret = env("CLOUDINARY_SECRET");

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error(
      "FATAL: Cloudinary credentials missing. Set CLOUDINARY_NAME, CLOUDINARY_KEY, and CLOUDINARY_SECRET. " +
      "Local uploads are disabled - Strapi will NOT start without Cloudinary."
    );
  }

  return {
    upload: {
      config: {
        provider: "cloudinary",
        providerOptions: {
          cloud_name: cloudName,
          api_key: apiKey,
          api_secret: apiSecret,
        },
      },
    },
  };
};

