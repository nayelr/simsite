import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Styled components
const SimulationContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
`;

const DoorsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 30px 0;
  
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Door = styled(motion.button)<{ isSelected?: boolean; isRevealed?: boolean; isWinner?: boolean }>`
  width: 150px;
  height: 220px;
  background: ${props => {
    if (props.isRevealed && !props.isWinner) return '#ff4d4d';
    if (props.isSelected) return '#ffdd59';
    if (props.isWinner) return '#4cd137';
    return '#1e1e1e';
  }};
  border: 3px solid #444;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  color: white;
  font-size: 1.2rem;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: ${props => props.disabled ? 'none' : 'translateY(-5px)'};
    box-shadow: ${props => props.disabled ? '0 4px 12px rgba(0, 0, 0, 0.2)' : '0 8px 16px rgba(0, 0, 0, 0.3)'};
  }
  
  &:disabled {
    opacity: ${props => props.isRevealed ? 1 : 0.6};
  }
`;

const DoorContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const DoorNumber = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 10px;
`;

const DoorResult = styled.div`
  font-size: 1.2rem;
  margin-top: 10px;
`;

const InfoLabel = styled.div`
  text-align: center;
  font-size: 1.2rem;
  margin: 20px 0;
  min-height: 60px;
  color: #0ff;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin: 20px 0;
`;

const ActionButton = styled(motion.button)`
  padding: 10px 25px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #0ff;
  color: #111;
  font-weight: bold;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #00dddd;
  }
  
  &:disabled {
    background-color: #555;
    cursor: not-allowed;
  }
`;

const SimulationControls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-top: 30px;
  flex-wrap: wrap;
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Input = styled.input`
  padding: 8px;
  font-size: 1rem;
  border: 2px solid #444;
  border-radius: 5px;
  background-color: #222;
  color: white;
  width: 100px;
`;

const StatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 40px;
  
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const StatsList = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #1e1e1e;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
`;

const StatsTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 15px;
  color: #0ff;
`;

const StatItem = styled.div`
  margin-bottom: 8px;
  font-size: 1.1rem;
`;

const ChartContainer = styled.div`
  flex: 2;
  padding: 20px;
  background-color: #1e1e1e;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  min-height: 300px;
  
  canvas {
    width: 100% !important;
    height: auto !important;
    max-height: 250px;
  }
`;

type DoorType = 1 | 2 | 3;
type GamePhase = 'start' | 'selection' | 'reveal' | 'final';

