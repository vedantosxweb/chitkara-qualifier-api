const testCases = [
  {
    name: "Fibonacci Test",
    endpoint: "/bfhl",
    method: "POST",
    body: { fibonacci: 7 },
    expected: [0, 1, 1, 2, 3, 5, 8]
  },
  {
    name: "Prime Test",
    endpoint: "/bfhl",
    method: "POST",
    body: { prime: [2, 4, 7, 9, 11] },
    expected: [2, 7, 11]
  },
  {
    name: "LCM Test",
    endpoint: "/bfhl",
    method: "POST",
    body: { lcm: [12, 18, 24] },
    expected: 72
  },
  {
    name: "HCF Test",
    endpoint: "/bfhl",
    method: "POST",
    body: { hcf: [24, 36, 60] },
    expected: 12
  },
  {
    name: "Health Check",
    endpoint: "/health",
    method: "GET"
  }
];

async function runTests(baseUrl) {
  console.log("Running API Tests...\n");
  
  for (const test of testCases) {
    try {
      const url = `${baseUrl}${test.endpoint}`;
      const options = {
        method: test.method,
        headers: { 'Content-Type': 'application/json' }
      };
      
      if (test.body) {
        options.body = JSON.stringify(test.body);
      }
      
      const response = await fetch(url, options);
      const data = await response.json();
      
      console.log(`✓ ${test.name}`);
      console.log(`  Status: ${response.status}`);
      console.log(`  Response:`, JSON.stringify(data, null, 2));
      console.log();
      
    } catch (error) {
      console.log(`✗ ${test.name}`);
      console.log(`  Error: ${error.message}`);
      console.log();
    }
  }
}

// Usage: node test.js http://localhost:3000
const baseUrl = process.argv[2] || 'http://localhost:3000';
runTests(baseUrl);
