export default ({ env }) => ({
  upload: {
    config: {
      // Configuration locale temporaire
      sizeLimit: 250 * 1024 * 1024, // 250mb

      // Configuration Cloudinary (à activer quand le nom cloud sera fourni)
      // provider: 'cloudinary',
      // providerOptions: {
      //   cloud_name: env('CLOUDINARY_NAME'),
      //   api_key: env('CLOUD_API_KEY'),
      //   api_secret: env('CLOUD_SECRET_KEY'),
      // },
      // actionOptions: {
      //   upload: {},
      //   uploadStream: {},
      //   delete: {},
      // },
    },
  },
});