const MontyHallSimulation: React.FC = () => {
  // Game state
  const [prizeDoor, setPrizeDoor] = useState<DoorType | null>(null);
  const [selectedDoor, setSelectedDoor] = useState<DoorType | null>(null);
  const [revealedDoor, setRevealedDoor] = useState<DoorType | null>(null);
  const [switchDoor, setSwitchDoor] = useState<DoorType | null>(null);
  const [gamePhase, setGamePhase] = useState<GamePhase>('start');
  const [gameResult, setGameResult] = useState<{won: boolean, switched: boolean} | null>(null);
  
  // Statistics
  const [stats, setStats] = useState({
    trials: 0,
    switchWins: 0,
    stayWins: 0
  });
  
  // Simulation control
  const [simCount, setSimCount] = useState<string>('1000');
  
  // Initialize game
  const resetGame = () => {
    const newPrizeDoor = (Math.floor(Math.random() * 3) + 1) as DoorType;
    setPrizeDoor(newPrizeDoor);
    setSelectedDoor(null);
    setRevealedDoor(null);
    setSwitchDoor(null);
    setGamePhase('start');
    setGameResult(null);
  };
  
  // Initialize on component mount
  useEffect(() => {
    resetGame();
  }, []);
  
  // Door selection handler
  const handleDoorSelect = (door: DoorType) => {
    if (gamePhase !== 'start') return;
    
    setSelectedDoor(door);
    
    // Host reveals a goat door (not the prize door and not the selected door)
    const goatDoors = [1, 2, 3].filter(d => 
      d !== prizeDoor && d !== door
    ) as DoorType[];
    
    const doorToReveal = goatDoors.length > 0 
      ? goatDoors[Math.floor(Math.random() * goatDoors.length)] 
      : ([1, 2, 3].filter(d => d !== door)[0] as DoorType);
    
    setRevealedDoor(doorToReveal);
    
    // Set the switch door (the remaining door)
    const remainingDoor = [1, 2, 3].find(
      d => d !== door && d !== doorToReveal
    ) as DoorType;
    setSwitchDoor(remainingDoor);
    
    setGamePhase('reveal');
  };
  
  // Handle decision to stay with original door
  const handleStay = () => {
    if (gamePhase !== 'reveal' || !selectedDoor) return;
    completeGame(false);
  };
  
  // Handle decision to switch doors
  const handleSwitch = () => {
    if (gamePhase !== 'reveal' || !switchDoor) return;
    completeGame(true);
  };
  
  // Complete the game and update statistics
  const completeGame = (didSwitch: boolean) => {
    setGamePhase('final');
    
    const finalDoor = didSwitch ? switchDoor : selectedDoor;
    const won = finalDoor === prizeDoor;
    
    setGameResult({ won, switched: didSwitch });
    
    // Update statistics
    setStats(prev => {
      const newStats = {
        trials: prev.trials + 1,
        switchWins: didSwitch && won ? prev.switchWins + 1 : prev.switchWins,
        stayWins: !didSwitch && won ? prev.stayWins + 1 : prev.stayWins
      };
      return newStats;
    });
  };
  
  // Run multiple simulations
  const runSimulation = () => {
    const numSims = parseInt(simCount, 10);
    if (isNaN(numSims) || numSims <= 0) {
      alert("Please enter a positive number");
      return;
    }
    
    let switchWins = 0;
    let stayWins = 0;
    
    for (let i = 0; i < numSims; i++) {
      // Set up doors and prize
      const prizeDoor = (Math.floor(Math.random() * 3) + 1) as DoorType;
      
      // Player randomly selects a door
      const selectedDoor = (Math.floor(Math.random() * 3) + 1) as DoorType;
      
      // Host reveals a goat door
      const availableDoors = [1, 2, 3].filter(
        d => d !== prizeDoor && d !== selectedDoor
      ) as DoorType[];
      
      const revealedDoor = availableDoors.length > 0 
        ? availableDoors[Math.floor(Math.random() * availableDoors.length)]
        : ([1, 2, 3].filter(d => d !== selectedDoor)[0] as DoorType);
      
      // Remaining door (for switch)
      const switchDoor = [1, 2, 3].find(
        d => d !== selectedDoor && d !== revealedDoor
      ) as DoorType;
      
      // Check results
      if (switchDoor === prizeDoor) switchWins++;
      if (selectedDoor === prizeDoor) stayWins++;
    }
    
    // Update statistics
    setStats({
      trials: numSims,
      switchWins,
      stayWins
    });
    
    // Alert results
    alert(
      `Ran ${numSims} simulations\n` +
      `Switch win rate: ${(switchWins/numSims*100).toFixed(1)}%\n` +
      `Stay win rate: ${(stayWins/numSims*100).toFixed(1)}%`
    );
  };
  
  // Determine door state for display
  const getDoorState = (doorNum: DoorType) => {
    const isSelected = doorNum === selectedDoor;
    const isRevealed = doorNum === revealedDoor;
    const isWinner = gamePhase === 'final' && doorNum === prizeDoor;
    
    // Fix the type comparison by using separate conditions
    let disabled = false;
    if (gamePhase !== 'start') {
      disabled = true;
    }
    if (gamePhase === 'reveal' && (doorNum === revealedDoor || doorNum === selectedDoor)) {
      disabled = true;
    }
    
    let content = `Door ${doorNum}`;
    if (isRevealed || (gamePhase === 'final' && doorNum !== prizeDoor)) {
      content = "Goat";
    } else if (gamePhase === 'final' && doorNum === prizeDoor) {
      content = "Car";
    }
    
    return { isSelected, isRevealed, isWinner, disabled, content };
  };
  
  // Get instruction text based on game phase
  const getInstructionText = () => {
    switch (gamePhase) {
      case 'start':
        return "Select a door to begin!";
      case 'reveal':
        return `Door ${revealedDoor} has a goat! Do you want to switch or stay?`;
      case 'final':
        if (gameResult) {
          const action = gameResult.switched ? "switched" : "stayed";
          const result = gameResult.won ? "won" : "lost";
          return `You ${action} and ${result}!`;
        }
        return "";
      default:
        return "";
    }
  };
  
  // Prepare chart data
  const chartData = {
    labels: ['Switch', 'Stay'],
    datasets: [
      {
        label: 'Win Rate (%)',
        data: [
          stats.trials > 0 ? (stats.switchWins / stats.trials) * 100 : 0,
          stats.trials > 0 ? (stats.stayWins / stats.trials) * 100 : 0
        ],
        backgroundColor: ['rgba(0, 255, 255, 0.6)', 'rgba(255, 221, 89, 0.6)'],
        borderColor: ['rgba(0, 255, 255, 1)', 'rgba(255, 221, 89, 1)'],
        borderWidth: 1,
      }
    ],
  };
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Win Rate (%)',
          color: '#fff'
        },
        ticks: {
          color: '#ccc'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
      x: {
        ticks: {
          color: '#ccc'
        },
        grid: {
          display: false
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Monty Hall Win Rates',
        color: '#fff',
        font: {
          size: 16
        }
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `Win Rate: ${context.raw.toFixed(1)}%`;
          }
        }
      }
    }
  };
  
  return (
    <SimulationContainer>
      <InfoLabel>{getInstructionText()}</InfoLabel>
      
      <DoorsContainer>
        {[1, 2, 3].map(doorNum => {
          const { isSelected, isRevealed, isWinner, disabled, content } = getDoorState(doorNum as DoorType);
          return (
            <Door
              key={doorNum}
              onClick={() => handleDoorSelect(doorNum as DoorType)}
              disabled={disabled}
              isSelected={isSelected}
              isRevealed={isRevealed}
              isWinner={isWinner}
              whileHover={!disabled ? { scale: 1.05 } : {}}
              whileTap={!disabled ? { scale: 0.95 } : {}}
            >
              <DoorContent>
                <DoorNumber>Door {doorNum}</DoorNumber>
                {(isRevealed || gamePhase === 'final') && (
                  <DoorResult>{content !== `Door ${doorNum}` ? content : ''}</DoorResult>
                )}
              </DoorContent>
            </Door>
          );
        })}
      </DoorsContainer>
      
      <ButtonContainer>
        <ActionButton
          onClick={handleSwitch}
          disabled={gamePhase !== 'reveal'}
          whileHover={gamePhase === 'reveal' ? { scale: 1.05 } : {}}
          whileTap={gamePhase === 'reveal' ? { scale: 0.95 } : {}}
        >
          Switch
        </ActionButton>
        
        <ActionButton
          onClick={handleStay}
          disabled={gamePhase !== 'reveal'}
          whileHover={gamePhase === 'reveal' ? { scale: 1.05 } : {}}
          whileTap={gamePhase === 'reveal' ? { scale: 0.95 } : {}}
        >
          Stay
        </ActionButton>
        
        <ActionButton
          onClick={resetGame}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Reset
        </ActionButton>
      </ButtonContainer>
      
      <SimulationControls>
        <InputGroup>
          <label htmlFor="simCount">Number of simulations:</label>
          <Input
            id="simCount"
            type="number"
            value={simCount}
            onChange={(e) => setSimCount(e.target.value)}
            min="1"
          />
        </InputGroup>
        
        <ActionButton
          onClick={runSimulation}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Run Simulation
        </ActionButton>
      </SimulationControls>
      
      <StatsContainer>
        <StatsList>
          <StatsTitle>Statistics</StatsTitle>
          <StatItem>Total trials: {stats.trials}</StatItem>
          <StatItem>
            Switch wins: {stats.switchWins} ({stats.trials > 0 ? ((stats.switchWins / stats.trials) * 100).toFixed(1) : '0.0'}%)
          </StatItem>
          <StatItem>
            Stay wins: {stats.stayWins} ({stats.trials > 0 ? ((stats.stayWins / stats.trials) * 100).toFixed(1) : '0.0'}%)
          </StatItem>
        </StatsList>
        
        <ChartContainer>
          <Bar data={chartData} options={chartOptions as any} />
        </ChartContainer>
      </StatsContainer>
    </SimulationContainer>
  );
};

export default MontyHallSimulation; 