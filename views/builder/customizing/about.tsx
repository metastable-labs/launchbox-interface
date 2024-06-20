import { useRef } from 'react';
import Image from 'next/image';

import CustomizingPaper from './paper';
import { IAbout } from './types';
import { AboutIcon } from '@/public/icons';
import { LBClickAnimation } from '@/components';
import CustomizeInput from './input';

const About = ({ aboutDescription, aboutImageURL, aboutTitle, handleAboutImageFile, handleChange, isActive, onClick }: IAbout) => {
  const logoInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = () => {
    if (logoInputRef.current) {
      logoInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      handleAboutImageFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        handleChange('aboutImageURL', result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="px-4 rounded-lg border border-primary-50 bg-white flex flex-col self-stretch gap-2">
      <CustomizingPaper icon={<AboutIcon />} isActive={isActive} title="About section" onClick={() => onClick('about')} />

      <div className="flex flex-col items-stretch justify-center gap-5 self-stretch pb-4">
        <CustomizeInput handleChange={(value) => handleChange('aboutTitle', value)} label="About title" placeholder="Enter about title" value={aboutTitle} />

        <CustomizeInput handleChange={(value) => handleChange('aboutDescription', value)} label="Description" placeholder="Your description" value={aboutDescription} variant="secondary" rows={3} />

        <div className="flex flex-col items-stretch gap-4">
          <span className="text-primary-2000 text-sm font-medium">About image</span>

          <div className="self-stretch h-[160px] rounded-lg border border-primary-50 bg-primary-200 flex items-center justify-center">
            {aboutImageURL && <Image src={aboutImageURL} width={500} height={500} alt="hero-image" className="object-cover w-[120px] h-[120px]" />}
          </div>

          <div className="flex items-center justify-start gap-2">
            <LBClickAnimation onClick={handleUpload} className="rounded-lg py-2 px-3 bg-white border border-primary-1950 shadow-table-cta flex items-center justify-center">
              Upload
            </LBClickAnimation>
            <span className="text-primary-700 text-sm">Recommended size 3:2, upto 5mb</span>
          </div>
        </div>
      </div>

      <input ref={logoInputRef} id="file-input" type="file" accept=".jpg, .jpeg, .png, .svg" className="hidden" onChange={handleFileChange} />
    </div>
  );
};

export default About;
