'use client';

import useSystemFunctions from '@/hooks/useSystemFunctions';
import api from './api';
import { setUpdateLoading } from '.';
import { CallbackProps } from '..';

const useBuilderActions = () => {
  const { dispatch } = useSystemFunctions();

  const updateBuilderData = async (tokenId: string, buildData: BuilderData, callback?: CallbackProps) => {
    try {
      if (!tokenId) return;

      dispatch(setUpdateLoading(true));

      const data = new FormData();

      if (buildData.logoFile) {
        data.append('logo', buildData.logoFile as File);
      }

      if (buildData.heroImageFile) {
        data.append('hero', buildData.heroImageFile as File);
      }

      if (buildData.heroTitle || buildData.heroDescription) {
        data.append('hero_section', JSON.stringify({ title: buildData.heroTitle, description: buildData.heroDescription }));
      }

      // if (buildData.aboutImageFile) {
      //   data.append('about', buildData.aboutImageFile as File);
      // }

      // if (buildData.aboutDescription || buildData.aboutTitle) {
      //   data.append('about_section', JSON.stringify({ title: buildData.aboutTitle, description: buildData.aboutDescription }));
      // }

      if (buildData.primaryColor || buildData.secondaryColor) {
        data.append('appearance', JSON.stringify({ primary_color: buildData.primaryColor, secondary_color: buildData.secondaryColor }));
      }

      if (buildData.buyLink) {
        data.append('navigation', JSON.stringify({ buy_url: buildData.buyLink }));
      }

      if (buildData.tokenDistributions.length > 0) {
        data.append('tokenomics', JSON.stringify(buildData.tokenDistributions.reduce((acc, value) => ({ ...acc, [value.title]: `${value.percentage}` }), {})));
      }

      if (buildData.faqTitle || buildData.faqDescription || buildData.faqs.length > 0) {
        data.append(
          'faq',
          JSON.stringify({
            title: buildData.faqTitle,
            description: buildData.faqDescription,
            questions: buildData.faqs.map((value) => ({ title: value.question, answer: value.answer })),
          }),
        );
      }

      const footerLinks = {
        twitter_url: buildData.xLink,
        farcaster_url: buildData.farcasterLink,
        telegram_url: buildData.telegramLink,
        chain_explorer_url: buildData.chainExplorerLink,
      };

      const validFooterLinks = Object.fromEntries(Object.entries(footerLinks).filter(([_, value]) => value));

      if (Object.keys(validFooterLinks).length > 0) {
        data.append('footer', JSON.stringify(validFooterLinks));
      }

      const response = await api.updateBuilderData(data, tokenId);

      callback?.onSuccess?.(response);
    } catch (error: any) {
      callback?.onError?.(error);
    } finally {
      dispatch(setUpdateLoading(false));
    }
  };

  return {
    updateBuilderData,
  };
};

export default useBuilderActions;
