# Careerpage-module
##Dependencies 
Node.js, Express, TypeScript, Prisma, PostgreSQL, JWT, Multer
##Features
-Public job listing
-Job application with resume upload
-JWT Authentication
-Create/Update/Deactivate Jobs
-Application Status Management
##Setup
1.Install required dependencies
npm install
2.Setup database
Add DATABASE_URL in .env
3. Run migrations
npx prisma migrate dev
4. Start server
npm run dev
##Architecture
REST API with Prisma
JWT Used for Admin Authentication
Multer handles resume uploads
