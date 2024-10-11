// pages/api/connectInsta.js
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req, res) {
  try {
    // Extract the authorization code from the query parameters
    const authorizationCode = req.query.code;

    // Check if the authorization code is present
    if (!authorizationCode) {
      console.error('Authorization code is missing in the callback.');
      return res.status(400).json({ error: 'Authorization code is missing' });
    }

    // Handle the authorization code (e.g., exchange it for an access token)
    // Perform any other necessary logic here

    // Respond with a success message or redirect to another page
    res.status(200).json({ message: 'Instagram authentication successful!' });
  } catch (error) {
    console.error('Error handling Instagram callback:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
