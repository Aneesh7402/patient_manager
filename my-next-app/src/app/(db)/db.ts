import { PGlite } from "@electric-sql/pglite";
import { live } from "@electric-sql/pglite/live";
import { uuid } from "drizzle-orm/gel-core";
import { v4 as uuidv4 } from 'uuid';

let db: PGlite;

export async function getDb() {
  if (!db) {
    db = new PGlite({ dataDir: "idb://carequery", extensions: { live } });

    await db.exec(`
      CREATE TABLE IF NOT EXISTS patients (
        id UUID PRIMARY KEY,
        first_name TEXT,
        last_name TEXT,
        dob DATE,
        gender TEXT,
        phone TEXT,
        email TEXT,
        address TEXT,
        insurance_info_id UUID, -- Change this to UUID
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS medical_history (
        id UUID PRIMARY KEY,
        patient_id UUID REFERENCES patients(id) ON DELETE CASCADE, -- Use UUID for foreign key
        condition_name TEXT,
        condition_details TEXT
      );

      CREATE TABLE IF NOT EXISTS medications (
        id UUID PRIMARY KEY,
        patient_id UUID REFERENCES patients(id) ON DELETE CASCADE, -- Use UUID for foreign key
        medication_name TEXT,
        dosage TEXT,
        frequency TEXT
       
      );



      CREATE TABLE IF NOT EXISTS insurance_info (
        id UUID PRIMARY KEY,
        patient_id UUID REFERENCES patients(id) ON DELETE CASCADE, -- Use UUID for foreign key
        provider_name TEXT,
        policy_number TEXT,
        expiry_date DATE
        
      );
    `);
  }
  return db;
}


// Dummy check
interface CountResult {
  count: number;
}



export async function insertDummyDataIfNeeded() {
  const db = await getDb();

  // Check if any patients exist
  const result = await db.query(`
    SELECT COUNT(*) FROM patients;
  `);
  const count = parseInt(result.rows[0].count);
  if (count > 0) return;

  // Insert patients with UUIDs
  const patient1Id = uuidv4();
  const patient2Id = uuidv4();

  await db.query(`
    INSERT INTO patients (id, first_name, last_name, dob, gender, phone, email, address)
    VALUES
      ($1, 'John', 'Doe', '1980-01-01', 'Male', '123-456-7890', 'john.doe@example.com', '123 Main St'),
      ($2, 'Jane', 'Doe', '1990-05-15', 'Female', '987-654-3210', 'jane.doe@example.com', '456 Elm St');
  `, [patient1Id, patient2Id]);

  // Insert medical history with UUID patient references
  await db.query(`
    INSERT INTO medical_history (id, patient_id, condition_name, condition_details)
    VALUES
      ($1, $2, 'Hypertension', 'High blood pressure, managed with medication'),
      ($3, $4, 'Asthma', 'Occasional asthma attacks'),
      ($5, $6, 'Diabetes', 'Type 2 diabetes, controlled with diet and exercise'),
      ($7, $8, 'Migraine', 'Frequent migraines, managed with medication');
  `, [
    uuidv4(), patient1Id,
    uuidv4(), patient1Id,
    uuidv4(), patient2Id,
    uuidv4(), patient2Id
  ]);

  // Insert medications with UUID patient references
  await db.query(`
    INSERT INTO medications (id, patient_id, medication_name, dosage, frequency)
    VALUES
      ($1, $2, 'Lisinopril', '10 mg', 'Once a day'),
      ($3, $4, 'Albuterol', '90 mcg', 'As needed'),
      ($5, $6, 'Metformin', '500 mg', 'Twice a day'),
      ($7, $8, 'Sumatriptan', '50 mg', 'As needed');
  `, [
    uuidv4(), patient1Id,
    uuidv4(), patient1Id,
    uuidv4(), patient2Id,
    uuidv4(), patient2Id
  ]);


  // Insert insurance information with UUID patient references
  await db.query(`
    INSERT INTO insurance_info (id, patient_id, provider_name, policy_number, expiry_date)
    VALUES
      ($1, $2, 'Acme Health', 'XYZ12345', '2024-12-31'),
      ($3, $4, 'Best Care Insurance', 'ABC98765', '2025-06-30');
  `, [
    uuidv4(), patient1Id,
    uuidv4(), patient2Id
  ]);
}


