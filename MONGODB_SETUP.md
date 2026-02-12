# MongoDB Setup Guide for EduGap

Your application is already configured to work with MongoDB. Follow one of these options to connect:

## Option 1: MongoDB Atlas (Cloud - Recommended for Quick Setup)

### Step 1: Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Sign up for a free account
3. Verify your email

### Step 2: Create a Cluster

1. Click **"Build a Database"**
2. Choose **"M0 FREE"** tier
3. Select a cloud provider and region (choose closest to you)
4. Click **"Create Cluster"** (takes 3-5 minutes)

### Step 3: Create Database User

1. Go to **"Database Access"** in left sidebar
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Set username (e.g., `edugap_user`)
5. Set a strong password (save it!)
6. Set privileges to **"Read and write to any database"**
7. Click **"Add User"**

### Step 4: Whitelist Your IP Address

1. Go to **"Network Access"** in left sidebar
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (for development)
   - Or add your specific IP for better security
4. Click **"Confirm"**

### Step 5: Get Connection String

1. Go to **"Database"** in left sidebar
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Select **"Node.js"** driver and version **"5.5 or later"**
5. Copy the connection string (looks like):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### Step 6: Configure Your Application

1. Open `.env.local` file in your project root
2. Replace the placeholder with your actual connection string:

```bash
MONGODB_URI=mongodb+srv://edugap_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/edugap?retryWrites=true&w=majority
```

**Important**: 
- Replace `<username>` with your database username
- Replace `<password>` with your database password
- Add `/edugap` before the `?` to specify the database name

**Example**:
```bash
MONGODB_URI=mongodb+srv://edugap_user:MySecurePass123@cluster0.abc123.mongodb.net/edugap?retryWrites=true&w=majority
```

### Step 7: Test Connection

1. Restart your development server:
```bash
npm run dev
```

2. Check the console for:
```
MongoDB connected successfully
```

3. Test by completing a quiz and checking if data is saved

---

## Option 2: Local MongoDB (For Development)

### Step 1: Install MongoDB Locally

**Windows:**
1. Download from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
2. Run the installer
3. Choose "Complete" installation
4. Install as a Windows Service
5. Install MongoDB Compass (GUI tool)

**Mac (using Homebrew):**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod
```

### Step 2: Verify MongoDB is Running

```bash
# Check if MongoDB is running
mongosh --eval "db.version()"
```

You should see the MongoDB version number.

### Step 3: Configure Your Application

1. Open `.env.local` file
2. Set the local connection string:

```bash
MONGODB_URI=mongodb://localhost:27017/edugap
```

### Step 4: Test Connection

1. Restart your development server:
```bash
npm run dev
```

2. Check the console for:
```
MongoDB connected successfully
```

---

## Verify Database Connection

### Method 1: Check Console Logs

When you start the app, you should see:
```
MongoDB connected successfully
```

If you see:
```
No MongoDB URI provided. Running without database.
```
Then check your `.env.local` file.

### Method 2: Complete a Quiz

1. Go to http://localhost:3000
2. Login with name and email
3. Select a subject
4. Complete the quiz
5. View dashboard

### Method 3: Check Database (MongoDB Atlas)

1. Go to MongoDB Atlas dashboard
2. Click **"Browse Collections"** on your cluster
3. You should see:
   - Database: `edugap`
   - Collection: `userresults`
   - Documents with your quiz results

### Method 4: Check Database (Local MongoDB)

Using MongoDB Compass:
1. Open MongoDB Compass
2. Connect to `mongodb://localhost:27017`
3. Look for `edugap` database
4. Check `userresults` collection

Using command line:
```bash
mongosh
use edugap
db.userresults.find().pretty()
```

---

## Troubleshooting

### Error: "MongooseServerSelectionError"

**Problem**: Can't connect to MongoDB

**Solutions**:
- Check your internet connection (for Atlas)
- Verify connection string is correct
- Check IP whitelist in Atlas (Network Access)
- Ensure MongoDB service is running (for local)

### Error: "Authentication failed"

**Problem**: Wrong username or password

**Solutions**:
- Double-check username and password in `.env.local`
- Ensure password doesn't contain special characters that need URL encoding
- If password has special characters, encode them:
  - `@` → `%40`
  - `:` → `%3A`
  - `/` → `%2F`
  - `?` → `%3F`

### Error: "No MongoDB URI provided"

**Problem**: `.env.local` file not found or empty

**Solutions**:
- Ensure `.env.local` exists in project root
- Check that `MONGODB_URI` is set
- Restart the dev server after creating/editing `.env.local`

### App Works But No Data Saved

**Problem**: Connection successful but data not persisting

**Solutions**:
- Check browser console for errors
- Verify `/api/saveResult` is being called
- Check MongoDB logs in Atlas or local logs
- Ensure database user has write permissions

---

## Environment Variables Reference

Create or edit `.env.local` in your project root:

```bash
# MongoDB Atlas (Cloud)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/edugap?retryWrites=true&w=majority

# OR

# Local MongoDB
MONGODB_URI=mongodb://localhost:27017/edugap

# OR

# Leave empty to run without database (uses mock data)
MONGODB_URI=
```

---

## Database Schema

Your application uses this schema:

```typescript
{
  email: String,           // User's email
  failureRisk: Number,     // Risk score (0-100)
  weakConcepts: [String],  // Array of weak concepts
  createdAt: Date          // Timestamp
}
```

**Example Document**:
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "email": "student@example.com",
  "failureRisk": 75,
  "weakConcepts": ["Electrostatics", "Trigonometry"],
  "createdAt": "2024-01-30T10:30:00.000Z"
}
```

---

## Next Steps

After connecting MongoDB:

1. ✅ Complete a quiz to test data persistence
2. ✅ Check MongoDB to verify data is saved
3. ✅ Try multiple quizzes with different emails
4. ✅ View historical data in MongoDB

Your application will automatically:
- Save quiz results to MongoDB
- Fall back to mock data if connection fails
- Handle connection errors gracefully

---

## Security Best Practices

1. **Never commit `.env.local`** to version control (already in `.gitignore`)
2. **Use strong passwords** for database users
3. **Restrict IP access** in production (not "Allow from Anywhere")
4. **Rotate credentials** regularly
5. **Use environment-specific databases** (dev, staging, production)

---

## Need Help?

- MongoDB Atlas Docs: https://docs.atlas.mongodb.com/
- MongoDB Node.js Driver: https://docs.mongodb.com/drivers/node/
- Mongoose Docs: https://mongoosejs.com/docs/

Your application is ready to connect to MongoDB! Choose your preferred option and follow the steps above.
