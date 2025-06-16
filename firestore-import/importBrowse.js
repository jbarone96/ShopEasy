const admin = require("firebase-admin");
const fs = require("fs");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const products = JSON.parse(fs.readFileSync("browse_products.json", "utf8"));

const uploadProducts = async () => {
  const batch = db.batch();
  const collectionRef = db.collection("browseProducts");

  products.forEach((item) => {
    const docRef = collectionRef.doc(); // auto-generated ID
    batch.set(docRef, item);
  });

  await batch.commit();
  console.log("🔥 Browse Products uploaded successfully!");
};

uploadProducts().catch((err) => console.error("❌ Upload failed:", err));
