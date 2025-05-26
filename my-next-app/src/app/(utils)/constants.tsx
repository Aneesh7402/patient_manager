export const SCHEMA = [
  {
    name: "patients",
    data: [
      { name: "id", type: "INTEGER PRIMARY KEY" },
      { name: "first_name", type: "TEXT" },
      { name: "last_name", type: "TEXT" },
      { name: "dob", type: "TEXT" },
      { name: "gender", type: "TEXT" },
      { name: "phone", type: "TEXT" },
      { name: "email", type: "TEXT" },
      { name: "address", type: "TEXT" },
    ],
  },
  {
    name: "medical_history",
    data: [
      { name: "id", type: "INTEGER PRIMARY KEY" },
      { name: "patient_id", type: "INTEGER" },
      { name: "condition_name", type: "TEXT" },
      { name: "condition_details", type: "TEXT" },
    ],
  },
  {
    name: "medications",
    data: [
      { name: "id", type: "INTEGER PRIMARY KEY" },
      { name: "patient_id", type: "INTEGER" },
      { name: "medication_name", type: "TEXT" },
      { name: "dosage", type: "TEXT" },
      { name: "frequency", type: "TEXT" },
    ],
  },
  {
    name: "insurance_info",
    data: [
      { name: "id", type: "INTEGER PRIMARY KEY" },
      { name: "patient_id", type: "INTEGER" },
      { name: "provider_name", type: "TEXT" },
      { name: "policy_number", type: "TEXT" },
      { name: "expiry_date", type: "TEXT" },
    ],
  },
];

export const STEPS_TO_NAMES = {
  0: "Personal Info",
  1: "Insurance Info",
  2: "Medical History",
  3: "Medications",
};

export const DUMMY_QUERIES = [
  `SELECT
    p.id AS patient_id,
    p.first_name,
    p.last_name,
    p.dob,
    p.gender,
    p.phone,
    p.email,
    p.address,
    mh.condition_name AS medical_condition,
    mh.condition_details,
    m.medication_name,
    m.dosage,
    m.frequency,
    i.provider_name AS insurance_provider,
    i.policy_number,
    i.expiry_date AS insurance_expiry
  FROM
    patients p
  LEFT JOIN medical_history mh ON p.id = mh.patient_id
  LEFT JOIN medications m ON p.id = m.patient_id
  LEFT JOIN insurance_info i ON p.id = i.patient_id
  ORDER BY
    p.last_name, p.first_name`,
  `SELECT
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
    
    GROUP BY p.id, ins.provider_name, ins.policy_number, ins.expiry_date`,
  "SELECT first_name, last_name, phone FROM patients",
  "SELECT medication_name, frequency FROM medications WHERE patient_id = '3f85f61f-4c44-41f0-bcfc-c47ec5e9b07f'",
  "SELECT condition_name, condition_details FROM medical_history WHERE patient_id = '3f85f61f-4c44-41f0-bcfc-c47ec5e9b07f'",
  "SELECT provider_name, expiry_date FROM insurance_info",
  "SELECT m.medication_name, m.dosage FROM medications m JOIN medical_history mh ON m.patient_id = mh.patient_id WHERE mh.condition_name = 'Hypertension'",
  "SELECT COUNT(*) FROM medical_history WHERE condition_name = 'Asthma'",
];
