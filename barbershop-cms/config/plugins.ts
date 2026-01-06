export default ({ env }) => ({
  upload: {
    config: {
      provider: "cloudinary",
      providerOptions: {
        cloudinary: {
          url: env("CLOUDINARY_URL"),
        },
      },
    },
  },
});
