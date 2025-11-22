
import { SkillType, MissionStep } from '../types';

export const MISSIONS: Record<SkillType, MissionStep[]> = {
  [SkillType.DOCKER]: [
    {
      id: 0,
      briefing: "SYSTEM ALERT: ISOLATION PROTOCOLS OFFLINE. WE NEED TO DEPLOY A PROXY CONTAINER TO RESTORE SECTOR 7 COMMUNICATIONS.",
      objective: "Verify Docker daemon integrity.",
      technicalGuide: "Before deploying containers, you must verify the runtime environment is active. The 'version' command outputs installed client and server versions.",
      commandSyntax: "docker version",
      validationRegex: "^docker\\s+version",
      successMessage: "DAEMON INTEGRITY CONFIRMED. RUNTIME ACTIVE."
    },
    {
      id: 1,
      briefing: "WE REQUIRE THE 'NGINX' IMAGE ARTIFACT FROM THE CENTRAL REGISTRY.",
      objective: "Pull the 'nginx' image.",
      technicalGuide: "Images are read-only templates used to create containers. 'pull' downloads them from a registry (like Docker Hub) to your local machine.",
      commandSyntax: "docker pull [image_name]",
      validationRegex: "^docker\\s+pull\\s+nginx",
      successMessage: "ARTIFACT 'NGINX' DOWNLOADED SUCCESSFULLY."
    },
    {
      id: 2,
      briefing: "DEPLOY THE PROXY SERVER. IT MUST RUN IN THE BACKGROUND ON PORT 80.",
      objective: "Run a container named 'proxy' in detached mode mapped to port 80.",
      technicalGuide: "To start a container: 'run'. Use '-d' for detached (background) mode, '-p host:container' for ports, and '--name' to identify it.",
      commandSyntax: "docker run -d -p 80:80 --name proxy nginx",
      validationRegex: "^docker\\s+run.*-d.*-p.*80:80.*nginx",
      successMessage: "CONTAINER DEPLOYMENT SUCCESSFUL. PROXY ACTIVE."
    },
    {
      id: 3,
      briefing: "CONFIRM DEPLOYMENT STATUS.",
      objective: "List all running containers.",
      technicalGuide: "Use 'ps' to list running containers. It shows Container ID, Image, Command, Created Status, and Ports.",
      commandSyntax: "docker ps",
      validationRegex: "^docker\\s+ps",
      successMessage: "DIAGNOSTIC COMPLETE. SECTOR 7 ONLINE."
    }
  ],
  [SkillType.LINUX]: [
    {
      id: 0,
      briefing: "MAINFRAME ACCESS GRANTED. NAVIGATE THE FILE SYSTEM TO LOCATE THE CORRUPTED CONFIGURATION.",
      objective: "List files in the current directory including hidden files.",
      technicalGuide: "'ls' lists directory contents. Adding '-a' shows hidden files (starting with .), and '-l' shows detailed permissions and sizes.",
      commandSyntax: "ls -la",
      validationRegex: "^ls.*-.*a",
      successMessage: "DIRECTORY INDEX RETRIEVED."
    },
    {
      id: 1,
      briefing: "SUSPICIOUS FILE DETECTED: 'sys_log.txt'. EXAMINE CONTENTS.",
      objective: "Read the content of 'sys_log.txt'.",
      technicalGuide: "'cat' (concatenate) reads data from the file and outputs it to the terminal.",
      commandSyntax: "cat [filename]",
      validationRegex: "^cat\\s+sys_log\\.txt",
      successMessage: "FILE CONTENT STREAMED TO CONSOLE."
    },
    {
      id: 2,
      briefing: "LOGS ARE TOO EXTENSIVE. SEARCH FOR 'ERROR' SIGNATURES.",
      objective: "Find lines containing 'ERROR' in 'sys_log.txt'.",
      technicalGuide: "'grep' (Global Regular Expression Print) searches text for specific patterns. Usage: grep [pattern] [file].",
      commandSyntax: "grep \"pattern\" [filename]",
      validationRegex: "^grep\\s+[\"']?ERROR[\"']?\\s+sys_log\\.txt",
      successMessage: "ERROR PATTERN ISOLATED: LINE 42."
    },
    {
      id: 3,
      briefing: "REPAIR SCRIPT FOUND: 'fix_core.sh'. PERMISSIONS DENIED. AUTHORIZE EXECUTION.",
      objective: "Make 'fix_core.sh' executable.",
      technicalGuide: "'chmod' changes file modes. '+x' adds executable permission to the file.",
      commandSyntax: "chmod +x [filename]",
      validationRegex: "^chmod\\s+\\+x\\s+fix_core\\.sh",
      successMessage: "PERMISSIONS UPDATED. EXECUTING REPAIR SCRIPT..."
    }
  ],
  [SkillType.GIT]: [
    {
      id: 0,
      briefing: "TEMPORAL ANOMALY DETECTED. INITIALIZE A NEW TIMELINE REPOSITORY.",
      objective: "Initialize a new git repository.",
      technicalGuide: "'git init' creates a new empty Git repository or reinitializes an existing one. It creates a hidden .git folder.",
      commandSyntax: "git init",
      validationRegex: "^git\\s+init",
      successMessage: "REPOSITORY INITIALIZED. TIMELINE TRACKING ACTIVE."
    },
    {
      id: 1,
      briefing: "SYSTEM PARAMETERS CHANGED. CHECK STATUS OF MODIFIED FILES.",
      objective: "Check the status of files.",
      technicalGuide: "'git status' displays the state of the working directory and the staging area. It lets you see which changes have been staged, which haven't, and which files aren't being tracked.",
      commandSyntax: "git status",
      validationRegex: "^git\\s+status",
      successMessage: "STATUS REPORT: UNTRACKED FILES DETECTED."
    },
    {
      id: 2,
      briefing: "STAGE THE 'config.yaml' UPDATE FOR PERMANENT RECORD.",
      objective: "Add 'config.yaml' to the staging area.",
      technicalGuide: "'git add' adds file contents to the index (staging area). This prepares the content for the next commit.",
      commandSyntax: "git add [filename]",
      validationRegex: "^git\\s+add\\s+config\\.yaml",
      successMessage: "FILE STAGED."
    },
    {
      id: 3,
      briefing: "SAVE THE TIMELINE STATE.",
      objective: "Commit the changes with message 'System Restore'.",
      technicalGuide: "'git commit' records changes to the repository. The '-m' flag allows you to pass the commit message inline.",
      commandSyntax: "git commit -m \"[message]\"",
      validationRegex: "^git\\s+commit\\s+-m\\s+[\"'].*[\"']",
      successMessage: "SNAPSHOT SAVED. TIMELINE STABILIZED."
    }
  ],
  [SkillType.K8S]: [
    {
      id: 0,
      briefing: "CLUSTER STATUS UNKNOWN. REPORT NODE AVAILABILITY.",
      objective: "List all nodes in the cluster.",
      technicalGuide: "Kubernetes clusters consist of nodes (workers). 'kubectl get nodes' lists them and their status (Ready/NotReady).",
      commandSyntax: "kubectl get nodes",
      validationRegex: "^kubectl\\s+get\\s+nodes",
      successMessage: "NODES REPORTING: 3 WORKERS READY."
    },
    {
      id: 1,
      briefing: "SERVICE DISRUPTION IN AUTH MODULE. CHECK RUNNING PODS.",
      objective: "List all pods in the current namespace.",
      technicalGuide: "Pods are the smallest deployable units in K8s. 'kubectl get pods' shows name, readiness, status, and restarts.",
      commandSyntax: "kubectl get pods",
      validationRegex: "^kubectl\\s+get\\s+pods",
      successMessage: "POD LIST RETRIEVED. 'AUTH-SERVICE' SHOWS ERROR STATE."
    },
    {
      id: 2,
      briefing: "ANALYZE 'AUTH-SERVICE' CRASH LOGS.",
      objective: "Retrieve logs for the pod 'auth-service'.",
      technicalGuide: "'kubectl logs' prints the standard output/error streams of a container in a pod. Vital for debugging.",
      commandSyntax: "kubectl logs [pod_name]",
      validationRegex: "^kubectl\\s+logs\\s+auth-service",
      successMessage: "LOGS RETRIEVED. NULL POINTER EXCEPTION IDENTIFIED."
    }
  ],
  [SkillType.PSQL]: [
    {
      id: 0,
      briefing: "DATA ARCHIVE LOCKED. ESTABLISH CONNECTION AS ADMIN.",
      objective: "Connect to the database user 'admin'.",
      technicalGuide: "'psql' is the terminal interface for PostgreSQL. Use '-U' to specify the user.",
      commandSyntax: "psql -U [user]",
      validationRegex: "^psql\\s+-U\\s+admin",
      successMessage: "CONNECTION ESTABLISHED. SESSION ACTIVE."
    },
    {
      id: 1,
      briefing: "LOCATE THE 'COLONY_LOGS' TABLE.",
      objective: "List all tables in the current database.",
      technicalGuide: "In psql, meta-commands start with a backslash. '\\dt' lists (d) tables (t).",
      commandSyntax: "\\dt",
      validationRegex: "^\\\\dt",
      successMessage: "RELATION LIST RETRIEVED."
    },
    {
      id: 2,
      briefing: "QUERY RECENT ENTRIES FROM 'COLONY_LOGS'.",
      objective: "Select all columns from 'colony_logs'.",
      technicalGuide: "Standard SQL syntax applies. 'SELECT * FROM [table];' returns all rows. Don't forget the semicolon!",
      commandSyntax: "SELECT * FROM [table];",
      validationRegex: "^select\\s+\\*\\s+from\\s+colony_logs;?",
      successMessage: "DATA STREAMING... ANOMALY FOUND IN SECTOR 4 RECORD."
    }
  ]
};
