const { spawn } = require('child_process');
const chokidar = require('chokidar');
const path = require('path');

let devServer = null;

function startDevServer() {
  console.log('🚀 Démarrage du serveur de développement...');
  
  devServer = spawn('npm', ['run', 'dev'], {
    stdio: 'inherit',
    shell: true,
    cwd: process.cwd()
  });

  devServer.on('error', (err) => {
    console.error('❌ Erreur du serveur:', err);
  });

  devServer.on('exit', (code) => {
    console.log(`🔄 Serveur arrêté avec le code: ${code}`);
  });
}

function restartDevServer() {
  console.log('🔄 Redémarrage du serveur...');
  
  if (devServer) {
    devServer.kill();
  }
  
  setTimeout(() => {
    startDevServer();
  }, 1000);
}

// Surveiller les fichiers de configuration
const watcher = chokidar.watch([
  'package.json',
  'vite.config.ts',
  '.env',
  'tsconfig.json'
], {
  ignored: /node_modules/,
  persistent: true
});

watcher.on('change', (filePath) => {
  console.log(`📝 Fichier modifié: ${filePath}`);
  restartDevServer();
});

// Démarrage initial
startDevServer();

// Gestion de l'arrêt propre
process.on('SIGINT', () => {
  console.log('\n👋 Arrêt du script...');
  if (devServer) {
    devServer.kill();
  }
  watcher.close();
  process.exit(0);
});

console.log('👀 Surveillance des fichiers de configuration activée...');
console.log('📁 Fichiers surveillés: package.json, vite.config.ts, .env, tsconfig.json');
console.log('⚡ Le serveur redémarrera automatiquement si ces fichiers changent');
