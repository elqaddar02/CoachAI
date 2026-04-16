// src/services/mockData.js

export const IT_DOMAINS = [
  { id: 'web-dev', name: 'Web Development', icon: 'Code', color: 'blue' },
  { id: 'cloud', name: 'Cloud Computing', icon: 'Cloud', color: 'cyan' },
  { id: 'devops', name: 'DevOps', icon: 'Settings', color: 'orange' },
  { id: 'cyber', name: 'Cybersecurity', icon: 'Shield', color: 'red' },
  { id: 'data-ai', name: 'Data Science & AI', icon: 'Database', color: 'purple' }
];

export const CAREER_PATHS = {
  'fullstack-dev': {
    title: 'Software / Full Stack Developer',
    domain: 'web-dev',
    requiredSkills: ['HTML/CSS/JS', 'React/Angular', 'Node.js/PHP', 'SQL/MySQL'],
    certifications: ['Full Stack Developer Certificate']
  },
  'ai-engineer': {
    title: 'AI / Machine Learning Engineer',
    domain: 'data-ai',
    requiredSkills: ['Python', 'Machine Learning', 'Deep Learning', 'Data Science'],
    certifications: ['AWS Certified Machine Learning']
  },
  'cloud-architect': {
    title: 'Cloud Engineer (AWS/Azure)',
    domain: 'cloud',
    requiredSkills: ['AWS/Azure', 'Networking', 'Docker', 'Kubernetes'],
    certifications: ['AWS Solutions Architect', 'Azure Administrator']
  },
  'cybersecurity': {
    title: 'Cybersecurity / Ethical Hacker',
    domain: 'cyber',
    requiredSkills: ['Linux', 'Networking', 'Security Tools', 'Penetration Testing'],
    certifications: ['Certified Ethical Hacker (CEH)']
  },
  'data-scientist': {
    title: 'Data Analyst / Data Scientist',
    domain: 'data-ai',
    requiredSkills: ['SQL', 'Python', 'Excel', 'Power BI'],
    certifications: ['Google Data Analytics Certificate']
  },
  'devops-engineer': {
    title: 'DevOps Engineer',
    domain: 'devops',
    requiredSkills: ['Linux', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD'],
    certifications: ['Certified Kubernetes Administrator', 'HashiCorp Terraform']
  },
  'ui-ux-designer': {
    title: 'UI/UX Designer',
    domain: 'web-dev',
    requiredSkills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping'],
    certifications: ['Google UX Design Certificate']
  },
  'it-support': {
    title: 'IT Support / Helpdesk',
    domain: 'cloud',
    requiredSkills: ['Windows/Linux', 'Networking Basics', 'Troubleshooting', 'Hardware'],
    certifications: ['CompTIA A+']
  },
  'mobile-dev': {
    title: 'Mobile App Developer',
    domain: 'web-dev',
    requiredSkills: ['Flutter / React Native', 'Kotlin / Swift', 'API Integration', 'UI Implementation'],
    certifications: ['Google Associate Android Developer']
  },
  'web-dev': {
    title: 'Web / WordPress Developer',
    domain: 'web-dev',
    requiredSkills: ['HTML/CSS/PHP', 'WordPress', 'JavaScript', 'SEO'],
    certifications: ['WordPress Developer Certification']
  },
  'qa-automation': {
    title: 'QA & Automation Testing',
    domain: 'devops',
    requiredSkills: ['Selenium', 'Cypress', 'Python/JS', 'CI/CD Pipelines'],
    certifications: ['ISTQB Certified Tester']
  }
};

export const MOCK_BADGES = [
  { id: 'linux-master', name: 'Linux Master', description: 'Score > 90% in Bash Scripting', icon: 'Terminal', color: 'bg-emerald-500' },
  { id: 'docker-expert', name: 'Docker Expert', description: 'Containerize an entire microservices stack', icon: 'Cloud', color: 'bg-blue-500' },
  { id: 'k8s-beginner', name: 'K8s Pilot', description: 'Deploy your first cluster on AWS', icon: 'Settings', color: 'bg-indigo-500' }
];

export const MOCK_USERS = [
  {
    id: 'admin_1',
    name: 'Admin Boss',
    email: 'admin@learnpulse.com',
    role: 'admin',
    status: 'active'
  },
  {
    id: 'teacher_1',
    name: 'Sarah Connor',
    email: 'teacher@learnpulse.com',
    role: 'teacher',
    subjects: ['devops', 'cloud'],
    status: 'active'
  },
  {
    id: 'student_1',
    name: 'Alex Developer',
    email: 'student@learnpulse.com',
    role: 'student',
    status: 'active',
    gamification: {
      xp: 3200,
      level: 6,
      badges: ['linux-master'],
      currentPath: 'devops-engineer'
    },
    performance: {
      'Linux': 92,
      'Docker': 85,
      'AWS': 70,
      'Kubernetes': 40,
      'Terraform': 20
    }
  }
];

// Helper to simulate API requests
export const simulateDelay = (ms = 800) => new Promise(resolve => setTimeout(resolve, ms));

// ─── Level Definitions ───────────────────────────────────────────────────────
export const LEVEL_DEFINITIONS = {
  1: { label: 'Beginner',     color: 'from-slate-400 to-slate-500',    badge: 'bg-slate-500/20 text-slate-400 border-slate-500/30',     glow: 'shadow-slate-500/20',  description: 'You\'re just getting started. Your personalized foundation path is ready.' },
  2: { label: 'Intermediate', color: 'from-blue-500 to-cyan-500',       badge: 'bg-blue-500/20 text-blue-400 border-blue-500/30',          glow: 'shadow-blue-500/30',   description: 'Solid foundations detected. Time to level up with hands-on projects.' },
  3: { label: 'Advanced',     color: 'from-violet-500 to-purple-600',   badge: 'bg-violet-500/20 text-violet-400 border-violet-500/30',    glow: 'shadow-violet-500/30', description: 'Impressive skills! You\'re ready for real-world production challenges.' },
  4: { label: 'Expert',       color: 'from-amber-400 to-orange-500',    badge: 'bg-amber-500/20 text-amber-400 border-amber-500/30',       glow: 'shadow-amber-500/30',  description: 'Elite level. Specialized mastery modules and leadership tracks await you.' },
};

// ─── Placement Questions ─────────────────────────────────────────────────────
export const PLACEMENT_QUESTIONS = {
  devops: [
    { id: 'dv1',  topic: 'Linux',      question: 'Which command shows running processes in Linux?',                               options: ['ps aux','ls -la','netstat -an','df -h'],                                         correctIndex: 0 },
    { id: 'dv2',  topic: 'Linux',      question: 'What does the chmod 755 command do?',                                           options: ['Deletes a file','Sets read/write/exec for owner, read/exec for others','Creates a symlink','Mounts a filesystem'],correctIndex: 1 },
    { id: 'dv3',  topic: 'Docker',     question: 'Which Dockerfile instruction sets the base image?',                             options: ['RUN','FROM','CMD','EXPOSE'],                                                     correctIndex: 1 },
    { id: 'dv4',  topic: 'Docker',     question: 'What does `docker-compose up -d` do?',                                          options: ['Stops all containers','Builds and starts services in detached mode','Pulls latest images','Removes unused volumes'],correctIndex: 1 },
    { id: 'dv5',  topic: 'Kubernetes', question: 'What is a Kubernetes Pod?',                                                     options: ['A virtual machine','The smallest deployable unit (1+ containers)','A load balancer','A storage volume'],         correctIndex: 1 },
    { id: 'dv6',  topic: 'Kubernetes', question: 'Which command applies a Kubernetes YAML manifest?',                             options: ['kubectl run','kubectl apply -f','kubectl create pod','kubectl start'],            correctIndex: 1 },
    { id: 'dv7',  topic: 'CI/CD',      question: 'In a CI/CD pipeline, what does "CD" stand for?',                                options: ['Continuous Docker','Continuous Deployment','Code Delivery','Cloud Deployment'],   correctIndex: 1 },
    { id: 'dv8',  topic: 'CI/CD',      question: 'Which tool is NOT primarily a CI/CD tool?',                                     options: ['Jenkins','GitHub Actions','Grafana','GitLab CI'],                                correctIndex: 2 },
    { id: 'dv9',  topic: 'Terraform',  question: 'What does `terraform plan` do?',                                                options: ['Applies infrastructure changes','Shows a preview of changes','Destroys resources','Initializes providers'],    correctIndex: 1 },
    { id: 'dv10', topic: 'Terraform',  question: 'Terraform state files track which of the following?',                           options: ['Git commit history','The current infrastructure state','Docker images','Pipeline logs'],                      correctIndex: 1 },
    { id: 'dv11', topic: 'Monitoring', question: 'Which tool is used for metrics monitoring and alerting?',                       options: ['Elasticsearch','Prometheus','Redis','Kafka'],                                    correctIndex: 1 },
    { id: 'dv12', topic: 'Monitoring', question: 'What does Grafana primarily do?',                                               options: ['Runs containers','Visualizes metrics and logs','Manages secrets','Builds Docker images'],                    correctIndex: 1 },
    { id: 'dv13', topic: 'Networking', question: 'What is the purpose of a reverse proxy?',                                       options: ['Encrypts databases','Forwards client requests to backend servers','Manages DNS zones','Runs load tests'],         correctIndex: 1 },
    { id: 'dv14', topic: 'Networking', question: 'What does SSL/TLS provide for web traffic?',                                    options: ['Compression','Encryption and authentication','Load balancing','Caching'],         correctIndex: 1 },
    { id: 'dv15', topic: 'Linux',      question: 'Which command finds files by name recursively from the current directory?',     options: ['grep -r','locate','find . -name','ls -R'],                                       correctIndex: 2 },
  ],
  'web-dev': [
    { id: 'wd1',  topic: 'HTML',       question: 'Which HTML tag defines the document\'s body?',                                  options: ['<head>','<html>','<body>','<main>'],                               correctIndex: 2 },
    { id: 'wd2',  topic: 'CSS',        question: 'What does `position: absolute` do in CSS?',                                     options: ['Fixes element to the viewport','Positions element relative to nearest positioned ancestor','Removes element from DOM','Floats element left'], correctIndex: 1 },
    { id: 'wd3',  topic: 'JavaScript', question: 'What does `===` check in JavaScript?',                                          options: ['Assignment','Value equality only','Value and type equality','Reference equality'],correctIndex: 2 },
    { id: 'wd4',  topic: 'JavaScript', question: 'Which method returns a new array with elements that pass a test?',              options: ['map()','forEach()','filter()','reduce()'],                                       correctIndex: 2 },
    { id: 'wd5',  topic: 'React',      question: 'What is the purpose of `useEffect` in React?',                                  options: ['Manages component styling','Handles side effects like API calls','Creates Redux actions','Memoizes components'],   correctIndex: 1 },
    { id: 'wd6',  topic: 'React',      question: 'What does lifting state up mean in React?',                                     options: ['Using Redux','Moving state to a common parent component','Using context API','Server-side rendering'],           correctIndex: 1 },
    { id: 'wd7',  topic: 'APIs',       question: 'What HTTP status code means "Not Found"?',                                      options: ['200','301','404','500'],                                                         correctIndex: 2 },
    { id: 'wd8',  topic: 'APIs',       question: 'What does REST stand for?',                                                     options: ['Remote Execution State Transfer','Representational State Transfer','Real-time Event Streaming Tool','Reserved Endpoint Standard Type'], correctIndex: 1 },
    { id: 'wd9',  topic: 'CSS',        question: 'Which CSS property controls the stacking order of elements?',                   options: ['opacity','position','z-index','display'],                                       correctIndex: 2 },
    { id: 'wd10', topic: 'JavaScript', question: 'What does `async/await` simplify in JavaScript?',                              options: ['DOM manipulation','Working with Promises','Event handling','Module imports'],    correctIndex: 1 },
    { id: 'wd11', topic: 'TypeScript', question: 'What is the main benefit of TypeScript over JavaScript?',                       options: ['Faster runtime','Static type checking','Better CSS support','Built-in routing'], correctIndex: 1 },
    { id: 'wd12', topic: 'TypeScript', question: 'Which TypeScript keyword makes a property optional in an interface?',           options: ['optional','?','maybe','@optional'],                                             correctIndex: 1 },
    { id: 'wd13', topic: 'Performance','question': 'What does lazy loading in web apps achieve?',                                 options: ['Better SEO','Loads resources only when needed','Caches API responses','Minifies CSS'], correctIndex: 1 },
    { id: 'wd14', topic: 'React',      question: 'What does `useMemo` do in React?',                                              options: ['Caches a function reference','Memoizes an expensive computed value','Fetches data','Manages routing'],           correctIndex: 1 },
    { id: 'wd15', topic: 'HTML',       question: 'Which attribute makes an `<input>` field mandatory?',                           options: ['mandatory','validate','required','notempty'],                                   correctIndex: 2 },
  ],
  'data-ai': [
    { id: 'da1',  topic: 'Python',     question: 'Which Python library is the foundation for scientific computing?',              options: ['Pandas','NumPy','Matplotlib','Scikit-learn'],                                    correctIndex: 1 },
    { id: 'da2',  topic: 'Python',     question: 'What does a Pandas DataFrame represent?',                                      options: ['A neural network layer','A 2D labeled data structure','A machine learning model','A SQL database'],              correctIndex: 1 },
    { id: 'da3',  topic: 'ML',         question: 'What is overfitting in machine learning?',                                     options: ['Model performs well on all data','Model learns training data too well and fails on new data','Model underfits test set','Model has too few parameters'], correctIndex: 1 },
    { id: 'da4',  topic: 'ML',         question: 'Which algorithm is used for classification tasks?',                            options: ['Linear Regression','K-Means','Logistic Regression','PCA'],                      correctIndex: 2 },
    { id: 'da5',  topic: 'Deep Learning','question':'What is a neural network activation function used for?',                    options: ['Initializing weights','Introducing non-linearity into the network','Reducing dataset size','Splitting batches'],   correctIndex: 1 },
    { id: 'da6',  topic: 'Deep Learning','question':'Which framework is widely used for deep learning?',                         options: ['Pandas','Scikit-learn','PyTorch','Matplotlib'],                                  correctIndex: 2 },
    { id: 'da7',  topic: 'SQL',        question: 'Which SQL clause filters aggregated results?',                                  options: ['WHERE','GROUP BY','HAVING','ORDER BY'],                                          correctIndex: 2 },
    { id: 'da8',  topic: 'SQL',        question: 'What does a LEFT JOIN return?',                                                 options: ['Only matching rows from both tables','All rows from left table, matching rows from right','Only right table rows','Rows with no matches'], correctIndex: 1 },
    { id: 'da9',  topic: 'Statistics', question: 'What does standard deviation measure?',                                        options: ['The most common value','The middle value','The spread of data around the mean','The maximum value'],            correctIndex: 2 },
    { id: 'da10', topic: 'Statistics', question: 'What is the purpose of cross-validation?',                                     options: ['Feature scaling','Evaluating model generalization by splitting data','Reducing dimensionality','Encoding labels'], correctIndex: 1 },
    { id: 'da11', topic: 'Data Viz',   question: 'Which chart is best for showing distribution of a continuous variable?',       options: ['Bar chart','Pie chart','Histogram','Line chart'],                                correctIndex: 2 },
    { id: 'da12', topic: 'Data Viz',   question: 'What does a heatmap typically show?',                                          options: ['Time series trends','Correlation matrix between variables','Cluster boundaries','Model accuracy over epochs'],  correctIndex: 1 },
    { id: 'da13', topic: 'ML',         question: 'What is the purpose of feature scaling?',                                      options: ['Remove duplicate rows','Encode categorical variables','Normalize numerical features to similar ranges','Split data'], correctIndex: 2 },
    { id: 'da14', topic: 'Python',     question: 'Which method fills missing values in a Pandas DataFrame?',                     options: ['df.drop()','df.fillna()','df.dropna()','df.replace()'],                         correctIndex: 1 },
    { id: 'da15', topic: 'ML',         question: 'What is the role of a training set in ML?',                                    options: ['To test model performance','To tune hyperparameters','To fit model parameters','To visualize data'],            correctIndex: 2 },
  ],
  cloud: [
    { id: 'cl1',  topic: 'AWS Core',   question: 'What does Amazon S3 provide?',                                                 options: ['Virtual machines','Object storage','Managed databases','Content delivery'],     correctIndex: 1 },
    { id: 'cl2',  topic: 'AWS Core',   question: 'Which AWS service is used for serverless compute?',                            options: ['EC2','ECS','Lambda','RDS'],                                                     correctIndex: 2 },
    { id: 'cl3',  topic: 'Networking', question: 'What is a VPC in AWS?',                                                        options: ['A CDN service','An isolated virtual network in the cloud','A managed Kubernetes service','A DNS service'],       correctIndex: 1 },
    { id: 'cl4',  topic: 'Networking', question: 'What does a Security Group in AWS act as?',                                    options: ['A firewall for EC2 instances','An IAM policy','A DNS record','A VPN endpoint'],correctIndex: 0 },
    { id: 'cl5',  topic: 'IAM',        question: 'What does IAM stand for in AWS?',                                              options: ['Internet Access Module','Infrastructure And Management','Identity and Access Management','Instance Authentication Manager'], correctIndex: 2 },
    { id: 'cl6',  topic: 'IAM',        question: 'What is the principle of least privilege?',                                    options: ['Grant all permissions by default','Give users only the permissions they need','Use root account for all tasks','Disable MFA for developers'], correctIndex: 1 },
    { id: 'cl7',  topic: 'Compute',    question: 'What is the difference between EC2 and Lambda?',                              options: ['EC2 is serverless, Lambda is VM-based','EC2 is VM-based, Lambda is serverless event-driven','Both are the same','Lambda only runs Python'], correctIndex: 1 },
    { id: 'cl8',  topic: 'Compute',    question: 'What does auto-scaling do in cloud environments?',                            options: ['Encrypts data at rest','Automatically adjusts compute capacity based on load','Manages DNS routing','Backs up databases'], correctIndex: 1 },
    { id: 'cl9',  topic: 'Storage',    question: 'What is the difference between EBS and S3?',                                   options: ['EBS is object storage, S3 is block storage','EBS is block storage for EC2, S3 is object storage','Both are the same','EBS is serverless'], correctIndex: 1 },
    { id: 'cl10', topic: 'Storage',    question: 'What does S3 versioning do?',                                                  options: ['Encrypts bucket contents','Keeps multiple versions of objects','Enables public access','Replicates across regions'], correctIndex: 1 },
    { id: 'cl11', topic: 'Databases',  question: 'Which AWS service provides a managed relational database?',                   options: ['DynamoDB','ElastiCache','RDS','Redshift'],                                       correctIndex: 2 },
    { id: 'cl12', topic: 'Databases',  question: 'What type of database is DynamoDB?',                                           options: ['Relational','Graph','Column-family','NoSQL key-value / document'],               correctIndex: 3 },
    { id: 'cl13', topic: 'CDN',        question: 'What is Amazon CloudFront used for?',                                          options: ['Running containers','Content delivery via global edge locations','Managing SSL certificates','Billing management'],  correctIndex: 1 },
    { id: 'cl14', topic: 'Cost',       question: 'What is the AWS Free Tier?',                                                   options: ['A paid enterprise plan','A set of services available at no cost for new accounts','A discounted reserved instance','A service for budget alerts'], correctIndex: 1 },
    { id: 'cl15', topic: 'AWS Core',   question: 'What does AWS Elastic Beanstalk do?',                                          options: ['Manages Terraform state','PaaS platform that deploys and scales web apps automatically','Provides CDN services','Manages IAM roles'], correctIndex: 1 },
  ],
  cyber: [
    { id: 'cy1',  topic: 'Networking', question: 'What does a firewall primarily do?',                                           options: ['Encrypts hard drives','Monitors and controls network traffic based on rules','Backs up system files','Manages user accounts'], correctIndex: 1 },
    { id: 'cy2',  topic: 'Networking', question: 'What is a Man-in-the-Middle (MITM) attack?',                                   options: ['Flooding a server with requests','Intercepting communications between two parties','Brute-forcing passwords','SQL injection'], correctIndex: 1 },
    { id: 'cy3',  topic: 'Encryption', question: 'What does asymmetric encryption use?',                                         options: ['One shared key','A public key and a private key','Hash functions only','SSL certificates only'],                        correctIndex: 1 },
    { id: 'cy4',  topic: 'Encryption', question: 'What is the purpose of hashing passwords?',                                   options: ['Speed up login','Store passwords in a one-way irreversible format','Encrypt the database','Compress user data'],         correctIndex: 1 },
    { id: 'cy5',  topic: 'Linux',      question: 'Which command shows open network ports on a Linux system?',                    options: ['ls -la','ps aux','netstat -tulpn','cat /etc/hosts'],                             correctIndex: 2 },
    { id: 'cy6',  topic: 'Linux',      question: 'Which file stores user account information in Linux?',                         options: ['/etc/shadow','/etc/passwd','/var/log/syslog','/home/users'],                    correctIndex: 1 },
    { id: 'cy7',  topic: 'Web Security','question':'What is an XSS (Cross-Site Scripting) attack?',                              options: ['Injecting SQL into form fields','Injecting malicious scripts into web pages viewed by others','Bypassing 2FA','Packet sniffing on Wi-Fi'], correctIndex: 1 },
    { id: 'cy8',  topic: 'Web Security','question':'What does HTTPS protect against compared to HTTP?',                          options: ['DDoS attacks','Eavesdropping by encrypting traffic','SQL injection','Brute force login'],                              correctIndex: 1 },
    { id: 'cy9',  topic: 'Pen Testing','question':'What is the first phase of a penetration test?',                              options: ['Exploitation','Reporting','Reconnaissance','Post-exploitation'],                 correctIndex: 2 },
    { id: 'cy10', topic: 'Pen Testing','question':'What tool is commonly used for network scanning?',                            options: ['Wireshark','Nmap','Metasploit','Burp Suite'],                                    correctIndex: 1 },
    { id: 'cy11', topic: 'Auth',       question: 'What does MFA (Multi-Factor Authentication) add?',                            options: ['Faster login','An extra layer of verification beyond a password','Biometric login only','Single sign-on'],           correctIndex: 1 },
    { id: 'cy12', topic: 'Auth',       question: 'What is a rainbow table attack?',                                              options: ['Brute-force on login forms','Using precomputed hash values to crack passwords','SQL injection variant','Session hijacking'], correctIndex: 1 },
    { id: 'cy13', topic: 'Malware',    question: 'What does ransomware typically do?',                                           options: ['Steals cookies','Encrypts files and demands payment','Monitors keystrokes','Opens backdoors'],                        correctIndex: 1 },
    { id: 'cy14', topic: 'Malware',    question: 'What is a zero-day vulnerability?',                                            options: ['A vulnerability fixed the same day','An unknown flaw with no available patch','A vulnerability in day-0 configs','An intentional backdoor'], correctIndex: 1 },
    { id: 'cy15', topic: 'Networking', question: 'What type of attack sends massive traffic to overwhelm a server?',             options: ['Phishing','SQL Injection','DDoS','CSRF'],                                        correctIndex: 2 },
  ],
};

// ─── Recommended Courses by Domain + Level ───────────────────────────────────
export const RECOMMENDED_COURSES = {
  devops: [
    { id: 'dv-c1', title: 'Linux Fundamentals Bootcamp',      duration: '8h',  level: 'Beginner',     levels: [1],         badge: '🐧', description: 'Master essential Linux commands, file permissions, and shell scripting.' },
    { id: 'dv-c2', title: 'Docker Deep Dive',                 duration: '10h', level: 'Beginner',     levels: [1, 2],      badge: '🐳', description: 'Containerize applications from scratch with Dockerfile and Compose.' },
    { id: 'dv-c3', title: 'Kubernetes Certified Path',        duration: '16h', level: 'Intermediate', levels: [2, 3],      badge: '☸️', description: 'Deploy, scale, and manage distributed apps on Kubernetes.' },
    { id: 'dv-c4', title: 'CI/CD with GitHub Actions',        duration: '6h',  level: 'Intermediate', levels: [2],         badge: '⚙️', description: 'Build automated build, test and deploy pipelines end-to-end.' },
    { id: 'dv-c5', title: 'Terraform & IaC Mastery',          duration: '12h', level: 'Advanced',     levels: [3],         badge: '🏗️', description: 'Provision and manage cloud infrastructure using Terraform.' },
    { id: 'dv-c6', title: 'Observability with Prometheus & Grafana', duration: '8h', level: 'Advanced', levels: [3, 4], badge: '📊', description: 'Monitor your systems, set alerts, and build dashboards.' },
    { id: 'dv-c7', title: 'Platform Engineering & SRE',       duration: '20h', level: 'Expert',       levels: [4],         badge: '🚀', description: 'Design large-scale DevOps platforms and SRE practices.' },
  ],
  'web-dev': [
    { id: 'wd-c1', title: 'HTML & CSS Mastery',               duration: '10h', level: 'Beginner',     levels: [1],         badge: '🎨', description: 'Build responsive, accessible and beautiful web layouts.' },
    { id: 'wd-c2', title: 'JavaScript Essentials',            duration: '12h', level: 'Beginner',     levels: [1, 2],      badge: '⚡', description: 'Core JS concepts: closures, promises, event loop and DOM.' },
    { id: 'wd-c3', title: 'React Fundamentals',               duration: '14h', level: 'Intermediate', levels: [2],         badge: '⚛️', description: 'Build component-based UIs with hooks, context and routing.' },
    { id: 'wd-c4', title: 'TypeScript for React Devs',        duration: '8h',  level: 'Intermediate', levels: [2, 3],      badge: '🔷', description: 'Add type safety to your React projects effectively.' },
    { id: 'wd-c5', title: 'Node.js & REST APIs',              duration: '12h', level: 'Advanced',     levels: [3],         badge: '🟢', description: 'Build scalable backend services with Express.js.' },
    { id: 'wd-c6', title: 'Performance & Web Vitals',         duration: '6h',  level: 'Advanced',     levels: [3, 4],      badge: '🏎️', description: 'Optimize your web app for Core Web Vitals and best scores.' },
    { id: 'wd-c7', title: 'Full Stack Architecture & System Design', duration: '18h', level: 'Expert', levels: [4],         badge: '🏛️', description: 'Design scalable full-stack systems with microservices.' },
  ],
  'data-ai': [
    { id: 'da-c1', title: 'Python for Data Science',          duration: '10h', level: 'Beginner',     levels: [1],         badge: '🐍', description: 'Learn Python, NumPy, Pandas and data wrangling fundamentals.' },
    { id: 'da-c2', title: 'SQL & Database Querying',          duration: '8h',  level: 'Beginner',     levels: [1, 2],      badge: '🗄️', description: 'Write complex SQL queries for data analysis.' },
    { id: 'da-c3', title: 'Machine Learning Fundamentals',    duration: '16h', level: 'Intermediate', levels: [2],         badge: '🤖', description: 'Supervised, unsupervised learning and model evaluation.' },
    { id: 'da-c4', title: 'Data Visualization with Python',   duration: '6h',  level: 'Intermediate', levels: [2, 3],      badge: '📈', description: 'Build impactful charts with Matplotlib, Seaborn and Plotly.' },
    { id: 'da-c5', title: 'Deep Learning with PyTorch',       duration: '18h', level: 'Advanced',     levels: [3],         badge: '🧠', description: 'Build and train neural networks for complex tasks.' },
    { id: 'da-c6', title: 'MLOps & Model Deployment',         duration: '12h', level: 'Advanced',     levels: [3, 4],      badge: '🚀', description: 'Deploy ML models to production with FastAPI and Docker.' },
    { id: 'da-c7', title: 'LLMs & Generative AI Engineering', duration: '20h', level: 'Expert',       levels: [4],         badge: '✨', description: 'Fine-tune LLMs, build RAG pipelines and AI agents.' },
  ],
  cloud: [
    { id: 'cl-c1', title: 'AWS Cloud Practitioner',           duration: '10h', level: 'Beginner',     levels: [1],         badge: '☁️', description: 'Get your foundational AWS certification. Services overview.' },
    { id: 'cl-c2', title: 'Networking & VPC Fundamentals',    duration: '8h',  level: 'Beginner',     levels: [1, 2],      badge: '🌐', description: 'Subnets, routing tables, NAT, security groups and more.' },
    { id: 'cl-c3', title: 'AWS Solutions Architect Associate', duration: '20h', level: 'Intermediate', levels: [2, 3],      badge: '🏗️', description: 'Design scalable, resilient architectures on AWS.' },
    { id: 'cl-c4', title: 'Serverless & Lambda Deep Dive',    duration: '8h',  level: 'Intermediate', levels: [2],         badge: '⚡', description: 'Build event-driven serverless applications on AWS.' },
    { id: 'cl-c5', title: 'AWS DevOps Professional',         duration: '16h', level: 'Advanced',     levels: [3],         badge: '⚙️', description: 'Automate, monitor and secure cloud workloads.' },
    { id: 'cl-c6', title: 'Multi-Cloud Strategy (AWS+Azure)', duration: '14h', level: 'Advanced',     levels: [3, 4],      badge: '🌍', description: 'Build hybrid and multi-cloud solutions.' },
    { id: 'cl-c7', title: 'Cloud Architecture & Cost Optimization', duration: '12h', level: 'Expert', levels: [4],         badge: '💎', description: 'Design enterprise-grade cloud architectures at scale.' },
  ],
  cyber: [
    { id: 'cy-c1', title: 'Cybersecurity Fundamentals',       duration: '8h',  level: 'Beginner',     levels: [1],         badge: '🔒', description: 'Core concepts: CIA triad, threats, vulnerabilities and controls.' },
    { id: 'cy-c2', title: 'Linux for Security Professionals', duration: '10h', level: 'Beginner',     levels: [1, 2],      badge: '🐧', description: 'Linux administration skills essential for security work.' },
    { id: 'cy-c3', title: 'Network Security & Firewalls',     duration: '12h', level: 'Intermediate', levels: [2],         badge: '🛡️', description: 'Configure firewalls, VPNs, IDS/IPS systems.' },
    { id: 'cy-c4', title: 'Ethical Hacking Fundamentals',     duration: '16h', level: 'Intermediate', levels: [2, 3],      badge: '🕵️', description: 'Reconnaissance, scanning, exploitation with Kali Linux.' },
    { id: 'cy-c5', title: 'Web Application Pentesting',       duration: '14h', level: 'Advanced',     levels: [3],         badge: '🕸️', description: 'OWASP Top 10, Burp Suite, and web vulnerability exploitation.' },
    { id: 'cy-c6', title: 'Malware Analysis & Forensics',     duration: '12h', level: 'Advanced',     levels: [3, 4],      badge: '🔬', description: 'Analyze malware samples and perform digital forensics.' },
    { id: 'cy-c7', title: 'Red Team Operations & OSCP Prep',  duration: '24h', level: 'Expert',       levels: [4],         badge: '🎯', description: 'Advanced red team techniques, AD attacks, and OSCP preparation.' },
  ],
};