// Insert helpers
export async function insertPatient(data: {
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
}) {
  console.log("Inserting patient data:", data);
  const db = await getDb();
  const patientId = uuidv4(); // Generate a new UUID for the patient
  await db.query(
    `INSERT INTO patients (id, first_name, last_name, dob, gender, phone, email, address)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
    [
      patientId, // UUID passed as id
      data.firstName,
      data.lastName,
      data.dob,
      data.gender,
      data.phone,
      data.email,
      data.address,
    ]
  );
  return patientId; // Return the generated UUID for the patient
}
type MedicalHistoryEntry = {
  conditionName: string;
  conditionDetails: string;
};

export async function insertMedicalHistory(
  patientId: number,
  medicalHistory: MedicalHistoryEntry[]
): Promise<string[]> {
  if (medicalHistory.length === 0) return [];

  const db = await getDb();

  const values: any[] = [];
  const placeholders: string[] = [];
  const ids: string[] = [];

  medicalHistory.forEach((entry, index) => {
    const id = uuidv4();
    ids.push(id);

    const offset = index * 4;
    placeholders.push(`($${offset + 1}, $${offset + 2}, $${offset + 3}, $${offset + 4})`);

    values.push(id, patientId, entry.conditionName, entry.conditionDetails);
  });

  const query = `
    INSERT INTO medical_history (id, patient_id, condition_name, condition_details)
    VALUES ${placeholders.join(", ")}
  `;

  await db.query(query, values);

  return ids;
}

export async function insertMedications(
  patientId: number,
  medications: {
    medicationName: string;
    dosage: string;
    frequency: string;
  }[]
) {
  const db = await getDb();

  const values = medications.map((med) => [
    uuidv4(),
    patientId,
    med.medicationName,
    med.dosage,
    med.frequency,
  ]);

  const placeholders = values
    .map((_, i) => `($${i * 5 + 1}, $${i * 5 + 2}, $${i * 5 + 3}, $${i * 5 + 4}, $${i * 5 + 5})`)
    .join(", ");

  const flatValues = values.flat();

  await db.query(
    `INSERT INTO medications (id, patient_id, medication_name, dosage, frequency)
     VALUES ${placeholders}`,
    flatValues
  );

  return values.map(([id]) => id); // return all generated UUIDs
}


export async function insertInsuranceInfo(
  patientId: number,
  providerName: string,
  policyNumber: string,
  expiryDate: string
) {
  const db = await getDb();
  const insuranceId = uuidv4(); // Generate a new UUID for insurance info
  await db.query(
    `INSERT INTO insurance_info (id ,patient_id, provider_name, policy_number, expiry_date)
     VALUES ($1, $2, $3, $4, $5)`,
    [insuranceId,patientId, providerName, policyNumber, expiryDate]
  );
  return insuranceId
}

// Getters
export async function getAllPatients() {
  const db = await getDb();
  return db.query("SELECT * FROM patients");
}

export async function getPatientById(id: string) {
  const db = await getDb();
  return db.query("SELECT * FROM patients WHERE id = $1", [id]);
}

export async function getMedicalHistoryForPatient(id: string) {
  const db = await getDb();
  return db.query("SELECT * FROM medical_history WHERE patient_id = $1", [id]);
}

export async function getMedicationsForPatient(id: string) {
  const db = await getDb();
  return db.query("SELECT * FROM medications WHERE patient_id = $1", [id]);
}



export async function getInsuranceInfoForPatient(id: string) {
  const db = await getDb();
  return db.query("SELECT * FROM insurance_info WHERE patient_id = $1", [id]);
}

export async function getAllPatientDetails() {
  const db = await getDb();

  return db.query(`
    SELECT
      p.id AS patient_id,
      p.first_name,
      p.last_name,
      p.dob,
      p.gender,
      p.phone,
      p.email,
      p.address,
      array_agg(DISTINCT mh.condition_name) AS medical_conditions,
      array_agg(DISTINCT mh.condition_details) AS condition_details,
      array_agg(DISTINCT m.medication_name) AS medication_names,
      array_agg(DISTINCT m.dosage) AS dosages,
      array_agg(DISTINCT m.frequency) AS frequencies,
      ins.provider_name,
      ins.policy_number,
      ins.expiry_date
    FROM patients p
    LEFT JOIN medical_history mh ON p.id = mh.patient_id
    LEFT JOIN medications m ON p.id = m.patient_id
    LEFT JOIN insurance_info ins ON p.id = ins.patient_id
    
    GROUP BY p.id, ins.provider_name, ins.policy_number, ins.expiry_date;
  `);
}



export const executeQuery = async (
  sqlQuery: string,
  params: any[] = [],
  setData: React.Dispatch<React.SetStateAction<any[]>>,
  setHeaders: React.Dispatch<React.SetStateAction<string[]>>,
  setModalError: React.Dispatch<React.SetStateAction<string | null>> // State for modal
): Promise<boolean> => {
  try {
    const database = await getDb();
    const result = await database.query(sqlQuery, params);

    if (result.rows && result.rows.length > 0) {
      // Success case: Set data and headers
      setData(result.rows);


      const keys = Object.keys(result.rows[0]);
      setHeaders(keys);
      return true;
    } else {
      // If no rows, show an error
      throw new Error("No data found");
      
    }
  } catch (error: any) {
    console.error("Query execution error:", error);

    // On failure, show error in the modal
    setModalError(error.message || "An error occurred while executing the query");
    return false
  }
};