import { RiAddLargeLine } from 'react-icons/ri'
import { Button } from 'src/components/ui/button'
import Step from './Step'

interface StepData {
  id: string;
  type: string;
  properties: Record<string, any>;
}

interface StepsProps {
  steps: StepData[];
  updateSteps: (steps: StepData[]) => void;
  runStep: (index: number) => void;
  currentStepIndex: number;
}

const Steps: React.FC<StepsProps> = ({ steps, updateSteps, runStep, currentStepIndex  }) => {
  const addStep = () => {
    const newStep: StepData = {
      id: Date.now().toString(),
      type: '',
      properties: {}
    };
    updateSteps([...steps, newStep]);
  };

  const updateStep = (id: string, updatedStep: Partial<StepData>) => {
    updateSteps(steps.map(step => 
      step.id === id ? { ...step, ...updatedStep } : step
    ));
  };

  const deleteStep = (id: string) => {
    updateSteps(steps.filter(step => step.id !== id));
  };

  return (
    <div className="py-4 pb-0 flex flex-col gap-2 w-full">
      {steps.map((step, index) => (
        <Step
          key={step.id}
          step={step}
          updateStep={(updatedStep) => updateStep(step.id, updatedStep)}
          deleteStep={() => deleteStep(step.id)}
          runStep={() => runStep(index)}
          currentStepIndex={currentStepIndex}
          index={index}
        />
      ))}
      <div className="w-full flex justify-center items-center mt-4">
        <div className="border-t border-zinc-800 flex-1 mr-2"></div>
        <Button variant="brand" className="px-8" onClick={addStep}>
          <RiAddLargeLine className="mr-2" /> Add New Step
        </Button>
        <div className="border-t border-zinc-800 flex-1 ml-2"></div>
      </div>
    </div>
  )
}

export default Steps