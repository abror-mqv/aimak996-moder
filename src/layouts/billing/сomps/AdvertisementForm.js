import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  Paper,
  IconButton,
  Chip,
  LinearProgress
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { GET_CATEGORIES } from 'constants/crud';

import "./AdForm.scss"
import MDButton from 'components/MDButton';
import CitySelect from 'layouts/tables/comps/CitySelect';
import { GET_CITIES_LIST } from 'constants/crud';
import MultiCitySelect from './MultipleCitySelect';

const AdvertisementForm = ({ onSubmit }) => {
  const { t } = useTranslation();
  const [citiesList, setCitiesList] = useState([])
  const [categories, setCategories] = useState([])
  const [formData, setFormData] = useState({
    description: '',
    contact_phone: '',
    category: '',
    cities: [],
    images: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(()=>{
    axios.get(GET_CATEGORIES).then(res=>{setCategories(res.data); console.log(res.data)}).catch(err=>{console.log(err)})
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));    
  };

  const handleChangeCity = (arr) => {
    setFormData(prev => ({
      ...prev,
      cities: arr
    }))
    console.log(arr)
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length + formData.images.length > 5) {
      alert(t('newAd.maxImagesError'));
      return;
    }

    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));

    setImagePreviews(prev => [...prev, ...newImages]);
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files]
    }));
  };

  const handleRemoveImage = (index) => {
    const newPreviews = [...imagePreviews];
    const newImages = [...formData.images];
    
    URL.revokeObjectURL(newPreviews[index].preview);
    newPreviews.splice(index, 1);
    newImages.splice(index, 1);
    
    setImagePreviews(newPreviews);
    setFormData(prev => ({
      ...prev,
      images: newImages
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('contact_phone', formData.contact_phone);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('cities', formData.cities)
      
      formData.images.forEach((image) => {
        formDataToSend.append(`images`, image);
      });

      await onSubmit(formDataToSend);
      
      setFormData({
        description: '',
        contact_phone: '',
        category: '',
        images: [],
        cities: []
      });
      setImagePreviews([]);
    } catch (error) {
      console.error(t('newAd.error'), error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(()=>{
    axios.get(`${GET_CITIES_LIST}`).then(res=>{
      console.log(res.data)
      setCitiesList(res.data)
    }).catch(err=>{
      console.log(err)
    })
  }, [])

  return (
    <div className='NewAdForm'>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <MultiCitySelect 
            cities={citiesList}
            selectedCities={formData.cities}
            onCitiesChange={handleChangeCity}
          />          
          <TextField
            label={t('newAd.description')}
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            multiline
            rows={4}
            fullWidth
          />          
          <TextField
            label={t('newAd.phone')}
            name="contact_phone"
            value={formData.contact_phone}
            onChange={handleChange}
            required
            fullWidth
            placeholder="996500000000"
          />          
          <FormControl fullWidth required>
            <InputLabel id="category-label">{t('newAd.category')}</InputLabel>
            <Select
              labelId="category-label"
              name="category"
              value={formData.category}
              label={t('newAd.category')}
              onChange={handleChange}
            >
              {categories.map(category => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              {t('newAd.images')}
            </Typography>
            
            {imagePreviews.length > 0 && (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {imagePreviews.map((img, index) => (
                  <Box
                    key={index}
                    sx={{
                      position: 'relative',
                      width: 100,
                      height: 100,
                    }}
                  >
                    <img
                      src={img.preview}
                      alt={`Preview ${index + 1}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '4px'
                      }}
                    />
                    <IconButton
                      size="small"
                      onClick={() => handleRemoveImage(index)}
                      sx={{
                        position: 'absolute',
                        top: -8,
                        right: -8,
                        bgcolor: 'background.paper',
                        '&:hover': { bgcolor: 'background.paper' }
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            )}
            
            <Button
              component="label"
              variant="outlined"
              startIcon={<CloudUploadIcon />}
              sx={{ mt: 1 }}
            >
              {t('newAd.uploadImages')}
              <input
                type="file"
                hidden
                multiple
                accept="image/*"
                onChange={handleImageUpload}
              />
            </Button>
          </Box>
          
          <MDButton
            type="submit"
            variant="gradient"
            color="info"
            disabled={isSubmitting}
            fullWidth
          >
            {t('newAd.submit')}
          </MDButton>
          
          {isSubmitting && <LinearProgress />}
        </Box>
      </form>
    </div>
  );
};

export default AdvertisementForm;