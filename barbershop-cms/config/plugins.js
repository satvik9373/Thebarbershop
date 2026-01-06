module.exports = ({ env }) => {
  if (!env("CLOUDINARY_NAME") || !env("CLOUDINARY_KEY") || !env("CLOUDINARY_SECRET")) {
    throw new Error("❌ CLOUDINARY ENV VARS MISSING — ABORTING BOOT");
  }

  return {
    upload: {
      config: {
        provider: "cloudinary",
        providerOptions: {
          cloud_name: env("CLOUDINARY_NAME"),
          api_key: env("CLOUDINARY_KEY"),
          api_secret: env("CLOUDINARY_SECRET"),
        },
      },
    },
  };
};


