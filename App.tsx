
import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { SkillType, Message, MissionState } from './types';
import { MISSIONS } from './data/missions';
import { getSimulatedOutput } from './utils/commandSimulator';
import SkillSelector from './components/SkillSelector';
import Terminal from './components/Terminal';
import SystemMonitor from './components/SystemMonitor';

const App: React.FC = () => {
  const [mission, setMission] = useState<MissionState>({
    isActive: false,
    skill: null,
    steps: [],
    currentStepIndex: 0,
    progress: 0,
    history: []
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const addMessage = (text: string, sender: Message['sender'], type: Message['type'] = 'info') => {
    setMission(prev => ({
      ...prev,
      history: [...prev.history, {
        id: nanoid(),
        sender,
        text,
        timestamp: Date.now(),
        type
      }]
    }));
  };

  const handleSelectSkill = async (skill: SkillType) => {
    setIsProcessing(true);
    setMission(prev => ({ ...prev, skill, steps: [], history: [], currentStepIndex: 0, progress: 0 }));
    
    addMessage('INITIALIZING SECURE CONNECTION...', 'SYSTEM');
    
    // Simulate a brief connection delay for effect (aesthetic only), but data is local
    setTimeout(() => {
      const steps = MISSIONS[skill];

      if (!steps || steps.length === 0) {
          addMessage("ERROR: MODULE DATA CORRUPTED.", 'SYSTEM', 'error');
          setIsProcessing(false);
          return;
      }

      setMission(prev => ({
        ...prev,
        isActive: true,
        steps: steps,
        currentStepIndex: 0,
        progress: 0,
        history: [
           ...prev.history,
           { id: nanoid(), sender: 'SYSTEM', text: 'UPLINK ESTABLISHED.', timestamp: Date.now(), type: 'success' },
           { 
             id: nanoid(), 
             sender: 'AI', 
             text: `MISSION: ${skill} PROTOCOLS\n\nBRIEFING: ${steps[0].briefing}\n\nOBJECTIVE: ${steps[0].objective}`, 
             timestamp: Date.now(), 
             type: 'info' 
           }
        ]
      }));
      setIsProcessing(false);
    }, 800);
  };

  const handleCommand = async (command: string) => {
    if (!mission.skill || !mission.isActive) return;

    const currentStep = mission.steps[mission.currentStepIndex];
    
    // 1. Log User Command
    addMessage(command, 'USER');

    // 2. Immediate Simulated Output (for realism/speed)
    const simulatedOutput = getSimulatedOutput(mission.skill, command);
    if (simulatedOutput) {
       addMessage(simulatedOutput, 'SYSTEM', 'info');
    } else {
       // If no simulated output but command is valid-ish, we might just stay silent or generic
       // But for now, if it's completely unknown, we might warn.
    }

    // 3. Validate Command vs Objective (Local Logic for speed)
    const isSuccess = new RegExp(currentStep.validationRegex, 'i').test(command.trim());

    if (isSuccess) {
       // SUCCESS: Move to next step
       addMessage(currentStep.successMessage, 'AI', 'success');
       
       const nextIndex = mission.currentStepIndex + 1;
       const progressIncrement = 100 / mission.steps.length;

       if (nextIndex < mission.steps.length) {
          // Advance Mission
          const nextStep = mission.steps[nextIndex];
          setTimeout(() => {
            addMessage(`NEW DIRECTIVE:\n${nextStep.briefing}\n\nOBJECTIVE: ${nextStep.objective}`, 'AI', 'info');
          }, 1000);

          setMission(prev => ({
             ...prev,
             currentStepIndex: nextIndex,
             progress: prev.progress + progressIncrement
          }));
       } else {
          // Mission Complete
          setTimeout(() => {
             addMessage("ALL SYSTEMS STABILIZED. MISSION COMPLETE. LOGGING OUT...", 'AI', 'success');
          }, 1000);
          setMission(prev => ({
            ...prev,
            progress: 100
          }));
       }
    } else {
       // FAIL: If it wasn't a known command AND didn't match regex, generic error
       if (!simulatedOutput && command.trim().length > 0) {
         addMessage(`COMMAND REJECTED: '${command}' unknown or invalid context.`, 'SYSTEM', 'error');
       }
    }
  };

  const handleHint = () => {
      if (!mission.isActive || mission.steps.length === 0) return;
      const currentStep = mission.steps[mission.currentStepIndex];
      addMessage(`SUGGESTED SYNTAX: ${currentStep.commandSyntax}`, 'AI', 'hint');
  };

  const handleReset = () => {
    setMission({
      isActive: false,
      skill: null,
      steps: [],
      currentStepIndex: 0,
      progress: 0,
      history: []
    });
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-[#050505] text-amber-500 overflow-hidden">
      {/* Top Bar */}
      <header className="flex items-center justify-between px-6 py-2 border-b-2 border-amber-900/30 bg-black z-10 shrink-0">
         <div className="flex items-center gap-4">
            <div className="w-4 h-4 bg-amber-500 animate-pulse rounded-sm"></div>
            <span className="text-lg font-bold tracking-widest text-amber-500 glow-text font-vt323 text-2xl">TERMINAL_2142</span>
         </div>
         <div className="flex gap-6 text-xs md:text-sm tracking-widest opacity-80">
            <span>MEM: 64TB</span>
            <span>NET: {mission.isActive ? 'SECURE' : 'IDLE'}</span>
            {mission.isActive && (
              <button onClick={handleReset} className="hover:text-red-500 hover:underline cursor-pointer">
                [ABORT MISSION]
              </button>
            )}
         </div>
      </header>

      {/* Main Content Grid */}
      <main className="flex-1 flex relative z-10 overflow-hidden p-4 md:p-6 gap-6">
        {!mission.isActive ? (
          // Selection Screen
          <SkillSelector onSelect={handleSelectSkill} />
        ) : (
          // Mission Screen (Split View)
          <div className="flex flex-col md:flex-row w-full h-full gap-4">
            {/* Left: Terminal (Flex-grow) */}
            <div className="flex-1 h-full min-h-0">
              <Terminal 
                history={mission.history} 
                onCommand={handleCommand} 
                onHint={handleHint}
                isProcessing={isProcessing}
                skill={mission.skill}
              />
            </div>

            {/* Right: Monitor (Fixed width on desktop) */}
            <div className="h-[250px] md:h-full md:w-[350px] shrink-0 hidden md:block">
               <SystemMonitor missionState={mission} />
            </div>
          </div>
        )}
      </main>

      {/* Decorative Footer */}
      <footer className="py-1 px-6 border-t border-amber-900/30 text-[10px] opacity-40 flex justify-between z-10 bg-black shrink-0">
        <span>COPYRIGHT 2142 WEYLAND-YUTANI CORP</span>
        <span>TERMINAL_ID: {nanoid(6).toUpperCase()}</span>
      </footer>
    </div>
  );
};

export default App;
