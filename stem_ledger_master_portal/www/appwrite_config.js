// Appwrite Central Configuration for STEM Ledger
const APPWRITE_CONFIG = {
  ENDPOINT: 'https://cloud.appwrite.io/v1',
  PROJECT_ID: '6a8597db0023283e1bde',
  DATABASE_ID: 'stem_ledger_db',
  COLLECTIONS: {
    SCHOOLS: 'schools',
    REQUESTS: 'equipment_requests',
    MESSAGES: 'messages',
    REVOKED: 'revoked_schools'
  },
  BUCKET_ID: 'stem_assets'
};

if (typeof window !== 'undefined') {
  window.APPWRITE_CONFIG = APPWRITE_CONFIG;
}
