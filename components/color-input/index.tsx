import { ChangeEvent, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SketchPicker, ColorResult } from 'react-color';
import LBBackdrop from '../backdrop';

const LBColorInput: React.FC<ILBColorInput> = ({ color: defaultColor, handleChange, instruction, label }) => {
  const [color, setColor] = useState(defaultColor);
  const [inputValue, setInputValue] = useState(defaultColor);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleColorChange = (color: ColorResult) => {
    setColor(color.hex);
    setInputValue(color.hex);
    handleChange(color.hex);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (/^#([0-9A-F]{3}){1,2}$/i.test(value) || /^rgba?\((\s*\d+\s*,?){3,4}\)$/i.test(value)) {
      setColor(value);
      handleChange(value);
    }
  };

  const toggleColorPicker = () => setShowColorPicker((prev) => !prev);

  return (
    <div className="relative flex flex-col w-full gap-1.5">
      {label && <label className="text-primary-2000 text-sm">{label}</label>}

      <div className="w-full flex items-center justify-center rounded-lg border border-primary-1950 overflow-hidden">
        <motion.div onClick={toggleColorPicker} animate={{ backgroundColor: color }} className="w-[42px] h-[42px] cursor-pointer" />

        <input type="text" value={inputValue} onChange={handleInputChange} className="border-l border-l-primary-1950 px-3 py-2 text-primary-2200 flex-1 h-full outline-none" />
      </div>

      {instruction && <p className="text-primary-700 text-sm">{instruction}</p>}

      <AnimatePresence>
        {showColorPicker && (
          <>
            <LBBackdrop onClick={toggleColorPicker} />
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="absolute top-full left-0 mt-2 z-20">
              <SketchPicker color={color} onChange={handleColorChange} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LBColorInput;
