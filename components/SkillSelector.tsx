import React from 'react';
import { SkillType, SKILL_COLORS, THEMES } from '../types';
import { Terminal, Database, Server, GitGraph, Box, Cpu } from 'lucide-react';

interface SkillSelectorProps {
  onSelect: (skill: SkillType) => void;
}

const SkillSelector: React.FC<SkillSelectorProps> = ({ onSelect }) => {
  const skills = [
    { type: SkillType.DOCKER, icon: Box, label: 'CONTAINER PROTOCOLS', desc: 'ISOLATION MODULES' },
    { type: SkillType.K8S, icon: Server, label: 'ORCHESTRATION', desc: 'CLUSTER MANAGEMENT' },
    { type: SkillType.PSQL, icon: Database, label: 'DATA ARCHIVES', desc: 'QUERY LANGUAGE' },
    { type: SkillType.GIT, icon: GitGraph, label: 'VERSION CONTROL', desc: 'TIMELINE MANIPULATION' },
    { type: SkillType.LINUX, icon: Terminal, label: 'CORE KERNEL', desc: 'SYSTEM OPERATIONS' },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-8 animate-in fade-in duration-700">
      <h1 className="text-4xl md:text-6xl mb-2 font-bold tracking-widest text-amber-500 glow-text uppercase text-center">
        Mainframe-99
      </h1>
      <p className="text-amber-700 mb-12 tracking-widest text-sm uppercase border-b border-amber-900/50 pb-2">
        System Ready // Select Training Module
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl w-full">
        {skills.map((skill) => {
          const Icon = skill.icon;
          const colorClass = THEMES[skill.type] || THEMES.DEFAULT;
          const baseColor = colorClass.split(' ')[0]; // extract text-color
          
          return (
            <button
              key={skill.type}
              onClick={() => onSelect(skill.type)}
              className={`
                group relative p-6 border-2 bg-black/80 
                hover:bg-gray-900/50 transition-all duration-300
                flex flex-col items-center text-center
                ${colorClass}
                hover:scale-105
              `}
            >
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-current opacity-50"></div>
              <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-current opacity-50"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-current opacity-50"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-current opacity-50"></div>

              <div className="mb-4 p-4 rounded-full border border-current bg-black shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_25px_currentColor] transition-shadow duration-300">
                <Icon size={32} className="stroke-[1.5]" />
              </div>
              
              <h3 className="text-2xl font-bold mb-1 tracking-tighter">{skill.label}</h3>
              <p className="text-xs opacity-70 tracking-widest">{skill.desc}</p>
              
              <div className="absolute bottom-2 right-2 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">
                INITIALIZE &gt;&gt;
              </div>
            </button>
          );
        })}
      </div>
      
      <div className="mt-16 text-center text-xs text-gray-600 font-mono">
        <p>TERMINAL ID: 8392-XJ</p>
        <p>AUTHORIZED PERSONNEL ONLY</p>
      </div>
    </div>
  );
};

export default SkillSelector;