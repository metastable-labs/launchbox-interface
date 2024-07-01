import CustomizingPaper from './paper';
import { IFAQ } from './types';
import { PlusAltIcon, QuestionIcon } from '@/public/icons';
import { LBClickAnimation } from '@/components';
import CustomizeInput from './input';

const FAQ = ({ faqDescription, faqTitle, faqs, handleChange, isActive, onClick }: IFAQ) => {
  const handleNewQuestion = () => {
    handleChange('faqs', [...faqs, { question: `Question ${faqs.length + 1}`, answer: 'lorem ipsum blah blah blah' }]);
  };

  const handleChangeQuestion = (index: number, question: string) => {
    handleChange('faqs', [...faqs.slice(0, index), { ...faqs[index], question }, ...faqs.slice(index + 1)]);
  };

  const handleChangeAnswer = (index: number, answer: string) => {
    handleChange('faqs', [...faqs.slice(0, index), { ...faqs[index], answer }, ...faqs.slice(index + 1)]);
  };

  return (
    <div className="px-4 rounded-lg border border-primary-50 bg-white flex flex-col self-stretch gap-2">
      <CustomizingPaper icon={<QuestionIcon width={24} height={24} />} isActive={isActive} title="FAQ" onClick={() => onClick('faq')} />

      <div className="flex flex-col items-stretch justify-center gap-5 self-stretch">
        <CustomizeInput handleChange={(value) => handleChange('faqTitle', value)} label="FAQ title" placeholder="Enter title" value={faqTitle} />

        <CustomizeInput handleChange={(value) => handleChange('faqDescription', value)} label="Description" placeholder="Your description" value={faqDescription} variant="secondary" rows={3} />
      </div>

      <div className="flex flex-col items-stretch justify-center gap-5 self-stretch pb-4">
        {faqs?.map((faq, index) => (
          <div key={index} className="flex flex-col items-stretch justify-center gap-5 self-stretch">
            <CustomizeInput handleChange={(value) => handleChangeQuestion(index, value)} label={`Question ${index + 1}`} placeholder="Enter question" value={faq.question} />

            <CustomizeInput handleChange={(value) => handleChangeAnswer(index, value)} label="Answer" placeholder="Your answer" value={faq.answer} variant="secondary" rows={3} />
          </div>
        ))}

        <div className="flex items-center justify-start">
          <LBClickAnimation onClick={handleNewQuestion} className="flex items-center justify-center gap-1">
            <PlusAltIcon color="#018558" />
            <span className="text-sm font-semibold text-primary-3350">Add Question</span>
          </LBClickAnimation>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
