# 🔧 Estate Deli - Troubleshooting Guide

## 🚨 Common Issues After Vercel Deployment

### Issue: Login doesn't work / Shop doesn't load

## 🔍 **Step 1: Check Browser Console**

1. **Open your deployed site**
2. **Press F12** (or right-click → Inspect)
3. **Go to Console tab**
4. **Try logging in** and look for error messages
5. **Check Network tab** for failed API calls

**Common Error Messages:**
- `401 Unauthorized` → Environment variables missing
- `500 Internal Server Error` → Database connection failed  
- `CORS error` → CORS headers issue
- `Module not found` → Import path issue

---

## 🔧 **Step 2: Verify Environment Variables**

Go to **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**

**Required Variables:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/estate_deli
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
```

**⚠️ Make sure:**
- All 4 variables are present
- No extra spaces in values
- MongoDB URI has correct password
- Gmail app password is 16 characters

**If missing:** Add them and redeploy

---

## 🗄️ **Step 3: Test Database Connection**

**Visit this URL in browser:**
```
https://your-app.vercel.app/api/shop/items
```

**Expected Results:**
- ✅ **Success**: JSON array with shop items
- ❌ **Error**: "Internal Server Error" or connection timeout

**If error:** Check MongoDB Atlas:
1. **Database Access** → User exists with correct password
2. **Network Access** → `0.0.0.0/0` whitelisted
3. **Connection string** → Correct format in Vercel

---

## 🔐 **Step 4: Test Authentication API**

**Open Browser DevTools** → **Console** → **Paste this:**

```javascript
// Test registration API
fetch('/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'test@example.com',
    password: 'password123',
    firstName: 'Test',
    lastName: 'User',
    phone: '1234567890'
  })
}).then(r => r.json()).then(console.log).catch(console.error);
```

**Expected Results:**
- ✅ **Success**: `{message: "User created successfully...", userId: "...", requiresVerification: true}`
- ❌ **Error**: Error message about database/JWT/email

---

## 📧 **Step 5: Check Email Service**

**If registration works but no OTP email:**
1. Check spam/junk folder
2. Verify EMAIL_USER and EMAIL_PASS in Vercel
3. Ensure Gmail 2FA is enabled
4. Regenerate Gmail App Password

---

## 🏃 **Quick Fixes**

### **Fix 1: Redeploy**
Sometimes Vercel needs a fresh deployment:
1. **Vercel Dashboard** → **Deployments** 
2. **Trigger redeploy** from latest commit

### **Fix 2: Clear Cache**
1. **Hard refresh** browser: `Ctrl+F5` (Windows) or `Cmd+Shift+R` (Mac)
2. **Clear localStorage**: DevTools → Application → Storage → Clear

### **Fix 3: Check API Paths**
All API calls should use relative paths:
```javascript
// ✅ Correct
axios.get('/api/shop/items')

// ❌ Wrong  
axios.get('http://localhost:5001/api/shop/items')
```

---

## 🔍 **Debug Specific Issues**

### **"Shop not loading"**
1. Check `/api/shop/items` returns data
2. Look for console errors in browser
3. Verify MongoDB has sample data

### **"Login doesn't work"**
1. Check `/api/auth/login` responds 
2. Verify JWT_SECRET is set in Vercel
3. Check if user exists in database
4. Look for authentication errors

### **"No OTP emails"**
1. Test email service manually
2. Check Gmail app password
3. Verify EMAIL_USER/EMAIL_PASS
4. Look for email service errors in logs

---

## 📊 **Vercel Function Logs**

**To see detailed errors:**
1. **Vercel Dashboard** → Your Project
2. **Functions** → Select function (e.g., `api/auth/login.js`)
3. **View logs** for real-time error messages

---

## 🆘 **Emergency: Reset Everything**

If nothing works:

1. **Redeploy from scratch:**
   ```bash
   git add .
   git commit -m "trigger redeploy"
   git push origin main
   ```

2. **Check sample data in MongoDB:**
   - Use MongoDB Compass or Atlas UI
   - Verify shop_items collection has products
   - Check users collection structure

3. **Test locally first:**
   ```bash
   npm start  # Frontend on localhost:3000
   # Should work with production APIs
   ```

---

## 📞 **Still Having Issues?**

**Collect this information:**
1. **Browser console errors** (screenshot)
2. **Network tab** showing failed requests
3. **Vercel function logs** (specific error messages)
4. **Environment variables** status (set/not set)

**Common Solutions:**
- 90% of issues = Missing/incorrect environment variables
- 5% of issues = MongoDB connection problems  
- 5% of issues = Code errors in functions

**Your app structure is correct - it's likely just configuration!** 🚀 