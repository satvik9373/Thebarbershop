import { google } from 'googleapis';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.SPREADSHEET_ID;

    // Fetch Hero
    const heroResponse = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Hero!A1:K1',
    });
    const heroValues = heroResponse.data.values?.[0] || [];
    const hero = {
      tagline: heroValues[0] || '',
      title: heroValues[1] || '',
      titleHighlight: heroValues[2] || '',
      description: heroValues[3] || '',
      primaryButtonText: heroValues[4] || '',
      primaryButtonLink: heroValues[5] || '',
      secondaryButtonText: heroValues[6] || '',
      secondaryButtonLink: heroValues[7] || '',
      media: {
        type: heroValues[8] || 'video',
        src: heroValues[9] || '',
        alt: heroValues[10] || '',
      },
    };

    // Fetch Services
    const servicesMetaResponse = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Services!A1:C1',
    });
    const servicesMetaValues = servicesMetaResponse.data.values?.[0] || [];
    const servicesItemsResponse = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Services!A2:F',
    });
    const servicesItemsValues = servicesItemsResponse.data.values || [];
    const services = {
      tagline: servicesMetaValues[0] || '',
      title: servicesMetaValues[1] || '',
      titleHighlight: servicesMetaValues[2] || '',
      items: servicesItemsValues.map(row => ({
        title: row[0] || '',
        subtitle: row[1] || '',
        description: row[2] || '',
        media: {
          type: row[3] || 'image',
          src: row[4] || '',
          alt: row[5] || '',
        },
      })),
    };

    // Fetch Gallery
    const galleryMetaResponse = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Gallery!A1:C1',
    });
    const galleryMetaValues = galleryMetaResponse.data.values?.[0] || [];
    const galleryItemsResponse = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Gallery!A2:C',
    });
    const galleryItemsValues = galleryItemsResponse.data.values || [];
    const gallery = {
      tagline: galleryMetaValues[0] || '',
      title: galleryMetaValues[1] || '',
      titleHighlight: galleryMetaValues[2] || '',
      items: galleryItemsValues.map(row => ({
        type: row[0] || 'image',
        src: row[1] || '',
        alt: row[2] || '',
      })),
    };

    res.status(200).json({ hero, services, gallery });
  } catch (error) {
    console.error('CMS API Error:', error);
    res.status(500).json({ error: 'Failed to fetch CMS data' });
  }
}