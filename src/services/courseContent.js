// ─────────────────────────────────────────────────────────────────────────────
// Course Content: Step-by-step lessons, gated by AI-assigned level
// Same course per level — all students at Level 1 share the same curriculum.
// ─────────────────────────────────────────────────────────────────────────────

// Maps domain + level → course ID
export const LEVEL_COURSE_MAP = {
  devops:    { 1: 'devops-l1', 2: 'devops-l2', 3: 'devops-l3', 4: 'devops-l4' },
  'web-dev': { 1: 'webdev-l1', 2: 'webdev-l2', 3: 'webdev-l3', 4: 'webdev-l4' },
  'data-ai': { 1: 'data-l1',  2: 'data-l2',  3: 'data-l3',  4: 'data-l4'  },
  cloud:     { 1: 'cloud-l1', 2: 'cloud-l2', 3: 'cloud-l3', 4: 'cloud-l4' },
  cyber:     { 1: 'cyber-l1', 2: 'cyber-l2', 3: 'cyber-l3', 4: 'cyber-l4' },
};

// Content block types: 'paragraph' | 'code' | 'tip' | 'warning' | 'heading'
// ─────────────────────────────────────────────────────────────────────────────

export const COURSES = {

  // ══════════════════════════════════════════════════════════════════════════
  // DEVOPS — LEVEL 1 (BEGINNER) — Full Example Content
  // ══════════════════════════════════════════════════════════════════════════
  'devops-l1': {
    id: 'devops-l1',
    title: 'Linux Fundamentals Bootcamp',
    domain: 'devops',
    level: 1,
    badge: '🐧',
    duration: '8h',
    description: 'Master essential Linux commands, file system navigation, permissions, and shell scripting basics.',
    color: 'from-orange-500 to-amber-500',
    lessons: [
      {
        id: 'l1-1',
        title: 'Introduction to Linux & the Shell',
        duration: '25 min',
        content: [
          { type: 'paragraph', text: 'Linux is an open-source operating system kernel used in millions of servers, devices, and cloud environments worldwide. As a DevOps engineer, Linux fluency is non-negotiable — virtually every production server you will ever manage runs a Linux distribution.' },
          { type: 'heading', text: 'What is a Shell?' },
          { type: 'paragraph', text: 'A shell is a command-line interpreter that lets you interact with the operating system by typing commands. The most popular shell is Bash (Bourne Again Shell). When you open a terminal, you are talking to a shell.' },
          { type: 'code', language: 'bash', label: 'Your first commands', code: `# Print "Hello, World!" to the terminal
echo "Hello, World!"

# Who am I? (print current logged-in user)
whoami

# Where am I? (print current directory)
pwd

# What Linux distro am I on?
uname -a` },
          { type: 'tip', text: 'Pro tip: Use the Tab key to auto-complete commands and file paths. This will save you thousands of keystrokes over your career.' },
          { type: 'heading', text: 'Terminal Navigation' },
          { type: 'paragraph', text: 'The Linux file system is a tree that starts at the root `/`. Everything — files, directories, and even hardware devices — lives inside this tree.' },
          { type: 'code', language: 'bash', label: 'Navigating directories', code: `# List files in current directory
ls

# List files with details (permissions, size, date)
ls -la

# Change directory
cd /home/user/Documents

# Go up one level
cd ..

# Go to your home directory (shortcut)
cd ~` },
        ],
        quiz: {
          question: 'Which command prints the current working directory?',
          options: ['whoami', 'ls -la', 'pwd', 'cd ~'],
          correctIndex: 2,
          explanation: '`pwd` stands for "Print Working Directory" and shows your current location in the file system.',
        },
      },
      {
        id: 'l1-2',
        title: 'File System & Permissions',
        duration: '30 min',
        content: [
          { type: 'paragraph', text: 'Linux has a strict permission system that controls who can read, write, and execute files. Understanding this is critical for security and system administration.' },
          { type: 'heading', text: 'Understanding `ls -la` Output' },
          { type: 'code', language: 'bash', label: 'Reading permissions', code: `# Example output of ls -la:
# -rwxr-xr-x  1  user  group  4096  Jan 14  file.sh
#  ^^^^^^^^^
#  |||||||||||
#  |rwx  = owner  (read, write, execute)
#  |   rwx = group (read, write, execute)
#  |      rwx = others (read, write, execute)
#  type: - (file), d (dir), l (symlink)

# Check permissions of a file
ls -la myfile.txt

# Create a new file
touch myfile.txt

# Create a directory
mkdir my-folder` },
          { type: 'heading', text: 'Changing Permissions with chmod' },
          { type: 'paragraph', text: 'The `chmod` command changes file permissions. You can use symbolic mode (rwx) or numeric (octal) mode. Octal mode is faster once you know the values.' },
          { type: 'code', language: 'bash', label: 'chmod examples', code: `# Numeric (octal) mode:
# 4 = read (r), 2 = write (w), 1 = execute (x)
# 7 = rwx, 6 = rw-, 5 = r-x, 4 = r--

# Give owner full access, group/others read+execute
chmod 755 myscript.sh

# Give only owner read+write
chmod 600 secret.txt

# Make a script executable
chmod +x deploy.sh

# Symbolic mode: add execute for all
chmod a+x script.sh` },
          { type: 'warning', text: 'Never use `chmod 777` in production. It gives everyone full read, write, and execute access — a serious security risk.' },
          { type: 'heading', text: 'File Operations' },
          { type: 'code', language: 'bash', label: 'Essential file commands', code: `# Copy a file
cp source.txt destination.txt

# Move / rename a file
mv oldname.txt newname.txt

# Delete a file (no recycle bin!)
rm file.txt

# Delete a directory and all its contents
rm -rf folder/

# View file contents
cat file.txt

# View large files page by page
less file.txt` },
        ],
        quiz: {
          question: 'What does `chmod 755 script.sh` do?',
          options: [
            'Gives everyone read-only access',
            'Gives owner rwx, group and others r-x',
            'Deletes the file',
            'Creates a new executable file',
          ],
          correctIndex: 1,
          explanation: '755 = owner(7=rwx) + group(5=r-x) + others(5=r-x). The owner can do everything; group and others can read and execute but not write.',
        },
      },
      {
        id: 'l1-3',
        title: 'Package Management',
        duration: '20 min',
        content: [
          { type: 'paragraph', text: 'Linux distributions use package managers to install, update, and remove software. The most common are `apt` (Debian/Ubuntu) and `yum`/`dnf` (RHEL/CentOS). As a DevOps engineer you will constantly be installing dependencies on servers.' },
          { type: 'heading', text: 'APT Package Manager (Ubuntu/Debian)' },
          { type: 'code', language: 'bash', label: 'APT commands', code: `# Update the package index (always do this first!)
sudo apt update

# Upgrade all installed packages
sudo apt upgrade -y

# Install a package (e.g., nginx)
sudo apt install nginx -y

# Remove a package
sudo apt remove nginx

# Remove package + config files
sudo apt purge nginx

# Search for a package
apt search python3

# Show package info
apt show curl` },
          { type: 'tip', text: 'Always run `sudo apt update` before installing packages to ensure you get the latest version from the repository.' },
          { type: 'heading', text: 'Understanding sudo' },
          { type: 'paragraph', text: '`sudo` (Super User Do) lets you run commands as the root (administrator) user. Many system operations require root privileges. It is safer than logging in as root directly because it leaves an audit trail.' },
          { type: 'code', language: 'bash', label: 'sudo usage', code: `# Run a single command as root
sudo apt install docker.io

# Switch to root shell (use sparingly!)
sudo su -

# Run a command as another user
sudo -u www-data ls /var/www/` },
        ],
        quiz: {
          question: 'What should you ALWAYS run before installing a package with apt?',
          options: ['sudo apt upgrade', 'sudo apt update', 'sudo apt install', 'sudo apt clean'],
          correctIndex: 1,
          explanation: '`sudo apt update` refreshes the package index so apt knows what the latest versions are. Without it you might install outdated packages.',
        },
      },
      {
        id: 'l1-4',
        title: 'Process & Service Management',
        duration: '25 min',
        content: [
          { type: 'paragraph', text: 'Servers run dozens of background processes. Knowing how to monitor, start, stop, and manage processes is essential for operations and incident response.' },
          { type: 'heading', text: 'Monitoring Processes' },
          { type: 'code', language: 'bash', label: 'Process monitoring', code: `# Show all running processes
ps aux

# Interactive process viewer (press q to quit)
top

# Better interactive viewer (install with: apt install htop)
htop

# Find a process by name
ps aux | grep nginx

# Show process tree
pstree

# Show how long system has been running
uptime` },
          { type: 'heading', text: 'Managing Services with systemd' },
          { type: 'paragraph', text: 'Modern Linux uses `systemd` to manage services (background processes). The `systemctl` command is your main tool for controlling services.' },
          { type: 'code', language: 'bash', label: 'systemctl commands', code: `# Start a service
sudo systemctl start nginx

# Stop a service
sudo systemctl stop nginx

# Restart a service
sudo systemctl restart nginx

# Check service status
sudo systemctl status nginx

# Enable service to start on boot
sudo systemctl enable nginx

# Disable service from starting on boot
sudo systemctl disable nginx

# View service logs
journalctl -u nginx -f` },
          { type: 'tip', text: 'Use `journalctl -u servicename -f` to follow logs in real-time — the `-f` flag means "follow" (like tail -f). Invaluable during incident response.' },
          { type: 'heading', text: 'Killing Processes' },
          { type: 'code', language: 'bash', label: 'Killing processes', code: `# Kill process by PID (graceful)
kill 1234

# Force kill (SIGKILL - use as last resort)
kill -9 1234

# Kill by name
pkill nginx

# Kill all processes of a user
pkill -u username` },
        ],
        quiz: {
          question: 'Which command enables a service to start automatically on system boot?',
          options: ['systemctl start nginx', 'systemctl enable nginx', 'systemctl restart nginx', 'systemctl status nginx'],
          correctIndex: 1,
          explanation: '`systemctl enable` creates a symlink that tells systemd to start the service on boot. `start` only starts it for the current session.',
        },
      },
      {
        id: 'l1-5',
        title: 'Shell Scripting Basics',
        duration: '35 min',
        content: [
          { type: 'paragraph', text: 'Shell scripting lets you automate repetitive tasks by writing sequences of commands in a file. This is the foundation of DevOps automation — from deployment scripts to log rotation.' },
          { type: 'heading', text: 'Your First Shell Script' },
          { type: 'code', language: 'bash', label: 'hello.sh', code: `#!/bin/bash
# The first line (shebang) tells the OS to use bash to run this script

# Variables
NAME="DevOps Engineer"
TODAY=$(date +%Y-%m-%d)

echo "Hello, $NAME!"
echo "Today is: $TODAY"

# Make executable and run:
# chmod +x hello.sh && ./hello.sh` },
          { type: 'heading', text: 'Conditionals & Loops' },
          { type: 'code', language: 'bash', label: 'Control flow', code: `#!/bin/bash

# If/else condition
DISK_USAGE=$(df / | awk 'NR==2 {print $5}' | tr -d '%')

if [ "$DISK_USAGE" -gt 80 ]; then
  echo "WARNING: Disk usage is \${DISK_USAGE}%"
else
  echo "Disk usage is OK: \${DISK_USAGE}%"
fi

# For loop
for SERVICE in nginx mysql redis; do
  echo "Checking $SERVICE..."
  systemctl is-active --quiet $SERVICE && echo "  ✓ Running" || echo "  ✗ Stopped"
done

# While loop
COUNT=0
while [ $COUNT -lt 5 ]; do
  echo "Loop iteration: $COUNT"
  COUNT=$((COUNT + 1))
done` },
          { type: 'heading', text: 'Practical Example: Backup Script' },
          { type: 'code', language: 'bash', label: 'backup.sh — a real-world example', code: `#!/bin/bash

# Configuration
SOURCE_DIR="/var/www/html"
BACKUP_DIR="/backups"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/backup_$DATE.tar.gz"

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Create compressed archive
echo "Starting backup of $SOURCE_DIR..."
tar -czf "$BACKUP_FILE" "$SOURCE_DIR"

# Check if backup succeeded
if [ $? -eq 0 ]; then
  echo "Backup completed: $BACKUP_FILE"
  # Delete backups older than 7 days
  find "$BACKUP_DIR" -name "*.tar.gz" -mtime +7 -delete
  echo "Old backups cleaned up."
else
  echo "ERROR: Backup failed!"
  exit 1
fi` },
          { type: 'tip', text: 'Always test your scripts with `bash -x script.sh` — the `-x` flag prints each command before executing it, making debugging easy.' },
        ],
        quiz: {
          question: 'What is the purpose of the `#!/bin/bash` line at the top of a shell script?',
          options: [
            'It is a comment that describes the script',
            'It tells the OS to execute the script using bash',
            'It imports the bash library',
            'It sets the PATH variable',
          ],
          correctIndex: 1,
          explanation: 'The shebang `#!` followed by the interpreter path tells the OS which program to use to run the script. Without it, the system might not know how to execute the file.',
        },
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // DEVOPS — LEVEL 2 (INTERMEDIATE)
  // ══════════════════════════════════════════════════════════════════════════
  'devops-l2': {
    id: 'devops-l2',
    title: 'Docker Deep Dive',
    domain: 'devops',
    level: 2,
    badge: '🐳',
    duration: '10h',
    color: 'from-blue-500 to-cyan-500',
    description: 'Containerize applications from scratch. Master Dockerfile, docker-compose, networking, and volumes.',
    lessons: [
      { id: 'l2-1', title: 'What is Containerization?',      duration: '20 min', content: [{ type: 'paragraph', text: 'Containers solve the classic "it works on my machine" problem by packaging your application with all its dependencies into a single portable unit. Docker is the most popular containerization platform in the world.' }, { type: 'code', language: 'bash', label: 'First Docker commands', code: `# Pull and run your first container
docker run hello-world

# Run nginx web server on port 8080
docker run -d -p 8080:80 --name my-nginx nginx

# List running containers
docker ps

# Stop a container
docker stop my-nginx` }], quiz: { question: 'What problem does containerization primarily solve?', options: ['Slow internet speeds', '"It works on my machine" environment inconsistencies', 'Database performance', 'CSS styling issues'], correctIndex: 1, explanation: 'Containers package the app with all its dependencies, ensuring identical behavior across development, staging, and production environments.' } },
      { id: 'l2-2', title: 'Writing Your First Dockerfile',   duration: '30 min', content: [{ type: 'paragraph', text: 'A Dockerfile is a recipe for building a Docker image. Each instruction adds a layer to the image.' }, { type: 'code', language: 'dockerfile', label: 'Dockerfile for a Node.js app', code: `FROM node:18-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm install --production\nCOPY . .\nEXPOSE 3000\nCMD ["node", "server.js"]` }], quiz: { question: 'Which Dockerfile instruction sets the working directory inside the container?', options: ['FROM', 'RUN', 'WORKDIR', 'CMD'], correctIndex: 2, explanation: 'WORKDIR sets the working directory for subsequent RUN, CMD, COPY, and ENTRYPOINT instructions.' } },
      { id: 'l2-3', title: 'Docker Compose',                  duration: '35 min', content: [{ type: 'paragraph', text: 'Docker Compose lets you define and run multi-container applications with a single YAML file.' }, { type: 'code', language: 'yaml', label: 'docker-compose.yml', code: `version: '3.8'\nservices:\n  web:\n    build: .\n    ports:\n      - "3000:3000"\n    depends_on:\n      - db\n  db:\n    image: postgres:15\n    environment:\n      POSTGRES_PASSWORD: secret\n    volumes:\n      - db-data:/var/lib/postgresql/data\nvolumes:\n  db-data:` }], quiz: { question: 'What does `docker-compose up -d` do?', options: ['Stops all services', 'Starts services in detached (background) mode', 'Rebuilds images', 'Removes volumes'], correctIndex: 1, explanation: 'The `-d` flag runs containers in detached mode, freeing your terminal.' } },
      { id: 'l2-4', title: 'Volumes & Networking',            duration: '25 min', content: [{ type: 'paragraph', text: 'Volumes persist data beyond container lifecycles. Networks allow containers to communicate securely.' }, { type: 'code', language: 'bash', label: 'Volumes and networks', code: `# Create a named volume\ndocker volume create mydata\n\n# Run container with volume mounted\ndocker run -v mydata:/data nginx\n\n# Create a custom network\ndocker network create mynet\n\n# Connect containers to network\ndocker run --network mynet --name api my-api` }], quiz: { question: 'Why would you use a Docker volume?', options: ['To speed up builds', 'To persist data beyond container restarts', 'To expose ports', 'To reduce image size'], correctIndex: 1, explanation: 'Container filesystems are ephemeral — volumes provide persistent storage that survives container restarts and deletions.' } },
      { id: 'l2-5', title: 'Image Optimization & Best Practices', duration: '20 min', content: [{ type: 'paragraph', text: 'Small, secure images are faster to pull and have a smaller attack surface. Multi-stage builds are the key technique.' }, { type: 'code', language: 'dockerfile', label: 'Multi-stage build', code: `# Build stage\nFROM node:18 AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build\n\n# Production stage (much smaller!)\nFROM node:18-alpine\nWORKDIR /app\nCOPY --from=builder /app/dist ./dist\nCOPY package*.json ./\nRUN npm ci --production\nCMD ["node", "dist/index.js"]` }, { type: 'tip', text: 'Always use specific version tags (e.g., node:18-alpine) instead of `latest`. This ensures reproducible builds.' }], quiz: { question: 'What is the main benefit of multi-stage Docker builds?', options: ['Faster container startup', 'Smaller final image size (build tools excluded)', 'Better networking', 'Automatic volume creation'], correctIndex: 1, explanation: 'Multi-stage builds let you compile/build in one image and copy only the artifacts to a much smaller production image.' } },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // DEVOPS — LEVEL 3 (ADVANCED)
  // ══════════════════════════════════════════════════════════════════════════
  'devops-l3': {
    id: 'devops-l3',
    title: 'Kubernetes Certified Path',
    domain: 'devops',
    level: 3,
    badge: '☸️',
    duration: '16h',
    color: 'from-violet-500 to-purple-600',
    description: 'Deploy, scale, and manage distributed applications on Kubernetes.',
    lessons: [
      { id: 'l3-1', title: 'Kubernetes Architecture',          duration: '30 min', content: [{ type: 'paragraph', text: 'Kubernetes (K8s) is an open-source container orchestration platform. It manages the deployment, scaling, and operation of containerized applications across a cluster of machines.' }, { type: 'code', language: 'bash', label: 'Basic kubectl commands', code: `kubectl get nodes\nkubectl get pods --all-namespaces\nkubectl describe pod my-pod\nkubectl logs my-pod -f` }], quiz: { question: 'What is the smallest deployable unit in Kubernetes?', options: ['Container', 'Node', 'Pod', 'Service'], correctIndex: 2, explanation: 'A Pod is the smallest deployable unit in Kubernetes and can contain one or more containers sharing the same network namespace.' } },
      { id: 'l3-2', title: 'Deployments & ReplicaSets',       duration: '35 min', content: [{ type: 'paragraph', text: 'A Deployment manages a set of identical Pods, ensuring the desired number are always running.' }, { type: 'code', language: 'yaml', label: 'deployment.yaml', code: `apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: my-app\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: my-app\n  template:\n    metadata:\n      labels:\n        app: my-app\n    spec:\n      containers:\n      - name: my-app\n        image: my-app:1.0\n        ports:\n        - containerPort: 3000` }], quiz: { question: 'What does `kubectl apply -f deployment.yaml` do?', options: ['Deletes a deployment', 'Creates or updates resources defined in the YAML', 'Lists all deployments', 'Scales a deployment'], correctIndex: 1, explanation: '`kubectl apply` is declarative — it creates the resource if it does not exist or updates it if the config has changed.' } },
      { id: 'l3-3', title: 'Services & Ingress',               duration: '30 min', content: [{ type: 'paragraph', text: 'Services expose Pods to network traffic. Ingress manages external HTTP/HTTPS access.' }, { type: 'code', language: 'yaml', label: 'service.yaml', code: `apiVersion: v1\nkind: Service\nmetadata:\n  name: my-app-service\nspec:\n  selector:\n    app: my-app\n  ports:\n  - port: 80\n    targetPort: 3000\n  type: ClusterIP` }], quiz: { question: 'Which Service type exposes your app to external internet traffic?', options: ['ClusterIP', 'NodePort', 'LoadBalancer', 'ExternalName'], correctIndex: 2, explanation: 'LoadBalancer provisions a cloud load balancer (e.g., AWS ELB) that routes external traffic to your service.' } },
      { id: 'l3-4', title: 'ConfigMaps & Secrets',             duration: '25 min', content: [{ type: 'paragraph', text: 'ConfigMaps store non-sensitive configuration. Secrets store sensitive data like passwords and API keys (base64 encoded).' }, { type: 'code', language: 'bash', label: 'ConfigMaps and Secrets', code: `# Create a ConfigMap\nkubectl create configmap app-config --from-literal=ENV=production\n\n# Create a Secret\nkubectl create secret generic db-secret \\\n  --from-literal=password=supersecret` }], quiz: { question: 'What is the key difference between a ConfigMap and a Secret?', options: ['Secrets are encrypted at rest by default', 'ConfigMaps are for non-sensitive config; Secrets for sensitive data', 'Secrets can only store passwords', 'ConfigMaps are faster to access'], correctIndex: 1, explanation: 'ConfigMaps store plain configuration. Secrets are designed for sensitive data and are base64-encoded (and can be encrypted at rest with proper cluster config).' } },
      { id: 'l3-5', title: 'Horizontal Pod Autoscaling',       duration: '20 min', content: [{ type: 'paragraph', text: 'HPA automatically scales the number of Pod replicas based on observed CPU/memory metrics.' }, { type: 'code', language: 'bash', label: 'HPA setup', code: `# Create HPA: scale between 2-10 replicas at 70% CPU\nkubectl autoscale deployment my-app \\\n  --cpu-percent=70 \\\n  --min=2 \\\n  --max=10\n\n# Check HPA status\nkubectl get hpa` }], quiz: { question: 'What does a Horizontal Pod Autoscaler (HPA) do?', options: ['Scales node sizes vertically', 'Automatically adjusts replica count based on metrics', 'Manages storage volumes', 'Routes external traffic'], correctIndex: 1, explanation: 'HPA watches metrics (like CPU usage) and automatically increases or decreases the number of Pod replicas to meet demand.' } },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // DEVOPS — LEVEL 4 (EXPERT)
  // ══════════════════════════════════════════════════════════════════════════
  'devops-l4': {
    id: 'devops-l4',
    title: 'Platform Engineering & SRE',
    domain: 'devops',
    level: 4,
    badge: '🚀',
    duration: '20h',
    color: 'from-amber-400 to-orange-500',
    description: 'Design large-scale DevOps platforms. Site Reliability Engineering, chaos engineering, and DORA metrics.',
    lessons: [
      { id: 'l4-1', title: 'SRE Principles & SLOs',            duration: '30 min', content: [{ type: 'paragraph', text: 'Site Reliability Engineering (SRE) bridges software engineering and operations. SLOs (Service Level Objectives) define reliability targets.' }, { type: 'code', language: 'yaml', label: 'SLO Definition Example', code: `# SLO: 99.9% availability = max 8.7h downtime/year\nslo:\n  name: api-availability\n  target: 99.9\n  window: 30d\n  indicator:\n    type: availability\n    metric: http_requests_total` }], quiz: { question: 'What does an SLO (Service Level Objective) define?', options: ['A legal contract with customers', 'An internal reliability target for a service', 'The maximum server cost', 'The deployment frequency'], correctIndex: 1, explanation: 'An SLO is an internal reliability target (e.g., 99.9% uptime). SLAs are the external contractual version. Breaching an SLO burns error budget.' } },
      { id: 'l4-2', title: 'Platform Engineering Principles',  duration: '35 min', content: [{ type: 'paragraph', text: 'Platform Engineering creates self-service internal developer platforms (IDPs) that encode best practices and reduce cognitive load.' }, { type: 'paragraph', text: 'The golden path is a paved road of conventions that makes the right way to deploy also the easy way.' }], quiz: { question: 'What is the primary goal of an Internal Developer Platform (IDP)?', options: ['Replace developers with automation', 'Provide self-service infrastructure with best practices baked in', 'Manage HR processes', 'Monitor external APIs'], correctIndex: 1, explanation: 'IDPs let developers provision infrastructure, deploy apps, and manage services without needing deep ops expertise — reducing toil and cognitive load.' } },
      { id: 'l4-3', title: 'Chaos Engineering',                duration: '25 min', content: [{ type: 'paragraph', text: 'Chaos engineering deliberately injects failures to verify system resilience before they happen in production.' }, { type: 'code', language: 'bash', label: 'Chaos experiments with LitmusChaos', code: `# Install LitmusChaos\nkubectl apply -f https://litmuschaos.github.io/litmus/litmus-operator.yaml\n\n# Pod delete chaos experiment\nkubectl apply -f pod-delete-chaos.yaml` }], quiz: { question: 'What is the primary goal of chaos engineering?', options: ['Intentionally breaking production systems', 'Finding weaknesses before they cause real outages', 'Reducing infrastructure cost', 'Training developers'], correctIndex: 1, explanation: 'Chaos engineering follows the principle: break things in a controlled way to find weaknesses before they cause unplanned outages.' } },
      { id: 'l4-4', title: 'DORA Metrics & Developer Productivity', duration: '20 min', content: [{ type: 'paragraph', text: 'DORA (DevOps Research and Assessment) metrics measure software delivery performance: Deployment Frequency, Lead Time, MTTR, Change Failure Rate.' }], quiz: { question: 'Which DORA metric measures how quickly you recover from a production incident?', options: ['Deployment Frequency', 'Lead Time for Changes', 'Mean Time to Recovery (MTTR)', 'Change Failure Rate'], correctIndex: 2, explanation: 'MTTR (Mean Time to Recovery) tracks how fast your team can restore service after an incident. Elite performers restore in under one hour.' } },
      { id: 'l4-5', title: 'Cost Optimization & FinOps',       duration: '30 min', content: [{ type: 'paragraph', text: 'FinOps combines financial accountability with cloud engineering. At scale, unoptimized cloud costs can exceed infrastructure value.' }, { type: 'code', language: 'bash', label: 'Finding wasted resources', code: `# Find oversized EC2 instances via AWS CLI\naws ce get-rightsizing-recommendation \\\n  --service EC2\n\n# Kubernetes resource waste\nkubectl top pods --all-namespaces` }], quiz: { question: 'What does FinOps primarily focus on?', options: ['Financial auditing of employees', 'Cloud cost optimization and financial accountability', 'HR management tools', 'Frontend performance'], correctIndex: 1, explanation: 'FinOps is a cloud financial management practice that brings together engineering, finance, and business teams to optimize cloud spending.' } },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // WEB DEV — All Levels (structured, content similar pattern)
  // ══════════════════════════════════════════════════════════════════════════
  'webdev-l1': { id: 'webdev-l1', title: 'HTML & CSS Mastery', domain: 'web-dev', level: 1, badge: '🎨', duration: '10h', color: 'from-blue-500 to-cyan-500', description: 'Build responsive layouts with modern HTML5 and CSS3.', lessons: [
    { id: 'w1-1', title: 'HTML Document Structure', duration: '20 min', content: [{ type: 'paragraph', text: 'HTML (HyperText Markup Language) is the backbone of every web page. It defines the structure and meaning of content through elements.' }, { type: 'code', language: 'html', label: 'Basic HTML5 document', code: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>My Page</title>\n</head>\n<body>\n  <header>\n    <h1>Welcome to My Site</h1>\n    <nav>...</nav>\n  </header>\n  <main>\n    <section>\n      <h2>About</h2>\n      <p>Hello, world!</p>\n    </section>\n  </main>\n  <footer>© 2026</footer>\n</body>\n</html>` }], quiz: { question: 'Which HTML element is the correct place for the page title (shown in browser tab)?', options: ['<h1>', '<title>', '<header>', '<meta>'], correctIndex: 1, explanation: 'The <title> element inside <head> sets the browser tab title and is critical for SEO.' } },
    { id: 'w1-2', title: 'CSS Box Model & Flexbox', duration: '30 min', content: [{ type: 'paragraph', text: 'The CSS box model defines how elements are sized and spaced. Every element is a box with content, padding, border, and margin.' }, { type: 'code', language: 'css', label: 'Box model & Flexbox', code: `/* Box model */\n.card {\n  width: 300px;\n  padding: 20px;\n  border: 1px solid #ddd;\n  margin: 16px;\n  box-sizing: border-box; /* padding included in width */\n}\n\n/* Flexbox layout */\n.container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 16px;\n}` }], quiz: { question: 'What does `box-sizing: border-box` do?', options: ['Adds a border to the box', 'Makes padding and border included in the element width', 'Removes margins', 'Sets the box shadow'], correctIndex: 1, explanation: 'With border-box, the width you set includes padding and border, making layout math much more predictable.' } },
    { id: 'w1-3', title: 'CSS Grid Layout', duration: '25 min', content: [{ type: 'paragraph', text: 'CSS Grid is a 2D layout system perfect for page layouts. Combine it with Flexbox for complete control.' }, { type: 'code', language: 'css', label: 'CSS Grid example', code: `.page-layout {\n  display: grid;\n  grid-template-columns: 250px 1fr;\n  grid-template-rows: auto 1fr auto;\n  grid-template-areas:\n    "sidebar header"\n    "sidebar main"\n    "sidebar footer";\n  min-height: 100vh;\n}` }], quiz: { question: 'What is CSS Grid primarily designed for?', options: ['1D row-based layouts', '2D row and column layouts', 'Animations', 'Typography'], correctIndex: 1, explanation: 'Grid excels at 2D layouts (both rows and columns). Flexbox works best for 1D layouts (either row or column direction).' } },
    { id: 'w1-4', title: 'Responsive Design & Media Queries', duration: '20 min', content: [{ type: 'paragraph', text: 'Responsive design ensures your site looks great on all screen sizes. Media queries apply CSS conditionally based on viewport size.' }, { type: 'code', language: 'css', label: 'Mobile-first media queries', code: `/* Mobile first: default styles for small screens */\n.card { font-size: 14px; }\n\n/* Tablet and above */\n@media (min-width: 768px) {\n  .card { font-size: 16px; }\n}\n\n/* Desktop and above */\n@media (min-width: 1024px) {\n  .card { font-size: 18px; }\n}` }], quiz: { question: 'What does "mobile-first" design mean?', options: ['Design only for mobile', 'Start with mobile styles, then add complexity for larger screens', 'Use a mobile framework', 'Test on iOS first'], correctIndex: 1, explanation: 'Mobile-first means writing base styles for small screens, then using min-width media queries to add enhancements for larger screens.' } },
    { id: 'w1-5', title: 'CSS Variables & Custom Properties', duration: '20 min', content: [{ type: 'paragraph', text: 'CSS custom properties (variables) allow you to reuse values throughout your stylesheet and build a design system.' }, { type: 'code', language: 'css', label: 'Design system with CSS variables', code: `:root {\n  --color-primary: #6366f1;\n  --color-secondary: #8b5cf6;\n  --spacing-md: 1rem;\n  --radius-lg: 1.5rem;\n  --font-heading: 'Outfit', sans-serif;\n}\n\n.btn {\n  background: var(--color-primary);\n  padding: var(--spacing-md);\n  border-radius: var(--radius-lg);\n}` }, { type: 'tip', text: 'CSS variables are reactive — changing a variable in a media query or with JavaScript instantly updates all elements using it.' }], quiz: { question: 'How do you use a CSS custom property (variable)?', options: ['$variable-name', 'var(--variable-name)', '@variable-name', '#variable-name'], correctIndex: 1, explanation: 'CSS custom properties are defined with -- prefix and accessed with var(--name). They cascade and inherit like regular CSS properties.' } },
  ] },
  'webdev-l2': { id: 'webdev-l2', title: 'JavaScript Essentials', domain: 'web-dev', level: 2, badge: '⚡', duration: '12h', color: 'from-yellow-500 to-amber-500', description: 'Master JavaScript fundamentals, async patterns, and DOM manipulation.', lessons: [
    { id: 'wl2-1', title: 'Variables, Types & Functions',     duration: '25 min', content: [{ type: 'paragraph', text: 'JavaScript is the only programming language that runs natively in browsers. Understanding its type system and functions is fundamental.' }, { type: 'code', language: 'javascript', label: 'JS fundamentals', code: `// Variables (prefer const, use let when reassigning)\nconst name = "LearnPulse";\nlet count = 0;\n\n// Types\ntypeof "hello"   // "string"\ntypeof 42        // "number"\ntypeof true      // "boolean"\ntypeof null      // "object" (famous bug!)\ntypeof undefined // "undefined"\ntypeof {}        // "object"\ntypeof []        // "object"\n\n// Arrow functions\nconst add = (a, b) => a + b;\nconst greet = name => \`Hello, \${name}!\`;` }], quiz: { question: 'What is the difference between `let` and `const`?', options: ['No difference', 'const cannot be reassigned after declaration', 'let is block-scoped, const is function-scoped', 'const is faster'], correctIndex: 1, explanation: '`const` creates a binding that cannot be reassigned. Note: for objects/arrays, the reference is const but the contents can still change.' } },
    { id: 'wl2-2', title: 'Arrays & Higher-Order Functions', duration: '30 min', content: [{ type: 'paragraph', text: 'JavaScript arrays have powerful built-in methods. Mastering map, filter, and reduce is essential for modern JS.' }, { type: 'code', language: 'javascript', label: 'Array methods', code: `const students = [\n  { name: "Alice", score: 92 },\n  { name: "Bob", score: 65 },\n  { name: "Carol", score: 88 },\n];\n\n// map: transform each item → new array\nconst names = students.map(s => s.name);\n// ["Alice", "Bob", "Carol"]\n\n// filter: keep items matching condition\nconst passing = students.filter(s => s.score >= 70);\n// [Alice, Carol]\n\n// reduce: aggregate to single value\nconst avg = students.reduce((sum, s) => sum + s.score, 0) / students.length;\n// 81.67` }], quiz: { question: 'Which array method returns a NEW array with only items that pass a test?', options: ['map()', 'forEach()', 'filter()', 'find()'], correctIndex: 2, explanation: 'filter() returns a new array containing only elements for which the callback returns true. It never mutates the original array.' } },
    { id: 'wl2-3', title: 'Async JavaScript & Promises',     duration: '35 min', content: [{ type: 'paragraph', text: 'JavaScript is single-threaded and uses async patterns to handle I/O without blocking.' }, { type: 'code', language: 'javascript', label: 'async/await', code: `// Fetch data from an API\nconst getUser = async (id) => {\n  try {\n    const response = await fetch(\`/api/users/\${id}\`);\n    if (!response.ok) throw new Error("Not found");\n    const user = await response.json();\n    return user;\n  } catch (error) {\n    console.error("Failed to fetch user:", error);\n    throw error;\n  }\n};\n\n// Usage\nconst user = await getUser(1);` }], quiz: { question: 'What keyword must a function have to use `await` inside it?', options: ['sync', 'promise', 'async', 'await'], correctIndex: 2, explanation: 'Functions using `await` must be declared with `async`. This allows the function to return a Promise and pause execution at each await.' } },
    { id: 'wl2-4', title: 'DOM Manipulation',                 duration: '25 min', content: [{ type: 'paragraph', text: 'The DOM (Document Object Model) is the programmatic interface to your HTML. JavaScript uses it to dynamically update pages.' }, { type: 'code', language: 'javascript', label: 'DOM operations', code: `// Select elements\nconst btn = document.querySelector('#submit-btn');\nconst items = document.querySelectorAll('.item');\n\n// Modify content and styles\nbtn.textContent = 'Submit';\nbtn.classList.add('active');\nbtn.style.backgroundColor = '#6366f1';\n\n// Create and add elements\nconst div = document.createElement('div');\ndiv.className = 'card';\ndiv.innerHTML = '<h3>New Card</h3>';\ndocument.body.appendChild(div);\n\n// Event listeners\nbtn.addEventListener('click', (e) => {\n  e.preventDefault();\n  console.log('Button clicked!');\n});` }], quiz: { question: 'Which method selects the FIRST matching CSS selector?', options: ['getElementById', 'querySelectorAll', 'querySelector', 'getElementsByClass'], correctIndex: 2, explanation: 'querySelector returns the first matching element (or null). querySelectorAll returns a NodeList of all matching elements.' } },
    { id: 'wl2-5', title: 'ES6+ Modern Syntax',              duration: '20 min', content: [{ type: 'paragraph', text: 'Modern JavaScript has many features that make code more concise and readable.' }, { type: 'code', language: 'javascript', label: 'Modern JS features', code: `// Destructuring\nconst { name, age, role = 'student' } = user;\nconst [first, second, ...rest] = array;\n\n// Spread operator\nconst merged = { ...defaults, ...overrides };\nconst copy = [...originalArray, newItem];\n\n// Optional chaining\nconst city = user?.address?.city ?? 'Unknown';\n\n// Template literals\nconst message = \`Hello \${name}, you are \${age} years old.\`;\n\n// Modules\nexport const add = (a, b) => a + b;\nimport { add } from './math.js';` }], quiz: { question: 'What does the optional chaining operator `?.` do?', options: ['Creates an optional variable', 'Safely accesses a property, returning undefined if the chain is null/undefined', 'Merges two objects', 'Creates a conditional expression'], correctIndex: 1, explanation: 'Optional chaining short-circuits and returns undefined instead of throwing a TypeError when accessing a property on null or undefined.' } },
  ] },
  'webdev-l3': { id: 'webdev-l3', title: 'React Fundamentals', domain: 'web-dev', level: 3, badge: '⚛️', duration: '14h', color: 'from-violet-500 to-purple-600', description: 'Build component-based UIs with hooks, context, and routing.', lessons: [
    { id: 'wr3-1', title: 'Components & JSX',               duration: '25 min', content: [{ type: 'paragraph', text: 'React applications are built from components — reusable UI building blocks. JSX is a syntax extension that looks like HTML inside JavaScript.' }, { type: 'code', language: 'jsx', label: 'Your first React component', code: `// Functional component\nconst CourseCard = ({ title, duration, level, onStart }) => {\n  return (\n    <div className="card">\n      <h3>{title}</h3>\n      <p>Duration: {duration}</p>\n      <span className={\`badge badge-\${level}\`}>{level}</span>\n      <button onClick={onStart}>Start Course</button>\n    </div>\n  );\n};\n\nexport default CourseCard;` }], quiz: { question: 'In React, how do you pass data from a parent to a child component?', options: ['Through global state only', 'Via props', 'Using localStorage', 'Through Redux only'], correctIndex: 1, explanation: 'Props (properties) are the mechanism for passing data from parent to child in React. They are read-only from the child\'s perspective.' } },
    { id: 'wr3-2', title: 'useState & useEffect',          duration: '30 min', content: [{ type: 'paragraph', text: 'Hooks let you use state and other React features in functional components. useState manages local component state; useEffect handles side effects.' }, { type: 'code', language: 'jsx', label: 'Hooks example', code: `import { useState, useEffect } from 'react';\n\nconst UserProfile = ({ userId }) => {\n  const [user, setUser] = useState(null);\n  const [loading, setLoading] = useState(true);\n\n  useEffect(() => {\n    const fetchUser = async () => {\n      const data = await fetch(\`/api/users/\${userId}\`).then(r => r.json());\n      setUser(data);\n      setLoading(false);\n    };\n    fetchUser();\n  }, [userId]); // Re-run when userId changes\n\n  if (loading) return <div>Loading...</div>;\n  return <h2>Hello, {user.name}</h2>;\n};` }], quiz: { question: 'What does the dependency array in useEffect control?', options: ['The number of renders', 'When the effect runs (when these values change)', 'The effect priority', 'Memory allocation'], correctIndex: 1, explanation: 'useEffect runs after render. The dependency array tells React to re-run the effect only when those values change. Empty array [] = run once on mount.' } },
    { id: 'wr3-3', title: 'Context & State Management',    duration: '25 min', content: [{ type: 'paragraph', text: 'Context avoids "prop drilling" — passing props through many component layers to reach deep children.' }, { type: 'code', language: 'jsx', label: 'React Context', code: `const ThemeContext = createContext();\n\nconst ThemeProvider = ({ children }) => {\n  const [isDark, setIsDark] = useState(false);\n  return (\n    <ThemeContext.Provider value={{ isDark, toggle: () => setIsDark(p => !p) }}>\n      {children}\n    </ThemeContext.Provider>\n  );\n};\n\n// Consume anywhere in the tree\nconst Header = () => {\n  const { isDark, toggle } = useContext(ThemeContext);\n  return <button onClick={toggle}>{isDark ? '☀️' : '🌙'}</button>;\n};` }], quiz: { question: 'What problem does React Context solve?', options: ['Async data fetching', 'Prop drilling through many component layers', 'CSS in JS styling', 'Server-side rendering'], correctIndex: 1, explanation: 'Context provides a way to pass data through the component tree without manually passing props at every level.' } },
    { id: 'wr3-4', title: 'React Router',                 duration: '20 min', content: [{ type: 'paragraph', text: 'React Router enables client-side navigation in SPAs without full page reloads.' }, { type: 'code', language: 'jsx', label: 'React Router v6', code: `import { Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';\n\nconst App = () => (\n  <Routes>\n    <Route path="/" element={<Home />} />\n    <Route path="/course/:id" element={<CoursePage />} />\n    <Route path="*" element={<NotFound />} />\n  </Routes>\n);\n\n// Inside CoursePage\nconst CoursePage = () => {\n  const { id } = useParams();\n  const navigate = useNavigate();\n  return <button onClick={() => navigate('/')}>Back Home</button>;\n};` }], quiz: { question: 'How do you access URL parameters in React Router v6?', options: ['this.props.params', 'useParams() hook', 'window.location.params', 'useRouter().query'], correctIndex: 1, explanation: 'useParams() returns an object of key/value pairs from the URL matching the route pattern (e.g., :id from /course/:id).' } },
    { id: 'wr3-5', title: 'Performance: useMemo & useCallback', duration: '20 min', content: [{ type: 'paragraph', text: 'useMemo memoizes expensive computed values. useCallback memoizes function references. Both prevent unnecessary re-renders.' }, { type: 'code', language: 'jsx', label: 'Performance hooks', code: `// useMemo: only recalculate when deps change\nconst sortedStudents = useMemo(\n  () => [...students].sort((a, b) => b.score - a.score),\n  [students]\n);\n\n// useCallback: stable function reference\nconst handleDelete = useCallback(\n  (id) => dispatch(deleteStudent(id)),\n  [dispatch]\n);\n\n// React.memo: skip re-render if props unchanged\nconst StudentCard = React.memo(({ student, onDelete }) => (\n  <div>{student.name} <button onClick={() => onDelete(student.id)}>Delete</button></div>\n));` }], quiz: { question: 'When should you use useMemo?', options: ['For every variable', 'When a computation is expensive and its inputs rarely change', 'To replace useState', 'For async operations'], correctIndex: 1, explanation: 'useMemo is for expensive calculations you don\'t want to repeat on every render. Avoid premature optimization — only use it when you measure a real performance issue.' } },
  ] },
  'webdev-l4': { id: 'webdev-l4', title: 'Full Stack Architecture & System Design', domain: 'web-dev', level: 4, badge: '🏛️', duration: '18h', color: 'from-amber-400 to-orange-500', description: 'Design scalable full-stack systems with microservices.', lessons: [
    { id: 'wa4-1', title: 'System Design Fundamentals',    duration: '40 min', content: [{ type: 'paragraph', text: 'System design interviews and real-world architectures require understanding scalability, availability, and consistency trade-offs.' }, { type: 'tip', text: 'The CAP Theorem: you can only guarantee 2 of 3 — Consistency, Availability, Partition Tolerance — in a distributed system.' }], quiz: { question: 'Which architectural pattern splits an application into small, independently deployable services?', options: ['Monolithic architecture', 'Microservices architecture', 'Serverless architecture', 'Client-server architecture'], correctIndex: 1, explanation: 'Microservices decompose an application into small services that communicate via APIs. Each service can be deployed, scaled, and updated independently.' } },
    { id: 'wa4-2', title: 'API Design & GraphQL',          duration: '30 min', content: [{ type: 'paragraph', text: 'Well-designed APIs are critical for full-stack applications. REST is standard; GraphQL offers flexible querying.' }, { type: 'code', language: 'javascript', label: 'REST vs GraphQL', code: `// REST: multiple requests for related data\n// GET /users/1  →  GET /users/1/posts  →  GET /posts/1/comments\n\n// GraphQL: one request for exactly what you need\nquery {\n  user(id: 1) {\n    name\n    posts(limit: 5) {\n      title\n      comments { text author { name } }\n    }\n  }\n}` }], quiz: { question: 'What is the main advantage of GraphQL over REST?', options: ['It is faster by default', 'Clients request exactly the data they need, avoiding over/under-fetching', 'It uses less bandwidth', 'It is easier to implement'], correctIndex: 1, explanation: 'GraphQL lets clients specify exactly what data they need in one request, solving over-fetching (too much data) and under-fetching (needing multiple requests).' } },
    { id: 'wa4-3', title: 'Caching Strategies',           duration: '25 min', content: [{ type: 'paragraph', text: 'Caching is the most impactful performance optimization. Knowing where and how to cache separates senior engineers from juniors.' }, { type: 'code', language: 'javascript', label: 'Caching layers', code: `// Browser: Cache-Control headers\nres.setHeader('Cache-Control', 'public, max-age=3600');\n\n// Redis: application-level cache\nconst cached = await redis.get(\`user:\${id}\`);\nif (cached) return JSON.parse(cached);\nconst user = await db.findUser(id);\nawait redis.set(\`user:\${id}\`, JSON.stringify(user), 'EX', 3600);` }], quiz: { question: 'What type of cache is Redis?', options: ['Disk-based cache', 'In-memory key-value store used as a cache', 'Browser cache', 'CDN cache'], correctIndex: 1, explanation: 'Redis is an in-memory data structure store commonly used as a cache, session store, and message broker. Sub-millisecond reads make it ideal for hot data.' } },
    { id: 'wa4-4', title: 'Authentication & Authorization', duration: '30 min', content: [{ type: 'paragraph', text: 'Secure authentication is non-negotiable. JWT (JSON Web Tokens) are the most common stateless auth mechanism for SPAs.' }, { type: 'code', language: 'javascript', label: 'JWT auth flow', code: `// Issue token on login\nconst token = jwt.sign(\n  { userId: user.id, role: user.role },\n  process.env.JWT_SECRET,\n  { expiresIn: '24h' }\n);\n\n// Verify on protected routes\nconst middleware = (req, res, next) => {\n  const token = req.headers.authorization?.split(' ')[1];\n  const decoded = jwt.verify(token, process.env.JWT_SECRET);\n  req.user = decoded;\n  next();\n};` }], quiz: { question: 'Which part of a JWT contains the user data (claims)?', options: ['Header', 'Payload', 'Signature', 'Token'], correctIndex: 1, explanation: 'A JWT has 3 base64-encoded parts: Header (algorithm), Payload (claims like userId and role), and Signature (verification). The payload is readable but tamper-proof.' } },
    { id: 'wa4-5', title: 'Monorepos & Module Federation', duration: '25 min', content: [{ type: 'paragraph', text: 'At scale, managing code across teams requires monorepo tools (Nx, Turborepo) or micro-frontend patterns (Module Federation).' }, { type: 'tip', text: 'Module Federation (Webpack 5) allows multiple independently deployed React apps to share code at runtime — the micro-frontend approach.' }], quiz: { question: 'What is the main benefit of a monorepo for large teams?', options: ['Single git repo for all projects, easier code sharing and atomic commits', 'Each team has their own repository', 'Better security isolation', 'Faster CI/CD pipelines'], correctIndex: 0, explanation: 'Monorepos co-locate related code, making cross-project refactoring, shared libraries, and atomic changes much easier than managing multiple repos.' } },
  ] },

  // Stub courses for other domains (same structure, minimal content)
  'data-l1': { id: 'data-l1', title: 'Python for Data Science', domain: 'data-ai', level: 1, badge: '🐍', duration: '10h', color: 'from-violet-500 to-purple-600', description: 'Learn Python, NumPy, Pandas and data wrangling fundamentals.', lessons: [
    { id: 'd1-1', title: 'Python Basics & Data Types',     duration: '25 min', content: [{ type: 'paragraph', text: 'Python is the dominant language in data science due to its readable syntax and rich ecosystem.' }, { type: 'code', language: 'python', label: 'Python basics', code: `# Variables and types\nname = "Alice"\nage = 25\nscore = 92.5\nis_enrolled = True\n\n# Lists\nscores = [85, 92, 78, 95, 88]\nprint(max(scores))  # 95\nprint(sum(scores) / len(scores))  # 87.6\n\n# Dictionaries\nstudent = {"name": "Alice", "age": 25, "scores": scores}` }], quiz: { question: 'What Python data structure stores key-value pairs?', options: ['List', 'Tuple', 'Dictionary', 'Set'], correctIndex: 2, explanation: 'Dictionaries store key-value pairs and allow O(1) average lookup by key. They are the Python equivalent of hash maps.' } },
    { id: 'd1-2', title: 'NumPy Arrays',                   duration: '30 min', content: [{ type: 'paragraph', text: 'NumPy provides fast, vectorized operations on n-dimensional arrays — the foundation of all scientific Python.' }, { type: 'code', language: 'python', label: 'NumPy fundamentals', code: `import numpy as np\n\narr = np.array([1, 2, 3, 4, 5])\nprint(arr * 2)    # [2, 4, 6, 8, 10] (vectorized)\nprint(arr.mean()) # 3.0\nprint(arr.std())  # 1.41\n\n# 2D array (matrix)\nmatrix = np.zeros((3, 3))\nidentity = np.eye(3)` }], quiz: { question: 'Why is NumPy faster than pure Python loops for array operations?', options: ['It uses multiple CPU cores by default', 'Operations are implemented in C and vectorized', 'It caches results automatically', 'Python loops are not slower'], correctIndex: 1, explanation: 'NumPy operations are implemented in compiled C code and use vectorized SIMD instructions, making them 10-100x faster than equivalent Python loops.' } },
    { id: 'd1-3', title: 'Pandas DataFrames',              duration: '35 min', content: [{ type: 'paragraph', text: 'Pandas provides the DataFrame — a labeled 2D table structure — which is the workhorse of data analysis.' }, { type: 'code', language: 'python', label: 'Pandas essentials', code: `import pandas as pd\n\ndf = pd.read_csv('students.csv')\nprint(df.shape)           # (1000, 8) rows × columns\nprint(df.describe())      # stats summary\nprint(df.isnull().sum())  # missing values\n\n# Filtering\nhigh_scores = df[df['score'] > 85]\n\n# Groupby\navg_by_domain = df.groupby('domain')['score'].mean()` }], quiz: { question: 'Which Pandas method shows summary statistics of a DataFrame?', options: ['df.info()', 'df.head()', 'df.describe()', 'df.shape'], correctIndex: 2, explanation: 'df.describe() returns count, mean, std, min, quartiles, and max for all numeric columns — a quick way to understand your data distribution.' } },
    { id: 'd1-4', title: 'Data Cleaning & Handling Missing Values', duration: '25 min', content: [{ type: 'paragraph', text: 'Real-world data is messy. Data cleaning typically takes 60-80% of a data scientist\'s time.' }, { type: 'code', language: 'python', label: 'Data cleaning', code: `# Check missing values\ndf.isnull().sum()\n\n# Drop rows with missing values\ndf_clean = df.dropna()\n\n# Fill missing values\ndf['age'].fillna(df['age'].median(), inplace=True)\n\n# Remove duplicates\ndf = df.drop_duplicates()\n\n# Rename columns\ndf.rename(columns={'old_name': 'new_name'}, inplace=True)` }], quiz: { question: 'What is usually the best strategy for filling missing numerical values?', options: ['Always use 0', 'Fill with the column mean or median', 'Delete the entire column', 'Fill with the maximum value'], correctIndex: 1, explanation: 'Mean is used for normally distributed data; median is preferred when there are outliers (it is more robust to extreme values).' } },
    { id: 'd1-5', title: 'Data Visualization with Matplotlib', duration: '25 min', content: [{ type: 'paragraph', text: 'Visualization is how you communicate findings and discover patterns.' }, { type: 'code', language: 'python', label: 'Matplotlib basics', code: `import matplotlib.pyplot as plt\n\n# Line chart\nplt.figure(figsize=(10, 5))\nplt.plot(df['month'], df['revenue'], color='#6366f1', linewidth=2)\nplt.title('Monthly Revenue')\nplt.xlabel('Month')\nplt.ylabel('Revenue ($)')\nplt.tight_layout()\nplt.show()\n\n# Bar chart\ndf.groupby('domain')['score'].mean().plot(kind='bar', color='steelblue')\nplt.title('Average Score by Domain')\nplt.xticks(rotation=45)` }], quiz: { question: 'Which chart type best shows the distribution of a continuous variable?', options: ['Bar chart', 'Pie chart', 'Histogram', 'Line chart'], correctIndex: 2, explanation: 'Histograms group continuous values into bins and show frequency, revealing the distribution shape (normal, skewed, bimodal, etc.).' } },
  ] },
  'data-l2': { id: 'data-l2', title: 'Machine Learning Fundamentals', domain: 'data-ai', level: 2, badge: '🤖', duration: '16h', color: 'from-blue-500 to-cyan-500', description: 'Supervised and unsupervised learning, model evaluation.', lessons: [
    { id: 'dm2-1', title: 'Intro to Machine Learning',       duration: '25 min', content: [{ type: 'paragraph', text: 'Machine Learning is a subset of AI where systems learn from data. Instead of writing rules, we show examples and let the algorithm find patterns.' }, { type: 'code', language: 'python', label: 'First ML model', code: `from sklearn.linear_model import LinearRegression\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.metrics import mean_squared_error\nimport numpy as np\n\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)\nmodel = LinearRegression()\nmodel.fit(X_train, y_train)\npreds = model.predict(X_test)\nprint(f"MSE: {mean_squared_error(y_test, preds):.2f}")` }], quiz: { question: 'What is overfitting in machine learning?', options: ['Model is too complex and memorizes training data, performing poorly on new data', 'Model is not trained enough', 'Model uses too many features', 'Model trains too slowly'], correctIndex: 0, explanation: 'Overfitting happens when a model learns the training data too well, including its noise, and fails to generalize to unseen data.' } },
    { id: 'dm2-2', title: 'Classification Algorithms',      duration: '30 min', content: [{ type: 'paragraph', text: 'Classification predicts a category. Key algorithms: Logistic Regression, Random Forest, SVM.' }], quiz: { question: 'Which metric is best when false negatives are very costly (e.g., disease detection)?', options: ['Accuracy', 'Precision', 'Recall', 'F1 Score'], correctIndex: 2, explanation: 'Recall (sensitivity) measures: of all actual positives, how many did we catch? High recall means fewer missed cases — critical in medical diagnosis.' } },
    { id: 'dm2-3', title: 'Cross-Validation & Evaluation',  duration: '25 min', content: [{ type: 'paragraph', text: 'Model evaluation ensures your model generalizes. Cross-validation gives a more reliable estimate than a single train/test split.' }], quiz: { question: 'What does k-fold cross-validation do?', options: ['Trains k separate models', 'Splits data into k folds, trains k times using each fold as the test set', 'Tests on k different datasets', 'Uses k features'], correctIndex: 1, explanation: 'k-fold CV rotates the test set through all k folds, then averages the results. This gives a more reliable performance estimate, especially on small datasets.' } },
    { id: 'dm2-4', title: 'Feature Engineering',            duration: '20 min', content: [{ type: 'paragraph', text: 'Feature engineering transforms raw data into better input representations. It often has more impact than algorithm choice.' }], quiz: { question: 'Why do we normalize/scale features before training many ML models?', options: ['To reduce file size', 'Features on different scales can bias distance-based algorithms', 'It speeds up data loading', 'Only for neural networks'], correctIndex: 1, explanation: 'Algorithms like KNN, SVM, and neural networks are sensitive to feature scale. Without scaling, a feature measured in thousands can dominate one measured in 0-1.' } },
    { id: 'dm2-5', title: 'Clustering with K-Means',        duration: '20 min', content: [{ type: 'paragraph', text: 'K-Means is an unsupervised algorithm that groups data into k clusters based on similarity.' }, { type: 'code', language: 'python', label: 'K-Means example', code: `from sklearn.cluster import KMeans\nimport matplotlib.pyplot as plt\n\nkmeans = KMeans(n_clusters=4, random_state=42)\nkmeans.fit(X)\nlabels = kmeans.labels_\ncenters = kmeans.cluster_centers_\n\nplt.scatter(X[:, 0], X[:, 1], c=labels, cmap='viridis')\nplt.scatter(centers[:, 0], centers[:, 1], marker='*', s=200, color='red')` }], quiz: { question: 'How do you choose the optimal number of clusters in K-Means?', options: ['Always use k=3', 'The Elbow Method (plot inertia vs k)', 'Use the number of features', 'Random selection'], correctIndex: 1, explanation: 'The Elbow Method plots inertia (within-cluster variance) for different values of k. The "elbow" where improvement slows down is the optimal k.' } },
  ] },
  'data-l3': { id: 'data-l3', title: 'Deep Learning with PyTorch', domain: 'data-ai', level: 3, badge: '🧠', duration: '18h', color: 'from-violet-500 to-purple-600', description: 'Build and train neural networks for image, text, and tabular tasks.', lessons: [
    { id: 'dl3-1', title: 'Neural Networks from Scratch',   duration: '35 min', content: [{ type: 'paragraph', text: 'A neural network is a series of layers of "neurons" that learn to map inputs to outputs through training.' }, { type: 'code', language: 'python', label: 'PyTorch neural network', code: `import torch\nimport torch.nn as nn\n\nclass MLP(nn.Module):\n    def __init__(self):\n        super().__init__()\n        self.layers = nn.Sequential(\n            nn.Linear(784, 256),\n            nn.ReLU(),\n            nn.Dropout(0.2),\n            nn.Linear(256, 128),\n            nn.ReLU(),\n            nn.Linear(128, 10)\n        )\n    def forward(self, x):\n        return self.layers(x)` }], quiz: { question: 'What is the role of an activation function in a neural network?', options: ['Initialize weights', 'Introduce non-linearity so the network can learn complex patterns', 'Reduce overfitting', 'Speed up training'], correctIndex: 1, explanation: 'Without non-linear activation functions, stacking layers is equivalent to a single linear transformation — no matter the depth. Activations like ReLU enable learning complex, non-linear functions.' } },
    { id: 'dl3-2', title: 'Backpropagation & Optimizers',  duration: '30 min', content: [{ type: 'paragraph', text: 'Backpropagation computes gradients to update weights. Optimizers like Adam use these gradients to minimize loss.' }], quiz: { question: 'What does the learning rate control in gradient descent?', options: ['The number of training epochs', 'The step size taken when updating weights', 'The batch size', 'The number of layers'], correctIndex: 1, explanation: 'Learning rate is the single most important hyperparameter. Too large → divergence; too small → very slow convergence. Modern optimizers like Adam adapt it automatically per parameter.' } },
    { id: 'dl3-3', title: 'Convolutional Neural Networks',  duration: '35 min', content: [{ type: 'paragraph', text: 'CNNs are specialized for spatial data (images). Convolutional layers detect local patterns (edges, textures) regardless of position.' }], quiz: { question: 'What makes CNNs well-suited for image data?', options: ['They use more parameters than dense networks', 'They exploit spatial locality and translation invariance', 'They are faster to train', 'They require less data'], correctIndex: 1, explanation: 'Convolutional filters detect patterns anywhere in the image (translation invariance) and share parameters across positions, making them efficient for spatial data.' } },
    { id: 'dl3-4', title: 'Transfer Learning',              duration: '25 min', content: [{ type: 'paragraph', text: 'Transfer learning reuses a pre-trained model (trained on millions of images) as a starting point for your task. This dramatically reduces training time and data requirements.' }, { type: 'code', language: 'python', label: 'Transfer learning with torchvision', code: `import torchvision.models as models\nimport torch.nn as nn\n\n# Load pretrained ResNet18\nmodel = models.resnet18(pretrained=True)\n\n# Freeze all layers\nfor param in model.parameters():\n    param.requires_grad = False\n\n# Replace final layer for your task (e.g., 5 classes)\nmodel.fc = nn.Linear(model.fc.in_features, 5)` }], quiz: { question: 'When using transfer learning, why do we usually freeze the early layers?', options: ['To save disk space', 'Early layers detect general features (edges, textures) useful for any task', 'To speed up inference', 'Required by the framework'], correctIndex: 1, explanation: 'Early CNN layers learn universal features like edges and textures. Only the final layers are task-specific. Freezing early layers preserves useful knowledge and reduces training time.' } },
    { id: 'dl3-5', title: 'Model Deployment with FastAPI',  duration: '25 min', content: [{ type: 'paragraph', text: 'Training a model is only half the work. Deploying it as a REST API makes it accessible to applications.' }, { type: 'code', language: 'python', label: 'FastAPI ML endpoint', code: `from fastapi import FastAPI\nimport torch\nimport numpy as np\n\napp = FastAPI()\nmodel = torch.load('model.pt')\nmodel.eval()\n\n@app.post("/predict")\nasync def predict(data: dict):\n    x = torch.tensor(data['features'], dtype=torch.float32)\n    with torch.no_grad():\n        pred = model(x).argmax().item()\n    return {"prediction": pred, "class": CLASSES[pred]}` }], quiz: { question: 'Why do we use `torch.no_grad()` during inference?', options: ['To disable the model', 'To skip gradient computation, saving memory and speeding up inference', 'Required by FastAPI', 'To use less CPU'], correctIndex: 1, explanation: 'During inference, we don\'t need gradients (no backpropagation). torch.no_grad() disables gradient tracking, reducing memory usage by ~50% and speeding up computation.' } },
  ] },
  'data-l4': { id: 'data-l4', title: 'LLMs & Generative AI Engineering', domain: 'data-ai', level: 4, badge: '✨', duration: '20h', color: 'from-amber-400 to-orange-500', description: 'Fine-tune LLMs, build RAG pipelines and production AI agents.', lessons: [
    { id: 'dex4-1', title: 'LLM Architecture & Transformers', duration: '40 min', content: [{ type: 'paragraph', text: 'Transformers, the architecture behind GPT and BERT, use self-attention to process sequences. Understanding this is fundamental for LLM engineering.' }, { type: 'tip', text: 'The "Attention Is All You Need" paper (2017) introduced Transformers and is the most influential paper in modern AI.' }], quiz: { question: 'What is the key innovation of the Transformer architecture?', options: ['Convolutional layers', 'Self-attention mechanism that relates all positions in a sequence', 'Recurrent connections', 'Pooling layers'], correctIndex: 1, explanation: 'Self-attention lets each token attend to all other tokens simultaneously, capturing long-range dependencies that RNNs struggle with — and enabling massive parallelization.' } },
    { id: 'dex4-2', title: 'Prompt Engineering',              duration: '25 min', content: [{ type: 'paragraph', text: 'Prompt engineering is crafting inputs that elicit the best outputs from LLMs. It is a critical skill for building LLM-powered applications.' }, { type: 'code', language: 'python', label: 'Few-shot prompting', code: `prompt = """You are an expert code reviewer. Review the following code:\n\nExamples:\nCode: def add(a, b): return a + b\nReview: Clean function. Consider adding type hints.\n\nCode: for i in range(len(arr)): print(arr[i])\nReview: Use enumerate() instead: for i, v in enumerate(arr): print(v)\n\nCode: {user_code}\nReview:"""` }], quiz: { question: 'What is "few-shot prompting"?', options: ['Using a model with fewer parameters', 'Providing example input-output pairs in the prompt to guide the model', 'Training with few data samples', 'Limiting output tokens'], correctIndex: 1, explanation: 'Few-shot prompting provides example demonstrations in the prompt, helping the model understand the pattern and output format you want without any fine-tuning.' } },
    { id: 'dex4-3', title: 'RAG: Retrieval-Augmented Generation', duration: '35 min', content: [{ type: 'paragraph', text: 'RAG combines retrieval of relevant documents with LLM generation, grounding responses in your own data.' }, { type: 'code', language: 'python', label: 'Simple RAG pipeline', code: `from langchain.vectorstores import Chroma\nfrom langchain.embeddings import OpenAIEmbeddings\nfrom langchain.llms import OpenAI\nfrom langchain.chains import RetrievalQA\n\n# Build vector store from your docs\nvectorstore = Chroma.from_documents(docs, OpenAIEmbeddings())\nretriever = vectorstore.as_retriever()\n\n# RAG chain\nqa = RetrievalQA.from_chain_type(llm=OpenAI(), retriever=retriever)\nanswer = qa.run("What is our refund policy?")` }], quiz: { question: 'What problem does RAG solve for LLMs?', options: ['Slow inference speed', 'Knowledge cutoff — allows using up-to-date or private data', 'High cost', 'Poor reasoning'], correctIndex: 1, explanation: 'LLMs have a training cutoff date and cannot access private data. RAG retrieves relevant documents at query time and includes them in the context, grounding responses in current or proprietary information.' } },
    { id: 'dex4-4', title: 'Fine-Tuning LLMs with LoRA',      duration: '35 min', content: [{ type: 'paragraph', text: 'LoRA (Low-Rank Adaptation) fine-tunes LLMs by training only a small set of adapter parameters, making fine-tuning accessible on a single GPU.' }], quiz: { question: 'Why is LoRA more efficient than full fine-tuning?', options: ['Smaller models', 'Only trains low-rank adapter matrices instead of all model weights', 'Uses less data', 'Faster inference'], correctIndex: 1, explanation: 'LoRA freezes the original weights and trains small rank-decomposition matrices. This reduces trainable parameters by 10,000x while achieving similar results to full fine-tuning.' } },
    { id: 'dex4-5', title: 'AI Agents & Tool Use',             duration: '30 min', content: [{ type: 'paragraph', text: 'AI agents use LLMs as reasoning engines combined with tools (web search, code execution, APIs) to accomplish multi-step tasks.' }, { type: 'code', language: 'python', label: 'LangChain agent with tools', code: `from langchain.agents import create_openai_tools_agent, AgentExecutor\nfrom langchain.tools import tool\n\n@tool\ndef search_courses(query: str) -> str:\n    """Search for courses matching the query."""\n    return db.search(query)\n\n@tool  \ndef get_student_level(student_id: str) -> str:\n    """Get the learning level of a student."""\n    return students[student_id]['level']\n\nagent = create_openai_tools_agent(llm, [search_courses, get_student_level], prompt)\nexecutor = AgentExecutor(agent=agent, tools=[search_courses, get_student_level])` }], quiz: { question: 'What is the key difference between a chain and an agent in LangChain?', options: ['Chains use GPT-4, agents use GPT-3', 'Agents dynamically decide what steps to take; chains follow fixed steps', 'Agents are faster', 'Chains support tools'], correctIndex: 1, explanation: 'A chain follows a predetermined sequence. An agent uses an LLM to reason about which tools to use and in what order, enabling dynamic, multi-step problem solving.' } },
  ] },

  // Minimal stubs for remaining domains (Cloud + Cyber × 4 levels)
  'cloud-l1': { id: 'cloud-l1', title: 'AWS Cloud Practitioner', domain: 'cloud', level: 1, badge: '☁️', duration: '10h', color: 'from-cyan-500 to-teal-500', description: 'Foundational AWS services overview and cloud concepts.', lessons: [
    { id: 'cl1-1', title: 'Cloud Computing Fundamentals',   duration: '20 min', content: [{ type: 'paragraph', text: 'Cloud computing delivers IT resources on-demand over the internet with pay-as-you-go pricing. The three main service models are IaaS, PaaS, and SaaS.' }, { type: 'tip', text: 'IaaS (VMs) → PaaS (App Engine) → SaaS (Gmail). Each layer abstracts more infrastructure from you.' }], quiz: { question: 'What does IaaS provide?', options: ['Ready-to-use software', 'Virtual machines and raw compute/storage/networking', 'Development platforms', 'Email services'], correctIndex: 1, explanation: 'IaaS provides virtualized compute, storage, and networking. You manage the OS and above. Examples: EC2, Azure VMs, Google Compute Engine.' } },
    { id: 'cl1-2', title: 'Core AWS Services (EC2, S3, RDS)', duration: '30 min', content: [{ type: 'paragraph', text: 'EC2 provides virtual servers. S3 provides object storage. RDS provides managed relational databases.' }, { type: 'code', language: 'bash', label: 'AWS CLI basics', code: `# List S3 buckets\naws s3 ls\n\n# Upload a file to S3\naws s3 cp myfile.txt s3://my-bucket/\n\n# List EC2 instances\naws ec2 describe-instances --query 'Reservations[*].Instances[*].[InstanceId,State.Name]'` }], quiz: { question: 'Which AWS service is best for storing static website assets?', options: ['RDS', 'EC2', 'S3', 'Lambda'], correctIndex: 2, explanation: 'S3 is object storage ideal for static files, images, and backups. It can also host static websites directly.' } },
    { id: 'cl1-3', title: 'IAM: Users, Roles & Policies',   duration: '25 min', content: [{ type: 'paragraph', text: 'IAM is the access control system for AWS. Follow the principle of least privilege — grant only what is needed.' }], quiz: { question: 'What is the principle of least privilege?', options: ['Grant all permissions by default', 'Grant only the minimum permissions needed for a task', 'Use one IAM user for everything', 'Disable MFA for ease'], correctIndex: 1, explanation: 'Least privilege reduces the blast radius of security incidents. If credentials are compromised, limited permissions limit the damage.' } },
    { id: 'cl1-4', title: 'AWS Pricing & Cost Management',   duration: '20 min', content: [{ type: 'paragraph', text: 'AWS has a pay-as-you-go model. Use Cost Explorer, Budgets, and the Pricing Calculator to manage and forecast spend.' }], quiz: { question: 'Which AWS tool helps you set spending alerts?', options: ['CloudWatch', 'Cost Explorer', 'AWS Budgets', 'Trusted Advisor'], correctIndex: 2, explanation: 'AWS Budgets lets you set custom cost and usage budgets with alerts when you approach or exceed thresholds.' } },
    { id: 'cl1-5', title: 'AWS Global Infrastructure',       duration: '15 min', content: [{ type: 'paragraph', text: 'AWS has Regions (geographic areas), Availability Zones (isolated data centers in a region), and Edge Locations (CDN nodes).' }], quiz: { question: 'What is an AWS Availability Zone?', options: ['A country-level region', 'An isolated data center within a Region', 'A content delivery node', 'A backup location'], correctIndex: 1, explanation: 'AZs are physically separate data centers in a Region with independent power, cooling, and networking. Deploying across multiple AZs provides high availability.' } },
  ] },
  'cloud-l2': { id: 'cloud-l2', title: 'Networking & VPC Deep Dive', domain: 'cloud', level: 2, badge: '🌐', duration: '8h', color: 'from-blue-500 to-cyan-500', description: 'Subnets, routing, NAT gateways, security groups and VPC peering.', lessons: [
    { id: 'cv2-1', title: 'VPC Architecture',              duration: '30 min', content: [{ type: 'paragraph', text: 'A VPC (Virtual Private Cloud) is an isolated virtual network in AWS. You control IP ranges, subnets, routing tables, and gateways.' }, { type: 'code', language: 'bash', label: 'VPC via CLI', code: `# Create VPC\naws ec2 create-vpc --cidr-block 10.0.0.0/16\n\n# Create public subnet\naws ec2 create-subnet --vpc-id vpc-xxx --cidr-block 10.0.1.0/24\n\n# Create internet gateway and attach\naws ec2 create-internet-gateway\naws ec2 attach-internet-gateway --vpc-id vpc-xxx --internet-gateway-id igw-xxx` }], quiz: { question: 'What is the purpose of an Internet Gateway (IGW) in a VPC?', options: ['Connect VPCs together', 'Enables resources in public subnets to communicate with the internet', 'Manages private DNS', 'Provides DDoS protection'], correctIndex: 1, explanation: 'An IGW is attached to a VPC to allow instances in public subnets to send/receive traffic from the internet. Without it, the VPC is completely private.' } },
    { id: 'cv2-2', title: 'Public vs Private Subnets',    duration: '25 min', content: [{ type: 'paragraph', text: 'Public subnets route to an IGW. Private subnets use NAT gateways to initiate outbound internet connections while remaining unreachable from outside.' }], quiz: { question: 'What device allows private subnet instances to access the internet without being publicly accessible?', options: ['Internet Gateway', 'NAT Gateway', 'VPN Gateway', 'Load Balancer'], correctIndex: 1, explanation: 'A NAT Gateway in a public subnet allows outbound internet traffic from private subnets while blocking unsolicited inbound connections.' } },
    { id: 'cv2-3', title: 'Security Groups vs NACLs',     duration: '20 min', content: [{ type: 'paragraph', text: 'Security Groups are stateful firewalls at the instance level. NACLs are stateless firewalls at the subnet level.' }], quiz: { question: 'What does "stateful" mean for a Security Group?', options: ['It remembers past connections', 'Return traffic is automatically allowed without explicit rule', 'It stores data', 'It checks all packets independently'], correctIndex: 1, explanation: 'Stateful means if you allow inbound traffic on port 80, the response traffic is automatically allowed. NACLs are stateless and require explicit rules for both directions.' } },
    { id: 'cv2-4', title: 'VPC Peering & Transit Gateway', duration: '25 min', content: [{ type: 'paragraph', text: 'VPC Peering connects two VPCs using private AWS network. Transit Gateway connects many VPCs in a hub-and-spoke model.' }], quiz: { question: 'When would you use AWS Transit Gateway instead of VPC Peering?', options: ['For two VPCs', 'When connecting many VPCs in a scalable hub-and-spoke topology', 'For internet routing', 'For direct connect'], correctIndex: 1, explanation: 'VPC Peering becomes unmanageable at scale (N*(N-1)/2 connections). Transit Gateway acts as a central hub, simplifying connectivity between many VPCs.' } },
    { id: 'cv2-5', title: 'Route 53 & DNS Management',   duration: '20 min', content: [{ type: 'paragraph', text: 'Route 53 is AWS\'s DNS service. It supports routing policies: Simple, Weighted, Latency-based, Failover, and Geolocation.' }], quiz: { question: 'Which Route 53 routing policy sends traffic to the region with lowest latency for the user?', options: ['Weighted', 'Simple', 'Latency-based', 'Geolocation'], correctIndex: 2, explanation: 'Latency-based routing measures actual network latency and routes each user to the AWS region that provides the lowest latency response.' } },
  ] },
  'cloud-l3': { id: 'cloud-l3', title: 'AWS Solutions Architect', domain: 'cloud', level: 3, badge: '🏗️', duration: '20h', color: 'from-violet-500 to-purple-600', description: 'Design scalable, resilient, secure AWS architectures.', lessons: [
    { id: 'ca3-1', title: 'Well-Architected Framework',   duration: '30 min', content: [{ type: 'paragraph', text: 'The AWS Well-Architected Framework has 6 pillars: Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimization, and Sustainability.' }], quiz: { question: 'How many pillars does the AWS Well-Architected Framework have?', options: ['4', '5', '6', '7'], correctIndex: 2, explanation: 'The 6 pillars are: Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimization, and Sustainability (added in 2021).' } },
    { id: 'ca3-2', title: 'High Availability Patterns',  duration: '35 min', content: [{ type: 'paragraph', text: 'HA patterns: Multi-AZ deployments, Auto Scaling Groups, Application Load Balancers, and Read Replicas for databases.' }], quiz: { question: 'What does Multi-AZ deployment for RDS provide?', options: ['Better performance', 'Automatic failover to a standby replica in another AZ', 'Read scaling', 'Cost reduction'], correctIndex: 1, explanation: 'Multi-AZ maintains a synchronous standby replica in a different AZ. If the primary fails, RDS automatically fails over, typically within 60-120 seconds.' } },
    { id: 'ca3-3', title: 'Serverless Architecture',     duration: '25 min', content: [{ type: 'paragraph', text: 'Serverless uses Lambda + API Gateway + DynamoDB + S3 to build apps without managing servers. Pay only for what you use.' }], quiz: { question: 'What triggers an AWS Lambda function?', options: ['Only HTTP requests', 'Events from S3, DynamoDB, API Gateway, SQS, and many other sources', 'Only scheduled cron jobs', 'Only manual invocations'], correctIndex: 1, explanation: 'Lambda is event-driven. Dozens of AWS services can trigger Lambda: S3 uploads, DynamoDB changes, API Gateway calls, SQS messages, CloudWatch Events, and more.' } },
    { id: 'ca3-4', title: 'Data Lake Architecture',      duration: '30 min', content: [{ type: 'paragraph', text: 'AWS Data Lake: S3 as storage, Glue for ETL, Athena for SQL queries, Redshift for warehousing, QuickSight for visualization.' }], quiz: { question: 'Which AWS service lets you query data directly in S3 using SQL without loading it?', options: ['RDS', 'Redshift', 'Athena', 'DynamoDB'], correctIndex: 2, explanation: 'Amazon Athena is serverless — it queries data directly in S3 using SQL. You pay per query (per TB scanned). No infrastructure to manage.' } },
    { id: 'ca3-5', title: 'Security & Compliance',       duration: '25 min', content: [{ type: 'paragraph', text: 'Security services: IAM, KMS (encryption), CloudTrail (audit), GuardDuty (threat detection), Security Hub, and WAF.' }], quiz: { question: 'Which AWS service detects security threats using ML (e.g., unusual API calls)?', options: ['CloudTrail', 'GuardDuty', 'Inspector', 'Macie'], correctIndex: 1, explanation: 'GuardDuty uses ML on CloudTrail, VPC Flow Logs, and DNS logs to detect threats like account compromise, malware, and cryptocurrency mining.' } },
  ] },
  'cloud-l4': { id: 'cloud-l4', title: 'Cloud Architecture & Cost Optimization', domain: 'cloud', level: 4, badge: '💎', duration: '12h', color: 'from-amber-400 to-orange-500', description: 'Design enterprise-grade cloud architectures and FinOps.', lessons: [
    { id: 'cex4-1', title: 'Enterprise Architecture Patterns', duration: '35 min', content: [{ type: 'paragraph', text: 'Event-driven architectures, CQRS, Saga pattern for distributed transactions, and strangler fig for legacy migration.' }], quiz: { question: 'What is the Strangler Fig pattern?', options: ['A caching strategy', 'Gradually replacing a legacy system by routing traffic to new services', 'A database migration technique', 'A load balancing algorithm'], correctIndex: 1, explanation: 'The Strangler Fig pattern gradually replaces a monolith by intercepting calls and routing them to new microservices, until the old system can be retired.' } },
    { id: 'cex4-2', title: 'Cost Optimization at Scale',    duration: '30 min', content: [{ type: 'paragraph', text: 'Savings Plans vs Reserved Instances, Spot Instances for fault-tolerant workloads, rightsizing, and S3 Intelligent-Tiering.' }], quiz: { question: 'Which EC2 pricing model offers up to 90% discount but can be interrupted?', options: ['On-Demand', 'Reserved Instances', 'Spot Instances', 'Dedicated Hosts'], correctIndex: 2, explanation: 'Spot Instances use spare AWS capacity at up to 90% discount. They can be interrupted with 2-minute notice. Ideal for batch jobs, ML training, and fault-tolerant workloads.' } },
    { id: 'cex4-3', title: 'Disaster Recovery Strategies', duration: '25 min', content: [{ type: 'paragraph', text: 'DR strategies by RTO/RPO: Backup & Restore → Pilot Light → Warm Standby → Multi-Site Active-Active.' }], quiz: { question: 'Which DR strategy has the lowest RTO (Recovery Time Objective)?', options: ['Backup and Restore', 'Pilot Light', 'Warm Standby', 'Multi-Site Active-Active'], correctIndex: 3, explanation: 'Multi-Site Active-Active runs in multiple regions simultaneously. Failover is instant (near-zero RTO) since both sites are already serving production traffic.' } },
    { id: 'cex4-4', title: 'Observability & AIOps',        duration: '25 min', content: [{ type: 'paragraph', text: 'Modern observability = metrics + logs + traces. AWS: CloudWatch, X-Ray, and Managed Grafana. AIOps uses ML for anomaly detection.' }], quiz: { question: 'What does distributed tracing (e.g., AWS X-Ray) provide?', options: ['CPU monitoring', 'End-to-end request flow visibility across microservices', 'Log aggregation', 'Cost analysis'], correctIndex: 1, explanation: 'Distributed tracing follows a request across all services, showing latency at each step. Essential for debugging performance issues in microservices.' } },
    { id: 'cex4-5', title: 'Cloud Governance & Landing Zones', duration: '20 min', content: [{ type: 'paragraph', text: 'AWS Control Tower sets up a multi-account landing zone with guardrails, AWS Organizations, and Service Control Policies (SCPs).' }], quiz: { question: 'What does AWS Organizations primarily provide?', options: ['A billing dashboard', 'Centralized management and governance of multiple AWS accounts', 'Container orchestration', 'CDN management'], correctIndex: 1, explanation: 'AWS Organizations lets you manage multiple accounts, apply Service Control Policies (guardrails), consolidate billing, and set up account vending machines.' } },
  ] },

  // Cybersecurity courses
  'cyber-l1': { id: 'cyber-l1', title: 'Cybersecurity Fundamentals', domain: 'cyber', level: 1, badge: '🔒', duration: '8h', color: 'from-red-500 to-rose-500', description: 'Core security concepts: CIA triad, threats, vulnerabilities, and controls.', lessons: [
    { id: 'cy1-1', title: 'The CIA Triad',                  duration: '20 min', content: [{ type: 'paragraph', text: 'Confidentiality, Integrity, and Availability — the three pillars of information security. Every security control maps to one or more of these.' }, { type: 'tip', text: 'A data breach violates Confidentiality. Ransomware violates Availability. Data tampering violates Integrity.' }], quiz: { question: 'Which CIA pillar does encryption primarily protect?', options: ['Availability', 'Integrity', 'Confidentiality', 'Authentication'], correctIndex: 2, explanation: 'Encryption protects Confidentiality by ensuring only authorized parties can read data. Even if intercepted, encrypted data is unreadable without the key.' } },
    { id: 'cy1-2', title: 'Common Threat Types',            duration: '25 min', content: [{ type: 'paragraph', text: 'Know your adversary: Phishing, Malware, Ransomware, SQL Injection, XSS, DDoS, Social Engineering, and Insider Threats.' }], quiz: { question: 'What type of attack uses fake emails to trick users into revealing credentials?', options: ['DDoS', 'SQL Injection', 'Phishing', 'Buffer Overflow'], correctIndex: 2, explanation: 'Phishing uses deceptive emails mimicking trusted entities to steal credentials or install malware. It is the most common attack vector and behind 90% of data breaches.' } },
    { id: 'cy1-3', title: 'Authentication & Passwords',     duration: '20 min', content: [{ type: 'paragraph', text: 'Passwords should be hashed with bcrypt/Argon2, never stored in plaintext. MFA dramatically reduces successful attacks.' }, { type: 'code', language: 'python', label: 'Secure password hashing', code: `import bcrypt\n\n# Hash a password\npassword = b"mysecretpassword"\nhashed = bcrypt.hashpw(password, bcrypt.gensalt(rounds=12))\n\n# Verify (timing-safe comparison)\nis_valid = bcrypt.checkpw(password, hashed)\nprint(is_valid)  # True` }], quiz: { question: 'Why should passwords be hashed with bcrypt instead of MD5?', options: ['MD5 is deprecated', 'bcrypt is intentionally slow, making brute-force attacks impractical', 'bcrypt produces shorter hashes', 'MD5 cannot hash strings'], correctIndex: 1, explanation: 'MD5 is very fast — attackers can compute billions of hashes per second. bcrypt is deliberately slow (configurable rounds) and includes a salt, making precomputed attacks useless.' } },
    { id: 'cy1-4', title: 'Network Security Basics',        duration: '25 min', content: [{ type: 'paragraph', text: 'Firewalls, IDS/IPS, DMZ architecture, and VPN fundamentals. Defense in depth means multiple overlapping security layers.' }], quiz: { question: 'What is defense in depth?', options: ['A single strong firewall', 'Multiple overlapping security controls so that no single failure leads to a breach', 'Encrypting all data', 'Regular security audits'], correctIndex: 1, explanation: 'Defense in depth layers security controls (network, application, data, physical) so that bypassing one layer does not compromise the whole system.' } },
    { id: 'cy1-5', title: 'Security Policies & Compliance', duration: '20 min', content: [{ type: 'paragraph', text: 'Key frameworks: NIST CSF, ISO 27001, SOC 2, PCI-DSS, GDPR. Security policies define acceptable use, incident response, and patch management.' }], quiz: { question: 'Which regulation requires protecting personal data of EU citizens?', options: ['PCI-DSS', 'HIPAA', 'GDPR', 'SOX'], correctIndex: 2, explanation: 'GDPR (General Data Protection Regulation) requires protecting personal data of EU residents with rights to access, rectification, erasure, and data portability.' } },
  ] },
  'cyber-l2': { id: 'cyber-l2', title: 'Ethical Hacking Fundamentals', domain: 'cyber', level: 2, badge: '🕵️', duration: '16h', color: 'from-blue-500 to-cyan-500', description: 'Reconnaissance, scanning, and exploitation with Kali Linux.', lessons: [
    { id: 'cy2-1', title: 'Pen Testing Methodology',        duration: '25 min', content: [{ type: 'paragraph', text: 'Penetration testing phases: Reconnaissance → Scanning → Enumeration → Exploitation → Post-Exploitation → Reporting.' }], quiz: { question: 'What is the first phase of a penetration test?', options: ['Exploitation', 'Scanning', 'Reconnaissance', 'Reporting'], correctIndex: 2, explanation: 'Reconnaissance (recon) is passive or active information gathering about the target before any active testing. Rushing to exploitation without recon leads to missed attack surfaces.' } },
    { id: 'cy2-2', title: 'Network Scanning with Nmap',     duration: '30 min', content: [{ type: 'paragraph', text: 'Nmap is the industry-standard network scanner for discovering hosts, open ports, services, and OS versions.' }, { type: 'code', language: 'bash', label: 'Essential Nmap commands', code: `# Scan a single host\nnmap 192.168.1.1\n\n# Detect OS and service versions\nnmap -sV -O 192.168.1.1\n\n# Scan all 65535 ports\nnmap -p- 192.168.1.1\n\n# Aggressive scan (OS, version, scripts)\nnmap -A 192.168.1.1\n\n# Scan entire subnet\nnmap 192.168.1.0/24` }], quiz: { question: 'What does `nmap -sV` do?', options: ['Scan for vulnerabilities', 'Detect service/version information on open ports', 'Verbose output', 'Stealth scan'], correctIndex: 1, explanation: '-sV (version detection) probes open ports to determine what service and version is running. Knowing versions helps identify specific vulnerabilities.' } },
    { id: 'cy2-3', title: 'Web Application Vulnerabilities', duration: '35 min', content: [{ type: 'paragraph', text: 'OWASP Top 10: Broken Access Control, Cryptographic Failures, Injection, Insecure Design, Security Misconfiguration, and more.' }], quiz: { question: 'What is SQL injection?', options: ['Injecting SQL to bypass server firewalls', 'Inserting malicious SQL code into input fields to manipulate the database', 'A type of network attack', 'Stealing SQL credentials'], correctIndex: 1, explanation: 'SQL injection occurs when untrusted user input is included in SQL queries without sanitization. Attackers can read any data, bypass authentication, or delete data.' } },
    { id: 'cy2-4', title: 'Password Attacks',               duration: '25 min', content: [{ type: 'paragraph', text: 'Password attacks: brute force, dictionary attacks, credential stuffing, and pass-the-hash. Tools: Hydra, Hashcat.' }, { type: 'warning', text: 'Only perform password attacks on systems you have explicit written permission to test. Unauthorized testing is illegal.' }], quiz: { question: 'What is a dictionary attack?', options: ['Looking up passwords in a dictionary', 'Trying a list of common/likely passwords instead of all combinations', 'Cracking hash algorithms', 'Brute-forcing every character combination'], correctIndex: 1, explanation: 'Dictionary attacks use wordlists of common passwords (rockyou.txt has 14M entries). Much faster than brute force since most users pick weak passwords.' } },
    { id: 'cy2-5', title: 'Reporting & Responsible Disclosure', duration: '15 min', content: [{ type: 'paragraph', text: 'A professional pentest report includes: Executive Summary, Technical Findings (with CVSS scores), Risk Ratings, and Remediation Recommendations.' }], quiz: { question: 'What is responsible disclosure?', options: ['Publicly posting vulnerabilities immediately', 'Privately notifying vendors of vulnerabilities and giving them time to patch before going public', 'Selling vulnerabilities to the highest bidder', 'Keeping vulnerabilities secret forever'], correctIndex: 1, explanation: 'Responsible disclosure (coordinated disclosure) gives vendors 90 days to fix vulnerabilities before public disclosure. This protects users while maintaining researcher accountability.' } },
  ] },
  'cyber-l3': { id: 'cyber-l3', title: 'Web Application Pentesting', domain: 'cyber', level: 3, badge: '🕸️', duration: '14h', color: 'from-violet-500 to-purple-600', description: 'OWASP Top 10, Burp Suite, and web vulnerability exploitation.', lessons: [
    { id: 'cy3-1', title: 'Burp Suite Masterclass',         duration: '35 min', content: [{ type: 'paragraph', text: 'Burp Suite is the industry-standard web security testing platform. The Proxy intercepts and modifies HTTP/HTTPS traffic.' }, { type: 'tip', text: 'Configure your browser to use Burp as HTTP proxy (127.0.0.1:8080) and install the Burp CA certificate for HTTPS interception.' }], quiz: { question: 'What is Burp Suite\'s Repeater tool used for?', options: ['Automated scanning', 'Manually crafting and resending HTTP requests to find vulnerabilities', 'Brute-forcing login forms', 'Decrypting TLS traffic'], correctIndex: 1, explanation: 'Repeater lets you manually modify any HTTP request and resend it to test vulnerability payloads. It\'s invaluable for IDOR, SQLi, XSS, and authentication testing.' } },
    { id: 'cy3-2', title: 'Advanced SQL Injection',         duration: '30 min', content: [{ type: 'paragraph', text: 'Beyond basic SQLi: Boolean-based blind, time-based blind, UNION-based, and out-of-band injection using tools like sqlmap.' }], quiz: { question: 'When is time-based blind SQL injection used?', options: ['When the database returns data directly', 'When there is no visible output, using response delays to infer data', 'For DELETE operations', 'Only on MySQL databases'], correctIndex: 1, explanation: 'Time-based blind SQLi injects payloads like `SLEEP(5)` — if the response takes 5 seconds, you know the condition was true. Slow but works when no output is visible.' } },
    { id: 'cy3-3', title: 'XSS & CSRF Attacks',            duration: '25 min', content: [{ type: 'paragraph', text: 'XSS injects scripts into pages viewed by others. CSRF tricks authenticated users into performing unintended actions.' }], quiz: { question: 'How does a CSRF token protect against CSRF attacks?', options: ['Encrypts form data', 'An unpredictable secret token proves the request came from your legitimate form', 'Limits request rate', 'Validates the user\'s IP address'], correctIndex: 1, explanation: 'CSRF tokens are random secrets embedded in forms. The server validates each token on submission. Attackers cannot forge valid requests because they cannot read the victim\'s token (same-origin policy).' } },
    { id: 'cy3-4', title: 'API Security Testing',          duration: '25 min', content: [{ type: 'paragraph', text: 'Modern apps rely on APIs. Test for BOLA (Broken Object Level Auth), mass assignment, rate limiting bypass, and JWT vulnerabilities.' }], quiz: { question: 'What is BOLA (Broken Object Level Authorization)?', options: ['A type of XSS', 'Accessing or modifying another user\'s resources by changing an ID in the request', 'A SQL injection variant', 'A CSRF attack'], correctIndex: 1, explanation: 'BOLA (IDOR) is #1 in the OWASP API Top 10. Example: changing `/api/orders/123` to `/api/orders/124` to access another user\'s order. Missing authorization checks are the cause.' } },
    { id: 'cy3-5', title: 'Bug Bounty Strategy',            duration: '20 min', content: [{ type: 'paragraph', text: 'Platforms: HackerOne, Bugcrowd, Intigriti. Strategy: read the scope, focus on business logic, report clearly with reproducible PoC.' }], quiz: { question: 'What must you always check before testing on a bug bounty program?', options: ['The payment methods', 'The scope — which targets are in scope for testing', 'The leaderboard', 'The number of participants'], correctIndex: 1, explanation: 'The scope defines exactly what you can test. Testing out-of-scope targets can get you banned, voided rewards, or in legal trouble.' } },
  ] },
  'cyber-l4': { id: 'cyber-l4', title: 'Red Team Operations & OSCP Prep', domain: 'cyber', level: 4, badge: '🎯', duration: '24h', color: 'from-amber-400 to-orange-500', description: 'Advanced red team techniques, Active Directory attacks, and OSCP preparation.', lessons: [
    { id: 'cy4-1', title: 'Active Directory Attacks',       duration: '40 min', content: [{ type: 'paragraph', text: 'Most enterprise environments use Active Directory. Key attacks: Kerberoasting, Pass-the-Hash, Golden Ticket, and BloodHound for path analysis.' }, { type: 'warning', text: 'These techniques must only be used in authorized red team engagements or controlled lab environments.' }], quiz: { question: 'What does Kerberoasting target?', options: ['Domain Controllers directly', 'Service account password hashes via Kerberos TGS tickets', 'User email accounts', 'LDAP query results'], correctIndex: 1, explanation: 'Kerberoasting requests TGS tickets for service accounts (which encrypt the ticket with the service account\'s NTLM hash). These tickets can be cracked offline without detection.' } },
    { id: 'cy4-2', title: 'Lateral Movement Techniques',   duration: '35 min', content: [{ type: 'paragraph', text: 'After initial access: credential harvesting, Pass-the-Hash, PSExec, WMI, and PowerShell remoting for lateral movement.' }], quiz: { question: 'What is Pass-the-Hash?', options: ['Cracking password hashes', 'Authenticating using a captured NTLM hash without knowing the plaintext password', 'A phishing technique', 'A network scanning method'], correctIndex: 1, explanation: 'Windows allows authentication using the NTLM hash directly. If you capture a hash (e.g., from memory with Mimikatz), you can authenticate as that user without cracking it.' } },
    { id: 'cy4-3', title: 'Command and Control (C2)',       duration: '30 min', content: [{ type: 'paragraph', text: 'C2 frameworks (Cobalt Strike, Sliver, Havoc) manage implants on compromised systems. Modern C2 uses HTTPS to evade detection.' }], quiz: { question: 'Why do modern C2 frameworks use HTTPS for communication?', options: ['Faster data transfer', 'Blend with legitimate HTTPS traffic to evade network monitoring', 'Easier to configure', 'Required by law'], correctIndex: 1, explanation: 'HTTPS encrypts C2 traffic and makes it look like legitimate web browsing to network monitoring tools. Organizations must use SSL inspection to detect it.' } },
    { id: 'cy4-4', title: 'Privilege Escalation',          duration: '30 min', content: [{ type: 'paragraph', text: 'After low-privilege access, escalate to SYSTEM/root. Common paths: SUID binaries, cron jobs, weak service permissions, kernel exploits.' }, { type: 'code', language: 'bash', label: 'LinPEAS: Linux privilege escalation enumeration', code: `# Download and run linpeas\ncurl -L https://github.com/carlospolop/PEASS-ng/releases/latest/download/linpeas.sh | sh\n\n# Look for: SUID files, writable cron jobs, sudo misconfigs\nfind / -perm -u=s -type f 2>/dev/null\nsudo -l` }], quiz: { question: 'What is a SUID binary used for in Linux privilege escalation?', options: ['Legitimate system tool', 'A binary with SUID bit runs as its owner (often root) regardless of who executes it', 'A network scanning tool', 'A firewall rule'], correctIndex: 1, explanation: 'SUID (Set User ID) makes a binary run with the file owner\'s privileges. If a root-owned SUID binary has a shell escape, attackers can spawn a root shell.' } },
    { id: 'cy4-5', title: 'OSCP Exam Strategy',            duration: '20 min', content: [{ type: 'paragraph', text: 'OSCP is 24 hours: 3 standalone machines + Active Directory set. Strategy: document everything, enumerate thoroughly, take breaks, prioritize quick wins.' }, { type: 'tip', text: 'The OSCP motto is "Try Harder." Spend at least 20 minutes exhausting every angle before moving on. Methodical enumeration wins exams.' }], quiz: { question: 'Which box type is typically worth the most points in the OSCP exam?', options: ['Easy standalone boxes', 'The Active Directory (domain) set', 'Buffer overflow machines', 'Web application machines'], correctIndex: 1, explanation: 'The AD set (Domain Controller + 2 machines) is worth 40 points — the most valuable section. Completing it significantly increases your chance of passing (≥70 points needed).' } },
  ] },
};
