
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
      briefing: "CHECK LOCAL REGISTRY FOR ARTIFACTS.",
      objective: "List available local images.",
      technicalGuide: "Images are the blueprints for containers. Use 'docker images' (or 'docker image ls') to see what is currently cached locally on the host system.",
      commandSyntax: "docker images",
      validationRegex: "^docker\\s+(images|image\\s+ls)",
      successMessage: "LOCAL REGISTRY EMPTY. ARTIFACT RETRIEVAL REQUIRED."
    },
    {
      id: 2,
      briefing: "WE REQUIRE THE 'NGINX' IMAGE ARTIFACT FROM THE CENTRAL REGISTRY.",
      objective: "Pull the 'nginx' image.",
      technicalGuide: "To run a container, you first need its image. 'docker pull' downloads it from a remote registry (like Docker Hub) to your local machine.",
      commandSyntax: "docker pull [image_name]",
      validationRegex: "^docker\\s+pull\\s+nginx",
      successMessage: "ARTIFACT 'NGINX' DOWNLOADED SUCCESSFULLY."
    },
    {
      id: 3,
      briefing: "DEPLOY THE PROXY SERVER. IT MUST RUN IN THE BACKGROUND ON PORT 80.",
      objective: "Run a container named 'proxy' in detached mode mapped to port 80.",
      technicalGuide: "To start a container: 'docker run'. Use '-d' for detached (background) mode, '-p host:container' to map ports, and '--name' to assign a stable identifier.",
      commandSyntax: "docker run -d -p 80:80 --name proxy nginx",
      validationRegex: "^docker\\s+run.*-d.*-p.*80:80.*nginx",
      successMessage: "CONTAINER DEPLOYMENT SUCCESSFUL. PROXY ACTIVE."
    },
    {
      id: 4,
      briefing: "CONFIRM DEPLOYMENT STATUS.",
      objective: "List all running containers.",
      technicalGuide: "Use 'docker ps' to list active containers. It displays the Container ID, Image, Command, Created Status, and Port mappings. Add '-a' to see stopped containers too.",
      commandSyntax: "docker ps",
      validationRegex: "^docker\\s+ps",
      successMessage: "DIAGNOSTIC COMPLETE. SECTOR 7 ONLINE."
    },
    {
      id: 5,
      briefing: "SIMULATION COMPLETE. INITIATE CLEANUP PROTOCOLS.",
      objective: "Stop the 'proxy' container.",
      technicalGuide: "Containers should be stopped gracefully before removal. 'docker stop [name_or_id]' sends a SIGTERM signal to the main process.",
      commandSyntax: "docker stop proxy",
      validationRegex: "^docker\\s+stop\\s+proxy",
      successMessage: "CONTAINER HALTED."
    },
    {
      id: 6,
      briefing: "PURGE RESIDUAL DATA.",
      objective: "Remove the 'proxy' container.",
      technicalGuide: "Stopped containers still consume disk space. 'docker rm' removes the container layer permanently. Use 'docker rmi' to remove images.",
      commandSyntax: "docker rm proxy",
      validationRegex: "^docker\\s+rm\\s+proxy",
      successMessage: "CLEANUP COMPLETE. MODULE SECURED."
    }
  ],
  [SkillType.LINUX]: [
    {
      id: 0,
      briefing: "MAINFRAME ACCESS GRANTED. IDENTIFY CURRENT SECTOR.",
      objective: "Print the current working directory.",
      technicalGuide: "'pwd' (Print Working Directory) tells you exactly where you are in the filesystem hierarchy. Essential for navigation.",
      commandSyntax: "pwd",
      validationRegex: "^pwd",
      successMessage: "LOCATION IDENTIFIED: /home/operator"
    },
    {
      id: 1,
      briefing: "NAVIGATE THE FILE SYSTEM TO LOCATE THE CORRUPTED CONFIGURATION.",
      objective: "List files in the current directory including hidden files.",
      technicalGuide: "'ls' lists directory contents. Adding '-a' shows hidden files (starting with .), and '-l' shows detailed permissions and sizes.",
      commandSyntax: "ls -la",
      validationRegex: "^ls.*-.*a",
      successMessage: "DIRECTORY INDEX RETRIEVED."
    },
    {
      id: 2,
      briefing: "ISOLATION REQUIRED. CREATE A QUARANTINE DIRECTORY.",
      objective: "Make a new directory named 'quarantine'.",
      technicalGuide: "'mkdir' (Make Directory) creates a new folder. You can create multiple nested directories at once using the '-p' flag (e.g., mkdir -p a/b/c).",
      commandSyntax: "mkdir quarantine",
      validationRegex: "^mkdir\\s+quarantine",
      successMessage: "SECTOR 'QUARANTINE' CREATED."
    },
    {
      id: 3,
      briefing: "MOVE SUSPICIOUS LOGS TO QUARANTINE.",
      objective: "Move 'sys_log.txt' into the 'quarantine' directory.",
      technicalGuide: "'mv' (Move) relocates files. It is also used to rename files (e.g., 'mv old.txt new.txt').",
      commandSyntax: "mv sys_log.txt quarantine/",
      validationRegex: "^mv\\s+sys_log\\.txt\\s+quarantine/?",
      successMessage: "FILE RELOCATED."
    },
    {
      id: 4,
      briefing: "ENTER THE QUARANTINE SECTOR.",
      objective: "Change directory to 'quarantine'.",
      technicalGuide: "'cd' (Change Directory) moves your shell context. Use 'cd ..' to go up one level.",
      commandSyntax: "cd quarantine",
      validationRegex: "^cd\\s+quarantine",
      successMessage: "CONTEXT UPDATED."
    },
    {
      id: 5,
      briefing: "EXAMINE CONTENTS FOR CORRUPTION.",
      objective: "Read the content of 'sys_log.txt'.",
      technicalGuide: "'cat' (Concatenate) reads data from the file and outputs it to the terminal. For large files, use 'less' or 'more' to paginate.",
      commandSyntax: "cat sys_log.txt",
      validationRegex: "^cat\\s+sys_log\\.txt",
      successMessage: "FILE CONTENT STREAMED TO CONSOLE."
    },
    {
      id: 6,
      briefing: "LOGS ARE TOO EXTENSIVE. SEARCH FOR 'ERROR' SIGNATURES.",
      objective: "Find lines containing 'ERROR' in 'sys_log.txt'.",
      technicalGuide: "'grep' (Global Regular Expression Print) searches text for specific patterns. It is a powerful filter often used with pipes (|).",
      commandSyntax: "grep \"pattern\" [filename]",
      validationRegex: "^grep\\s+[\"']?ERROR[\"']?\\s+sys_log\\.txt",
      successMessage: "ERROR PATTERN ISOLATED: LINE 42."
    }
  ],
  [SkillType.GIT]: [
    {
      id: 0,
      briefing: "TEMPORAL ANOMALY DETECTED. INITIALIZE A NEW TIMELINE REPOSITORY.",
      objective: "Initialize a new git repository.",
      technicalGuide: "'git init' converts the current directory into a Git repository. It creates a hidden .git subfolder where version history is stored.",
      commandSyntax: "git init",
      validationRegex: "^git\\s+init",
      successMessage: "REPOSITORY INITIALIZED. TIMELINE TRACKING ACTIVE."
    },
    {
      id: 1,
      briefing: "IDENTIFY YOURSELF TO THE TIMELINE.",
      objective: "Configure your global user name to 'Operator'.",
      technicalGuide: "Git requires an identity for every commit. Use 'git config' to set user.name and user.email. Use '--global' to apply this to all repositories on the system.",
      commandSyntax: "git config --global user.name \"Operator\"",
      validationRegex: "^git\\s+config\\s+(--global\\s+)?user\\.name\\s+[\"']?Operator[\"']?",
      successMessage: "IDENTITY CONFIRMED."
    },
    {
      id: 2,
      briefing: "SYSTEM PARAMETERS CHANGED. CHECK STATUS OF MODIFIED FILES.",
      objective: "Check the status of files.",
      technicalGuide: "'git status' displays the state of the working directory and the staging area. It shows which files are modified, staged, or untracked.",
      commandSyntax: "git status",
      validationRegex: "^git\\s+status",
      successMessage: "STATUS REPORT: UNTRACKED FILES DETECTED."
    },
    {
      id: 3,
      briefing: "STAGE THE 'config.yaml' UPDATE FOR PERMANENT RECORD.",
      objective: "Add 'config.yaml' to the staging area.",
      technicalGuide: "'git add' moves changes from the working directory to the staging area (index). Only staged changes will be included in the next commit.",
      commandSyntax: "git add [filename]",
      validationRegex: "^git\\s+add\\s+config\\.yaml",
      successMessage: "FILE STAGED."
    },
    {
      id: 4,
      briefing: "SAVE THE TIMELINE STATE.",
      objective: "Commit the changes with message 'Initial config'.",
      technicalGuide: "'git commit' captures a snapshot of the currently staged changes. The '-m' flag allows you to pass a concise commit message.",
      commandSyntax: "git commit -m \"[message]\"",
      validationRegex: "^git\\s+commit\\s+-m\\s+[\"'].*[\"']",
      successMessage: "SNAPSHOT SAVED. TIMELINE STABILIZED."
    },
    {
      id: 5,
      briefing: "VERIFY TIMELINE HISTORY.",
      objective: "View the commit history.",
      technicalGuide: "'git log' shows the commit history. It displays the commit hash, author, date, and message. Press 'q' to exit if it opens a pager.",
      commandSyntax: "git log",
      validationRegex: "^git\\s+log",
      successMessage: "HISTORY VERIFIED. ALL SYSTEMS NOMINAL."
    }
  ],
  [SkillType.K8S]: [
    {
      id: 0,
      briefing: "CLUSTER STATUS UNKNOWN. REPORT NODE AVAILABILITY.",
      objective: "List all nodes in the cluster.",
      technicalGuide: "Kubernetes clusters consist of a control plane and worker nodes. 'kubectl get nodes' lists them and their status (Ready/NotReady).",
      commandSyntax: "kubectl get nodes",
      validationRegex: "^kubectl\\s+get\\s+nodes",
      successMessage: "NODES REPORTING: 3 WORKERS READY."
    },
    {
      id: 1,
      briefing: "SERVICE DISRUPTION IN AUTH MODULE. CHECK RUNNING PODS.",
      objective: "List all pods in the current namespace.",
      technicalGuide: "Pods are the smallest deployable units in K8s, typically wrapping a container. 'kubectl get pods' shows name, readiness, and status.",
      commandSyntax: "kubectl get pods",
      validationRegex: "^kubectl\\s+get\\s+pods",
      successMessage: "POD LIST RETRIEVED. 'AUTH-SERVICE' SHOWS CRASH LOOP."
    },
    {
      id: 2,
      briefing: "DEEP DIVE DIAGNOSTICS REQUIRED.",
      objective: "Describe the 'auth-service' pod.",
      technicalGuide: "'kubectl describe pod [name]' provides detailed configuration, events, and status history. It is the primary tool for investigating why a pod isn't starting.",
      commandSyntax: "kubectl describe pod auth-service",
      validationRegex: "^kubectl\\s+describe\\s+pod\\s+auth-service",
      successMessage: "DIAGNOSTIC REPORT LOADED. EVENT LOG SHOWS CONFIG ERROR."
    },
    {
      id: 3,
      briefing: "ANALYZE RUNTIME OUTPUT.",
      objective: "Retrieve logs for the pod 'auth-service'.",
      technicalGuide: "'kubectl logs' prints the standard output/error streams of the container. It's equivalent to 'docker logs' but orchestrator-aware.",
      commandSyntax: "kubectl logs [pod_name]",
      validationRegex: "^kubectl\\s+logs\\s+auth-service",
      successMessage: "LOGS RETRIEVED. NULL POINTER EXCEPTION IDENTIFIED."
    },
    {
      id: 4,
      briefing: "POD IS CORRUPTED. INITIATE HARD RESTART.",
      objective: "Delete the 'auth-service' pod.",
      technicalGuide: "Deleting a pod in a Deployment/ReplicaSet causes K8s to automatically create a fresh replacement. This is the K8s equivalent of 'turning it off and on again'.",
      commandSyntax: "kubectl delete pod auth-service",
      validationRegex: "^kubectl\\s+delete\\s+pod\\s+auth-service",
      successMessage: "POD TERMINATED. REPLICA SET INITIATING REPLACEMENT."
    },
    {
      id: 5,
      briefing: "VERIFY SELF-HEALING PROTOCOLS.",
      objective: "List pods to confirm the new instance is running.",
      technicalGuide: "Wait a moment, then check 'get pods' again. You should see a new pod with a different ID in 'Running' state.",
      commandSyntax: "kubectl get pods",
      validationRegex: "^kubectl\\s+get\\s+pods",
      successMessage: "NEW INSTANCE RUNNING. SERVICE RESTORED."
    }
  ],
  [SkillType.PSQL]: [
    {
      id: 0,
      briefing: "DATA ARCHIVE LOCKED. ESTABLISH CONNECTION AS ADMIN.",
      objective: "Connect to the database user 'admin'.",
      technicalGuide: "'psql' is the terminal interface for PostgreSQL. Use '-U' to specify the username. Default is often 'postgres'.",
      commandSyntax: "psql -U [user]",
      validationRegex: "^psql\\s+-U\\s+admin",
      successMessage: "CONNECTION ESTABLISHED. SESSION ACTIVE."
    },
    {
      id: 1,
      briefing: "LOCATE THE 'COLONY_LOGS' TABLE.",
      objective: "List all tables in the current database.",
      technicalGuide: "In psql, commands starting with backslash (\\) are meta-commands. '\\dt' lists (d) tables (t).",
      commandSyntax: "\\dt",
      validationRegex: "^\\\\dt",
      successMessage: "RELATION LIST RETRIEVED."
    },
    {
      id: 2,
      briefing: "QUERY RECENT CRITICAL FAILURES.",
      objective: "Select all columns from 'colony_logs' where type is 'ERROR'.",
      technicalGuide: "Use the WHERE clause to filter results. Strings must be in single quotes. Example: SELECT * FROM users WHERE name = 'Neo';",
      commandSyntax: "SELECT * FROM colony_logs WHERE event_type = 'ERROR';",
      validationRegex: "^select\\s+\\*\\s+from\\s+colony_logs\\s+where\\s+event_type\\s*=\\s*['\"]ERROR['\"]\\s*;?",
      successMessage: "3 RECORDS FOUND. ANALYZING..."
    },
    {
      id: 3,
      briefing: "ANOMALY RESOLVED. LOG THE REPAIR EVENT.",
      objective: "Insert a new record into 'colony_logs'.",
      technicalGuide: "Use 'INSERT INTO table (col1, col2) VALUES (val1, val2);'. Syntax must be precise.",
      commandSyntax: "INSERT INTO colony_logs (event_type, message) VALUES ('REPAIR', 'System fixed');",
      validationRegex: "^insert\\s+into\\s+colony_logs.*values.*",
      successMessage: "RECORD INSERTED."
    },
    {
      id: 4,
      briefing: "VERIFY DATA INTEGRITY.",
      objective: "Select all records from 'colony_logs'.",
      technicalGuide: "Retrieve all data to ensure the insert was successful. 'SELECT *' gets all columns.",
      commandSyntax: "SELECT * FROM colony_logs;",
      validationRegex: "^select\\s+\\*\\s+from\\s+colony_logs;?",
      successMessage: "DATA VERIFIED. ARCHIVE INTEGRITY 100%."
    }
  ]
};
