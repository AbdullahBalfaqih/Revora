const { execSync } = require('child_process');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

const contracts = [
  { name: 'RWA Factory', dir: 'contracts/rwa_factory' },
  { name: 'Yield Router', dir: 'contracts/yield_router' },
  { name: 'Marketplace', dir: 'contracts/marketplace' }
];

console.log("🛠️ Starting compilation of all Casper smart contracts...\n");

contracts.forEach((contract) => {
  const contractPath = path.join(rootDir, contract.dir);
  console.log(`--------------------------------------------------`);
  console.log(`📦 Compiling contract: ${contract.name}`);
  console.log(`📂 Path: ${contractPath}`);
  console.log(`--------------------------------------------------`);
  
  try {
    console.log(`[1/2] Cleaning target directory...`);
    execSync('cargo clean', { cwd: contractPath, stdio: 'inherit' });
    
    console.log(`[2/2] Building WebAssembly target...`);
    execSync('cargo build --release --target wasm32-unknown-unknown', { cwd: contractPath, stdio: 'inherit' });
    
    console.log(`✅ ${contract.name} compiled successfully!\n`);
  } catch (error) {
    console.error(`❌ Failed to compile ${contract.name}.`);
    console.error(`💡 Tip: If you see "process cannot access the file" (os error 32), please temporarily CLOSE your code editor (VS Code) or disable the "Rust Analyzer" extension, then run this script again.\n`);
  }
});

console.log("✨ Done building all contracts!");
