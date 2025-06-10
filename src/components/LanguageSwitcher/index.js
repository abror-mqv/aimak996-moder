import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Box } from '@mui/material';
import TranslateIcon from '@mui/icons-material/Translate';

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ru' ? 'ky' : 'ru';
    i18n.changeLanguage(newLang);
  };

  return (
    <Box sx={{ position: 'fixed', bottom: '20px', left: '20px', zIndex: 1200 }}>
      <Button
        variant="contained"
        color="primary"
        onClick={toggleLanguage}
        startIcon={<TranslateIcon />}
        size="small"
      >
        {i18n.language === 'ru' ? 'KG' : 'RU'}
      </Button>
    </Box>
  );
}

export default LanguageSwitcher; 