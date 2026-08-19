# Kpando Municipal STEM Ledger Ecosystem

A comprehensive digital equipment ledger, inter-school lending supervision platform, and municipal STEM management ecosystem for the Ghana Education Service (Kpando Municipal).

---

## Portals & Structure

1. **Central Portal Hub (/)**: Main landing page directing users to their designated portal.
2. **STEM Master Portal (/master)**: Science Coordinator dashboard for monitoring aggregate district inventories, reviewing inter-school requests, issuing password resets, and managing school credentials.
3. **STEM School App (/school)**: Dedicated inventory management, item tracking (available, broken, lost), and request approval system for Senior High & STEM institutions.
4. **STEM Community App (/community)**: Catalog browsing, multi-item borrowing requests, and return tracking for Community Basic Schools.

---

## Backend & Cloud Infrastructure

- **Backend**: [Appwrite Cloud](https://cloud.appwrite.io/) (Project: kpando-stem-ledger / 6a8597db0023283e1bde)
  - **Databases**: stem_ledger_db
  - **Collections**: schools, equipment_requests, messages, 
evoked_schools
  - **Storage**: stem_assets
- **Hosting**: [Vercel](https://vercel.com/) (Multi-path SPA routing configured via ercel.json)
- **Mobile**: Capacitor Android Shells with Live In-App Remote Updates.

---

## Local Development

`ash
# Start all 4 local development servers:
node start_hosts.js
`

- Portal Hub: http://localhost:3000
- School App: http://localhost:8080
- Community App: http://localhost:8081
- Master Portal: http://localhost:8082

---

## Deployment to Vercel

1. Push this repository to GitHub.
2. Import the repository in your [Vercel Dashboard](https://vercel.com/new).
3. Framework Preset: **Other** / **Static Site**.
4. Root Directory: ./
5. Click **Deploy**. Vercel will automatically read ercel.json and deploy all 3 applications under your domain!
