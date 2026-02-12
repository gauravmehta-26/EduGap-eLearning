# Quick MongoDB Setup (5 Minutes)

## 🚀 Fastest Way: MongoDB Atlas (Cloud)

### 1. Create Free Account
Go to: https://www.mongodb.com/cloud/atlas/register

### 2. Create Free Cluster
- Click "Build a Database"
- Choose "M0 FREE" tier
- Click "Create Cluster" (wait 3-5 min)

### 3. Create Database User
- Go to "Database Access"
- Click "Add New Database User"
- Username: `edugap_user`
- Password: Create a strong password (save it!)
- Click "Add User"

### 4. Allow Network Access
- Go to "Network Access"
- Click "Add IP Address"
- Click "Allow Access from Anywhere"
- Click "Confirm"

### 5. Get Connection String
- Go to "Database" → Click "Connect"
- Choose "Connect your application"
- Copy the connection string

### 6. Configure Your App
Edit `.env.local` file:
```bash
MONGODB_URI=mongodb+srv://edugap_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/edugap?retryWrites=true&w=majority
```

Replace:
- `edugap_user` with your username
- `YOUR_PASSWORD` with your password
- `cluster0.xxxxx` with your cluster address

### 7. Test Connection
```bash
npm run test:db
```

You should see: ✅ MongoDB Connected Successfully!

### 8. Start Your App
```bash
npm run dev
```

Visit http://localhost:3000 and complete a quiz. Your data will be saved to MongoDB!

---

## 🏠 Alternative: Local MongoDB

### Install MongoDB
**Windows**: Download from https://www.mongodb.com/try/download/community

**Mac**:
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux**:
```bash
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
```

### Configure
Edit `.env.local`:
```bash
MONGODB_URI=mongodb://localhost:27017/edugap
```

### Test
```bash
npm run test:db
npm run dev
```

---

## ✅ Verify It's Working

1. Start the app: `npm run dev`
2. Go to http://localhost:3000
3. Complete a quiz
4. Check MongoDB:
   - **Atlas**: Go to "Browse Collections" in your cluster
   - **Local**: Use MongoDB Compass or `mongosh`

You should see your quiz results saved in the `userresults` collection!

---

## 🆘 Troubleshooting

**"MongoDB URI not found"**
→ Make sure `.env.local` exists and has `MONGODB_URI=...`

**"Authentication failed"**
→ Check username and password in connection string

**"Connection timeout"**
→ Check internet connection and IP whitelist (Atlas)

**"Connection refused"**
→ Make sure MongoDB is running (local)

---

## 📚 Full Documentation

See `MONGODB_SETUP.md` for detailed instructions and troubleshooting.

---

**That's it! Your app is now connected to MongoDB! 🎉**
