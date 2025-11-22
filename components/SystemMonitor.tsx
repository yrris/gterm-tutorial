
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { MissionState, SKILL_COLORS, THEMES } from '../types';

interface SystemMonitorProps {
  missionState: MissionState;
}

const SystemMonitor: React.FC<SystemMonitorProps> = ({ missionState }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [fps, setFps] = useState(0);

  // D3 Background Noise/Waveform effect
  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;
    
    // Clear previous
    svg.selectAll("*").remove();

    const n = 40; // number of bars
    const data = new Array(n).fill(0);
    
    const xScale = d3.scaleLinear().domain([0, n-1]).range([0, width]);
    const yScale = d3.scaleLinear().domain([0, 1]).range([height, height/2]);

    const bars = svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => xScale(i))
      .attr("width", (width / n) - 2)
      .attr("fill", SKILL_COLORS[missionState.skill || 'LINUX'] || '#FFB000')
      .attr("opacity", 0.3);

    let isActive = true;

    const animate = () => {
      if (!isActive) return;
      
      // Update data with random noise
      const newData = data.map(() => Math.random());
      
      bars.data(newData)
          .attr("y", d => yScale(d))
          .attr("height", d => height - yScale(d));
      
      setFps(Math.floor(55 + Math.random() * 10));
      requestAnimationFrame(animate);
    };

    animate();

    return () => { isActive = false; };
  }, [missionState.skill]);

  // Safely resolve theme class
  const currentTheme = (missionState.skill && THEMES[missionState.skill]) ? THEMES[missionState.skill] : THEMES.DEFAULT;
  const borderColorClass = currentTheme.split(' ')[1];
  const textColorClass = currentTheme.split(' ')[0];
  const themeColor = (missionState.skill && SKILL_COLORS[missionState.skill]) ? SKILL_COLORS[missionState.skill] : '#FFB000';

  const currentStep = missionState.isActive ? missionState.steps[missionState.currentStepIndex] : null;

  return (
    <div className={`h-full flex flex-col gap-4 p-4 border-l-2 ${borderColorClass} bg-black/80 font-mono`}>
      
      {/* Objective Panel */}
      <div className={`p-4 border border-current bg-opacity-10 bg-gray-900 ${textColorClass} shrink-0`}>
        <h3 className="text-xs font-bold mb-2 tracking-[0.2em] border-b border-current pb-1">CURRENT_DIRECTIVE</h3>
        <p className="text-sm leading-tight font-bold min-h-[40px] animate-in fade-in slide-in-from-left-2 duration-500">
           {currentStep ? currentStep.objective : "SYSTEM IDLE. AWAITING INPUT."}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1 shrink-0">
         <div className="flex justify-between text-xs font-mono text-gray-400">
           <span>COMPLETION STATUS</span>
           <span>{Math.round(missionState.progress)}%</span>
         </div>
         <div className="w-full h-4 border border-gray-700 p-[2px]">
            <div 
              className="h-full transition-all duration-500 ease-out"
              style={{ width: `${missionState.progress}%`, backgroundColor: themeColor }}
            />
         </div>
      </div>

      {/* Knowledge Base / Manual Panel (Replaces Radar) */}
      <div className={`flex-1 flex flex-col border border-gray-800 bg-black/50 relative overflow-hidden`}>
         <div className="absolute top-2 left-2 text-[10px] text-gray-500 tracking-widest z-10">KNOWLEDGE_BASE // MANUAL</div>
         
         <div className="p-4 pt-8 overflow-y-auto scrollbar-hide h-full">
            {currentStep ? (
                <div className="space-y-4 animate-in fade-in zoom-in-95 duration-700">
                    <div>
                        <h4 className={`text-xs font-bold ${textColorClass} mb-1 opacity-70`}>&gt; CONCEPT_ANALYSIS</h4>
                        <p className="text-xs md:text-sm leading-relaxed text-gray-300">
                            {currentStep.technicalGuide}
                        </p>
                    </div>
                    
                    <div>
                        <h4 className={`text-xs font-bold ${textColorClass} mb-1 opacity-70`}>&gt; SYNTAX_REFERENCE</h4>
                        <div className="bg-gray-900 p-2 border border-gray-700 text-gray-300 text-xs font-mono">
                            $ {currentStep.commandSyntax}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center h-full text-gray-600 text-xs uppercase tracking-widest text-center">
                    Select module to<br/>access documentation
                </div>
            )}
         </div>
         
         {/* Decorative scanline for the panel */}
         <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 bg-[length:100%_2px,3px_100%]"></div>
      </div>

      {/* D3 Waveform / Footer Stats */}
      <div className="h-32 border border-gray-800 relative overflow-hidden shrink-0">
         <svg ref={svgRef} className="w-full h-full absolute inset-0" />
         <div className="absolute bottom-1 right-1 text-[10px] bg-black px-1 text-gray-400 font-mono">
           FPS: {fps}
         </div>
         <div className="absolute top-1 left-1 text-[10px] bg-black px-1 text-gray-400 font-mono">
           AUDIO_WAVEFORM_LOCKED
         </div>
      </div>
    </div>
  );
};

export default SystemMonitor;
