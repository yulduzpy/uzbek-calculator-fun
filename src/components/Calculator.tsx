import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };
  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);
    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);
      setDisplay(`${parseFloat(newValue.toFixed(7))}`);
      setPreviousValue(newValue);
    }
    setWaitingForOperand(true);
    setOperation(nextOperation);
  };
  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '*':
        return firstValue * secondValue;
      case '/':
        return secondValue !== 0 ? firstValue / secondValue : 0;
      default:
        return secondValue;
    }
  };
  const performCalculation = () => {
    const inputValue = parseFloat(display);
    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      if (operation === '/' && inputValue === 0) {
        setDisplay('Xato: 0 ga bo\'lib bo\'lmaydi!');
      } else {
        setDisplay(`${parseFloat(newValue.toFixed(7))}`);
      }
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };
  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };
  return <div className="min-h-screen bg-calculator-bg flex items-center justify-center p-4">
      <Card className="bg-calculator-card border-border/20 p-6 rounded-3xl shadow-2xl animate-fade-in max-w-sm w-full">
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">Oddiy Kalkulyator</h1>
            <p className="text-muted-foreground text-sm">+, -, *, / amallar</p>
          </div>

          {/* Display */}
          <div className="bg-calculator-display rounded-2xl p-6 border border-border/20">
            <div className="text-right">
              <div className="text-3xl font-mono text-foreground break-all">
                {display}
              </div>
            </div>
          </div>

          {/* Buttons Grid */}
          <div className="grid grid-cols-4 gap-3">
            {/* First Row */}
            <Button variant="clear" size="lg" onClick={clear} className="col-span-2">
              Tozalash
            </Button>
            <Button variant="operator" size="lg" onClick={() => inputOperation('/')} className="text-cyan-200">
              ÷
            </Button>
            <Button variant="operator" size="lg" onClick={() => inputOperation('*')} className="text-sky-100">
              ×
            </Button>

            {/* Second Row */}
            <Button variant="number" size="lg" onClick={() => inputNumber('7')}>
              7
            </Button>
            <Button variant="number" size="lg" onClick={() => inputNumber('8')}>
              8
            </Button>
            <Button variant="number" size="lg" onClick={() => inputNumber('9')}>
              9
            </Button>
            <Button variant="operator" size="lg" onClick={() => inputOperation('-')} className="text-sky-200">
              −
            </Button>

            {/* Third Row */}
            <Button variant="number" size="lg" onClick={() => inputNumber('4')}>
              4
            </Button>
            <Button variant="number" size="lg" onClick={() => inputNumber('5')}>
              5
            </Button>
            <Button variant="number" size="lg" onClick={() => inputNumber('6')}>
              6
            </Button>
            <Button variant="operator" size="lg" onClick={() => inputOperation('+')}>
              +
            </Button>

            {/* Fourth Row */}
            <Button variant="number" size="lg" onClick={() => inputNumber('1')}>
              1
            </Button>
            <Button variant="number" size="lg" onClick={() => inputNumber('2')}>
              2
            </Button>
            <Button variant="number" size="lg" onClick={() => inputNumber('3')}>
              3
            </Button>
            <Button variant="equals" size="lg" onClick={performCalculation} className="row-span-2">
              =
            </Button>

            {/* Fifth Row */}
            <Button variant="number" size="lg" onClick={() => inputNumber('0')} className="col-span-2">
              0
            </Button>
            <Button variant="number" size="lg" onClick={() => inputNumber('.')}>
              .
            </Button>
          </div>
        </div>
      </Card>
    </div>;
};
export default Calculator;