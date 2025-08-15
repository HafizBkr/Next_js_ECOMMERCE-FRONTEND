import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import { put } from "@vercel/blob"; // Assure-toi que ce package est installé
import { v4 as uuidv4 } from "uuid";
import fs from "fs"; // Ajout de fs pour accéder au système de fichiers

const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const form = formidable({ multiples: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Erreur lors de l'analyse du fichier:", err);
      return res
        .status(500)
        .json({ error: "Erreur lors de l'upload du fichier" });
    }

    try {
      const uploadedFiles = files.file;
      if (
        !uploadedFiles ||
        (Array.isArray(uploadedFiles) && uploadedFiles.length === 0)
      ) {
        return res
          .status(400)
          .json({ error: "Aucun fichier n'a été téléchargé" });
      }

      const fileArray = Array.isArray(uploadedFiles)
        ? uploadedFiles
        : [uploadedFiles];
      const urls = [];

      for (const file of fileArray) {
        // Définir un type pour le fichier attendu par formidable
        type FormidableFile = {
          filepath: string;
          originalFilename?: string;
        };
        const typedFile = file as FormidableFile;
        const filePath = typedFile.filepath;
        // const fileExtension = path.extname(typedFile.originalFilename ?? '').toLowerCase(); // supprimé car inutilisé

        // Vérifier si le fichier est accessible
        await new Promise<void>((resolve, reject) => {
          fs.access(
            filePath,
            fs.constants.F_OK,
            (err: NodeJS.ErrnoException | null) => {
              if (err) {
                console.error("Fichier introuvable:", filePath);
                reject("Fichier introuvable");
              } else {
                resolve();
              }
            },
          );
        });

        // Créer un nom de fichier unique avec UUID
        const filename = `${uuidv4()}-${typedFile.originalFilename ?? "file"}`;

        // Téléchargement du fichier sur Vercel Blob
        const blob = await put(filename, fs.createReadStream(filePath), {
          access: "public",
          token: BLOB_TOKEN,
        });

        console.log(
          "Fichier téléchargé avec succès sur Vercel Blob:",
          blob.url,
        );
        urls.push(blob.url);
      }

      return res.status(200).json({ urls });
    } catch (error) {
      console.error("Erreur lors de l'upload vers Blob:", error);
      return res
        .status(500)
        .json({ error: "Erreur lors de l'upload vers le storage" });
    }
  });
}
