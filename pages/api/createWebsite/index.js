import { getToken } from "next-auth/jwt";
import { templateslist } from "../../../lib/templatehtml";

const secret = process.env.NEXTAUTH_SECRET;

export default async function handler(req, res) {
  // Check if the request method is POST
  if (req.method === "POST") {
    // Get the JWT token from the request
    const token = await getToken({ req, secret });
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Extract category from the request body
    const { category } = req.body;

    if (!category) {
      return res.status(400).json({ error: "Category is required" });
    }

    // Get templates list
    const templates = templateslist();

    // Filter templates by category
    const matchingTemplates = templates.filter((t) => t.category === category);

    if (matchingTemplates.length > 0) {
      return res.status(200).json({ templates: matchingTemplates });
    } else {
      return res
        .status(404)
        .json({ error: "No templates found for the given category" });
    }
  } else {
    // Method Not Allowed
    return res.status(405).json({ error: "Method not allowed" });
  }
}
