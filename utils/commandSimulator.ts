
import { SkillType } from '../types';

// Generates fake terminal output for added realism
export const getSimulatedOutput = (skill: SkillType, command: string): string | null => {
  const cmd = command.trim().toLowerCase();

  // --- DOCKER ---
  if (skill === SkillType.DOCKER) {
    if (cmd.includes('version')) {
      return `Client: Docker Engine - Community
 Version:           20.10.17
 API version:       1.41
 Go version:        go1.17.11
 OS/Arch:           linux/amd64

Server: Docker Engine - Community
 Engine:
  Version:          20.10.17
  API version:      1.41 (minimum version 1.12)
  Go version:       go1.17.11`;
    }
    if (cmd.includes('pull')) {
      const img = cmd.split(' ')[2] || 'nginx';
      return `Using default tag: latest
latest: Pulling from library/${img}
a2abf6c4d29d: Pulling fs layer
e4b0476203f9: Download complete
Digest: sha256:7b9c...
Status: Downloaded newer image for ${img}:latest`;
    }
    if (cmd.includes('run')) {
        // Match the ID format of Docker
        return `16d013710642d83d1772683093457422507a3673576997827099491070609397`;
    }
    if (cmd.includes('ps')) {
      return `CONTAINER ID   IMAGE          COMMAND                  CREATED          STATUS          PORTS                NAMES
16d013710642   nginx:latest   "/docker-entrypoint.…"   4 seconds ago    Up 3 seconds    0.0.0.0:80->80/tcp   proxy`;
    }
  }

  // --- KUBERNETES ---
  if (skill === SkillType.K8S) {
    if (cmd.includes('get nodes')) {
      return `NAME           STATUS   ROLES           AGE   VERSION
node-worker-1  Ready    <none>          24d   v1.24.0
node-worker-2  Ready    <none>          24d   v1.24.0
node-control   Ready    control-plane   24d   v1.24.0`;
    }
    if (cmd.includes('get pods')) {
      return `NAME           READY   STATUS             RESTARTS   AGE
auth-service   0/1     CrashLoopBackOff   4          2m
frontend       1/1     Running            0          45m
db-shard-0     1/1     Running            0          2h`;
    }
    if (cmd.includes('logs')) {
      return `[2024-10-24T12:42:01Z] INFO: Starting Auth Service v2.1
[2024-10-24T12:42:02Z] DEBUG: DB Connection init...
[2024-10-24T12:42:03Z] ERROR: Connection refused (Connection timed out)
[2024-10-24T12:42:03Z] FATAL: Unhandled exception in main.go:42 -> Panic`;
    }
  }

  // --- LINUX ---
  if (skill === SkillType.LINUX) {
    if (cmd.includes('ls')) {
      if (cmd.includes('-a') || cmd.includes('-la')) {
        return `drwxr-xr-x  4 root root  4096 Jan 01 00:00 .
drwxr-xr-x 10 root root  4096 Jan 01 00:00 ..
-rw-r--r--  1 root root   220 Jan 01 00:00 .bash_logout
-rw-r--r--  1 root root  3771 Jan 01 00:00 .bashrc
-rw-r--r--  1 root root  24KB Jan 01 12:00 sys_log.txt
-rw-r--r--  1 root root  1024 Jan 01 12:05 fix_core.sh`;
      }
      return `sys_log.txt  fix_core.sh`;
    }
    if (cmd.includes('cat')) {
      return `[SYSTEM BOOT SEQ 9992]
...
[INFO] Service started.
[INFO] Port 80 listening.
[ERROR] Corrupted sector 4 on drive /dev/sda1
[WARN] High temp detected.
...`;
    }
    if (cmd.includes('grep')) {
      return `[ERROR] Corrupted sector 4 on drive /dev/sda1
[ERROR] Module 'net-adapter' not responding.`;
    }
    if (cmd.includes('chmod')) {
      // chmod usually has no output on success
      return ``;
    }
  }

  // --- GIT ---
  if (skill === SkillType.GIT) {
    if (cmd.includes('init')) {
      return `Initialized empty Git repository in /home/user/project/.git/`;
    }
    if (cmd.includes('status')) {
      // State depends on context, but let's simulate the "step 1" state
      return `On branch main
Untracked files:
  (use "git add <file>..." to include in what will be committed)
        config.yaml

nothing added to commit but untracked files present (use "git add" to track)`;
    }
    if (cmd.includes('add')) {
      return ``; // No output usually
    }
    if (cmd.includes('commit')) {
      return `[main (root-commit) 7a3b1c] System Restore
 1 file changed, 12 insertions(+)
 create mode 100644 config.yaml`;
    }
  }

  // --- PSQL ---
  if (skill === SkillType.PSQL) {
    if (cmd.includes('psql')) {
      return `psql (13.4)
Type "help" for help.

admin=>`;
    }
    if (cmd.includes('\\dt')) {
      return `             List of relations
 Schema |       Name       | Type  |  Owner   
--------+------------------+-------+----------
 public | colony_logs      | table | admin
 public | crew_manifest    | table | admin
 public | energy_readings  | table | postgres
(3 rows)`;
    }
    if (cmd.toLowerCase().startsWith('select')) {
      return ` id |    timestamp     |   event_type   | message 
----+------------------+----------------+---------------------
  1 | 2142-01-01 12:00 | SYSTEM_START   | Mainframe boot seq
  2 | 2142-01-01 12:05 | AUTH_ATTEMPT   | User 'Ripley' login
  3 | 2142-01-01 14:30 | ANOMALY        | Radiation leak detected
(3 rows)`;
    }
  }

  return null;
};
