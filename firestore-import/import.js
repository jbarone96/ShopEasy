const admin = require("firebase-admin");
const fs = require("fs");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const deals = JSON.parse(fs.readFileSync("todays_deals.json", "utf8"));

const uploadDeals = async () => {
  const batch = db.batch();
  const collectionRef = db.collection("todaysDeals");

  deals.forEach((item) => {
    const docRef = collectionRef.doc(); // auto-ID
    batch.set(docRef, item);
  });

  await batch.commit();
  console.log("🔥 Today's Deals uploaded successfully!");
};

uploadDeals().catch((err) => console.error("Error uploading:", err));
