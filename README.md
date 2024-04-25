# Crypto Derivatives

Implementing Tradingview Lightweight-charts Library With Bitmex Derivatives Api

- **Framework**: [Next.js](https://nextjs.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma](https://prisma.io/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Deployment**: [Vercel](https://vercel.com)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file

```bash
# Database URL for prisma
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"

# URL of the website
NEXTAUTH_URL='http://localhost:3000'
FRONTEND_URL='http://localhost:3000'

# Used to hash tokens, sign/encrypt cookies and ...
# You can quickly create a good value with this command
# openssl rand -base64 32
NEXTAUTH_SECRET=VJmi1XgBd48qWC2xn/kNRc15OIY+P4a1uXgV42uaHuw=
NEXTJWT_SECRET=VDexd3kY#q8W!2o$6vVz9*mr&Np@^gLQ

# Google oAuth
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET

# SMTP creds
MAIL_USERNAME=YOUR_SMTP_USERNAME
MAIL_PASSWORD=YOUR_SMTP_PASSWORD
```

## Run Locally

Clone the project

```bash
  git clone https://github.com/karan0805/Crypto-Derivatives.git
```

Go to the project directory

```bash
  cd Crypto-Derivatives
```

Install dependencies

```bash
  npm install
```

Apply migrations to database

```bash
  npm run migrate-dev
```

Start the server

```bash
  npm run dev
```
