// Debug script to test shop API
// Paste this in browser console on your deployed site

console.log('🔍 Starting Shop Debug...');

// Test 1: Check if axios is configured correctly
console.log('📡 Current axios baseURL:', axios.defaults.baseURL);

// Test 2: Test shop API call
async function testShopAPI() {
  try {
    console.log('📞 Calling /shop/items...');
    const response = await fetch('/shop/items');
    console.log('📊 Response status:', response.status);
    
    const data = await response.json();
    console.log('✅ Shop data received:', data);
    console.log('📦 Number of items:', data.length);
    
    if (data.length > 0) {
      console.log('🎯 First item:', data[0]);
    }
    
    return data;
  } catch (error) {
    console.error('❌ Shop API Error:', error);
    return null;
  }
}

// Test 3: Check React state 
function checkReactState() {
  // This will only work if React DevTools is available
  console.log('🔍 Checking for React state...');
  
  // Look for Shop component in DOM
  const shopElement = document.querySelector('[data-testid="shop-component"]') || 
                     document.querySelector('.shop-container') ||
                     document.querySelector('section');
  
  if (shopElement) {
    console.log('🎯 Found shop element:', shopElement);
  } else {
    console.log('❌ Could not find shop element');
  }
}

// Run all tests
testShopAPI().then(data => {
  if (data && data.length > 0) {
    console.log('✅ API works - issue is frontend rendering');
  } else {
    console.log('❌ API issue found');
  }
  
  checkReactState();
});

console.log('🔧 Debug complete - check results above'); 